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
 * Venues_Admin_Page_Init
 *
 * This is the init for the EE Event Categories Admin Pages.  See EE_Admin_Page_Init for method inline docs. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 event venues related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Event Venues model is setup)
 *
 * @package		Venues_Admin_Page_Init
 * @subpackage	includes/core/admin/Venues_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Venues_Admin_Page_Init extends EE_Admin_Page_Init {


	public function __construct() {
		//define some event categories related constants
		define( 'EE_VENUES_PG_SLUG', 'espresso_venues' );	
		define( 'EE_VENUES_ADMIN_URL', admin_url('admin.php?page=' . EE_VENUES_PG_SLUG ));
		define( 'EE_VENUES_ASSETS_URL', EE_CORE_ADMIN_URL . 'venues/assets/');

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Event Venues', 'event_espresso');
		$this->menu_label = __('Venues', 'event_espresso');
		$this->menu_slug = EE_VENUES_PG_SLUG;
	}

	public function get_menu_map() {
		$map = array(
				'group' => 'management',
				'menu_order' => 30,
				'show_on_menu' => TRUE,
				'parent_slug' => 'espresso_events'
			);
		return $map;
	}

} //end Venues_Admin_Page_Init