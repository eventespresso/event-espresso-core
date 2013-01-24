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
 * Registration_Forms_Admin_Page_Init
 *
 * This contains the logic for setting up the Forms (Question and Question Groups) related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 events related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Events model is setup)
 *
 * @package		Registration_Forms_Admin_Page_Init
 * @subpackage	includes/core/admin/Registration_Forms_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Registration_Forms_Admin_Page_Init extends EE_Admin_Page_Init {

	public function __construct() {
		//define some constants
		define( 'EE_FORMS_ADMIN_URL', admin_url('admin.php?page=registration_forms') );

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Registration Forms Overview', 'event_espresso');
		$this->menu_label = __('Registration Forms','event_espresso');
		$this->menu_slug = 'registration_forms';
		$this->capability = 'administrator';
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'management',
			'menu_order' => 60,
			'show_on_menu' => TRUE,
			'parent_slug' => 'events'
			);
		return $map;
	}
}