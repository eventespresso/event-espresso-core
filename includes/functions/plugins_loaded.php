<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


/**
 * 		define all event espresso db table names plus directory and url paths
 *
 * 		@access public
 * 		@return void
 */
function espresso_define_tables_and_paths() {

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
 *
 * 		@access 		public
* 		@param		$class		path and name of the class file to be loaded
 * 		@return 		void
 */
function espresso_autoload() {
	//core
	spl_autoload_register('espresso_models_autoload');
	spl_autoload_register('espresso_classes_autoload');
	spl_autoload_register('espresso_classes_core_autoload');	
	spl_autoload_register('espresso_core_admin_core_autoload');
	spl_autoload_register('espresso_core_admin_classes_autoload');
}

function espresso_models_autoload($className) {
	$filename = dirname(espresso_main_file()) . '/includes/models/' . $className . '.model.php';
	if ( is_readable($filename) ) {
		require_once( $filename );
	}
}

function espresso_classes_autoload($className) {
	$filename = dirname(espresso_main_file()) . '/includes/classes/' . $className . '.class.php';
	if ( is_readable($filename) ) {
		require_once( $filename );
	}
}

function espresso_classes_core_autoload($className) {
	//let's setup an array of paths to check (for each subsystem)
	$root = dirname(espresso_main_file()) . '/includes/core/';
	
	//todo:  more subsystems could be added in this array OR even better this array can be defined somewhere else!
	$dir_ref[] = array(
		'root' => array('core', 'class'),
		'/messages/' => 'core',
		'/messages/message_type/' => 'class',
		'/messages/messenger/' => 'class'
		);

	//assemble a list of filenames
	foreach ( $dir_ref as $dir => $types ) {
		if ( is_array($types) ) {
			foreach ( $types as $type) {
				$filenames[] = ( $dir == 'root' ) ? $root . $className . '.' . $type . '.php' : $root . $dir . $className . '.' . $type . '.php';
			}
		} else {
			$filenames[] = ( $dir == 'root' ) ? $root . $className . '.' . $types . '.php' : $root . $dir . $className . '.' . $types . '.php';
		}
	}

	//now loop through assembled filenames and require as available
	foreach ( $filenames as $filename ) {
		if ( is_readable($filename) )
			require_once( $filename );
	}
}

function espresso_core_admin_autoload($className) {
	//let's setup an array of paths to check (for each subsystem)
	$root = dirname(espresso_main_file()) . '/includes/core/admin/';
	
	//todo:  more subsystems could be added in this array OR even better this array can be defined somewhere else!
	$dir_ref[] = array(
		'root' => array('core', 'class'),
		'/event_pricing/' => array('core','class'),
		'/messages/' => array('core', 'class'),
		'/registrations/' => array('core','class'),
		'/transactions/' => array('class', 'class')
		);

	//assemble a list of filenames
	foreach ( $dir_ref as $dir => $types ) {
		if ( is_array($types) ) {
			foreach ( $types as $type) {
				$filenames[] = ( $dir == 'root' ) ? $root . $className . '.' . $type . '.php' : $root . $dir . $className . '.' . $type . '.php';
			}
		} else {
			$filenames[] = ( $dir == 'root' ) ? $root . $className . '.' . $types . '.php' : $root . $dir . $className . '.' . $types . '.php';
		}
	}

	//now loop through assembled filenames and require as available
	foreach ( $filenames as $filename ) {
		if ( is_readable($filename) )
			require_once( $filename );
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
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Log.class.php');
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

//	echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//	echo '<pre style="height:auto;border:2px solid #FF6600;">' . print_r( $_REQUEST, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';

	do_action('action_hook_espresso_debug_file');
	//Globals used throughout the site
	global $espresso_premium, $is_UI_request;
	// is this request for UI or backend 
	$is_UI_request = ( ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' ) ? TRUE : FALSE;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, 'is_UI_request = ' . $is_UI_request );

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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	if (isset($_REQUEST['import'])) {
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
			$EE_Import = EE_Import::instance();
			$EE_Import->import();
		}
	}
}


function espresso_load_reg_page_files() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
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

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
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





/**
 * 		loads and instantiates files and objects for EE admin pages
 *
 * 		@access public
 * 		@return void
 */
function espresso_admin_pages() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	define( 'EE_CORE_ADMIN', EE_CORE . 'admin' . DS );
	define( 'EE_CORE_ADMIN_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'includes' . DS . 'core' . DS . 'admin' . DS );
	define( 'WP_AJAX_URL', get_bloginfo('url') . '/wp-admin/admin-ajax.php' );
	define( 'JQPLOT_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/' );
	
	global $is_UI_request;

	// load admin page factory files
	require_once( EE_CORE_ADMIN . 'EE_Admin_Page_Init.core.php' );
	require_once( EE_CORE_ADMIN . DS . 'EE_Admin_Page.core.php' ); 

	$load_admin = TRUE;
	// grab page request
	$page_request = ! empty( $_REQUEST['page'] ) ? sanitize_key( $_REQUEST['page'] ) : FALSE;

	// are we just doing some backend processing or runnning the whole shebang?
	if ( ! $is_UI_request ) {
		//echo '<h4>load admin page : ' . $page_request . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		// if the page_request doesn't load here for some reason then load the entire admin
		$load_admin = ! espresso_load_admin_page( $page_request, $page_request ) ? TRUE : FALSE;
	}
	
	if ( $load_admin ) {
		//echo '<h4>load all admin pages  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
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

		// if it's' an admin page then initialize it
		if ( ! in_array( $page_request, $admin_pages )) {
			$page_request = FALSE;
		}

		// now loop thru all of our admin pages
		foreach ( $admin_pages as $admin_page ) {
			espresso_load_admin_page( $admin_page, $page_request );
		}
	}
	
}




/**
 * 		loads and instantiates files and objects for a single EE admin page
 *
 * 		@access public
 * 		@param string	$admin_page
 * 		@return void
 */
function espresso_load_admin_page( $admin_page, $page_request ) {

	$admin_page = strtolower( $admin_page );
	$page_name = ucwords(  str_replace( '_', ' ', $admin_page ));
	$class_name = str_replace( ' ', '_', $page_name );
	
	// find, load and instantiate admin page init file
	$path_to_init = EE_CORE_ADMIN . $admin_page . DS . $class_name . '_Admin_Page_Init.core.php';		
	if ( file_exists( $path_to_init )) {
		//echo '<h2>$path_to_init : ' . $path_to_init . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h2>';		
		require_once( $path_to_init );
		$page_class =  $class_name . '_Admin_Page_Init';
		$a = new ReflectionClass( $page_class );
		$a->newInstance( $admin_page, $page_name, $class_name, $page_request );	
		return TRUE;					
	} else {
		return FALSE;
	}
}
