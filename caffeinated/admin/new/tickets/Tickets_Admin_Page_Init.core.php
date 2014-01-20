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
* @ since		 		4.0
*
* ------------------------------------------------------------------------
*
* Tickets_Admin_Page_Init class
* 
* This is the init for the EE Tickets Admin Pages.  See EE_Admin_Page_Init for method inline docs.
*
* @package			Event Espresso
* @subpackage		caffeinated/admin/new/tickets/Tickets_Admin_Page_Init.core.php
* @author			Darren Ethier 
*
* ------------------------------------------------------------------------
*/
class Tickets_Admin_Page_Init extends EE_Admin_Page_Init  {




	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() { 
		
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		define( 'TICKETS_PG_SLUG', 'tickets' );	
		define( 'TICKETS_LABEL', __('Default Tickets', 'event_espresso'));		
		define( 'TICKETS_ADMIN', EE_CORE_CAF_ADMIN . 'new' . DS . TICKETS_PG_SLUG . DS );	
		define( 'TICKETS_ADMIN_URL', admin_url( 'admin.php?page=' . TICKETS_PG_SLUG ));	
		define( 'TICKETS_ASSETS_PATH', TICKETS_ADMIN . 'assets' . DS );		
		define( 'TICKETS_ASSETS_URL', EE_CORE_CAF_ADMIN_URL . 'new' . DS . TICKETS_PG_SLUG .'/assets/' );	
		define( 'TICKETS_TEMPLATE_PATH', TICKETS_ADMIN . 'templates' . DS );	
		define( 'TICKETS_TEMPLATE_URL', EE_CORE_CAF_ADMIN_URL . 'new' . DS . TICKETS_PG_SLUG . DS . 'templates/' );

		parent::__construct();
		$this->_folder_path = EE_CORE_CAF_ADMIN . 'new' . DS . $this->_folder_name . DS;

	}





	protected function _set_init_properties() {
		$this->label = TICKETS_LABEL;
		$this->menu_label = TICKETS_LABEL;
		$this->menu_slug = TICKETS_PG_SLUG;
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
			'group' => 'management',
			'menu_order' => 15,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}


}	
// end of file:	caffeinated/admin/new/tickets/Tickets_Admin_Page_Init.core.php