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
 * Events_Admin_List_Table
 *
 * Class for preparing the table listing all the events
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package		Events_Admin_List_Table
 * @subpackage	includes/core/admin/events/Events_Admin_List_Table.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Events_Admin_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}

	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page($this->_screen . '_per_page');
		$this->_data = $this->_admin_page->get_events($this->_per_page, $this->_current_page);
 		$this->_all_data_count = $this->_admin_page->get_events( $this->_per_page, $this->_current_page, TRUE );
	}

	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('event', 'event_espresso'),
			'plural' => __('events', 'event_espresso'),
			'ajax' => TRUE, //for now
			'screen' => $this->_admin_page->get_current_screen()->id
			);


		$this->_columns = array(
			'cb' => '<input type="checkbox" />',
			'id' => __('ID', 'event_espresso'),
			'name' => __('Name', 'event_espresso'),
			'venue' => __('Venue', 'event_espresso'),
			'start_date' => __('Start Date', 'event_espresso'),
			'start_time' => __('Start Time', 'event_espresso'),
			'reg_begins' => __('Reg Begins', 'event_espresso'),
			'status' => __('Status', 'event_espresso'),
			'attendees' => __('Attendees', 'event_espresso'),
			'actions' => __('Actions', 'event_espresso')
			);


		$this->_sortable_columns = array(
			'id' => array( 'e.id' => true ),
			'name' => array( 'e.event_name' => false ),
			'venue' => array( 'v.name' => false ),
			'start_date' => array('dtt.DTT_EVT_start' => false),
			'start_time' => array('dtt.DTT_EVT_start' => false),
			'reg_begins' => array('dtt.DTT_REG_start' => false),
			'status' => array('e.event_status' => false)
			);

		$this->_hidden_columns = array();
	}


	protected function _get_table_filters() {
		$filters = array();

		//todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
		require_once EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin.php';

		//first month/year filters
		$filters[] = $this->_admin_page->espresso_event_months_dropdown( isset($this->_req_data['month_range']) ? $this->_req_data['month_range'] : '' );

		//category filter
		$filters[] = espresso_category_dropdown( isset($this->_req_data['category_id']) ? $this->_req_data['category_id'] : '' );

		//status dropdown
		$status = array(array('id' => '', 'text' => __('Show Active/Inactive', 'event_espresso')), array('id' => 'A', 'text' => __('Active', 'event_espresso')), array('id' => 'IA', 'text' => __('Inactive', 'event_espresso')), array('id' => 'P', 'text' => __('Pending', 'event_espresso')), array('id' => 'R', 'text' => __('Draft', 'event_espresso')), array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')), array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')), array('id' => 'X', 'text' => __('Denied', 'event_espresso')), array('id' => 'D', 'text' => __('Deleted', 'event_espresso')));

		$filters[] = select_input('event_status', $status, isset($this->_req_data['event_status']) ? $this->_req_data['event_status'] : '');
		return $filters;	
	}





	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->total_events();
		$this->_views['today']['count'] = $this->_admin_page->total_events_today();
		$this->_views['month']['count'] = $this->_admin_page->total_events_this_month();
	}







	public function column_cb($item) {
        return sprintf(
            '<input type="checkbox" name="EVT_ID[]" value="%s" />', $item->event_id
        );    
    }



	public function column_default($item) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}




	public function column_id($item) {
		return $item->event_id;
	}



	public function column_name($item) {
		//todo: remove when attendees is active
		if ( !defined('REG_ADMIN_URL') )
			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);

		$edit_query_args = array(
				'action' => 'edit_event',
				'EVT_ID' => $item->event_id
			);

		$delete_query_args = array(
				'action' => 'delete_events',
				'EVT_ID' => $item->event_id
			);

		$attendees_query_args = array(
				'action' => 'event_registrations',
				'EVT_ID' => $item->event_id
			);

		$export_query_args = array(
				'action' => 'export_events',
				'EVT_ID' => $item->event_id
			);


		$edit_link = wp_nonce_url( add_query_arg( $edit_query_args, EVENTS_ADMIN_URL ), 'edit_event_nonce');
		$view_link = espresso_reg_url( $item->event_id, $item->slug );
		$delete_link = wp_nonce_url( add_query_arg( $delete_query_args, EVENTS_ADMIN_URL ), 'delete_events_nonce' );
		$attendees_link = wp_nonce_url( add_query_arg( $attendees_query_args, REG_ADMIN_URL ), 'event_registrations_nonce' );
		$export_event_link = wp_nonce_url( add_query_arg( $export_query_args, EVENTS_ADMIN_URL), 'export_events_nonce' );

		$actions = array(
			'view' => '<a href="' . $view_link . '" title="' . __('View Event', 'event_espresso') . '">' . __('View', 'event_espresso') . '</a>',
			'edit' => '<a href="' . $edit_link . '" title="' . __('Edit Event', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>',
			'delete' => '<a href="' . $delete_link . '" title="' . __('Delete Event', 'event_espresso') . '">' . __('Delete', 'event_espresso') . '</a>',
			'attendees' => '<a href="' . $attendees_link . '" title="' . __('View Attendees', 'event_espresso') . '">' . __('Attendees', 'event_espresso') . '</a>',
			'export' => '<a href="' . $export_event_link . '" title="' . __('Export Event', 'event_espresso') . '">' . __('Export', 'event_espresso') . '</a>'
			);

		$content = '<strong><a class="row-title" href="' . $edit_link . '">' . stripslashes_deep($item->event_name) . '</a></strong>';
		$content .= $this->row_actions($actions);
		return $content;

	}



	
	public function column_venue($item) {
		return $item->venue_title;
	}




	public function column_start_date($item) {
		return date( 'D, M d, Y', $item->DTT_EVT_start );
	}




	public function column_start_time($item) {
		return date( get_option('time_format'), $item->DTT_EVT_start );
	}




	public function column_reg_begins($item) {
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php' );
		$DTM = EEM_Datetime::instance();
		// grab reg times
		$reg_time = array_shift( $DTM->get_primary_reg_date_for_event( $item->event_id ));
		$reg_start = $reg_time->reg_start();
		$reg_end = $reg_time->reg_end();

		$registration_start = isset($reg_start) ? $reg_start : '';
		return date('D, M d, Y @ g:i a', $registration_start);
	}




	public function column_status($item) {
		$status = array();
		$status = event_espresso_get_is_active($item->event_id);
		return $status['display'] == 'OPEN' ? '<span style="color:green;"><b>' . $status['display'] . '</b></span>' : $status['display'];
	}




	public function column_attendees($item) {
		$attendees_query_args = array(
				'action' => 'event_registrations',
				'event_id' => $item->event_id
			);
		$attendees_link = wp_nonce_url( add_query_arg( $attendees_query_args, REG_ADMIN_URL ), 'event_registrations_nonce' );	
		//require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$registered_attendees = EEM_Attendee::instance()->get_event_attendees( $item->event_id, FALSE, FALSE, FALSE, 'REG_date', 'DESC', FALSE, 'COUNT' );
		$registered_attendees = $registered_attendees ? $registered_attendees : 0;
		return '<a href="' . $attendees_link . '">' . $registered_attendees . '/' . $item->reg_limit . '</a>';
	}



	public function column_actions($item) {
		//todo: remove when attendees is active
		if ( !defined('REG_ADMIN_URL') )
			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);

		$edit_query_args = array(
				'action' => 'edit_event',
				'event_id' => $item->event_id
			);

		$delete_query_args = array(
				'action' => 'delete_events',
				'event_id' => $item->event_id
			);

		$attendees_query_args = array(
				'action' => 'default',
				'event_id' => $item->event_id
			);

		$reports_query_args = array(
				'action' => 'view_report',
				'event_id' => $item->event_id
			);

		$export_query_args = array(
				'action' => 'export_events',
				'event_id' => $item->event_id
			);


		$edit_link = wp_nonce_url( add_query_arg( $edit_query_args, EVENTS_ADMIN_URL ), 'edit_event_nonce');
		$view_link = espresso_reg_url( $item->event_id, $item->slug );
		$delete_link = wp_nonce_url( add_query_arg( $delete_query_args, EVENTS_ADMIN_URL ), 'delete_events_nonce' );
		$attendees_link = wp_nonce_url( add_query_arg( $attendees_query_args, REG_ADMIN_URL ), 'default_nonce' );
		$reports_link = wp_nonce_url( add_query_arg( $reports_query_args, EVENTS_ADMIN_URL ), 'view_report_nonce' );
		$export_event_link = wp_nonce_url( add_query_arg( $export_query_args, EVENTS_ADMIN_URL), 'export_events_nonce' );
		
		$content = '<div style="width:180px;">' . "\n\t";
		$content .= '<a href="' .  $view_link . '" title="' . __('View Event', 'event_espresso') . '" target="_blank">' . "\n\t";
		$content .= '<div class="view_btn"></div></a>' . "\n\t";
		$content .= '<a href="' . $edit_link . '" title="' . __('Edit Event', 'event_espresso') . '"><div class="edit_btn"></div></a>' . "\n\t";
		$content .= '<a href="' . $attendees_link . '" title="' . __('View Attendees', 'event_espresso') . '"><div class="complete_btn"></div></a>' . "\n\t";
		$content .= '<a href="' . $export_event_link . '" title="' .  __('View Report', 'event_espresso') . '"><div class="reports_btn"></div></a>' . "\n\t";
		$content .= '<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=unique_id_info_' . $item->event_id  . '" title="' . __('Get Short URL/Shortcode', 'event_espresso') . '"><div class="shortcode_btn"></div></a>' . "\n\t";
		$content .= '<a href="#" onclick="window.location=\'' . $export_event_link . '\'" title="' . __('Export to Excel', 'event_espresso') . '"><div class="excel_exp_btn"></div></a>' . "\n\t";
		$content .= '<a href="#" onclick="window.location=\'' . $reports_link . '\'" title="' . __('Export to CSV', 'event_espresso') . '"><div class="csv_exp_btn"></div>
			</a>' . "\n";
		//todo: we need to put back in a email attendees link via the new messages system
		$content .= '</div>' . "\n";
		$content .= '<div id="unique_id_info_' . $item->event_id . '" style="display:none">' . "\n\t";
		$content .= sprintf( __('<h2>Short URL/Shortcode</h2><p>This is the short URL to this event:</p><p><span  class="updated fade">%s</span></p><p>This will show the registration form for this event just about anywhere. Copy and paste the following shortcode into any page or post.</p><p><span  class="updated fade">[SINGLEEVENT single_event_id="%s"]</span></p> <p class="red_text"> Do not use in place of the main events page that is set in the Organization Settings page.', 'event_espresso'), $view_link, stripslashes_deep($item->event_identifier) );
		$content .= "\n";
		$content .= '</div>';
		return $content;
	}


}