<?php
/*
  Plugin Name: Event Espresso
  Plugin URI: http://eventespresso.com/
  Description: Out-of-the-box Events Registration integrated with PayPal IPN for your Wordpress blog/website. <a href="admin.php?page=support" >Support</a>

  Reporting features provide a list of events, list of attendees, and excel export.

  Version: 3.2.P

  Author: Seth Shoultes
  Author URI: http://www.eventespresso.com

  Copyright (c) 2008-2011 Event Espresso  All Rights Reserved.

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */

//Returns the plugin version
function espresso_version() {
	return '3.2.P';
}

//Returns the template version
function espresso_template_version() {
	return '1.0';
}

// functions requiring global visibility
require_once("includes/functions/main.php");


/**
*		run event espresso installation scripts
* 		Install/Update Tables when plugin is activated
*
*		@access public
*		@return void
*/
function espresso_plugin_activation() {
	// define tables and pathing
	espresso_define_tables_and_paths();
	require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/main.php');
	espresso_get_user_id();
	require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/admin.php');
	require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/database_install.php');
	events_data_tables_install();
	require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways/payment_gateways.php');
	espresso_update_active_gateways();
}
register_activation_hook(__FILE__, 'espresso_plugin_activation');



/**********************************************************************************************
 ****************************************    ACTIONS     ****************************************
**********************************************************************************************/



// The following is a rough list of WordPress hooks in the order that they are executed along with the corresopnding Event Espresso actions that are called at those times
// functions called by the following hooks appear after the list

// plugins_loaded
add_action( 'plugins_loaded', 'espresso_define_tables_and_paths', 1);
add_action( 'plugins_loaded', 'espresso_EE_Session', 2);
add_action( 'plugins_loaded', 'espresso_init_session', 5);
add_action( 'plugins_loaded', 'espresso_check_for_export');
add_action( 'plugins_loaded', 'espresso_check_for_import');

// a few espresso specific hooks

// add the function display_all_events() as the default action to be performed for the regevent_default_action hook
add_action ( 'action_hook_espresso_regevent_default_action', 'display_all_events', 10, 1 );
// add the function event_espresso_add_attendees_to_db() as the default action to be performed for the regevent_post_attendee hook
add_action ( 'action_hook_espresso_regevent_post_attendee', 'event_espresso_add_attendees_to_db' );
// add the function register_attendees() as the default action to be performed for the regevent_register_attendees hook
add_action ('action_hook_espresso_display_payment_page', 'espresso_payment_page');
add_action ( 'action_hook_espresso_regevent_register_attendees', 'register_attendees' );
// add Espresso toolbar
add_action('admin_bar_menu', 'espresso_toolbar_items', 100);



// plugin_action_links
add_filter( 'plugin_action_links', 'event_espresso_filter_plugin_actions', 10, 2 );

//sanitize_comment_cookies
//setup_theme
//load_textdomain
//after_setup_theme
//auth_cookie_malformed
//set_current_user

//init
add_action( 'init', 'espresso_load_jquery', 10 );
//Loads the $espresso_wp_user global var
add_action( 'init', 'espresso_get_user_id', 15);
add_action( 'init', 'espresso_init', 20 );
add_action( 'init', 'espresso_load_error_log', 25);
add_action( 'init', 'espresso_export_certificate', 30);
add_action( 'init', 'espresso_export_invoice', 30);
add_action( 'init', 'espresso_export_ticket', 30);
add_action( 'init', 'espresso_add_rewrite_rules', 40 );
add_action( 'init', 'espresso_flush_rewrite_rules', 41 );


//widgets_init
add_action( 'widgets_init', 'espresso_widget');


//register_sidebar
//wp_register_sidebar_widget
//wp_loaded

add_filter( 'query_vars', 'espresso_add_query_vars' );

//parse_request*
//send_headers*
//parse_query*
//pre_get_posts*
//posts_selection
//wp*
//template_redirect
//get_header

//wp_head
add_action( 'wp_head', 'espresso_info_header');


//wp_enqueue_scripts

//wp_print_styles
add_action( 'wp_print_styles', 'add_espresso_stylesheet', 20);


//wp_print_scripts
//get_template_part_loop
//loop_start*
//the_post*
//loop_end*
//get_sidebar
//dynamic_sidebar
//get_search_form
//wp_meta
//get_footer

//wp_footer
add_action( 'wp_footer', 'espresso_load_javascript_files');

//wp_print_footer_scripts
//shutdown





/**********************************************************************************************
 *************************************    PLUGINS_LOADED     *************************************
**********************************************************************************************/





/**
*		define all event espresso db table names plus directory and url paths
*
*		@access public
*		@return void
*/
function espresso_define_tables_and_paths() {

	global $wpdb;

	define("EVENT_ESPRESSO_VERSION", espresso_version());

	// Define all plugin database tables
	define("EVENTS_ANSWER_TABLE", $wpdb->prefix . "events_answer");

	define("EVENTS_ATTENDEE_TABLE", $wpdb->prefix . "events_attendee");
	define("EVENTS_ATTENDEE_COST_TABLE", $wpdb->prefix . "events_attendee_cost");

	define("EVENTS_CATEGORY_TABLE", $wpdb->prefix . "events_category_detail");
	define("EVENTS_CATEGORY_REL_TABLE", $wpdb->prefix . "events_category_rel");

	define("EVENTS_DETAIL_TABLE", $wpdb->prefix . "events_detail");

	define("EVENTS_DISCOUNT_CODES_TABLE", $wpdb->prefix . "events_discount_codes");
	define("EVENTS_DISCOUNT_REL_TABLE", $wpdb->prefix . "events_discount_rel");

	define("EVENTS_EMAIL_TABLE", $wpdb->prefix . "events_email");

	define("EVENTS_LOCALE_TABLE", $wpdb->prefix . "events_locale");
	define("EVENTS_LOCALE_REL_TABLE", $wpdb->prefix . "events_locale_rel");

	define("EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE", $wpdb->prefix . "events_multi_event_registration_id_group");

	define("EVENTS_PERSONNEL_TABLE", $wpdb->prefix . "events_personnel");
	define("EVENTS_PERSONNEL_REL_TABLE", $wpdb->prefix . "events_personnel_rel");

	define("EVENTS_PRICES_TABLE", $wpdb->prefix . "events_prices");

	define("EVENTS_QST_GROUP_TABLE", $wpdb->prefix . "events_qst_group");
	define("EVENTS_QST_GROUP_REL_TABLE", $wpdb->prefix . "events_qst_group_rel");
	define("EVENTS_QUESTION_TABLE", $wpdb->prefix . "events_question");

	define("EVENTS_START_END_TABLE", $wpdb->prefix . "events_start_end");

	define("EVENTS_VENUE_TABLE", $wpdb->prefix . "events_venue");
	define("EVENTS_VENUE_REL_TABLE", $wpdb->prefix . "events_venue_rel");

	// End table definitions

	define('EVENT_ESPRESSO_POWERED_BY', 'Event Espresso - ' . EVENT_ESPRESSO_VERSION);

	//Get the plugin url and content directories.
	//These variables are used to define the plugin and content directories in the constants below.
	$wp_plugin_url = WP_PLUGIN_URL;
	$wp_content_url = WP_CONTENT_URL;

	//Define the plugin directory and path
	define("EVENT_ESPRESSO_PLUGINPATH", "/" . plugin_basename(dirname(__FILE__)) . "/");
	define("EVENT_ESPRESSO_PLUGINFULLPATH", WP_PLUGIN_DIR . EVENT_ESPRESSO_PLUGINPATH);
	define("EVENT_ESPRESSO_PLUGINFULLURL", $wp_plugin_url . EVENT_ESPRESSO_PLUGINPATH);

	//Define dierectory structure for uploads
	//Create the paths
	$wp_content_dir = defined('WP_CONTENT_DIR') ? WP_CONTENT_DIR : ABSPATH . 'wp-content';

	$upload_path = $wp_content_dir . '/uploads';
	$event_espresso_upload_dir = $upload_path . '/espresso/';
	$event_espresso_template_dir = $event_espresso_upload_dir . 'templates/';

	//Define the includes directory
	$includes_directory = EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/';
	define("EVENT_ESPRESSO_INCLUDES_DIR", $includes_directory);

	//Define the uploads directory and url
	define("EVENT_ESPRESSO_UPLOAD_DIR", $event_espresso_upload_dir);
	define("EVENT_ESPRESSO_UPLOAD_URL", $wp_content_url . '/uploads/espresso/');

	//Define the templates dirrectory
	define("EVENT_ESPRESSO_TEMPLATE_DIR", $event_espresso_template_dir);

	//Define the gateway directory and url
	$event_espresso_gateway_dir = EVENT_ESPRESSO_UPLOAD_DIR . "gateways/";
	define("EVENT_ESPRESSO_GATEWAY_DIR", $event_espresso_gateway_dir);
	define("EVENT_ESPRESSO_GATEWAY_URL", $wp_content_url . '/uploads/espresso/gateways/');
}






/**
*		load and instantiate EE_Session class
*
*		@access public
*		@return void
*/
function espresso_EE_Session() {
	global $EE_Session;
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Session.class.php');
	// instantiate !!!
	$EE_Session = EE_Session::instance();
}




/**
*		load and instantiate the event espresso error logging class
*
*		@access public
*		@return void
*/
function espresso_load_error_log() {
	global $org_options;
	require_once (EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Log.class.php');
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		$message = "REQUEST variables:\n";
		foreach ($_REQUEST as $key => $value) {
			$message .= $key . " = " . $value . "\n";
		}
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $message);
	}
}





/**
*		initialize the espresso session
*
*		@access public
*		@return void
*/
function espresso_init_session() {

	global $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	if (!isset($_SESSION)) {
		session_start();
	}

	if (( 	isset($_REQUEST['page_id'])
			&& (	$_REQUEST['page_id'] == $org_options['return_url'] || $_REQUEST['page_id'] == $org_options['notify_url']))
			|| 	!isset($_SESSION['espresso_session']['id'])
			|| 	$_SESSION['espresso_session']['id'] == array()) {

		$_SESSION['espresso_session'] = '';
		//Debug
		//echo "<pre>espresso_session - ".print_r($_SESSION['espresso_session'],true)."</pre>";
		$_SESSION['espresso_session'] = array();
		//Debug
		//echo "<pre>espresso_session array - ".print_r($_SESSION['espresso_session'],true)."</pre>";
		$_SESSION['espresso_session']['id'] = session_id() . '-' . uniqid('', true);
		//Debug
		//echo "<pre>".print_r($_SESSION,true)."</pre>";

		$_SESSION['espresso_session']['events_in_session'] = '';
		$_SESSION['espresso_session']['coupon_code'] = '';
		$_SESSION['espresso_session']['grand_total'] = '';

	}

	do_action('action_hook_espresso_after_init_session');

}






/**
*		Handles importing of csv files
*
*		@access public
*		@return void
*/
function espresso_check_for_export() {
	if (isset($_REQUEST['export'])) {
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance();
			$EE_Export->export();
		}
	}
}






/**
*		Handles exporting of csv files
*
*		@access public
*		@return void
*/
function espresso_check_for_import() {
	if (isset($_REQUEST['import'])) {
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
			$EE_Import = EE_Import::instance();
			$EE_Import->import();
		}
	}
}







/**********************************************************************************************
 **********************************    PLUGIN_ACTION_LINKS     ***********************************
**********************************************************************************************/





/**
 * Add a settings link to the Plugins page, so people can go straight from the plugin page to the
 * settings page.
 */
function event_espresso_filter_plugin_actions($links, $file) {
	// Static so we don't call plugin_basename on every plugin row.
	static $this_plugin;
	if (!$this_plugin)
		$this_plugin = plugin_basename(__FILE__);

	if ($file == $this_plugin) {
		$org_settings_link = '<a href="admin.php?page=event_espresso">' . __('Settings') . '</a>';
		$events_link = '<a href="admin.php?page=events">' . __('Events') . '</a>';
		array_unshift($links, $org_settings_link, $events_link); // before other links
	}
	return $links;
}







/**********************************************************************************************
 ******************************************    INIT     *******************************************
**********************************************************************************************/





/**
*		load jQuery
*
*		@access public
*		@return void
*/
if (!function_exists('espresso_load_jquery')) {

	function espresso_load_jquery() {

		global $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		wp_enqueue_script('jquery');
		if (function_exists('event_espresso_multi_reg_init') || (isset($_REQUEST['page']) && ( $_REQUEST['page'] == 'form_builder' || $_REQUEST['page'] == 'form_groups'))) {
			wp_enqueue_script('ee_ajax_request', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/espresso_cart_functions.js', array('jquery'));
			wp_localize_script('ee_ajax_request', 'EEGlobals', array('ajaxurl' => admin_url('admin-ajax.php'), 'plugin_url' => EVENT_ESPRESSO_PLUGINFULLURL, 'event_page_id' => $org_options['event_page_id']));
		}
	}

}





/**
*		load and run event espress
*
*		@access public
*		@return void
*/
function espresso_init() {

	//Globals used throughout the site
	global $org_options, $wpdb, $this_is_a_reg_page, $notices, $espresso_wp_user;

	$org_options = get_user_meta($espresso_wp_user, 'events_organization_settings', true);
	$page_id = isset($_REQUEST['page_id']) ? $_REQUEST['page_id'] : '';
	$notices = array('updates' => array(), 'errors' => array());

	//Check if SSL is loaded
	if (is_ssl()) {

		//Create the server name
		$server_name = str_replace('https://', '', site_url());

		//If the site is using SSL, we need to make sure our files get loaded in SSL.
		//This will (should) make sure everything is loaded via SSL
		//So that the "..not everything is secure.." message doesn't appear
		//Still will be a problem if other themes and plugins do not implement ssl correctly
		$wp_plugin_url = str_replace('http://', 'https://', WP_PLUGIN_URL);
		$wp_content_url = str_replace('http://', 'https://', WP_CONTENT_URL);
	} else {
		$server_name = str_replace('http://', '', site_url());
	}

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



	$this_is_a_reg_page = FALSE;
	//if (isset($_REQUEST['ee']) || isset($_REQUEST['page_id']) || is_admin()) {
	if (isset($_REQUEST['event_slug']) || isset($_REQUEST['page_id']) || is_admin()) {
		$this_is_a_reg_page = TRUE;
	} else {
		$reg_page_ids = array(
				'event_page_id' => $org_options['event_page_id'],
				'return_url' => $org_options['return_url'],
				'cancel_return' => $org_options['cancel_return'],
				'notify_url' => $org_options['notify_url']
		);

		$server_name = str_replace($_SERVER['SERVER_NAME'], '', $server_name);
		$uri_string = str_replace($server_name, '', $_SERVER['REQUEST_URI']);
		$uri_string = str_replace($_SERVER['QUERY_STRING'], '', $uri_string);
		$uri_string = rtrim($uri_string, '?');
		$uri_string = trim($uri_string, '/');
		$this_page = basename($uri_string);
		$uri_segments = explode('/', $uri_string);
		foreach ($uri_segments as $uri_segment) {
			$seg_page_id = $wpdb->get_var($wpdb->prepare("SELECT id FROM $wpdb->posts WHERE post_name = %s ", $uri_segment));
			if ($wpdb->num_rows > 0) {
				if (in_array($seg_page_id, $reg_page_ids)) {
					$this_is_a_reg_page = TRUE;
				}
			}
		}
	}



	//Ticketing
	if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php") || function_exists('espresso_ticket_launch')) {
		global $ticketing_installed;
		$ticketing_installed = true;
	}


	//Premium funtions. If this is a paid version, then we need to include these files.
	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/misc_functions.php')) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/misc_functions.php');
		global $espresso_premium;
		$espresso_premium = espresso_system_check();
	}

	//These files need to be above the core function files
	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/addons_includes.php')) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/addons_includes.php');
	}



	//Core function files

	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event_Object.class.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event.class.php';
	//require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/Event.php';
	//require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/Attendee.php';
	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Attendee.class.php';

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/pricing.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/time_date.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'shortcodes.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/actions.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/filters.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/ical.php');


	/* Core template files used by this plugin */

	event_espresso_require_template('init.php');

	//These may be loaded in posts and pages outside of the default EE pages
	//Events Listing - Shows the events on your page. Used with the [ESPRESSO_EVENTS] shortcode
	$event_list_template = 'event_list.php';

	// HOOK - change event list template
	$event_list_template = apply_filters( 'filter_hook_espresso_event_list_template', $event_list_template);

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

	/* End Core template files used by this plugin */



	//Google map include file
	if (!is_admin()) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/gmap_incl.php');
	}

	//Load these files if we are in an actuial registration page
	function espresso_load_reg_page_files() {

		define("ESPRESSO_REG_PAGE_FILES_LOADED", "true");

		//Check to see if this a reg page
		//May cause admin and front facing pages to break if turned on
		//global $this_is_a_reg_page;
		//echo '<p>$this_is_a_reg_page ='.$this_is_a_reg_page .'</p>';
		//Process email confirmations
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/email.php');

		//Various attendee functions
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/attendee_functions.php');


		//Payment/Registration Processing - Used to display the payment options and the payment link in the email. Used with the [ESPRESSO_PAYMENTS] tag
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Payment_Data.class.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/payment_page.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/thank_you_page.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/confirmation_page.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/pending_approval_page.php');
		require_once(espresso_get_payment_page_template());
		require_once(espresso_get_payment_overview_template());
		require_once(espresso_get_return_payment_template());
		//Add attendees to the database
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/add_attendees_to_db.php');

		//Payment processing - Used for onsite payment processing. Used with the [ESPRESSO_TXN_PAGE] shortcode
		event_espresso_require_gateway('process_payments.php');
		event_espresso_require_gateway('PaymentGateway.php');
		event_espresso_require_gateway('gateway_display.php');

		// AJAX functions
		add_action( 'wp_ajax_event_espresso_add_item', 'event_espresso_add_item_to_session');
		add_action( 'wp_ajax_nopriv_event_espresso_add_item', 'event_espresso_add_item_to_session');
		add_action( 'wp_ajax_event_espresso_delete_item', 'event_espresso_delete_item_from_session');
		add_action( 'wp_ajax_nopriv_event_espresso_delete_item', 'event_espresso_delete_item_from_session');
		add_action( 'wp_ajax_event_espresso_update_item', 'event_espresso_update_item_in_session');
		add_action( 'wp_ajax_nopriv_event_espresso_update_item', 'event_espresso_update_item_in_session');
		add_action( 'wp_ajax_event_espresso_calculate_total', 'event_espresso_calculate_total');
		add_action( 'wp_ajax_nopriv_event_espresso_calculate_total', 'event_espresso_calculate_total');
		add_action( 'wp_ajax_event_espresso_load_regis_form', 'event_espresso_load_regis_form');
		add_action( 'wp_ajax_nopriv_event_espresso_load_regis_form', 'event_espresso_load_regis_form');
		add_action( 'wp_ajax_event_espresso_confirm_and_pay', 'event_espresso_confirm_and_pay');
		add_action( 'wp_ajax_nopriv_event_espresso_confirm_and_pay', 'event_espresso_confirm_and_pay');
	}

	if ($this_is_a_reg_page == TRUE) {
		espresso_load_reg_page_files();
	}

	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/index.php')) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/index.php');
		//Include dicount codes
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/use_coupon_code.php');
	} else {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/coupon_management.php');
	}










	//Admin only files
	if ( is_admin() ) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/admin.php');

		// New form builder
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'form-builder/index.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'form-builder/groups/index.php');

		if ($espresso_premium != true)
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/test_drive_pro.php');

		// Premium upgrade options if the paid plugin is not installed
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/premium_upgrade.php');

		// Get the payment settings page
		event_espresso_require_gateway('payment_gateways.php');

		// Email Manager
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/email-manager/index.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/email-manager/index.php');
		} else {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/email-manager.php');
		}

		// Event Registration Subpage - Add/Delete/Edit Venues
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/venue-management/index.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/venue-management/index.php');
		} else {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/venue_management.php');
		}

		// Add/Delete/Edit Locales
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/locale-management/index.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/locale-management/index.php');
		} else {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/locale_management.php');
		}

		// Add/Delete/Edit Staff
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/staff-management/index.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/staff-management/index.php');
		} else {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'lite-files/staff-management.php');
		}

		// Event editor premium functions
		event_espresso_require_file('functions.php', EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/', '', false, true);

		// Available addons
		event_espresso_require_file('admin_addons.php', EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/', EVENT_ESPRESSO_PLUGINFULLPATH . '/includes/lite-files/', true, true);

		// Google Map Settings
		event_espresso_require_file('template_map_confg.php', EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/templates/', EVENT_ESPRESSO_PLUGINFULLPATH . '/includes/lite-files/', true, true);

		// Admin Widget - Display event stats in your admin dashboard
		event_espresso_require_file('dashboard_widget.php', EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/', '', false, true);


		// Admin only functions
		event_espresso_require_file('admin_menu.php', EVENT_ESPRESSO_INCLUDES_DIR . 'functions/', '', false, true);

		// Event Registration Subpage - Configure Organization
		event_espresso_require_file('organization_config.php', EVENT_ESPRESSO_INCLUDES_DIR . 'settings/', '', false, true);

		// Event Registration Subpage - Add/Delete/Edit Events
		event_espresso_require_file('index.php', EVENT_ESPRESSO_INCLUDES_DIR . 'event-management/', '', false, true);
		event_espresso_require_file('index.php', EVENT_ESPRESSO_INCLUDES_DIR . 'admin-reports/', '', false, true);

		// Event styles & template layouts Subpage
		event_espresso_require_file('template_confg.php', EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/templates/', EVENT_ESPRESSO_PLUGINFULLPATH . '/includes/lite-files/', true, true);


		// Plugin Support
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_support.php');

		// Admin Reporting
		// require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-reports/index.php');
		// Event Registration Subpage - Category Manager
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'category-management/index.php');

		// Load scripts and styles for the admin
		if (isset($_REQUEST['page'])) {
			$espresso_pages = array(
					'event_espresso',
					'discounts',
					'groupons',
					'event_categories',
					'admin_reports',
					'form_builder',
					'form_groups',
					'my-events',
					'event_emails',
					'event_venues',
					'event_staff',
					'events',
					'attendees',
					'espresso_reports',
					'support',
					'template_confg',
					'template_map_confg',
					'payment_gateways',
					'members',
					'espresso_social',
					'admin_addons',
					'espresso_calendar',
					'event_tickets',
					'event_certificates',
					'espresso-mailchimp',
					'espresso_permissions',
					'roles',
					'event_locales',
					'event_groups',
					'test_drive',
					'espresso_https'
			);
			if (in_array($_REQUEST['page'], $espresso_pages)) {
				add_action( 'admin_print_scripts', 'event_espresso_config_page_scripts');
				add_action( 'admin_print_styles', 'event_espresso_config_page_styles');
			}
		}

		// Update the question sequences
		add_action( 'wp_ajax_update_sequence', 'event_espresso_questions_config_mnu');
		// Update the question group sequences
		add_action( 'wp_ajax_update_qgr_sequence', 'event_espresso_question_groups_config_mnu');

	}




	// Run the program
	if (!function_exists('event_espresso_run')) {
		function event_espresso_run() {

			// grab some globals
			global $wpdb, $org_options, $load_espresso_scripts;

			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

			// tell the plugin to load the required scripts
			$load_espresso_scripts = true;

			// begin output buffering
			ob_start();

			//Make sure scripts are loading
			echo espresso_check_scripts();

			// Get action type
			$regevent_action = isset($_REQUEST['regevent_action']) ? $_REQUEST['regevent_action'] : '';

			//if (isset($_REQUEST['ee']) or isset($_REQUEST['edit_attendee'])) {
			$event_slug = (get_query_var('event_slug')) ? get_query_var('event_slug') : FALSE;

			if ( $event_slug or isset( $_REQUEST['edit_attendee'] ) or isset( $_REQUEST['ee'] )) {
				$regevent_action = "register";
			}

			if(!empty($_REQUEST['confirm_registration'])) $regevent_action = 'payment_page';

			switch ($regevent_action) {

				case "payment_page":
					do_action('action_hook_espresso_display_payment_page');

					break;

				case "post_attendee":

					// now other plugins/functions/classes can completely change the post attendee process by removing the previous hook and adding their own
					do_action( 'action_hook_espresso_regevent_post_attendee' );

				break;


				case "register":

					// now other plugins/functions/classes can completely change the register attendee process by removing the previous hook and adding their own
					do_action( 'action_hook_espresso_regevent_register_attendees' );

				break;


				case "add_to_session":
				break;


				case "show_shopping_cart":

					//This is the form page for registering the attendee
					require_once(espresso_get_shopping_cart_template());
					event_espresso_shopping_cart();

				break;


				case "load_checkout_page":

					if ($_POST) {
						event_espresso_calculate_total('details');
					}
					event_espresso_load_checkout_page();

				break;

				case "post_multi_attendee":

					//echo " YESssss";
					event_espresso_update_item_in_session('attendees');
					event_espresso_add_attendees_to_db_multi();

				break;


				default:

					// now other plugins/functions/classes can completely change the regevent default action process by removing the previous hook and adding their own
					do_action( 'action_hook_espresso_regevent_default_action', $regevent_action );

			}

			$content = ob_get_contents();
			ob_end_clean();
			return $content;

		}
	}
	add_shortcode('ESPRESSO_EVENTS', 'event_espresso_run');




	function espresso_cancelled() {
		global $org_options;
		$_REQUEST['page_id'] = $org_options['return_url'];
		espresso_init_session();
	}
	add_shortcode('ESPRESSO_CANCELLED', 'espresso_cancelled');





	if (isset($_REQUEST['authAmountString'])) {
		add_action( 'posts_selection', 'event_espresso_txn');
	}

	// These actions need to be loaded at the bottom of this script to prevent errors when post/get requests are received.

	if (is_admin()) {
		// Check to make sure there are no empty registration id fields in the database.
		if (event_espresso_verify_attendee_data() == true &&
						(empty($_POST['action']) || $_POST['action'] != 'event_espresso_update_attendee_data')) {
			add_action( 'admin_notices', 'event_espresso_registration_id_notice');
		}

		// copy themes to template directory
		if (isset($_REQUEST['event_espresso_admin_action'])) {
			if ($_REQUEST['event_espresso_admin_action'] == 'copy_templates') {
				add_action( 'admin_init', 'event_espresso_trigger_copy_templates');
			}
		}
		// copy gateways to gateway directory
		if (isset($_REQUEST['event_espresso_admin_action'])) {
			if ($_REQUEST['event_espresso_admin_action'] == 'copy_gateways') {
				add_action( 'admin_init', 'event_espresso_trigger_copy_gateways');
			}
		}
		// Check to make sure all of the main pages are setup properly, if not show an admin message.
		if (empty($org_options['event_page_id'])
						|| empty($org_options['return_url'])
						|| empty($org_options['notify_url'])) {
			add_action( 'admin_notices', 'event_espresso_activation_notice');
		}
	}








	// Export iCal file
	if (!empty($_REQUEST['iCal'])) {
		espresso_ical();
	}



	// PUE Auto Upgrades stuff
	if ( file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/pue/pue-client.php') && !empty($org_options['site_license_key']) ) {
		//let's get the client api key for updates
		global $org_options;
		$api_key = $org_options['site_license_key']; //note this is a special field that we added to the core plugin options page for clients to add their site-license key.
		$host_server_url = 'http://beta.eventespresso.com/'; //note you'll have to change this to eventespresso.com once the domain is swtiched to the new server
		$plugin_slug = 'event-espresso'; //change this to the slug of the uploaded plugin (as you set in the plugin slug field via the Add Plugin form in the PUE Plugin Library))

		$plugin_path = plugin_basename(__FILE__);
		$options = array(
		'apikey' => $api_key,
		'lang_domain' => 'event_espresso', //this will ensure that all text in the pue-client.php file get's included in the localization files created.
		'plugin_path' => $plugin_path, //by default, the plugin_path is generated using the $plugin_slug but that only works if the format of the plugin_path uses the slug.  For example, if the slug is event-espresso then the generated path would be event-espresso/event-espresso.php.  We can instead include a plugin_path in the $options array (in this example I've used plugin_basename() to get the path.
		);
		require(EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/pue/pue-client.php' ); //requires the pue-client file that contains the class.
		//$check_for_updates = new PluginUpdateEngineChecker($host_server_url, $plugin_slug, $options); //let's make sure this addon is in the updater routine!

	}

}






/**
*		Export PDF Certificate
*
*		@access public
*		@return void
*/
function espresso_export_certificate() {
	if (isset($_REQUEST['certificate_launch']) && $_REQUEST['certificate_launch'] == 'true') {
		echo espresso_certificate_launch($_REQUEST['id'], $_REQUEST['r_id']);
	}
}


// Export PDF Ticket
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



/**
*		Export Invoice
*
*		@access public
*		@return void
*/
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






/**
*		creates pretty permalinks
*
*		@access public
*		@return void
*/
function espresso_add_rewrite_rules() {

	global $wpdb, $org_options;

	if (empty($org_options['event_page_id'])) return;
	$reg_page_id = $org_options['event_page_id'];
	$use_pretty_permalinks = espresso_use_pretty_permalinks();

	if ( $use_pretty_permalinks ) {
		// create pretty permalinks
		$SQL = 'SELECT post_name  FROM '.$wpdb->prefix .'posts WHERE ID = %d';
		$reg_page_url_slug = $wpdb->get_var( $wpdb->prepare( $SQL, $reg_page_id ));

		// rules for event slug pretty links
		add_rewrite_rule( $reg_page_url_slug . '/([^/]+)?/$', 'index.php?pagename=' . $reg_page_url_slug . '&event_slug=$matches[1]', 'top' );
		add_rewrite_rule( $reg_page_url_slug . '/([^/]+)?$', 'index.php?pagename=' . $reg_page_url_slug . '&event_slug=$matches[1]', 'top' );

	}

}





/**
 *		reset htaccess rewrite rules
 *
 *		@ access public
 *		@ return void
 */
function espresso_flush_rewrite_rules() {
	if ( is_admin()  && isset($_REQUEST['page']) && $_REQUEST['page'] == 'event_espresso' ) {
	    flush_rewrite_rules();
	}
}






/**********************************************************************************************
 **************************************    WIDGETS_INIT     **************************************
**********************************************************************************************/





/**
*		a widget for displaying the list of events in your sidebar
*
*		@access public
*		@return void
*/
function espresso_widget() {
	event_espresso_require_template('init.php');
	require(espresso_get_widget_template());
	//The widget can be over-ridden with the custom files addon
	register_widget('Event_Espresso_Widget');

}





/*********************************************************************************************
 ****************************************    WP_HEAD     ****************************************
**********************************************************************************************/





/**
*		adds query vars for creating pretty permalinks
*
*		@access public
*		@return void
*/
function espresso_add_query_vars( $query_vars ) {
	$query_vars[] = 'event_slug';
	$query_vars[] = 'ee';
	return $query_vars;
}





/**********************************************************************************************
 ****************************************    WP_HEAD     ****************************************
**********************************************************************************************/





/**
*		Load the Event Espresso HTML meta
*
*		@access public
*		@return void
*/
function espresso_info_header() {
	print( "<meta name='generator' content='Event Espresso Version " . EVENT_ESPRESSO_VERSION . "' />");
}








/**********************************************************************************************
 *************************************    WP_PRINT_STYLES     ************************************
**********************************************************************************************/





/**
*		Load the style sheets for the reegistration pages
*
*		@access public
*		@return void
*/
if (!function_exists('add_espresso_stylesheet')) {

	function add_espresso_stylesheet() {
		global $org_options;

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		//Load the ThemeRoller styles if enabled
		if (!empty($org_options['style_settings']['enable_default_style']) && $org_options['style_settings']['enable_default_style'] == 'Y') {

			//Load custom style sheet if available
			if (!empty($org_options['style_settings']['use_grid_layout']) && $org_options['style_settings']['use_grid_layout'] == 'Y') {
				if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . 'css/grid_layout.css')) {
					wp_register_style('espresso_grid_layout', EVENT_ESPRESSO_UPLOAD_URL . 'css/grid_layout.css');
				} else {
					wp_register_style('espresso_grid_layout', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/grid_layout.css');
				}
				wp_enqueue_style('espresso_grid_layout');
			}

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
				if ( !isset($org_options['themeroller']['themeroller_style']) || empty($org_options['themeroller']['themeroller_style']) ){
					$org_options['themeroller']['themeroller_style'] = 'smoothness';
				}

				//Load the selected themeroller style
				wp_register_style('espresso_themeroller', $themeroller_style_path . $org_options['themeroller']['themeroller_style'] . '/style.css');
				wp_enqueue_style('espresso_themeroller');
			}
		}
	}

}






/**********************************************************************************************
 **************************************    WP_FOOTER     **************************************
**********************************************************************************************/





//Load the required Javascripts
if (!function_exists('espresso_load_javascript_files')) {

	function espresso_load_javascript_files() {
		global $load_espresso_scripts;

		if (!$load_espresso_scripts)
			return;
		wp_register_script('reCopy', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/reCopy.js"), false, '1.1.0');
		wp_print_scripts('reCopy');

		wp_register_script('jquery.validate.js', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.validate.min.js"), false, '1.8.1');
		wp_print_scripts('jquery.validate.js');

		wp_register_script('validation', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/validation.js"), false, EVENT_ESPRESSO_VERSION);
		wp_print_scripts('validation');
	}

}



