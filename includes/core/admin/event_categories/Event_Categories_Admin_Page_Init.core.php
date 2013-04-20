<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------   
 */

/**
 * Event_Categories_Admin_Page_Init
 * 
 * This is the init for the EE Event Categories Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 * @package			Event Espresso
 * @abstract
 * @subpackage		includes/core/admin/events/Event_Categories_Admin_Page_Init.core.php
 * @author			Darren Ethier 
 *
 * ------------------------------------------------------------------------
 */
class Event_Categories_Admin_Page_Init extends EE_Admin_Page_Init {

	public function __construct() {
		//define some event categories related constants
		define( 'EE_CATS_PG_SLUG', 'espresso_event_categories' );	
		define( 'EE_CATS_ADMIN_URL', admin_url('admin.php?page=' . EE_CATS_PG_SLUG ));

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Event Categories', 'event_espresso');
		$this->menu_label = __('Event Categories', 'event_espresso');
		$this->menu_slug = EE_CATS_PG_SLUG;
	}

	public function get_menu_map() {
		$map = array(
				'group' => 'main',
				'menu_order' => 5,
				'show_on_menu' => TRUE,
				'parent_slug' => 'espresso_events'
			);
		return $map;
	}
} //end class