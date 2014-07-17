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
 * EE_Attendee_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Attendee_Shortcodes lists all shortcodes related to attendee specific info.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Attendee_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Attendee_Shortcodes extends EE_Shortcodes {

	/**
	 * hold all extra data.
	 * @var array
	 */
	protected $_xtra;

	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Attendee Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to attendee related data', 'event_espresso');
		$this->_shortcodes = array(
			'[FNAME]' => __('First Name of an attendee.', 'event_espresso'),
			'[LNAME]' => __('Last Name of an attendee.', 'event_espresso'),
			'[ATTENDEE_EMAIL]' => __('Email address for the attendee.', 'event_espresso'),
			'[EDIT_ATTENDEE_LINK]' => __('Edit Registration Link (typically you\'d only use this for messages going to event administrators)', 'event_espresso'),
			'[REGISTRATION_CODE]' => __('Unique Registration Code for the registration', 'event_espresso'),
			'[FRONTEND_EDIT_REG_LINK]' => __('Generates a link for the given registration to edit this registration details on the frontend.', 'event_espresso'),
			'[PHONE_NUMBER]' => __('The Phone Number for the Registration.', 'event_espresso'),
			'[ADDRESS]' => __('The Address for the Registration', 'event_espresso'),
			'[ADDRESS2]' => __('Whatever was in the address 2 field for the registration.', 'event_espresso'),
			'[CITY]' => __('The city for the registration.', 'event_espresso'),
			'[ZIP_PC]' => __('The ZIP (or Postal) Code for the Registration.', 'event_espresso'),
			'[ADDRESS_STATE]' => __('The state/province for the registration.', 'event_espresso' ),
			'[COUNTRY]' => __('The country for the registration.', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {


		$this->_xtra = !empty($this->_extra_data ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data'] : NULL;

		//incoming object should only be a registration object.
		$registration = ! $this->_data instanceof EE_Registration ? NULL : $this->_data;

		if ( empty( $registration ) )
			return '';

		//attendee obj for this registration
		$attendee = $this->_xtra->registrations[$registration->ID()]['att_obj'];

		switch ( $shortcode ) {

			case '[FNAME]' :
				return $attendee->fname();
				break;

			case '[LNAME]' :
				return $attendee->lname();
				break;

			case '[ATTENDEE_EMAIL]' :
				return $attendee->email();
				break;

			case '[EDIT_ATTENDEE_LINK]' :
				return $registration->get_admin_edit_url();
				break;

			case '[REGISTRATION_CODE]' :
				return $registration->reg_code();
				break;

			case '[FRONTEND_EDIT_REG_LINK]' :
				return $registration->edit_attendee_information_url();
				break;

			case '[PHONE_NUMBER]' :
				return $attendee->phone();
				break;

			case '[ADDRESS]' :
				return $attendee->address();
				break;

			case '[ADDRESS2]' :
				return $attendee->address2();
				break;

			case '[CITY]' :
				return $attendee->city();
				break;

			case '[ZIP_PC]' :
				return $attendee->zip();
				break;

			case '[ADDRESS_STATE]' :
				$state_obj = $attendee->state_obj();
				return $state_obj instanceof EE_State ? $state_obj->name() : '';
				break;

			case '[COUNTRY]' :
				$country_obj = $attendee->country_obj();
				return $country_obj instanceof EE_Country ? $country_obj->name() : '';
				break;

		}

		return '';
	}


} //end EE_Attendee_Shortcodes class
