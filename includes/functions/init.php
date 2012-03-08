<?php

function espresso_load_jquery() {

	global $org_options;

	wp_enqueue_script('jquery');
	if (function_exists('event_espresso_multi_reg_init') || (isset($_REQUEST['page']) && ( $_REQUEST['page'] == 'form_builder' || $_REQUEST['page'] == 'form_groups'))) {
		wp_enqueue_script('ee_ajax_request', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/espresso_cart_functions.js', array('jquery'));
		wp_localize_script('ee_ajax_request', 'EEGlobals', array('ajaxurl' => admin_url('admin-ajax.php'), 'plugin_url' => EVENT_ESPRESSO_PLUGINFULLURL, 'event_page_id' => $org_options['event_page_id']));
	}
}

function espresso_admin_init() {
	global $org_options;
	if (!is_user_logged_in())
		return;
	global $espresso_premium;
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_screen.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_menu.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/organization_config.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/payment_gateways.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin_support.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'category-management/index.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'event-management/index.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-reports/index.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'form-builder/index.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'form-builder/groups/index.php');
	if (!$espresso_premium) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/test_drive_pro.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/premium_upgrade.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/coupon_management.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/email-manager.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/venue_management.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/locale_management.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/staff-management.php');
	} else {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/optional_event_settings.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/gateway_developer.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/coupon_management.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/use_coupon_code.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/admin_screens/email_manager.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/venue-management/index.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/locale-management/index.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/staff-management/index.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/functions.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/dashboard_widget.php');
	}
	do_action('action_hook_espresso_require_admin_files');
	if (isset($_REQUEST['page'])) {
		$espresso_pages = array('event_espresso', 'discounts', 'groupons',
				'event_categories', 'admin_reports', 'form_builder',
				'form_groups', 'my-events', 'event_emails', 'event_venues',
				'event_staff', 'events', 'attendees', 'espresso_reports',
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
		if ($_REQUEST['page'] == 'payment_gateways') {
			add_action('admin_init', 'espresso_require_gateway_files');
		}
	}

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

function espresso_frontend_init() {
	global $espresso_reg_page;

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

	$espresso_reg_page = espresso_test_for_reg_page();

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'shortcodes.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/ical.php');

	do_action('action_hook_espresso_require_template', 'init.php');
	//These may be loaded in posts and pages outside of the default EE pages
	require_once(espresso_get_event_list_template());

	//This is the form page for registering the attendee
	require_once(espresso_get_registration_page_template());

	//Registration forms
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/form_build.php');

	//List Attendees - Used with the [LISTATTENDEES] shortcode
	require_once(espresso_get_attendee_list_template());

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/cart.php');

	//Custom post type integration
	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/custom_post_type.php') && !empty($org_options['template_settings']['use_custom_post_types'])) {
		require('includes/admin-files/custom_post_type.php');
	}

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/gmap_incl.php');

	if ($espresso_reg_page) {
		do_action('action_hook_espresso_load_reg_page_files');
	}

	// Export iCal file
	if (!empty($_REQUEST['iCal'])) {
		espresso_ical();
	}
}

function espresso_init() {

	//Globals used throughout the site
	global $org_options, $wpdb, $espresso_wp_user, $espresso_premium;

	//Set the default time zone
	//If the default time zone is set up in the WP Settings, then we will use that as the default.
	if (get_option('timezone_string') != '') {
		date_default_timezone_set(get_option('timezone_string'));
	}

	//Wordpress function for setting the locale.
	//print get_locale();
	//setlocale(LC_ALL, get_locale());
	setlocale(LC_TIME, get_locale());

	//Get language files
	load_plugin_textdomain('event_espresso', false, dirname(plugin_basename(__FILE__)) . '/languages/');



	//Core function files

	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event_Object.class.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event.class.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Attendee.class.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Venue.class.php';

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . "functions/main.php");
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/pricing.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/time_date.php');

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/actions.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/filters.php');

	$espresso_premium = apply_filters('filter_hook_espresso_systems_check', false);

	do_action('action_hook_espresso_coupon_codes');
}

function espresso_export_certificate() {
	if (isset($_REQUEST['certificate_launch']) && $_REQUEST['certificate_launch'] == 'true') {
		echo espresso_certificate_launch($_REQUEST['id'], $_REQUEST['r_id']);
	}
}

function espresso_export_invoice() {
	//Version 2.0
	if (isset($_REQUEST['invoice_launch']) && $_REQUEST['invoice_launch'] == 'true') {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/invoice/launch_invoice.php");
		echo espresso_invoice_launch($_REQUEST['id'], $_REQUEST['r_id']);
	}
	//End Version 2.0
	//Export pdf version
	if (isset($_REQUEST['download_invoice']) && $_REQUEST['download_invoice'] == 'true') {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/invoice/template.php");
	}
	//End pdf version
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

	if (empty($org_options['event_page_id']))
		return;
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
