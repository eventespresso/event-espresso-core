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
 * Venues_Admin_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package		Venues_Admin_List_Table
 * @subpackage	includes/core/admin/events/Venues_Admin_List_Table.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Venues_Admin_List_Table extends EE_Admin_List_Table {

	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_data = $this->_admin_page->get_venues( $this->_per_page);
		$this->_all_data_count = $this->_admin_page->get_venues( $this->_per_page, TRUE );
	}





	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('Event Venue', 'event_espresso' ),
			'plural' => __('Event Venues', 'event_espresso' ),
			'ajax' => TRUE, //for now,
			'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
			'cb' => '<input type="checkbox" />',
			'id' => __('ID', 'event_espresso'),
			'name' => __('Name', 'event_espresso'),
			'address' => __('Address', 'event_espresso'),
			'city' => __('City', 'event_espresso'),
			'capacity' => __('Capacity', 'event_espresso'),
			//'shortcode' => __('Shortcode', 'event_espresso'),
			);

		$this->_sortable_columns = array(
			'id' => array( 'id' => true ),
			'name' => array( 'name' => false ),
			'city' => array( 'city' => false ),
			'capacity' => array( 'capacity' => false )
			);

		$this->_hidden_columns = array();
	}






	//todo... add _venue_status in here (which we'll define a EE_Admin_CPT_List_Table for common properties)
	protected function _get_table_filters() {
		return array();
	}





	protected function _add_view_counts() {
		$this->_views['all']['count'] = EEM_Venue::instance()->count();
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_venues', 'espresso_venues_trash_venues' ) ) {
			$this->_views['trash']['count'] = EEM_Venue::instance()->count_deleted();
		}
	}






	public function column_cb($item) {

		return $item->count_related('Event') > 0 && $item->get( 'status' ) === 'trash' ? '<span class="ee-lock-icon"></span>' : sprintf( '<input type="checkbox" name="venue_id[]" value="%s" />', $item->ID());
	}




	public function column_id($item) {
		$content = $item->ID();
		$content .= '  <span class="show-on-mobile-view-only">' . $item->name() . '</span>';
		return $content;
	}


	public function column_name($item) {
		$edit_query_args = array(
			'action' => 'edit',
			'post' => $item->ID()
		);

		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EE_VENUES_ADMIN_URL );

		$statuses = EEM_Venue::instance()->get_status_array();
		$actions = $this->_column_name_action_setup( $item );
		$content = EE_Registry::instance()->CAP->current_user_can( 'ee_edit_venue', 'espresso_venues_edit', $item->ID() ) ? '<strong><a class="row-title" href="' . $edit_link . '">' . stripslashes_deep($item->name()) . '</a></strong>' : $item->name();
		$content .= $item->status() == 'draft' ? ' - <span class="post-state">' . $statuses['draft'] . '</span>' : '';
		$content .= $this->row_actions($actions);
		return $content;
	}


	/**
	 * Used to setup the actions for the Venue name column
	 * @param EE_Venue $item
	 * @return array()
	 */
	protected function _column_name_action_setup( EE_Venue $item ) {
		$actions = array();

		if ( EE_Registry::instance()->CAP->current_user_can('ee_edit_venue', 'espresso_venues_edit', $item->ID() ) ) {
			$edit_query_args = array(
				'action' => 'edit',
				'post' => $item->ID()
			);
			$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EE_VENUES_ADMIN_URL );
			$actions['edit'] = '<a href="' . $edit_link . '" title="' . esc_attr__('Edit Venue', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>';

		}


		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_venue', 'espresso_venues_trash_venue', $item->ID() ) ) {
			$trash_event_query_arg = array(
				'action' => 'trash_venue',
				'VNU_ID' => $item->ID()
			);
			$trash_venue_link = EE_Admin_Page::add_query_args_and_nonce( $trash_event_query_arg, EE_VENUES_ADMIN_URL );
		}

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_venue', 'espresso_venues_restore_venue', $item->ID() ) ) {
			$restore_venue_query_args = array(
				'action' => 'restore_venue',
				'VNU_ID' => $item->ID()
			);
			$restore_venue_link = EE_Admin_Page::add_query_args_and_nonce( $restore_venue_query_args, EE_VENUES_ADMIN_URL );
		}

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_venue', 'espresso_venues_delete_venue', $item->ID() ) ) {
			$delete_venue_query_args = array(
				'action' => 'delete_venue',
				'VNU_ID' => $item->ID()
			);
			$delete_venue_link = EE_Admin_Page::add_query_args_and_nonce( $delete_venue_query_args, EE_VENUES_ADMIN_URL );
		}

		$view_link = get_permalink($item->ID());

		switch ( $item->get( 'status' ) ) {
			case 'trash' :
				if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_venue', 'espresso_venues_restore_venue', $item->ID() ) ) {
					$actions['restore_from_trash'] = '<a href="' . $restore_venue_link . '" title="' . esc_attr__('Restore from Trash', 'event_espresso') . '">' . __('Restore from Trash', 'event_espresso') . '</a>';
				}
				if (  $item->count_related('Event') === 0 && EE_Registry::instance()->CAP->current_user_can( 'ee_delete_venue', 'espresso_venues_delete_venue', $item->ID() ) ) {
					$actions['delete permanently'] = '<a href="' . $delete_venue_link . '" title="' . esc_attr__('Delete Permanently', 'event_espresso') . '">' . __('Delete Permanently', 'event_espresso') . '</a>';
				}
				break;
			default :
				$actions['view'] = '<a href="' . $view_link . '" title="' . esc_attr__('View Venue', 'event_espresso') . '">' . __('View', 'event_espresso') . '</a>';
				if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_venue', 'espresso_venues_trash_venue', $item->ID() ) ) {
					$actions['move to trash'] = '<a href="' . $trash_venue_link . '" title="' . esc_attr__('Trash Event', 'event_espresso') . '">' . __('Trash', 'event_espresso') . '</a>';
				}
		}
		return $actions;
	}



	public function column_address($item) {
		return $item->address();
	}



	public function column_city($item) {
		return $item->city();
	}



	public function column_capacity($item) {
		return $item->capacity();
	}



	public function column_shortcode($item) {
		$content = '[ESPRESSO_VENUE id=' . $item->ID() . ']';
		return $content;
	}

} //end Venues_Admin_List_Table() class
