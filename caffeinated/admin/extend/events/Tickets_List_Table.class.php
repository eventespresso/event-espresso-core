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
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Tickets_List_Table
 *
 * Class for preparing the table listing all the default tickets
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package			Tickets List Table
 * @subpackage		caffeinated/admin/new/tickets/Tickets_List_Table.core.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Tickets_List_Table extends EE_Admin_List_Table {


	protected function _setup_data() {
		$trashed = $this->_admin_page->get_view() == 'trashed' ? TRUE : FALSE;
		$this->_data = $this->_admin_page->get_default_tickets( $this->_per_page, FALSE, $trashed );
		$this->_all_data_count = $this->_admin_page->get_default_tickets( $this->_per_page, TRUE, FALSE );
		$this->_trashed_count = $this->_admin_page->get_default_tickets( $this->_per_page, TRUE, TRUE );
	}




	protected function _set_properties() {
		$this->_wp_list_args = array(
				'singular' => __('ticket', 'event_espresso'),
				'plural' => __('tickets', 'event_espresso'),
				'ajax' => TRUE,
				'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
				'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
				'TKT_name' => __('Name', 'event_espresso'),
				'TKT_description' => __('Description', 'event_espresso'),
				'TKT_qty' => __('Quantity', 'event_espresso'),
				'TKT_uses' => __('Datetimes', 'event_espresso'),
				'TKT_min' => __('Minimum', 'event_espresso'),
				'TKT_max' => __('Maximum', 'event_espresso'),
				'TKT_price' => __('Price', 'event_espresso'),
				'TKT_taxable' => __('Taxable', 'event_espresso')
			);

        $this->_sortable_columns = array(
				// TRUE means its already sorted
				'TKT_name' => array( 'TKT_name' => TRUE ),
				'TKT_description' => array( 'TKT_description' => FALSE ),
				'TKT_qty' => array( 'TKT_qty' => FALSE ),
				'TKT_uses' => array( 'TKT_uses' => FALSE ),
				'TKT_min' => array( 'TKT_min' => FALSE ),
				'TKT_max' => array( 'TKT_max' => FALSE ),
				'TKT_price' => array( 'TKT_price' => FALSE )
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



	function column_cb($item) {
		return $item->ID() === 1 ? '<span class="ee-lock-icon"></span>' : sprintf( '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />', /* $1%s */ $item->ID() );

	}



	function column_TKT_name($item) {
		//build row actions
		$actions = array();

		//trash links
		if ( $item->ID() !== 1 ) {
			if ( $this->_view == 'all' ) {
				$trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'trash_ticket', 'TKT_ID' => $item->ID() ), EVENTS_ADMIN_URL );
				$actions['trash'] = '<a href="' . $trash_lnk_url . '" title="' . esc_attr__('Move Ticket to trash', 'event_espresso') . '">' . __('Trash', 'event_espresso') . '</a>';
			} else {
				// restore price link
				$restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'restore_ticket', 'TKT_ID'=>$item->ID() ), EVENTS_ADMIN_URL );
				$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . esc_attr__( 'Restore Ticket', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
				// delete price link
				$delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'delete_ticket', 'TKT_ID'=>$item->ID() ), EVENTS_ADMIN_URL );
				$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . esc_attr__( 'Delete Ticket Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
			}
		}

		return $item->get('TKT_name') . $this->row_actions( $actions );
	}




	function column_TKT_description($item) {
		return $item->get('TKT_description');
	}



	function column_TKT_qty($item) {
		return $item->get_pretty('TKT_qty','text');
	}



	function column_TKT_uses($item) {
		return $item->get_pretty('TKT_uses','text');
	}


	function column_TKT_min($item) {
		return $item->get('TKT_min');
	}



	function column_TKT_max($item) {
		return $item->get_pretty('TKT_max','text');
	}



	function column_TKT_price($item) {
		return EEH_Template::format_currency($item->get('TKT_price'));
	}



	function column_TKT_taxable($item) {
		return $item->get('TKT_taxable') ? __('Yes', 'event_espresso') : __('No', 'event_espresso');
	}

} //end Tickets_List_Table
