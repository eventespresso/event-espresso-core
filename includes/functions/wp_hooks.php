<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );


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
		espresso_autoload();
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
		espresso_check_data_tables();
		espresso_initialize_system_questions();
		event_espresso_create_upload_directories();
		espresso_org_option_initialization();
		espresso_fix_org_options();
		espresso_update_active_gateways();
		//espresso_default_prices();
		espresso_default_price_types();
		espresso_default_status_codes();
		espresso_delete_unused_db_tables();
		espresso_default_message_templates();
		espresso_default_countries();
		espresso_default_states();
	}
}

function espresso_widget() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	espresso_require_template('init.php');
	require(espresso_get_widget_template());
	//The widget can be over-ridden with the custom files addon
	register_widget('Event_Espresso_Widget');
}

function espresso_info_header() {
	print( "<meta name='generator' content='Event Espresso Version " . EVENT_ESPRESSO_VERSION . "' />");
}

function add_espresso_stylesheet() {
	global $org_options;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	//Load the ThemeRoller styles if enabled
	if (!empty($org_options['style_settings']['enable_default_style']) && $org_options['style_settings']['enable_default_style'] ==true) {

		//Load custom style sheet if available
//		if (!empty($org_options['style_settings']['use_grid_layout']) && $org_options['style_settings']['use_grid_layout'] == true) {
//			if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . 'css/grid_layout.css')) {
//				wp_register_style('espresso_grid_layout', EVENT_ESPRESSO_UPLOAD_URL . 'css/grid_layout.css');
//			} else {
//				wp_register_style('espresso_grid_layout', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/grid_layout.css');
//			}
//			wp_enqueue_style('espresso_grid_layout');
//		}

		//Define the path to the ThemeRoller files
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "themeroller/index.php")) {
			$themeroller_style_path = EVENT_ESPRESSO_UPLOAD_URL . 'themeroller/';
		} else {
			$themeroller_style_path = EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/themeroller/';
		}

		//Load custom style sheet if available
		if (!empty($org_options['style_settings']['css_name'])) {
			wp_register_style('espresso_custom_css', EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $org_options['style_settings']['css_name']);
			wp_enqueue_style('espresso_custom_css');
		}

		//Register the ThemeRoller styles
		if (!empty($org_options['themeroller']) && !is_admin()) {

			//Load the themeroller base style sheet
			//If the themeroller-base.css is in the uploads folder, then we will use it instead of the one in the core
			if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . $themeroller_style_path . 'themeroller-base.css')) {
				wp_register_style('espresso_themeroller_base', $themeroller_style_path . 'themeroller-base.css');
			} else {
				wp_register_style('espresso_themeroller_base', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/themeroller/themeroller-base.css');
			}
			wp_enqueue_style('espresso_themeroller_base');

			//Load the smoothness style by default<br />
			if (!isset($org_options['themeroller']['themeroller_style']) || empty($org_options['themeroller']['themeroller_style'])) {
				$org_options['themeroller']['themeroller_style'] = 'smoothness';
			}

			//Load the selected themeroller style
			wp_register_style('espresso_themeroller', $themeroller_style_path . $org_options['themeroller']['themeroller_style'] . '/style.css');
			wp_enqueue_style('espresso_themeroller');
		}
	}

	if ( ! isset( $_REQUEST['e_reg'] ) && ! is_admin() ) {
		wp_register_style('ticket_selector', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/ticket_selector/ticket_selector.css');
		wp_enqueue_style('ticket_selector');
	}
		
}

function espresso_load_javascript_files() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $load_espresso_scripts;

	if (!$load_espresso_scripts)
		return;

	wp_register_script('jquery.validate.js', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.validate.min.js"), false, '1.8.1');
//	wp_enqueue_script('jquery.validate.js');
//
//	wp_register_script('validation', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/validation.js"), false, EVENT_ESPRESSO_VERSION);
//	wp_enqueue_script('validation');
}




function eei18n_js_strings() {
	global $eei18n_js_strings;
	// Get current page protocol
	$protocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';
	// Output admin-ajax.php URL with same protocol as current page
	$eei18n_js_strings['ajax_url'] = admin_url('admin-ajax.php', $protocol);
	wp_localize_script( 'ticket_selector', 'eei18n', $eei18n_js_strings );
	wp_localize_script( 'single_page_checkout', 'eei18n', $eei18n_js_strings );
	// usage:  
	// global $eei18n_js_strings;
	// $eei18n_js_strings['string_key'] = __( 'string to translate.', 'event_espresso' );
	// in js file:
	// var translatedString = eei18n.string_key;
}




function espresso_toolbar_items($admin_bar) {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$events_page = get_admin_url() . 'admin.php?page=espresso_events';
	$registrations_page = get_admin_url() . 'admin.php?page=espresso_registrations';
	$menu_class = 'espresso_menu_item_class';

	//Top Level
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar',
			'title' => '<span class="ab-icon-espresso"></span><span class="ab-label">' . _x('Event Espresso', 'admin bar menu group label') . '</span>',
			'href' => $events_page,
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
			'href' => $events_page,
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
			'href' => $events_page . '&action=add_new_event',
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
			'href' => $events_page,
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
			'href' => $events_page,
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
			'href' => $events_page . '&today=true',
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
			'href' => $events_page . '&this_month=true',
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
			'href' => $registrations_page,
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
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true',
			'meta' => array(
					'title' => __('Today'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Completed
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-completed',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Completed',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true&payment_status=Completed',
			'meta' => array(
					'title' => __('Completed'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Incomplete
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-incomplete',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Incomplete',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true&payment_status=Incomplete',
			'meta' => array(
					'title' => __('Incomplete'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview Today Pending
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-today-pending',
			'parent' => 'espresso-toolbar-registrations-today',
			'title' => 'Pending',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&today_a=true&payment_status=Pending',
			'meta' => array(
					'title' => __('Pending'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month',
			'parent' => 'espresso-toolbar-registrations',
			'title' => 'This Month',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true',
			'meta' => array(
					'title' => __('This Month'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Completed
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-completed',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Completed',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true&payment_status=Completed',
			'meta' => array(
					'title' => __('Completed'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Incomplete
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-incomplete',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Incomplete',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true&payment_status=Incomplete',
			'meta' => array(
					'title' => __('Incomplete'),
					'target' => '',
					'class' => $menu_class
			),
	));

	//Registration Overview This Month Pending
	$admin_bar->add_menu(array(
			'id' => 'espresso-toolbar-registrations-month-pending',
			'parent' => 'espresso-toolbar-registrations-month',
			'title' => 'Pending',
			'href' => $registrations_page . '&event_admin_reports=event_list_attendees&this_month_a=true&payment_status=Pending',
			'meta' => array(
					'title' => __('Pending'),
					'target' => '',
					'class' => $menu_class
			),
	));
}

function espresso_add_query_vars($query_vars) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$query_vars[] = 'event_slug';
	$query_vars[] = 'ee';
	$query_vars[] = 'e_reg';
	//printr( $query_vars );
	return $query_vars;
}



/**
 * event_espresso_require_template()
 *
 * @param mixed $template_file_name // Name of template file.
 * @param bool $must_exist		  // Error if neither file exist.
 * @param bool $as_require_once	 // True for require_once(), False for require()
 * @return void	// No return value. File already included.
 *
 * Usage: event_espresso_require_template('shopping_cart.php')
 */
function espresso_require_template($template_file_name, $must_exist = true, $as_require_once = true) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	event_espresso_require_file($template_file_name, EVENT_ESPRESSO_TEMPLATE_DIR, EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', $must_exist, $as_require_once);
}
add_action('action_hook_espresso_require_template', 'espresso_require_template');