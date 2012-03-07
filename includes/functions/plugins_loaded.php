<?php

/**
 * 		define all event espresso db table names plus directory and url paths
 *
 * 		@access public
 * 		@return void
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

	//Define the plugin directory and path
	define("EVENT_ESPRESSO_PLUGINPATH", "/" . plugin_basename(dirname(dirname(__FILE__) . "/../../espresso.php")) . "/");
	define("EVENT_ESPRESSO_PLUGINFULLPATH", plugin_dir_path(dirname(__FILE__) . "/../../espresso.php"));
	define("EVENT_ESPRESSO_PLUGINFULLURL", plugin_dir_url(dirname(__FILE__) . "/../../espresso.php"));

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
	global $current_user;

	$wp_user_id = 0;

	if (function_exists('espresso_manager_pro_version') && !empty($_SESSION['espresso_use_selected_manager'])) {
		$wp_user_id = $current_user->ID;

		//If an event manager is selected, then we need to load that persons id
		$selected_user = espresso_get_selected_manager();
		if (!empty($selected_user)) {
			$wp_user_id = $selected_user;
		}
	} elseif (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
		$wp_user_id = espresso_member_data('id');
	} else {
		$wp_user_id = 1;
	}

	//Make sure the final user id is not 0
	if ($wp_user_id == 0) {
		$wp_user_id = 1;
	}

	//define it as a global
	global $espresso_wp_user;
	$espresso_wp_user = $wp_user_id;

	//Debug
	//echo '<p>$espresso_wp_user = '.$espresso_wp_user.'</p>';

	return $wp_user_id;
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
 * 		initialize the espresso session
 *
 * 		@access public
 * 		@return void
 */
function espresso_init_session() {

	global $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	if (!isset($_SESSION)) {
		session_start();
	}

	if (( isset($_REQUEST['page_id'])
					&& ( $_REQUEST['page_id'] == $org_options['return_url']
									|| $_REQUEST['page_id'] == $org_options['notify_url']))
					|| !isset($_SESSION['espresso_session']['id'])
					|| $_SESSION['espresso_session']['id'] == array()) {

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