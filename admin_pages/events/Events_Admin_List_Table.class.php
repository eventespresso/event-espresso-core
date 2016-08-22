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


	/**
	 * @var EE_Datetime
	 */
	private $_dtt;


	/**
	 * Events_Admin_List_Table constructor.
	 *
	 * @param EE_Admin_Page $admin_page
	 */
	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
		require_once( EE_HELPERS . 'EEH_DTT_Helper.helper.php' );
	}


	/**
	 * Initial setup of data properties for the list table.
	 */
	protected function _setup_data() {
		$this->_data = $this->_admin_page->get_events($this->_per_page, $this->_current_page);
 		$this->_all_data_count = $this->_admin_page->get_events(0,0, TRUE);
	}


	/**
	 * Set up of additional properties for the list table.
	 */
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
			'author' => __('Author', 'event_espresso'),
			'venue' => __('Venue', 'event_espresso'),
			'start_date_time' => __('Event Start', 'event_espresso'),
			'reg_begins' => __('On Sale', 'event_espresso'),
			'attendees' => '<span class="dashicons dashicons-groups ee-icon-color-ee-green ee-icon-size-20"></span>',
			//'tkts_sold' => __('Tickets Sold', 'event_espresso'),
			'actions' => __('Actions', 'event_espresso')
			);


		$this->_sortable_columns = array(
			'id' => array( 'EVT_ID' => true ),
			'name' => array( 'EVT_name' => false ),
			'author' => array( 'EVT_wp_user' => false ),
			'venue' => array( 'Venue.VNU_name' => false ),
			'start_date_time' => array('Datetime.DTT_EVT_start' => false),
			'reg_begins' => array('Datetime.Ticket.TKT_start_date' => false),
			);

		$this->_primary_column = 'id';

		$this->_hidden_columns = array( 'author' );
	}


	/**
	 * @return array
	 */
	protected function _get_table_filters() {
		return array(); //no filters with decaf
	}


	/**
	 * Setup of views properties.
	 */
	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->total_events();
		$this->_views['draft']['count'] = $this->_admin_page->total_events_draft();
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_events', 'espresso_events_trash_events' ) ) {
			$this->_views['trash']['count'] = $this->_admin_page->total_trashed_events();
		}
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return string
	 */
	protected function _get_row_class( $item ) {
		$class = parent::_get_row_class( $item );
		//add status class
		$class .= $item instanceof EE_Event ? ' ee-status-strip event-status-' . $item->get_active_status() : '';
		if ( $this->_has_checkbox_column ) {
			$class .= ' has-checkbox-column';
		}
		return $class;
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return string
	 */
	public function column_status( EE_Event $item ) {
		return '<span class="ee-status-strip ee-status-strip-td event-status-' . $item->get_active_status() . '"></span>';
	}/**/


	/**
	 * @param  EE_Event $item
	 *
	 * @return string
	 */
	public function column_cb( $item ) {
		if ( ! $item instanceof EE_Event ) {
			return '';
		}
		$this->_dtt = $item->primary_datetime(); //set this for use in other columns

		//does event have any attached registrations?
		$regs = $item->count_related( 'Registration' );
		return $regs > 0 && $this->_view == 'trash' ? '<span class="ee-lock-icon"></span>' : sprintf(
			'<input type="checkbox" name="EVT_IDs[]" value="%s" />', $item->ID()
		);
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return mixed|string
	 */
	public function column_id( EE_Event $item ) {
		$content = $item->ID();
		$content .= '  <span class="show-on-mobile-view-only">' . $item->name() . '</span>';
		return $content;
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return string
	 */
	public function column_name( EE_Event $item ) {
		$edit_query_args = array(
				'action' => 'edit',
				'post' => $item->ID()
			);
		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EVENTS_ADMIN_URL );
		$actions = $this->_column_name_action_setup( $item );
		$status = ''; //$item->status() !== 'publish' ? ' (' . $item->status() . ')' : '';
		$content = '<strong><a class="row-title" href="' . $edit_link . '">' . $item->name() . '</a></strong>' . $status;
		$content .= '<br><span class="ee-status-text-small">' . EEH_Template::pretty_status( $item->get_active_status(), false, 'sentence' ) . '</span>';
		$content .= $this->row_actions($actions);
		return $content;

	}





	/**
	 * Just a method for setting up the actions for the name column
	 *
	 * @param EE_Event $item
	 *
	 * @return array array of actions
	 */
	protected function _column_name_action_setup( EE_Event $item ) {
		//todo: remove when attendees is active
		if ( !defined('REG_ADMIN_URL') )
			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);

		$actions = array();

		if ( EE_Registry::instance()->CAP->current_user_can('ee_edit_event', 'espresso_events_edit', $item->ID() ) ) {
			$edit_query_args = array(
					'action' => 'edit',
					'post' => $item->ID()
				);
			$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EVENTS_ADMIN_URL );
			$actions['edit'] = '<a href="' . $edit_link . '" title="' . esc_attr__('Edit Event', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>';

		}

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_read_registration', 'espresso_registrations_view_registration', $item->ID() ) ) {
			$attendees_query_args = array(
					'action' => 'default',
					'event_id' => $item->ID()
				);
			$attendees_link = EE_Admin_Page::add_query_args_and_nonce( $attendees_query_args, REG_ADMIN_URL );
			$actions['attendees'] = '<a href="' . $attendees_link . '" title="' . esc_attr__('View Registrations', 'event_espresso') . '">' . __('Registrations', 'event_espresso') . '</a>';
		}

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_event', 'espresso_events_trash_event', $item->ID() ) ) {
			$trash_event_query_args = array(
					'action' => 'trash_event',
					'EVT_ID' => $item->ID()
				);
			$trash_event_link = EE_Admin_Page::add_query_args_and_nonce( $trash_event_query_args, EVENTS_ADMIN_URL );
		}

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_event', 'espresso_events_restore_event', $item->ID() ) ) {
			$restore_event_query_args = array(
					'action' => 'restore_event',
					'EVT_ID' => $item->ID()
				);
			$restore_event_link = EE_Admin_Page::add_query_args_and_nonce( $restore_event_query_args, EVENTS_ADMIN_URL );
		}

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_event', 'espresso_events_delete_event', $item->ID() ) ) {
			$delete_event_query_args = array(
					'action' => 'delete_event',
					'EVT_ID' => $item->ID()
				);
			$delete_event_link = EE_Admin_Page::add_query_args_and_nonce( $delete_event_query_args, EVENTS_ADMIN_URL );
		}

		$view_link = get_permalink($item->ID());

		$actions['view'] = '<a href="' . $view_link . '" title="' . esc_attr__('View Event', 'event_espresso') . '">' . __('View', 'event_espresso') . '</a>';

		switch ( $item->get( 'status' ) ) {
			case 'trash' :
					if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_event', 'espresso_events_restore_event', $item->ID() ) ) {
						$actions['restore_from_trash'] = '<a href="' . $restore_event_link . '" title="' . esc_attr__('Restore from Trash', 'event_espresso') . '">' . __('Restore from Trash', 'event_espresso') . '</a>';
					}
					if ( $item->count_related('Registration') === 0 && EE_Registry::instance()->CAP->current_user_can( 'ee_delete_event', 'espresso_events_delete_event', $item->ID() ) ) {
						$actions['delete'] = '<a href="' . $delete_event_link . '" title="' . esc_attr__('Delete Permanently', 'event_espresso') . '">' . __('Delete Permanently', 'event_espresso') . '</a>';
					}
				break;
			default :
					if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_event', 'espresso_events_trash_event', $item->ID() ) ) {
						$actions['move to trash'] = '<a href="' . $trash_event_link . '" title="' . esc_attr__('Trash Event', 'event_espresso') . '">' . __('Trash', 'event_espresso') . '</a>';
					}
		}
		return $actions;
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return string
	 */
	public function column_author( EE_Event $item ) {
		//user author info
		$event_author = get_userdata( $item->wp_user() );
		$gravatar = get_avatar( $item->wp_user(), '15' );
		//filter link
		$query_args = array(
			'action' => 'default',
			'EVT_wp_user' => $item->wp_user()
			);
		$filter_url = EE_Admin_Page::add_query_args_and_nonce( $query_args, EVENTS_ADMIN_URL );
		return $gravatar . '  <a href="' . $filter_url . '" title="' . esc_attr__('Click to filter events by this author.', 'event_espresso') . '">' . $event_author->display_name . '</a>';
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return string
	 */
	public function column_venue( EE_Event $item ) {
		$venue = $item->get_first_related( 'Venue' );
		return !empty( $venue ) ? $venue->name() : '';
	}


	/**
	 * @param EE_Event $item
	 *
	 * @throws EE_Error
	 */
	public function column_start_date_time( EE_Event $item ) {
		echo !empty( $this->_dtt ) ?  $this->_dtt->get_i18n_datetime('DTT_EVT_start') : __('No Date was saved for this Event', 'event_espresso');
		//display in user's timezone?
		echo !empty( $this->_dtt ) ? $this->_dtt->display_in_my_timezone('DTT_EVT_start', 'get_i18n_datetime', '', 'My Timezone: ' ) : '';

	}


	/**
	 * @param EE_Event $item
	 *
	 * @throws EE_Error
	 */
	public function column_reg_begins( EE_Event $item ) {
		$reg_start = $item->get_ticket_with_earliest_start_time();
		echo !empty( $reg_start ) ? $reg_start->get_i18n_datetime('TKT_start_date') : __('No Tickets have been setup for this Event', 'event_espresso');
		//display in user's timezone?
		echo !empty( $reg_start ) ? $reg_start->display_in_my_timezone('TKT_start_date', 'get_i18n_datetime', '', 'My Timezone: ' ) : '';/**/
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return int|string
	 */
	public function column_attendees( EE_Event $item ) {
		$attendees_query_args = array(
				'action' => 'default',
				'event_id' => $item->ID()
			);
		$attendees_link = EE_Admin_Page::add_query_args_and_nonce( $attendees_query_args, REG_ADMIN_URL );
		$registered_attendees = EEM_Registration::instance()->get_event_registration_count( $item->ID() );
		return  EE_Registry::instance()->CAP->current_user_can( 'ee_read_registration', 'espresso_registrations_view_registration', $item->ID() ) ? '<a href="' . $attendees_link . '">' . $registered_attendees . '</a>' : $registered_attendees;
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return float
	 */
	public function column_tkts_sold( EE_Event $item ) {
		return EEM_Ticket::instance()->sum(array( array('Datetime.EVT_ID' => $item->ID() )), 'TKT_sold' );
	}


	/**
	 * @param EE_Event $item
	 *
	 * @return string
	 */
	public function column_actions( EE_Event $item ) {
		//todo: remove when attendees is active
		if ( !defined('REG_ADMIN_URL') )
			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
		$actionlinks = array();

		$view_link = get_permalink($item->ID());

		$actionlinks[] = '<a href="' .  $view_link . '" title="' . esc_attr__('View Event', 'event_espresso') . '" target="_blank">';
		$actionlinks[] = '<div class="dashicons dashicons-search"></div></a>';

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_edit_event', 'espresso_events_edit', $item->ID() ) ) {
			$edit_query_args = array(
					'action' => 'edit',
					'post' => $item->ID()
				);
			$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EVENTS_ADMIN_URL );
			$actionlinks[] = '<a href="' . $edit_link . '" title="' . esc_attr__('Edit Event', 'event_espresso') . '"><div class="ee-icon ee-icon-calendar-edit"></div></a>';
		}

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_read_registration', 'espresso_registrations_view_registration', $item->ID() ) ) {
			$attendees_query_args = array(
				'action' => 'default',
				'event_id' => $item->ID()
			);
			$attendees_link = EE_Admin_Page::add_query_args_and_nonce( $attendees_query_args, REG_ADMIN_URL );
			$actionlinks[] = '<a href="' . $attendees_link . '" title="' . esc_attr__('View Registrants', 'event_espresso') . '"><div class="dashicons dashicons-groups"></div></a>';
		}

		$actionlinks = apply_filters( 'FHEE__Events_Admin_List_Table__column_actions__action_links', $actionlinks, $item );

		return $this->_action_string( implode( "\n\t", $actionlinks ), $item, 'div' );
	}


}
