<?php

/*
  Plugin Name: 	Event Espresso
  Plugin URI: 		http://eventespresso.com/
  Description: 		Out-of-the-box Events Registration integrated with PayPal IPN for your WordPress blog/website. <a href="admin.php?page=support" >Support</a>

  Reporting features provide a list of events, list of attendees, and excel export.

  Version: 			3.2.gateways-728

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
	return '3.2.3014';
}

define("EVENT_ESPRESSO_VERSION", espresso_version());

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




add_action('plugins_loaded', 'espresso_define_tables_and_paths', 1);
add_action('plugins_loaded', 'espresso_autoload', 2);
add_action('plugins_loaded', 'espresso_get_user_id', 3);
add_action('plugins_loaded', 'espresso_load_org_options', 4);
add_action('plugins_loaded', 'espresso_EE_Session', 5);
add_action('plugins_loaded', 'espresso_init', 25);
add_action('init', 'espresso_add_rewrite_rules');
add_filter('query_vars', 'espresso_add_query_vars');
add_action( 'admin_enqueue_scripts', 'espresso_load_scripts_styles' );

if ( is_admin() ) {

	register_activation_hook(__FILE__, 'espresso_plugin_activation');
	add_action('plugins_loaded', 'espresso_check_for_export');
	add_action('plugins_loaded', 'espresso_check_for_import');
	add_action('admin_menu', 'espresso_init_admin_pages', 100);
	add_action('admin_bar_menu', 'espresso_toolbar_items', 100);
	//add_action('init', 'espresso_admin_init', 25);
	//add_action('init', 'espresso_load_admin_ajax_callbacks', 25);
	add_action('init', 'espresso_flush_rewrite_rules', 41);
	add_filter('plugin_action_links', 'event_espresso_filter_plugin_actions', 10, 2);
	
} else {

	add_action('init', 'espresso_export_certificate', 30);
	add_action('init', 'espresso_export_invoice', 30);
	add_action('init', 'espresso_export_ticket', 30);

	add_action('init', 'espresso_load_jquery', 10);
	add_action('init', 'espresso_frontend_init', 25);
	add_action('widgets_init', 'espresso_widget');
	add_action('wp_head', 'espresso_info_header');
	add_action('wp_print_styles', 'add_espresso_stylesheet', 20);
	add_action('wp_loaded', 'espresso_buffer_headers');
//	add_action('wp_footer', 'espresso_load_javascript_files');
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
 * wp_loaded: espresso_buffer_headers
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
