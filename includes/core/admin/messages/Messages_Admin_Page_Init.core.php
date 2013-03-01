<?php if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		@link http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing * *
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Messages_Admin_Page_Init
 *
 * for setup of the message admin pages
 *
 * @package		Event Espresso
 * @subpackage	includes/core/message/EE_Message_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Messages_Admin_Page_Init extends EE_Admin_Page_Init  {
	/**
	 *constructor
	 *@Constructor
	 *@access public
	 *@return void
	 */
	public function __construct() { 
		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		define( 'EE_MSG_PG_SLUG', 'espresso_messages' );	
		define( 'EE_MSG_PG_NAME', ucwords( str_replace( '_', '', EE_MSG_PG_SLUG )));	
		define( 'EE_MSG_ADMIN', EE_CORE_ADMIN . 'messages' . DS );	
		define( 'EE_MSG_ADMIN_URL', admin_url( 'admin.php?page=' . EE_MSG_PG_SLUG ));	
		define( 'EE_MSG_ASSETS_PATH', EE_MSG_ADMIN . 'assets' . DS );		
		define( 'EE_MSG_ASSETS_URL', EE_CORE_ADMIN_URL  . 'messages/assets/' );	
		define( 'EE_MSG_TEMPLATE_PATH', EE_MSG_ADMIN . 'templates' . DS );	
		define( 'EE_MSG_TEMPLATE_URL', EE_CORE_ADMIN_URL . 'messages/templates/' );

		parent::__construct();
	}





	protected function _set_init_properties() {
		$this->label = __('Messages System', 'event_espresso');
		$this->menu_label = __('Messages', 'event_espresso');
		$this->menu_slug = EE_MSG_PG_SLUG;
		$this->capability = 'administrator';
	}




	public function get_menu_map() {
		$map = array(
			'group' => 'management',
			'menu_order' => 20,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_events'
			);
		return $map;
	}


} //end class EE_Message_Admin_Page_Init