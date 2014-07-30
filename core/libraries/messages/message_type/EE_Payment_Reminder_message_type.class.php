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
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Payment_Reminder_message_type extends EE_message_type
 *
 * Handles triggered payment reminder notification messages.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/message_type/EE_Payment_Reminder_message_type.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Payment_Reminder_message_type extends EE_Payment_Base_message_type {

	public function __construct() {

		//setup type details for reference
		$this->name = 'payment_reminder';
		$this->description = __('This message type is used for all payment reminder messages.  These are triggered when an offline gateway registration is completed or when manually triggered via event administrators via the transaction admin page(s).', 'event_espresso');
		$this->label = array(
			'singular' => __('payment reminder', 'event_espresso'),
			'plural' => __('payment reminders', 'event_espresso')
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
			'description' => __('Recipient\'s are who will receive the template.  You may want different payment details sent out depending on who the recipient is', 'event_espresso')
			);

		$this->_contexts = array(
			'admin' => array(
				'label' => __('Event Admin', 'event_espresso'),
				'description' => __('This template is what event administrators will receive on a successful payment', 'event_espresso')
				),
			'primary_attendee' => array(
				'label' => __('Primary Registrant', 'event_espresso'),
				'description' => __('This template is what the primary registrant (the person who made the main registration) will receive on successful payment', 'event_espresso')
				)
			);
	}

}

// end of file:	includes/core/messages/types/EE_Onsite Payment_message.class.php
