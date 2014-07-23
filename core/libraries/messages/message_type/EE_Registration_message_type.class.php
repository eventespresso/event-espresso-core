<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Registration_message_type
 *
 * Handles frontend registration message types.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/message_type/EE_Registration_message_type.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Registration_message_type extends EE_message_type {

	public function __construct() {
		$this->name = 'registration';
		$this->description = __('This message type is for messages sent to attendees when their registration is approved.', 'event_espresso');
		$this->label = array(
			'singular' => __('registration approved', 'event_espresso'),
			'plural' => __('registrations approved', 'event_espresso')
			);

		parent::__construct();
	}



	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(
			'events_edit' => TRUE
			);
	}


	protected function _get_admin_content_events_edit_for_messenger( EE_Messenger $messenger ) {
		//this is just a test
		return $this->name . ' Message Type for ' . $messenger->name . ' Messenger ';
	}




	protected function _set_data_handler() {
		$this->_data_handler = $this->_data instanceof EE_Registration ? 'REG' : 'Gateways';
		$this->_single_message = $this->_data instanceof EE_Registration ? TRUE : FALSE;
	}



	/**
	 * Setup admin settings for this message type.
	 */
	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array();
	}





	protected function _set_default_field_content() {

		$this->_default_field_content = array(
			'subject' => $this->_default_template_field_subject(),
			'content' => $this->_default_template_field_content(),
		);
	}






	protected function _default_template_field_subject() {
		foreach ( $this->_contexts as $context => $details ) {
			$content[$context] = 'Event Registration Details';
		};
		return $content;
	}






	protected function _default_template_field_content() {
		$content = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-content.template.php', TRUE );

		foreach ( $this->_contexts as $context => $details ) {
			$tcontent[$context]['main'] = $content;
			$tcontent[$context]['attendee_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-attendee-list.template.php', TRUE );
			$tcontent[$context]['event_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-event-list.template.php', TRUE );
			$tcontent[$context]['ticket_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-ticket-list.template.php', TRUE );
			$tcontent[$context]['datetime_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-datetime-list.template.php', TRUE );
		}


		return $tcontent;
	}






	/**
	 * _set_contexts
	 * This sets up the contexts associated with the message_type
	 *
	 * @access  protected
	 * @return  void
	 */
	protected function _set_contexts() {
		$this->_context_label = array(
			'label' => __('recipient', 'event_espresso'),
			'plural' => __('recipients', 'event_espresso'),
			'description' => __('Recipient\'s are who will receive the template.  You may want different registration details sent out depending on who the recipient is', 'event_espresso')
			);

		$this->_contexts = array(
			'admin' => array(
				'label' => __('Event Admin', 'event_espresso'),
				'description' => __('This template is what event administrators will receive with an approved registration', 'event_espresso')
				),
			'primary_attendee' => array(
				'label' => __('Primary Registrant', 'event_espresso'),
				'description' => __('This template is what the primary registrant (the person who completed the initial transaction) will receive with approved registration', 'event_espresso')
				),
			'attendee' => array(
				'label' => __('Registrant', 'event_espresso'),
				'description' => __('This template is what each registrant for the event will receive when their registration is approved.', 'event_espresso')
				)
			);
	}


	protected function _set_valid_shortcodes() {
		parent::_set_valid_shortcodes();

		//remove unwanted transaction shortcode
		foreach ( $this->_valid_shortcodes as $context => $shortcodes ) {
			if( ($key = array_search('transaction', $shortcodes) ) !== false) {
			    unset($this->_valid_shortcodes[$context][$key]);
			}
		}
	}


	/**
	 * returns an array of addressee objects for event_admins
	 *
	 * @access protected
	 * @return array array of EE_Messages_Addressee objects
	 */
	protected function _admin_addressees() {
		if ( $this->_single_message )
			return array();
		return parent::_admin_addressees();
	}



	protected function _primary_attendee_addressees() {
		if ( $this->_single_message )
			return array();

		return parent::_primary_attendee_addressees();
	}

} //end EE_Registration_message_type class
