<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @package		Event Espresso
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
 * extends EE_Admin_List_Table class
 *
 * @package		Evetn Espresso
 * @subpackage	/includes/core/admin/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Messages_Template_List_Table extends EE_Admin_List_Table {
	
	
	public function __construct( $admin_page ) {
		//Set parent defaults
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_admin_page->get_message_templates( $this->_per_page, $this->_view, FALSE);
		$this->_all_data_count = $this->_admin_page->get_message_templates( $this->_per_page, $this->_view, TRUE, TRUE );
	}





	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('Message Template Group', 'event_espresso' ),
			'plural' => __('Message Template', 'event_espresso' ),
			'ajax' => TRUE, //for now,
			'screen' => $this->_admin_page->get_current_screen()->id 
			);

		$this->_columns = array(
			'event' => __( 'Event', 'event_espresso'),
			'message_type' => __('Message Type', 'event_espresso'),
			'messenger' => __( 'Messenger', 'event_espresso'),
			'messages_sent' => __( 'Total Sent', 'event_espresso' )
			);

		$this->_sortable_columns = array(
			'event' => array( 'EVT_ID', FALSE ), //true means it's already sorted.
			'messenger' => array( 'MTP_messenger', TRUE ),
			'message_type' => array( 'MTP_message_type', FALSE )
			);

		$this->_hidden_columns = array();
	}






	
	protected function _get_table_filters() {
		$filters = array();
		require_once EE_FF_HELPER;
		$messengers = $this->_admin_page->get_active_messengers();
		$message_types = $this->_admin_page->get_active_message_types();


		//setup messengers for selects
		$i=0;
		foreach ( $messengers as $messenger => $args ) {
			$m_values[$i]['id'] = $messenger;
			$m_values[$i]['text'] = ucwords($args['obj']->label['singular']);
			$i++;
		}
		
		//lets do the same for message types
		$i=0;
		foreach ( $message_types as $message_type => $args ) {
			$mt_values[$i]['id'] = $message_type;
			$mt_values[$i]['text'] = ucwords($args['obj']->label['singular']);
			$i++;
		}

		if ( empty($m_values ) )
			$m_values[] = array(
				'id' => 'no_messenger_options',
				'text' => __('No Messengers active', 'event_espresso')
				);

		if ( empty($mt_values) )
			$mt_values[] = array(
				'id' => 'no_message_type_options',
				'text' => __('No Message Types active', 'event_espresso')
				);
		
		$filters[] = EE_Form_Fields::select_input('ee_messenger_filter_by', $m_values, isset($this->_req_data['ee_messenger_filter_by']) ? sanitize_key( $this->_req_data['ee_messenger_filter_by']) : '' );
		$filters[] = EE_Form_Fields::select_input('ee_message_type_filter_by', $mt_values, isset($this->_req_data['ee_message_type_filter_by']) ? sanitize_key( $this->_req_data['ee_message_type_filter_by']) : '');
		return $filters;
	}





	protected function _add_view_counts() {
		foreach ( $this->_views as $view => $args )  {
			$this->_views[$view]['count'] = $this->_admin_page->get_message_templates( $this->_per_page, $view, TRUE, TRUE );
		}
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

	

	/*function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', $item->GRP_ID() );
	}/**/

	function column_messenger($item) {
		
		//Build row actions
		$actions = array();
		
		// edit link
		$edit_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'edit_message_template', 'id'=>$item->GRP_ID(), 'evt_id' => $item->event() ), EE_MSG_ADMIN_URL ), 'edit_message_template_nonce' );
		$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template Group', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template Group', 'event_espresso' ) . '">' . ucwords( $item->messenger_obj()->label['singular'] ) . '</a>';

		if ( !$item->is_global() ) {
			if ($this->_view == 'in_use') {
				// trash link
					$trash_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'trash_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EE_MSG_ADMIN_URL ), 'trash_message_template_nonce' );
					$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Template Group to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
			} else {
				// restore link
				$restore_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'restore_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EE_MSG_ADMIN_URL ), 'restore_message_template_nonce' );
				$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Message Template', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
				// delete price link
				$delete_lnk_url = wp_nonce_url( add_query_arg( array( 'action'=>'delete_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EE_MSG_ADMIN_URL ), 'delete_message_template_nonce' );
				$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Template Group Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
			}
		}

		//we want to display the contexts in here so we need to set them up
		$c_label = $item->context_label();
		$c_configs = $item->contexts_config(); 
		foreach ( $item->context_templates() as $context => $template_fields ) {
			$context_title = ucwords($c_configs[$context]['label']);
			$edit_link = wp_nonce_url( add_query_arg( array('action'=>'edit_message_template', 'id'=>$item->GRP_ID(), 'context' => $context), EE_MSG_ADMIN_URL ), 'edit_message_template_nonce' );
			$ctxt[] = '<a href="'. $edit_link . '" title="' . __('Edit Context', 'event_espresso') . '">' . $context_title . '</a>';
		}

		$ctx_content = sprintf( __('<strong>%s:</strong> ', 'event_espresso'), ucwords($c_label['plural']) ) . implode(' | ', $ctxt);


		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span><br />%3$s%4$s',
										/* $1%s */ $name_link,
										/* $2%s */ $item->GRP_ID(),
										/* %4$s */ $ctx_content,
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
		$event_id = $item->event();
		if ( empty( $event_id ) ) 
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
		return ucwords($item->message_type_obj()->label['singular'] );
	}

	

	function column_messages_sent($item) {
		//todo: we need to obtain the messages sent and the link to the messages report table and output
		return __('feature in progress', 'event_espresso');
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
		$query = "SELECT event_name FROM {$tablename} WHERE id = %d";
		$event_name = $wpdb->get_var( $wpdb->prepare($query, $evt_id) );
		return $event_name;
	}

}