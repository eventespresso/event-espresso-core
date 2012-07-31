<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

function espresso_load_jquery() {

	global $org_options;

    wp_enqueue_script( 'jquery' );
//	if (function_exists('event_espresso_multi_reg_init') || (isset($_REQUEST['page']) && ( $_REQUEST['page'] == 'form_builder' || $_REQUEST['page'] == 'form_groups'))) {
//		wp_enqueue_script('ee_ajax_request', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/espresso_cart_functions.js', array('jquery'));
//		wp_localize_script('ee_ajax_request', 'EEGlobals', array('ajaxurl' => admin_url('admin-ajax.php'), 'plugin_url' => EVENT_ESPRESSO_PLUGINFULLURL, 'event_page_id' => $org_options['event_page_id']));
//	}
}





function espresso_load_admin_ajax_callbacks() {

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

	global $org_options, $espresso_premium;
	if (!is_user_logged_in()) {
		return;
	}
		
	define('EVENTS_ADMIN_URL', admin_url('admin.php?page=events'));

//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . "functions/main.php");
//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/actions.php');
//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/filters.php');

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_screen.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_menu.php');

	add_action('wp_dashboard_setup', 'espresso_dashboard_init');

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

				case 'attendees' :
					require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/attendees.php');
					break;

//				case 'registrations' :
//					require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/registrations/Registrations.class.php');
//					break;

//				case 'transactions' :
//					require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/transactions/Transactions.class.php');
//					break;

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


				case 'pricing' :
					require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/pricing/pricing.php');
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
				'event_staff', 'events', 'attendees', 'espresso_reports',
				'support', 'template_confg', 'template_map_confg',
				'payment_gateways', 'members', 'espresso_social',
				'admin_addons', 'espresso_calendar', 'event_tickets',
				'event_certificates', 'espresso-mailchimp',
				'espresso_permissions', 'roles', 'event_locales',
				'event_groups', 'test_drive', 'espresso_https', 'pricing'
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
	if (event_espresso_verify_attendee_data() == true &&
					(empty($_POST['action']) || $_POST['action'] != 'event_espresso_update_attendee_data')) {
		add_action('admin_notices', 'event_espresso_registration_id_notice');
	}

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
	$page_ids = get_all_page_ids();
	if (empty($org_options['event_page_id'])
					|| !in_array($org_options['event_page_id'], $page_ids)
					|| empty($org_options['return_url'])
					|| !in_array($org_options['return_url'], $page_ids)
					|| empty($org_options['notify_url'])
					|| !in_array($org_options['notify_url'], $page_ids)
					|| empty($org_options['cancel_return'])
					|| !in_array($org_options['cancel_return'], $page_ids)) {
		espresso_create_default_pages();
	}
	$ee_pages = array($org_options['event_page_id'] => array(get_page($org_options['event_page_id']), '[ESPRESSO_EVENTS]'),
			$org_options['return_url'] => array(get_page($org_options['return_url']), '[ESPRESSO_PAYMENTS]'),
			$org_options['notify_url'] => array(get_page($org_options['notify_url']), '[ESPRESSO_TXN_PAGE]'),
			$org_options['cancel_return'] => array(get_page($org_options['cancel_return']), 'ESPRESSO_CANCELLED'));
	foreach ($ee_pages as $ee_page) {
		if ($ee_page[0]->post_status != 'publish' or strpos($ee_page[0]->post_content, $ee_page[1]) === false) {
			add_action('admin_notices', 'espresso_page_problems');
		}
	}
}


function espresso_test_for_reg_page() {
	global $org_options;
	$this_is_a_reg_page = FALSE;

	if (isset($org_options['event_page_id'])) {
		$reg_page_ids = array(
				'event_page_id' => $org_options['event_page_id'],
				'return_url' => $org_options['return_url'],
				'cancel_return' => $org_options['cancel_return'],
				'notify_url' => $org_options['notify_url']
		);

		if (empty($_GET['page_id'])) {
			foreach ($reg_page_ids as $reg_page_id) {
				$link = get_permalink($reg_page_id);
				$offset = strlen($_SERVER['SERVER_NAME']) + strpos($link, $_SERVER['SERVER_NAME']);
				$stripped_link = substr($link, $offset);
				if (strpos($_SERVER['REQUEST_URI'], $stripped_link) !== false) {
					$this_is_a_reg_page = TRUE;
					break;
				}
			}
		} else {
			if (in_array($_GET['page_id'], $reg_page_ids)) {
				$this_is_a_reg_page = TRUE;
			}
		}
	}
	return $this_is_a_reg_page;
}


function espresso_frontend_init() {

	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event_Object.class.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event.class.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Attendee.class.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Venue.class.php';

	event_espresso_require_gateway('process_payments.php');

	global $espresso_reg_page;
	$espresso_reg_page = espresso_test_for_reg_page();

	if ($espresso_reg_page) {
		do_action('action_hook_espresso_load_reg_page_files');
	}

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'shortcodes.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/ical.php');
	//Registration forms
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/form_build.php');

	//Custom post type integration
	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/custom_post_type.php') && !empty($org_options['template_settings']['use_custom_post_types'])) {
		require(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/custom_post_type.php');
	}
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/gmap_incl.php');

	add_action ( 'action_hook_espresso_regevent_default_action', 'display_all_events', 10, 1 );
	add_action ( 'action_hook_espresso_event_registration', 'event_details_page', 10, 2 );

	if ( ! isset( $_REQUEST['e_reg'] ) && ! is_admin() ) {
		wp_register_style('ticket_selector', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/ticket_selector/ticket_selector.css');
		wp_enqueue_style('ticket_selector');
	}


	do_action('action_hook_espresso_require_template', 'init.php');
	//These may be loaded in posts and pages outside of the default EE pages
	require_once(espresso_get_event_list_template());
	//This is the form page for registering the attendee
	require_once(espresso_get_registration_page_template());
	//List Attendees - Used with the [LISTATTENDEES] shortcode
	require_once(espresso_get_attendee_list_template());

	// Export iCal file
	if (!empty($_REQUEST['iCal'])) {
		espresso_ical();
	}
}



function espresso_export_certificate() {
	if (isset($_REQUEST['certificate_launch']) && $_REQUEST['certificate_launch'] == 'true') {
		echo espresso_certificate_launch($_REQUEST['id'], $_REQUEST['r_id']);
	}
}

function espresso_export_invoice() {
	//Version 2.0
	if (isset($_REQUEST['invoice_launch']) && $_REQUEST['invoice_launch'] == 'true') {
		if (isset($_REQUEST['id'])) {
			global $EEM_Gateways;
			$_REQUEST['id'] = sanitize_key( $_REQUEST['id'] );
			if (!defined('ESPRESSO_GATEWAYS')) {
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
				$EEM_Gateways = EEM_Gateways::instance();
			}
			$EEM_Gateways->send_invoice($_REQUEST['id']);
		}
	}
}

function espresso_export_ticket() {
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
		add_rewrite_rule($reg_page_url_slug . '/([^/]+)?/$', 'index.php?pagename=' . $reg_page_url_slug . '&event_slug=$matches[1]', 'top');
		add_rewrite_rule($reg_page_url_slug . '/([^/]+)?$', 'index.php?pagename=' . $reg_page_url_slug . '&event_slug=$matches[1]', 'top');
	}
}

function espresso_flush_rewrite_rules() {
	if (is_admin() && isset($_REQUEST['page']) && $_REQUEST['page'] == 'event_espresso') {
		flush_rewrite_rules();
	}
}

function espresso_dashboard_init() {
	global $org_options, $espresso_premium;
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/dashboard_widget.php');
	wp_add_dashboard_widget('espresso_news_dashboard_widget', 'Event Espresso News', 'espresso_news_dashboard_widget_function');
	if (!empty($org_options['espresso_dashboard_widget']) && $espresso_premium) {
		event_espresso_dashboard_widget();
	}
}
