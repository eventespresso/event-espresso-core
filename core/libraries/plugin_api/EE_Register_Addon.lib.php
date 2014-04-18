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
	 * name of the addon
	 * @var string
	 */
	protected static $_addon_name = array();

	/**
	 * Holds values for registered addons
	 * @var array
	 */
	protected static $_addon_settings = array();



	/**
	 *    Method for registering new EE_Addons
	 *
	 * @since    4.3.0
	 * @param  array $setup_args  						An array of arguments provided for registering the message type.
	 * @internal param string addon_name 			the EE_Addon's name. Required.
	 * @internal param string admin_path 			full server path to the folder where the addon\'s admin files reside
	 * @internal param string autoloader_paths 	an array of class names and the full server paths to those files
	 * @internal param string dms_paths 				an array of full server paths to folders that contain data migration scripts
	 * @internal param string shortcodes 			an array of full server paths to folders that contain EES_Shortcodes
	 * @internal param string widgets 					an array of full server paths to folders that contain WP_Widgets
	 * @throws EE_Error
	 * @return void
	 */
	public static function register( $setup_args = array()  ) {

		//required fields MUST be present, so let's make sure they are.
		if ( ! is_array( $setup_args ) || empty( $setup_args['addon_name'] ) || empty( $setup_args['autoloader_paths'] ) || empty( $setup_args['dms_paths'] )) {
			throw new EE_Error( __( 'In order to register an EE_Addon with EE_Register_Addon::register(), you must include an array containing the following keys: "addon_name" (the name of the addon), "autoloader_paths" (an array of class names and the full server paths to those files), and "dms_paths" (an array of full server paths to folders that contain data migration scripts)', 'event_espresso' ));
		}


		//make sure this was called in the right place!
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_System__register_shortcodes_modules_and_widgets' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__( 'An attempt to register an EE_Addon named "%s" has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register addons.','event_espresso'),
					$setup_args['addon_name']
				),
				'4.3.0'
			);
		}
		self::$_addon_name = (string)$setup_args['addon_name'];
		// no class name for addon?
		if ( empty( $setup_args['class_name'] )) {
			// generate one by first separating name with spaces
			$class_name = str_replace( array( '-', '_' ), ' ', trim( self::$_addon_name ));
			//capitalize, then replace spaces with underscores
			$class_name = str_replace( ' ', '_', ucwords( $class_name ));
		} else {
			$class_name = $setup_args['class_name'];
		}
		$class_name = strpos( $class_name, 'EE_' ) === 0 ? $class_name : 'EE_' . $class_name;
		//setup $_addon_settings array from incoming values.
		self::$_addon_settings[ self::$_addon_name ] = array(
			// generated from the addon name, changes something like "calendar" to "EE_Calendar"
			'class_name' 			=> $class_name,
			// the PHP version for the addon
			'version' 					=> isset( $setup_args['version'] ) ? (string)$setup_args['version'] : '',
			// the minimum version of EE Core that the addon will work with
			'min_core_version' => isset( $setup_args['min_core_version'] ) ? (string)$setup_args['min_core_version'] : '',
			// full server path to plugin root folder
			'plugin_dir_path' 	=> isset( $setup_args['plugin_dir_path'] ) ? (string)$setup_args['plugin_dir_path'] : '',
			// path to folder containing files for integrating with the EE core admin and/or setting up EE admin pages
			'admin_path' 			=> isset( $setup_args['admin_path'] ) ? (string)$setup_args['admin_path'] : '',
			// a method to be called when the EE Admin is first invoked, can be used for hooking into any admin page
			'admin_callback' 	=> isset( $setup_args['admin_callback'] ) ? (string)$setup_args['admin_callback'] : '',
			// the class name for this addon's configuration settings object
			'config_class' 			=> isset( $setup_args['config_class'] ) ? (string)$setup_args['config_class'] : '',
			// an array of "class names" => "full server paths" for any classes that might be invoked by the addon
			'autoloader_paths' => isset( $setup_args['autoloader_paths'] ) ? (array)$setup_args['autoloader_paths'] : array(),
			// array of full server paths to any data migration scripts used by the addon
			'dms_paths' 			=> isset( $setup_args['dms_paths'] ) ? (array)$setup_args['dms_paths'] : array(),
			// array of full server paths to any modules used by the addon
			'module_paths' 		=> isset( $setup_args['modules'] ) ? (array)$setup_args['modules'] : array(),
			// array of full server paths to any shortcodes used by the addon
			'shortcode_paths' 	=> isset( $setup_args['shortcodes'] ) ? (array)$setup_args['shortcodes'] : array(),
			// array of full server paths to any widgets used by the addon
			'widget_paths' 		=> isset( $setup_args['widgets'] ) ? (array)$setup_args['widgets'] : array(),
		);
		// we need cars
		EEH_Autoloader::instance()->register_autoloader( self::$_addon_settings[ self::$_addon_name ]['autoloader_paths'] );
		// setup DMS
		add_filter( 'FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders', array( 'EE_Register_Addon', 'add_data_migration_script_folders' ));
		// register admin page
		add_action( 'AHEE__EE_Admin__loaded', array( 'EE_Register_Addon', 'register_admin_page' ));
		// load and instantiate main addon class
		add_action( 'AHEE__EE_System__core_loaded_and_ready', array( 'EE_Register_Addon', 'instantiate_addon' ));
		// add to list of modules to be registered
		add_filter( 'FHEE__EE_Config__register_modules__modules_to_register', array( 'EE_Register_Addon', 'add_modules' ));
		// add to list of shortcodes to be registered
		add_filter( 'FHEE__EE_Config__register_shortcodes__shortcodes_to_register', array( 'EE_Register_Addon', 'add_shortcodes' ));
		// add to list of widgets to be registered
		add_filter( 'FHEE__EE_Config__register_widgets__widgets_to_register', array( 'EE_Register_Addon', 'add_widgets' ));

	}



	/**
	 *    add_data_migration_script_folders
	 * @param array $dms_paths
	 * @return array
	 */
	public static function add_data_migration_script_folders( $dms_paths = array() ){
		return array_merge( $dms_paths, self::$_addon_settings[ self::$_addon_name ]['dms_paths'] );
	}




	/**
	 * register_admin_page
	 *
	 * @return void
	 */
	public static function register_admin_page() {
		// setup admin
		EE_Register_Admin_Page::register( self::$_addon_name, self::$_addon_settings[ self::$_addon_name ]['admin_path'] );
	}



	/**
	 * instantiate_addon
	 *
	 * @return void
	 */
	public static function instantiate_addon() {
		// load and instantiate main addon class
		$addon = EE_Registry::instance()->load_addon( self::$_addon_settings[ self::$_addon_name ]['plugin_dir_path'], self::$_addon_settings[ self::$_addon_name ]['class_name'] );
		$addon->set_version( self::$_addon_settings[ self::$_addon_name ]['version'] );
		$addon->set_min_core_version( self::$_addon_settings[ self::$_addon_name ]['min_core_version'] );
		// load_admin_controller
		if ( ! empty( self::$_addon_settings[ self::$_addon_name ]['min_core_version'] )) {
			add_action( 'AHEE__EE_System__load_controllers__load_admin_controllers', array( $addon, self::$_addon_settings[ self::$_addon_name ]['admin_callback'] ));
		}
	}



	/**
	 * Filters the list of modules to add ours.
	 * and they're just full filepaths to FOLDERS containing a module class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wondersite/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
	 * @param array $modules_to_register  array of paths to all modules that require registering
	 * @return array
	 */
	public static function add_modules( $modules_to_register ){
		return array_merge( $modules_to_register, self::$_addon_settings[ self::$_addon_name ]['module_paths'] );
	}



	/**
	 * Filters the list of shortcodes to add ours.
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wondersite/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
	 * @param array $shortcodes_to_register  array of paths to all shortcodes that require registering
	 * @return array
	 */
	public static function add_shortcodes( $shortcodes_to_register ){
		return array_merge( $shortcodes_to_register, self::$_addon_settings[ self::$_addon_name ]['shortcode_paths'] );
	}



	/**
	 * Filters the list of widgets to add ours.
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wondersite/wp-content/plugins/ee4/widgets/espresso_monkey',...)
	 * @param array $widgets_to_register  array of paths to all widgets that require registering
	 * @return array
	 */
	public static function add_widgets( $widgets_to_register = array() ) {
		return array_merge( $widgets_to_register, self::$_addon_settings[ self::$_addon_name ]['widget_paths'] );
	}



	/**
	 * This deregisters an addon that was previously registered with a specific addon_name.
	 *
	 * @since    4.3.0
	 *
	 * @param string  $addon_name the name for the addon that was previously registered
	 * @return void
	 */
	public static function deregister( $addon_name ) {
		if ( isset( self::$_addon_settings[ $addon_name] )) {
			unset( self::$_addon_settings[ $addon_name ] );
		}
	}

}
// End of file EE_Register_Addon.lib.php
// Location: /EE_Register_Addon.lib.php