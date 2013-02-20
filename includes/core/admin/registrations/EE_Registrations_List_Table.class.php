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


class EE_Registrations_List_Table extends EE_Admin_List_Table {



	private $_status;



	/**
	 * 		constructor
	*/
	function __construct( $admin_page ){
        parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
		//echo "registration list table 40";
		//var_dump($this);
	}





	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_admin_page->get_registrations( $this->_per_page );
		$this->_all_data_count = $this->_admin_page->get_registrations( $this->_per_page, TRUE );
	}




	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('registration', 'event_espresso'),
			'plural' => __('registrations', 'event_espresso'),
			'ajax' => TRUE,
			'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
            	'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
           	'REG_ID' => __( 'ID', 'event_espresso' ),
			'event_name' => __( 'Event Title', 'event_espresso' ),
    	       	'DTT_EVT_start' => __( 'Event Date & Time', 'event_espresso' ),
           	'ATT_fname' => __( 'Attendee Name', 'event_espresso' ),
			'REG_count' => __('Att #', 'event_espresso'),
			'REG_code' => __( 'Registration Code', 'event_espresso' ),
			'Reg_status' => __( 'Reg Status', 'event_espresso' ),
			'REG_date' => __( 'Registration Date', 'event_espresso' ),
  			'REG_final_price' => __( 'Price Paid', 'event_espresso' ),
			'REG_att_checked_in' => __('Chkd In', 'event_espresso'),
            	'actions' => __( 'Actions', 'event_espresso' )
        );

        $this->_sortable_columns = array(
          	'REG_date' => array( 'REG_date' => TRUE ),   //true means its already sorted
            	'ATT_fname' => array( 'ATT_fname' => FALSE ),
            	'event_name' => array( 'event_name' => FALSE ),
            	'DTT_EVT_start'	=> array( 'DTT_EVT_start' => FALSE ),
            	'Reg_status' => array( 'Reg_status' => FALSE ),
			'REG_ID' => array( 'REG_ID' => FALSE ),
        	);

        $this->_hidden_columns = array();
	}





	protected function _get_table_filters() {
		$filters = array();

		//todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
		require_once EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/admin.php';
		require_once EE_FF_HELPER;

		$filters[] = espresso_event_months_dropdown( isset($this->_req_data['month_range']) ? sanitize_key($this->_req_data['month_range']) : '' );
		$filters[] = espresso_category_dropdown( isset($this->_req_data['category_id']) ? sanitize_key( $this->_req_data['category_id'] ) : '' );
		$status = array();
		$status[] = array( 'id' => 0, 'text' => __('Select Status', 'event_espresso') );
		foreach ( $this->_status as $key => $value ) {
                $status[] = array( 'id' => $key, 'text' => $value );
            }
		$filters[] = EE_Form_Fields::select_input('reg_status', $status, isset($this->_req_data['reg_status']) ? strtoupper(sanitize_key( $this->_req_data['reg_status'] ) ): '');

		return $filters;
	}




	protected function _add_view_counts() {
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin_screens/events/queries.php' );
		$this->_views['all']['count'] = espresso_total_all_attendees();
		$this->_views['month']['count'] = espresso_total_attendees_this_month();
		$this->_views['today']['count'] = espresso_total_attendees_today();
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
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ATT_ID ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		$link = '<a href="'.$edit_lnk_url.'" title="' . __( 'View Attendee Details', 'event_espresso' ) . '">' . ucwords( $item->REG_att_name ) . '</a>';
		$link .= $item->REG_count == 1 ? '<img class="primary-attendee-star-img" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/star-8x8.png" width="8" height="8" alt="this is the primary attendee"/>' : '';
		return $link;
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
	* 		//removing this... it can be added via the manage_columns_{} filter inside the ticketing addon.
	 */
	/* function column_REG_att_checked_in($item){
		 return ( $item->REG_att_checked_in ) ? event_espresso_paid_status_icon('Checkedin') : '-'; 
	} /**/






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
			return '<span class="reg-overview-free-event-spn">' . $org_options['currency_symbol'] . '0.00</span>';
		}
	
		return '<div class="jst-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item->REG_final_price, 2 ) . '</div>';
		
	}






	/**
	 * 		column_REG_count
	*/
	function column_REG_count($item){
		return $item->REG_count . __( ' of ', 'event_espresso' ) . $item->REG_group_size;
	}







	/**
	 * 		column_REG_att_checked_in
	*/
	function column_REG_att_checked_in($item){		
		if ( $item->REG_att_checked_in ) {
			return __( 'Yes', 'event_espresso' );
		} else {
			return '';
		}		
	}





	/**
	 * 		column_actions
	*/
	function column_actions($item) {

	        //Build row actions
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$item->REG_ID ), REG_ADMIN_URL ), 'view_registration_nonce' );
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ATT_ID ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		
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

//UPDATE `wp_esp_registration` SET `REG_count`=2,`REG_group_size`=2 WHERE `REG_count` = 0

}