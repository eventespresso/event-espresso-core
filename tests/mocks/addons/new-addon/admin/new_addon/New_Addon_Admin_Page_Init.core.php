<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
* Event Espresso
*
* Event Registration and Management Plugin for WordPress
*
* @ package 		Event Espresso
* @ author			Seth Shoultes
* @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
* @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
* @ link 				{@link http://www.eventespresso.com}
* @ since		 	$VID:$
*
* ------------------------------------------------------------------------
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
		define( 'NEW_ADDON_LABEL', __( 'New_Addon', 'event_espresso' ));
		define( 'EE_NEW_ADDON_ADMIN_URL', admin_url( 'admin.php?page=' . NEW_ADDON_PG_SLUG ));
		define( 'EE_NEW_ADDON_ADMIN_ASSETS_PATH', EE_NEW_ADDON_ADMIN . 'assets' . DS );
		define( 'EE_NEW_ADDON_ADMIN_ASSETS_URL', EE_NEW_ADDON_URL . 'assets' . DS );
		define( 'EE_NEW_ADDON_ADMIN_TEMPLATE_PATH', EE_NEW_ADDON_ADMIN . 'templates' . DS );
		define( 'EE_NEW_ADDON_ADMIN_TEMPLATE_URL', EE_NEW_ADDON_URL . 'templates' . DS );

		parent::__construct();
		$this->_folder_path = EE_NEW_ADDON_ADMIN;

	}





	protected function _set_init_properties() {
		$this->label = NEW_ADDON_LABEL;
		$this->menu_label = NEW_ADDON_LABEL;
		$this->menu_slug = NEW_ADDON_PG_SLUG;
		$this->capability = 'administrator';
	}



	/**
	*		sets vars in parent for creating admin menu entry
	*
	*		@access 		public
	*		@return 		void
	*/
	public function get_menu_map() {
		$map = array(
			'group' => 'settings',
			'menu_order' => 25,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}


}
// End of file New_Addon_Admin_Page_Init.core.php
// Location: /wp-content/plugins/espresso-new-addon/admin/new_addon/New_Addon_Admin_Page_Init.core.php