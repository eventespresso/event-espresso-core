<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/**
 * ------------------------------------------------------------------------
 *
 * Class  EE_New_Addon
 *
 * @package			Event Espresso
 * @subpackage		eea-new-addon
 * @author			    Brent Christensen
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 */
// define the plugin directory path and URL
define( 'EE_NEW_ADDON_BASENAME', plugin_basename( EE_NEW_ADDON_PLUGIN_FILE ));
define( 'EE_NEW_ADDON_PATH', plugin_dir_path( __FILE__ ));
define( 'EE_NEW_ADDON_URL', plugin_dir_url( __FILE__ ));
define( 'EE_NEW_ADDON_ADMIN', EE_NEW_ADDON_PATH . 'admin' . DS . 'new_addon' . DS );
Class  EE_New_Addon extends EE_Addon {

	/**
	 * class constructor
	 */
	public function __construct() {
	}

	public static function register_addon() {
		// register addon via Plugin API
		EE_Register_Addon::register(
			'New_Addon',
			array(
				'version' 					=> EE_NEW_ADDON_VERSION,
				'min_core_version' => '4.3.0.dev.000',
				'main_file_path' 		=> EE_NEW_ADDON_PLUGIN_FILE,
				'admin_path' 			=> EE_NEW_ADDON_ADMIN,
				'plugin_slug'			=> 'new_addon',
				'plugins_page_row'=> EE_New_Addon::plugins_page_upsell_info(),
				'admin_callback'		=> 'additional_admin_hooks',
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
					'pue_plugin_slug' 	=> 'eea-new-addon',
					'plugin_basename' => EE_NEW_ADDON_BASENAME,
					'checkPeriod' 			=> '24',
					'use_wp_update' 	=> FALSE,
					),
				'capabilities' => array(
					'administrator' => array(
						'read_addon', 'edit_addon', 'edit_others_addon', 'edit_private_addon'
						),
					),
				'capability_maps' => array(
					new EE_Meta_Capability_Map_Edit( 'edit_addon', array( 'Event', '', 'edit_others_addon', 'edit_private_addon' ) )
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



	/**
	 * 	additional_admin_hooks
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function additional_admin_hooks() {
	}



	/**
	 * 	plugins_page_row
	 *
	 * 	if not empty, inserts a new table row after this plugin's row on the WP Plugins page
	 * this can be used for adding upgrading/marketing info.
	 * Return an array (like below) to have the upsell info markup generated automatically, or
	 * Return a string of HTML to customize the entire table row contents
	 *
	 *  @access 	public
	 *  @return    string | array
	 */
	public static function plugins_page_upsell_info() {
		return array(
			'link_text' 		=>  __( 'UPGRADE TO PRO', 'event_espresso' ),
			'link_url' 			=> '#',
			'description' 	=> sprintf( __( 'Upgrade to Pro Version %1$s today and get moar betterer features.', 'event_espresso' ), '1.1.0' ),
		);
		// or return a string like:
		//$html = '<td colspan="3" class="ee-addon-upsell-info-td column-description desc">';
		//$html = sprintf( __( 'Upgrade to Pro Version %1$s today and get moar betterer features.', 'event_espresso' ), '1.1.0' );
		//$html = '</td>';
		//return $html;
	}






}
// End of file EE_New_Addon.class.php
// Location: wp-content/plugins/eea-new-addon/EE_New_Addon.class.php
