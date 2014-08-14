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

class Messages_Template_List_Table extends EE_Admin_List_Table {


	protected function _setup_data() {
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
			//'cb' => '<input type="checkbox" />', //no deleting default (global) templates!
			'message_type' => __('Message Type', 'event_espresso'),
			'messenger' => __( 'Messenger', 'event_espresso'),
			'description' => __( 'Description', 'event_espresso' ),
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
			$this->_views[$view]['count'] = $this->_admin_page->get_message_templates( $this->_per_page, $view, TRUE, TRUE );
		}
	}



	public function column_cb( $item ) {
		return '';
	}



	function column_description( $item ) {
		return '<p>' . $item->message_type_obj()->description . '</p>';
	}



	/*function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', $item->GRP_ID() );
	}/**/

	function column_messenger($item) {

		//Build row actions
		$actions = array();

		// edit link but only if item isn't trashed.
		if ( !$item->get('MTP_deleted') ) {
			$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_message_template', 'id'=>$item->GRP_ID() ), EE_MSG_ADMIN_URL );
			$actions['edit'] = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template Group', 'event_espresso' ) . '">' . __( 'Edit', 'event_espresso' ) . '</a>';
		}

		$name_link = ! $item->get('MTP_deleted') ? '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Template Group', 'event_espresso' ) . '">' . ucwords( $item->messenger_obj()->label['singular'] ) . '</a>' : ucwords( $item->messenger_obj()->label['singular'] );

		//we want to display the contexts in here so we need to set them up
		$c_label = $item->context_label();
		$c_configs = $item->contexts_config();
		$ctxt = array();
		$context_templates = $item->context_templates();
		foreach ( $context_templates as $context => $template_fields ) {
			$mtp_to = $context_templates[$context]['to'] instanceof EE_Message_Template ? $context_templates[$context]['to']->get('MTP_content') : NULL;
			$inactive = empty( $mtp_to ) ? ' class="mtp-inactive"' : '';
			$context_title = ucwords($c_configs[$context]['label']);
			$edit_link = EE_Admin_Page::add_query_args_and_nonce( array('action'=>'edit_message_template', 'id'=>$item->GRP_ID(), 'context' => $context), EE_MSG_ADMIN_URL );
			$ctxt[] = '<a' . $inactive . ' href="'. $edit_link . '" title="' . __('Edit Context', 'event_espresso') . '">' . $context_title . '</a>';
		}

		$ctx_content = !$item->get('MTP_deleted') ? sprintf( __('<strong>%s:</strong> ', 'event_espresso'), ucwords($c_label['plural']) ) . implode(' | ', $ctxt) : '';


		//Return the name contents
		return sprintf('%1$s <span style="color:silver">(id:%2$s)</span><br />%3$s%4$s',
										/* $1%s */ $name_link,
										/* $2%s */ $item->GRP_ID(),
										/* %4$s */ $ctx_content,
										/* $3%s */ $this->row_actions( $actions )
		);
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
