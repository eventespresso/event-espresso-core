<?php 
if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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






function espresso_admin_init() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

	global $org_options, $espresso_premium, $is_UI_request;
	if (!is_user_logged_in()) {
		return;
	}
		
	define('EVENTS_ADMIN_URL', admin_url('admin.php?page=events'));

//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . "functions/main.php");
//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/actions.php');
//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/filters.php');

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_menu.php');

	if ( $is_UI_request ) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_screen.php');

		add_action('wp_dashboard_setup', 'espresso_dashboard_init');
		do_action('action_hook_espresso_require_template', 'init.php'); 

		if (!empty($_REQUEST['page'])) {

			switch ( $_REQUEST['page'] ) {

					case 'events' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/event_management.php');
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/event_management.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/event_management.php');
						}
						if (isset($_REQUEST['save']) || isset($_REQUEST['action'])) {
							if (isset($_REQUEST['save'])
											|| $_REQUEST['action'] == 'edit_event'
											|| $_REQUEST['action'] == 'add_new_event') {
								require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/functions.php');
								require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin_screens/events/event_functions.php");
							}
						}
						break;


					case 'event_categories' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/categories.php');
						break;


					case 'form_groups' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/question_groups.php');
						break;


					case 'form_builder' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/questions.php');
						break;


					case 'discounts' :
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/coupon_management.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/coupon_management.php');
						}
						break;


					case 'event_emails' :
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/email_manager.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/email-manager.php');
						}
						break;
						

					case 'event_staff' :
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/staff-management/index.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/staff-management.php');
						}
						break;


					case 'event_venues' :
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/venue-management/index.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/venue_management.php');
						}
						break;


					case 'event_espresso' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/organization_config.php');
						if ($espresso_premium)
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/optional_event_settings.php');
						break;


					case 'payment_gateways' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
						$EEM_Gateways = EEM_Gateways::instance();
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/payment_gateways.php');
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/gateway_developer.php');
						}
						break;


					case 'template_confg' :
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/template_confg.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/template_confg.php');
						}
						break;


					case 'template_map_confg' :
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/template_map_confg.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/template_map_confg.php');
						}
						break;


					case 'admin_addons' :
						if ($espresso_premium) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/admin_addons.php');
						} else {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/admin_addons.php');
						}
						break;


					case 'test_drive' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/test_drive_pro.php');
						break;


					case 'support' :
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_support.php');
						break;

			} // end switch

			$espresso_pages = array('event_espresso', 'discounts', 'groupons',
					'event_categories', 'admin_reports', 'form_builder',
					'form_groups', 'my-events', 'event_emails', 'event_venues',
					'event_staff', 'events', 'espresso_reports',
					'support', 'template_confg', 'template_map_confg',
					'payment_gateways', 'members', 'espresso_social',
					'admin_addons', 'espresso_calendar', 'event_tickets',
					'event_certificates', 'espresso-mailchimp',
					'espresso_permissions', 'roles', 'event_locales',
					'event_groups', 'test_drive', 'espresso_https'
			);
			if (in_array($_REQUEST['page'], $espresso_pages)) {
				add_action('admin_print_scripts', 'event_espresso_config_page_scripts');
				add_action('admin_print_styles', 'event_espresso_config_page_styles');
				add_action('admin_head', 'espresso_add_meta_boxes');
			}

		}

		do_action('action_hook_espresso_require_admin_files');

		// Update the question sequences
		add_action('wp_ajax_update_sequence', 'event_espresso_questions_config_mnu');
		// Update the question group sequences
		add_action('wp_ajax_update_qgr_sequence', 'event_espresso_question_groups_config_mnu');

		// Check to make sure there are no empty registration id fields in the database.
//		if (event_espresso_verify_attendee_data() == true && (empty($_POST['action']) || $_POST['action'] != 'event_espresso_update_attendee_data')) {
//			add_action('admin_notices', 'event_espresso_registration_id_notice');
//		}

		// Update the question sequences
		add_action('wp_ajax_update_sequence', 'ee_update_questions_sequence');
		// Update the question group sequences
		add_action('wp_ajax_update_qgr_sequence', 'ee_update_question_groups_sequence');

		// copy themes to template directory
		if (isset($_REQUEST['event_espresso_admin_action'])) {
			if ($_REQUEST['event_espresso_admin_action'] == 'copy_templates') {
				add_action('admin_init', 'event_espresso_trigger_copy_templates');
			}
		}
		// copy gateways to gateway directory
		if (isset($_REQUEST['event_espresso_admin_action'])) {
			if ($_REQUEST['event_espresso_admin_action'] == 'copy_gateways') {
				add_action('admin_init', 'event_espresso_trigger_copy_gateways');
			}
		}
		
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
	}
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
	
	$espresso_reg_page = espresso_test_for_reg_page();
	//echo '<h4>$espresso_reg_page : ' . $espresso_reg_page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

	if ($espresso_reg_page) {
		do_action('action_hook_espresso_load_reg_page_files');
	}

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'shortcodes.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/ical.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/affiliate-handling.php');

	//Registration forms
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/form_build.php');

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





function espresso_shortcode_pages( $page_id ) {

	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$reg_page_ids = array(
			$org_options['event_page_id'] => 'event_page_id',
			$org_options['notify_url'] => 'notify_url',
			$org_options['return_url'] => 'return_url',
			$org_options['cancel_return'] => 'cancel_return'
	);

	if ( isset( $reg_page_ids[ $page_id ] )) {
		$current_ee_page = $page_id;
		switch( $reg_page_ids[ $page_id ] ) {
			case 'event_page_id' :
					$this_is_a_reg_page = TRUE;
					add_action( 'init', 'event_espresso_run', 100 );
				break;
			case 'notify_url' :
					$this_is_a_reg_page = TRUE;
					add_action( 'init', 'event_espresso_txn', 101 );
				break;			
			case 'return_url' :
					$this_is_a_reg_page = TRUE;
					add_action( 'init', 'espresso_thank_you_page', 102 );
				break;
		}		
	}

}





function espresso_test_for_reg_page() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	global $org_options, $current_ee_page, $this_is_a_reg_page;
	
	$this_is_a_reg_page = FALSE;

	espresso_create_default_pages();
	
	$reg_page_ids = array(
		'event_page_id' => $org_options['event_page_id'],
		'return_url' => $org_options['return_url'],
		'cancel_return' => $org_options['cancel_return'],
		'notify_url' => $org_options['notify_url']
	);
	
	$page_id = isset( $_GET['page_id'] ) ? absint( $_GET['page_id'] ) : NULL; 

	if ( ! empty( $page_id )) {
		espresso_shortcode_pages( $page_id );
	} else if ( get_option('show_on_front') == 'page' ) {
		$frontpage = get_option('page_on_front');
		espresso_shortcode_pages( $frontpage );
	} else {
		foreach ( $reg_page_ids as $reg_page_id ) {
			$link = get_permalink( $reg_page_id );
			$offset = strlen( $_SERVER['SERVER_NAME'] ) + strpos( $link, $_SERVER['SERVER_NAME'] );
			$stripped_link = substr( $link, $offset );
			if ( strpos( $_SERVER['REQUEST_URI'], $stripped_link ) !== false) {
				espresso_shortcode_pages( $reg_page_id );
				break;
			}
		}
	}

	return $this_is_a_reg_page;
}


	


function event_espresso_run() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	// grab some globals
	global $load_espresso_scripts, $espresso_content;

	// tell the plugin to load the required scripts
	$load_espresso_scripts = true;

	// begin output buffering
	ob_start();

	//Make sure scripts are loading
	echo espresso_check_scripts();

	// Get action type
	$e_reg = isset($_REQUEST['e_reg']) ? $_REQUEST['e_reg'] : '';

	switch ($e_reg) {

		case 'process_ticket_selections' :
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' e_reg = process_ticket_selections'  );
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Selector.class.php');
			EE_Ticket_Selector::process_ticket_selections();
			break;

		case 'register' :
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
			// check if this is an event list or an event detail page by looking for event slug
			$event_detail_page = get_query_var('event_slug') ? TRUE : FALSE;
			espresso_require_template('init.php');

			if ( $event_detail_page or isset($_REQUEST['ee']) ) {
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
	/*require('EE_Answer.class.php');
	$answer=new EE_Answer(1, 1, 'all your base');
	echo $answer->question_ID();
	echo $answer->registration_ID();
	echo $answer->value();
	echo $answer->get('ANS_value');
	echo $answer->get('ANS_ID');
	var_dump($answer);
	$answer->save();*/
//	require('EEM_Answer.model.php');
//	
//	$answerModel=  EEM_Answer::instance();
//	$answerModel->get_all_answers();
//	var_dump($answerModel);
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
	$use_pretty_permalinks = espresso_use_pretty_permalinks();

	if ($use_pretty_permalinks) {
		// create pretty permalinks
		$SQL = 'SELECT post_name  FROM ' . $wpdb->prefix . 'posts WHERE ID = %d';
		$reg_page_url_slug = $wpdb->get_var($wpdb->prepare($SQL, $reg_page_id));

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
