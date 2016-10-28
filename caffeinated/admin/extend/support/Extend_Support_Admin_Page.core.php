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
 * Extend_Support_Admin_Page
 *
 * This contains the logic for setting up the Help and Support related admin pages.  Any methods without phpdoc comments have inline docs with parent class. (this is the caf class)
 *
 *
 * @package		Extend_Support_Admin_Page
 * @subpackage	caffeinated/admin/extend/support/Extend_Support_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Support_Admin_Page extends Support_Admin_Page {

	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'EE_SUPPORT_CAF_ADMIN_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'support/templates/' );
	}




	protected function _extend_page_config() {
		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'support';
		//new routes and new configs (or overrides )
		$new_page_routes = array(
			'faq' => array(
				'func' => '_faq',
				'capability' => 'ee_read_ee'
				)
			);
		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(
			'faq' => array(
				'nav' => array(
					'label' => __('FAQ', 'event_espresso'),
					'order' => 40),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box'),
				'require_nonce' => FALSE
				)
			);
		$this->_page_config = array_merge( $this->_page_config, $new_page_config );

		$this->_page_config['default']['metaboxes'][] = '_installation_boxes';
	}




	protected function _faq() {
		$template_path = EE_SUPPORT_CAF_ADMIN_TEMPLATE_PATH . 'support_admin_details_faq.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( $template_path, '', TRUE);
		$this->display_admin_page_with_sidebar();

	}



	protected function _installation_boxes() {
		$callback_args = array('template_path' => EE_SUPPORT_CAF_ADMIN_TEMPLATE_PATH . 'support_admin_details_additional_information.template.php');
		add_meta_box( 'espresso_additional_information_support', __('Additional Information', 'event_espresso'), create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], "", TRUE);' ), $this->_current_screen->id, 'normal', 'high', $callback_args);
	}



} //end class Extend_Support_Admin_Page
