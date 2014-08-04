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
 * Registration_Form_Admin_Page_Init
 *
 * This contains the logic for setting up the Forms (Question and Question Groups) related pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 events related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Events model is setup)
 *
 * @package		Registration_Form_Admin_Page_Init
 * @subpackage	includes/core/admin/Registration_Form_Admin_Page_Init.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Registration_Form_Admin_Page_Init extends EE_Admin_Page_Init {

	public function __construct() {
		//define some constants
		define( 'REGISTRATION_FORM_PG_SLUG', 'espresso_registration_form' );
		define( 'REGISTRATION_FORM_LABEL', __('Registration Form', 'event_espresso'));
		define( 'REGISTRATION_FORM_PG_NAME', REGISTRATION_FORM_LABEL );
		define( 'REGISTRATION_FORM_ADMIN', EE_ADMIN_PAGES . 'registration_form' . DS );
		define( 'REGISTRATION_FORM_ADMIN_URL', admin_url( 'admin.php?page=' . REGISTRATION_FORM_PG_SLUG ));
		define( 'EE_FORMS_ADMIN_URL', admin_url('admin.php?page=' . REGISTRATION_FORM_PG_SLUG ));
		define( 'REGISTRATION_FORM_ASSETS_PATH', REGISTRATION_FORM_ADMIN . 'assets' . DS );
		define( 'REGISTRATION_FORM_ASSETS_URL', EE_ADMIN_PAGES_URL . 'registration_form/assets/' );
		define( 'REGISTRATION_FORM_TEMPLATE_PATH', REGISTRATION_FORM_ADMIN . 'templates' . DS );
		define( 'REGISTRATION_FORM_TEMPLATE_URL', EE_ADMIN_PAGES_URL . 'registration_form/templates/' );
		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Registration Form Overview', 'event_espresso');
	}



	protected function _set_menu_map() {
		$this->_menu_map = new EE_Admin_Page_Sub_Menu( array(
			'menu_group' => 'management',
			'menu_order' => 30,
			'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
			'parent_slug' => 'espresso_events',
			'menu_slug' => REGISTRATION_FORM_PG_SLUG,
			'menu_label' => __('Registration Form', 'event_espresso'),
			'capability' => 'ee_read_questions',
			'admin_init_page' => $this
			));
	}
}
