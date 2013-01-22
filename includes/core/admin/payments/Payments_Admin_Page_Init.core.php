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
		//define some event categories related constants
		define( 'EE_PAYMENTS_ADMIN_URL', admin_url('admin.php?page=ee_payments') );
		define( 'EE_PAYMENTS_ASSETS_URL', EE_CORE_ADMIN_URL . 'payments/assets/');

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Event Payments', 'event_espresso');
		$this->menu_label = __('Payments', 'event_espresso');
		$this->menu_slug = 'ee_payments';
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'settings',
			'menu_order' => 30,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}

} //end class Payments_Admin_Page_Init