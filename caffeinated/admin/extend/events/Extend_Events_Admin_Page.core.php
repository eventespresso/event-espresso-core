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
 * Extend_Events_Admin_Page
 *
 * This is the Events Caffeinated admin page.
 *
 *
 * @package		Extend_Events_Admin_Page
 * @subpackage	includes/core/admin/Extend_Events_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Events_Admin_Page extends Events_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'EVENTS_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'events/templates/');
		define( 'EVENTS_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'events/assets/');
		define( 'EVENTS_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'events/assets/');
	}


	protected function _extend_page_config() {

		//new routes and new configs (or complete route overrides)
		$new_page_routes = array(
//			'export_payments' => array(
//				'func' => '_payment_export',
//				'noheader' => true
//				),
//			'view_report' => '_view_report',
			);

		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(
//			'view_report' => array(
//				'nav' => array(
//					'label' => __('Report', 'event_espresso'),
//					'order' => 20
//					)
//				),
			//)
		);

		$this->_page_config = array_merge( $this->_page_config, $new_page_config );

		//partial route/config override
		$this->_page_config['import_events']['metaboxes'] = $this->_default_espresso_metaboxes;
		$this->_page_config['create_event']['metaboxes'][] = '_premium_event_editor_meta_boxes';
		$this->_page_config['edit']['metaboxes'][] = '_premium_event_editor_meta_boxes';

		//add filters and actions
		//modifying _views
		add_filter('FHEE_list_table_views_espresso_events', array( $this, 'list_table_views'), 10 );
		add_filter('FHEE_event_legend_items', array( $this, 'event_legend_items'), 10 );
		add_filter('FHEE_list_table_events_actions_column_action_links', array( $this, 'overview_table_action_links' ), 10, 2 );
		add_filter('FHEE_event_datetime_metabox_add_additional_date_time_template', array( $this, 'add_additional_datetime_button' ), 10, 2 );
		add_filter('FHEE_event_datetime_metabox_clone_button_template', array( $this, 'add_datetime_clone_button' ), 10, 2 );
		add_filter('FHEE_event_datetime_metabox_timezones_template', array( $this, 'datetime_timezones_template'), 10, 2 );
		add_filter('FHEE_additional_registration_options_event_edit_page', array( $this, 'additional_registration_options'), 10, 6);

		//event settings
		add_action('AHEE_event_settings_template_extra_content', array( $this, 'enable_attendee_pre_approval'), 10 );

	}





	public function load_scripts_styles_edit() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

		
		wp_enqueue_script('event_editor_js');
		global $eei18n_js_strings;
		$new_strings = array(
			'image_confirm' => __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso'),
			'event_starts_on' => __('Event Starts on', 'event_espresso'),
			'event_ends_on' => __('Event Ends on', 'event_espresso'),
			'registration_starts_on' => __('Registration Starts on', 'event_espresso'),
			'registration_ends_on' => __('Registration Ends on', 'event_espresso'),
			'event_datetime_actions' => __('Actions', 'event_espresso'),
			'event_clone_dt_msg' => __('Clone this Event Date and Time', 'event_espresso'),
			'remove_event_dt_msg' => __('Remove this Event Time', 'event_espresso'),
			'clone_trooper_img_src' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/clone-trooper-16x16.png',
			'clone_trooper_img_alt' => __('clone', 'event_espresso'),
			'trash_img_src' => EVENT_ESPRESSO_PLUGINFULLURL .'images/trash-16x16.png',
			'trash_img_alt' => __('trash', 'event_espresso')
			);

		$eei18n_js_strings = array_merge( $eei18n_js_strings, $new_strings);

		wp_register_script('event_datetime_js', EVENTS_CAF_ASSETS_URL . 'js/ee_events_datetime.js', array('event_editor_js'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_localize_script( 'event_datetime_js', 'eei18n', $eei18n_js_strings );
		wp_enqueue_script('event_datetime_js');
	}




	public function add_additional_datetime_button( $template, $template_args ) {
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_add_additional_time.template.php', $template_args, TRUE);
	}



	public function add_datetime_clone_button( $template, $template_args ) {
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_metabox_clone_button.template.php', $template_args, TRUE );
	}



	public function datetime_timezones_template( $template, $template_args ) {
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_timezones.template.php', $template_args, TRUE );
	}


	public function additional_registration_options( $html, $template_args, $yes_no_values, $additional_attendee_reg_info_values, $default_reg_status_values ) {
		global $org_options;
		$template_args['use_attendee_pre_approval'] = $org_options['use_attendee_pre_approval'];
		$template_args['attendee_pre_approval_required'] = $org_options['use_attendee_pre_approval'] ? EE_Form_Fields::select_input("require_pre_approval", $yes_no_values, $this->_event->require_pre_approval) : '';
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_additional_registration_options.template.php', $template_args, TRUE);
	}



	public function enable_attendee_pre_approval( $template_args ) {
		$_args['attendee_pre_approval_select'] = EE_Form_Fields::select_input('use_attendee_pre_approval', $template_args['values'], $template_args['use_attendee_pre_approval'] );
		$template = EVENTS_CAF_TEMPLATE_PATH . 'event_settings_enable_attendee_pre_approval.template.php';
		espresso_display_template( $template, $_args );
	}




	public function list_table_views( $views ) {
		/*$views['all']['bulk_action']['export_payments'] =  __('Export Payments', 'event_espresso');
		$views['today']['bulk_action']['export_payments'] =  __('Export Payments', 'event_espresso');
		$views['month']['bulk_action']['export_payments'] =  __('Export Payments', 'event_espresso');*/
		return $views;
	}




	public function event_legend_items( $items ) {
		/*$items['event_reports'] =  array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/chart_bar.png',
				'desc' => __('View Event Reports.', 'event_espresso')
				);*/
		return $items;
	}


	public function overview_table_action_links( $actions, $item ) {
		/*$reports_query_args = array(
				'action' => 'view_report',
				'event_id' => $item->event_id
			);
		$reports_link = EE_Admin_Page::add_query_args_and_nonce( $reports_query_args, EVENTS_ADMIN_URL );
		$actions[] = '<a href="' . $reports_link . '" title="' .  __('View Report', 'event_espresso') . '"><div class="reports_btn"></div></a>';*/
		return $actions;
	}





	/**
	 * _premium_event_editor_meta_boxes
	 * add all metaboxes related to the event_editor
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _premium_event_editor_meta_boxes() {
		global $org_options;


		add_meta_box('espresso_event_editor_event_options', __('Event Registration Options', 'event_espresso'), array( $this, 'registration_options_meta_box' ), $this->page_slug, 'side', 'default');

		//todo feature in progress
		//add_meta_box('espresso_event_editor_promo_box', __('Event Promotions', 'event_espresso'), array( $this, 'promotions_meta_box' ), $this->_current_screen->id, 'side', 'core');

		//todo, this will morph into the "Person" metabox once events are converted to cpts and we have the persons cpt in place.
		if ($org_options['use_personnel_manager']) {
			add_meta_box('espresso_event_editor_personnel_box', __('Event Staff / Speakers', 'event_espresso'), array( $this, 'personnel_metabox' ), $this->page_slug, 'side', 'default');
		}
	}



	/**
	 * override caf metabox
	 * @return string html contents
	 */
	public function registration_options_meta_box() {

		global $org_options;

		$yes_no_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		$additional_attendee_reg_info_values = EEM_Event::additional_attendee_reg_info_array();
		$default_reg_status_values = EEM_Registration::reg_status_array();
		$template_args['active_status'] = $this->_cpt_model_obj->pretty_active_status(FALSE);
		$template_args['_event'] = $this->_cpt_model_obj;
		$template_args['allow_group_reg_select'] = EE_Form_Fields::select_input('allow_multiple', $yes_no_values, $this->_cpt_model_obj->allow_multiple(), 'id="group-reg"', '', false);
		$template_args['additional_limit'] = $this->_cpt_model_obj->additional_limit();
		$template_args['additional_attendee_select'] = EE_Form_Fields::select_input('additional_attendee_reg_info', $additional_attendee_reg_info_values, $this->_cpt_model_obj->additional_attendee_reg_info());
		$template_args['default_registration_status'] = EE_Form_Fields::select_input('default_reg_status', $default_reg_status_values, $this->_cpt_model_obj->default_registration_status());
		$template_args['display_description'] = EE_Form_Fields::select_input('display_desc', $yes_no_values, $this->_cpt_model_obj->display_description());
		$template_args['display_registration_form'] = EE_Form_Fields::select_input('display_reg_form', $yes_no_values, $this->_cpt_model_obj->display_reg_form(), '', '', false);
		$template_args['allow_overflow'] = EE_Form_Fields::select_input('allow_overflow', $yes_no_values, $this->_cpt_model_obj->allow_overflow() );
		$template_args['require_pre_approval'] = EE_Form_Fields::select_input('require_pre_approval', $yes_no_values, $this->_cpt_model_obj->require_pre_approval() );
		$template_args['additional_registration_options'] = apply_filters('FHEE_additional_registration_options_event_edit_page', '', $template_args, $yes_no_values, $additional_attendee_reg_info_values, $default_reg_status_values);
		$templatepath = EVENTS_CAF_TEMPLATE_PATH . 'event_registration_options.template.php';
		espresso_display_template($templatepath, $template_args);
	}



	/**
	 * _view_report
	 * Shows the report page for events
	 * @return string html for the report page
	 */
	protected function _view_report() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_event', 'add', array(), 'button add-new-h2');
		$this->_template_args['admin_page_content'] = 'in here';
		$this->display_admin_page_with_sidebar();
	}



} //end class Events_Admin_Page