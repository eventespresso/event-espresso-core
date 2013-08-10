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
 * Maintenance_Admin_Page
 *
 * This contains the logic for setting up the Event Maintenance related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 *
 * @package		Maintenance_Admin_Page
 * @subpackage	includes/core/admin/Maintenance_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Maintenance_Admin_Page extends EE_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}



	protected function _init_page_props() {
		$this->page_slug = EE_MAINTENANCE_PG_SLUG;
		$this->page_label = __('Maintenance', 'event_espresso');
	}



	protected function _ajax_hooks() {
		//todo: all hooks for ajax goes here.
	}



	protected function _define_page_props() {
		$this->_admin_base_url = EE_MAINTENANCE_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_maintenance',);
	}

	/**
	 * default maintenance page
	 */
	public function _maintenance(){
		//it all depends if we're in maintenance model level 1 (frontend-only) or
		//level 2 (everything except maintenance page)
		echo "welcome ot maintenance mode page";
	}


	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Maintenance Methods', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				////'help_tabs' => $this->_get_maintenance_help_tabs(),
				)
			);
	}
	
	



	//none of the below group are currently used for Gateway Settings
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	




	public function load_scripts_styles() {
//		wp_enqueue_script('ee_admin_js');
//		wp_enqueue_media();
//		wp_enqueue_script('media-upload');
//		wp_enqueue_script('ee-maintenance',EE_MAINTENANCE_ASSETS_URL.'/ee-maintenance.js');
	}





	public function load_scripts_styles_default() {
		//styles
//		wp_register_style( 'espresso_maintenance', EE_MAINTENANCE_ASSETS_URL . 'ee-maintenance.css', array(), EVENT_ESPRESSO_VERSION );
//		wp_enqueue_style('espresso_maintenance');
//		wp_enqueue_style('ee-text-links');
//		//scripts
//		wp_enqueue_script('ee-text-links');
	}



} //end Maintenance_Admin_Page class