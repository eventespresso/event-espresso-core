<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );



function espresso_load_admin_ajax_callbacks() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');

	function event_list_save_state_callback() {
		check_ajax_referer('event_list_state', 'nonce');
		update_user_meta($_POST['user'], 'event_list_state', $_POST['data']);
		die(); // this is required to return a proper result
	}
	add_action('wp_ajax_event_list_save_state', 'event_list_save_state_callback');

	function event_list_load_state_callback() {
		check_ajax_referer('event_list_state', 'nonce');
		echo json_encode(get_user_meta($_POST['user'], 'event_list_state', true));
		die(); // this is required to return a proper result
	}
	add_action('wp_ajax_event_list_load_state', 'event_list_load_state_callback');

}







function espresso_verify_default_pages_exist() {
	
	global $org_options;
	$critical_page_problem = FALSE;
	
	// first check that critical page id's are set in the org options and that those page id's exist in the WP post db
	$page_ids = get_all_page_ids();
	if (	! isset( $org_options['event_page_id'] ) || empty( $org_options['event_page_id'] ) || ! in_array( $org_options['event_page_id'], $page_ids )|| 
			! isset( $org_options['return_url'] ) || empty( $org_options['return_url'] ) || ! in_array( $org_options['return_url'], $page_ids ) || 
			! isset( $org_options['notify_url'] ) || empty( $org_options['notify_url'] ) || ! in_array( $org_options['notify_url'], $page_ids ) || 
			! isset( $org_options['cancel_return'] ) || empty( $org_options['cancel_return'] ) || ! in_array( $org_options['cancel_return'], $page_ids )
	) { 
		$critical_page_problem = TRUE;
	} else {
	
		$ee_pages = array(
				$org_options['event_page_id'] => array(get_page($org_options['event_page_id']), '[ESPRESSO_EVENTS]'),
				$org_options['return_url'] => array(get_page($org_options['return_url']), '[ESPRESSO_PAYMENTS]'),
				$org_options['notify_url'] => array(get_page($org_options['notify_url']), '[ESPRESSO_TXN_PAGE]'),
				$org_options['cancel_return'] => array(get_page($org_options['cancel_return']), 'ESPRESSO_CANCELLED')
			);

		foreach ($ee_pages as $ee_page) {
			if ( ! isset($ee_page[0]->post_status) || $ee_page[0]->post_status != 'publish' || strpos( $ee_page[0]->post_content, $ee_page[1] ) === false) {	
				$critical_page_problem = TRUE;
			}
		}
			
	}

	if ( $critical_page_problem ) {
		require_once( EE_CORE . 'admin/admin_helper.php' );
		add_action('admin_notices', 'espresso_page_problems');
	}


}


/**
* espresso_check_data_tables
* 
* ensures that the database has been updated to the current version
* and also ensures that all necessary data migration scripts have been applied
* in order to bring the content of the database up to snuff as well
* 
* @since 3.1.28
* @return void
*/
function espresso_check_data_tables() {

	// check if db has been updated, cuz autoupdates don't trigger database install script
	$espresso_db_update = get_option( 'espresso_db_update' );
	// chech that option is an array
	if( ! is_array( $espresso_db_update )) {
		// if option is FALSE, then it never existed
		if ( $espresso_db_update === FALSE ) {
			// make $espresso_db_update an array and save option with autoload OFF
			$espresso_db_update =  array();
			add_option( 'espresso_db_update', $espresso_db_update, '', 'no' );
		} else {
			// option is NOT FALSE but also is NOT an array, so make it an array and save it
			$espresso_db_update =  array( $espresso_db_update );
			update_option( 'espresso_db_update', $espresso_db_update );
		}
	}
	
	// if current EE version is NOT in list of db updates, then update the db
	if ( ! in_array( EVENT_ESPRESSO_VERSION, $espresso_db_update )) {
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
		events_data_tables_install();
	}	
	
	// grab list of any existing data migrations from db
	if ( ! $existing_data_migrations = get_option( 'espresso_data_migrations' )) {
		// or initialize as an empty array
		$existing_data_migrations = array();
		// and set WP option
		add_option( 'espresso_data_migrations', array(), '', 'no' );
	}

	// array of all previous data migrations to date
	// using the name of the callback function for the value
	$espresso_data_migrations = array(
	);
	
	// temp array to track scripts we need to run 
	$scripts_to_run = array();
	// for tracking script errors
	$previous_script = '';
	// if we don't need them, don't load them
	$load_data_migration_scripts = FALSE;
	// have we already performed some data migrations ?
	if ( ! empty( $existing_data_migrations )) {	
		// loop through all previous migrations
		foreach ( $existing_data_migrations as $ver => $migrations ) {
			// ensure that migrations is an array, then loop thru it
			$migrations = is_array( $migrations ) ? $migrations : array( $migrations );
			foreach ( $migrations as $migration_func => $errors_array ) {
				// make sure they have been executed
				if ( ! in_array( $migration_func, $espresso_data_migrations )) {		
					// ok NOW load the scripts
					$load_data_migration_scripts = TRUE;
					$scripts_to_run[ $migration_func ] = $migration_func;
				} 
			}
		}		
		
	} else {
		$load_data_migration_scripts = TRUE;
		$scripts_to_run = $espresso_data_migrations;
	}

	if ( $load_data_migration_scripts && ! empty( $scripts_to_run )) {
		require_once( 'includes/functions/data_migration_scripts.php' );		
		// run the appropriate migration script
		foreach( $scripts_to_run as $migration_func ) {
			if ( function_exists( $migration_func )) {
				call_user_func( $migration_func );
			}		
		}
	}


}


function espresso_plugin_activation() {

	$prev_version = get_option( 'events_detail_tbl_version' );
	if ( $prev_version && version_compare( $prev_version, '3.2.0', '<' )) {
	
		wp_die( '
		<h2 style="color:red; font-size:2em; text-align:center;">' . __( 'Warning!', 'event_espresso' ) . '</h2>
		<p style="font-size:1.4em; text-align:center;">
			' . __( 'THIS COPY OF EVENT ESPRESSO IS FOR TESTING OR DEVELOPMENT PURPOSES ONLY.<br/><br/>DO NOT USE THIS SOFTWARE ON A LIVE OR ACTIVE WEBSITE.<br/><br/>Alpha versions of this software can not be activated on sites containing existing installations of Event Espresso.<br/><br/>If you wish to activate this software for testing or development purposes, please utilize a fresh install of WordPress on a localhost or password protected development server.<br/><br/><span style="font-size:.7em;">Please press the back button on your browser to return to the plugins page.</span>', 'event_espresso' ) . '
		</p>');

	} else {
		
		if ( file_exists( EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/init.php' )) {
			require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/init.php' );
			espresso_caffeinated_activation();
		}

		espresso_get_user_id();
		//include autoloaders
		require_once(  EVENT_ESPRESSO_INCLUDES_DIR . 'functions/plugins_loaded.php');
		require_once(  EVENT_ESPRESSO_INCLUDES_DIR . 'functions/init.php');
		espresso_autoload();
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
		espresso_check_data_tables();
		espresso_initialize_system_questions();
		event_espresso_create_upload_directories();
		espresso_org_option_initialization();
		espresso_fix_org_options();
		espresso_update_active_gateways();
		espresso_default_prices();
		espresso_default_price_types();
		espresso_default_status_codes();
		espresso_delete_unused_db_tables();
		espresso_default_message_templates();
		espresso_default_countries();
		espresso_default_states();
		espresso_create_no_ticket_prices_array();
		espresso_add_rewrite_rules( TRUE );			
	}
}




/**
 * 		loads and instantiates files and objects for EE admin pages
 * 		@access public
 * 		@return void
 */
function espresso_init_admin_pages() {
	
	espresso_verify_default_pages_exist();
	
	$load_SPCO = FALSE;
		
	$e_reg_pages = array( 
					'register', 
					'process_reg_step_1', 
					'process_reg_step_2', 
					'process_reg_step_3', 
					'event_queue'
			);
	$load_SPCO = isset( $_REQUEST['e_reg'] ) && ( in_array( $_REQUEST['e_reg'], $e_reg_pages )) ? TRUE : $load_SPCO;
		
	$e_reg_ajax_actions = array( 
					'espresso_process_registration_step_1', 
					'espresso_process_registration_step_2', 
					'espresso_process_registration_step_3'
			);
	$load_SPCO = isset( $_REQUEST['action'] ) && ( in_array( $_REQUEST['action'], $e_reg_ajax_actions )) ? TRUE : $load_SPCO;
			
	if ( $load_SPCO ) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Single_Page_Checkout.class.php');
		global $Single_Page_Checkout;
		$Single_Page_Checkout = EE_Single_Page_Checkout::instance();	
		define("ESPRESSO_REG_PAGE_FILES_LOADED", "true");
	}
	require_once( EE_CORE . 'admin/EE_Admin_Page_load.controller.php');

	//this loads the controller for the admin pages which will setup routing etc
	try {
		$EEAdmin = new EE_Admin_Page_load();
	} catch ( EE_Error $e ) {
		$e->get_error();
	}
	
}





function espresso_check_no_ticket_prices_array() {
	$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', FALSE );
	//printr( $espresso_no_ticket_prices, '$espresso_no_ticket_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	if ( $espresso_no_ticket_prices ) {
		$no_ticket_prices_msg = __( '<strong>Warning!</strong> The following events have no ticket prices set for them and will therefore not allow registrations:', 'event_espresso' );
		foreach ( $espresso_no_ticket_prices as $EVT_ID => $event_name ) {
			if ( empty( $EVT_ID )) {
				unset( $espresso_no_ticket_prices[ $EVT_ID ] );
			} else {
				$edit_event_url = EE_Admin_Page::add_query_args_and_nonce( array( 'page'=>'espresso_events', 'action'=>'edit_event', 'EVT_ID'=>$EVT_ID ),  admin_url( 'admin.php?' ));
				$event_name = stripslashes( htmlentities( $event_name, ENT_QUOTES, 'UTF-8' ));
				$no_ticket_prices_msg .= '<br/><a href="' . $edit_event_url . '" title="' . sprintf( __( 'Edit Event: %s', 'event_espresso' ), $event_name ) .'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>';
			}
		}
		$no_ticket_prices_msg .= '<br/>' . __( 'click on the event name to go to the event editor and correct this issue.', 'event_espresso' );
		EE_Error::add_error( $no_ticket_prices_msg, __FILE__, __FUNCTION__, __LINE__ );
		add_action( 'admin_notices', 'espresso_display_admin_notice' );
		update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
	}
}





function espresso_display_admin_notice() {
	echo EE_Error::get_notices();
}





function event_espresso_filter_plugin_actions($links, $file) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	// Static so we don't call plugin_basename on every plugin row.
	static $this_plugin;
	if (!$this_plugin)
		$this_plugin = plugin_basename(espresso_main_file());

	if ($file == $this_plugin) {
		$org_settings_link = '<a href="admin.php?page=espresso_general_settings">' . __('Settings') . '</a>';
		$events_link = '<a href="admin.php?page=espresso_events">' . __('Events') . '</a>';
		array_unshift($links, $org_settings_link, $events_link); // before other links
	}
	return $links;
}





function espresso_toolbar_items($admin_bar) {

	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$menu_class = 'espresso_menu_item_class';

	//Top Level
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar',
			'title' => '<span class="ab-icon-espresso"></span><span class="ab-label">' . _x('Event Espresso', 'admin bar menu group label') . '</span>',
			'href' => EVENTS_ADMIN_URL,
			'meta' => array(
					'title' => __('Event Espresso'),
					'class' => $menu_class . 'first'
			),
	));

	//Events
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events',
			'parent' => 'espresso-toolbar',
			'title' => 'Events',
			'href' => EVENTS_ADMIN_URL,
			'meta' => array(
					'title' => __('Events'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events Add New
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-new',
			'parent' => 'espresso-toolbar-events',
			'title' => 'Add New',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'add_event' ), EVENTS_ADMIN_URL ),
			'meta' => array(
					'title' => __('Add New'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-view',
			'parent' => 'espresso-toolbar-events',
			'title' => 'View',
			'href' => EVENTS_ADMIN_URL,
			'meta' => array(
					'title' => __('View'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View All
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-all',
			'parent' => 'espresso-toolbar-events-view',
			'title' => 'All',
			'href' => EVENTS_ADMIN_URL,
			'meta' => array(
					'title' => __('All'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View Today
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-today',
			'parent' => 'espresso-toolbar-events-view',
			'title' => 'Today',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), EVENTS_ADMIN_URL ),
			'meta' => array(
					'title' => __('Today'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Events View This Month
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-events-month',
			'parent' => 'espresso-toolbar-events-view',
			'title' => 'This Month',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), EVENTS_ADMIN_URL ),
			'meta' => array(
					'title' => __('This Month'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations',
			'parent' => 'espresso-toolbar',
			'title' => 'Registrations',
			'href' => REG_ADMIN_URL,
			'meta' => array(
					'title' => __('Registrations'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today',
			'parent' => 'espresso-toolbar-registrations',
			'title' => 'Today',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Today'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Completed
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-approved',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Approved',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RAP' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Approved'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Pending
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-pending',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Pending',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RPN' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Pending'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Incomplete
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-not-approved',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Not Approved',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RNA' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Not Approved'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Incomplete
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-cancelled',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Cancelled',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RCN' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Cancelled'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month',
			'parent' => 'espresso-toolbar-registrations',
			'title' => 'This Month',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('This Month'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Approved
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-approved',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Approved',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RAP' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Approved'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Pending
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-pending',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Pending',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RPN' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Pending'),
					'target' => '',
					'class' => $menu_class
			),
	));
	
	//Registration Overview This Month Not Approved
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-not-approved',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Not Approved',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RNA' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Not Approved'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Cancelled
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-cancelled',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Cancelled',
			'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RCN' ), REG_ADMIN_URL ),
			'meta' => array(
					'title' => __('Cancelled'),
					'target' => '',
					'class' => $menu_class
			),
	));
}





/**
 * 		Handles exporting of csv files
 *
 * 		@access public
 * 		@return void
 */
function espresso_check_for_export() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	if (isset($_REQUEST['export'])) {
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance();
			$EE_Export->export();
		}
	}
}





/**
 * 		Handles importing of csv files
 *
 * 		@access public
 * 		@return void
 */
function espresso_check_for_import() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
	if (isset($_REQUEST['import'])) {
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
			$EE_Import = EE_Import::instance();
			$EE_Import->import();
		}
	}
}
