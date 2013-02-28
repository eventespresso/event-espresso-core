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
 * Transactions_Admin_Page_Init class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/transactions/Transactions_Admin_Page_Init.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Transactions_Admin_Page_Init extends EE_Admin_Page_Init {





	/**
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() { 

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		define( 'TXN_PG_SLUG', 'espresso_transactions' );	
		define( 'TXN_PG_NAME', ucwords( str_replace( '_', '', TXN_PG_SLUG )));	
		define( 'TXN_ADMIN', EE_CORE_ADMIN . TXN_PG_SLUG . DS );	
		define( 'TXN_ADMIN_URL', admin_url( 'admin.php?page=' . TXN_PG_SLUG ));	
		define( 'TXN_ASSETS_PATH', TXN_ADMIN . 'assets' . DS );		
		define( 'TXN_ASSETS_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . TXN_PG_SLUG . DS . 'assets' . DS ));	
		define( 'TXN_TEMPLATE_PATH', TXN_ADMIN . 'templates' . DS );	
		define( 'TXN_TEMPLATE_URL', str_replace( '\\', '/', EE_CORE_ADMIN_URL . TXN_PG_SLUG . DS . 'templates' . DS ));

		parent::__construct();
	}






	protected function _set_init_properties() {
		$this->label = __('Transactions Overview', 'event_espresso');
		$this->menu_label = __('Transactions', 'event_espresso');
		$this->menu_slug = TXN_PG_SLUG;
		$this->capability = 'administrator';
	}





	public function get_menu_map() {
		$map = array(
			'group' => 'main',
			'menu_order' => 50,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_events'
			);
		return $map;
	}


}


	
// end of file:	includes/core/admin/transactions/Transactions_Admin_Page_Init.class.php