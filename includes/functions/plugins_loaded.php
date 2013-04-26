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
		dirname( espresso_main_file() ) . DS . 'includes' . DS . 'core' . DS . PS .
		dirname( espresso_main_file() ) . DS . 'includes' . DS . 'models' . DS . PS .
		dirname( espresso_main_file() ) . DS . 'includes' . DS . 'classes' . DS . PS .
		dirname( espresso_main_file() ) . DS . 'includes' . DS . 'functions' . DS . PS .
		dirname( espresso_main_file() ) . DS . 'gateways' . DS . PS .
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
	define("ESP_COUNTRY", $wpdb->prefix . "esp_country");
	define("ESP_DATETIME", $wpdb->prefix . "esp_datetime");
	define("ESP_STATUS_TABLE", $wpdb->prefix . "esp_status");
	define("EVENTS_QST_GROUP_TABLE", $wpdb->prefix . "events_qst_group");
	define("EVENTS_QST_GROUP_REL_TABLE", $wpdb->prefix . "events_qst_group_rel");
	define("EVENTS_QUESTION_TABLE", $wpdb->prefix . "events_question");
	define("EVENTS_START_END_TABLE", $wpdb->prefix . "events_start_end");
	define("ESP_STATE", $wpdb->prefix . "esp_state");
	define("EVENTS_VENUE_TABLE", $wpdb->prefix . "events_venue");
	define("EVENTS_VENUE_REL_TABLE", $wpdb->prefix . "events_venue_rel");
	// End table definitions
	
	//define("EVENTS_PRICES_TABLE", $wpdb->prefix . "events_prices"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<  ADDED BACK IN UNTIL PRICE TABLE CHANGES ARE COMPLETE

	define('EVENT_ESPRESSO_POWERED_BY', 'Event Espresso - ' . EVENT_ESPRESSO_VERSION);

	//Define the plugin directory and path
	$main_file = espresso_main_file();
	define("EVENT_ESPRESSO_PLUGINPATH", DS . plugin_basename($main_file) . DS);
	define("EVENT_ESPRESSO_PLUGINFULLPATH", plugin_dir_path($main_file));
	define("EVENT_ESPRESSO_PLUGINFULLURL", plugin_dir_url($main_file));

	//Define the includes directory
	define("EVENT_ESPRESSO_INCLUDES_DIR", EVENT_ESPRESSO_PLUGINFULLPATH . 'includes' . DS );
	define("EVENT_ESPRESSO_TEMPLATES", EVENT_ESPRESSO_PLUGINFULLPATH . 'templates' . DS );
	define( 'EE_CORE', EVENT_ESPRESSO_INCLUDES_DIR . 'core' . DS );
	define( 'EE_HELPERS', EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers' . DS );


	//Define directory structure for uploads
	//Create the paths
	$uploads = wp_upload_dir();

	//Define the uploads directory and url
	define("EVENT_ESPRESSO_UPLOAD_DIR", $uploads['basedir'] . DS . 'espresso' . DS);
	define("EVENT_ESPRESSO_UPLOAD_URL", $uploads['baseurl'] . '/espresso/' );

	//Define the templates dirrectory and url
	define("EVENT_ESPRESSO_TEMPLATE_DIR", $uploads['basedir'] . DS . 'espresso' . DS . 'templates' . DS);
	define("EVENT_ESPRESSO_TEMPLATE_URL", $uploads['baseurl'] . '/espresso/templates/' );

	//Define the gateway directory and url
	define("EVENT_ESPRESSO_GATEWAY_DIR", $uploads['basedir'] . DS . 'espresso' . DS . 'gateways' . DS);
	define("EVENT_ESPRESSO_GATEWAY_URL", $uploads['baseurl'] .'/espresso/gateways/' );
}






/**
 * 		Automagically load non-singleton class files - no need to include or require
 * 		ONLY works with class objects created via  "new"  ie: $object = new SomeClassName();
 *
 * 		@access 		public
* 		@param		$class		path and name of the class file to be loaded
 * 		@return 		void
 */
function espresso_autoload() {
	//core
	spl_autoload_register('espresso_models_autoload');
	spl_autoload_register('espresso_libraries_autoload');
	spl_autoload_register('espresso_classes_autoload');
	spl_autoload_register('espresso_classes_core_autoload');	
	spl_autoload_register('espresso_core_admin_autoload');
}

function espresso_models_autoload($className) {
	$filename = dirname(espresso_main_file()) . '/includes/models/' . $className . '.model.php';
	if ( is_readable($filename) ) {
		require_once( $filename );
	}
}


function espresso_libraries_autoload($className) {
	//let's setup an array of paths to check (for each subsystem)
	$root = dirname(espresso_main_file()) . '/libraries/';
	
	//todo:  more subsystems could be added in this array OR even better this array can be defined somewhere else!
	$dir_ref = array(
		'root' => array('core', 'lib'),
		'shortcodes/' => array('core', 'lib')
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
	$dir_ref = array(
		'root' => array('core', 'class'),
		'messages/' => 'core',
		'messages/message_type/' => 'class',
		'messages/messenger/' => 'class',
		'messages/defaults/' => array('class', 'core'),
		'messages/defaults/email/' => 'class',
		'messages/data_class/' => array('core','class'),
		'messages/validators/' => array('core', 'class'),
		'messages/validators/email/' => 'class'
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
	$dir_ref = array(
		'root' => array('core', 'class', 'controller'),
		'attendees/' => array('core', 'class'),
		'events/' => array('core','class'),
		'event_categories/' => array('core','class'),
		'registration_form/' => array('core', 'class'),
		'general_settings/' => array('core','class'),
		'messages/' => array('core', 'class'),
		'payments/' => array('core', 'class'),
		'pricing/' => array('core', 'class'),
		'registrations/' => array('core','class'),
		'support/' => array('core', 'class'),
		'transactions/' => array('core', 'class'),
		'venues/' => array('core', 'class')
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




/**
 * 		get WP user id for currently logged in user 
 *
 * 		@access public
 * 		@return void
 */
function espresso_get_user_id() {
	global $current_user, $espresso_wp_user;
	$espresso_wp_user = 1;
	$espresso_wp_user = apply_filters('filter_hook_espresso_get_user_id', $espresso_wp_user);
	return $espresso_wp_user;
}




/**
 * 		load EE organization options and begin EE logging
 *
 * 		@access public
 * 		@return void
 */
function espresso_load_org_options() {
	global $org_options, $espresso_wp_user;
	// grab org options based on current admin user
	$org_options = get_user_meta( $espresso_wp_user, 'events_organization_settings', TRUE );
	// do settings for this user exist ?
	if ( empty( $org_options )) {
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
		espresso_org_option_initialization();		
	} else {
		// list of critical org_options
		$critical_org_options = array( 
			'contact_email',
			'currency_symbol',
			'espresso_url_rewrite_activated'
		);
		// cycle thru critical org_options
		foreach ( $critical_org_options as $critical_org_option ) {
			// make sure each one actually exists 
			if ( ! array_key_exists( $critical_org_option, $org_options )) {
				// reinitialize the org options
				require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
				espresso_org_option_initialization( TRUE );
				break;	
			}
		}
	}
		
	require_once( 'EE_Log.class.php' );
	do_action('action_hook_espresso_debug_file');
	$req_vars = '';
	foreach ( $_REQUEST as $k => $v ){
		$req_vars .= "\n" . $k . ' = ' . (is_array($v))?print_r($v,true):$v;
	}
	do_action('action_hook_espresso_log', '', '', '$_REQUEST = ' . $req_vars );	
}





/**
 * 		load and instantiate EE_Session class
 *
 * 		@access public
 * 		@return void
 */
function espresso_EE_Session() {
	global $EE_Session;
	//require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Session.class.php');
	require_once( 'EE_Session.class.php' );
	// instantiate !!!
	$EE_Session = EE_Session::instance();
	if (!empty($_POST['clear_cart'])) {
		espresso_clear_session( __CLASS__, __FUNCTION__ );
	}
}





/**
 * 		Clear EE_Session data
 *
 * 		@access public
 * 		@return void
 */
function espresso_clear_session( $class = '', $func = '' ) {
	//echo '<h3>'. $class . ' -> ' . $func . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	global $EE_Session;
	$EE_Session->reset_data( 
			array(
						'cart',
						'gateway_data', 
						'transaction', 
						'registration',
						'primary_attendee',
						'tax_totals',
						'taxes',
						'billing_info',
						'txn_results',
						'grand_total_price_object'
					));
																
	$EE_Session->set_session_data(
			array(
						'_events_in_cart' => array(),
						'_cart_grand_total_qty' => 0,
						'_cart_grand_total_amount' => 0
					),
					'session_data'
	);

}
add_action( 'action_hook_espresso_before_event_list', 'espresso_clear_session', 10, 2 );





/**
 * 		print_r EE_Session object at bottom of page after everything else has happened
 *
 * 		@access public
 * 		@return void
 */
function espresso_printr_session() {
	$user = wp_get_current_user();
	$wp_user_id = isset( $user->data->ID ) ? $user->data->ID : NULL;
	$_REQUEST['ee_session'] = TRUE;
	if ( isset( $_REQUEST['ee_session'] ) && $wp_user_id <= 1 ) {	
		global $EE_Session;
		echo '<pre style="height:auto;padding:1em;border:2px solid lightblue;">';
		echo print_r( $EE_Session, TRUE );
		$ee_list_hooks = isset( $_REQUEST['ee_list_hooks'] ) && ! empty( $_REQUEST['ee_list_hooks'] ) ? $_REQUEST['ee_list_hooks'] : FALSE;
		list_hooked_functions();
		echo '</pre><br /><span style="font-size:10px;font-weight:normal;">';
		echo __FILE__ . '<br />line no: ' . __LINE__ . '</span>';
	}
}
//add_action( 'shutdown', 'espresso_printr_session' );





/**
 * 		List All Hooked Functions
 * 		to list all functions for a specific hook, add ee_list_hooks={hook-name} to URL
 *		http://wp.smashingmagazine.com/2009/08/18/10-useful-wordpress-hook-hacks/  
 *
 * 		@access public
 * 		@return void
 */
function list_hooked_functions( $tag=FALSE ){
	global $wp_filter;
	echo '<br/><br/><br/><h3>Hooked Functions</h3>';
	if ( $tag ) {
		$hook[$tag]=$wp_filter[$tag];
		if ( ! is_array( $hook[$tag] )) {
			trigger_error( "Nothing found for '$tag' hook", E_USER_WARNING );
			return;
		}
		echo '<h5>For Tag: '. $tag .'</h5>';
	}
	else {
		$hook=$wp_filter;
		ksort( $hook );
	}
	foreach( $hook as $tag => $priority ) {
		echo "<br />&gt;&gt;&gt;&gt;&gt;\t<strong>$tag</strong><br />";
		ksort( $priority );
		foreach( $priority as $priority => $function ){
			echo $priority;
			foreach( $function as $name => $properties ) echo "\t$name<br />";
		}
	}
	return;
}





/**
 * 		captures plugin activation errors for debugging
 *
 * 		@access public
 * 		@return void
 */
function espresso_plugin_activation_errors() {
	if ( WP_DEBUG === TRUE ) {
		file_put_contents( EVENT_ESPRESSO_UPLOAD_DIR. 'logs/espresso_plugin_activation_errors.html', ob_get_contents() );
	}	
}
add_action('activated_plugin', 'espresso_plugin_activation_errors');



/**
 * 		Event Espresso Initialization
 *
 * 		@access public
 * 		@return void
 */
function espresso_init() {

	//Globals used throughout the site
	global $caffeinated, $is_UI_request, $espresso_content;
	// is this request for UI or backend 
	$is_UI_request = ( ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' ) ? TRUE : FALSE;
	if ( defined('DOING_AJAX') || ! $is_UI_request ) {
		remove_action( 'shutdown', 'espresso_printr_session' );
	}

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
	$caffeinated = apply_filters( 'filter_hook_espresso_systems_check', $caffeinated );
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . "functions/main.php");
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/time_date.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/filters.php');	

	do_action('action_hook_espresso_pue_update');
}





/**
 * 		perform system check and load additional files
 *
 * 		@access public
 * 		@return void
 */
function espresso_systems_check( ) {
	if ( file_exists( EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/init.php' )) {
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/init.php' );
	}
	return function_exists( 'espresso_system_check' ) ? espresso_system_check() : FALSE;
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





/**
 * 		Test if current page pertains to event registrationand load appropriate files
 *
 * 		@access public
 * 		@return void
 */
function espresso_load_reg_page_files() {

	global $org_options, $current_ee_page;
	
	$current_ee_page = isset( $current_ee_page ) ? $current_ee_page : $org_options['event_page_id'];
	
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '$current_ee_page = ' . $current_ee_page );

	$reg_pages = array(
		$org_options['event_page_id']	 => 'event_page_id',
		$org_options['return_url']	 => 'return_url',
		$org_options['cancel_return'] => 'cancel_return',
		$org_options['notify_url']	 => 'notify_url'
	);
	
	if ( isset( $reg_pages[ $current_ee_page ] )) {
		switch( $reg_pages[ $current_ee_page ] ){
		
			case 'event_page_id' :

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

				break;
			
			case 'return_url' :
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Thank_You_Page.class.php');
				EE_Thank_You_Page::instance();	
				break;
			
			case 'cancel_return' :
				break;
			
			case 'notify_url' :
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Transaction_Page.class.php');
				EE_Transaction_Page::instance();	
				break;
		}

	}
	

}
add_action('action_hook_espresso_load_reg_page_files', 'espresso_load_reg_page_files');





/**
 * 		used by EE and EE addons during plugin activation
 *
 * 		@access public
 * 		@return void
 */
function event_espresso_run_install( $table_name, $sql, $engine = 'ENGINE=MyISAM ' ) {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	global $wpdb;
	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

	$wp_table_name = $wpdb->prefix . $table_name;
	$SQL = "CREATE TABLE $wp_table_name ( $sql ) $engine DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
	dbDelta( $SQL );
	// clear any of these out
	delete_option( $table_name . '_tbl_version' );
	delete_option( $table_name . '_tbl' );

}





/**
 * Checks if this column already exists on 
 * @param string $table_name (wihtout "wp_", eg "esp_attendee"
 * @param string $column_name
 * @param string $column_info if your SQL were 'ALTER TABLE table_name ADD price VARCHAR(10)', this would be 'VARCHAR(10)'
 */
function espresso_add_column_if_it_doesnt_exist($table_name,$column_name,$column_info='INT UNSIGNED NOT NULL'){
	global $wpdb;
	$full_table_name=$wpdb->prefix.$table_name;
	$fields = espresso_get_fields_on_table($table_name);
	if (!in_array($column_name, $fields)){
		$alter_query="ALTER TABLE $full_table_name ADD $column_name $column_info";
		echo "alter query:$alter_query";
		return mysql_query($alter_query);
	}
	return true;
}

/**
 * Gets all the fields on teh database table. 
 * @param string $table_name, wihtout prefixed $wpdb->prefix
 * @return array of database column names
 */
function espresso_get_fields_on_table($table_name = null) {	
		global $wpdb;
		$table_name=$wpdb->prefix.$table_name;

		if (!empty($table_name)) {
			$fullname = $table_name;
			if (($tablefields = mysql_list_fields(DB_NAME, $fullname, $wpdb -> dbh)) !== false) { 
				$columns = mysql_num_fields($tablefields);
				$field_array = array();
				for ($i = 0; $i < $columns; $i++) {
					$fieldname = mysql_field_name($tablefields, $i);
					$field_array[] = $fieldname;
				}
				return $field_array;
			}
		}
		return false;

	}



function espresso_load_scripts_styles() {
	wp_register_script('ee_error_js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/EE_Error.js', array('jquery'), EVENT_ESPRESSO_VERSION, false);
	wp_enqueue_script('ee_error_js');
}




function espresso_clear_output_buffer() {
	ob_end_clean();
}



function espresso_site_license() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	global $org_options;
// PUE Auto Upgrades stuff
	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'libraries/pue/pue-client.php')) { //include the file 
		require(EVENT_ESPRESSO_PLUGINFULLPATH . 'libraries/pue/pue-client.php' );
		$api_key = isset($org_options['site_license_key']) ? $org_options['site_license_key'] : '';
		$host_server_url = 'http://eventespresso.com'; //this needs to be the host server where plugin update engine is installed.
		$plugin_slug = 'event-espresso-core-pr'; //this needs to be the slug of the plugin/addon that you want updated (and that pue-client.php is included with).  This slug should match what you've set as the value for plugin-slug when adding the plugin to the plugin list via plugin-update-engine on your server.
		//$options needs to be an array with the included keys as listed.
		$options = array(
		//	'optionName' => '', //(optional) - used as the reference for saving update information in the clients options table.  Will be automatically set if left blank.
			'apikey' => $api_key, //(required), you will need to obtain the apikey that the client gets from your site and then saves in their sites options table (see 'getting an api-key' below)
			'lang_domain' => 'event_espresso', //(optional) - put here whatever reference you are using for the localization of your plugin (if it's localized).  That way strings in this file will be included in the translation for your plugin.
			'checkPeriod' => '24', //(optional) - use this parameter to indicate how often you want the client's install to ping your server for update checks.  The integer indicates hours.  If you don't include this parameter it will default to 12 hours.
			'option_key' => 'site_license_key', //this is what is used to reference the api_key in your plugin options.  PUE uses this to trigger updating your information message whenever this option_key is modified.
			'options_page_slug' => 'event_espresso'
		);
		$check_for_updates = new PluginUpdateEngineChecker($host_server_url, $plugin_slug, $options); //initiate the class and start the plugin update engine!
	}
}
add_action('action_hook_espresso_pue_update', 'espresso_site_license');