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
 * Class EE_Register_Module
 *
 * EEI_Plugin_API class for registering modules for use with EE core.
 * Receives an array of module details and takes care of adding all of the necessary hooks and filters to integrate with EE core
 *
 * @package        	Event Espresso
 * @subpackage  	plugin api
 * @since 				4.3.0
 * @author 				Brent Christensen
 */
class EE_Register_Module implements EEI_Plugin_API {

	/**
	 * Holds values for registered modules
	 * @var array
	 */
	protected static $_settings = array();



	/**
	 *    Method for registering new EED_Modules
	 *
	 * @since    4.3.0
	 * @param string $module_id		a unique identifier for this set of modules Required.
	 * @param  array $setup_args 		an array of full server paths to folders containing any EED_Modules, or to the EED_Module files themselves Required.
	 * @type 	array module_paths 	an array of full server paths to folders containing any EED_Modules, or to the EED_Module files themselves
	 * @throws EE_Error
	 * @return void
	 */
	public static function register( $module_id = NULL, $setup_args = array()  ) {

		//required fields MUST be present, so let's make sure they are.
		if ( empty( $module_id ) || ! is_array( $setup_args ) || empty( $setup_args['module_paths'] )) {
			throw new EE_Error( __( 'In order to register Modules with EE_Register_Module::register(), you must include a "module_id" (a unique identifier for this set of modules), and an array containing the following keys: "module_paths" (an array of full server paths to folders that contain modules, or to the module files themselves)', 'event_espresso' ));
		}

		//make sure we don't register twice
		if( isset( self::$_settings[ $module_id ] ) ){
			return;
		}

		//make sure this was called in the right place!
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_System__register_shortcodes_modules_and_widgets' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				__( 'An attempt to register modules has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register modules.','event_espresso'),
				'4.3.0'
			);
		}
		//setup $_settings array from incoming values.
		self::$_settings[ $module_id ] = array(
			// array of full server paths to any EED_Modules used by the module
			'module_paths'  => isset( $setup_args['module_paths'] ) ? (array)$setup_args['module_paths'] : array(),
		);
		// add to list of modules to be registered
		add_filter( 'FHEE__EE_Config__register_modules__modules_to_register', array( 'EE_Register_Module', 'add_modules' ));
	}




	/**
	 * Filters the list of modules to add ours.
	 * and they're just full filepaths to FOLDERS containing a module class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wonder-site/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
	 * @param array $modules_to_register  array of paths to all modules that require registering
	 * @return array
	 */
	public static function add_modules( $modules_to_register ){
		foreach( self::$_settings as $settings ) {
			$modules_to_register = array_merge( $modules_to_register, $settings['module_paths'] );
		}
		return $modules_to_register;
	}




	/**
	 * This deregisters a module that was previously registered with a specific $module_id.
	 *
	 * @since    4.3.0
	 *
	 * @param string  $module_id the name for the module that was previously registered
	 * @return void
	 */
	public static function deregister( $module_id = NULL ) {
		if ( isset( self::$_settings[ $module_id ] )) {
			unset( self::$_settings[ $module_id ] );
		}
	}

}
// End of file EE_Register_Module.lib.php
// Location: /core/libraries/plugin_api/EE_Register_Module.lib.php