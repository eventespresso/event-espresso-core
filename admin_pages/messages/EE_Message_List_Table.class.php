<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * EE_Message_List_Table
 *
 * extends EE_Admin_List_Table class
 *
 * @package		Event Espresso
 * @subpackage	/includes/core/admin/messages
 * @author		Darren Ethier
 *
 */
class EE_Message_List_Table extends EE_Admin_List_Table {

	protected function _setup_data() {
		$this->_data = $this->_get_messages( $this->_per_page, $this->_view );
		$this->_all_data_count = $this->_get_messages( $this->_per_page, $this->_view, true, true );
	}




	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __( 'Message', 'event_espresso' ),
			'plural' => __( 'Messages', 'event_espresso' ),
			'ajax' => true,
			'screen' => $this->_admin_page->get_current_screen()->id
		);

		$this->_columns = array(
			'msg_status' => '',
			'cb' => '<input type="checkbox" />',
			'msg_id' => __( 'ID', 'event_espresso' ),
			'to' => __( 'To', 'event_espresso' ),
			'from' => __( 'From', 'event_espresso' ),
			'messenger' => __( 'Messenger', 'event_espresso' ),
			'message_type' => __( 'Message Type', 'event_espresso' ),
			'context' => __( 'Context', 'event_espresso' ),
			'modified' => __( 'Modified', 'event_espresso' ),
			'action' => __( 'Actions', 'event_espresso' )
		);

		$this->_sortable_columns = array(
			'modified' => array( 'MSG_modified' => true ),
			'msg_id' => array( 'MSG_ID', false ),
			'message_type' => array( 'MSG_message_type' => false ),
			'messenger' => array( 'MSG_messenger' => false ),
			'to' => array( 'MSG_to' => false ),
			'from' => array( 'MSG_from' => false ),
			'context' => array( 'MSG_context' => false )
		);

		$this->_hidden_columns = array(
			'msg_id'
		);
	}



	protected function _get_table_filters() {
		return array();
	}



	protected function _add_view_counts() {
		foreach( $this->_views as $view => $args ) {
			$this->_views[$view]['count'] = $this->_get_messages( $this->_per_page, $view, true );
		}
	}


	/**
	 * @param EE_Message $message
	 *
	 * @return string    EE_Message status.
	 */
	public function column_msg_status( $message ) {
		return '<span class="ee-status-strip ee-status-strip-td msg-status-' . $message->STS_ID() . '"></span>';
	}


	/**
	 * @param EE_Message $message
	 *
	 * @return string   checkbox
	 */
	public function column_cb( $message ) {
		return sprintf( '<input type="checkbox" name="checkbox[%s] value="1" />', $message->GRP_ID() );
	}




	public function column_msg_id( $message ) {
		return $message->ID();
	}



	/**
	 * @param EE_Message $message
	 * @return string    The recipient of the message
	 */
	public function column_to( $message ) {
		return $message->to();
	}


	/**
	 * @param EE_Message $message
	 * @return string   The sender of the message
	 */
	public function column_from( $message ) {
		return $message->from();
	}


	/**
	 *
	 * @param EE_Message $message
	 * @return string  The messenger used to send the message.
	 */
	public function column_messenger( $message ) {
		return $message->messenger();
	}


	/**
	 * @param EE_Message $message
	 * @return string  The message type used to generate the message.
	 */
	public function column_message_type( $message ) {
		return $message->message_type();
	}


	/**
	 * @param EE_Message $message
	 * @return string  The context the message was generated for.
	 */
	public function column_context( $message ) {
		return $message->context();
	}


	/**
	 * @param EE_Message $message
	 * @return string    The timestamp when this message was last modified.
	 */
	public function column_modified( $message ) {
		return $message->modified();
	}


	/**
	 * @param EE_Message $message
	 * @return string   Actions that can be done on the current message.
	 */
	public function column_action( $message ) {
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		$browser_trigger_link = '<a href="' . EEH_MSG_Template::generate_browser_trigger( $message ) . '">' . __( 'View', 'event_espresso' ) . '</a>';
		switch ( $message->STS_ID() ) {
			case EEM_Message::status_sent :
			case EEM_Message::status_resend :
				return $browser_trigger_link;
			case EEM_Message::status_retry :
				return $message->error_message()
					. $browser_trigger_link;
			case EEM_Message::status_failed :
				return $message->error_message();
		}
		return '';
	}


	/**
	 * Retrieve the EE_Message objects for the list table.
	 * @param int        $perpage  The number of items per page
	 * @param string     $view      The view items are being retrieved for
	 * @param bool       $count     Whether to just return a count or not.
	 * @param bool       $all       Disregard any paging info (no limit on data returned).
	 * @return int | EE_Message[]
	 */
	protected function _get_messages( $perpage = 10, $view = 'all', $count = false, $all = false ) {
		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $perpage;
		$offset = ($current_page-1)*$per_page;
		$limit = $all || $count ? null : array( $offset, $per_page );

		$query_params = array(
			'order_by' => empty( $this->_req_data['orderby'] ) ? 'MSG_modified' : $this->_req_data['orderby'],
			'order' => empty( $this->_req_data['order'] ) ? 'DESC' : $this->_req_data['order'],
			'limit' => $limit
		);

		return $count ? EEM_Message::instance()->count( $query_params ) : EEM_Message::instance()->get_all( $query_params );

	}
} //end EE_Message_List_Table class