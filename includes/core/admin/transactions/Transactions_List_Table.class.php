<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Transactions Table class
 *
 * @package				Event Espresso
 * @subpackage			includes/admin_screens/Transactions_List_Table.class.php
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
if ( ! class_exists( 'WP_List_Table' )) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}


class EE_Admin_Transactions_List_Table extends WP_List_Table {    

	private $_data;
	private $_transactions;
	private $_status;
	private $_entries_per_page_dropdown;


	/**
	 * 		constructor
	*/ 
   function __construct( $data, $status, $entries_per_page_dropdown ){
 
		$this->_data = $this->_transactions = $data;
		$this->_status = $status;
		$this->_entries_per_page_dropdown = $entries_per_page_dropdown;
                
        //Set parent defaults
        parent::__construct( array(
            'singular'  => __( 'Transaction', 'event_espresso' ),     //singular name of the listed records
            'plural'    => __( 'Transactions', 'event_espresso' ),    //plural name of the listed records
            'ajax'      => FALSE        //does this table support ajax?
		) );
	
		$this->prepare_items();
    
	}


	/**
	 * 		get_columns
	*/ 
    function get_columns(){
        $columns = array(
            'cb'        					=> '<input type="checkbox" />', //Render a checkbox instead of text
            'TXN_ID'   				=> __( 'ID', 'event_espresso' ),
			'TXN_timestamp'	=> __( 'Transaction Date', 'event_espresso' ),
            'STS_ID'	   				=> __( 'Status', 'event_espresso' ),
            'TXN_total'	   			=> __( 'Total', 'event_espresso' ),
            'TXN_paid'	   			=> __( 'Paid', 'event_espresso' ),
			'ATT_fname'			=> __( 'Primary Registrant', 'event_espresso' ),
			'ATT_email'				=> __( 'Email Address', 'event_espresso' ),
			'event_name'			=> __( 'Event', 'event_espresso' ),
            'actions'	   				=> __( 'Actions', 'event_espresso' )
        );
        return $columns;
    }



	/**
	 * 		get_sortable_columns
	*/ 
    function get_sortable_columns() {
        $sortable_columns = array(
			'TXN_ID'    				=> array( 'TXN_ID', FALSE ),     //true means its already sorted
            'STS_ID'					=> array( 'STS_ID', FALSE ),
            'event_name'			=> array( 'event_name', FALSE ),
            'ATT_fname'			=> array( 'ATT_fname', FALSE ),
           	'TXN_timestamp'	=> array( 'TXN_timestamp', TRUE ),
      //      'TXN_total'				=> array( 'TXN_total', FALSE ),
        );
        return $sortable_columns;
    }


	/**
	 * 		column_default
	*/ 
   function column_default($item, $column_name){
        switch($column_name){
            case 'TXN_ID':
				return $item[$column_name];
             default:
				return ( isset( $item->$column_name )) ? $item->$column_name : '';
        }
    }







	/**
	 * 		column_cb
	*/ 
    function column_cb($item){
        return sprintf( '<input type="checkbox" name="%1$s[]" value="%2$s" />', $this->_args['singular'],  $item['TXN_ID'] );
    }





	/**
	 * 		column_STS_ID
	*/ 
    function column_STS_ID($item){
		return '<span class="status-'. $item['STS_ID'] .'">' . __( $this->_status[ $item['STS_ID'] ], 'event_espresso' ) . '</span>';
//		$status = ucwords( strtolower( $this->_status[ $item['STS_ID'] ] ));
//		return event_espresso_paid_status_icon( $status ); 

	}




	/**
	 * 		column_ATT_fname
	*/ 
    function column_ATT_fname($item){
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item['ATT_ID'] ), ATT_ADMIN_URL ), 'edit_attendee_nonce' );
		return '<a href="'.$edit_lnk_url.'" title="' . __( 'View Attendee Details', 'event_espresso' ) . '">' . ucwords( $item['ATT_fname'] . ' ' . $item['ATT_lname'] ) . '</a>';
		//return '' . $item['ATT_fname'] . ' ' . $item['ATT_lname'] . '';
	}




	/**
	 * 		column_ATT_email
	*/ 
    function column_ATT_email($item){
		return '<a href="mailto:' . $item['ATT_email'] . '">' . $item['ATT_email'] . '</a>'; 
	}





	/**
	 * 		column_event_name
	*/ 
    function column_event_name($item){	
		//$edit_event_url = add_query_arg( array( 'action'=>'edit', 'event_id'=>$item['id'] ), admin_url( 'admin.php?page=events' ));
		$edit_event_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_transaction', 'txn' => $item['TXN_ID'] ), TXN_ADMIN_URL ), 'view_transaction' );  
		$event_name = stripslashes( html_entity_decode( $item['event_name'], ENT_QUOTES, 'UTF-8' ));		
		return '<a href="' . $edit_event_url . '" title="' . __( 'Edit TXN #', 'event_espresso' ) . $item['TXN_ID'].'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>'; 
	}





	/**
	 * 		column_TXN_total
	*/ 
    function column_TXN_total($item){
		global $org_options;
		if ( $item['TXN_total'] > 0 ) {
			return '<span class="txn-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item['TXN_total'], 2 ) . '</span>';	
		} else {
			return '<span class="txn-overview-free-event-spn">' . __( 'free', 'event_espresso' ) . '</span>';
		}
		
	}





	/**
	 * 		column_TXN_paid
	*/ 
    function column_TXN_paid($item){
		global $org_options;
		
		$item['TXN_total'] = abs( $item['TXN_total'] );
		$item['TXN_paid'] = abs( $item['TXN_paid'] );
		
		if (( $item['TXN_total'] > 0 ) && ( $item['TXN_paid'] >= $item['TXN_total'] )) {
			// paid in full
			return '<span class="txn-overview-full-payment-spn txn-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item['TXN_paid'], 2 ) . '</span>';
			
		} elseif (( $item['TXN_total'] > 0 ) && ( $item['TXN_paid'] > 0 )) {
			// monies owing
			return '<span class="txn-overview-part-payment-spn txn-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item['TXN_paid'], 2 ) . '</span>';
			
		} elseif (( $item['TXN_total'] > 0 ) && ( $item['TXN_paid'] == 0 )) {
			// no payments made
			return '<span class="txn-overview-no-payment-spn txn-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item['TXN_paid'], 2 ) . '</span>';
			
		} else {
			// free event
//			$nothing = array( 'nothing', 'nil', 'nada', 'zero', 'zilch', 'zip', 'zippo', 'not a penny', 'boo', 'diddly-squat' );
//			$rnd = rand( 0, 9 );
//			return '<span class="txn-overview-free-event-spn">' . __( $nothing[ $rnd ], 'event_espresso' ) . '</span>';
			return '<span class="txn-overview-free-event-spn">' . $org_options['currency_symbol'] . '0.00</span>';
		}
		
	}





	/**
	 * 		column_TXN_timestamp
	*/ 
    function column_TXN_timestamp($item){
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_transaction', 'txn'=>$item['TXN_ID'] ), TXN_ADMIN_URL ), 'view_transaction_nonce' );
		$txn_date = '<a href="'.$view_lnk_url.'" title="' . __( 'View Transaction Details', 'event_espresso' ) . '">' . date( 'D M j, Y,    g:i:s a',	$item['TXN_timestamp'] ) . '</a>'; 
		return $txn_date;
	}





	/**
	 * 		column_actions
	*/ 
    function column_actions($item){

        //Build row actions	
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_transaction', 'txn'=>$item['TXN_ID'] ), TXN_ADMIN_URL ), 'view_transaction_nonce' );
		$dl_invoice_lnk_url = add_query_arg( array( 'invoice_launch'=>'true', 'id'=>$item['REG_url_link'], 'html'=>'true', 'admin'=>'true' ), home_url() );
		$view_reg_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$item['REG_ID'] ), admin_url( 'admin.php?page=registrations' )), 'view_registration_nonce' );
		$send_pay_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'send_payment_reminder', 'txn'=>$item['TXN_ID'] ), TXN_ADMIN_URL ), 'send_payment_reminder_nonce' );
		
        //Build row actions
        $view_lnk = '
		<li>
			<a href="'.$view_lnk_url.'" title="' . __( 'View Transaction Details', 'event_espresso' ) . '">
				<img width="16" height="16" alt="' . __( 'View Transaction Details', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/magnifier.png">
			</a>
		</li>';
		
         $dl_invoice_lnk = '
		<li>
			<a title="Download Invoice" target="_blank" href="'.$dl_invoice_lnk_url.'">
				<img width="16" height="16" alt="Download Invoice" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/invoice-1-16x16.png">
			</a>
		</li>';
      
	       $send_pay_lnk = '
		<li>
			<a href="'.$send_pay_lnk_url.'" title="' . __( 'Send Payment Reminder', 'event_espresso' ) . '">
				<img width="20" height="20" alt="' . __( 'Send Payment Reminder', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/payment-reminder-20x20.png">
			</a>
		</li>';
		
	        $view_reg_lnk = '
		<li>
			<a href="'.$view_reg_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">
				<img width="13" height="13" alt="' . __( 'View Registration Details', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/edit.png">
			</a>
		</li>';

			$actions = '
	<ul class="txn-overview-actions-ul">' . 
	$view_lnk . $dl_invoice_lnk . $send_pay_lnk . $view_reg_lnk . '
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
	



	/**
	 * 		prepare_items
	*/ 
    function prepare_items() {
	
//		global $wpdb;
		
        $per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;		
        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();
		
        $this->_column_headers = array($columns, $hidden, $sortable);
        
        $this->process_bulk_action();              
				
        function usort_reorder($a,$b){
            $orderby = (!empty($_REQUEST['orderby'])) ? wp_strip_all_tags( $_REQUEST['orderby'] ) : 'TXN_timestamp'; // If no sort, default to titletimestamp
            $order = (!empty($_REQUEST['order'])) ? wp_strip_all_tags( $_REQUEST['order'] ) : 'desc'; // If no order, default to asc
			
			if ( is_numeric( $a[$orderby] ) && is_numeric( $b[$orderby] )) {
				$result = ( $a[$orderby] == $b[$orderby] ) ? 0 : ( $a[$orderby] < $b[$orderby] ) ? -1 : 1;	
			} else {
				$result = strcasecmp($a[$orderby], $b[$orderby]); // Determine sort order for strings
			}
			
           	return ($order==='asc') ? $result : -$result; // Send final sort direction to usort
        }
        
		$current_page = $this->get_pagenum();        
		$total_items = count($this->_transactions);
		
		// can't sort one item
		if ( $total_items > 1 ) {
			usort($this->_transactions, 'usort_reorder');
		}		

         if ( is_array( $this->_transactions )) {
			$this->_transactions = array_slice($this->_transactions,(($current_page-1)*$per_page),$per_page);
		}
        
        
        $this->items = $this->_transactions;
        
        $this->set_pagination_args( array(
            'total_items' => $total_items,                  //WE have to calculate the total number of items
            'per_page'    => $per_page,                     //WE have to determine how many items to show on a page
            'total_pages' => ceil($total_items/$per_page)   //WE have to calculate the total number of pages
        ) );
    }
    
}



