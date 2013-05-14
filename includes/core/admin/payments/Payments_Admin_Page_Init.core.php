<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Payments_Admin_Page_Init
 *
 * This is the init for the EE Payments Admin Pages.  See EE_Admin_Page_Init for method inline docs. 
 *
 *
 * @package		Payments_Admin_Page_Init
 * @subpackage	includes/core/admin/Payments_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Payments_Admin_Page_Init extends EE_Admin_Page_Init {


	public function __construct() {
		//define some page related constants
		define( 'EE_PAYMENTS_PG_SLUG', 'espresso_payment_settings' );
		define( 'EE_PAYMENTS_ADMIN_URL', admin_url( 'admin.php?page=' . EE_PAYMENTS_PG_SLUG ));
		define( 'EE_PAYMENTS_ADMIN', EE_CORE_ADMIN . 'payments' . DS );	
		define( 'EE_PAYMENTS_TEMPLATE_PATH', EE_PAYMENTS_ADMIN . 'templates' . DS );	
		define( 'EE_PAYMENTS_ASSETS_URL', EE_CORE_ADMIN_URL . 'payments/assets/' );


		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Payment Methods', 'event_espresso');
		$this->menu_label = __('Payment Methods', 'event_espresso');
		$this->menu_slug = EE_PAYMENTS_PG_SLUG;
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'settings',
			'menu_order' => 30,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_events'
			);
		return $map;
	}

} //end class Payments_Admin_Page_Init