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
 * Other_Services_Admin_Page
 *
 * This contains the logic for setting up the Other Services related admin pages.  Any methods without phpdoc
 * comments have inline docs with parent class.
 *
 *
 * @package		Event Espresso
 * @subpackage	admin
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Other_Services_Admin_Page extends EE_Admin_Page {


	protected function _init_page_props() {
		$this->page_slug = EE_OTHER_SERVICES_PG_SLUG;
		$this->page_label = __('Extensions & Services', 'event_espresso');
		$this->_admin_base_url = EE_OTHER_SERVICES_ADMIN_URL;
		$this->_admin_base_path = EE_OTHER_SERVICES_ADMIN;
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
			'default' => array(
				'func' => '_other_services',
				'capability' => 'ee_read_ee'
				)
		);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Other Available Services', 'event_espresso'),
					'order' => 10),
				'require_nonce' => FALSE
				)
			);
	}



	//none of the below group are currently used for Support pages
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}



	public function load_scripts_styles() {
		wp_register_style( 'ee-other-services-css', EE_OTHER_SERVICES_ASSETS_URL . 'other-services.css' , array('ee-admin-css') , EVENT_ESPRESSO_VERSION );
		wp_enqueue_style( 'ee-other-services-css' );
	}


	protected function _other_services() {
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( EE_OTHER_SERVICES_ADMIN_TEMPLATE_PATH . 'other_services_content.template.php', array(), true );
		$this->display_admin_page_with_no_sidebar();
	}


} //end Other_Services_Admin_Page class
