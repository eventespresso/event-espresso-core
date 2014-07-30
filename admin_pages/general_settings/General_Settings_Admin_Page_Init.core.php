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
 * General_Settings_Admin_Page_Init
 *
 * This contains the logic for setting up the General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 settings page.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Events model is setup)
 *
 * @package		General_Settings_Admin_Page_Init
 * @subpackage	includes/core/admin/General_Settings_Admin_Page_Init.core.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */

class General_Settings_Admin_Page_Init extends EE_Admin_Page_Init {

	public function __construct() {
		//define some constants
		define( 'GEN_SET_PG_SLUG', 'espresso_general_settings' );
		define( 'GEN_SET_LABEL', __('General Settings', 'event_espresso'));
		define( 'GEN_SET_ADMIN', EE_ADMIN_PAGES . 'general_settings' . DS );
		define( 'GEN_SET_ADMIN_URL', admin_url( 'admin.php?page=' . GEN_SET_PG_SLUG ));
		define( 'GEN_SET_TEMPLATE_PATH', GEN_SET_ADMIN . 'templates' . DS );
		define( 'GEN_SET_ASSETS_URL', EE_ADMIN_PAGES_URL . 'general_settings/assets/' );

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = GEN_SET_LABEL;
	}

	protected function _set_menu_map() {
		$this->_menu_map = new EE_Admin_Page_Sub_Menu( array(
			'menu_group' => 'settings',
			'menu_order' => 20,
			'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
			'parent_slug' => 'espresso_events',
			'menu_slug' => GEN_SET_PG_SLUG,
			'menu_label' => GEN_SET_LABEL,
			'capability' => 'manage_options',
			'admin_init_page' => $this
			));
	}
}
