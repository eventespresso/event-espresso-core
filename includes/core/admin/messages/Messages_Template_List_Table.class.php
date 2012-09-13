<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Evetn Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @package		Evetn Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  *see Plugin Licensing *
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Messages_Template_List_Table
 *
 * extends WP_List_Table class
 *
 * @package		Evetn Espresso
 * @subpackage	/includes/core/admin/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

if (!class_exists('WP_List_Table')) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class Messages_Template_List_Table extends WP_List_Table {
	
	private $_data;
	private $_view;
	private $_views;
	private $_entries_per_page_dropdown;

	/**
	 * [__construct description]
	 * @param array   $data                      message_template data
	 * @param string  $view                      what is the current view
	 * @param array|null  $views                     available views
	 * @param int|boolean $entries_per_page_dropdown how many entries listed per page (if set)
	 * @todo  make sure that the view is given for the current user. uncertain at this point if the view would be restricted here or when data is sent.
	 */
	public function __construct( $data = array(), $view = NULL, $views = NULL, $entries_per_page_dropdown = FALSE ) {
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		//
		$this->_data = $data;
		$this->_view = $view;
		$this->_views = $views;
		$this->_entries_per_page_dropdown = $entries_per_page_dropdown;

		//Set parent defaults
		parent::__construct(array(
			'singular' => 'Message Template Group', //singular name of the listed records
			'plural' => 'Message Template',
			'ajax' => false //not yet but will
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

		//$this->process_bulk_action(); //todo: ? is this something in the new system?

		if ( is_array( $this->_data) )
			$this->_data = array_slice( $this->_data, (( $current_page-1 ) * $per_page ), $per_page );
		//printr( $prices, '$prices <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

        $this->items = $this->_data;
		
		$this->set_pagination_args(
				array(
						'total_items' => $total_items, //WE have to calculate the total number of items
						'per_page' => $per_page, //WE have to determine how many items to show on a page
						'total_pages' => ceil($total_items / $per_page) //WE have to calculate the total number of pages
				)
		);
	}

	/**
	 * get_columns
	 * @return array array of the columns.
	 */
	function get_columns() {
		$columns = array(
			'cb' => '<input type="checkbox" />', //render checkbox instead of text.
			'event' => __( 'Event', 'event_espresso'),
			'messenger' => __( 'Messenger', 'event_espresso'),
			'message_type' => __('Message Type', 'event_espresso'),
			'context' => __('Context', 'event_espresso'),
			'messages_sent' => __( 'Total Sent', 'event_espresso' )
		);
		return $columns;
	}

	/**
	 * get_sortable_columns
	 * @return array of columns that are sortable.
	 */
	function get_sortable_columns() {
		$sortable_columns = array(
			'event' => array( 'EVT_ID', FALSE ), //true means it's already sorted.
			'messenger' => array( 'MTP_messenger', TRUE ),
			'message_type' => array( 'MTP_message_type', FALSE )
		);
		return $sortable_columns;
	}

	/**
	 * column_default
	 * @param  object $item        item for row
	 * @param  string $column_name name of column
	 * @return string              column_name for default column
	 */
	function column_default($item, $column_name) {
		switch( $column_name ) {
			case 'event' :
				return $item[$column_name];
			default:
				return ( isset( $item->$column_name ) ) ? $item->column_name : '';
		}
	}

	function extra_tablenav( $which ) {
		echo $this->_entries_per_page_dropdown;
	}

	function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', /* $1%s */ $item->GRP_ID() );
	}

	function column_messenger($item) {
		
		//Build row actions
		$actions = array();
		// edit price link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_message_template', 'id'=>$item->GRP_ID() ), EE_MSG_ADMIN_URL ), 'edit_message_template_nonce' );
		$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template Group', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template Group', 'event_espresso' ) . '">' . stripslashes( $item->messenger() ) . '</a>';

		if ($this->_view == 'in_use') {
			// trash price link
			$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EE_MSG_ADMIN_URL ), 'trash_message_template_nonce' );
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Template Group to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
		} else {
			// restore price link
			$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'restore_message_template_nonce' );
			$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Message Template', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			// delete price link
			$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EVT_PRC_ADMIN_URL ), 'delete_message_template_nonce' );
			$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Template Group Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
		}

		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span>%3$s',
										/* $1%s */ $name_link,
										/* $2%s */ $item->GRP_ID(),
										/* $3%s */ $this->row_actions( $actions )
		);
	}

	/**
	 * [column_event description]
	 * 
	 * @todo: right now we're not using a nonce because legacy EE doesn't look for it.. but it should be added when the new Event management is in place.
	 * @param  array $item message_template group data
	 * @return string       column output
	 */
	function column_event($item) {
		if ( empty($item->EVT_ID ) ) 
			return __('Global', 'event_espresso');

		$get_event_name = $this->_event_name($item->event());
		$event_name = empty($get_event_name) ? __('Cannot find Event', 'event_espresso') : $get_event_name;

		$base_event_admin_url = admin_url( 'admin.php?page=events' );
		$query_args = array(
			'action' => 'edit_event',
			'event_id' => $item->event()
			);
		$edit_event_url = add_query_arg( $query_args, $base_event_admin_url );
		$event_link = '<a href="'.$edit_event_url.'" title="' . __('Edit Event', 'event_espresso') . '">' . $event_name . '</a>';
		return $event_link;
	}

	/**
	 * column_message_type
	 * @param  object $item message info for the row
	 * @return string       message_type name
	 */
	function column_message_type($item) {
		return ucwords(str_replace('_', ' ', $item->message_type()) );
	}

	function column_context($item) {
		$content = '<ul>';
		foreach ( $item->context_templates() as $context => $template_fields ) {
			$context_title = ucwords(str_replace('_', ' ', $context ) );
			$edit_link = wp_nonce_url( add_query_arg( array('action'=>'edit_message_template', 'id'=>$item->GRP_ID(), 'context' => $context), EE_MSG_ADMIN_URL ), 'edit_message_template_nonce' );
			$do_restore = $template_fields['MTP_deleted'] ? TRUE : FALSE;
			$trash_restore_link = $do_restore ? wp_nonce_url( add_query_arg( array( 'action'=>'trash_message_template_context', 'id'=>$item->GRP_ID, 'noheader' => TRUE, 'context' => $context ), EE_MSG_ADMIN_URL ), 'trash_message_template_nonce' ) : wp_nonce_url( add_query_arg( array( 'action'=>'restore_message_template_context', 'id'=>$item->GRP_ID, 'noheader' => TRUE, 'context' => $context ), EE_MSG_ADMIN_URL ), 'restore_message_template_nonce' );
			$trash_img_url = EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/trash-16x16.png';
			$restore_img_url = EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/add.png';
			$t_r_image = $do_restore ? $restore_img_url : $trash_img_url;
			$t_r_title = $do_restore ? __('Restore Context', 'event_espresso') : __('Trash Context', 'event_espresso');
			$t_r_alt = $do_restore ? __('Restore icon', 'event_espresso') : __('Trash icon', 'event_espresso');


			$content .= '<li><a href="'. $edit_link . '" title="' . __('Edit Context', 'event_espresso') . '">' . $context_title . '</a><span class="right"><a href="'. $trash_restore_link . '" title="'.$t_r_title . '"><img src="' . $t_r_image . '" alt="' . $t_r_alt . '" /></a></span></li>';  ;
		}
		$content .= '</ul>';
		return $content;
	}

	function column_messages_sent($item) {
		//todo: we need to obtain the messages sent and the link to the messages report table and output
		return __('feature in progress', 'event_espresso');
	}

	/**
	 * get_bulk_actions
	 * @return array bulk actions
	 * @todo: not certain if this is needed will verify in testing.
	 */
	function get_bulk_actions() {
		$actions = array();
		return $actions;
	}

	/**
	 * process_bulk_action
	 * @return void
	 * @todo: not certain if this is needed will verify in testing
	 */
	function process_bulk_action() {

	}

	/**
	 * [_event_name description]
	 * This just takes a given event_id and will output the name of the event for it.
	 * @todo: temporary... will need to remove/replace once proper Event models/classes are in place.
	 * @access private
	 * @param  int $evt_id event_id
	 * @return string event_name 
	 */
	private function _event_name($evt_id) {
		global $wpdb;
		$evt_id = absint($evt_id);
		$tablename = $wpdb->prefix . 'events_detail';
		$query = "SELECT event_name FROM {$table_name} WHERE id = '{$evt_id}'";
		$event_name = $wpdb->get_var( $wpdb->prepare($query) );
		return $event_name;
	}

}