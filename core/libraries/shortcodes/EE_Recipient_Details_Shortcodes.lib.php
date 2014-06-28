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
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Recipient_Details_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Recipient_Details_Shortcodes lists all shortcodes related to recipient specific info.  Meaning, that when this is parsed, we're parsing for WHO is receiving the message.  This only parses for Registrants and Primary Registrants as recipients.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Recipient_Details_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Recipient_Details_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Recipient Details Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to recipient registration data', 'event_espresso');
		$this->_shortcodes = array(
			'[RECIPIENT_FNAME]' => __('Parses to the first name of the recipient for the message.', 'event_espresso'),
			'[RECIPIENT_LNAME]' => __('Parses to the last name of the recipient for the message.', 'event_espresso'),
			'[RECIPIENT_EMAIL]' => __('Parses to the email address of the recipient for the message.', 'event_espresso'),
			'[RECIPIENT_REGISTRATION_CODE]' => __('Parses to the registration code of the recipient for the message.', 'event_espresso'),
			'[RECIPIENT_EDIT_REGISTRATION_LINK]' => __('Parses to a link for frontend editing of the registration for the recipient.', 'event_espresso'),
			'[RECIPIENT_PHONE_NUMBER]' => __('The Phone Number for the recipient of the message.', 'event_espresso'),
			'[RECIPIENT_ADDRESS]' => __('The Address for the recipient of the message.', 'event_espresso'),
			'[RECIPIENT_ADDRESS2]' => __('Whatever was in the address 2 field for the recipient of the message.', 'event_espresso'),
			'[RECIPIENT_CITY]' => __('The city for the recipient of the message.', 'event_espresso'),
			'[RECIPIENT_ZIP_PC]' => __('The ZIP (or Postal) Code for the recipient of the message.', 'event_espresso'),
			'[RECIPIENT_ADDRESS_STATE]' => __('The state/province for the recipient of the message.', 'event_espresso' ),
			'[RECIPIENT_COUNTRY]' => __('The country for the recipient of the message.', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {

		//make sure we end up with a copy of the EE_Messages_Addressee object
		$recipient = $this->_data instanceof EE_Messages_Addressee ? $this->_data : NULL;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && is_array($this->_data) && isset( $this->_data['data'] ) && $this->_data['data'] instanceof EE_Messages_Addressee ? $this->_data['data'] : $recipient;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && !empty( $this->_extra_data['data'] ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data'] : $recipient;

		if ( ! $recipient instanceof EE_Messages_Addressee )
			return '';

		$attendee = $recipient->att_obj;
		if ( ! $attendee instanceof EE_Attendee )
			return '';

		switch ( $shortcode ) {
			case '[RECIPIENT_FNAME]' :
				return $attendee->fname();
				break;

			case '[RECIPIENT_LNAME]' :
				return $attendee->lname();
				break;

			case '[RECIPIENT_EMAIL]' :
				return $attendee->email();
				break;

			case '[RECIPIENT_REGISTRATION_CODE]' :
				if ( ! $recipient->reg_obj instanceof EE_Registration )
					return '';
				return $recipient->reg_obj->reg_code();
				break;

			case '[RECIPIENT_EDIT_REGISTRATION_LINK]' :
				if ( ! $recipient->reg_obj instanceof EE_Registration )
					return '';
				return $recipient->reg_obj->edit_attendee_information_url();
				break;

			case '[RECIPIENT_PHONE_NUMBER]' :
				return $attendee->phone();
				break;

			case '[RECIPIENT_ADDRESS]' :
				return $attendee->address();
				break;

			case '[RECIPIENT_ADDRESS2]' :
				return $attendee->address2();
				break;

			case '[RECIPIENT_CITY]' :
				return $attendee->city();
				break;

			case '[RECIPIENT_ZIP_PC]' :
				return $attendee->zip();
				break;

			case '[RECIPIENT_ADDRESS_STATE]' :
				$state_obj = $attendee->state_obj();
				return $state_obj instanceof EE_State ? $state_obj->name() : '';
				break;

			case '[RECIPIENT_COUNTRY]' :
				$country_obj = $attendee->country_obj();
				return $country_obj instanceof EE_Country ? $country_obj->name() : '';
				break;

			default :
				return '';
				break;
		}
	}


} // end EE_Registration_Shortcodes class
