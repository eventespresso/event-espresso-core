<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


/**
 * 		define all event espresso db table names plus directory and url paths
 *
 * 		@access public
 * 		@return void
 */
function espresso_define_tables_and_paths() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	global $wpdb;

	define( 'DS', DIRECTORY_SEPARATOR );
	define( 'PS', PATH_SEPARATOR );
	
	// add ESPRESSO directories to include_path
	set_include_path(
		dirname( __FILE__ ) . DS . 'includes' . DS . 'core' . DS . PS .
		dirname( __FILE__ ) . DS . 'includes' . DS . 'models' . DS . PS .
		dirname( __FILE__ ) . DS . 'includes' . DS . 'classes' . DS . PS .
		dirname( __FILE__ ) . DS . 'includes' . DS . 'functions' . DS . PS .
		dirname( __FILE__ ) . DS . 'gateways' . DS . PS .
		get_include_path()
	);
	
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
	define("ESP_STATUS_TABLE", $wpdb->prefix . "esp_status");
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
	define("EVENT_ESPRESSO_PLUGINPATH", DS . plugin_basename($main_file) . DS);
	define("EVENT_ESPRESSO_PLUGINFULLPATH", plugin_dir_path($main_file));
	define("EVENT_ESPRESSO_PLUGINFULLURL", plugin_dir_url($main_file));

	//Define the includes directory
	define("EVENT_ESPRESSO_INCLUDES_DIR", EVENT_ESPRESSO_PLUGINFULLPATH . 'includes' . DS );
	define( 'EE_CORE', EVENT_ESPRESSO_INCLUDES_DIR . 'core' . DS );


	//Define directory structure for uploads
	//Create the paths
	$uploads = wp_upload_dir();

	//Define the uploads directory and url
	define("EVENT_ESPRESSO_UPLOAD_DIR", $uploads['basedir'] . DS . 'espresso' . DS);
	define("EVENT_ESPRESSO_UPLOAD_URL", $uploads['baseurl'] . DS . 'espresso' . DS);

	//Define the templates dirrectory and url
	define("EVENT_ESPRESSO_TEMPLATE_DIR", $uploads['basedir'] . DS . 'espresso' . DS . 'templates' . DS);
	define("EVENT_ESPRESSO_TEMPLATE_URL", $uploads['baseurl'] . DS . 'espresso' . DS . 'templates' . DS);

	//Define the gateway directory and url
	define("EVENT_ESPRESSO_GATEWAY_DIR", $uploads['basedir'] . DS . 'espresso' . DS . 'gateways' . DS);
	define("EVENT_ESPRESSO_GATEWAY_URL", $uploads['baseurl'] . DS . 'espresso' . DS . 'gateways' . DS);
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


/**
 * 		Automagically load non-singleton class files - no need to include or require
 * 		ONLY woks with class objects created via  "new"  ie: $object = new SomeClassName();
* 		directory path can be designated by substituting underscores for directory separators
* 		ie: new admin_transactions_TransactionsInit() would load the file located at : includes/core/admin/transactions/EE_TransactionsInit.class.php
 *
 * 		@access 		public
* 		@param		$class		path and name of the class file to be loaded
 * 		@return 		void
 */
function espresso_autoload() {
	function __autoload( $class_name ) {
		$include_path = dirname(espresso_main_file()) . '/includes/classes/';
		if ( file_exists( $include_path . $class_name . '.class.php' )) {
			require_once( $include_path . $class_name . '.class.php' );
		}
	}
}



function espresso_display_exception( $excptn ) {
	echo '
<style type="text/css">
body { 
	width:100%; height:100%; padding:1px; margin:0; background:#f8f8f8;
}
#error_msg {
	width:60%; height:auto; padding:2em 4em; margin:4em auto; 
	background:#fff; border:2px solid #D54E21; border-radius:3px;
	color: #666; font-size:18px;
}
</style>';
	echo '<div id="error_msg">';
	echo 'Error : ' . $excptn->getMessage();
	echo '</div>';
	die();
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
	if (!empty($_POST['clear_cart'])) {
		$EE_Session->reset_data(array(
				'cart',
				'gateway_data', 
				'transaction', 
				'registration',
				'primary_attendee',
				'tax_totals',
				'taxes',
				'billing_info'
				));
	}
}





function espresso_init() {

	do_action('action_hook_espresso_debug_file');
	//Globals used throughout the site
	global $espresso_premium;

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
//	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event_Object.class.php';
//	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event.class.php';
//	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Attendee.class.php';
//	require_once EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Venue.class.php';
	
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . "functions/main.php");
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/pricing.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/time_date.php');

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/actions.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/filters.php');

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Single_Page_Checkout.class.php');
	global $Single_Page_Checkout;
	$Single_Page_Checkout = EE_Single_Page_Checkout::instance();	
	$espresso_premium = apply_filters('filter_hook_espresso_systems_check', false);

	do_action('action_hook_espresso_coupon_codes');
}



function espresso_systems_check($check) {
	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/misc_functions.php')) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/misc_functions.php');
		$check = espresso_system_check();
	}

	//These files need to be above the core function files
	if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/addons_includes.php')) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/addons_includes.php');
	}
	return $check;
}

add_filter('filter_hook_espresso_systems_check', 'espresso_systems_check');



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


function espresso_load_reg_page_files() {

	define("ESPRESSO_REG_PAGE_FILES_LOADED", "true");

//Process email confirmations
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/email.php');

//Various attendee functions
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/attendee_functions.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/thank_you_page.php');
	event_espresso_require_gateway('PaymentGateway.php');
}
add_action('action_hook_espresso_load_reg_page_files', 'espresso_load_reg_page_files');



/**
 * 		used by EE and EE addons during plugin activation
 *
 * 		@access public
 * 		@return void
 */
function event_espresso_run_install($table_name, $table_version, $sql, $engine = '') {

	global $wpdb;

	$wp_table_name = $wpdb->prefix . $table_name;

	if ($wpdb->get_var("SHOW TABLES LIKE '" . $wp_table_name . "'") != $wp_table_name) {

		$sql_create_table = "CREATE TABLE " . $wp_table_name . " ( " . $sql . " ) " . $engine . " DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql_create_table);

		//create option for table version
		$option_name = $table_name . '_tbl_version';
		$newvalue = $table_version;
		if (get_option($option_name)) {
			update_option($option_name, $newvalue);
		} else {
			$deprecated = '';
			$autoload = 'no';
			add_option($option_name, $newvalue, $deprecated, $autoload);
		}
		//create option for table name
		$option_name = $table_name . '_tbl';
		$newvalue = $wp_table_name;
		if (get_option($option_name)) {
			update_option($option_name, $newvalue);
		} else {
			$deprecated = '';
			$autoload = 'no';
			add_option($option_name, $newvalue, $deprecated, $autoload);
		}
	}

	// Code here with new database upgrade info/table Must change version number to work.

	$installed_ver = get_option($table_name . '_tbl_version');
	if ($installed_ver != $table_version) {
		$sql_create_table = "CREATE TABLE " . $wp_table_name . " ( " . $sql . " ) ;";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql_create_table);
		update_option($table_name . '_tbl_version', $table_version);
	}
}





function espresso_admin_pages() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	define( 'EE_CORE_ADMIN', EE_CORE . 'admin' . DS );
	define( 'EE_CORE_ADMIN_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'includes' . DS . 'core' . DS . 'admin' . DS );
	define( 'WP_AJAX_URL', get_bloginfo('url') . '/wp-admin/admin-ajax.php' );
	
	
	$page_request = FALSE;
	// start with an empty array
	$admin_pages = array();
	// folders we don't want
	$exclude = array();
	// grab everything in the  admin core directory
	if ( $admin_screens = glob( EE_CORE_ADMIN . '*' )) {	
		foreach( $admin_screens as $admin_screen ) {
			// files and anything in the exclude array need not apply
			if ( is_dir( $admin_screen ) && ! in_array( $admin_screen, $exclude )) {
				// these folders represent the different EE admin pages
				$admin_pages[] = basename( $admin_screen );
			}
		}
	}
	// allow addons to insert their data into the admin pages array
	$admin_pages = apply_filters( 'filter_hook_espresso_admin_pages_array', $admin_pages );	
	//echo '<pre style="height:auto;border:2px solid #FF6600;">' . print_r( $admin_pages, TRUE ) . '</pre>';

	// load admin page factory
	require_once( EE_CORE_ADMIN . 'Admin_Page_Init.core.php' );
	$Admin_Page_Init = Admin_Page_Init::instance();

	if ( ! empty( $_REQUEST['page'] )) {
		// grab page request
		$page_request = sanitize_key( $_REQUEST['page'] );
		// if it's' an admin page then initialize it
		if ( ! in_array( $page_request, $admin_pages )) {
			$page_request = FALSE;
		}
	}
	
	foreach ( $admin_pages as $admin_page ) {	
		$Admin_Page_Init->initialize_admin_page( $admin_page, $page_request );	
	}
	
}

