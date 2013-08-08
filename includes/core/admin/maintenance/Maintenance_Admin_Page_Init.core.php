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
 * Maintenance_Admin_page_INit
 *
 * This is for when we're in maintenance mode. If we're in level 2 of mainteannce
 * mode, this is all users can see (because everything else is broken). If we're jsut
 * in level 1, they can see most of htis and the other admin pages.
 *
 *
 * @package		Payments_Admin_Page_Init
 * @subpackage	includes/core/admin/Payments_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Maintenance_Admin_Page_Init extends EE_Admin_Page_Init {


	public function __construct() {
		//define some page related constants
		define( 'EE_MAINTENANCE_PG_SLUG', 'espresso_maintenance_settings' );
		define( 'EE_MAINTENANCE_ADMIN_URL', admin_url( 'admin.php?page=' . EE_MAINTENANCE_PG_SLUG ));
		define( 'EE_MAINTENANCE_ADMIN', EE_CORE_ADMIN . 'maintenance' . DS );	
		define( 'EE_MAINTENANCE_TEMPLATE_PATH', EE_MAINTENANCE_ADMIN . 'templates' . DS );	
		define( 'EE_MAINTENANCE_ASSETS_URL', EE_CORE_ADMIN_URL . 'maintenance/assets/' );


		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Maintenance Mode', 'event_espresso');
		$this->menu_label = __('Maintenance', 'event_espresso');
		$this->menu_slug = EE_MAINTENANCE_PG_SLUG;
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'settings',
			'menu_order' => 30,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_events'
			);
		switch(EE_System::instance()->maintenance_mode_level()){
			case 1:
				break;
			case 2:
				$map['group']='main';
				break;
			case 0:
			default:
				$map['show_on_menu']=FALSE;
		}
		return $map;
	}

} //end class Payments_Admin_Page_Init