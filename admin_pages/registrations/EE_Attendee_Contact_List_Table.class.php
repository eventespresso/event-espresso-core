<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


class EE_Attendee_Contact_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
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
				'STA_ID' => __('State/Province', 'event_espresso'),
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
		$this->_views['in_use']['count'] = $this->_admin_page->get_attendees( $this->_per_page, TRUE );
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_contacts', 'espresso_registrations_delete_registration' ) ) {
			$this->_views['trash']['count'] = $this->_admin_page->get_attendees( $this->_per_page,TRUE, TRUE );
		}
	}




	protected function _get_attendees_count() {
		return EEM_Attendee::instance()->count();
	}




	protected function _get_attendees_trash_count() {

	}





	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />', /* $1%s */ $item->ID() );
	}





	function column_ATT_ID($item) {
		$content =  $item->ID();
		$attendee_name = $item instanceof EE_Attendee ? $item->full_name() : '';
		$content .= '  <span class="show-on-mobile-view-only">' . $attendee_name . '</span>';
		return $content;
	}





	function column_ATT_lname($item) {

		// edit attendee link
		$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'post'=>$item->ID() ), REG_ADMIN_URL );
		$name_link = EE_Registry::instance()->CAP->current_user_can( 'ee_edit_contacts', 'espresso_registrations_edit_attendee' ) ?  '<a href="'.$edit_lnk_url.'" title="' . esc_attr__( 'Edit Contact', 'event_espresso' ) . '">' . $item->lname() . '</a>' : $item->lname();
		return $name_link;

	}




	function column_ATT_fname($item) {

		//Build row actions
		$actions = array();
		// edit attendee link
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_edit_contacts', 'espresso_registrations_edit_attendee' ) ) {
			$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'post'=>$item->ID() ), REG_ADMIN_URL );
			$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . esc_attr__( 'Edit Contact', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		}

		if ( $this->_view == 'in_use' ) {
			// trash attendee link
			if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_contacts', 'espresso_registrations_trash_attendees' ) ) {
				$trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'trash_attendees', 'ATT_ID'=>$item->ID() ), REG_ADMIN_URL );
				$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . esc_attr__( 'Move Contact to Trash', 'event_espresso' ) . '">' . __( 'Trash', 'event_espresso' ) . '</a>';
			}
		} else {
			if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_contacts', 'espresso_registrations_restore_attendees' ) ) {
				// restore attendee link
				$restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'restore_attendees', 'ATT_ID'=>$item->ID() ), REG_ADMIN_URL );
				$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . esc_attr__( 'Restore Contact', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			}
		}

		$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'post'=>$item->ID() ), REG_ADMIN_URL );
		$name_link = EE_Registry::instance()->CAP->current_user_can( 'ee_edit_contacts', 'espresso_registrations_edit_attendee' ) ?  '<a href="'.$edit_lnk_url.'" title="' . esc_attr__( 'Edit Contact', 'event_espresso' ) . '">' . $item->fname() . '</a>' : $item->fname();

		//Return the name contents
		return sprintf('%1$s %2$s', $name_link, $this->row_actions($actions) );
	}





	function column_ATT_email($item) {
		return '<a href="mailto:' . $item->email() . '">' . $item->email() . '</a>';
	}




	function column_ATT_address($item) {
		return $item->address();
	}



	function column_ATT_city($item) {
		return $item->city();
	}



	function column_STA_ID($item) {
		$states = EEM_State::instance()->get_all_states();
		$state = isset( $states[ $item->state_ID() ] ) ? $states[ $item->state_ID() ]->get( 'STA_name' ) : $item->state_ID();
		return ! is_numeric( $state ) ? $state : '';
	}



	function column_CNT_ISO($item) {
		$countries = EEM_Country::instance()->get_all_countries();
		//EEH_Debug_Tools::printr( $countries, '$countries  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$country = isset( $countries[ $item->country_ID() ] ) ? $countries[ $item->country_ID() ]->get( 'CNT_name' ) : $item->country_ID();
		return ! is_numeric( $country ) ? $country : '';
	}



	function column_ATT_phone($item) {
		return $item->phone();
	}


}
