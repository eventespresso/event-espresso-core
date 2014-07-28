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
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Messages_Template_List_Table
 *
 * extends EE_Admin_List_Table class
 *
 * @package		Event Espresso
 * @subpackage	/includes/core/admin/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Custom_Messages_Template_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		//Set parent defaults
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_data = $this->_admin_page->get_message_templates( $this->_per_page, $this->_view, FALSE, FALSE, FALSE );
		$this->_all_data_count = $this->_admin_page->get_message_templates( $this->_per_page, $this->_view, TRUE, TRUE, FALSE );
	}





	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('Message Template Group', 'event_espresso' ),
			'plural' => __('Message Template', 'event_espresso' ),
			'ajax' => TRUE, //for now,
			'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
			'cb' => '<input type="checkbox" />',
			'name' => __('Template Name', 'event_espresso'),
			'message_type' => __('Message Type', 'event_espresso'),
			'messenger' => __( 'Messenger', 'event_espresso'),
			'description' => __( 'Description', 'event_espresso' ),
			'events' => __( 'Events', 'event_espresso'), //count of events using this template.
			'actions' => ''
			//'messages_sent' => __( 'Total Sent', 'event_espresso' ) //todo this will come later when we've got message tracking in place.
			);

		$this->_sortable_columns = array(
			'messenger' => array( 'MTP_messenger' => TRUE ),
			//'message_type' => array( 'MTP_message_type' => FALSE )
			);

		$this->_hidden_columns = array();
	}



	protected function _get_table_filters() {
		$filters = array();
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		$messengers = $this->_admin_page->get_active_messengers();
		$message_types = $this->_admin_page->get_installed_message_types();


		//setup messengers for selects
		$i=1;
		foreach ( $messengers as $messenger => $args ) {
			$m_values[$i]['id'] = $messenger;
			$m_values[$i]['text'] = ucwords($args['obj']->label['singular']);
			$i++;
		}

		//lets do the same for message types
		$i=1;
		foreach ( $message_types as $message_type => $args ) {
			$mt_values[$i]['id'] = $message_type;
			$mt_values[$i]['text'] = ucwords($args['obj']->label['singular']);
			$i++;
		}

		$msgr_default[0] = array(
			'id' => 'none_selected',
			'text' => __('Show All', 'event_espresso')
			);

		$mt_default[0] = array(
			'id' => 'none_selected',
			'text' => __('Show All', 'event_espresso')
			);

		$msgr_filters = !empty($m_values) ? array_merge( $msgr_default, $m_values ) : array();
		$mt_filters = !empty($mt_values) ? array_merge( $mt_default, $mt_values ) : array();

		if ( empty( $m_values ) )
			$msgr_filters[0] = array(
				'id' => 'no_messenger_options',
				'text' => __('No Messengers active', 'event_espresso')
				);

		if ( empty($mt_values) )
			$mt_filters[0] = array(
				'id' => 'no_message_type_options',
				'text' => __('No Message Types active', 'event_espresso')
				);

		if ( count( $messengers ) >= 1  && !empty( $m_values ) ) {
			unset( $msgr_filters[0] );
			$msgr_filters = array_values( $msgr_filters ); //reindex keys
		}

		$filters[] = EEH_Form_Fields::select_input('ee_messenger_filter_by', $msgr_filters, isset($this->_req_data['ee_messenger_filter_by']) ? sanitize_key( $this->_req_data['ee_messenger_filter_by']) : '' );
		$filters[] = EEH_Form_Fields::select_input('ee_message_type_filter_by', $mt_filters, isset($this->_req_data['ee_message_type_filter_by']) ? sanitize_key( $this->_req_data['ee_message_type_filter_by']) : '');
		return $filters;
	}

	/**
	 * we're just removing the search box for message templates, not needed.
	 * @return string (empty);
	 */
	function search_box( $text, $input_id ) {
		return '';
	}


	protected function _add_view_counts() {
		foreach ( $this->_views as $view => $args )  {
			$this->_views[$view]['count'] = $this->_admin_page->get_message_templates( $this->_per_page, $view, TRUE, TRUE, FALSE );
		}
	}



	/**
	 * Custom message for when there are no items found.
	 *
	 * @since 4.3.0
	 *
	 * @return string
	 */
	public function no_items() {
		if ( $this->_view !== 'trashed' )
			_e( '<strong>No Custom Templates found.</strong>  To create your first custom message template, go to the "Default Message Templates" tab and click the "Create Custom" button next to the template you want to use as a base for the new one.', 'event_espresso');
		else
			parent::no_items();
	}



	public function column_cb( $item ) {
		return sprintf( '<input type="checkbox" name="checkbox[%s] value="1" />', $item->GRP_ID() );
	}



	/**
	 * column_default
	 * @param  object $item        item for row
	 * @param  string $column_name name of column
	 * @return string              column_name for default column
	 */
	function column_default($item, $column_name) {
		return ( isset( $item->$column_name ) ) ? $item->column_name : '';
	}




	function column_name( $item ) {
		return '<p>' . $item->name() . '</p>';
	}




	function column_description( $item ) {
		return '<p>' . $item->description() . '</p>';
	}



	function column_actions( $item ) {
		if ( EE_Registry::instance()->CAP->current_user_can( 'edit_messages', 'espresso_messages_add_new_message_template' ) ) {
			$create_args = array(
				'GRP_ID' => $item->ID(),
				'messenger' => $item->messenger(),
				'message_type' => $item->message_type(),
				'action' => 'add_new_message_template'
				);
			$create_link = EE_Admin_Page::add_query_args_and_nonce( $create_args, EE_MSG_ADMIN_URL );
			return sprintf( '<p><a href="%s" class="button button-small">%s</a></p>', $create_link, __('Create Custom', 'event_espresso') );
		}
		return '';
	}



	/*function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', $item->GRP_ID() );
	}/**/

	function column_messenger($item) {

		//Build row actions
		$actions = array();

		// edit link but only if item isn't trashed.
		if ( !$item->get('MTP_deleted') && EE_Registry::instance()->CAP->current_user_can( 'edit_message', 'espresso_messages_edit_message_template', $item->ID() ) ) {
			$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_message_template', 'id'=>$item->GRP_ID() ), EE_MSG_ADMIN_URL );
			$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		}

		$name_link = ! $item->get('MTP_deleted') && EE_Registry::instance()->CAP->current_user_can( 'edit_message', 'espresso_messages_edit_message_template', $item->ID() )? '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template', 'event_espresso' ) . '">' . ucwords( $item->messenger_obj()->label['singular'] ) . '</a>' : ucwords( $item->messenger_obj()->label['singular'] );
		$trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'trash_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		// restore link
		$restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'restore_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		// delete price link
		$delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'delete_message_template', 'id'=>$item->GRP_ID(), 'noheader' => TRUE ), EE_MSG_ADMIN_URL );

		if ( !$item->get('MTP_deleted') && EE_Registry::instance()->CAP->current_user_can( 'delete_message', 'espresso_messages_trash_message_template', $item->ID() ) ) {
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Move Template Group to Trash', 'event_espresso' ) . '">' . __( 'Move to Trash', 'event_espresso' ) . '</a>';
		} else {
			if ( EE_Registry::instance()->CAP->current_user_can( 'delete_message', 'espresso_messages_restore_message_template', $item->ID() ) ) {
				$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Message Template', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			}

			if ( $this->_view == 'trashed' && EE_Registry::instance()->CAP->current_user_can( 'delete_message', 'espresso_messages_delete_message_template', $item->ID() ) ) {
				$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Template Group Permanently', 'event_espresso' ) . '">' . __( 'Delete Permanently', 'event_espresso' ) . '</a>';
			}
		}

		//we want to display the contexts in here so we need to set them up
		$c_label = $item->context_label();
		$c_configs = $item->contexts_config();
		$ctxt = array();
		$context_templates = $item->context_templates();
		foreach ( $context_templates as $context => $template_fields ) {
			$mtp_to = !empty( $context_templates[$context]['to'] ) && $context_templates[$context]['to'] instanceof EE_Message_Template ? $context_templates[$context]['to']->get('MTP_content') : NULL;
			$inactive = empty( $mtp_to ) && !empty( $context_templates[$context]['to'] ) ? ' class="mtp-inactive"' : '';
			$context_title = ucwords($c_configs[$context]['label']);
			$edit_link = EE_Admin_Page::add_query_args_and_nonce( array('action'=>'edit_message_template', 'id'=>$item->GRP_ID(), 'context' => $context), EE_MSG_ADMIN_URL );
			$ctxt[] = EE_Registry::instance()->CAP->current_user_can( 'edit_message', 'espresso_messages_edit_message_template', $item->ID() ) ? '<a' . $inactive . ' href="'. $edit_link . '" title="' . __('Edit Context', 'event_espresso') . '">' . $context_title . '</a>' : $context_title;
		}

		$ctx_content = !$item->get('MTP_deleted') && EE_Registry::instance()->CAP->current_user_can( 'edit_message', 'espresso_messages_edit_message_template', $item->ID() ) ? sprintf( __('<strong>%s:</strong> ', 'event_espresso'), ucwords($c_label['plural']) ) . implode(' | ', $ctxt) : '';


		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span><br />%3$s%4$s',
										/* $1%s */ $name_link,
										/* $2%s */ $item->GRP_ID(),
										/* %4$s */ $ctx_content,
										/* $3%s */ $this->row_actions( $actions )
		);
	}

	/**
	 * column_events
	 * This provides a count of events using this custom template
	 *
	 * @param  array $item message_template group data
	 * @return string column output
	 */
	function column_events($item) {
		return $item->count_events();
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

}
