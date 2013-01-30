<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


class EE_Attendees_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		if ( $this->_view != 'trash' ) {
			$this->_data = $this->_admin_page->get_event_attendees( $this->_per_page );
			$this->_all_data_count = $this->_admin_page->get_event_attendees( $this->_per_page, TRUE );		
		} else {
			$this->_data = $this->_admin_page->get_event_attendees( $this->_per_page, FALSE, TRUE );
			$this->_all_data_count = $this->_admin_page->get_event_attendees( $this->_per_page, TRUE, TRUE );
		}
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
				'REG_date' => __('Registration Date', 'event_espresso'),
				'ATT_name' => __('Attendee', 'event_espresso'),
				'event_name' => __('Event', 'event_espresso'),
				'DTT_EVT_start' => __('Event Date & Time', 'event_espresso'),
				'PRC_name' => __('Ticket Option', 'event_espresso'),
				'REG_final_price' => __('Price Paid', 'event_espresso')
			);

		$this->_sortable_columns = array(
			'id' => array( 'REG_ID' => FALSE ),
			'REG_date' => array( 'REG_date', TRUE ), //true means its already sorted
			'ATT_name' => array( 'ATT_name', FALSE ),
			'event_name' => array( 'event_name', FALSE )
		);

		$this->_hidden_columns = array();
	}





	protected function _get_table_filters() {
		return array();
	}





	protected function _add_view_counts() {
		$this->_views['in_use']['count'] = $this->_admin_page->get_attendees($this->_per_page,TRUE);
		$this->_views['trash']['count'] = $this->_admin_page->get_attendees($this->_per_page,TRUE, TRUE);
	}





	function column_default($item) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}





	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', $item->REG_ID );
	}





	function column_REG_date($item) {
		$view_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$item->REG_ID ), REG_ADMIN_URL ), 'view_registration_nonce' );	
		$REG_date = '<a href="'.$view_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">' . date( 'D M j, Y  g:i a',	$item->REG_date ) . '</a>';	
		return $REG_date;	
	}





	function column_ATT_name($item) {
		// edit attendee link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ATT_ID ), ATT_ADMIN_URL ), 'edit_attendee_nonce' );
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . html_entity_decode( stripslashes( $item->ATT_name ), ENT_QUOTES, 'UTF-8' ) . '</a>';
		return $name_link;
	}





	function column_event_name($item){
		$edit_event_url = add_query_arg( array( 'event_id'=>$item->EVT_ID ), REG_ADMIN_URL );
		$event_name = stripslashes( html_entity_decode( $item->event_name, ENT_QUOTES, 'UTF-8' ));
		return '<a href="' . $edit_event_url . '" title="' . __( 'Edit Event #', 'event_espresso' ) . $item->EVT_ID.'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>';
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
		
		if ( $item->REG_final_price > 0 ) {
			return '<span class="reg-overview-full-payment-spn reg-pad-rght">' . $org_options['currency_symbol'] . ' ' . number_format( $item->REG_final_price, 2 ) . '</span>';
		} else {
			return '<span class="reg-overview-free-event-spn">' . __( 'zip', 'event_espresso' ) . '</span>';
		}
		
	}






}