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
class Messages_Admin_Page_Init extends EE_Admin_Page_Init implements Admin_Page_Init_Interface {
	/**
	 *constructor
	 *@Constructor
	 *@access public
	 *@return void
	 */
	public function __construct( $page_slug, $page_name, $dir_name, $page_request ) { 
		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		define( 'EE_MSG_PG_SLUG', 'messages' );	
		define( 'EE_MSG_PG_NAME', ucwords( str_replace( '_', '', EE_MSG_PG_SLUG )));	
		define( 'EE_MSG_ADMIN', EE_CORE_ADMIN . 'messages' . DS );	
		define( 'EE_MSG_ADMIN_URL', admin_url( 'admin.php?page=' . EE_MSG_PG_SLUG ));	
		define( 'EE_MSG_ASSETS_PATH', EE_MSG_ADMIN . 'assets' . DS );		
		define( 'EE_MSG_ASSETS_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . EE_MSG_PG_SLUG . DS . 'assets' . DS ));	
		define( 'EE_MSG_TEMPLATE_PATH', EE_MSG_ADMIN . 'templates' . DS );	
		define( 'EE_MSG_TEMPLATE_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . EE_MSG_PG_SLUG . DS . 'templates' . DS ));

		$this->_init( $page_slug, $page_name, $dir_name, $page_request );
	}

	/**
	*	sets vars in parent for creating menu settings page
	* 	return the name of the filter that should be used for inserting into the EE admin menu
	* 	filters can be found in /includes/admin_screens/admin_menu.php
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_admin_menu_filter_name() {
		//return 'filter_hook_espresso_submenus_management_section';  
		return 'filter_hook_espresso_submenus_main_section';  
	}

	/**
	*		sets vars in parent for creating menu settings page
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_admin_menu_order() {
		return 15;  
	}

	/**
	*		sets vars in parent for creating menu settings page
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_page_access_capability() {
		return 'espresso_manager_events';
	}

	/**
	*		load page specific css
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_css() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		wp_register_style('espresso_ee_msg', EE_MSG_ASSETS_URL . 'ee_message_admin.css' );		
		wp_enqueue_style('espresso_ee_msg');
	}

	/**
	*		load page specific js
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_js() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		wp_enqueue_script('jquery-ui-position');
		wp_enqueue_script('jquery-ui-widget');
		wp_register_script('espresso_msg_js', EE_MSG_ASSETS_URL . 'espresso_ee_msg_admin.js', array('jquery'), '1.0', TRUE);
		wp_enqueue_script('espress_msg_js');			
	}


} //end class EE_Message_Admin_Page_Init