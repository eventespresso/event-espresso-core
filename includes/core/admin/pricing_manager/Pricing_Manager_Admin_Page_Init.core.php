<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
* Event Espresso
*
* Event Registration and Management Plugin for WordPress
*
* @ package			Event Espresso
* @ author				Seth Shoultes
* @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
* @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
* @ link					{@link http://www.eventespresso.com}
* @ since		 		3.2.P
*
* ------------------------------------------------------------------------
*
* Pricing_Manager_Admin_Page_Init class
* 
* This is the init for the EE Pricing Manager Admin Pages.  See EE_Admin_Page_Init for method inline docs.
*
* @package			Event Espresso
* @subpackage		includes/core/admin/event_pricing/Event_Pricing_Admin_Page_Init.core.php
* @author				Brent Christensen 
*
* ------------------------------------------------------------------------
*/
class Pricing_Manager_Admin_Page_Init extends EE_Admin_Page_Init  {




	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct( $page_slug, $page_name, $dir_name, $page_request ) { 
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		define( 'PRC_MNGR_PG_SLUG', 'pricing_manager' );	
		define( 'PRC_MNGR_LABEL', __('Pricing Manager', 'event_espresso'));	
		define( 'EVT_PRC_PG_NAME', ucwords( str_replace( '_', '', EVT_PRC_PG_SLUG )));	
		define( 'EVT_PRC_ADMIN', EE_CORE_ADMIN . EVT_PRC_PG_SLUG . DS );	
		define( 'EVT_PRC_ADMIN_URL', admin_url( 'admin.php?page=' . EVT_PRC_PG_SLUG ));	
		define( 'EVT_PRC_ASSETS_PATH', EVT_PRC_ADMIN . 'assets' . DS );		
		define( 'EVT_PRC_ASSETS_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . EVT_PRC_PG_SLUG . DS . 'assets' . DS ));	
		define( 'EVT_PRC_TEMPLATE_PATH', EVT_PRC_ADMIN . 'templates' . DS );	
		define( 'EVT_PRC_TEMPLATE_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . EVT_PRC_PG_SLUG . DS . 'templates' . DS ));

		parent::__construct();

	}





	protected function _set_init_properties() {
		$this->label = PRC_MNGR_LABEL;
		$this->menu_label = PRC_MNGR_LABEL;
		$this->menu_slug = PRC_MNGR_PG_SLUG;
	}



	/**
	*		sets vars in parent for creating admin menu entry
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_menu_map() {
		$map = array(
			'group' => 'management',
			'menu_order' => 10,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}


}	
// end of file:	includes/core/admin/event_pricing/Pricing_Manager_Admin_Page_Init.core.php