<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/**
 * ------------------------------------------------------------------------
 *
 * Class  EE_New_Addon
 *
 * @package			Event Espresso
 * @subpackage		espresso-new-addon
 * @author			    Brent Christensen
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 */
Class  EE_New_Addon extends EE_Addon {

	/**
	 * class constructor
	 */
	public function __construct() {
		// register our activation hook
		register_activation_hook( __FILE__, array( $this, 'set_activation_indicator_option' ));
	}

	public static function register_addon() {
		// define the plugin directory path and URL
		define( 'EE_NEW_ADDON_PATH', plugin_dir_path( __FILE__ ));
		define( 'EE_NEW_ADDON_URL', plugin_dir_url( __FILE__ ));
		define( 'EE_NEW_ADDON_ADMIN', EE_NEW_ADDON_PATH . 'admin' . DS . 'new_addon' . DS );
		// register addon via Plugin API
		EE_Register_Addon::register(
			'New_Addon',
			array(
				'version' 					=> EE_NEW_ADDON_VERSION,
				'min_core_version' => '4.3.0',
				'base_path' 				=> EE_NEW_ADDON_PATH,
				'admin_path' 			=> EE_NEW_ADDON_ADMIN,
				'admin_callback'		=> 'additional_admin_hooks',
				'config_class' 			=> 'EE_New_Addon_Config',
				'config_name'			=> 'New_Addon',
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
				//The below is for if plugin update engine is being used for auto-updates. not needed if PUE is not being used.
				'pue_options'			=> array(
					'pue_plugin_slug' => 'espresso_new_addon',
					'plugin_basename' => EE_NEW_ADDON_PLUGIN_FILE,
					'checkPeriod' => '24',
					'use_wp_update' => FALSE
				)
			)
		);
	}

	/**
	 * 	additional_admin_hooks
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function additional_admin_hooks() {
		// is admin and not in M-Mode ?
		if ( is_admin() && ! EE_Maintenance_Mode::instance()->level() ) {
			add_filter( 'plugin_action_links', array( $this, 'plugin_actions' ), 10, 2 );
		}
	}




	/**
	 * plugin_actions
	 *
	 * Add a settings link to the Plugins page, so people can go straight from the plugin page to the settings page.
	 * @param $links
	 * @param $file
	 * @return array
	 */
	public function plugin_actions( $links, $file ) {
		if ( $file == EE_NEW_ADDON_PLUGIN_FILE ) {
			// before other links
			array_unshift( $links, '<a href="admin.php?page=espresso_new_addon">' . __('Settings') . '</a>' );
		}
		return $links;
	}






}
// End of file EE_New_Addon.class.php
// Location: wp-content/plugins/espresso-new-addon/EE_New_Addon.class.php
