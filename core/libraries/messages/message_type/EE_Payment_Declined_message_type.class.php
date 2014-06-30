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

class EE_Payment_Declined_message_type extends EE_Payment_Base_message_type {

	public function __construct() {

		//setup type details for reference
		$this->name = 'payment_declined';
		$this->description = __('This message type is used for all declined payment notification messages that go out including any manual payments entered by an event administrator.', 'event_espresso');
		$this->label = array(
			'singular' => __('payment declined', 'event_espresso'),
			'plural' => __('payments declined', 'event_espresso')
			);

		parent::__construct();

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
			$tcontent[$context]['event_list'] = file_get_contents( EE_LIBRARIES . 'messages/message_type/assets/defaults/payment-declined-message-type-event-list.template.php');
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
			'description' => __('Recipient\'s are who will receive the template.  You may want different payment details sent out depending on who the recipient is', 'event_espresso')
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
	}


}

// end of file:	includes/core/messages/types/EE_Onsite Payment_message.class.php
