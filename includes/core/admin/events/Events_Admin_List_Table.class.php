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

	private $_dtt;

	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
		require_once( EE_HELPERS . 'EE_DTT_Helper.helper.php' );
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
			'id' => array( 'EVT_ID' => true ),
			'name' => array( 'EVT_name' => false ),
			'venue' => array( 'VNU_name' => false ),
			'start_date' => array('DTT_EVT_start' => false),
			'start_time' => array('DTT_EVT_start' => false),
			'reg_begins' => array('DTT_REG_start' => false),
			//'status' => array('Event.status' => false)
			);

		$this->_hidden_columns = array();
	}


	protected function _get_table_filters() {
		$filters = array();

		//todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
		require_once EE_CORE_ADMIN . 'admin_helper.php';

		//first month/year filters
		$filters[] = $this->_admin_page->espresso_event_months_dropdown( isset($this->_req_data['month_range']) ? $this->_req_data['month_range'] : '' );


		$status = isset( $this->_req_data['status'] ) ? $this->_req_data['status'] : NULL;

		//active status dropdown
		if ( $status !== 'draft' )
			$filter[] = $this->_admin_page->active_status_dropdown( isset( $this->_req_data['active_status'] ) ? $this->_req_data['active_status'] : '' );

		//category filter
		//$filters[] = espresso_category_dropdown( isset($this->_req_data['category_id']) ? $this->_req_data['category_id'] : '' );
		
		
		return $filters;	
	}





	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->total_events();
		$this->_views['today']['count'] = $this->_admin_page->total_events_today();
		$this->_views['month']['count'] = $this->_admin_page->total_events_this_month();
		$this->_views['draft']['count'] = $this->_admin_page->total_events_draft();
		$this->_views['trash']['count'] = $this->_admin_page->total_trashed_events();
	}







	public function column_cb($item) {
		$this->_dtt = $item->primary_datetime(); //set this for use in other columns
        return sprintf(
            '<input type="checkbox" name="EVT_IDs[]" value="%s" />', $item->ID()
        );    
    }



	public function column_default($item) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}




	public function column_id($item) {
		return $item->ID();
	}



	public function column_name($item) {
		//todo: remove when attendees is active
		if ( !defined('REG_ADMIN_URL') )
			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);

		$edit_query_args = array(
				'action' => 'edit',
				'id' => $item->ID()
			);
		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EVENTS_ADMIN_URL );

		$attendees_query_args = array(
				'action' => 'default',
				'event_id' => $item->ID()
			);
		$attendees_link = EE_Admin_Page::add_query_args_and_nonce( $attendees_query_args, REG_ADMIN_URL );

		$export_query_args = array(
				'action' => 'export_events',
				'EVT_ID' => $item->ID()
			);
		$export_event_link = EE_Admin_Page::add_query_args_and_nonce( $export_query_args, EVENTS_ADMIN_URL );

		$trash_event_query_args = array(
				'action' => 'trash_event',
				'EVT_ID' => $item->ID()
			);
		$trash_event_link = EE_Admin_Page::add_query_args_and_nonce( $trash_event_query_args, EVENTS_ADMIN_URL );

		$restore_event_query_args = array(
				'action' => 'restore_event',
				'EVT_ID' => $item->ID()
			);
		$restore_event_link = EE_Admin_Page::add_query_args_and_nonce( $restore_event_query_args, EVENTS_ADMIN_URL );

		$delete_event_query_args = array(
				'action' => 'delete_event',
				'EVT_ID' => $item->ID()
			);
		$delete_event_link = EE_Admin_Page::add_query_args_and_nonce( $delete_event_query_args, EVENTS_ADMIN_URL );

		$view_link = get_permalink($item->ID());

		$actions = array(
			'view' => '<a href="' . $view_link . '" title="' . __('View Event', 'event_espresso') . '">' . __('View', 'event_espresso') . '</a>',
			'edit' => '<a href="' . $edit_link . '" title="' . __('Edit Event', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>',
			'attendees' => '<a href="' . $attendees_link . '" title="' . __('View Attendees', 'event_espresso') . '">' . __('Attendees', 'event_espresso') . '</a>',
			'export' => '<a href="' . $export_event_link . '" title="' . __('Export Event', 'event_espresso') . '">' . __('Export', 'event_espresso') . '</a>'
			);
			
		switch ( $item->get( 'status' ) ) {
			case 'trash' :
					$actions['restore from trash'] = '<a href="' . $restore_event_link . '" title="' . __('Restore from Trash', 'event_espresso') . '">' . __('Restore from Trash', 'event_espresso') . '</a>';
					$actions['delete permanently'] = '<a href="' . $delete_event_link . '" title="' . __('Delete Permanently', 'event_espresso') . '">' . __('Delete Permanently', 'event_espresso') . '</a>';
				break;
			default :
					$actions['move to trash'] = '<a href="' . $trash_event_link . '" title="' . __('Trash Event', 'event_espresso') . '">' . __('Move to Trash', 'event_espresso') . '</a>';
		}

		$status = $item->status() !== 'publish' ? ' (' . $item->status() . ')' : '';
		$content = '<strong><a class="row-title" href="' . $edit_link . '">' . $item->name() . '</a></strong>' . $status;
		$content .= $this->row_actions($actions);
		return $content;

	}


	



	
	public function column_venue($item) {
		$venue = $item->get_first_related( 'Venue' );
		return !empty( $venue ) ? $venue->name() : __('No Venue attached', 'event_espresso');
	}




	public function column_start_date($item) {
		!empty( $this->_dtt ) ? $this->_dtt->e_start_date( 'D, M d, Y') : _e('No Date was saved for this Event', 'event_espresso');
		//display in user's timezone?
		echo !empty( $this->_dtt ) ? $this->_dtt->display_in_my_timezone('start_date', 'D, M d, Y', 'My Timezone: ' ) : '';

	}




	public function column_start_time($item) {
		!empty( $this->_dtt ) ? $this->_dtt->e_start_time( get_option( 'time_format' ) ) : _e('No Date was saved for this Event', 'event_espresso');
		//display in user's timezone?
		echo !empty( $this->_dtt ) ? $this->_dtt->display_in_my_timezone('start_time', get_option('time_format'), 'My Timezone: ' ) : '';
	}




	public function column_reg_begins($item) {
		!empty( $this->_dtt ) ? $this->_dtt->e_reg_start_date_and_time('D, M d, Y', 'g:i a') : _e('No Date was saved for this Event', 'event_espresso');
		//display in user's timezone?
		echo !empty( $this->_dtt ) ? $this->_dtt->display_in_my_timezone('reg_start_date_and_time', array('D, M d, Y', 'g:i a'), 'My Timezone: ' ) : '';
	}




	public function column_status($item) {
		$item->pretty_active_status();
	}




	public function column_attendees($item) {
		$attendees_query_args = array(
				'action' => 'default',
				'event_id' => $item->ID()
			);
		$attendees_link = EE_Admin_Page::add_query_args_and_nonce( $attendees_query_args, REG_ADMIN_URL );	
		$registered_attendees = $item->get_number_of_attendees_reg_limit( 'num_attendees_slash_reg_limit' ); 
		return '<a href="' . $attendees_link . '">' . $registered_attendees . '</a>';
	}



	public function column_actions($item) {
		//todo: remove when attendees is active
		if ( !defined('REG_ADMIN_URL') )
			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
		$actionlinks = array();

		$edit_query_args = array(
				'action' => 'edit',
				'id' => $item->ID()
			);

		$trash_event_query_args = array(
				'action' => 'trash_event',
				'EVT_ID' => $item->ID()
			);

		$attendees_query_args = array(
				'action' => 'default',
				'event_id' => $item->ID()
			);

		$reports_query_args = array(
				'action' => 'reports',
				'EVT_ID' => $item->ID()
			);

		$export_query_args = array(
				'action' => 'export_events',
				'EVT_ID' => $item->ID()
			);


		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EVENTS_ADMIN_URL );
		$view_link = get_permalink($item->ID());
		$trash_event_link = EE_Admin_Page::add_query_args_and_nonce( $trash_event_query_args, EVENTS_ADMIN_URL );
		$attendees_link = EE_Admin_Page::add_query_args_and_nonce( $attendees_query_args, REG_ADMIN_URL );
		$reports_link = EE_Admin_Page::add_query_args_and_nonce( $reports_query_args, REG_ADMIN_URL );
		$export_event_link = EE_Admin_Page::add_query_args_and_nonce( $export_query_args, EVENTS_ADMIN_URL );

		$actionlinks[] = '<a href="' .  $view_link . '" title="' . __('View Event', 'event_espresso') . '" target="_blank">';
		$actionlinks[] = '<div class="view_btn"></div></a>';
		$actionlinks[] = '<a href="' . $edit_link . '" title="' . __('Edit Event', 'event_espresso') . '"><div class="edit_btn"></div></a>';
		$actionlinks[] = '<a href="' . $attendees_link . '" title="' . __('View Attendees', 'event_espresso') . '"><div class="complete_btn"></div></a>';
		$actionlinks[] = '<a href="' . $reports_link . '" title="' .  __('View Report', 'event_espresso') . '"><div class="reports_btn"></div></a>' . "\n\t";
		$actionlinks[] = '<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=unique_id_info_' . $item->ID()  . '" title="' . __('Get Short URL/Shortcode', 'event_espresso') . '"><div class="shortcode_btn"></div></a>';
		$actionlinks[] = '<a href="#" onclick="window.location=\'' . $export_event_link . '\'" title="' . __('Export to Excel', 'event_espresso') . '"><div class="excel_exp_btn"></div></a>';
		$actionlinks[] = '<a href="#" onclick="window.location=\'' . $export_event_link . '\'" title="' . __('Export to CSV', 'event_espresso') . '"><div class="csv_exp_btn"></div>
			</a>';
		$actionlinks[] = '<a href="' . $trash_event_link . '" title="' . __('Trash Event', 'event_espresso') . '">
				<img width="16" height="16" alt="trash" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/trash-small-16x16.png" style="margin-top:3px;">			
			</a>' . "\n\t";

		$actionlinks = apply_filters('FHEE_list_table_events_actions_column_action_links', $actionlinks, $item );

		$content = '<div style="width:180px;">' . "\n\t";
		$content .= implode( "\n\t", $actionlinks );
		//todo: we need to put back in a email attendees link via the new messages system
		$content .= "\n" . '</div>' . "\n";
		$content .= '<div id="unique_id_info_' . $item->ID() . '" style="display:none">' . "\n\t";
		$content .= sprintf( __('<h2>Short URL/Shortcode</h2><p>This is the short URL to this event:</p><p><span  class="updated fade">%s</span></p><p>This will show the registration form for this event just about anywhere. Copy and paste the following shortcode into any page or post.</p><p><span  class="updated fade">[SINGLEEVENT single_event_id="%s"]</span></p> <p class="red_text"> Do not use in place of the main events page that is set in the Organization Settings page.', 'event_espresso'), $view_link, stripslashes_deep($item->slug()) );
		$content .= "\n";
		$content .= '</div>';
//		$content = '<a href="' .  $view_link . '" title="' . __('View Event', 'event_espresso') . '" target="_blank">' . "\n\t";
//		$content .= '<div class="view_btn"></div></a>' . "\n\t";
//		$content .= '<a href="' . $edit_link . '" title="' . __('Edit Event', 'event_espresso') . '"><div class="edit_btn"></div></a>' . "\n\t";
//		$content .= '<a href="' . $attendees_link . '" title="' . __('View Attendees', 'event_espresso') . '"><div class="complete_btn"></div></a>' . "\n\t";
//		$content .= '<a href="' . $reports_link . '" title="' .  __('View Report', 'event_espresso') . '"><div class="reports_btn"></div></a>' . "\n\t";
//		$content .= '<a href="#" onclick="prompt(\'Shortcode:\', jQuery(\'#shortcode-' . $item->ID() . '\').val()); return false;" title="' . __('Get Short URL/Shortcode', 'event_espresso') . '"><div class="shortcode_btn"></div></a>' . "\n\t";
//		$content .= '<a href="'.$export_event_link.'" title="' . __('Export to CSV', 'event_espresso') . '"><div class="csv_exp_btn"></div></a>' . "\n";
//		$content .= '
//		<a href="' . $trash_event_link . '" title="' . __('Trash Event', 'event_espresso') . '">
//			<img width="16" height="16" alt="trash" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/trash-small-16x16.png" style="margin-top:3px;">			
//		</a>' . "\n\t";
//		
//		//todo: we need to put back in a email attendees link via the new messages system
//		$content .= '<div id="unique_id_info_' . $item->ID() . '" style="display:none">' . "\n\t";
//		$content .= sprintf( __('<h2>Short URL/Shortcode</h2><p>This is the short URL to this event:</p><p><span  class="updated fade">%s</span></p><p>This will show the registration form for this event just about anywhere. Copy and paste the following shortcode into any page or post.</p><p><span  class="updated fade">[SINGLEEVENT single_event_id="%s"]</span></p> <p class="red_text"> Do not use in place of the main events page that is set in the Organization Settings page.', 'event_espresso'), $view_link, stripslashes_deep($item->event_identifier) );
//		$content .= "\n";
//		$content .= '</div>';
//		$content .= '<input id="shortcode-' . $item->ID() . '" type="hidden" value="[SINGLEEVENT single_event_id='.stripslashes_deep($item->event_identifier).']">';	
		return $content;
	}


}
