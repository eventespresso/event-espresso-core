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
 * Extend_Registration_Form_Admin_Page
 *
 * This is the caffeinated version of the Registration Form admin pages.
 *
 * @package		Extend_Registration_Form_Admin_Page
 * @subpackage	caffeinated/admin/extend/Extend_Registration_Form_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Registration_Form_Admin_Page extends Registration_Form_Admin_Page {

	

	public function __construct() {
		parent::__construct();
		define( 'REGISTRATION_FORM_CAF_ADMIN', EE_CORE_CAF_ADMIN_EXTEND . 'registration_form' . DS );		
		define( 'EE_FORMS_ADMIN_URL', admin_url('admin.php?page=' . REGISTRATION_FORM_PG_SLUG ));
		define( 'REGISTRATION_FORM_CAF_ASSETS_PATH', REGISTRATION_FORM_CAF_ADMIN . 'assets' . DS );		
		define( 'REGISTRATION_FORM_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registration_form/assets/' );	
		define( 'REGISTRATION_FORM_TEMPLATE_PATH', REGISTRATION_FORM_CAF_ADMIN . 'templates' . DS );	
		define( 'REGISTRATION_FORM_TEMPLATE_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registration_form/templates/' );
		var_dump($this->_page_routes);
	}

	//todo, more to come when we get to adding registration form caf functionality (copied from decaf file)
	

}