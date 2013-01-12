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
 * Attendees_Admin_Page_Init class
 *
 * @package		Event Espresso
 * @subpackage	includes/core/admin/attendees/Attendees_Admin_Page_Init.core.php
 * @author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Attendees_Admin_Page_Init extends EE_Admin_Page_Init {




	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() { 
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		define( 'ATT_PG_SLUG', 'attendees' );	
		define( 'ATT_PG_NAME', ucwords( str_replace( '_', '', ATT_PG_SLUG )));	
		define( 'ATT_ADMIN', EE_CORE_ADMIN . ATT_PG_SLUG . DS );	
		define( 'ATT_ADMIN_URL', admin_url( 'admin.php?page=' . ATT_PG_SLUG ));	
		define( 'ATT_ASSETS_PATH', ATT_ADMIN . 'assets' . DS );		
		define( 'ATT_ASSETS_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . ATT_PG_SLUG . DS . 'assets' . DS ));	
		define( 'ATT_TEMPLATE_PATH', ATT_ADMIN . 'templates' . DS );	
		define( 'ATT_TEMPLATE_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . ATT_PG_SLUG . DS . 'templates' . DS ));

		parent::__construct();

	}




	protected function _set_init_properties() {
		$this->label = __('Attendees', 'event_espresso');
		$this->menu_label = __('Attendees', 'event_espresso');
		$this->menu_slug = 'attendees';
		$this->capability = 'administrator';
	}




	public function get_menu_map() {
		$map = array(
			'group' => 'main',
			'menu_order' => 50,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}


}


	
// end of file:	includes/core/admin/attendees/Attendees_Admin_Page_Init.core.php