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
 * Event_Pricing_Admin_Page_Init class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/event_pricing/Event_Pricing_Admin_Page_Init.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Event_Pricing_Admin_Page_Init extends EE_Admin_Page_Init implements Admin_Page_Init_Interface {




	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct( $page_slug, $page_name, $dir_name, $page_request ) { 
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		define( 'EVT_PRC_PG_SLUG', 'event_pricing' );	
		define( 'EVT_PRC_PG_NAME', ucwords( str_replace( '_', '', EVT_PRC_PG_SLUG )));	
		define( 'EVT_PRC_ADMIN', EE_CORE_ADMIN . EVT_PRC_PG_SLUG . DS );	
		define( 'EVT_PRC_ADMIN_URL', admin_url( 'admin.php?page=' . EVT_PRC_PG_SLUG ));	
		define( 'EVT_PRC_ASSETS_PATH', EVT_PRC_ADMIN . 'assets' . DS );		
		define( 'EVT_PRC_ASSETS_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . EVT_PRC_PG_SLUG . DS . 'assets' . DS ));	
		define( 'EVT_PRC_TEMPLATE_PATH', EVT_PRC_ADMIN . 'templates' . DS );	
		define( 'EVT_PRC_TEMPLATE_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . EVT_PRC_PG_SLUG . DS . 'templates' . DS ));

		$this->_init( $page_slug, $page_name, $dir_name, $page_request );

	}




	
	/**
	*		sets vars in parent for creating menu settings page
	* 		return the name of the filter that should be used for inserting into the EE admin menu
	* 		filters can be found in /includes/admin_screens/admin_menu.php
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
		return 10;  
	}




	
	/**
	*		sets vars in parent for creating menu settings page
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function get_page_access_capability() {
		return 'espresso_manager_pricing';
	}





	/**
	*		load page specific css
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_css() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//wp_enqueue_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
		wp_register_style('espresso_evt_prc', EVT_PRC_ASSETS_URL . 'espresso_event_pricing_admin.css' );		
		wp_enqueue_style('espresso_evt_prc');
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
		//wp_enqueue_script('jquery-ui-dialog');
		//wp_enqueue_script('jquery-ui-draggable');
		//wp_enqueue_script('jquery-ui-datepicker');
		wp_register_script('espresso_reg', EVT_PRC_ASSETS_URL . 'espresso_event_pricing_admin.js', array('jquery'), '1.0', TRUE);
		wp_enqueue_script('espresso_reg');			
	}


}


	
// end of file:	includes/core/admin/event_pricing/Event_Pricing_Admin_Page_Init.core.php