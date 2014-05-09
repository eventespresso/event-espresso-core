<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 */
/**
 * Class EE_Register_Addon
 *
 * EEI_Plugin_API class for registering addons for use with EE core.
 * Receives an array of addon details and takes care of adding all of the necessary hooks and filters to setup things such as autoloaders, configuration settings, data migration scripts, admin pages, modules, shortcodes, and even widgets
 *
 * @package        	Event Espresso
 * @subpackage  	plugin api, addons
 * @since 				4.3.0
 * @author 				Brent Christensen
 */
class EE_Register_Addon implements EEI_Plugin_API {

	/**
	 * Holds values for registered addons
	 * @var array
	 */
	protected static $_settings = array();



	/**
	 *    Method for registering new EE_Addons
	 *
	 * @since    4.3.0
	 * @throws EE_Error
	 * @param string $addon_name 		the EE_Addon's name. Required.
	 * @param  array $setup_args { 			An array of arguments provided for registering the message type.
	 * @internal param string admin_path            full server path to the folder where the addon\'s admin files reside
	 * @internal param string autoloader_paths    an array of class names and the full server paths to those files. Required.
	 * @internal param string dms_paths                an array of full server paths to folders that contain data migration scripts. Required.
	 * @internal param string module_paths        an array of full server paths to any EED_Modules used by the addon
	 * @internal param string shortcode_paths    an array of full server paths to folders that contain EES_Shortcodes
	 * @internal param string widgets                    an array of full server paths to folders that contain WP_Widgets
	 * 	}
	 * @return void
	 */
	public static function register( $addon_name = '', $setup_args = array()  ) {

		// check that addon has not already been registered with that name
		if ( isset( self::$_settings[ $addon_name ] )) {
			throw new EE_Error( sprintf( __( 'An EE_Addon with the name "%s" has already been registered and each EE_Addon requires a unique name.', 'event_espresso' ), $addon_name ));
		}

		// required fields MUST be present, so let's make sure they are.
		if ( empty( $addon_name ) || ! is_array( $setup_args )) {
			throw new EE_Error( __( 'In order to register an EE_Addon with EE_Register_Addon::register(), you must include the "addon_name" (the name of the addon), and an array of arguments.', 'event_espresso' ));
		}

		// make sure this was called in the right place!
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_System___detect_if_activation_or_upgrade__begin' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__( 'An attempt to register an EE_Addon named "%s" has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_espresso_addons" hook to register addons.','event_espresso'),
					$addon_name
				),
				'4.3.0'
			);
		}
		// no class name for addon?
		if ( empty( $setup_args['class_name'] )) {
			// generate one by first separating name with spaces
			$class_name = str_replace( array( '-', '_' ), ' ', trim( $addon_name ));
			//capitalize, then replace spaces with underscores
			$class_name = str_replace( ' ', '_', ucwords( $class_name ));
		} else {
			$class_name = $setup_args['class_name'];
		}
		$class_name = strpos( $class_name, 'EE_' ) === 0 ? $class_name : 'EE_' . $class_name;
		//setup $_settings array from incoming values.
		self::$_settings[ $addon_name ] = array(
			// generated from the addon name, changes something like "calendar" to "EE_Calendar"
			'class_name' 			=> $class_name,
			// the "software" version for the addon
			'version' 					=> isset( $setup_args['version'] ) ? (string)$setup_args['version'] : '',
			// the minimum version of EE Core that the addon will work with
			'min_core_version' => isset( $setup_args['min_core_version'] ) ? (string)$setup_args['min_core_version'] : '',
			// full server path to plugin root folder
			'base_path' 				=> isset( $setup_args['base_path'] ) ? (string)$setup_args['base_path'] : '',
			// path to folder containing files for integrating with the EE core admin and/or setting up EE admin pages
			'admin_path' 			=> isset( $setup_args['admin_path'] ) ? (string)$setup_args['admin_path'] : '',
			// a method to be called when the EE Admin is first invoked, can be used for hooking into any admin page
			'admin_callback' 	=> isset( $setup_args['admin_callback'] ) ? (string)$setup_args['admin_callback'] : '',
			// the class name for this addon's configuration settings object
			'config_class' 			=> isset( $setup_args['config_class'] ) ? (string)$setup_args['config_class'] : '',
			//the name given to the config for this addons' configuration settings object (optional)
			'config_name' => isset( $setup_args['config_name'] ) ? (string) $setup_args['config_name']: '',
			// an array of "class names" => "full server paths" for any classes that might be invoked by the addon
			'autoloader_paths' => isset( $setup_args['autoloader_paths'] ) ? (array)$setup_args['autoloader_paths'] : array(),
			// array of full server paths to any EE_DMS data migration scripts used by the addon
			'dms_paths' 			=> isset( $setup_args['dms_paths'] ) ? (array)$setup_args['dms_paths'] : array(),
			// array of full server paths to any EED_Modules used by the addon
			'module_paths' 		=> isset( $setup_args['module_paths'] ) ? (array)$setup_args['module_paths'] : array(),
			// array of full server paths to any EES_Shortcodes used by the addon
			'shortcode_paths' 	=> isset( $setup_args['shortcode_paths'] ) ? (array)$setup_args['shortcode_paths'] : array(),
			// array of full server paths to any WP_Widgets used by the addon
			'widget_paths' 		=> isset( $setup_args['widget_paths'] ) ? (array)$setup_args['widget_paths'] : array(),
		);
		if ( ! empty( self::$_settings[ $addon_name ]['autoloader_paths'] )) {
			// we need cars
			EEH_Autoloader::instance()->register_autoloader( self::$_settings[ $addon_name ]['autoloader_paths'] );
		}
		if ( ! empty( self::$_settings[ $addon_name ]['dms_paths'] )) {
			// setup DMS
			EE_Register_Data_Migration_Scripts::register( $addon_name, array( 'dms_paths' => self::$_settings[ $addon_name ]['dms_paths'] ));
		}
		if ( ! empty( self::$_settings[ $addon_name ]['admin_path'] )) {
			// register admin page
			EE_Register_Admin_Page::register( $addon_name, self::$_settings[ $addon_name ]['admin_path'] );
	}
		if ( ! empty( self::$_settings[ $addon_name ]['module_paths'] )) {
			// add to list of modules to be registered
			EE_Register_Module::register( $addon_name, array( 'module_paths' => self::$_settings[ $addon_name ]['module_paths'] ));
		}
		if ( ! empty( self::$_settings[ $addon_name ]['shortcode_paths'] )) {
			// add to list of shortcodes to be registered
			EE_Register_Shortcode::register( $addon_name, array( 'shortcode_paths' => self::$_settings[ $addon_name ]['shortcode_paths'] ));
		}
		if ( ! empty( self::$_settings[$setup_args['addon_name']]['config_class'] )) {
			// if config_class present let's register config.
			EE_Register_Config::register( self::$_settings[$setup_args['addon_name']]['config_class'], array( 'config_name' => self::$_settings[$setup_args['addon_name']]['config_name'] ));
		}
		if ( ! empty( self::$_settings[ $addon_name ]['widget_paths'] )) {
			// add to list of widgets to be registered
			EE_Register_Widget::register( $addon_name, array( 'widget_paths' => self::$_settings[ $addon_name ]['widget_paths'] ));
		}
		// load and instantiate main addon class
		add_action( 'AHEE__EE_System__core_loaded_and_ready', array( 'EE_Register_Addon', 'instantiate_addon' ));

	}




	/**
	 * instantiate_addon
	 *
	 * @return void
	 */
	public static function instantiate_addon() {
		foreach( self::$_settings as $settings ) {
			// load and instantiate main addon class
			$addon = EE_Registry::instance()->load_addon( $settings['base_path'], $settings['class_name'] );
			$addon->set_version( $settings['version'] );
			$addon->set_min_core_version( $settings['min_core_version'] );
			// load_admin_controller
			if ( ! empty( $settings['admin_callback'] )) {
				add_action( 'AHEE__EE_System__load_controllers__load_admin_controllers', array( $addon, $settings['admin_callback'] ));
			}
		}
	}




	/**
	 * This deregisters an addon that was previously registered with a specific addon_name.
	 *
	 * @since    4.3.0
	 *
	 * @param string  $addon_name the name for the addon that was previously registered
	 * @return void
	 */
	public static function deregister( $addon_name = NULL ) {
		if ( isset( self::$_settings[ $addon_name ] )) {
			unset( self::$_settings[ $addon_name ] );
		}
	}

}
// End of file EE_Register_Addon.lib.php
// Location: /core/libraries/plugin_api/EE_Register_Addon.lib.php
