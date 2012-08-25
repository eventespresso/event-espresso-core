<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link			{@link http://www.eventespresso.com}
 * @ since		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Registrations Table class
 *
 * @package			Event Espresso
 * @subpackage		includes/admin_screens/Registrations_List_Table.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
if ( ! class_exists( 'WP_List_Table' )) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}


class EE_Admin_Registrations_List_Table extends WP_List_Table {

	private $_data;
	private $_registrations;
	private $_status;
	private $_entries_per_page_dropdown;
	private $_ticketing_installed;


	/**
	 * 		constructor
	*/
	function __construct( $data, $status, $entries_per_page_dropdown, $ticketing_installed ){

		$this->_data = $this->_registrations = $data;
		$this->_status = $status;
		$this->_entries_per_page_dropdown = $entries_per_page_dropdown;
		$this->_ticketing_installed = $ticketing_installed;

        //Set parent defaults
        parent::__construct( array(
            	'singular'  	=> 'Registration',     //singular name of the listed records
           		'plural'   	 	=> 'Registrations',    //plural name of the listed records
            	'ajax'      		=> FALSE        //does this table support ajax?
		) );

		$this->prepare_items();

	}





	/**
	 * 		prepare_items
	*/
    function prepare_items() {

        $per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;
        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();
        $this->_column_headers = array($columns, $hidden, $sortable);

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

		$current_page = $this->get_pagenum();
		$total_items = count($this->_registrations);

		// can't sort one item
		if ( $total_items > 1 ) {
			usort($this->_registrations, 'usort_reorder');
		}

         if ( is_array( $this->_registrations )) {
			$this->_registrations = array_slice($this->_registrations,(($current_page-1)*$per_page),$per_page);
		}


        $this->items = $this->_registrations;

        $this->set_pagination_args( array(
            'total_items' => $total_items,                  //WE have to calculate the total number of items
            'per_page'    => $per_page,                     //WE have to determine how many items to show on a page
            'total_pages' => ceil($total_items/$per_page)   //WE have to calculate the total number of pages
        ) );
    }






	/**
	 * 		get_columns
	*/
	function get_columns(){
		// 	Attendee Name 	Registration Code 	Registration Date 	Event Title 	Event Date & Time 	Price Paid 	Payment 	TXN ID 	Actions
        $columns = array(
            	'cb'        						=> '<input type="checkbox" />', //Render a checkbox instead of text
            	'REG_ID'   					=> __( 'ID', 'event_espresso' ),
				'REG_date'					=> __( 'Registration Date', 'event_espresso' ),
				'Reg_status'				=> __( 'Reg Status', 'event_espresso' ),
            	'ATT_fname'   				=> __( 'Attendee Name', 'event_espresso' ),
				'REG_code'					=> __( 'Registration Code', 'event_espresso' ),
				'REG_att_checked_in'	=> __( 'Attended', 'event_espresso' ),
 				'event_name'				=> __( 'Event Title', 'event_espresso' ),
    	       	'DTT_EVT_start'			=> __( 'Event Date & Time', 'event_espresso' ),
				'REG_final_price'			=> __( 'Price Paid', 'event_espresso' ),
            	'actions'	   					=> __( 'Actions', 'event_espresso' )
        );
		
		if ( ! $this->_ticketing_installed ) {
			unset( $columns['REG_att_checked_in'] );
		}
        return $columns;
    }



	/**
	 * 		get_sortable_columns
	*/
   	function get_sortable_columns() {
        $sortable_columns = array(
          		'REG_date'			=> array( 'REG_date', TRUE ),   //true means its already sorted
            	'ATT_fname'		=> array( 'ATT_fname', FALSE ),
            	'event_name'		=> array( 'event_name', FALSE ),
            	'DTT_EVT_start'	=> array( 'DTT_EVT_start', FALSE ),
            	'Reg_status'		=> array( 'Reg_status', FALSE ),
				'REG_ID'    			=> array( 'REG_ID', FALSE ),
        );
        return $sortable_columns;
    }




	/**
	 * 		column_default
	*/
   	function column_default($item, $column_name){
 		switch( $column_name ) {

			case 'DTT_EVT_start' :
				return date( 'D M j, Y  g:i a',	$item->$column_name );
			break;

			default :
				return isset( $item->$column_name ) ? $item->$column_name : '';
		}
    }







	/**
	 * 		column_cb
	*/
    function column_cb($item){
        return sprintf( '<input type="checkbox" name="REG_ID[]" value="%1$s" />', $item->REG_ID );
    }





	/**
	 * 		REG_date
	*/
	function column_REG_date($item){
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$item->REG_ID ), REG_ADMIN_URL ), 'view_registration_nonce' );	
		$REG_date = '<a href="'.$view_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">' . date( 'D M j, Y  g:i a',	$item->REG_date ) . '</a>';	
		return $REG_date;	
	}




	/**
	 * 		column_Reg_status
	*/
   	function column_Reg_status($item){
		return '<span class="status-'. $item->REG_status .'">' . __( $this->_status[ $item->REG_status ], 'event_espresso' ) . '</span>';
	}




	/**
	 * 		column_ATT_fname
	*/
   	function column_ATT_fname($item){
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ATT_ID ), ATT_ADMIN_URL ), 'edit_attendee_nonce' );
		return '<a href="'.$edit_lnk_url.'" title="' . __( 'View Attendee Details', 'event_espresso' ) . '">' . ucwords( $item->ATT_fname . ' ' . $item->ATT_lname ) . '</a>';
		//return '' . ucwords( $item->ATT_fname ) . ' ' . ucwords( $item->ATT_lname ) . '';
	}





	/**
	* 		column_event_name
	*/
	function column_event_name($item){
		$edit_event_url = add_query_arg( array( 'event_id'=>$item->EVT_ID ), REG_ADMIN_URL );
		$event_name = stripslashes( html_entity_decode( $item->event_name, ENT_QUOTES, 'UTF-8' ));
		return '<a href="' . $edit_event_url . '" title="' . __( 'Edit Event #', 'event_espresso' ) . $item->EVT_ID.'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>';
	}





	/**
	* 		column_REG_att_checked_in
	*/
	function column_REG_att_checked_in($item){
		 return ( $item->REG_att_checked_in ) ? event_espresso_paid_status_icon('Checkedin') : '-' /*event_espresso_paid_status_icon('NotCheckedin')*/; 
	}






	/**
	 * 		column_REG_final_price
	*/
	function column_REG_final_price($item){
	
		global $org_options;
		$item->REG_final_price = abs( $item->REG_final_price );
		
		if ( $item->REG_final_price > 0 ) {
			return '<span class="reg-overview-full-payment-spn reg-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item->REG_final_price, 2 ) . '</span>';
			
		} else {
			// free event
			return '<span class="reg-overview-free-event-spn">' . __( 'zip', 'event_espresso' ) . '</span>';
		}
	
		return '<div class="jst-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item->REG_final_price, 2 ) . '</div>';
		
	}






	/**
	 * 		column_actions
	*/
	function column_actions($item) {

	        //Build row actions
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$item->REG_ID ), REG_ADMIN_URL ), 'view_registration_nonce' );
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'att'=>$item->ATT_ID ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		
		// page=attendees&event_admin_reports=resend_email&registration_id=43653465634&event_id=2&form_action=resend_email
		//$resend_reg_lnk_url_params = array( 'action'=>'resend_registration', 'reg'=>$item->REG_ID );
		$resend_reg_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'resend_registration', 'reg'=>$item->REG_ID ), REG_ADMIN_URL ), 'resend_registration_nonce' );
		
		// page=transactions&action=view_transaction&txn=256&_wpnonce=6414da4dbb
		$view_txn_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_transaction', 'txn'=>$item->TXN_ID ), admin_url( 'admin.php?page=transactions' ) ), 'view_transaction_nonce' );

	        //Build row actions
	        $view_lnk = '
		<li>
			<a href="'.$view_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">
				<img width="16" height="16" alt="' . __( 'View Registration Details', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/magnifier.png">
			</a>
		</li>';

	       $edit_lnk = '
		<li>
			<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee Details', 'event_espresso' ) . '">
				<img width="16" height="16" alt="' . __( 'Edit Attendee Details', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/user_edit.png">
			</a>
		</li>';

	         $resend_reg_lnk = '
		<li>
			<a href="'.$resend_reg_lnk_url.'" title="' . __( 'Resend Registration Details', 'event_espresso' ) . '">
				<img width="16" height="16" alt="' . __( 'Resend Registration Details', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/email_go.png">
			</a>
		</li>';

	         $dl_tckt_lnk = '
		<li>
			<a href="' . add_query_arg( array( 'ticket_launch'=>'true', 'reg'=>$item->REG_ID,  'html'=>'true' ), site_url() ) . '" target="_blank" title="' . __( 'Download Ticket', 'event_espresso' ) . '">
				<img width="16" height="16" alt="' . __( 'Download Ticket', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/ticket-arrow-icon.png">
			</a>
		</li>';

	         $view_txn_lnk = '
		<li>
			<a href="'.$view_txn_lnk_url.'"  title="' . __( 'View Transaction', 'event_espresso' ) . '">
				<img width="16" height="16" alt="View Transaction" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/money.png">
			</a>
		</li>';

			$actions = '
	<ul class="reg-overview-actions-ul">' . 
	$view_lnk . $edit_lnk . $resend_reg_lnk . $dl_tckt_lnk . $view_txn_lnk . '
	</ul>';
			
			return $actions;
				
	}




	/**
	 * 		get_bulk_actions
	*/
    function get_bulk_actions() {
        $actions = array(
//            'delete'    => 'Delete'
        );
        return $actions;
    }



	/**
	 * 		process_bulk_action
	*/
    function process_bulk_action() {

        //Detect when a bulk action is being triggered...
/*        if( $this->current_action() === 'delete' ) {
			$success = FALSE;
			foreach ( $_GET['venueseatingchart'] as $ID ) {
				$success = EE_VSC_Admin::_delete_chart( $ID, TRUE );
			}
			if ( $success ) {
				EE_VSC_Admin::add_notices( array( 'success' => 'All Seating Charts were successfully deleted.' ));
			} else {
				EE_VSC_Admin::add_notices( array( 'errors' => 'An error occured. One or more Seating Charts were not deleted.' ));
			}
        }*/

    }

	function extra_tablenav( $which ) {
		echo $this->_entries_per_page_dropdown;
	}





}



