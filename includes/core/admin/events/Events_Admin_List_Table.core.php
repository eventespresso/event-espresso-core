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
 * @subpackage	includes/core/admin/events/Events_Admin_List_Table.core.php
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
			'ajax' => false, //for now
			'screen' => $this->_screen
			);


		$this->_columns = array(
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

	protected function _get_column_actions($item) {
		//todo
	}

	protected function _get_bulk_actions($item) {
		//todo
	}

	protected function _get_table_filters() {
		//todo
	}

	public function get_column_id($item) {}
	public function get_column_name($item) {}
	public function get_column_venue($item) {}
	public function get_column_start_date($item) {}
	public function get_column_start_time($item) {}
	public function get_column_reg_begins($item) {}
	public function get_column_status($item) {}
	public function get_column_attendees($item) {}
	public function get_column_actions($item) {}

}