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
 * Events_Admin_Page_Init
 *
 * This is the init for the EE Events Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 * @package			Event Espresso
 * @abstract
 * @subpackage		includes/core/admin/events/Events_Admin_Page_Init.core.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Events_Admin_Page_Init extends EE_Admin_Page_CPT_Init {

	public function __construct() {
		/**
		 * define some events related constants but only if not defined (need to check because unit tests
		 *  may load)
		 */
		if ( ! defined( 'EVENTS_PG_SLUG' ) ) {
			define( 'EVENTS_PG_SLUG', 'espresso_events' );
			define( 'EVENTS_LABEL', __('Events', 'event_espresso'));
			define( 'EVENTS_ADMIN', EE_ADMIN_PAGES . 'events' . DS );
			define( 'EVENTS_ADMIN_URL', admin_url( 'admin.php?page=' . EVENTS_PG_SLUG ));
			define( 'EVENTS_TEMPLATE_PATH', EVENTS_ADMIN . 'templates' . DS );
			define( 'EVENTS_ASSETS_URL', EE_ADMIN_PAGES_URL . 'events/assets/' );
		}
		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Event Espresso - Event Details', 'event_espresso');
	}

	protected function _set_menu_map() {
		$this->_menu_map = new EE_Admin_Page_Main_Menu( array(
			'menu_group' => 'main',
			'menu_order' => 10,
			'subtitle' => __('Events', 'event_espresso'),
			'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
			'parent_slug' => 'espresso_events',
			'menu_slug' => 'espresso_events',
			'menu_label' => __('Event Espresso', 'event_espresso'),
			'capability' => 'ee_read_events',
			'admin_init_page' => $this
			));
	}

} //end class Events_Admin_Page_Init
