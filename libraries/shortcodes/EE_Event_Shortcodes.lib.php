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
 * EE_Event_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Event_Shortcodes lists all shortcodes related to event specific info. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Event_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Shortcodes extends EE_Shortcodes {


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Event Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to event related data', 'event_espresso');
		$this->_shortcodes = array(
			'[EVENT_ID]' => __('Will be replaced by the event ID of an event', 'event_espresso'),
			'[EVENT_IDENTIFIER]' => __('Will be replaced with the event identifier of an event', 'event_espresso'),
			'[EVENT]' => __('The name of the event', 'event_espresso'),
			'[EVENT_PHONE]' => __('The phone number for the event (usually an info number)', 'event_espresso'),
			'[EVENT_DESCRIPTION]' => __('The description of the event', 'event_espresso'),
			'[EVENT_NAME]' => __('The name of the event', 'event_espresso'),
			'[EVENT_LINK]' => __('A link associated with the event', 'event_espresso'),
			'[EVENT_URL]' => __('A link to the event set up on the host site.', 'event_espresso'),
			'[VIRTUAL_URL]' => __('What was used for the "URL of Event" field in the Venue settings', 'event_espresso'),
			'[VIRTUAL_PHONE]' => __('An alternate phone number for the event. Typically used as a "call-in" number', 'event_espresso'),
			'[EVENT_START_DATE]' => __('This is the date the event starts', 'event_espresso'),
			'[EVENT_START_TIME]' => __('This is the event start time', 'event_espresso'),
			'[EVENT_END_DATE]' => __('This is the event end date', 'event_espresso'),
			'[EVENT_END_TIME]' => __('This is the event end time', 'event_espresso'),
			'[EVENT_PRICE]' => __('The price of the given event', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			
			case '[EVENT_ID]' :
				return isset($this->_data['ID']) ? $this->_data['ID'] : '';
				break;

			case '[EVENT_IDENTIFIER]' :
				return isset($this->_data['line_ref']) ? $this->_data['line_ref']: '';
				break;

			case '[EVENT]' :
			case '[EVENT_NAME]' :
				isset($this->_data['name']) ? $this->_data['name'] : '';
				break;

			case '[EVENT_PHONE]' :
				isset($this->_data['meta']['phone']) ? $this->_data['meta']['phone'] : '';
				break;

			case '[EVENT_DESCRIPTION]' :
				isset($this->_data['meta']['event_desc']) ? $this->_data['meta']['event_desc']: '';
				break;

			case '[EVENT_LINK]' :
				isset($this->_data['meta']['event_link']) ? $this->_data['meta']['event_link'] : '';
				break;

			case '[EVENT_URL]' :
				isset($this->_data['meta']['event_url']) ? $this->_data['meta']['event_url'] : '';
				break;

			case '[VIRTUAL_URL]' :
				isset($this->_data['meta']['virtual_url']) ? $this->_data['meta']['virtual_url'] : '';

			case '[VIRTUAL_PHONE]' :
				isset($this->_data['meta']['virtual_phone']) ? $this->_data['meta']['virtual_phone'] : '';
				break;

			case '[EVENT_START_DATE]' :
				isset($this->_data['event_start_date']) ? event_date_display($this->_data['event_start_date']) : '';
				break;

			case '[EVENT_END_DATE]' :
				isset($this->_data['event_end_date']) ? event_date_display($this->_data['event_end_date']) : '';
				break;

			case '[EVENT_START_TIME]' :
				isset($this->_data['event_start_time']) ? event_date_display($this->_data['event_start_time'], get_option('time_format')) : '';
				break;

			case '[EVENT_END_TIME]' :
				isset($this->_data['event_end_time']) ? event_date_display($this->_data['event_end_time'], get_option('time_format')) : '';
				break;

			case '[EVENT_PRICE]' :
				isset($this->_data['price']) ? $this->_data['price'] : '';
				break;
		}
	}


} //end EE_Event_Shortcodes class