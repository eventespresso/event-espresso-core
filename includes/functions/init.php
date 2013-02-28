<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );


function espresso_load_jquery() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
    wp_enqueue_script( 'jquery' );
}





function espresso_load_admin_ajax_callbacks() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

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
	$page_ids = get_all_page_ids();
	if (	! isset( $org_options['event_page_id'] ) || empty( $org_options['event_page_id'] ) || ! in_array( $org_options['event_page_id'], $page_ids )|| 
			! isset( $org_options['return_url'] ) || empty( $org_options['return_url'] ) || ! in_array( $org_options['return_url'], $page_ids ) || 
			! isset( $org_options['notify_url'] ) || empty( $org_options['notify_url'] ) || ! in_array( $org_options['notify_url'], $page_ids ) || 
			! isset( $org_options['cancel_return'] ) || empty( $org_options['cancel_return'] ) || ! in_array( $org_options['cancel_return'], $page_ids )
	) { 
		espresso_create_default_pages(); 
	}
}





function espresso_frontend_init() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	
	global $espresso_reg_page;
	if ( $espresso_reg_page = espresso_test_for_reg_page() ) {
		do_action('action_hook_espresso_load_reg_page_files');
	}

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'shortcodes.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/ical.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/affiliate-handling.php');

	//Registration forms
	//require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/form_build.php');

	//Custom post type integration
	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/custom_post_type.php') && !empty($org_options['template_settings']['use_custom_post_types'])) {
		require(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/custom_post_type.php');
	}
	
	add_action ( 'action_hook_espresso_regevent_default_action', 'display_all_events', 10, 1 );
	add_action ( 'action_hook_espresso_event_registration', 'event_details_page', 10, 2 );


	// Export iCal file
	if (!empty($_REQUEST['iCal'])) {
		espresso_ical();
	}
}





function espresso_parse_site_url_for_ssl() {
	return is_ssl() ? str_replace( 'https://', '', site_url() ) :  str_replace( 'http://', '', site_url() );
}





function espresso_critical_pages( $page_id, $event_page_slug = FALSE ) {

	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$reg_page_ids = array(
			$org_options['event_page_id'] => 'event_page_id',
			$org_options['notify_url'] => 'notify_url',
			$org_options['return_url'] => 'return_url',
			$org_options['cancel_return'] => 'cancel_return'
	);
/*echo "reg page ids:";
foreach($reg_page_ids as $id=>$reg_pad){
	echo "link:".get_permalink($id);
	echo " key:$id, value:$reg_pad <br>";
}
var_dump($reg_page_ids);*/
	if ( isset( $reg_page_ids[ $page_id ] )) {
		$current_ee_page = $page_id;
		switch( $reg_page_ids[ $page_id ] ) {
			case 'event_page_id' :
					$this_is_a_reg_page = TRUE;
					add_action( 'wp', 'event_espresso_run', 100 );
					return TRUE;
				break;
			case 'notify_url' :
					$this_is_a_reg_page = TRUE;
					//add_action( 'wp', 'event_espresso_txn', 101 );
					return TRUE;
				break;			
			case 'return_url' :
					$this_is_a_reg_page = TRUE;
					//add_action( 'wp', 'espresso_thank_you_page', 102 );
					return TRUE;
				break;
		}		
	}
	
	return FALSE;

}





function espresso_test_for_reg_page() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$this_is_a_reg_page = FALSE;

	espresso_create_default_pages();
	
	$critical_page_ids = array(
		'event_page_id' => $org_options['event_page_id'],
		'return_url' => $org_options['return_url'],
		'cancel_return' => $org_options['cancel_return'],
		'notify_url' => $org_options['notify_url']
	);
	
	// first check if a page is being used for the frontpage
	if ( get_option('show_on_front') == 'page' ) {
		// grab that page's id
		$frontpage = get_option('page_on_front');
		// is it a critical page ?
		$this_is_a_reg_page = espresso_critical_pages( $frontpage );
	}
	//  if this is not a critical page
	if ( ! $this_is_a_reg_page ) {
		// grab page_id if it's set
		$page_id = isset( $_GET['page_id'] ) ? absint( $_GET['page_id'] ) : NULL; 
		if ( ! empty( $page_id )) {
			espresso_critical_pages( $page_id );
		} else {
			// loop thru our critical pages and gather further intel
			foreach ( $critical_page_ids as $critical_page_id ) {
				// get permalink for critical page
				$link = get_permalink( $critical_page_id );
				// if they have their home_url set in the WP settings
				if ( $home = home_url() ) {
					// then we can drill down to the exact page slug
					$event_page_slug = trim( substr( $link, strlen( $home )), '/' );
				} else {
					// or determine strlen up to and including domain
					$offset = strlen( $_SERVER['SERVER_NAME'] ) + strpos( $link, $_SERVER['SERVER_NAME'] );
					// whatever's left is, or includes the page slug
					$event_page_slug = substr( $link, $offset );	
				}
				// is the page slug for the critical page in the current request ?
				if ( strpos( $_SERVER['REQUEST_URI'], $event_page_slug ) !== false) {
					espresso_critical_pages( $critical_page_id, $event_page_slug );
					break;
				}
			}
		}
	}

	return $this_is_a_reg_page;
}


	


function event_espresso_run() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	do_action('action_hook_espresso_event_espresso_run_start');
	// grab some globals
	global $load_espresso_scripts, $espresso_content;

	// tell the plugin to load the required scripts
	$load_espresso_scripts = true;

	// begin output buffering
	ob_start();

	//Make sure scripts are loading
	echo espresso_check_scripts();

	// Get action type
	$e_reg = isset($_REQUEST['e_reg']) ? sanitize_text_field( $_REQUEST['e_reg'] ) : '';
	switch ($e_reg) {

		case 'process_ticket_selections' :
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' e_reg = process_ticket_selections'  );
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Selector.class.php');
			EE_Ticket_Selector::process_ticket_selections();
			break;

		case 'register' :
			if ( ! defined( 'MER_ACTIVE' )) {
				espresso_clear_session();
			}			
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' e_reg = register'  );
			remove_all_actions('action_hook_espresso_regevent_default_action');
			remove_all_actions('action_hook_espresso_event_registration');
			do_action('action_hook_espresso_event_reg_checkout');
			break;

		case 'edit_attendee' :
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' e_reg = edit_attendee'  );
			remove_all_actions('action_hook_espresso_regevent_default_action');
			remove_all_actions('action_hook_espresso_event_registration');
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/attendee_edit_record.php');
			attendee_edit_record();
			break;

		default :
			if ( ! defined( 'MER_ACTIVE' )) {
				espresso_clear_session();
			}			

			espresso_require_template('init.php');

			// check if this is an event list or an event detail page by looking for event slug
			$event_detail_page = get_query_var('event_slug') ? TRUE : FALSE;

			if ( $event_detail_page or isset( $_REQUEST['ee'] ) ) {
				do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' e_reg = event_detail_page'  );
				//This is the form page for registering the attendee
				require_once(espresso_get_registration_page_template());
				do_action ( 'action_hook_espresso_event_registration' );
			} else {
				do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' e_reg = event_list'  );
				require_once(espresso_get_event_list_template());
				do_action ( 'action_hook_espresso_regevent_default_action', $e_reg );
			}

	}

	$espresso_content =  ob_get_clean();
	add_shortcode( 'ESPRESSO_EVENTS', 'return_espresso_content' );

}





function return_espresso_content() {
	global $espresso_content;
	return $espresso_content;
}





function espresso_export_certificate() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	if (isset($_REQUEST['certificate_launch']) && $_REQUEST['certificate_launch'] == 'true') {
		echo espresso_certificate_launch($_REQUEST['id'], $_REQUEST['r_id']);
	}
}





function espresso_export_invoice() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	//Version 2.0
	if (isset($_REQUEST['invoice_launch']) && $_REQUEST['invoice_launch'] == 'true') {
		if (isset($_REQUEST['id'])) {
			$_REQUEST['id'] = sanitize_key( $_REQUEST['id'] );
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/invoice/lib/Invoice.class.php");
			$invoice = new Invoice($_REQUEST['id']);
			$invoice->send_invoice();
		}
	}
	//End Version 2.0
	//Export pdf version
	if (isset($_REQUEST['download_invoice']) && $_REQUEST['download_invoice'] == 'true') {
		if (isset($_REQUEST['id'])) {
			$_REQUEST['id'] = sanitize_key( $_REQUEST['id'] );
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/invoice/lib/Invoice.class.php");
			$invoice = new Invoice($_REQUEST['id']);
			// send invoice but force download
			$invoice->send_invoice( TRUE ); 
		}
	}
	//End pdf version
}





function espresso_export_ticket() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	//Version 2.0
	if (isset($_REQUEST['ticket_launch']) && $_REQUEST['ticket_launch'] == 'true') {
		echo espresso_ticket_launch($_REQUEST['id'], $_REQUEST['r_id']);
	}
	//End Version 2.0
	//Deprecated version 1.0
	//Export PDF Ticket
	if (isset($_REQUEST['download_ticket']) && $_REQUEST['download_ticket'] == 'true') {
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")) {
			require_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php");
			espresso_ticket($_REQUEST['id'], $_REQUEST['registration_id']);
		}
	}
	//End Deprecated version 1.0
}





function espresso_add_rewrite_rules() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	global $wpdb, $org_options;

	if (empty($org_options['event_page_id'])) {
		return;
	}
	$reg_page_id = $org_options['event_page_id'];
//	echo '<h4>$reg_page_id : ' . $reg_page_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	$use_pretty_permalinks = espresso_use_pretty_permalinks();
//	echo '<h4>$use_pretty_permalinks : ' . $use_pretty_permalinks . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

	if ($use_pretty_permalinks) {
		// create pretty permalinks
		$SQL = 'SELECT post_name  FROM ' . $wpdb->prefix . 'posts WHERE ID = %d';
		$reg_page_url_slug = $wpdb->get_var($wpdb->prepare($SQL, $reg_page_id));
//		echo '<h4>$reg_page_url_slug : ' . $reg_page_url_slug . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		// rules for event slug pretty links
		add_rewrite_rule( $reg_page_url_slug . '/([^/]+)/?$', 'index.php?pagename=' . $reg_page_url_slug . '&event_slug=$matches[1]', 'top');
		//add_rewrite_rule( $reg_page_url_slug . '/([^/]+)/?$', 'index.php?pagename=' . $reg_page_url_slug . '&e_reg=$matches[1]', 'top');
	}
	
}





function espresso_flush_rewrite_rules() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	global $pagenow;
	if ( is_admin() && (( isset($_REQUEST['page']) && $_REQUEST['page'] == 'event_espresso' ) || ( $pagenow == 'options-permalink.php' ))) {
		espresso_add_rewrite_rules();
		flush_rewrite_rules();
	}
}





function espresso_dashboard_init() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	global $org_options, $espresso_premium;
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/dashboard_widget.php');
	wp_add_dashboard_widget('espresso_news_dashboard_widget', 'Event Espresso News', 'espresso_news_dashboard_widget_function');
	if (!empty($org_options['espresso_dashboard_widget']) && $espresso_premium) {
		event_espresso_dashboard_widget();
	}
}





function ee_update_questions_sequence() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $wpdb;
	//Update the questions when re-ordering
	if (!empty($_POST['update_sequence'])) {
		$rows = explode(",", $_POST['row_ids']);
		for ($i = 0; $i < count($rows); $i++) {
			$wpdb->query("UPDATE " . EVENTS_QUESTION_TABLE . " SET sequence=" . $i . " WHERE id='" . $rows[$i] . "'");
		}
		exit();
	}
}





function ee_update_question_groups_sequence() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $wpdb;
	//Update the questions when re-ordering
	if (!empty($_POST['update_sequence'])) {
		$rows = explode(",", $_POST['row_ids']);
		for ($i = 0; $i < count($rows); $i++) {
			$wpdb->query("UPDATE " . EVENTS_QST_GROUP_TABLE . " SET group_order=" . $i . " WHERE id='" . $rows[$i] . "'");
		}
		exit();
	}
}





function espresso_load_messages_init() {
	$EEMSGS_init = new EE_messages_init();
}







/**
 * 		loads and instantiates files and objects for EE admin pages
 * 		@access public
 * 		@return void
 */
function espresso_init_admin_pages() {
	
	global $org_options, $is_UI_request;
	
	if ( $is_UI_request ) {
		
		// Check to make sure all of the main pages are setup properly,
		// if not create the default pages and display an admin notice
		espresso_verify_default_pages_exist();
		
		$ee_pages = array(
				$org_options['event_page_id'] => array(get_page($org_options['event_page_id']), '[ESPRESSO_EVENTS]'),
				$org_options['return_url'] => array(get_page($org_options['return_url']), '[ESPRESSO_PAYMENTS]'),
				$org_options['notify_url'] => array(get_page($org_options['notify_url']), '[ESPRESSO_TXN_PAGE]'),
				$org_options['cancel_return'] => array(get_page($org_options['cancel_return']), 'ESPRESSO_CANCELLED')
			);

		foreach ($ee_pages as $ee_page) {
			if ( ! isset($ee_page[0]->post_status) || $ee_page[0]->post_status != 'publish' || strpos( $ee_page[0]->post_content, $ee_page[1] ) === false) {
				add_action('admin_notices', 'espresso_page_problems');
			}
		}
	}		$load_SPCO = FALSE;
		
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
			//Process email confirmations
			//require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/email.php');
			define("ESPRESSO_REG_PAGE_FILES_LOADED", "true");
		}

	//this loads the controller for the admin pages which will setup routing etc
	try {
		$EEAdmin = new EE_Admin_Page_load();
	} catch ( EE_Error $e ) {
		$e->get_error();
	}
	
}
