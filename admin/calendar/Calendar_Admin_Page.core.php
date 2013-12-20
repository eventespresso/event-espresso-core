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
 * @version		4.1
 *
 * ------------------------------------------------------------------------
 *
 * Calendar_Admin_Page
 *
 * This contains the logic for setting up the Calendar Addon Admin related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 *
 * @package		Calendar_Admin_Page (calendar addon)
 * @subpackage	admin/Calendar_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Calendar_Admin_Page extends EE_Admin_Page {

	protected $_settings = array(); //for holding current calendar settings


	protected function _init_page_props() {
		$this->page_slug = CALENDAR_PG_SLUG;
		$this->page_label = CALENDAR_LABEL;
		$this->_admin_base_url = CALENDAR_ADMIN_URL;
		$this->_admin_base_path = CALENDAR_ADMIN;
	}




	protected function _ajax_hooks() {}





	protected function _define_page_props() {
		$this->_admin_page_title = CALENDAR_LABEL;
		$this->_labels = array(
			'publishbox' => __('Update Settings', 'event_espresso')
			);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(		
			'default' => '_basic_settings',
			'advanced' => '_advanced_settings',
			'update_settings' => array(
				'func' => '_update_settings',
				'noheader' => TRUE
				),
			'usage' => '_usage'
			);
	}





	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Basic Settings', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_publish_post_box'),
				'require_nonce' => FALSE
				),
			'advanced' => array(
				'nav' => array(
					'label' => __('Advanced Settings', 'event_espresso'),
					'order' => 20
					),
				'metaboxes' => array( '_publish_post_box' ),
				'require_nonce' => FALSE
				),
			'usage' => array(
				'nav' => array(
					'label' => __('Calendar Usage', 'event_espresso'),
					'order' => 30
					),
				'require_nonce' => FALSE
				)
			);
	}
	

	protected function _add_screen_options() {}
	protected function _add_screen_options_default() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {
		wp_register_script('ee-calendar-admin-js', CALENDAR_ADMIN_ASSETS_URL . 'calendar-admin.js', array('jquery','farbtastic'), ESPRESSO_CALENDAR_VERSION, TRUE );
		wp_enqueue_script('ee-calendar-admin');
	}

	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}



	public function set_settings() {
		$this->_settings = !empty( $this->_settings ) ? $this->_settings : get_option('espresso_calendar_settings');
	}



	protected function _basic_settings() {
		$this->_settings_page( 'calendar_basic_settings.template.php' );
	}




	protected function _advanced_settings() {
		$this->_settings_page( 'calendar_advanced_settings.template.php' );
	}



	protected function _settings_page( $template ) {
		echo "settings page";
		$this->set_settings();
		$this->_template_args['espresso_calendar'] = $this->_settings;
		$this->_template_args['values'] = array(
				array('id' => false, 'text' => __('No', 'event_espresso')),
				array('id' => true, 'text' => __('Yes', 'event_espresso'))
		);
		$this->_set_add_edit_form_tags( 'update_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE);
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( CALENDAR_ADMIN_TEMPLATE_PATH . $template, $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();
	}


	protected function _usage() {
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( CALENDAR_ADMIN_TEMPLATE_PATH . 'calendar_usage_info.template.php', array(), TRUE );
		$this->display_admin_page_with_no_sidebar();
	}
	protected function _update_settings(){
		$rd = $this->_req_data;
		$c = EE_Config::instance()->addons['calendar'];
		/* @var $c EE_Calendar_Config */
//		$c->show_time = $this->_get_from_req('time_format');
//		$c->time_format = $this->_get_from_req(['time_format'])
	}
	
	private function _get_from_req($index_in_req_data,$default = FALSE){
		if(isset($this->_req_data[$index_in_req_data])){
			return $this->_req_data[$index_in_req_data];
		}else{
			return $default;
		}
	}

} //ends Forms_Admin_Page class
