<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
*
* New_Addon_Admin_Page_Init class
*
* This is the init for the New_Addon Addon Admin Pages.  See EE_Admin_Page_Init for method inline docs.
*
* @package			Event Espresso (new_addon addon)
* @subpackage		admin/New_Addon_Admin_Page_Init.core.php
* @author				Darren Ethier
*
* ------------------------------------------------------------------------
*/
class New_Addon_Admin_Page_Init extends EE_Admin_Page_Init  {

	/**
	 * 	constructor
	 *
	 * @access public
	 * @return \New_Addon_Admin_Page_Init
	 */
	public function __construct() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		define( 'NEW_ADDON_PG_SLUG', 'espresso_new_addon' );
		define( 'NEW_ADDON_LABEL', __( 'New Addon', 'event_espresso' ));
		define( 'EE_NEW_ADDON_ADMIN_URL', admin_url( 'admin.php?page=' . NEW_ADDON_PG_SLUG ));
		define( 'EE_NEW_ADDON_ADMIN_ASSETS_PATH', EE_NEW_ADDON_ADMIN . 'assets/');
		define( 'EE_NEW_ADDON_ADMIN_ASSETS_URL', EE_NEW_ADDON_URL . 'admin/new_addon/assets/');
		define( 'EE_NEW_ADDON_ADMIN_TEMPLATE_PATH', EE_NEW_ADDON_ADMIN . 'templates/');
		define( 'EE_NEW_ADDON_ADMIN_TEMPLATE_URL', EE_NEW_ADDON_URL . 'admin/new_addon/templates/');

		parent::__construct();
		$this->_folder_path = EE_NEW_ADDON_ADMIN;

	}





	protected function _set_init_properties() {
		$this->label = NEW_ADDON_LABEL;
	}



	/**
	*		_set_menu_map
	*
	*		@access 		protected
	*		@return 		void
	*/
	protected function _set_menu_map() {
		$this->_menu_map = new EE_Admin_Page_Sub_Menu( array(
			'menu_group' => 'addons',
			'menu_order' => 25,
			'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
			'parent_slug' => 'espresso_events',
			'menu_slug' => NEW_ADDON_PG_SLUG,
			'menu_label' => NEW_ADDON_LABEL,
			'capability' => 'administrator',
			'admin_init_page' => $this
		));
	}



}
// End of file New_Addon_Admin_Page_Init.core.php
// Location: /wp-content/plugins/eea-new-addon/admin/new_addon/New_Addon_Admin_Page_Init.core.php
