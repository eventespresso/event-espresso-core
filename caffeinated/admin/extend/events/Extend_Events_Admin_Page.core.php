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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Events_Admin_Page
 *
 * This contains the logic for setting up the Events related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 events related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Events model is setup)
 *
 * @package		Events_Admin_Page
 * @subpackage	includes/core/admin/Events_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Events_Admin_Page extends Events_Admin_Page {


	public function __construct() {
		parent::__construct();
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
		$this->_page_config['add_event']['metaboxes'][] = '_premium_event_editor_meta_boxes';
		$this->_page_config['add_event']['metaboxes'][] = '_premium_event_editor_meta_boxes';
		$this->_page_config['default_event_settings']['metaboxes'] = array_merge( $this->_default_espresso_metaboxes, array('_publish_post_box') );

		//add filters and actions
		//modifying _views
		add_filter('filter_hook_espresso_list_table_views_espresso_events', array( $this, 'list_table_views'), 10 );
		add_filter('filter_hook_espresso_event_legend_items', array( $this, 'event_legend_items'), 10 );
		add_filter('filter_hook_espresso_list_table_events_actions_column_action_links', array( $this, 'overview_table_action_links' ), 10, 2 );
		add_filter('filter_hook_espresso_event_datetime_metabox_add_additional_date_time_template', array( $this, 'add_additional_datetime_button' ), 10, 2 );
		add_filter('filter_hook_espresso_event_datetime_metabox_clone_button_template', array( $this, 'add_datetime_clone_button' ), 10, 2 );
		add_filter('filter_hook_espresso_event_datetime_metabox_timezones_template', array( $this, 'datetime_timezones_template'), 10, 2 );

	}





	public function load_scripts_styles_edit_event() {
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