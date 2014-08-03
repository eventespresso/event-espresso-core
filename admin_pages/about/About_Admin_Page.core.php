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
			'default' => array(
				'func' => '_whats_new',
				'capability' => 'ee_read_ee'
				),
			'overview' => array(
				'func' => '_overview',
				'capability' => 'ee_read_ee'
				),
			'credits' => array(
				'func' => '_credits',
				'capability' => 'ee_read_ee'
				),
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



	//none of the below group are currently used for Support pages
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	public function load_scripts_styles() {}


	protected function _whats_new() {
		$steps = EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ? $this->_get_started_steps() : FALSE;
		$steps = $steps !== FALSE ? $steps : '';
		$this->_admin_page_title = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$settings_message = $steps;
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso, the most powerful, and free, Event Management plugin for WordPress.', 'event_espresso' ) . $settings_message;
		$template = EE_ABOUT_TEMPLATE_PATH . 'whats_new.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}



	protected function _overview() {
		$this->_template_args['admin_page_title'] = __('About Event Espresso', 'event_espresso');
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso Decaf, the most powerful, and free, Event Management plugin for WordPress.', 'event_espresso');
		$template = EE_ABOUT_TEMPLATE_PATH . 'ee4-overview.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}



	protected function _get_started_steps() {

		$step_one_prefix = sprintf( __('%sStep 1:%s:', 'event_espresso'), '<strong>', '</strong>' );
		$step_two_prefix = sprintf( __('%sStep 2:%s:', 'event_espresso'), '<strong>', '</strong>'  );
		$step_three_prefix = sprintf( __('%sStep 3:%s:', 'event_espresso'), '<strong>', '</strong>'  );

		//baseline steps in the order they go in.
		$steps = array(
			'organization' => '<span>'.sprintf( __('Visit your %sOrganization Settings%s and add/update your details.', 'event_espresso'), '<a href="admin.php?page=espresso_general_settings">', '</a>') .'</span>',
			'gateways' => '<span>'.sprintf( __('Setup your %sPayment Methods%s.', 'event_espresso'), '<a href="admin.php?page=espresso_payment_settings">', '</a>') .'</span>',
			'event' => '<span>'.sprintf( __('Create your %sFirst Event%s.', 'event_espresso'), '<a href="admin.php?page=espresso_events&action=create_new">', '</a>') .'</span>'
			);

		//now let's setup the steps we'll use based on conditions.
		if ( ! EE_Registry::instance()->CAP->current_user_can( 'manage_options', 'espresso_general_settings_update_your_organization_settings' ) ) {
			unset( $steps['organization'] );
		}

		if ( ! EE_Registry::instance()->CAP->current_user_can( 'manage_gateways', 'espresso_payment_settings_default' ) ) {
			unset( $steps['gateways'] );
		}


		if ( ! EE_Registry::instance()->CAP->current_user_can( 'edit_events', 'espresso_events_create_new' ) ) {
			unset( $steps['event'] );
		}

		//if empty $steps get out!
		if ( empty( $steps ) ) {
			return FALSE;
		}

		//done?
		$done_steps = array(
			'organization' => EE_Registry::instance()->CFG->organization->address_1 == '123 Onna Road' ? FALSE : TRUE,
			'gateways' => count(EE_Registry::instance()->CFG->gateway->active_gateways) < 1 || ( count(EE_Registry::instance()->CFG->gateway->active_gateways) === 1 && !empty( EE_Registry::instance()->CFG->gateway->payment_settings['Invoice'] ) && preg_match( '/123 Onna Road/', EE_Registry::instance()->CFG->gateway->payment_settings['Invoice']['payment_address'] ) ) ? FALSE : TRUE,
			'event' => EE_Registry::instance()->load_model('Event')->count() > 0 ? TRUE : FALSE
			);

		//if ALL steps are done, let's just return FALSE so we don't display anything
		if ( $done_steps['organization'] && $done_steps['gateways'] && $done_steps['event'] ) {
			return FALSE;
		}



		//loop through remaining steps and set up the correct step prefixes for whatever steps are left.
		$step_num = 1;
		$step_content = '<h3>'.__('Getting Started').'</h3>';
		foreach ( $steps as $ref => $text ) {
			$step_content .= '<p><strong>' . sprintf( __('Step %d: ', 'event_espresso' ), $step_num ) . '</strong>' . sprintf( '%s' . $text . '%s', $done_steps[$ref] ? '<strike>' : '', $done_steps[$ref] ? '</strike>' : '' ) . '</p>';
			$step_num++;
		}

		return $step_content;
	}



	protected function _credits() {
		$this->_template_args['admin_page_title'] = sprintf( __('Welcome to Event Espresso %s', 'event_espresso'), EVENT_ESPRESSO_VERSION );
		$this->_template_args['admin_page_subtitle'] = __('Thank you for choosing Event Espresso Decaf, the most powerful, and free, Event Management plugin for WordPress.', 'event_espresso');
		$template = EE_ABOUT_TEMPLATE_PATH . 'credits.template.php';
		$this->_template_args['about_admin_page_content'] = EEH_Template::display_template( $template, $this->_template_args, TRUE );
		$this->display_about_admin_page();
	}



} //end Support_Admin_Page class
