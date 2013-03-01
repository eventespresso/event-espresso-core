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
		define( 'EE_SUPPORT_ADMIN_TEMPLATE_PATH', EE_CORE_ADMIN . 'support/templates/');

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Help & Support', 'event_espresso');
		$this->menu_label = __('Help/Support', 'event_espresso');
		$this->menu_slug = EE_SUPPORT_PG_SLUG;
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'extras',
			'menu_order' => 30,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_events'
			);
		return $map;
	}

} //end class Support_Admin_Page_Init