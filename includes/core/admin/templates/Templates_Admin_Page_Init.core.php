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
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------   
 */

/**
 * Templates_Admin_Page_Init
 * 
 * This is the init for the EE Template Settings Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 * @package			Event Espresso
 * @abstract
 * @subpackage		includes/core/admin/events/Templates_Admin_Page_Init.core.php
 * @author			Darren Ethier 
 *
 * ------------------------------------------------------------------------
 */
class Templates_Admin_Page_Init extends EE_Admin_Page_Init {

	public function __construct() {
		//define some Template Settings related constants
		define( 'EE_TEMPLATES_ADMIN_URL', admin_url('admin.php?page=template_confg') );

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Template Settings', 'event_espresso');
		$this->menu_label = __('Templates', 'event_espresso');
		$this->menu_slug = 'template_confg';
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'settings',
			'menu_order' => 5,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}
} //end class