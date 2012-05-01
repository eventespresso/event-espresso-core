<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * 		Automagically load non-singleton class files - no need to include or require
 * 		ONLY woks with class objects created via  "new"  ie: $object = new SomeClassName();
 *
 * 		@access public
 * 		@return void
 */
function __autoload( $class_name ) {
    file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/' . $class_name . '.class.php') and include_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/' . $class_name . '.class.php';
}

/**
 * 		define all event espresso db table names plus directory and url paths
 *
 * 		@access public
 * 		@return void
 */
function espresso_define_tables_and_paths() {
	global $wpdb;

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
	define("ESP_PRICE_TABLE", $wpdb->prefix . "esp_price");
	define("ESP_PRICE_TYPE", $wpdb->prefix . "esp_price_type");
	define("ESP_DATETIME", $wpdb->prefix . "esp_datetime");
	define("EVENTS_QST_GROUP_TABLE", $wpdb->prefix . "events_qst_group");
	define("EVENTS_QST_GROUP_REL_TABLE", $wpdb->prefix . "events_qst_group_rel");
	define("EVENTS_QUESTION_TABLE", $wpdb->prefix . "events_question");
	define("EVENTS_START_END_TABLE", $wpdb->prefix . "events_start_end");
	define("EVENTS_VENUE_TABLE", $wpdb->prefix . "events_venue");
	define("EVENTS_VENUE_REL_TABLE", $wpdb->prefix . "events_venue_rel");
	// End table definitions
	
	define("EVENTS_PRICES_TABLE", $wpdb->prefix . "events_prices"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<  ADDED BACK IN UNTIL PRICE TABLE CHANGES ARE COMPLETE

	define('EVENT_ESPRESSO_POWERED_BY', 'Event Espresso - ' . EVENT_ESPRESSO_VERSION);

	//Define the plugin directory and path
	$main_file = espresso_main_file();
	define("EVENT_ESPRESSO_PLUGINPATH", "/" . plugin_basename($main_file) . "/");
	define("EVENT_ESPRESSO_PLUGINFULLPATH", plugin_dir_path($main_file));
	define("EVENT_ESPRESSO_PLUGINFULLURL", plugin_dir_url($main_file));

	//Define the includes directory
	define("EVENT_ESPRESSO_INCLUDES_DIR", EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/');

	//Define directory structure for uploads
	//Create the paths
	$uploads = wp_upload_dir();

	//Define the uploads directory and url
	define("EVENT_ESPRESSO_UPLOAD_DIR", $uploads['basedir'] . '/espresso/');
	define("EVENT_ESPRESSO_UPLOAD_URL", $uploads['baseurl'] . '/espresso/');

	//Define the templates dirrectory and url
	define("EVENT_ESPRESSO_TEMPLATE_DIR", $uploads['basedir'] . '/espresso/templates/');
	define("EVENT_ESPRESSO_TEMPLATE_URL", $uploads['baseurl'] . '/espresso/templates/');

	//Define the gateway directory and url
	define("EVENT_ESPRESSO_GATEWAY_DIR", $uploads['basedir'] . '/espresso/gateways/');
	define("EVENT_ESPRESSO_GATEWAY_URL", $uploads['baseurl'] . '/espresso/gateways/');
}

function espresso_get_user_id() {
	global $current_user, $espresso_wp_user;

	$espresso_wp_user = 1;

	$espresso_wp_user = apply_filters('filter_hook_espresso_get_user_id', $espresso_wp_user);

	return $espresso_wp_user;
}

function espresso_load_org_options() {
	global $org_options, $espresso_wp_user;
	$org_options = get_user_meta($espresso_wp_user, 'events_organization_settings', true);
	require_once (EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Log.class.php');
}

/**
 * 		load and instantiate EE_Session class
 *
 * 		@access public
 * 		@return void
 */
function espresso_EE_Session() {
	global $EE_Session;
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Session.class.php');
	// instantiate !!!
	$EE_Session = EE_Session::instance();
}

/**
 * 		initialize and globalize espresso messages array
 *
 * 		@access public
 * 		@return void
 */
function espresso_setup_notices() {
	// global error notices
	global $espresso_notices;
	$espresso_notices	= array( 'success' => FALSE, 'errors' => FALSE );
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

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Single_Page_Checkout.class.php');
	global $Single_Page_Checkout;
	$Single_Page_Checkout = EE_Single_Page_Checkout::instance();	
	
	event_espresso_require_gateway('process_payments.php');
	
	$espresso_premium = apply_filters('filter_hook_espresso_systems_check', false);

	do_action('action_hook_espresso_coupon_codes');
}


/**
 * 		Handles exporting of csv files
 *
 * 		@access public
 * 		@return void
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
 * 		Handles importing of csv files
 *
 * 		@access public
 * 		@return void
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
