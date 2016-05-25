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
 * EE_Messages_Email_Payment_Validator class
 *
 * Holds any special validation rules for template fields with Email messenger and Payment message type.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/validators/email/EE_Messages_Email_Payment_Validator.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messages_Email_Payment_Validator extends EE_Messages_Validator {


	public function __construct( $fields, $context ) {
		$this->_m_name = 'email';
		$this->_mt_name = 'payment';

		parent::__construct( $fields, $context );
	}

	/**
	 * at this point no custom validation needed for this messenger/message_type combo.
	 */
	protected function _modify_validator() {
		$new_config = $this->_messenger->get_validator_config();

		//modify just event_list
		$new_config['event_list'] = array(
			'shortcodes' => array('event', 'attendee_list', 'ticket_list', 'datetime_list', 'venue', 'organization','recipient_details', 'recipient_list', 'event_author', 'primary_registration_details', 'primary_registration_list')
			);
		$new_config['ticket_list'] = array(
			'shortcodes' => array('event_list', 'attendee_list', 'ticket', 'datetime_list', 'recipient_details', 'transaction')
			);
		$new_config['content'] = array(
			'shortcodes' => array('event_list','attendee_list', 'ticket_list', 'organization', 'recipient_details', 'recipient_list', 'transaction', 'primary_registration_details', 'primary_registration_list', 'messenger')
			);
		$this->_messenger->set_validator_config( $new_config );

		if ( $this->_context != 'admin' )
			$this->_valid_shortcodes_modifier[$this->_context]['event_list'] = array('event', 'attendee_list', 'ticket_list', 'datetime_list', 'venue', 'organization', 'event_author', 'primary_registration_details', 'primary_registration_list', 'recipient_details', 'recipient_list');

		$this->_specific_shortcode_excludes['content'] = array('[DISPLAY_PDF_URL]', '[DISPLAY_PDF_BUTTON]');
	}

} //end class EE_Messages_Email_Payment_Validator
