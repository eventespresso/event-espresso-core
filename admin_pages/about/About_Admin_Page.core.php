<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 *
 * EE_About_Admin_Page
 *
 * This contains the logic for the About Event Espresso Pages
 *
 *
 * @package		EventEspresso
 * @subpackage	EE_Admin_Page\About_Admin_Page
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
			//'default' => '_whats_new',
			'default' => '_overview',
			//'overview' => '_overview',
			'credits' => '_credits',
			);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			/*'default' => array(
				'nav' => array(
					'label' => __('What\'s New', 'event_espresso'),
					'order' => 10),
				'require_nonce' => FALSE
				),*/
			//'overview' => array(
			'default' => array(
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



	//none of the below group are currently used for Support pages
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	public function load_scripts_styles() {}


	protected function _whats_new() {
		/*$steps = EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ? $this->_get_started_steps() : FALSE;
		$steps = $steps !== FALSE ? $steps : '';
		$this->_admin_page_title = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$settings_message = $steps;
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso, the most powerful, and free, Event Management plugin for WordPress.', 'event_espresso' ) . $settings_message;
		$template = EE_ABOUT_TEMPLATE_PATH . 'whats_new.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();*/
	}



	protected function _overview() {
		/*$this->_template_args['admin_page_title'] = __('About Event Espresso', 'event_espresso');
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso Decaf, the most powerful, and free, Event Management plugin for WordPress.', 'event_espresso');
		$template = EE_ABOUT_TEMPLATE_PATH . 'ee4-overview.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();*/

		//Copied from _whats_new()
		$steps = EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ? $this->_get_started_steps() : FALSE;
		$steps = $steps !== FALSE ? $steps : '';
		$this->_admin_page_title = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$settings_message = $steps;
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso, the most powerful, and free, Event Management plugin for WordPress.', 'event_espresso' ) . $settings_message;
		$template = EE_ABOUT_TEMPLATE_PATH . 'ee4-overview.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}



	protected function _get_started_steps() {
		$steps = '<h3>'.__('Getting Started').'</h3>';
		$step_one = '<p>'.sprintf( __('%sStep 1%s: Create your %sFirst Event%s.', 'event_espresso'), '<strong>', '</strong>', '<a href="admin.php?page=espresso_events&action=create_new">', '</a>') .'</strong></p>';
		$step_two = '<p>'.sprintf( __('%sStep 2%s: Visit your %sOrganization Settings%s and add/update your details.', 'event_espresso'), '<strong>', '</strong>', '<a href="admin.php?page=espresso_general_settings">', '</a>') .'</strong></p>';
		$step_three = '<p>'.sprintf( __('%sStep 3%s: Setup your %sPayment Methods%s.', 'event_espresso'), '<strong>', '</strong>', '<a href="admin.php?page=espresso_payment_settings">', '</a>') .'</strong></p>';

		//done?
		$done_step_one = EE_Registry::instance()->load_model('Event')->count() > 0 ? TRUE : FALSE;
		$done_step_two = EE_Registry::instance()->CFG->organization->address_1 == '123 Onna Road' ? FALSE : TRUE;
		$done_step_three = count(EE_Registry::instance()->CFG->gateway->active_gateways) < 1 || ( count(EE_Registry::instance()->CFG->gateway->active_gateways) === 1 && !empty( EE_Registry::instance()->CFG->gateway->payment_settings['Invoice'] ) && preg_match( '/123 Onna Road/', EE_Registry::instance()->CFG->gateway->payment_settings['Invoice']['payment_address'] ) ) ? FALSE : TRUE;

		//if ALL steps are done, let's just return FALSE so we don't display anything
		if ( $done_step_one && $done_step_two && $done_step_three )
			return FALSE;

		//now let's put it together
		$steps .= sprintf( '%s' . $step_one . '%s', $done_step_one ? '<strike>' : '', $done_step_one ? '</strike>': '' );
		$steps .= sprintf( '%s' . $step_two . '%s', $done_step_two ? '<strike>' : '', $done_step_two ? '</strike>': '' );
		$steps .= sprintf( '%s' . $step_three . '%s', $done_step_three ? '<strike>' : '', $done_step_three ? '</strike>': '' );

		return $steps;
	}



	protected function _credits() {
		$this->_template_args['admin_page_title'] = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso Decaf, the most powerful, and free, Event Management plugin for WordPress.', 'event_espresso');
		$template = EE_ABOUT_TEMPLATE_PATH . 'credits.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}



} //end Support_Admin_Page class
