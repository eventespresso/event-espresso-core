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



	/**
	 * @return Messages_Admin_Page
	 */
	public function get_admin_page() {
		return $this->_admin_page;
	}



	protected function _setup_data() {
		$this->_data = $this->_get_messages( $this->_per_page, $this->_view );
		$this->_all_data_count = $this->_get_messages( $this->_per_page, $this->_view, true );
	}




	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __( 'Message', 'event_espresso' ),
			'plural' => __( 'Messages', 'event_espresso' ),
			'ajax' => true,
			'screen' => $this->get_admin_page()->get_current_screen()->id
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
		$filters = array();
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		/** @type EE_Message_Resource_Manager $message_resource_manager */
		$message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$contexts = $message_resource_manager->get_all_contexts();
		//setup messengers for selects
		$m_values = $this->get_admin_page()->get_messengers_for_list_table();
		//lets do the same for message types
		$mt_values = $this->get_admin_page()->get_message_types_for_list_table();
		//and the same for contexts
		$i = 1;
		$labels = $c_values = array();
		foreach ( $contexts as $context => $label ) {
			//some message types may have the same label for a different context, so we're grouping these together so the end user
			//doesn't get confused.
			if ( isset( $labels[ $label ] ) ) {
				$c_values[ $labels[ $label ] ]['id'] .= ',' . $context;
				continue;
			}
			$c_values[ $i ]['id'] = $context;
			$c_values[ $i ]['text'] = $label;
			$labels[ $label ] = $i;
			$i++;
		}

		$msgr_default[0] = array(
			'id' => 'none_selected',
			'text' => __( 'All Messengers', 'event_espresso' )
		);

		$mt_default[0] = array(
			'id' => 'none_selected',
			'text' => __( 'All Message Types', 'event_espresso' )
		);

		$c_default[0] = array(
			'id' => 'none_selected',
			'text' => __( 'All Contexts', 'event_espresso ' )
		);

		$msgr_filters = ! empty( $m_values ) ? array_merge( $msgr_default, $m_values ) : array();
		$mt_filters = ! empty( $mt_values ) ? array_merge( $mt_default, $mt_values ) : array();
		$c_filters = ! empty( $c_values ) ? array_merge( $c_default, $c_values ): array();

		if ( empty( $m_values ) ) {
			$msgr_filters[0] = array(
				'id'   => 'none_selected',
				'text' => __( 'No Messengers active', 'event_espresso' )
			);
		}

		if ( empty( $mt_values ) ) {
			$mt_filters[0] = array(
				'id'   => 'none_selected',
				'text' => __( 'No Message Types active', 'event_espresso' )
			);
		}

		if ( empty( $c_values ) ) {
			$c_filters[0] = array(
				'id'   => 'none_selected',
				'text' => __( 'No Contexts (because no message types active)', 'event_espresso' )
			);
		}

		$filters[] = EEH_Form_Fields::select_input( 'ee_messenger_filter_by', $msgr_filters, isset( $this->_req_data['ee_messenger_filter_by'] ) ? sanitize_title( $this->_req_data['ee_messenger_filter_by'] ) : '' );
		$filters[] = EEH_Form_Fields::select_input( 'ee_message_type_filter_by', $mt_filters, isset( $this->_req_data['ee_message_type_filter_by'] ) ? sanitize_title( $this->_req_data['ee_message_type_filter_by'] ) : '' );
		$filters[] = EEH_Form_Fields::select_input( 'ee_context_filter_by', $c_filters, isset( $this->_req_data['ee_context_filter_by'] ) ? sanitize_text_field( $this->_req_data['ee_context_filter_by'] ) : '' );
		return $filters;
	}



	protected function _add_view_counts() {
		foreach ( $this->_views as $view => $args ) {
			$this->_views[ $view ]['count'] = $this->_get_messages( $this->_per_page, $view, true, true );
		}
	}


	/**
	 * @param EE_Message $message
	 *
	 * @return string    EE_Message status.
	 */
	public function column_msg_status( EE_Message $message ) {
		return '<span class="ee-status-strip ee-status-strip-td msg-status-' . $message->STS_ID() . '"></span>';
	}


	/**
	 * @param EE_Message $message
	 *
	 * @return string   checkbox
	 */
	public function column_cb( EE_Message $message ) {
		return sprintf( '<input type="checkbox" name="MSG_ID[%s]" value="1" />', $message->ID() );
	}



	/**
	 * @param EE_Message $message
	 * @return string
	 */
	public function column_msg_id( EE_Message $message ) {
		return $message->ID();
	}



	/**
	 * @param EE_Message $message
	 * @return string    The recipient of the message
	 */
	public function column_to( EE_Message $message ) {
		EE_Registry::instance()->load_helper( 'URL' );
		$actions = array();
		if ( $recipient_object = $message->recipient_object() ) {
			$view_details_link = $recipient_object instanceof EEI_Admin_Links ? $recipient_object->get_admin_details_link() : '';
			if ( ! empty( $view_details_link ) ) {
				$actions['view'] = '<a href="' . $view_details_link . '">' . __( 'View Recipient Details', 'event_espresso' ) . '</a>';
			}
		}

		$actions['delete'] = '<a href="'
			. EEH_URL::add_query_args_and_nonce(
				array(
					'page' => 'espresso_messages',
					'action' => 'delete_ee_message',
					'MSG_ID' => $message->ID()
				),
				admin_url( 'admin.php' )
			)
			. '">' . __( 'Delete', 'event_espresso' ) . '</a>';
		return $message->to() . $this->row_actions( $actions );
	}


	/**
	 * @param EE_Message $message
	 * @return string   The sender of the message
	 */
	public function column_from( EE_Message $message ) {
		return $message->from();
	}


	/**
	 *
	 * @param EE_Message $message
	 * @return string  The messenger used to send the message.
	 */
	public function column_messenger( EE_Message $message ) {
		return ucwords( $message->messenger_label() );
	}


	/**
	 * @param EE_Message $message
	 * @return string  The message type used to generate the message.
	 */
	public function column_message_type( EE_Message $message ) {
		return ucwords( $message->message_type_label() );
	}


	/**
	 * @param EE_Message $message
	 * @return string  The context the message was generated for.
	 */
	public function column_context( EE_Message $message ) {
		return $message->context_label();
	}


	/**
	 * @param EE_Message $message
	 * @return string    The timestamp when this message was last modified.
	 */
	public function column_modified( EE_Message $message ) {
		return $message->modified();
	}


	/**
	 * @param EE_Message $message
	 * @return string   Actions that can be done on the current message.
	 */
	public function column_action( EE_Message $message ) {
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		$action_links = array(
			'view' => EEH_MSG_Template::get_message_action_link( 'view', $message ),
			'error' => EEH_MSG_Template::get_message_action_link( 'error', $message ),
			'generate_now' => EEH_MSG_Template::get_message_action_link( 'generate_now', $message ),
			'send_now' => EEH_MSG_Template::get_message_action_link( 'send_now', $message ),
			'queue_for_resending' => EEH_MSG_Template::get_message_action_link( 'queue_for_resending', $message ),
			'view_transaction' => EEH_MSG_Template::get_message_action_link( 'view_transaction', $message ),
		);
		$content = '';
		switch ( $message->STS_ID() ) {
			case EEM_Message::status_sent :
				$content = $action_links['view'] . $action_links['queue_for_resending'] . $action_links['view_transaction'];
				break;
			case EEM_Message::status_resend :
				$content = $action_links['view'] . $action_links['send_now'] . $action_links['view_transaction'];
				break;
			case EEM_Message::status_retry :
				$content = $action_links['view'] . $action_links['send_now'] . $action_links['error'] . $action_links['view_transaction'];
				break;
			case EEM_Message::status_failed :
				$content = $action_links['error'] . $action_links['view_transaction'];
				break;
			case EEM_Message::status_idle :
				$content = $action_links['view'] . $action_links['send_now'] . $action_links['view_transaction'];
				break;
			case EEM_Message::status_incomplete;
				$content = $action_links['generate_now'] . $action_links['view_transaction'];
				break;
		}
		return $content;
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

		$current_page = isset( $this->_req_data['paged'] ) && ! empty( $this->_req_data['paged'] )
			? $this->_req_data['paged']
			: 1;

		$per_page = isset( $this->_req_data['perpage'] ) && ! empty( $this->_req_data['perpage'] )
			? $this->_req_data['perpage']
			: $perpage;

		$offset = ( $current_page - 1 ) * $per_page;
		$limit = $all || $count ? null : array( $offset, $per_page );
		$query_params = array(
			'order_by' => empty( $this->_req_data[ 'orderby' ] ) ? 'MSG_modified' : $this->_req_data[ 'orderby' ],
			'order'    => empty( $this->_req_data[ 'order' ] ) ? 'DESC' : $this->_req_data[ 'order' ],
			'limit'    => $limit,
		);

		/**
		 * Any filters coming in from other routes?
		 */
		if ( isset( $this->_req_data['filterby'] ) ) {
			$query_params = array_merge( $query_params, EEM_Message::instance()->filter_by_query_params() );
		}

		//view conditionals
		if ( $view !== 'all' && $count && $all ) {
			$query_params[0]['AND*view_conditional'] = array(
				'STS_ID' => strtoupper( $view ),
			);
		}

		if ( ! empty( $this->_req_data['status'] )  && ! $all && $this->_req_data['status'] !== 'all' ) {
			$query_params[0]['AND*view_conditional'] = array(
				'STS_ID' => strtoupper( $this->_req_data['status'] ),
			);
		}

		if ( ! $all && ! empty( $this->_req_data['s'] ) ) {
			$search_string = '%' . $this->_req_data['s'] . '%';
			$query_params[0]['OR'] = array(
				'MSG_to' => array( 'LIKE', $search_string ),
				'MSG_from' => array( 'LIKE', $search_string ),
				'MSG_subject' => array( 'LIKE', $search_string ),
				'MSG_content' => array( 'LIKE', $search_string ),
			);
		}

		//account for filters
		if ( ! $all
		     && isset( $this->_req_data['ee_messenger_filter_by'] )
		     && $this->_req_data['ee_messenger_filter_by'] !== 'none_selected'
		) {
			$query_params[0]['AND*messenger_filter'] = array(
				'MSG_messenger' => $this->_req_data['ee_messenger_filter_by'],
			);
		}
		if ( ! $all
		     && ! empty( $this->_req_data['ee_message_type_filter_by'] )
			 && $this->_req_data['ee_message_type_filter_by'] !== 'none_selected'
		) {
			$query_params[0]['AND*message_type_filter'] = array(
				'MSG_message_type' => $this->_req_data['ee_message_type_filter_by'],
			);
		}

		if ( ! $all
		     && ! empty( $this->_req_data['ee_context_filter_by'] )
		     && $this->_req_data['ee_context_filter_by'] !== 'none_selected'
		) {
			$query_params[0]['AND*context_filter'] = array(
				'MSG_context' => array( 'IN', explode( ',', $this->_req_data['ee_context_filter_by'] ) )
			);
		}

		return $count
			? EEM_Message::instance()->count( $query_params, null, true )
			: EEM_Message::instance()->get_all( $query_params );

	}
} //end EE_Message_List_Table class