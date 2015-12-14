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
 * Support_Admin_Page_Init
 *
 * This is the init for the EE Support Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 *
 * @package		Support_Admin_Page_Init
 * @subpackage	includes/core/admin/Support_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Support_Admin_Page_Init extends EE_Admin_Page_Init {


	public function __construct() {
		//define some help/support page related constants
		define( 'EE_SUPPORT_PG_SLUG', 'espresso_support' );
		define( 'EE_SUPPORT_ADMIN_URL', admin_url('admin.php?page=' . EE_SUPPORT_PG_SLUG ));
		define( 'EE_SUPPORT_ADMIN_TEMPLATE_PATH', EE_ADMIN_PAGES . 'support/templates/');
		define( 'EE_SUPPORT_ADMIN', EE_ADMIN_PAGES . 'support/' );
		define( 'EE_SUPPORT_ASSETS_URL', EE_ADMIN_PAGES_URL . 'support/assets/' );
		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Help & Support', 'event_espresso');
	}

	protected function _set_menu_map() {
		$this->_menu_map = new EE_Admin_Page_Sub_Menu( array(
			'menu_group' => 'extras',
			'menu_order' => 30,
			'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_AND_NETWORK_ADMIN,
			'parent_slug' => 'espresso_events',
			'menu_slug' => EE_SUPPORT_PG_SLUG,
			'menu_label' => __('Help & Support', 'event_espresso'),
			'capability' => 'ee_read_ee',
			'maintenance_mode_parent' => 'espresso_maintenance_settings',
			'admin_init_page' => $this
			));
	}

} //end class Support_Admin_Page_Init
