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
	 * possibly truncated version of the EE core version string
	 * @var string
	 */
	protected static $_core_version = '';

	/**
	 * Holds values for registered addons
	 * @var array
	 */
	protected static $_settings = array();

	/**
	 * @var  array $_incompatible_addons
	 * @access    protected
	 */
	protected static $_incompatible_addons = array( 'EE_Promotions' );



	/**
	 * We should always be comparing core to a version like '4.3.0.rc.000',
	 * not just '4.3.0'.
	 * So if the addon developer doesn't provide that full version string,
	 * fill in the blanks for them
	 *
	 * @param string $min_core_version
	 * @return string always like '4.3.0.rc.000'
	 */
	protected static function _effective_version( $min_core_version ) {
		// versions: 4 . 3 . 1 . p . 123
		// offsets:    0 . 1 . 2 . 3 . 4
		$version_parts = explode( '.', $min_core_version );
		//check they specified the micro version (after 2nd period)
		if( ! isset( $version_parts[ 2 ] ) ) {
			$version_parts[ 2] = '0';
		}
		//if they didn't specify the 'p', or 'rc' part. Just assume the lowest possible
		//soon we can assume that's 'rc', but this current version is 'alpha'
		if( ! isset( $version_parts[ 3 ] ) ) {
			$version_parts[ 3 ] = 'dev';
		}
		if( ! isset( $version_parts[ 4 ] ) ) {
			$version_parts[ 4 ] = '000';
		}
		return implode( '.', $version_parts );

	}

	/**
	 * Returns whether or not the min core version requirement of the addon is met
	 * @param string $min_core_version the minimum core version required by the addon
	 * @param string $actual_core_version the actual core version, optional
	 * @return boolean
	 */
	public static  function _meets_min_core_version_requirement( $min_core_version, $actual_core_version = EVENT_ESPRESSO_VERSION ) {
		return version_compare( self::_effective_version( $actual_core_version ), self::_effective_version( $min_core_version ), '>=' );
	}


	/**
	 *    Method for registering new EE_Addons.
	 * Should be called AFTER AHEE__EE_System__load_espresso_addons but BEFORE AHEE__EE_System___detect_if_activation_or_upgrade__begin in order to register all its components.
	 * However, it may also be called after the 'activate_plugin' action (when an addon is activated),
	 * because an activating addon won't be loaded by WP until after AHEE__EE_System__load_espresso_addons has fired.
	 * If its called after 'activate_plugin', it registers the addon still, but its components are not registered
	 * (they shouldn't be needed anyways, because it's just an activation request and they won't have a chance to do anything anyways). Instead, it just sets the newly-activated addon's activation indicator wp option and returns
	 * (so that we can detect that the addon has activated on the subsequent request)
	 *
	 * @since    4.3.0
	 * @param string $addon_name 		the EE_Addon's name. Required.
	 * @param  array $setup_args { 			An array of arguments provided for registering the message type.
	 *          @type  string $admin_path 	full server path to the folder where the addon\'s admin files reside
	 * 			@type  string $main_file_path the full server path to the main file loaded directly by WP
	 * 			@type  string $autoloader_paths 	an array of class names and the full server paths to those files. Required.
	 * 			@type  string $dms_paths 				an array of full server paths to folders that contain data migration scripts. Required.
	 * 			@type  string $module_paths 	an array of full server paths to any EED_Modules used by the addon
	 * 			@type  string $shortcode_paths 	an array of full server paths to folders that contain EES_Shortcodes
	 * 			@type  string $widgets 					an array of full server paths to folders that contain WP_Widgets
	 * 			@type  array $capabilities  {
	 * 			      	an array indexed by role name (i.e. administrator,author ) and the values are an array of caps to add to the role.
	 * 			      	'administrator' => array('read_addon', 'edit_addon' etc.).
	 * 	         		}
	 * 	        @type  EE_Meta_Capability_Map[] $capability_maps an array of EE_Meta_Capability_Map object for any addons that need to register any special meta mapped capabilities.  Should be indexed where the key is the EE_Meta_Capability_Map class name and the values are the arguments sent to the class.
	 *			@type array $model_paths array of folders containing DB models @see EE_Register_Model
	 *			@type array $class_paths array of folders containing DB classes @see EE_Register_Model
	 *			@type array $model_extension_paths array of folders containing DB model extensions @see EE_Register_Model_Extension
	 *			@type array $class_extension_paths array of folders containing DB class extensions @see EE_Register_Model_Extension
	 * 			@type array message_types {
	 *       		 An array of message types with the key as the message type name and the values as below:
	 *        		@type string $mtfilename             The filename of the message type being
	 *                                                                          registered.  This will be the main
	 *                                                                          EE_{Messagetype_Name}_message_type class. (
	 *                                                                          eg. EE_Declined_Registration_message_type.
	 *                                                                          class.php). Required.
	 *                     @type array $autoloadpaths          An array of paths to add to the messages
	 *                                                                          autoloader for the new message type. Required.
	 *                     @type array $messengers_to_activate_with An array of messengers that this message
	 *                                                                          type should activate with. Each value in the
	 *                                                                          array should match the name property of a
	 *                                                                          EE_messenger. Optional.
	 *                     @type array $messengers_to_validate_with An array of messengers that this message
	 *                           				      type should validate with. Each value in the array
	 *                           				      should match the name property of an EE_messenger.
	 *                           				      Optional.
	 *       	}
	 * 	}
	 * @throws EE_Error
	 * @return void
	 */
	public static function register( $addon_name = '', $setup_args = array()  ) {
		// required fields MUST be present, so let's make sure they are.
		if ( empty( $addon_name ) || ! is_array( $setup_args )) {
			throw new EE_Error( __( 'In order to register an EE_Addon with EE_Register_Addon::register(), you must include the "addon_name" (the name of the addon), and an array of arguments.', 'event_espresso' ));
		}
		if ( ! isset($setup_args[ 'main_file_path' ]) || empty( $setup_args[ 'main_file_path' ] ) ){
			throw new EE_Error( sprintf( __( 'When registering an addon, you didn\'t provide the "main_file_path", which is the full path to the main file loaded directly by Wordpress. You only provided %s', 'event_espresso' ), implode(",", array_keys( $setup_args ) ) ) );
		}
		// check that addon has not already been registered with that name
		if ( isset( self::$_settings[ $addon_name ] ) && ! did_action( 'activate_plugin' ) ) {
			throw new EE_Error( sprintf( __( 'An EE_Addon with the name "%s" has already been registered and each EE_Addon requires a unique name.', 'event_espresso' ), $addon_name ));
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
		$addon_settings = array(
			// generated from the addon name, changes something like "calendar" to "EE_Calendar"
			'class_name' 			=> $class_name,
			// the "software" version for the addon
			'version' 								=> isset( $setup_args['version'] ) ? (string)$setup_args['version'] : '',
			// the minimum version of EE Core that the addon will work with
			'min_core_version' 			=> isset( $setup_args['min_core_version'] ) ? (string)$setup_args['min_core_version'] : '',
			// full server path to main file (file loaded directly by WP)
			'main_file_path' 					=> isset( $setup_args['main_file_path'] ) ? (string)$setup_args['main_file_path'] : '',
			// path to folder containing files for integrating with the EE core admin and/or setting up EE admin pages
			'admin_path' 						=> isset( $setup_args['admin_path'] ) ? (string)$setup_args['admin_path'] : '',
			// a method to be called when the EE Admin is first invoked, can be used for hooking into any admin page
			'admin_callback' 				=> isset( $setup_args['admin_callback'] ) ? (string)$setup_args['admin_callback'] : '',
			// the section name for this addon's configuration settings section (defaults to "addons")
			'config_section' 					=> isset( $setup_args['config_section'] ) ? (string)$setup_args['config_section'] : 'addons',
			// the class name for this addon's configuration settings object
			'config_class' 						=> isset( $setup_args['config_class'] ) ? (string)$setup_args['config_class'] : '',
			//the name given to the config for this addons' configuration settings object (optional)
			'config_name' 					=> isset( $setup_args['config_name'] ) ? (string) $setup_args['config_name']: '',
			// an array of "class names" => "full server paths" for any classes that might be invoked by the addon
			'autoloader_paths' 			=> isset( $setup_args['autoloader_paths'] ) ? (array)$setup_args['autoloader_paths'] : array(),
			// array of full server paths to any EE_DMS data migration scripts used by the addon
			'dms_paths' 						=> isset( $setup_args['dms_paths'] ) ? (array)$setup_args['dms_paths'] : array(),
			// array of full server paths to any EED_Modules used by the addon
			'module_paths' 					=> isset( $setup_args['module_paths'] ) ? (array)$setup_args['module_paths'] : array(),
			// array of full server paths to any EES_Shortcodes used by the addon
			'shortcode_paths'			 	=> isset( $setup_args['shortcode_paths'] ) ? (array)$setup_args['shortcode_paths'] : array(),
			// array of full server paths to any WP_Widgets used by the addon
			'widget_paths' 					=> isset( $setup_args['widget_paths'] ) ? (array)$setup_args['widget_paths'] : array(),
			// array of PUE options used by the addon
			'pue_options' 						=> isset( $setup_args['pue_options'] ) ? (array)$setup_args['pue_options'] : array(),
			'message_types' 				=> isset( $setup_args['message_types'] ) ? (array) $setup_args['message_types'] : array(),
			'capabilities' 						=> isset( $setup_args['capabilities'] ) ? (array) $setup_args['capabilities'] : array(),
			'capability_maps' 				=> isset( $setup_args['capability_maps'] ) ? (array) $setup_args['capability_maps'] : array(),
			'model_paths' 					=> isset( $setup_args['model_paths'] ) ? (array) $setup_args['model_paths'] : array(),
			'class_paths' 						=> isset( $setup_args['class_paths'] ) ? (array) $setup_args['class_paths'] : array(),
			'model_extension_paths' 	=> isset( $setup_args['model_extension_paths'] ) ? (array) $setup_args['model_extension_paths'] : array(),
			'class_extension_paths' 		=> isset( $setup_args['class_extension_paths'] ) ? (array) $setup_args['class_extension_paths'] : array(),
			'custom_post_types' => isset( $setup_args['custom_post_types'] ) ? (array) $setup_args['custom_post_types'] : array(),
			'custom_taxonomies' => isset( $setup_args['custom_taxonomies'] ) ? (array) $setup_args['custom_taxonomies'] : array(),
			'payment_method_paths'		=> isset( $setup_args[ 'payment_method_paths' ] ) ? (array) $setup_args[ 'payment_method_paths' ] : array(),
			'default_terms' => isset( $setup_args['default_terms'] ) ? (array) $setup_args['default_terms'] : array()
		);
		//check whether this addon version is compatible with EE core
		if ( in_array( $class_name, EE_Register_Addon::$_incompatible_addons ) ) {
			$incompatibility_message = sprintf(
				__( 'The Event Espresso "%1$s" addon could not be activated because it is incompatible with your version of Event Espresso Core.%2$sThis can happen when attempting to run beta versions or release candidates with older versions of core.%2$sPlease upgrade Event Espresso Core first and then re-attempt activating "%1$s".', 'event_espresso' ),
				$addon_name,
				'<br />'
			);
		} else if ( ! self::_meets_min_core_version_requirement( $setup_args[ 'min_core_version' ], espresso_version() ) ) {
			$incompatibility_message = sprintf(
				__( 'The Event Espresso "%1$s" addon could not be activated because it requires Event Espresso Core version "%2$s" or higher in order to run.%4$sYour version of Event Espresso Core is currently at "%3$s". Please upgrade Event Espresso Core first and then re-attempt activating "%1$s".', 'event_espresso' ),
				$addon_name,
				self::_effective_version( $setup_args[ 'min_core_version' ] ),
				self::_effective_version( espresso_version() ),
				'<br />'
			);
		} else {
			$incompatibility_message = '';
		}
		if ( ! empty( $incompatibility_message ) ) {
			//remove 'activate' from the REQUEST so WP doesn't erroneously tell the user the
			//plugin activated fine when it didn't
			if( isset( $_GET[ 'activate' ]) ) {
				unset( $_GET[ 'activate' ] );
			}
			if( isset( $_REQUEST[ 'activate' ] ) ){
				unset( $_REQUEST[ 'activate' ] );
			}
			//and show an error message indicating the plugin didn't activate properly
			EE_Error::add_error( $incompatibility_message, __FILE__, __FUNCTION__, __LINE__ );
			if ( current_user_can( 'activate_plugins' )) {
				require_once( ABSPATH.'wp-admin/includes/plugin.php' );
				deactivate_plugins( plugin_basename( $addon_settings[ 'main_file_path' ] ), TRUE );
			}
			return;
		}
		//this is an activation request
		if( did_action( 'activate_plugin' ) ){
			//to find if THIS is the addon that was activated,
			//just check if we have already registered it or not
			//(as the newly-activated addon wasn't around the first time addons were registered)
			if( ! isset( self::$_settings[ $addon_name ] ) ){
				self::$_settings[ $addon_name ] = $addon_settings;
				$addon = self::_load_and_init_addon_class($addon_name);
				$addon->set_activation_indicator_option();
				//dont bother setting up the rest of the addon.
				//we know it was just activated and the request will end soon
			}
			return;
		}else{
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
			self::$_settings[ $addon_name ] = $addon_settings;
		}
		// we need cars
		if ( ! empty( self::$_settings[ $addon_name ]['autoloader_paths'] )) {
			EEH_Autoloader::instance()->register_autoloader( self::$_settings[ $addon_name ]['autoloader_paths'] );
		}
		// register new models
		if ( ! empty( self::$_settings[ $addon_name ]['model_paths'] ) || ! empty( self::$_settings[ $addon_name ]['class_paths'] )) {
			EE_Register_Model::register( $addon_name, array( 'model_paths' => self::$_settings[ $addon_name ]['model_paths'] , 'class_paths' => self::$_settings[ $addon_name ]['class_paths']));
		}
		// register model extensions
		if ( ! empty( self::$_settings[ $addon_name ]['model_extension_paths'] ) || ! empty( self::$_settings[ $addon_name ]['class_extension_paths'] )) {
			EE_Register_Model_Extensions::register( $addon_name, array( 'model_extension_paths' => self::$_settings[ $addon_name ]['model_extension_paths'] , 'class_extension_paths' => self::$_settings[ $addon_name ]['class_extension_paths']));
		}
		// setup DMS
		if ( ! empty( self::$_settings[ $addon_name ]['dms_paths'] )) {
			EE_Register_Data_Migration_Scripts::register( $addon_name, array( 'dms_paths' => self::$_settings[ $addon_name ]['dms_paths'] ));
		}
		// if config_class is present let's register config.
		if ( ! empty( self::$_settings[ $addon_name ]['config_class'] )) {
			EE_Register_Config::register(
				self::$_settings[ $addon_name ]['config_class'],
				array(
					'config_section' => self::$_settings[ $addon_name ]['config_section'],
					'config_name' => self::$_settings[ $addon_name ]['config_name']
				)
			);
		}
		// register admin page
		if ( ! empty( self::$_settings[ $addon_name ]['admin_path'] )) {
			EE_Register_Admin_Page::register( $addon_name, array( 'page_path' => self::$_settings[ $addon_name ]['admin_path'] ));

		}
		// add to list of modules to be registered
		if ( ! empty( self::$_settings[ $addon_name ]['module_paths'] )) {
			EE_Register_Module::register( $addon_name, array( 'module_paths' => self::$_settings[ $addon_name ]['module_paths'] ));
		}
		// add to list of shortcodes to be registered
		if ( ! empty( self::$_settings[ $addon_name ]['shortcode_paths'] )) {
			EE_Register_Shortcode::register( $addon_name, array( 'shortcode_paths' => self::$_settings[ $addon_name ]['shortcode_paths'] ));
		}
		// add to list of widgets to be registered
		if ( ! empty( self::$_settings[ $addon_name ]['widget_paths'] )) {
			EE_Register_Widget::register( $addon_name, array( 'widget_paths' => self::$_settings[ $addon_name ]['widget_paths'] ));
		}

		//register capability related stuff.
		if ( ! empty( self::$_settings[ $addon_name ]['capabilities'] ) ) {
			EE_Register_Capabilities::register( $addon_name , array( 'capabilities' => self::$_settings[$addon_name]['capabilities'], 'capability_maps' => self::$_settings[$addon_name]['capability_maps'] ) );
		}
		//any message type to register?
		if (  !empty( self::$_settings[$addon_name]['message_types'] ) ) {
				add_action( 'EE_Brewing_Regular___messages_caf', array( 'EE_Register_Addon', 'register_message_types' ) );
		}


		// if plugin update engine is being used for auto-updates (not needed if PUE is not being used)
		if ( ! empty( $setup_args['pue_options'] )) {
			self::$_settings[ $addon_name ]['pue_options'] = array(
				'pue_plugin_slug' 	=> isset( $setup_args['pue_options']['pue_plugin_slug'] ) ? (string)$setup_args['pue_options']['pue_plugin_slug'] : 'espresso_' . strtolower( $class_name ),
				'plugin_basename' => isset( $setup_args['pue_options']['plugin_basename'] ) ? (string)$setup_args['pue_options']['plugin_basename'] : plugin_basename( self::$_settings[ $addon_name ]['main_file_path'] ),
				'checkPeriod' 			=> isset( $setup_args['pue_options']['checkPeriod'] ) ? (string)$setup_args['pue_options']['checkPeriod'] : '24',
				'use_wp_update'		=> isset( $setup_args['pue_options']['use_wp_update'] ) ? (string)$setup_args['pue_options']['use_wp_update'] : FALSE
			);
			add_action( 'AHEE__EE_System__brew_espresso__after_pue_init', array( 'EE_Register_Addon', 'load_pue_update' ));
		}

		//any custom post type/ custom capabilities or default terms to register
		if ( !empty( self::$_settings[$addon_name]['custom_post_types'] ) || !empty( self::$_settings[$addon_name]['custom_taxonomies'] ) ) {
			EE_Register_CPT::register( $addon_name, array( 'cpts' => self::$_settings[$addon_name]['custom_post_types'] , 'cts' => self::$_settings[$addon_name]['custom_taxonomies'], 'default_terms' => self::$_settings[$addon_name]['default_terms'] ) );
		}
		if( ! empty( self::$_settings[ $addon_name ][ 'payment_method_paths' ] ) ){
			EE_Register_Payment_Method::register($addon_name, array( 'payment_method_paths' => self::$_settings[ $addon_name ][ 'payment_method_paths' ] ) );
		}
		// load and instantiate main addon class
		$addon = self::_load_and_init_addon_class($addon_name);
		// call any additional admin_callback functions during load_admin_controller hook
		if ( ! empty( self::$_settings[ $addon_name ]['admin_callback'] )) {
			add_action( 'AHEE__EE_System__load_controllers__load_admin_controllers', array( $addon, self::$_settings[ $addon_name ]['admin_callback'] ));
		}
	}
	/**
	 * Loads and instantiates the EE_Addon class and adds it onto the registry
	 * @param string $addon_name
	 * @return EE_Addon
	 */
	private static function _load_and_init_addon_class($addon_name){
		$addon = EE_Registry::instance()->load_addon( dirname( self::$_settings[ $addon_name ]['main_file_path'] ), self::$_settings[ $addon_name ]['class_name'] );
		$addon->set_name( $addon_name );
		$addon->set_main_plugin_file( self::$_settings[ $addon_name ]['main_file_path'] );
		$addon->set_version( self::$_settings[ $addon_name ]['version'] );
		$addon->set_min_core_version( self::_effective_version( self::$_settings[ $addon_name ]['min_core_version'] ) );
		$addon->set_config_section( self::$_settings[ $addon_name ]['config_section'] );
		$addon->set_config_class( self::$_settings[ $addon_name ]['config_class'] );
		$addon->set_config_name( self::$_settings[ $addon_name ]['config_name'] );
		//unfortunately this can't be hooked in upon construction, because we don't have
		//the plugin mainfile's path upon construction.
		register_deactivation_hook($addon->get_main_plugin_file(), array($addon,'deactivation'));
		return $addon;
	}



	/**
	 * 	load_pue_update - Update notifications
	 *
	 *  @return 	void
	 */
	public static function load_pue_update() {
		// load PUE client
		require_once  EE_THIRD_PARTY . 'pue' . DS . 'pue-client.php';
		// cycle thru settings
		foreach ( self::$_settings as $settings ) {
			if ( ! empty( $settings['pue_options'] )) {
				// initiate the class and start the plugin update engine!
				new PluginUpdateEngineChecker(
				// host file URL
					'http://eventespresso.com',
					// plugin slug(s)
					array(
						'premium' => array( 'p' => $settings['pue_options']['pue_plugin_slug'] ),
						'prerelease' => array( 'beta' => $settings['pue_options']['pue_plugin_slug'] . '-pr' )
					),
					// options
					array(
						'apikey' => EE_Registry::instance()->NET_CFG->core->site_license_key,
						'lang_domain' => 'event_espresso',
						'checkPeriod' => $settings['pue_options']['checkPeriod'],
						'option_key' => 'site_license_key',
						'options_page_slug' => 'event_espresso',
						'plugin_basename' => $settings['pue_options']['plugin_basename'],
						// if use_wp_update is TRUE it means you want FREE versions of the plugin to be updated from WP
						'use_wp_update' => $settings['pue_options']['use_wp_update'],
					)
				);
			}
		}
	}



	/**
	 * Callback for EE_Brewing_Regular__messages_caf hook used to register message types.
	 *
	 * @since 4.4.0
	 *
	 * @return void
	 */
	public static function register_message_types() {
		foreach ( self::$_settings as $settings ) {
			foreach( $settings['message_types'] as $message_type => $message_type_settings ) {
				EE_Register_Message_Type::register( $message_type, $message_type_settings );
			}
		}
	}



	/**
	 * This deregisters an addon that was previously registered with a specific addon_name.
	 *
	 * @since    4.3.0
	 *
	 * @param string $addon_name the name for the addon that was previously registered
	 * @throws EE_Error
	 * @return void
	 */
	public static function deregister( $addon_name = NULL ) {
		if ( isset( self::$_settings[ $addon_name ] )) {
			$class_name = self::$_settings[ $addon_name ]['class_name'];
			if ( ! empty( self::$_settings[ $addon_name ]['dms_paths'] )) {
				// setup DMS
				EE_Register_Data_Migration_Scripts::deregister( $addon_name );
			}
			if ( ! empty( self::$_settings[ $addon_name ]['admin_path'] )) {
				// register admin page
				EE_Register_Admin_Page::deregister( $addon_name );
			}
			if ( ! empty( self::$_settings[ $addon_name ]['module_paths'] )) {
				// add to list of modules to be registered
				EE_Register_Module::deregister( $addon_name );
			}
			if ( ! empty( self::$_settings[ $addon_name ]['shortcode_paths'] )) {
				// add to list of shortcodes to be registered
				EE_Register_Shortcode::deregister( $addon_name );
			}
			if ( ! empty( self::$_settings[ $addon_name ]['config_class'] )) {
				// if config_class present let's register config.
				EE_Register_Config::deregister( self::$_settings[ $addon_name ]['config_class']);
			}
			if ( ! empty( self::$_settings[ $addon_name ]['widget_paths'] )) {
				// add to list of widgets to be registered
				EE_Register_Widget::deregister( $addon_name );
			}
			if ( ! empty( self::$_settings[ $addon_name ]['model_paths'] ) ||
					! empty( self::$_settings[ $addon_name ]['class_paths'] )) {
				// add to list of shortcodes to be registered
				EE_Register_Model::deregister( $addon_name );
			}
			if ( ! empty( self::$_settings[ $addon_name ]['model_extension_paths'] ) ||
					! empty( self::$_settings[ $addon_name ]['class_extension_paths'] )) {
				// add to list of shortcodes to be registered
				EE_Register_Model_Extensions::deregister( $addon_name );
				}
			if (  !empty( self::$_settings[$addon_name]['message_types'] ) ) {
				foreach( self::$_settings[$addon_name]['message_types'] as $message_type => $message_type_settings ) {
					EE_Register_Message_Type::deregister( $message_type );
				}
			}
			//deregister capabilities for addon
			if ( ! empty( self::$_settings[$addon_name]['capabilities'] ) || ! empty( self::$_settings[$addon_name]['capability_maps']) ) {
				EE_Register_Capabilities::deregister( $addon_name );
			}
			//deregister custom_post_types for addon
			if ( ! empty( self::$_settings[$addon_name]['custom_post_types'] ) ) {
				EE_Register_CPT::deregister( $addon_name );
			}
			remove_action('deactivate_'.EE_Registry::instance()->addons->$class_name->get_main_plugin_file_basename(),  array( EE_Registry::instance()->addons->$class_name, 'deactivation' ) );
			remove_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( EE_Registry::instance()->addons->$class_name, 'initialize_db_if_no_migrations_required' ) );
			unset(EE_Registry::instance()->addons->$class_name);
			unset( self::$_settings[ $addon_name ] );
		}
	}





}
// End of file EE_Register_Addon.lib.php
// Location: /core/libraries/plugin_api/EE_Register_Addon.lib.php
