<?php
/*
  Plugin Name: 	Event Espresso
  Plugin URI: 		http://eventespresso.com/
  Description: 		Out-of-the-box Events Registration integrated with PayPal IPN for your WordPress blog/website. <a href="admin.php?page=support" >Support</a>

  Reporting features provide a list of events, list of attendees, and excel export.

  Version: 			3.2.P

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
	return '3.2.P';
}
define("EVENT_ESPRESSO_VERSION", espresso_version());


//Returns the template version
function espresso_template_version() {
	return '1.0';
}

function espresso_main_file() {
	static $main_file;
	if(!$main_file) {
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
require_once(dirname(__FILE__) . '/includes/functions/plugins_loaded.php');
require_once(dirname(__FILE__) . '/includes/functions/init.php');
require_once(dirname(__FILE__) . '/includes/functions/wp_hooks.php');

add_action('plugins_loaded', 'espresso_define_tables_and_paths', 1);
add_action('plugins_loaded', 'espresso_get_user_id', 2);
add_action('plugins_loaded', 'espresso_load_org_options', 3);
add_action('plugins_loaded', 'espresso_init', 25);
add_action('init', 'espresso_export_certificate', 30);
add_action('init', 'espresso_export_invoice', 30);
add_action('init', 'espresso_export_ticket', 30);
add_action('admin_bar_menu', 'espresso_toolbar_items', 100);
add_filter('query_vars', 'espresso_add_query_vars');

if (is_admin()) {
	register_activation_hook(dirname(__FILE__) . '/includes/functions/wp_hooks.php', 'espresso_plugin_activation');
	add_action('plugins_loaded', 'espresso_check_for_export');
	add_action('plugins_loaded', 'espresso_check_for_import');
	add_action('init', 'espresso_admin_init', 25);
	add_filter('plugin_action_links', 'event_espresso_filter_plugin_actions', 10, 2);
} else {
	add_action('plugins_loaded', 'espresso_EE_Session', 4);
	add_action('plugins_loaded', 'espresso_init_session', 5);
	add_action('init', 'espresso_load_jquery', 10);
	add_action('init', 'espresso_frontend_init', 25);
	add_action('init', 'espresso_add_rewrite_rules', 40);
	add_action('init', 'espresso_flush_rewrite_rules', 41);
	add_action('widgets_init', 'espresso_widget');
	add_action('wp_head', 'espresso_info_header');
	add_action('wp_print_styles', 'add_espresso_stylesheet', 20);
	add_action('wp_footer', 'espresso_load_javascript_files');
}
