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
 * Support_Admin_Page
 *
 * This contains the logic for setting up the Help and Support related admin pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 *
 * @package		Support_Admin_Page
 * @subpackage	includes/core/admin/support/Support_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Support_Admin_Page extends EE_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}



	protected function _init_page_props() {
		$this->page_slug = EE_SUPPORT_PG_SLUG;
		$this->page_label = __('Help & Support', 'event_espresso');
		$this->_admin_base_url = EE_SUPPORT_ADMIN_URL;
		$this->_admin_base_path = EE_SUPPORT_ADMIN;
	}



	protected function _ajax_hooks() {		
	}



	protected function _define_page_props() {
		$this->_labels = array();
		$this->_admin_page_title = $this->page_label;
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => array(
				'func' => '_contact_support',
				'capability' => 'ee_read_ee',
				),
			'developers' => array(
				'func' => '_developers',
				'capability' => 'ee_read_ee',
				),
			'shortcodes' => array(
				'func' => '_shortcodes',
				'capability' => 'ee_read_ee',
				),
			);
	}


	
	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Support', 'event_espresso'),
					'order' => 30),
				'metaboxes' => array_merge( $this->_default_espresso_metaboxes, array('_support_boxes' ) ),
				'require_nonce' => FALSE
				),
			'developers' => array(
				'nav' => array(
					'label' => __('Developers', 'event_espresso'),
					'order' => 50),
				'metaboxes' => $this->_default_espresso_metaboxes,
				'require_nonce' => FALSE
				),
			'shortcodes' => array(
				'nav' => array(
					'label' => __('Shortcodes', 'event_espresso'),
					'order' => 60),
				'metaboxes' => array_merge( $this->_default_espresso_metaboxes, array('_shortcodes_boxes' ) ),
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





	protected function _installation() {
		$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_installation.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( $template_path, '', TRUE);
		$this->display_admin_page_with_sidebar();
	}




	protected function _resources() {
		$this->display_admin_page_with_sidebar();
	}





	protected function _resources_boxes() {
		$boxes = array(
			'favorite_theme_developers' => __('Favorite Theme Developers', 'event_espresso'),
			'highly_recommended_themes' => __('Highly Recommended Themes', 'event_espresso'),
			'hire_developer' => __('Hire a Developer', 'event_espresso'),
			'partners' => __('Partners', 'event_espresso'),
			'recommended_plugins' => __('Recommended Plugins', 'event_espresso'),
			'other_resources' => __('Other Resources', 'event_espresso')
			);

		foreach ( $boxes as $box => $label ) {
			$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_' . $box . '.template.php';
			$callback_args = array('template_path' => $template_path);
			add_meta_box( 'espresso_' . $box . '_settings', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], "", TRUE );'), $this->_current_screen->id, 'normal', 'high', $callback_args);
		}
	}






	protected function _shortcodes() {
		$this->display_admin_page_with_sidebar();
	}




	protected function _shortcodes_boxes() {
	$boxes = array(
			'shortcodes_event_listings' => __('Event Listings', 'event_espresso'),
			'shortcodes_ticket_selector' => __('Event Ticket Selector', 'event_espresso'),
			'shortcodes_category' => __('Event Categories', 'event_espresso'),
			'shortcodes_attendee' => __( 'Event Attendees', 'event_espresso' )
			/*'shortcodes_single_events' => __('Single Events', 'event_espresso'),*/
			/*'shortcodes_attendee_listings' => __('Attendee Listings', 'event_espresso'),*/
			);

		foreach ( $boxes as $box => $label ) {
			$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_' . $box . '.template.php';
			$callback_args = array('template_path' => $template_path);
			add_meta_box( 'espresso_' . $box . '_settings', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], "", TRUE );'), $this->_current_screen->id, 'normal', 'high', $callback_args);
		}
	}





	protected function _contact_support() {
		$this->display_admin_page_with_sidebar();
	}


	protected function _support_boxes() {
		$boxes = array(
			'contact_support' => __('Contact Support', 'event_espresso'),
			'important_information' => __('Important Information', 'event_espresso')
			);

		foreach ( $boxes as $box => $label ) {
			$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_' . $box . '.template.php';
			$callback_args = array('template_path' => $template_path, 'template_args' => $this->_template_args);
			add_meta_box( 'espresso_' . $box . '_settings', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );'), $this->_current_screen->id, 'normal', 'high', $callback_args);
		}
	}


	protected function _developers() {
		$template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'developers_admin_details.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template($template_path, array(), true );
		$this->display_admin_page_with_sidebar();
	}
} //end Support_Admin_Page class
