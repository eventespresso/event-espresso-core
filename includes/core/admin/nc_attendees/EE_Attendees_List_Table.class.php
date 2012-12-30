<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

if (!class_exists('WP_List_Table')) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class EE_Attendees_List_Table extends WP_List_Table {

	private $_data;
	private $_view;
	private $_views;
	private $_entries_per_page_dropdown;




	public function __construct( $data = array(), $view = NULL, $views = NULL, $entries_per_page_dropdown = FALSE ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		
		$this->_data = $data;
		$this->_view = $view;
		$this->_views = $views;
		$this->_entries_per_page_dropdown = $entries_per_page_dropdown;

		//Set parent defaults
		parent::__construct(array(
				'singular' => 'attendee', //singular name of the listed records
				'plural' => 'attendees', //plural name of the listed records
				'ajax' => false //does this table support ajax?
		));

		$this->prepare_items();
		
	}





	function prepare_items() {
	
		$per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;
		$columns = $this->get_columns();
		$hidden = array();
		$sortable = $this->get_sortable_columns();
		$this->_column_headers = array($columns, $hidden, $sortable);

		$current_page = $this->get_pagenum();
		$total_items = count( $this->_data );

		$this->_data = array_slice( $this->_data, (( $current_page-1 ) * $per_page ), $per_page );
		//printr( $this->_data, '$this->_data <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

        $this->items = $this->_data;

		$this->set_pagination_args(
				array(
						'total_items' => $total_items, //WE have to calculate the total number of items
						'per_page' => $per_page, //WE have to determine how many items to show on a page
						'total_pages' => ceil($total_items / $per_page) //WE have to calculate the total number of pages
				)
		);

	}




	function extra_tablenav( $which ) {
		echo $this->_entries_per_page_dropdown;
	}





	function get_columns() {
		$columns = array(
				'cb' 					=> '<input type="checkbox" />', //Render a checkbox instead of text
				'ATT_ID' 			=> __('ID', 'event_espresso'),
				'ATT_fname' 	=> __('First Name', 'event_espresso'),
				'ATT_lname' 	=> __('Last Name', 'event_espresso'),
				'ATT_email' 	=> __('Email Address', 'event_espresso'),
				'ATT_phone' 	=> __('Phone', 'event_espresso'),
				'ATT_address' => __('Address', 'event_espresso'),
				'ATT_city' 		=> __('City', 'event_espresso'),
				'STA_ID' 			=> __('State', 'event_espresso'),
				'CNT_ISO' 		=> __('Country', 'event_espresso'),
				'actions' 			=> __('Actions', 'event_espresso')
		);
		return $columns;
	}





	function get_sortable_columns() {
		$sortable_columns = array(
				'ATT_lname' => array( 'ATT_lname', TRUE ), //true means its already sorted
				'ATT_fname' => array( 'ATT_fname', FALSE ),
				'ATT_email' => array( 'ATT_email', FALSE ),
				'ATT_city' => array( 'ATT_city', FALSE ),
				'STA_ID' => array( 'STA_ID', FALSE ),
				'CNT_ISO' => array( 'CNT_ISO', FALSE )
		);
		return $sortable_columns;
	}





	function get_bulk_actions() {
		return $this->_views[ $this->_view ]['bulk_action'];	
	}





	function get_views() {}




	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', /* $1%s */ $item->ID() );
	}





	function column_ATT_ID($item) {
		return $item->ID();
	}





	function column_ATT_lname($item) {

		// edit attendee link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ID() ), ATT_ADMIN_URL ), 'edit_attendee_nonce' );
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . html_entity_decode( stripslashes( $item->lname() ), ENT_QUOTES, 'UTF-8' ) . '</a>';
		return $name_link;

	}




	function column_ATT_fname($item) {

		//Build row actions
		$actions = array();
		// edit attendee link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ID() ), ATT_ADMIN_URL ), 'edit_attendee_nonce' );
		$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';

		if ( $this->_view == 'in_use' ) {
			// trash attendee link
			$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_attendees', 'id'=>$item->ID(), 'noheader' => TRUE ), ATT_ADMIN_URL ), 'trash_attendees_nonce' );
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Attendee to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
		} else {
			// restore attendee link
			$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_attendees', 'id'=>$item->ID(), 'noheader' => TRUE ), ATT_ADMIN_URL ), 'restore_attendees_nonce' );
			$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Attendee', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			// delete attendee link
			$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_attendees', 'id'=>$item->ID(), 'noheader' => TRUE ), ATT_ADMIN_URL ), 'delete_attendees_nonce' );
			$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Attendee Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
		}

		//Return the name contents
		return sprintf('%1$s %2$s',  html_entity_decode( stripslashes( $item->fname() ), ENT_QUOTES, 'UTF-8' ), $this->row_actions($actions) );		
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


	function column_actions($item) {
	
		
//		$actions = '
//<a title="'. __('Edit Attendee Details', 'event_espresso') .'" href="'. $edit_lnk_url .'">
//	<img width="13" height="13" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'images/icons/edit.png" alt="'. __('Edit Attendee Details', 'event_espresso') .'" ">
//</a>';

		//Build row actions
		$actions = '
<ul class="att-overview-actions-ul">';
		// edit price link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_attendee', 'id'=>$item->ID() ), ATT_ADMIN_URL ), 'edit_attendee_nonce' );
		$actions .= '
	<li>
		<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Attendee', 'event_espresso' ) . '" class="att-action-lnk">
			<img width="13" height="13" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'images/icons/edit.png" alt="'. __('Edit Attendee Details', 'event_espresso') .'" ">
		</a>
	</li>';


		if ( $this->_view == 'in_use' ) {
			// trash price link
			$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_attendees', 'id'=>$item->ID(), 'noheader' => TRUE ), ATT_ADMIN_URL ), 'trash_attendees_nonce' );
			$actions .= '
	<li>
		<a href="'.$trash_lnk_url.'" title="' . __( 'Move Attendee to Trash', 'event_espresso' ) . '" class="att-action-lnk">
			<img width="14" height="14" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'images/icons/trash-16x16.png" alt="'. __('Edit Attendee Details', 'event_espresso') .'" ">
		</a>
	</li>';
		} else {
			// restore price link
			$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_attendees', 'id'=>$item->ID(), 'noheader' => TRUE ), ATT_ADMIN_URL ), 'restore_attendees_nonce' );
			$actions .= '
	<li>
		<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Attendee', 'event_espresso' ) . '" class="att-action-lnk">
			<img width="16" height="16" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'images/icons/restore-16x16.png" alt="'. __('Edit Attendee Details', 'event_espresso') .'" ">
		</a>
	</li>';
			
			// delete price link
			$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_attendees', 'id'=>$item->ID(), 'noheader' => TRUE ), ATT_ADMIN_URL ), 'delete_attendees_nonce' );
			$actions .= '
	<li>
		<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Attendee Permanently', 'event_espresso' ) . '" class="att-action-lnk">
			<img width="15" height="15" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'images/icons/delete-16x16.png" alt="'. __('Delete Attendee Permanently', 'event_espresso') .'" ">
		</a>
	</li>';
		}

		$actions .= '
</ul>';		
		return $actions;
		
	}






}