<?php
/*
  Plugin Name: 	Event Espresso
  Plugin URI: 		http://eventespresso.com/
  Description: 		Out-of-the-box Events Registration integrated with PayPal IPN for your WordPress blog/website. <a href="admin.php?page=espresso_support" >Support</a>

  Reporting features provide a list of events, list of attendees, and excel export.

  Version: 			4.0.1.beta.7

  Author: 				Seth Shoultes
  Author URI: 		http://www.eventespresso.com
  License: 				GPLv2

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
	return '4.0.1.beta.7';
}


define("EVENT_ESPRESSO_VERSION", espresso_version());
define('EVENT_ESPRESSO_POWERED_BY', 'Event Espresso - ' . EVENT_ESPRESSO_VERSION);


//Returns the template version
function espresso_template_version() {
	return '1.0';
}

function espresso_main_file() {
	static $main_file;
	if (!$main_file) {
		$main_file = __FILE__;
	}
	return $main_file;
}

global $wpdb, $eei18n_js_strings;
$eei18n_js_strings = array();

global $wpdb;

if ( ! defined( 'DS' )) {
	define( 'DS', DIRECTORY_SEPARATOR );
}
if ( ! defined( 'PS' )) {
	define( 'PS', PATH_SEPARATOR );
}

// add ESPRESSO directories to include_path
set_include_path(
	dirname( espresso_main_file() ) . DS . 'includes' . DS . 'core' . DS . PS .
	dirname( espresso_main_file() ) . DS . 'includes' . DS . 'models' . DS . PS .
	dirname( espresso_main_file() ) . DS . 'includes' . DS . 'classes' . DS . PS .
	dirname( espresso_main_file() ) . DS . 'includes' . DS . 'functions' . DS . PS .
	dirname( espresso_main_file() ) . DS . 'gateways' . DS . PS .
	dirname( espresso_main_file() ) . DS . 'helpers' . DS . PS .
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


//Define the plugin directory and path
define("EVENT_ESPRESSO_PLUGINPATH", DS . plugin_basename(__FILE__) . DS);
define("EVENT_ESPRESSO_PLUGINFULLPATH", plugin_dir_path(__FILE__));
define("EVENT_ESPRESSO_PLUGINFULLURL", plugin_dir_url(__FILE__));

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

/**
 * The following are the WordPress actions for a typical request
 * in the order that they are executed along with the corresopnding
 * Event Espresso functions that are hooked to those actions
 *
 * For a complete list see:
 * http://codex.wordpress.org/Plugin_API/Action_Reference
 */
require_once(dirname(__FILE__) . '/includes/classes/EE_Exceptions.class.php');
require_once(dirname(__FILE__) . '/includes/functions/plugins_loaded.php');
require_once(dirname(__FILE__) . '/includes/functions/init.php');
require_once(dirname(__FILE__) . '/includes/functions/wp_hooks.php');


//autoloaders should run really early
//espresso_autoload();


add_action('plugins_loaded', 'espresso_autoload', 2);
add_action('plugins_loaded', 'espresso_get_user_id', 3);
add_action('plugins_loaded', 'espresso_load_org_options', 4);
add_action('plugins_loaded', 'espresso_EE_Session', 5);
add_action('plugins_loaded', 'espresso_init', 25);
add_action('init', 'espresso_load_messages_init', 15);
add_filter('query_vars', 'espresso_add_query_vars');

if ( is_admin() ) {
	register_activation_hook(__FILE__, 'espresso_plugin_activation');
	add_action('plugins_loaded', 'espresso_check_for_export');
	add_action('plugins_loaded', 'espresso_check_for_import');
	add_action('admin_init', 'espresso_check_data_tables' );
	add_action('init', 'espresso_init_admin_pages', 100);
	add_action('admin_bar_menu', 'espresso_toolbar_items', 100);
	add_filter('plugin_action_links', 'event_espresso_filter_plugin_actions', 10, 2);
	add_action( 'admin_enqueue_scripts', 'espresso_load_scripts_styles' );
	
} else {
	add_action('init', 'espresso_export_certificate', 30);
	add_action('init', 'espresso_export_invoice', 30);
	//add_action('init', 'espresso_export_ticket', 30);

	add_action('init', 'espresso_load_jquery', 10);
	add_action('init', 'espresso_frontend_init', 25);
	add_action('widgets_init', 'espresso_widget');
	add_action('wp_head', 'espresso_info_header');
	add_action('wp_enqueue_scripts', 'add_espresso_stylesheet', 20);
	add_action('wp_enqueue_scripts', 'eei18n_js_strings', 100 );

}

/** edit as neccessary
 *------------------------------------------------------------------------------
 * Frontend Action Order
 * -----------------------------------------------------------------------------
 * require_once: /includes/functions/plugins_loaded.php
 * require_once: /includes/functions/init.php
 * require_once: /includes/functions/wp_hooks.php
 *
 * plugins_loaded:
 *	1: espresso_define_tables_and_paths
 *	2: espresso_get_user_id
 *		filter_hook_espresso_get_user_id:
 *	3: espresso_load_org_options
 *		require_once: classes/EE_Log.class.php
 *	4: espresso_EE_Session
 *		require_once: classes/EE_Session.class.php
 *	25: espresso_init
 * widgets_init:
 *	10: espresso_widget
 * init:
 *	10: espresso_load_jquery
 *	25: espresso_frontend_init
 *	30: espresso_export_certificate
 *	30: espresso_export_invoice
 *	30: espresso_export_ticket
 *	40: espresso_add_rewrite_rules
 *	41: espresso_flush_rewrite_rules
 * wp_head:
 *	10: espresso_info_header
 * wp_print_styles:
 *	20: add_espresso_stylesheet (file includes/functions/wp_hooks.php, line 33)
 * wp_footer:
 *	10: espresso_load_javascript_files
 * admin_bar_menu:
 *	100: espresso_toolbar_items
 * -----------------------------------------------------------------------------
 * Frontend Filters
 * -----------------------------------------------------------------------------
 * query_vars:
 *	10: espresso_add_query_vars
 * -----------------------------------------------------------------------------
 * Admin Action Order
 * -----------------------------------------------------------------------------
 * require_once: /includes/functions/plugins_loaded.php
 * require_once: /includes/functions/init.php
 * require_once: /includes/functions/wp_hooks.php
 *
 * register_activation_hook:
 *	espresso_plugin_activation
 *
 * plugins_loaded:
 *  1: espresso_define_tables_and_paths
 *	2: espresso_get_user_id
 *	3: espresso_load_org_options
 *	4: espresso_EE_Session
 *	10: espresso_check_for_export
 *	10: espresso_check_for_import
 *	25: espresso_init
 *
 * init:
 *	25: espresso_admin_init
 *			require_once /includes/admin-screens/admin.php
 *			require_once /includes/admin-screens/admin_screen.php
 *			require_once /includes/admin-screens/admin_menu.php
 *	25: espresso_load_admin_ajax_callbacks
 *	30: espresso_export_certificate
 *	30: espresso_export_invoice
 *	30: espresso_export_ticket
 *
 * admin_bar_menu:
 *	100: espresso_toolbar_items
 *
 *
 * -----------------------------------------------------------------------------
 * Admin Filters
 * -----------------------------------------------------------------------------
 * query_vars:
 *	10: espresso_add_query_vars
 * plugin_action_links:
 *	10: event_espresso_filter_plugin_actions
 *
 */
//echo get_option('plugin_error');
//delete_option('plugin_error');


class EE_BASE {
	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __get($a) { return FALSE; }
	public function __set($a,$b) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }	
}
