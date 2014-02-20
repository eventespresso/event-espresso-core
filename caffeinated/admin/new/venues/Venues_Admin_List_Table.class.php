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
		$this->_views['all']['count'] = $this->_all_data_count;
	}






	public function column_cb($item) {

		return $item->count_related('Event') > 0 ? '<span class="ee-lock-icon"></span>' : sprintf( '<input type="checkbox" name="venue_id[]" value="%s" />', $item->ID());
	}



	public function column_default($item) {
		return isset( $item->column_name ) ? $item->column_name : '';
	}


	public function column_id($item) {
		return $item->ID();
	}


	public function column_name($item) {
		$edit_query_args = array(
			'action' => 'edit',
			'post' => $item->ID()
		);

		$delete_query_args = array(
			'action' => 'delete_venue',
			'post' => $item->ID()
		);

		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EE_VENUES_ADMIN_URL );
		$delete_link = EE_Admin_Page::add_query_args_and_nonce( $delete_query_args, EE_VENUES_ADMIN_URL );

		$actions = array(
			'edit' => '<a href="' . $edit_link . '" title="' . __('Edit Venue', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>'
			);

		if ( $item->count_related('Event') === 0 )
			$actions['delete'] = '<a href="' . $delete_link . '" title="' . __('Delete Venue', 'event_espresso') . '">' . __('Delete', 'event_espresso') . '</a>';

		$statuses = EEM_Venue::instance()->get_status_array();

		$content = '<strong><a class="row-title" href="' . $edit_link . '">' . stripslashes_deep($item->name()) . '</a></strong>';
		$content .= $item->status() == 'draft' ? ' - <span class="post-state">' . $statuses['draft'] . '</span>' : '';
		$content .= $this->row_actions($actions);
		return $content;
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