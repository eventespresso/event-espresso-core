<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


class EE_Event_Registrations_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
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
				'event_name' => __('Event', 'event_espresso'),
				'ATT_name' => sprintf( __('Attendee %sprimary registrant%s', 'event_espresso'), '<span class="primary-registrant-spn lt-grey-txt small-text">(&nbsp;<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/star-8x8.png" width="8" height="8" />&nbsp;=&nbsp;', '&nbsp;)</span>' ),
				'REG_date' => __('Registration Date', 'event_espresso'),
				'DTT_EVT_start' => __('Event Date & Time', 'event_espresso'),
				'REG_final_price' => __('Ticket Price', 'event_espresso'),
				'PRC_name' => __('Ticket Option', 'event_espresso'),
				'REG_count' => __('Att #', 'event_espresso'),
				'REG_att_checked_in' => __('Checked In', 'event_espresso')
			);


		$this->_sortable_columns = array(
			 //true means its already sorted
			'event_name' => array( 'event_name' => TRUE ),
			'ATT_name' => array( 'ATT_name' => FALSE ),
			'REG_date' => array( 'REG_date' => FALSE )
		);

		$this->_hidden_columns = array();
	}





	protected function _get_table_filters() {
		return array();
	}





	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->get_event_attendees( $this->_per_page, TRUE );
		$this->_views['trash']['count'] = $this->_admin_page->get_event_attendees( $this->_per_page, TRUE, TRUE );
	}





	function column_default($item) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}





	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', $item->REG_ID );
	}





	function column_event_name($item){
		$edit_event_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_event', 'event_id'=>$item->EVT_ID ), EVENTS_ADMIN_URL ), 'edit_event_nonce' );
		$event_name = stripslashes( html_entity_decode( $item->event_name, ENT_QUOTES, 'UTF-8' ));
		return '<a href="' . $edit_event_url . '" title="' . __( 'Edit Event #', 'event_espresso' ) . $item->EVT_ID.'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>';
	}





	function column_ATT_name($item) {
		// edit attendee link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ATT_ID ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . html_entity_decode( stripslashes( $item->ATT_name ), ENT_QUOTES, 'UTF-8' ) . '</a>';
		$name_link .= $item->REG_count == 1 ? '<img class="primary-attendee-star-img" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/star-8x8.png" width="8" height="8" alt="this is the primary attendee"/>' : '';
		return $name_link;
	}





	function column_REG_date($item) {
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$item->REG_ID ), REG_ADMIN_URL ), 'view_registration_nonce' );	
		$REG_date = '<a href="'.$view_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">' . date( 'D M j, Y  g:i a',	$item->REG_date ) . '</a>';	
		return $REG_date;	
	}





	function column_DTT_EVT_start($item){
		return date( 'D M j, Y  g:i a',	$item->DTT_EVT_start );
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

		//TXN_total, txn.TXN_paid
		
		if ( $item->REG_final_price > 0 ) {
			return '<span class="status-' . $item->txn_status . ' reg-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item->REG_final_price, 2 ) . '</span>';
		} else {
			return '<span class="status-TCM">' . $org_options['currency_symbol'] . '0.00</span>';
		}
		
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



// group-reg-16x16.png


}