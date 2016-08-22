<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }

// define the plugin directory path and URL
define( 'EE_NEW_ADDON_BASENAME', plugin_basename( EE_NEW_ADDON_PLUGIN_FILE ) );
define( 'EE_NEW_ADDON_PATH', plugin_dir_path( __FILE__ ) );
define( 'EE_NEW_ADDON_URL', plugin_dir_url( __FILE__ ) );
define( 'EE_NEW_ADDON_ADMIN', EE_NEW_ADDON_PATH . 'admin' . DS . 'new_addon' . DS );



/**
 *
 * Class  EE_New_Addon
 *
 * @package			Event Espresso
 * @subpackage		eea-new-addon
 * @author			    Brent Christensen
 *
 */
Class  EE_New_Addon extends EE_Addon {

	/**
	 * this is not the place to perform any logic or add any other filter or action callbacks
	 * this is just to bootstrap your addon; and keep in mind the addon might be DE-registered
	 * in which case your callbacks should probably not be executed.
	 * EED_New_Addon is the place for most filter and action callbacks (relating
	 * the the primary business logic of your addon) to be placed
	 */
	public static function register_addon() {
		// register addon via Plugin API
		EE_Register_Addon::register(
			'New_Addon',
			array(
				'version' 					=> EE_NEW_ADDON_VERSION,
				'plugin_slug' 			=> 'espresso_new_addon',
				'min_core_version' => EE_NEW_ADDON_CORE_VERSION_REQUIRED,
				'main_file_path' 		=> EE_NEW_ADDON_PLUGIN_FILE,
				'admin_path' 			=> EE_NEW_ADDON_ADMIN,
				'admin_callback'		=> '',
				'config_class' 			=> 'EE_New_Addon_Config',
				'config_name' 		=> 'EE_New_Addon',
				'autoloader_paths' => array(
					'EE_New_Addon' 						=> EE_NEW_ADDON_PATH . 'EE_New_Addon.class.php',
					'EE_New_Addon_Config' 			=> EE_NEW_ADDON_PATH . 'EE_New_Addon_Config.php',
					'New_Addon_Admin_Page' 		=> EE_NEW_ADDON_ADMIN . 'New_Addon_Admin_Page.core.php',
					'New_Addon_Admin_Page_Init' => EE_NEW_ADDON_ADMIN . 'New_Addon_Admin_Page_Init.core.php',
				),
				'dms_paths' 			=> array( EE_NEW_ADDON_PATH . 'core' . DS . 'data_migration_scripts' . DS ),
				'module_paths' 		=> array( EE_NEW_ADDON_PATH . 'EED_New_Addon.module.php' ),
				'shortcode_paths' 	=> array( EE_NEW_ADDON_PATH . 'EES_New_Addon.shortcode.php' ),
				'widget_paths' 		=> array( EE_NEW_ADDON_PATH . 'EEW_New_Addon.widget.php' ),
				// if plugin update engine is being used for auto-updates. not needed if PUE is not being used.
				'pue_options'			=> array(
					'pue_plugin_slug' 		=> 'eea-new-addon',
					'plugin_basename' 	=> EE_NEW_ADDON_BASENAME,
					'checkPeriod' 				=> '24',
					'use_wp_update' 		=> FALSE,
				),
				'capabilities' => array(
					'administrator' => array(
						'edit_thing', 'edit_things', 'edit_others_things', 'edit_private_things'
					),
				),
				'capability_maps' => array(
					'EE_Meta_Capability_Map_Edit' => array(
						'edit_thing',
						array( 'New_Addon_Thing', 'edit_things', 'edit_others_things', 'edit_private_things' )
					)
				),
				'class_paths' 						=> EE_NEW_ADDON_PATH . 'core' . DS . 'db_classes',
				'model_paths' 					=> EE_NEW_ADDON_PATH . 'core' . DS . 'db_models',
				'class_extension_paths' 		=> EE_NEW_ADDON_PATH . 'core' . DS . 'db_class_extensions',
				'model_extension_paths' 	=> EE_NEW_ADDON_PATH . 'core' . DS . 'db_model_extensions',
				//note for the mock we're not actually adding any custom cpt stuff yet.
				'custom_post_types' 			=> array(),
				'custom_taxonomies' 		=> array(),
				'default_terms' 					=> array()
			)
		);
	}






}
// End of file EE_New_Addon.class.php
// Location: wp-content/plugins/eea-new-addon/EE_New_Addon.class.php
