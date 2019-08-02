<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit();
}
// define the plugin directory path and URL
define( 'EE_NEW_ADDON_BASENAME', plugin_basename( EE_NEW_ADDON_PLUGIN_FILE ) );
define( 'EE_NEW_ADDON_PATH', plugin_dir_path( __FILE__ ) );
define( 'EE_NEW_ADDON_URL', plugin_dir_url( __FILE__ ) );
define( 'EE_NEW_ADDON_ADMIN', EE_NEW_ADDON_PATH . 'admin/new_addon/');

/**
 * Class  EE_New_Addon
 *
 * @package     Event Espresso
 * @subpackage  eea-new-addon
 * @author      Brent Christensen
 */
Class  EE_New_Addon extends EE_Addon {

    /**
     * EE_New_Addon constructor.
     * !!! IMPORTANT !!!
     * you should NOT run any logic in the constructor for addons
     * because addon construction should NOT result in code execution.
     * Successfully registering the addon via the EE_Register_Addon API
     * should be the ONLY way that code should execute.
     * This prevents errors happening due to incompatibilities between addons and core.
     * If you run code here, but core deems it necessary to NOT activate this addon,
     * then fatal errors could happen if this code attempts to reference
     * other classes that do not exist because they have not been loaded.
     * That said, it's still a better idea to any extra code
     * in the after_registration() method below.
     */
    // public function __construct()
    // {
    //     // if for some reason you absolutely, positively NEEEED a constructor...
    //     // then at least make sure to call the parent class constructor,
    //     // or things may not operate as expected.
    //     parent::__construct();
    // }



    /**
     * !!! IMPORTANT !!!
	 * this is not the place to perform any logic or add any other filter or action callbacks
	 * this is just to bootstrap your addon; and keep in mind the addon might be DE-registered
	 * in which case your callbacks should probably not be executed.
     * EED_New_Addon is typically the best place for most filter and action callbacks
     * to be placed (relating to the primary business logic of your addon)
     * IF however for some reason, a module does not work because you have some logic
     * that needs to run earlier than when the modules load,
     * then please see the after_registration() method below.
     *
     * @throws \EE_Error
	 */
	public static function register_addon() {
		// register addon via Plugin API
		EE_Register_Addon::register(
			'New_Addon',
			array(
				'version'               => EE_NEW_ADDON_VERSION,
				'plugin_slug'           => 'espresso_new_addon',
				'min_core_version'      => EE_NEW_ADDON_CORE_VERSION_REQUIRED,
				'main_file_path'        => EE_NEW_ADDON_PLUGIN_FILE,
				'namespace'             => array(
					'FQNS' => 'EventEspresso\NewAddon',
					'DIR'  => __DIR__,
				),
				'admin_path'            => EE_NEW_ADDON_ADMIN,
				'admin_callback'        => '',
				'config_class'          => 'EE_New_Addon_Config',
				'config_name'           => 'EE_New_Addon',
				'autoloader_paths'      => array(
					'EE_New_Addon_Config'       => EE_NEW_ADDON_PATH . 'EE_New_Addon_Config.php',
					'New_Addon_Admin_Page'      => EE_NEW_ADDON_ADMIN . 'New_Addon_Admin_Page.core.php',
					'New_Addon_Admin_Page_Init' => EE_NEW_ADDON_ADMIN . 'New_Addon_Admin_Page_Init.core.php',
				),
				'dms_paths'             => array( EE_NEW_ADDON_PATH . 'core/data_migration_scripts/'),
				'module_paths'          => array( EE_NEW_ADDON_PATH . 'EED_New_Addon.module.php' ),
				'shortcode_paths'       => array( EE_NEW_ADDON_PATH . 'EES_New_Addon.shortcode.php' ),
				'widget_paths'          => array( EE_NEW_ADDON_PATH . 'EEW_New_Addon.widget.php' ),
				// if plugin update engine is being used for auto-updates. not needed if PUE is not being used.
				'pue_options'           => array(
					'pue_plugin_slug' => 'eea-new-addon',
					'plugin_basename' => EE_NEW_ADDON_BASENAME,
					'checkPeriod'     => '24',
					'use_wp_update'   => false,
				),
				'capabilities'          => array(
					'administrator' => array(
						'edit_thing',
						'edit_things',
						'edit_others_things',
						'edit_private_things',
					),
				),
				'capability_maps'       => array(
					'EE_Meta_Capability_Map_Edit' => array(
						'edit_thing',
						array( 'New_Addon_Thing', 'edit_things', 'edit_others_things', 'edit_private_things' ),
					),
				),
				'class_paths'           => EE_NEW_ADDON_PATH . 'core/db_classes',
				'model_paths'           => EE_NEW_ADDON_PATH . 'core/db_models',
				'class_extension_paths' => EE_NEW_ADDON_PATH . 'core/db_class_extensions',
				'model_extension_paths' => EE_NEW_ADDON_PATH . 'core/db_model_extensions',
				//note for the mock we're not actually adding any custom cpt stuff yet.
				'custom_post_types'     => array(),
				'custom_taxonomies'     => array(),
				'default_terms'         => array(),
			)
		);
	}



    /**
     * uncomment this method and use it as
     * a safe space to add additional logic like setting hooks
     * that will run immediately after addon registration
     * making this a great place for code that needs to be "omnipresent"
     *
     * @since 4.9.26
     */
    public function after_registration()
    {
        // your logic here
    }



}
// End of file EE_New_Addon.class.php
// Location: wp-content/plugins/eea-new-addon/EE_New_Addon.class.php
