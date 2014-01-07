<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Payment_Declined_message_type extends EE_message_type
 *
 * Handles frontend and backend payment notification messages for declined payments
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/message_type/EE_Payment_Declined_message_type.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Payment_Declined_message_type extends EE_message_type {

	public function __construct() {

		//setup type details for reference
		$this->name = 'payment_declined';
		$this->description = __('This message type is used for all declined payment notification messages that go out including any manual payments entered by an event administrator.', 'event_espresso'); 
		$this->label = array(
			'singular' => __('declined payment', 'event_espresso'),
			'plural' => __('declined payments', 'event_espresso')
			);

		parent::__construct();
	
	}

	
	/**
	 * see abstract declaration in parent class for details.
	 */
	protected function _set_admin_pages() {
		$this->admin_registered_pages = array(
			'events_edit' => true
			); 
	}



	protected function _set_data_handler() {
		$this->_data_handler = 'Gateways';
	}



	protected function _get_admin_content_events_edit_for_messenger( EE_Messenger $messenger ) {
		//this is just a test
		return $this->name . ' Message Type for ' . $messenger->name . ' Messenger ';
	}

	/**
	 * This message type doesn't need any settings so we are just setting to empty array.
	 */
	protected function _set_admin_settings_fields() {
		$this->_admin_settings_fields = array();
	}

	protected function _set_default_field_content() {

		$this->_default_field_content = array(
			'subject' => $this->_default_template_field_subject(),
			'content' => $this->_default_template_field_content(),
		);
		$this->_default_field_content = apply_filters('FHEE_default_field_content_'.$this->name, $this->_default_field_content);
	}




	protected function _default_template_field_subject() {
		foreach ( $this->_contexts as $context => $details ) {
			$content[$context] = __('Event Payment Details: Your payment was declined', 'event_espresso');
		};
		return $content;
	}

	protected function _default_template_field_content() {
		$content = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/payment-declined-message-type-content.template.php');

		foreach ( $this->_contexts as $context => $details ) {
			$tcontent[$context]['main'] = $content;
			$tcontent[$context]['event_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/payment-message-type-event-list.template.php');
			$tcontent[$context]['ticket_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/payment-message-type-ticket-list.template.php');
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
			'description' => __('Recipient\'s are who will recieve the template.  You may want different payment details sent out depending on who the recipient is', 'event_espresso')
			);

		$this->_contexts = array(
			'admin' => array(
				'label' => __('Event Admin', 'event_espresso'),
				'description' => __('This template is what event administrators will receive when payment is declined', 'event_espresso')
				),
			'primary_attendee' => array(
				'label' => __('Primary Registrant', 'event_espresso'),
				'description' => __('This template is what the primary registrant (the person who made the main registration) will receive when the payment is declined', 'event_espresso')
				)
			);

		$this->_contexts = apply_filters('FHEE_set_contexts_'. $this->name, $this->_contexts);
		$this->_contexts = apply_filters('FHEE_set_contexts_all', $this->_contexts);
	}


	/**
	 * see abstract declaration in parent class for details
	 */
	protected function _set_valid_shortcodes() {
		$this->_valid_shortcodes = array(
			'admin' => array('transaction','event','organization','registration','event_list', 'ticket_list', 'attendee'),
			'primary_attendee' => array('transaction', 'event', 'organization','registration', 'event_list', 'ticket_list', 'attendee')
			);
	}







	/**
	 * returns an array of addressee objects for event_admins
	 *
	 * @access protected
	 * @return array array of EE_Messages_Addressee objects
	 */
	protected function _admin_addressees() {
		$admin_ids = array();
		$admin_events = array();
		$addresees = array();

		//first we need to get the event admin user id for all the events and setup an addressee object for each unique admin user.
		foreach ( $this->_data->events as $line_ref => $event ) {
			//get the user_id for the event
			$admin_id = $this->_get_event_admin_id($event['ID']);
			$admin_ids[] = $admin_id;
			//make sure we are just including the events that belong to this admin!
			$admin_events[$admin_id][$line_ref] = $event;
		}

		//make sure we've got unique event_admins!
		$admin_ids = array_unique($admin_ids);

		//k now we can loop through the event_admins and setup the addressee data.
		foreach ( $admin_ids as $event_admin ) {
			$aee = array(
				'user_id' => $event_admin,
				'events' => $admin_events[$event_admin],
				'attendees' => $this->_data->attendees
				);

			//merge in with default addressee_data
			$aee = array_merge( $this->_default_addressee_data, $aee );

			$addressees[] = new EE_Messages_Addressee( $aee );
		}

		return $addressees;
	}



	/**
	 * Takes care of setting up the addressee object(s) for the primary attendee.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _primary_attendee_addressees() {
		$add = array();

		$aee = $this->_default_addressee_data;
		$aee['events'] = $this->_data->events;
		$aee['attendees'] = $this->_data->attendees;
		$aee['att_obj'] = $this->_data->primary_attendee_data['att_obj'];

		//great now we can instantiate the $addressee object and return (as an array);
		$add[] = new EE_Messages_Addressee( $aee );

		return $add;
	}
	
}

// end of file:	includes/core/messages/types/EE_Onsite Payment_message.class.php