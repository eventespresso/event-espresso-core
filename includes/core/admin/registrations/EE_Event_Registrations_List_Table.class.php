<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


class EE_Event_Registrations_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_view != 'trash' ? $this->_admin_page->get_event_attendees( $this->_per_page ) : $this->_admin_page->get_event_attendees( $this->_per_page, FALSE, TRUE );
		$this->_all_data_count = $this->_view != 'trash' ? $this->_admin_page->get_event_attendees(  $this->_per_page, TRUE ) : $this->_admin_page->get_event_attendees(  $this->_per_page, TRUE, TRUE );
	}




	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('attendee', 'event_espresso'),
			'plural' => __('attendees', 'event_espresso'),
			'ajax' => TRUE,
			'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
				'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
				'REG_att_checked_in' => __('Check In', 'event_espresso'),
				'REG_count' => __('Att #', 'event_espresso'),
				'ATT_name' =>  __('Attendee', 'event_espresso'),
				'ATT_email' =>  __('Email Address', 'event_espresso'),
				'REG_date' => __('Registration Date', 'event_espresso'),
				'REG_code' => __( 'Registration Code', 'event_espresso' ),
				'Reg_status' => __( 'Reg Status', 'event_espresso' ),
				'REG_final_price' => __('Ticket Price', 'event_espresso'),
				'TXN_paid' => __('Paid', 'event_espresso'),
				'PRC_name' => __('Ticket Option', 'event_espresso')
			);


		$this->_sortable_columns = array(
			 //true means its already sorted
			'ATT_name' => array( 'ATT_name' => TRUE ),
			'REG_code' => array( 'REG_code' => TRUE ),
			'REG_date' => array( 'REG_date' => FALSE )
		);

		$this->_hidden_columns = array();
	}





	protected function _get_table_filters() {
		return array();
	}





	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->get_event_attendees( $this->_per_page, TRUE );
		//$this->_views['trash']['count'] = $this->_admin_page->get_event_attendees( $this->_per_page, TRUE, TRUE );
	}





	function column_default( $item, $column_name ) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}





	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', $item->REG_ID );
	}








	/**
	 * 		column_REG_att_checked_in
	*/
	function column_REG_att_checked_in($item){		
		if ( $item->REG_att_checked_in ) {
			$chk_out_url = wp_nonce_url( add_query_arg( array( 'action'=>'attendee_check_out', 'id'=>$item->REG_ID, 'reg'=>$item->REG_url_link, 'event_id'=>$item->EVT_ID ), REG_ADMIN_URL ), 'attendee_check_out_nonce' );
			return '
			<a class="attendee-check-in-lnk" href="'.$chk_out_url.'" title="' . __( 'Click here to toggle the Check In status of this attendee for this event', 'event_espresso' ) . '">
				<img class="" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/check-in-16x16.png" width="16" height="16" alt="' . __( 'Checked In', 'event_espresso' ) . '"/>
			</a>';
		} else {
			$chk_in_url = wp_nonce_url( add_query_arg( array( 'action'=>'attendee_check_in', 'id'=>$item->REG_ID, 'reg'=>$item->REG_url_link, 'event_id'=>$item->EVT_ID ), REG_ADMIN_URL ), 'attendee_check_in_nonce' );
			return '
			<a class="attendee-check-in-lnk" href="'.$chk_in_url.'" title="' . __( 'Click here to toggle the Check In status of this attendee for this event', 'event_espresso' ) . '">
				<img class="" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/check-out-16x16.png" width="16" height="16" alt="' . __( 'Checked In Status', 'event_espresso' ) . '"/>
			</a>';
		}		
	}





	function column_ATT_name($item) {
		// edit attendee link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ATT_ID ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . html_entity_decode( stripslashes( $item->ATT_name ), ENT_QUOTES, 'UTF-8' ) . '</a>';
		$name_link .= $item->REG_count == 1 ? '<img class="primary-attendee-star-img" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/star-8x8.png" width="8" height="8" alt="this is the primary attendee"/>' : '';
		return $name_link;
	}






	/**
	 * 		column_REG_count
	*/
	function column_REG_count($item){
		return $item->REG_count . __( ' of ', 'event_espresso' ) . $item->REG_group_size;
	}




	/**
	 * 		column_Reg_status
	*/
   	function column_Reg_status($item){
		return '<span class="status-'. $item->REG_status .'">' . __( $this->_status[ $item->REG_status ], 'event_espresso' ) . '</span>';
	}





	function column_REG_date($item) {
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$item->REG_ID ), REG_ADMIN_URL ), 'view_registration_nonce' );	
		$REG_date = '<a href="'.$view_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">' . date( 'D M j, Y  g:i a',	$item->REG_date ) . '</a>';	
		return $REG_date;	
	}





	function column_PRC_name($item){
		return $item->PRC_name;
	}






	/**
	 * 		column_REG_final_price
	*/
	function column_REG_final_price($item){
	
		global $org_options;
		$item->REG_final_price = abs( $item->REG_final_price );
		
		if ( $item->REG_final_price > 0 ) {
			return '<span class="reg-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item->REG_final_price, 2 ) . '</span>';
		} else {
			return '<span class="reg-pad-rght">' . $org_options['currency_symbol'] . '0.00</span>';
		}
		
	}





	/**
	 * 		column_TXN_paid
	*/
	function column_TXN_paid($item){
	
		if ( $item->REG_count == 1 ) {
			global $org_options;
			$item->TXN_paid = abs( $item->TXN_paid );
			$item->TXN_total = abs( $item->TXN_total );
			
			if ( $item->TXN_paid >= $item->TXN_total ) {
				return '<span class="reg-pad-rght"><img class="" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/check-mark-16x16.png" width="16" height="16" alt="Paid in Full"/></span>';
			} else {
				$view_txn_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_transaction', 'txn'=>$item->TXN_ID ), TXN_ADMIN_URL ), 'view_transaction_nonce' );
				$owing = number_format( $item->TXN_paid, 2, '.', ',' );
				return '<span class="reg-pad-rght"><a class="status-'. $item->txn_status .'" href="'.$view_txn_lnk_url.'"  title="' . __( 'View Transaction', 'event_espresso' ) . '">' . $org_options['currency_symbol'] . $owing . '</a><span>';
			}			
		}
		
	}




// group-reg-16x16.png


}