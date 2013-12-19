<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
* Event Espresso
*
* Event Registration and Management Plugin for WordPress
*
* @ package			Event Espresso
* @ author			Seth Shoultes
* @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
* @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
* @ link			{@link http://www.eventespresso.com}
* @ since		 	4.1
*
* ------------------------------------------------------------------------
*
* Calendar_Admin_Page_Init class
* 
* This is the init for the Calendar Addon Admin Pages.  See EE_Admin_Page_Init for method inline docs.
*
* @package			Event Espresso (calendar addon)
* @subpackage		admin/Calendar_Admin_Page_Init.core.php
* @author			Darren Ethier 
*
* ------------------------------------------------------------------------
*/
class Calendar_Admin_Page_Init extends EE_Admin_Page_Init  {




	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() { 
		
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		define( 'CALENDAR_PG_SLUG', 'espresso_calendar' );	
		define( 'CALENDAR_LABEL', __('Calendar', 'event_espresso'));	
		define( 'CALENDAR_ADMIN', ESPRESSO_CALENDAR_PLUGINFULLPATH . 'admin' . DS . 'calendar' . DS );	
		define( 'CALENDAR_ADMIN_URL', admin_url( 'admin.php?page=' . CALENDAR_PG_SLUG ));	
		define( 'CALENDAR_ADMIN_ASSETS_PATH', CALENDAR_ADMIN . 'assets' . DS );		
		define( 'CALENDAR_ADMIN_ASSETS_URL', ESPRESSO_CALENDAR_PLUGINFULLURL . 'admin/calendar/assets/' );	
		define( 'CALENDAR_ADMIN_TEMPLATE_PATH', CALENDAR_ADMIN . 'templates' . DS );	
		define( 'CALENDAR_ADMIN_TEMPLATE_URL', ESPRESSO_CALENDAR_PLUGINFULLURL . 'admin/calendar/templates/' );

		parent::__construct();
		$this->_folder_path = CALENDAR_ADMIN;

	}





	protected function _set_init_properties() {
		$this->label = CALENDAR_LABEL;
		$this->menu_label = CALENDAR_LABEL;
		$this->menu_slug = CALENDAR_PG_SLUG;
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
// end of file:	includes/core/admin/pricing/Calendar_Admin_Page_Init.core.php