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
 * EE_About_Admin_Page
 *
 * This contains the logic for the About Event Espresso Pages
 *
 *
 * @package		EE_About_Admin_Page
 * @subpackage	admin_pages/about/EE_About_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class About_Admin_Page extends EE_Admin_Page {


	protected function _init_page_props() {
		$this->page_slug = EE_ABOUT_PG_SLUG;
		$this->page_label = __('About Event Espresso', 'event_espresso');
		$this->_admin_base_url = EE_ABOUT_ADMIN_URL;
		$this->_admin_base_path = EE_ABOUT_ADMIN;
	}



	protected function _ajax_hooks() {
		//todo: all hooks for ajax goes here.
	}



	protected function _define_page_props() {
		$this->_labels = array();
		$this->_admin_page_title = $this->page_label;
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_whats_new',
			'credits' => '_credits',
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
			'credits' => array(
				'nav' => array(
					'label' => __('Credits', 'event_espresso'),
					'order' => 20),
				'require_nonce' => FALSE
				),
			);
	}



	//none of the below group are currently used for Support pages
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	public function load_scripts_styles() {}


	protected function _whats_new() {
		$this->_template_args['admin_page_title'] = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$settings_message = EE_Registry::instance()->CFG->organization->address_1 == '123 Onna Road' && EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ? sprintf( __(' The first thing you should do is visit %syour organization settings%s and add your details.', 'event_espresso'), '<a href="admin.php?page=espresso_general_settings">', '</a>') : '';
		$this->_template_args['admin_page_subtitle'] = sprintf( __('Thank you for using Event Espresso, the most powerful plugin for Event Management.%s', 'event_espresso'), $settings_message );
		$template = EE_ABOUT_TEMPLATE_PATH . 'whats_new.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}



	protected function _credits() {
		$this->_template_args['admin_page_title'] = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$this->_template_args['admin_page_subtitle'] = __('Thank you for using Event Espresso Decaf, the most powerful free plugin for Event Management.', 'event_espresso');
		$template = EE_ABOUT_TEMPLATE_PATH . 'credits.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}



} //end Support_Admin_Page class