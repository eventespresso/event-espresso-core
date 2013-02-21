<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


class EE_Attendee_Contact_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_view != 'trash' ? $this->_admin_page->get_attendees( $this->_per_page ) : $this->_admin_page->get_attendees( $this->_per_page, FALSE, TRUE );
		$this->_all_data_count = $this->_view != 'trash' ? $this->_admin_page->get_attendees( $this->_per_page, TRUE ) : $this->_admin_page->get_attendees( $this->_per_page,TRUE, TRUE );
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
				'ATT_ID' => __('ID', 'event_espresso'),
				'ATT_fname' => __('First Name', 'event_espresso'),
				'ATT_lname' => __('Last Name', 'event_espresso'),
				'ATT_email' => __('Email Address', 'event_espresso'),
				'ATT_phone' => __('Phone', 'event_espresso'),
				'ATT_address' => __('Address', 'event_espresso'),
				'ATT_city' => __('City', 'event_espresso'),
				'STA_ID' => __('State', 'event_espresso'),
				'CNT_ISO' => __('Country', 'event_espresso'),
			);

		$this->_sortable_columns = array(
			'ATT_ID' => array( 'ATT_ID' => FALSE ),
			'ATT_lname' => array( 'ATT_lname' => TRUE ), //true means its already sorted
			'ATT_fname' => array( 'ATT_fname' => FALSE ),
			'ATT_email' => array( 'ATT_email' => FALSE ),
			'ATT_city' => array( 'ATT_city' => FALSE ),
			'STA_ID' => array( 'STA_ID' => FALSE ),
			'CNT_ISO' => array( 'CNT_ISO' => FALSE )
		);

		$this->_hidden_columns = array();
	}




	protected function _get_table_filters() {
		return array();
	}




	protected function _add_view_counts() {
		$this->_views['in_use']['count'] = $this->_admin_page->get_attendees( $this->_per_page, TRUE, FALSE );
		$this->_views['trash']['count'] = $this->_admin_page->get_attendees( $this->_per_page, TRUE, TRUE );
	}






	function column_default($item) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}





	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', /* $1%s */ $item->ID() );
	}





	function column_ATT_ID($item) {
		return $item->ID();
	}





	function column_ATT_lname($item) {

		// edit attendee link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ID() ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . html_entity_decode( stripslashes( $item->lname() ), ENT_QUOTES, 'UTF-8' ) . '</a>';
		return $name_link;

	}




	function column_ATT_fname($item) {

		//Build row actions
		$actions = array();
		// edit attendee link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ID() ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';

		if ( $this->_view == 'in_use' ) {
			// trash attendee link
			$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_attendees', 'id'=>$item->ID() ), REG_ADMIN_URL ), 'trash_attendees_nonce' );
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Attendee to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
		} else {
			// restore attendee link
			$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_attendees', 'id'=>$item->ID() ), REG_ADMIN_URL ), 'restore_attendees_nonce' );
			$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Attendee', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			// delete attendee link
			$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_attendees', 'id'=>$item->ID() ), REG_ADMIN_URL ), 'delete_attendees_nonce' );
			$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Attendee Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
		}

		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ID() ), REG_ADMIN_URL ), 'edit_attendee_nonce' );
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . html_entity_decode( stripslashes( $item->fname() ), ENT_QUOTES, 'UTF-8' ) . '</a>';

		//Return the name contents
		return sprintf('%1$s %2$s', $name_link, $this->row_actions($actions) );		
	}





	function column_ATT_email($item) {
		return '<a href="mailto:' . $item->email() . '">' . $item->email() . '</a>';
	}




	function column_ATT_address($item) {
		return html_entity_decode( stripslashes( $item->address() ), ENT_QUOTES, 'UTF-8' );
	}



	function column_ATT_city($item) {
		return html_entity_decode( stripslashes( $item->city() ), ENT_QUOTES, 'UTF-8' );
	}



	function column_STA_ID($item) {
		return $item->state_ID() != 0 ? $item->state_ID() : '';
	}



	function column_CNT_ISO($item) {
		return $item->country_ISO();
	}



	function column_ATT_phone($item) {
		return $item->phone();
	}


}