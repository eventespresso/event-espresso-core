<?php if ( ! defined('ABSPATH')) exit('No direct script access allowed');
/*
  Plugin Name: Event Espresso
  Plugin URI:  	http://wordpress.org/plugins/event-espresso-free/
  Description: 	Manage your events from your WordPress dashboard. Reduce your admin, reduce your costs, make your life easier! | <a href="admin.php?page=espresso_support&action=contact_support">Support</a>
  Version: 			4.2.3.rc.001
  Author: 				Event Espresso
  Author URI: 		http://eventespresso.com/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=wordpress_plugins_page&utm_content=support_link
  License: 			GPLv2
  TextDomain:		event_espresso

  Copyright 			(c) 2008-2014 Event Espresso  All Rights Reserved.

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

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @package 		Event Espresso
 * @author 			Seth Shoultes
 * @copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @link 				{@link http://www.eventespresso.com}
 * @since 			4.0
 *
 */

//Returns the plugin version
if ( ! function_exists( 'espresso_version' )) {
	function espresso_version() {
		return '4.2.3.rc.001';
	}
} else {
	unset( $_GET['activate'] );
	add_action( 'admin_notices', 'espresso_duplicate_plugin_error', 1 );
}
// define versions
define( 'EVENT_ESPRESSO_VERSION', espresso_version());
define( 'EE_MIN_WP_VER_REQUIRED', '3.6' );
define( 'EE_MIN_WP_VER_RECOMMENDED', '3.8.1' );
define( 'EE_MIN_PHP_VER_RECOMMENDED', '5.3' );
define( 'EVENT_ESPRESSO_POWERED_BY', 'Event Espresso - ' . EVENT_ESPRESSO_VERSION );
define( 'EVENT_ESPRESSO_MAIN_FILE', __FILE__ );

//used to be DIRECTORY_SEPARATOR, but that caused issues on windows
if ( ! defined( 'DS' )) {
	define( 'DS', '/' );
}
if ( ! defined( 'PS' )) {
	define( 'PS', PATH_SEPARATOR );
}
if( ! defined( 'SP' ) ){
	define('SP',' ');
}

define( 'EE_SUPPORT_EMAIL', 'support@eventespresso.com');
// define the plugin directory and URL
define( 'EE_PLUGIN_BASENAME', plugin_basename( EVENT_ESPRESSO_MAIN_FILE ));
define( 'EE_PLUGIN_DIR_PATH', plugin_dir_path( EVENT_ESPRESSO_MAIN_FILE ));
define( 'EE_PLUGIN_DIR_URL', plugin_dir_url( EVENT_ESPRESSO_MAIN_FILE ));
// main root folder paths
define( 'EE_ADMIN_PAGES', EE_PLUGIN_DIR_PATH . 'admin_pages' . DS );
define( 'EE_CORE', EE_PLUGIN_DIR_PATH . 'core' . DS );
define( 'EE_MODULES', EE_PLUGIN_DIR_PATH . 'modules' . DS );
define( 'EE_SHORTCODES', EE_PLUGIN_DIR_PATH . 'shortcodes' . DS );
define( 'EE_TEMPLATES', EE_PLUGIN_DIR_PATH . 'templates' . DS );
define( 'EE_WIDGETS', EE_PLUGIN_DIR_PATH . 'widgets' . DS );
define( 'EE_CAFF_PATH', EE_PLUGIN_DIR_PATH . 'caffeinated' . DS );
// core system paths
define( 'EE_ADMIN', EE_CORE . 'admin' . DS );
define( 'EE_CPTS', EE_CORE . 'CPTs' . DS );
define( 'EE_CLASSES', EE_CORE . 'db_classes' . DS );
define( 'EE_MODELS', EE_CORE . 'db_models' . DS );
define( 'EE_HELPERS', EE_CORE . 'helpers' . DS );
define( 'EE_LIBRARIES', EE_CORE . 'libraries' . DS );
define( 'EE_THIRD_PARTY', EE_CORE . 'third_party_libs' . DS );
define( 'EE_GLOBAL_ASSETS', EE_TEMPLATES . 'global_assets' . DS );
// gateways
define( 'EE_GATEWAYS', EE_MODULES . 'gateways' . DS );
define( 'EE_GATEWAYS_URL', EE_PLUGIN_DIR_URL . 'modules' . DS . 'gateways' . DS );
// asset URL paths
define( 'EE_TEMPLATES_URL', EE_PLUGIN_DIR_URL . 'templates' . DS );
define( 'EE_GLOBAL_ASSETS_URL', EE_TEMPLATES_URL . 'global_assets' . DS );
define( 'EE_IMAGES_URL',  EE_GLOBAL_ASSETS_URL . 'images' . DS );
define( 'EE_THIRD_PARTY_URL', EE_PLUGIN_DIR_URL . 'core' . DS . 'third_party_libs' . DS );
define( 'EE_HELPERS_ASSETS', EE_PLUGIN_DIR_URL . 'core/helpers/assets/' );

// define upload paths
$uploads = wp_upload_dir();
// define the uploads directory and URL
define( 'EVENT_ESPRESSO_UPLOAD_DIR', $uploads['basedir'] . DS . 'espresso' . DS );
define( 'EVENT_ESPRESSO_UPLOAD_URL', $uploads['baseurl'] . DS . 'espresso' . DS );
// define the templates dirrectory and URL
define( 'EVENT_ESPRESSO_TEMPLATE_DIR', $uploads['basedir'] . DS . 'espresso' . DS . 'templates' . DS );
define( 'EVENT_ESPRESSO_TEMPLATE_URL', $uploads['baseurl'] . DS . 'espresso' . DS . 'templates' . DS );
// define the gateway directory and URL
define( 'EVENT_ESPRESSO_GATEWAY_DIR', $uploads['basedir'] . DS . 'espresso' . DS . 'gateways' . DS );
define( 'EVENT_ESPRESSO_GATEWAY_URL', $uploads['baseurl'] . DS . 'espresso' . DS . 'gateways' . DS );
// languages folder/path
define( 'EE_LANGUAGES_SAFE_LOC', '..' . DS . 'uploads' . DS . 'espresso' . DS . 'languages' . DS );
define( 'EE_LANGUAGES_SAFE_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'languages' . DS );

//ajax constants
define( 'EE_FRONT_AJAX', isset($_REQUEST['ee_front_ajax']) ? TRUE : FALSE );
define( 'EE_ADMIN_AJAX', isset($_REQUEST['ee_admin_ajax']) ? TRUE : FALSE );
//just a handy constant occasionally needed for finding values reprsenting infinity in the DB
//you're better to use this than its straight value (currently -1) in case you ever
//want to change its default value! or find when -1 means infinity
define('EE_INF_IN_DB', -1);



/**
 * 	espresso_duplicate_plugin_error
 * 	displays if more than one version of EE is activated at the same time
 */
function espresso_duplicate_plugin_error() {
	?>
	<div class="error">
	<p><?php _e( 'Can not run multiple versions of Event Espresso! Please deactivate one of the versions.', 'event_espresso' ); ?></p>
	</div>
	<?php
	deactivate_plugins( plugin_basename( __FILE__ ));
}



/**
 * 	espresso_plugin_activation
 * 	adds a wp-option to indicate that EE has been activated via the WP admin plugins page
 */
function espresso_plugin_activation() {
	// check permissions
	if ( ! current_user_can( 'activate_plugins' )) {
		return;
	}
	$plugin = isset( $_REQUEST['plugin'] ) ? $_REQUEST['plugin'] : '';
	check_admin_referer( "activate-plugin_{$plugin}" );
	update_option( 'ee_espresso_activation', TRUE );
}
register_activation_hook( EVENT_ESPRESSO_MAIN_FILE, 'espresso_plugin_activation' );



/**
 * 	espresso_plugin_deactivation
 */
function espresso_plugin_deactivation() {
	// check permissions
	if ( ! current_user_can( 'activate_plugins' )) {
		return;
	}
	$plugin = isset( $_REQUEST['plugin'] ) ? $_REQUEST['plugin'] : '';
	check_admin_referer( "deactivate-plugin_{$plugin}" );
	espresso_load_required( 'EEH_Activation', EE_HELPERS . 'EEH_Activation.helper.php' );
	EEH_Activation::plugin_deactivation();
}
register_deactivation_hook( EVENT_ESPRESSO_MAIN_FILE, 'espresso_plugin_deactivation' );



/**
 * 	espresso_load_error_handling
 * 	this function loads EE's class for handling exceptions and errors
 */
function espresso_load_error_handling() {
	// loaddebugging tools
	if ( WP_DEBUG === TRUE ) {
		require_once( EE_HELPERS . 'EEH_Debug_Tools.helper.php' );
		EEH_Debug_Tools::instance();
	}
	// load error handling
	if ( is_readable( EE_CORE . 'EE_Error.core.php' )) {
		 require_once( EE_CORE . 'EE_Error.core.php' );
	} else {
		wp_die( __( 'The EE_Error core class could not be loaded.', 'event_espresso' ));
	}
}



/**
 * 	espresso_load_required
 * 	given a classname and path, this function will load that file or throw an exception
 */
function espresso_load_required( $classname, $full_path_to_file ) {
	espresso_load_error_handling();
	if ( is_readable( $full_path_to_file )) {
		require_once( $full_path_to_file );
	} else {
		throw new EE_Error ( sprintf (
			__( 'The %s class file could not be located or is not readable due to file permissions.', 'event_espresso' ),
			$classname
		));
	}
}



espresso_load_required( 'EE_System', EE_CORE . 'EE_System.core.php' );
EE_System::instance();
