<?php if ( ! defined('ABSPATH')) exit('No direct script access allowed');
/*
  Plugin Name: 	Event Espresso
  Plugin URI: 		http://eventespresso.com/
  Description: 		Out-of-the-box Events Registration integrated with PayPal IPN for your WordPress blog/website. <a href="admin.php?page=espresso_support" >Support</a>

  Reporting features provide a list of events, list of attendees, and excel export.

  Version: 			4.1.025.dev

  Author: 				Seth Shoultes
  Author URI: 		http://www.eventespresso.com
  License: 				GPLv2
  TextDomain: event_espresso

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
	return '4.1.025.dev';
}
//Returns the template version
function espresso_template_version() {
	return '1.0';
}

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

// define the plugin directory and URL
define("EVENT_ESPRESSO_PLUGINPATH", DS . plugin_basename( EVENT_ESPRESSO_MAIN_FILE ) . DS);
define("EVENT_ESPRESSO_PLUGINFULLPATH", plugin_dir_path( EVENT_ESPRESSO_MAIN_FILE ));
define("EVENT_ESPRESSO_PLUGINFULLURL", plugin_dir_url( EVENT_ESPRESSO_MAIN_FILE ));
//  includes and templates paths
define("EVENT_ESPRESSO_INCLUDES_DIR", EVENT_ESPRESSO_PLUGINFULLPATH . 'includes' . DS );
define("EVENT_ESPRESSO_TEMPLATES", EVENT_ESPRESSO_PLUGINFULLPATH . 'templates' . DS );
// asset URL paths
define( 'EE_IMAGES_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'images/' );
define( 'EE_TEMPLATES_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/' );
// core system paths
define( 'EE_CORE', EVENT_ESPRESSO_INCLUDES_DIR . 'core' . DS );
define( 'EE_CLASSES', EVENT_ESPRESSO_INCLUDES_DIR . 'classes' . DS );
define( 'EE_MODELS', EVENT_ESPRESSO_INCLUDES_DIR . 'models' . DS );
define( 'EE_HELPERS', EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers' . DS );
define( 'EE_MODULES', EVENT_ESPRESSO_PLUGINFULLPATH . 'modules' . DS );
define( 'EE_SHORTCODES', EVENT_ESPRESSO_PLUGINFULLPATH . 'shortcodes' . DS );
define( 'EE_REGISTRY', EE_CORE . 'EE_Registry.core.php');
// Define upload paths
$uploads = wp_upload_dir();
//Define the uploads directory and URL
define("EVENT_ESPRESSO_UPLOAD_DIR", $uploads['basedir'] . DS . 'espresso' . DS);
define("EVENT_ESPRESSO_UPLOAD_URL", $uploads['baseurl'] . '/espresso/' );
//Define the templates dirrectory and URL
define("EVENT_ESPRESSO_TEMPLATE_DIR", $uploads['basedir'] . DS . 'espresso' . DS . 'templates' . DS);
define("EVENT_ESPRESSO_TEMPLATE_URL", $uploads['baseurl'] . '/espresso/templates/' );
//Define the gateway directory and URL
define("EVENT_ESPRESSO_GATEWAY_DIR", $uploads['basedir'] . DS . 'espresso' . DS . 'gateways' . DS);
define("EVENT_ESPRESSO_GATEWAY_URL", $uploads['baseurl'] .'/espresso/gateways/' );

//Languages folder/path
define( 'EE_LANGUAGES_SAFE_LOC', '../uploads/espresso/languages/');
define( 'EE_LANGUAGES_SAFE_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'languages/');


//ajax constants
define('EE_FRONT_AJAX', isset($_REQUEST['ee_front_ajax']) ? TRUE : FALSE );
define('EE_ADMIN_AJAX', isset($_REQUEST['ee_admin_ajax']) ? TRUE : FALSE );



// define versions
if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) {
	define("EVENT_ESPRESSO_VERSION", espresso_version());
	define('EVENT_ESPRESSO_POWERED_BY', 'Event Espresso - ' . EVENT_ESPRESSO_VERSION);	
} else {
	wp_die( __( 'Can not run multiple versions of Event Espresso.', 'event_espresso' ));
}



function espresso_load_system( $activation = FALSE ) {
	espresso_load_required( 'EE_System', EE_CORE . 'EE_System.core.php' );
	EE_System::instance($activation);
}



function espresso_regular_request() {
	espresso_load_system();
}
add_action( 'plugins_loaded', 'espresso_regular_request', 1 );



function espresso_plugin_activation() {

	// check permissions
	if ( ! current_user_can( 'activate_plugins' )) {
		throw new EE_Error( __( 'You do not have the required permissions to activate this plugin.', 'event_espresso' ));
		return;
	}
	espresso_load_system( TRUE );
	
}
register_activation_hook( EVENT_ESPRESSO_MAIN_FILE, 'espresso_plugin_activation' );



function espresso_plugin_deactivation() {
	espresso_load_required( 'EEH_Activation', EE_HELPERS . 'EEH_Activation.helper.php' );
	EEH_Activation::plugin_deactivation();
}
register_deactivation_hook( EVENT_ESPRESSO_MAIN_FILE, 'espresso_plugin_deactivation' );



function espresso_plugin_uninstall() {
	espresso_load_required( 'EEH_Activation', EE_HELPERS . 'EEH_Activation.helper.php' );
	EEH_Activation::plugin_uninstall();
}
register_uninstall_hook(    EVENT_ESPRESSO_MAIN_FILE, 'espresso_plugin_uninstall' );



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

