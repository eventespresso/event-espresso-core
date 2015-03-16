<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * EE_Payment_Cancelled_message_type extends EE_message_type
 *
 * Handles frontend and backend payment notification messages for cancelled payments
 *
 * @package		Event Espresso
 * @subpackage	messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Payment_Cancelled_message_type extends EE_Payment_Base_message_type {

	public function __construct() {

		//setup type details for reference
		$this->name = 'payment_cancelled';
		$this->description = __('This message type is used for all cancelled payment notification messages that go out including any manual payments entered by an event administrator.', 'event_espresso');
		$this->label = array(
			'singular' => __('payment cancelled', 'event_espresso'),
			'plural' => __('payments cancelled', 'event_espresso')
			);

		$this->_master_templates = array(
			'email' => 'payment'
			);

		parent::__construct();

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
			'description' => __('Recipient\'s are who will receive the template.  You may want different payment details sent out depending on who the recipient is.', 'event_espresso')
			);

		$this->_contexts = array(
			'admin' => array(
				'label' => __('Event Admin', 'event_espresso'),
				'description' => __('This template is what event administrators will receive when payment is cancelled.', 'event_espresso')
				),
			'primary_attendee' => array(
				'label' => __('Primary Registrant', 'event_espresso'),
				'description' => __('This template is what the primary registrant (the person who made the main registration) will receive when the payment is cancelled.', 'event_espresso')
				)
			);
	}


}
