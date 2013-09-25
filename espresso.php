<?php if ( ! defined('ABSPATH')) exit('No direct script access allowed');
/*
  Plugin Name: 	Event Espresso
  Plugin URI: 		http://eventespresso.com/
  Description: 		Out-of-the-box Events Registration integrated with PayPal IPN for your WordPress blog/website. <a href="admin.php?page=espresso_support" >Support</a>

  Reporting features provide a list of events, list of attendees, and excel export.

  Version: 			4.1.dev

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
	return '4.1.008';
}
//Returns the template version
function espresso_template_version() {
	return '1.0';
}

// define versions
if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) {
	define("EVENT_ESPRESSO_VERSION", espresso_version());
	define('EVENT_ESPRESSO_POWERED_BY', 'Event Espresso - ' . EVENT_ESPRESSO_VERSION);	
} else {
	wp_die('Can not run multiple versions of Event Espresso.');
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
define( 'EE_IMAGES_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'images' . DS );
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

//Get language files
load_plugin_textdomain( 'event_espresso', FALSE, EVENT_ESPRESSO_PLUGINFULLPATH . '/languages/' );

// load Error handling and debugging tools
if ( WP_DEBUG === TRUE ) {
	require_once( EE_HELPERS . 'EE_Debug_Tools.helper.php' );
}

if ( is_readable( EE_CORE . 'EE_Error.core.php' )) {
	require_once( EE_CORE . 'EE_Error.core.php' );		
} else {
	wp_die( __( 'The EE_Error core class could not be loaded.', 'event_espresso' ));
}

// let's get it started		
if ( is_admin() ) {
	espresso_load_required( 'EE_Admin', EE_CORE . 'EE_Admin.core.php' );
	EE_Admin::instance( EVENT_ESPRESSO_MAIN_FILE );
} else {
	espresso_load_required( 'EE_Front_Controller', EE_CORE . 'EE_Front_Controller.core.php' );
	new EE_Front_Controller( EVENT_ESPRESSO_MAIN_FILE );
}



function espresso_plugin_activation() {
	espresso_load_required( 'EEH_Activation', EE_HELPERS . 'EEH_Activation.helper.php' );
	EEH_Activation::plugin_activation();
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



function espresso_load_required( $classname, $full_path_to_file ) {
	if ( is_readable( $full_path_to_file )) {
		require_once( $full_path_to_file );		
	} else {
		throw new EE_Error ( sprintf ( 
			__( 'The %s class file could not be located or is not readable due to file permissions.', 'event_espresso' ),
			$classname
		));
	}
}

