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

	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => array(
				'func' => '_whats_new',
				'capability' => 'manage_options'
				),
			'overview' => array(
				'func' => '_overview',
				'capability' => 'manage_options'
				),
			'credits' => array(
				'func' => '_credits',
				'capability' => 'manage_options'
				)
			);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('What\'s New', 'event_espresso'),
					'order' => 10),
				'require_nonce' => FALSE
				),
			'overview' => array(
				'nav' => array(
					'label' => __('About', 'event_espresso'),
					'order' => 20),
				'require_nonce' => FALSE
				),
			'credits' => array(
				'nav' => array(
					'label' => __('Credits', 'event_espresso'),
					'order' => 30),
				'require_nonce' => FALSE
				),
			);
	}


	protected function _whats_new() {
		$steps = EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ? $this->_get_started_steps() : FALSE;
		$steps = $steps !== FALSE ? $steps : '';
		$this->_admin_page_title = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$settings_message = $steps;
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso, the most powerful Event Management plugin for WordPress.', 'event_espresso'). $settings_message ;
		$template = is_readable(EE_ABOUT_CAF_TEMPLATE_PATH . 'whats_new.template.php') ? EE_ABOUT_CAF_TEMPLATE_PATH . 'whats_new.template.php' : EE_ABOUT_TEMPLATE_PATH . 'whats_new.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}


	protected function _overview() {
		$this->_admin_page_title = __('About Event Espresso', 'event_espresso');
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso, the most powerful Event Management plugin for WordPress.', 'event_espresso');
		$template = is_readable(EE_ABOUT_CAF_TEMPLATE_PATH . 'ee4-overview.template.php') ? EE_ABOUT_CAF_TEMPLATE_PATH . 'ee4-overview.template.php' : EE_ABOUT_TEMPLATE_PATH . 'ee4-overview.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}

	protected function _credits() {
	//	$this->_template_args['admin_page_title'] = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso, the most powerful Event Management plugin for WordPress.', 'event_espresso');
		$template = EE_ABOUT_TEMPLATE_PATH . 'credits.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}
}
