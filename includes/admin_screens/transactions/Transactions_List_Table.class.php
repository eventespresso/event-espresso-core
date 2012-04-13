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

	private $_status;
	private $_entries_per_page_dropdown;


	/**
	 * 		constructor
	*/ 
   function __construct( $data, $status, $entries_per_page_dropdown ){
 
		$this->_status = $status;
		$this->_entries_per_page_dropdown = $entries_per_page_dropdown;
                
        //Set parent defaults
        parent::__construct( array(
            'singular'  => 'Transaction',     //singular name of the listed records
            'plural'    => 'Transactions',    //plural name of the listed records
            'ajax'      => FALSE        //does this table support ajax?
		) );
	
		self::prepare_items( $data );
    
	}


	/**
	 * 		get_columns
	*/ 
    function get_columns(){
        $columns = array(
            'cb'        					=> '<input type="checkbox" />', //Render a checkbox instead of text
            'TXN_ID'   				=> 'ID',
			'TXN_timestamp'	=> 'Transaction Date',
            'STS_ID'	   				=> 'Status',
            'TXN_total'	   			=> 'Total',
			'ATT_fname'			=> 'Primary Registrant',
			'ATT_email'				=> 'Email Address',
			'event_name'			=> 'Event',
            'actions'	   				=> 'Actions'
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
            'TXN_total'				=> array( 'TXN_total', FALSE ),
        );
        return $sortable_columns;
    }


	/**
	 * 		column_default
	*/ 
   function column_default($item, $column_name){
        switch($column_name){
            case 'TXN_ID':
            case 'event_name':
                return wp_trim_words( $item[$column_name], 30, '...' );
            default:
                return print_r($item,true); //Show the whole array for troubleshooting purposes
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
		return '<span class="status-'. $item['STS_ID'] .'">' . $this->_status[ $item['STS_ID'] ] . '</span>';
	}




	/**
	 * 		column_ATT_fname
	*/ 
    function column_ATT_fname($item){
		return '' . $item['ATT_fname'] . ' ' . $item['ATT_lname'] . '';
	}




	/**
	 * 		column_ATT_email
	*/ 
    function column_ATT_email($item){
		return '<a href="mailto:' . $item['ATT_email'] . '">' . $item['ATT_email'] . '</a>'; 
	}





	/**
	 * 		column_TXN_total
	*/ 
    function column_TXN_total($item){
		global $org_options;
		//return '<div style="text-align:right;">' . $org_options['currency_symbol'] . ' ' . number_format( $item['TXN_total'], 2 ) . '</div>';
		return $org_options['currency_symbol'] . ' ' . number_format( $item['TXN_total'], 2 );
	}





	/**
	 * 		column_TXN_timestamp
	*/ 
    function column_TXN_timestamp($item){
		return date( 'D M j, Y,    g:i:s a',	$item['TXN_timestamp'] );
	}





	/**
	 * 		column_actions
	*/ 
    function column_actions($item){
        
        //Build row actions	
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_transaction', 'txn'=>$item['TXN_ID'] ), TXN_ADMIN_URL ), 'view_transaction' );
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_transaction', 'txn'=>$item['TXN_ID'] ), TXN_ADMIN_URL ), 'edit_transaction' );
		$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_transaction', 'txn'=>$item['TXN_ID'] ), TXN_ADMIN_URL ), 'delete_transaction' );
		
        //Build row actions
        $view_lnk = '
		<a href="'.$view_lnk_url.'" title="View Transaction Details">view
			<!--<img width="14" height="14" alt="View Transaction Details" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/magnifier.png">-->
		</a>';
		
       $edit_lnk = '
		<a href="'.$edit_lnk_url.'" title="Edit Transaction">edit
			<!--<img width="14" height="14" alt="Edit Transaction" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/edit.png">-->
		</a>';
		
         $delete_lnk = '
		<a class="confirm-delete" rel="Transaction" href="'.$delete_lnk_url.'" title="Delete Transaction">delete
			<!--<img width="16" height="16" alt="Delete Transaction" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/icons/remove.gif">-->
		</a>';
        
//		<a title="View attendees for this event" href="admin.php?page=attendees&event_admin_reports=list_attendee_payments&event_id=1">Dooms Night 2011 &ndash; Halloween Party </a>
        //Return the title contents
        //return $this->row_actions($actions);
        //return $edit_lnk . '&nbsp;|&nbsp;' . $delete_lnk;
        return $view_lnk . '&nbsp;|&nbsp;' . $edit_lnk . '&nbsp;|&nbsp;' . $delete_lnk;

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
    function prepare_items( $data ) {
	
//		global $wpdb;
		
        $per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;		
        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();
		
        $this->_column_headers = array($columns, $hidden, $sortable);
        
        $this->process_bulk_action();              
				
        function usort_reorder($a,$b){
            $orderby = (!empty($_REQUEST['orderby'])) ? $_REQUEST['orderby'] : 'TXN_timestamp'; // If no sort, default to titletimestamp
            $order = (!empty($_REQUEST['order'])) ? $_REQUEST['order'] : 'asc'; // If no order, default to asc
			
			if ( is_numeric( $a[$orderby] ) && is_numeric( $b[$orderby] )) {
				$result = ( $a[$orderby] == $b[$orderby] ) ? 0 : ( $a[$orderby] < $b[$orderby] ) ? -1 : 1;	
			} else {
				$result = strcmp($a[$orderby], $b[$orderby]); // Determine sort order for strings
			}
			
           	return ($order==='asc') ? $result : -$result; // Send final sort direction to usort
        }
        
		$current_page = $this->get_pagenum();        
		$total_items = count($data);
		
		// can't sort one item
		if ( $total_items > 1 ) {
			usort($data, 'usort_reorder');
		}		

         if ( is_array( $data )) {
			$data = array_slice($data,(($current_page-1)*$per_page),$per_page);
		}
        
        
        $this->items = $data;
        
        $this->set_pagination_args( array(
            'total_items' => $total_items,                  //WE have to calculate the total number of items
            'per_page'    => $per_page,                     //WE have to determine how many items to show on a page
            'total_pages' => ceil($total_items/$per_page)   //WE have to calculate the total number of pages
        ) );
    }
    
}



