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
* Rest_Api_Admin_Page_Init class
*
* This is the init for the REST_API Addon Admin Pages.  See EE_Admin_Page_Init for method inline docs.
*
* @package			Event Espresso (rest_api addon)
* @subpackage		admin/Rest_Api_Admin_Page_Init.core.php
* @author				Mike Nelson
*
* ------------------------------------------------------------------------
*/
class Rest_Api_Admin_Page_Init extends EE_Admin_Page_Init  {

	/**
	 * 	constructor
	 *
	 * @access public
	 * @return \Rest_Api_Admin_Page_Init
	 */
	public function __construct() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		define( 'REST_API_PG_SLUG', 'espresso_rest_api' );
		define( 'REST_API_LABEL', __( 'REST API', 'event_espresso' ));
		define( 'EE_REST_API_ADMIN_URL', admin_url( 'admin.php?page=' . REST_API_PG_SLUG ));
		define( 'EE_REST_API_ADMIN_ASSETS_PATH', EE_REST_API_ADMIN . 'assets' . DS );
		define( 'EE_REST_API_ADMIN_ASSETS_URL', EE_REST_API_URL . 'admin' . DS . 'rest_api' . DS . 'assets' . DS );
		define( 'EE_REST_API_ADMIN_TEMPLATE_PATH', EE_REST_API_ADMIN . 'templates' . DS );
		define( 'EE_REST_API_ADMIN_TEMPLATE_URL', EE_REST_API_URL . 'admin' . DS . 'rest_api' . DS . 'templates' . DS );

		parent::__construct();
		$this->_folder_path = EE_REST_API_ADMIN;

	}





	protected function _set_init_properties() {
		$this->label = REST_API_LABEL;
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
			'menu_slug' => REST_API_PG_SLUG,
			'menu_label' => REST_API_LABEL,
			'capability' => 'administrator',
			'admin_init_page' => $this
		));
	}



}
// End of file Rest_Api_Admin_Page_Init.core.php
// Location: /wp-content/plugins/eea-rest-api/admin/rest_api/Rest_Api_Admin_Page_Init.core.php
