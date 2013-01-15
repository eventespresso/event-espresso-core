<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

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
 * Event_Categories_Admin_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package			Event_Categories_Admin_List_Table
 * @subpackage		includes/core/admin/pricing_manager/Prices_List_Table.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Prices_List_Table extends WP_List_Table {

	public function __construct( &$admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_admin_page->get_categories( $this->_per_page, $this->_current_page);
		$this->_all_data_count = $this->_admin_page->get_categories( $this->_per_page, $this->_current_page, TRUE );
	}	





	public function __construct( $data = array(), $view = NULL, $views = NULL, $entries_per_page_dropdown = FALSE ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		
		$this->_data = $data;
		$this->_view = $view;
		$this->_views = $views;
		$this->_entries_per_page_dropdown = $entries_per_page_dropdown;

		// Specific to this extension of WP_List_Table
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$this->_PRT = EEM_Price_Type::instance();

		//Set parent defaults
		parent::__construct(array(
				'singular' => 'price', //singular name of the listed records
				'plural' => 'prices', //plural name of the listed records
				'ajax' => false //does this table support ajax?
		));
		
		$this->prepare_items();
		
	}
	
	
	

	function prepare_items() {

		$per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;
		$columns = $this->get_columns();
		$hidden = array();
		$sortable = $this->get_sortable_columns();
		$this->_column_headers = array($columns, $hidden, $sortable);

		$current_page = $this->get_pagenum();
		$total_items = count( $this->_data );

		$this->_data = array_slice( $this->_data, (( $current_page-1 ) * $per_page ), $per_page );
		//printr( $prices, '$prices <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

        $this->items = $this->_data;
		
		$this->set_pagination_args(
				array(
						'total_items' => $total_items, //WE have to calculate the total number of items
						'per_page' => $per_page, //WE have to determine how many items to show on a page
						'total_pages' => ceil($total_items / $per_page) //WE have to calculate the total number of pages
				)
		);
		
	}




	function extra_tablenav( $which ) {
		echo $this->_entries_per_page_dropdown;
	}




	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', /* $1%s */ $item->ID() );
	}





	function column_name($item) {
		
		//Build row actions
		$actions = array();
		// edit price link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_event_price', 'id'=>$item->ID() ), EVT_PRC_ADMIN_URL ), 'edit_event_price_nonce' );
		$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Event Price', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Event Price', 'event_espresso' ) . '">' . stripslashes( $item->name() ) . '</a>';

		if ($this->_view == 'in_use') {
			// trash price link
			$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_event_price', 'id'=>$item->ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'trash_event_price_nonce' );
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Event Price to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
		} else {
			// restore price link
			$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_event_price', 'id'=>$item->ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'restore_event_price_nonce' );
			$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Event Price', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			// delete price link
			$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_event_price', 'id'=>$item->ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'delete_event_price_nonce' );
			$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Event Price Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
		}

		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span>%3$s',
										/* $1%s */ $name_link,
										/* $2%s */ $item->ID(),
										/* $3%s */ $this->row_actions( $actions )
		);
	}





	function column_type($item) {
		return $this->_PRT->type[$item->type()]->name();
	}





	function column_description($item) {
		return stripslashes( $item->desc() );
	}





	function column_amount($item) {
		global $org_options;
		if ($this->_PRT->type[$item->type()]->is_percent()) {
			return '<div class="pad-amnt-rght">' . number_format($item->amount(), 1) . '%</div>';
		} else {
			return '<div class="pad-amnt-rght">' . $org_options['currency_symbol'] . number_format($item->amount(), 2) . '</div>';
		}
	}





	function column_price_date($item) {
		$uses_date = $item->use_dates() ? 'Yes' : '';
		return '<div class="jst-cntr">' . $uses_date . '</div>';
	}





	function column_active($item) {
		$active = $item->is_active() ? 'Yes' : '';
		return '<div class="jst-cntr">' . $active . '</div>';
	}





	function get_columns() {
		$columns = array(
				'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
				'name' => 'Name',
				'type' => 'Price Type',
				'description' => 'Description',
				'amount' => 'Amount',
//				'date' => 'Triggered by Date',
				'price_date' => 'Date Control',
				'active' => 'Active?'
		);
		return $columns;
	}





	function get_sortable_columns() {
		$sortable_columns = array(
				'name' => array('name', false), //true means its already sorted
				'type' => array('type', false),
				'amount' => array('amount', false)
		);
		return $sortable_columns;
	}









	function get_bulk_actions() {
		return $this->_views[ $this->_view ]['bulk_action'];	
	}





}