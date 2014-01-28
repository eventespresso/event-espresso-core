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
 * Extend_About_Admin_Page
 *
 * This contains the logic for setting up the caffeinated EE About related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * This is the extended (caf) general settings class
 *
 * @package		Extend_About_Admin_Page
 * @subpackage	caffeinated/admin/extend/about/Extend_About_Admin_Page.core.php
 * @author 		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_About_Admin_Page extends About_Admin_Page {



	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'EE_ABOUT_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'about/templates/' );
	}



	protected function _extend_page_config() {
		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'about';
	}


	protected function _whats_new() {
		$this->_template_args['admin_page_title'] = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$settings_message = EE_System::instance()->detect_req_type() == EE_System::req_type_new_activation ? sprintf( __(' The first thing you should do is visit %syour organization settings%s and add your details.', 'event_espresso'), '<a href="admin.php?page=espresso_general_settings">', '</a>') : '';
		$this->_template_args['admin_page_subtitle'] = sprintf( __('Thank you for choosing Event Espresso Caffeinated, the most powerful plugin for Event Management.%s', 'event_espresso'), $settings_message );
		$template = EE_ABOUT_CAF_TEMPLATE_PATH . 'whats_new.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}


}