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
		define( 'EE_NEW_ADDON_PLUGIN_FILE', plugin_basename( __FILE__ ));
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
				//The below is for if plugin update engine is being used for autoupdates. not needed if PUE is not being used.
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
			add_action( 'action_hook_espresso_new_addon_update_api', array( $this, 'load_pue_update' ));
		}
	}





	/**
	 * 	load_pue_update - Update notifications
	 *
	 *  @return 	void
	 */
	public function load_pue_update() {
		if ( ! defined( 'EVENT_ESPRESSO_PLUGINFULLPATH' )) {
			return;
		}
		if ( is_readable( EVENT_ESPRESSO_PLUGINFULLPATH . 'class/pue/pue-client.php' )) {
			//include the file
			require( EVENT_ESPRESSO_PLUGINFULLPATH . 'class/pue/pue-client.php' );
			// initiate the class and start the plugin update engine!
			new PluginUpdateEngineChecker(
			// host file URL
				'http://eventespresso.com',
				// plugin slug(s)
				array(
					'premium' => array('reg' => 'espresso-new-addon-core'),
					'prerelease' => array('beta' => 'espresso-new-addon-core-pr')
				),
				// options
				array(
					'apikey' => EE_Registry::instance()->NET_CFG->core->site_license_key,
					'lang_domain' => 'event_espresso',
					'checkPeriod' => '24',
					'option_key' => 'site_license_key',
					'options_page_slug' => 'event_espresso',
					'plugin_basename' => EE_NEW_ADDON_PLUGIN_FILE,
					// if use_wp_update is TRUE it means you want FREE versions of the plugin to be updated from WP
					'use_wp_update' => FALSE,
				)
			);
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
