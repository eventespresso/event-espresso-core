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
 * EE_Admin_Page_list
 *
 * Base list table class for EE_Admin_Page list tables.  The various child classes would just have to extend this class to add their own columns etc.
 *
 * A good resource for implementing WP_List_Table api is: @link http://wpengineer.com/2426/wp_list_table-a-step-by-step-guide/
 *
 * @package		EE_Admin_Page_list
 * @subpackage	includes/core/admin/EE_Admin_Page_list.core.php
 * @abstract
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

if ( ! class_exists( 'WP_List_Table' )) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

abstract class EE_Admin_Page_list extends WP_List_Table {

	protected $_data;
	protected $_view;
	protected $_views;
	protected $_wp_list_args;
	protected $_columns;
	protected $_sortable_columns;
	protected $_per_page;
	protected $_nonce_action_ref;


	/**
	 * constructor
	 * @param array  $data  passed in data for showing in table
	 * @param string $view  current view 
	 * @param array $views possible views[keys], view links[values]
	 * @todo MODIFY THIS so all we get in here is the EE_Admin_Page type object.  We can get our values from the object ;)
	 */
	public function __construct( EE_Admin_Page $admin_page ) {
		$this->_data = $this->_get_data();
		$this->_view = $admin_page->get_view();
		$this->_views = $admin_page->get_views();

		$this->_nonce_action_ref = $this->_view;

		$this->_set_properties();

		//set parent defaults
		parent::__construct($this->_wp_list_args);

		$this->prepare_items();
	}


	/**
	 * _get_data
	 * this method is used to retrieve the data for the given $view and 
	 * @return [type] [description]
	 */
	abstract protected function _get_data();

	/**
	 * set the properties that this class needs to be able to execute wp_list_table properly
	 * properties set:
	 * _wp_list_args = what the arguments required for the parent _wp_list_table.
	 * _columns = set the columns in an array.
	 * _sortable_columns = colums that are sortable (array).
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_properties();

	


	/**
	 * _get_column_actions
	 * this is a wrapper called by WP_List_Table::get_column_actions
	 *
	 * @abstract
	 * @access protected
	 * @param  string $item the item displayed in the row
	 * @return string       html for column actions of the given column
	 */
	abstract protected function _get_column_actions($item);




	/**
	 * _get_bulk_actions
	 * This is a wrapper called by WP_List_Table::get_bulk_actions()
	 *
	 * @abstract
	 * @access protected
	 * @return string html for bulk_actions
	 */
	abstract protected function _get_bulk_actions();






	function prepare_items() {

		$this->_per_page = ( !empty( $_REQUEST['per_page'] ) ) ? absint( $_REQUEST['per_page'] ) : 10;
		$columns = $this->get_columns();
		$hidden = array();
		$sortable = $this->get_sortable_columns();
		$this->_column_headers = array($columns, $hidden, $sortable);
		$total_items = count($this->_data);
		$current_page = $this->get_pagenum();

		$this->process_bulk_action();

		function usort_reorder($a,$b){
            $orderby = (!empty($_REQUEST['orderby'])) ? wp_strip_all_tags( $_REQUEST['orderby'] ) : 'REG_date'; // If no sort, default to titletimestamp
            $order = (!empty($_REQUEST['order'])) ? wp_strip_all_tags( $_REQUEST['order'] ) : 'desc'; // If no order, default to desc

			if ( is_numeric( $a->$orderby ) && is_numeric( $b->$orderby )) {
				$result = ( $a->$orderby == $b->$orderby ) ? 0 : ( $a->$orderby < $b->$orderby ) ? -1 : 1;
			} else {
				$result = strcasecmp($a->$orderby, $b->$orderby); // Determine sort order for strings
			}

           	return ($order==='asc') ? $result : -$result; // Send final sort direction to usort
        }

        // can't sort one item
        if ( $total_items > 1 ) {
        	usort($this->_data, 'usort_reorder');
        }

		if ( is_array( $this->_data) )
			$this->_data = array_slice( $this->_data, (( $current_page-1 ) * $this->_per_page ) , $this->_per_page );

		$this->items = $this->_data;

		$this->set_pagination_args(
			array(
				'total_items' => $total_items,
				'per_page' => $this->_per_page,
				'total_pages' => ceil($total_items / $this->_per_page )
			)
		);
	}

	function get_columns() {
		return $this->_columns;
	}

	function get_views() {
		return $this->_views;
	}

	function get_sortable_columns() {
		return $this->_sortable_columns;
	}

	function extra_tablenav( $which ) {
		echo $this->_entries_per_page_dropdown;
	}

	function get_column_actions($item) {
		return $this->_get_column_actions($item);
	}

	function get_bulk_actions() {
		return $this->_get_bulk_actions();
	}

	function process_bulk_action() {
		//this is not used it is handled by the child EE_Admin_Page class (routes).  However, including here for reference in case there is a case where it gets used.
	}
}