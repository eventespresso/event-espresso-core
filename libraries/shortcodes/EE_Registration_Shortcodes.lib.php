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
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Registration_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Registration_Shortcodes lists all shortcodes related to registration specific info. (note, we're making the assumption that registrations do not necessarily require payment)
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Registration_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Registration_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Registration Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to registration related data', 'event_espresso');
		$this->_shortcodes = array(
			'[PRIMARY_REGISTRATION_ID]' => __('This will be replaced with the Registration ID for the primary attendee of an event', 'event_espresso'),
			'[ATTENDEE_REGISTRATION_ID]' => __('this will be replaced with the attendee registration id for the Attendee of an event', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			case '[PRIMARY_REGISTRATION_ID]' :
				return $this->_data->primary_registration_id;
				break;

			case '[ATTENDEE_REGISTRATION_ID]' :
				$id = !empty($this->_data->attendee_registration_id) ? $this->_data->attendee_registration_id : '';
				return isset( $this->_data['registration_id'] ) ? $this->_data['registration_id'] : $id;
				break;

			case '[ATTENDEE_LIST]' :
				return isset( $this->_data->attendee_list ) ? $this->_data->attendee_list : '';
				break;

			case '[EVENT_LIST]' :
				return isset( $this->_data->event_list ) ? $this->_data->event_list : '';
				break;
		}
	}

	
} // end EE_Registration_Shortcodes class