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
 * @version		4.0
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
		define( 'EE_PAYMENTS_ADMIN', EE_ADMIN_PAGES . 'payments' . DS );
		define( 'EE_PAYMENTS_TEMPLATE_PATH', EE_PAYMENTS_ADMIN . 'templates' . DS );
		define( 'EE_PAYMENTS_ASSETS_URL', EE_ADMIN_PAGES_URL . 'payments/assets/' );

		//check that there are active gateways on all admin page loads. but dont do it just yet
		add_action('admin_notices',array($this,'check_payment_gateway_setup'));
		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Payment Methods', 'event_espresso');
	}

	protected function _set_menu_map() {
		$this->_menu_map = new EE_Admin_Page_Sub_Menu( array(
			'menu_group' => 'settings',
			'menu_order' => 30,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_events',
			'menu_slug' => EE_PAYMENTS_PG_SLUG,
			'menu_label' => __('Payment Methods', 'event_espresso'),
			'capability' => 'administrator',
			'admin_init_page' => $this
			));
	}


	/**
	 * Checks that there is at least one active gateway. If not, add a notice
	 */
	public function check_payment_gateway_setup(){
		$actives = EE_Config::instance()->gateway->active_gateways;
		if( ! $actives || count($actives) < 1){
			$url = EE_Admin_Page::add_query_args_and_nonce(array(), EE_PAYMENTS_ADMIN_URL);
			echo '<div class="error">
				 <p>'.  sprintf(__("There are no Active Payment Methods setup for Event Espresso. Please %s activate at least one.%s", "event_espresso"),"<a href='$url'>","</a>").'</p>
			 </div>';
		}
	}

} //end class Payments_Admin_Page_Init
