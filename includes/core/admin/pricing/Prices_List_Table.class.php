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
 * Prices_List_Table
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
class Prices_List_Table extends EE_Admin_List_Table {

	private $_PRT;

	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$this->_PRT = EEM_Price_Type::instance();
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$trashed = $this->_admin_page->get_view() == 'trashed' ? TRUE : FALSE;		
		$this->_data = $this->_admin_page->get_prices_overview_data( $this->_per_page, FALSE, $trashed );
		$this->_all_data_count = $this->_admin_page->get_prices_overview_data( $this->_per_page, TRUE, FALSE );
		$this->_trashed_count = $this->_admin_page->get_prices_overview_data( $this->_per_page, TRUE, TRUE );
	}	




	protected function _set_properties() {
		$this->_wp_list_args = array(
				'singular' => __('price', 'event_espresso'),
				'plural' => __('prices', 'event_espresso'),
				'ajax' => TRUE,
				'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
				'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
				'name' => 'Name',
				'type' => 'Price Type',
				'description' => 'Description',
				'amount' => 'Amount',
				'price_date' => 'Date Control',
				'active' => 'Active?'
			);

        $this->_sortable_columns = array(
				// TRUE means its already sorted
				'name' => array('name', false), 
				'type' => array('type', false),
				'amount' => array('amount', false)
	        	);

        $this->_hidden_columns = array(
			);
			
	}





	protected function _get_table_filters() {
	}




	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_all_data_count;		
		$this->_views['trashed']['count'] = $this->_trashed_count;		
	}






	function column_default($item) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}




	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', /* $1%s */ $item->ID() );
	}





	function column_name($item) {
		
		//Build row actions
		$actions = array();
		// edit price link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_price', 'id'=>$item->ID() ), PRICING_ADMIN_URL ), 'edit_price_nonce' );
		$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Price', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Price', 'event_espresso' ) . '">' . stripslashes( $item->name() ) . '</a>';

		if ($this->_view == 'in_use') {
			// trash price link
			$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_price', 'id'=>$item->ID(), 'noheader' => TRUE ), PRICING_ADMIN_URL ), 'trash_price_nonce' );
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Price to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
		} else {
			// restore price link
			$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_price', 'id'=>$item->ID(), 'noheader' => TRUE ), PRICING_ADMIN_URL ), 'restore_price_nonce' );
			$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Price', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			// delete price link
			$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_price', 'id'=>$item->ID(), 'noheader' => TRUE ), PRICING_ADMIN_URL ), 'delete_price_nonce' );
			$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Price Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
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







}