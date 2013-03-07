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
			'[ALT_EMAIL]' => __('An alternate email address for the event contact', 'event_espresso'),
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
		global $org_options;
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/EE_Formatter.helper.php';

		switch ( $shortcode ) {
			
			case '[EVENT_ID]' :
				return isset($this->_data['ID']) ? $this->_data['ID'] : '';
				break;

			case '[EVENT_IDENTIFIER]' :
				return isset($this->_data['line_ref']) ? $this->_data['line_ref']: '';
				break;

			case '[EVENT]' :
			case '[EVENT_NAME]' :
				return isset($this->_data['name']) ? $this->_data['name'] : '';
				break;

			case '[EVENT_PHONE]' :
				return isset($this->_data['meta']['phone']) ? $this->_data['meta']['phone'] : '';
				break;

			case '[ALT_EMAIL]' :
				return !isset($this->_data['meta']['alt_email']) || $this->_data['meta']['alt_email'] == '' ? $org_options['contact_email'] : $this->_data['meta']['alt_email'];
				break;

			case '[EVENT_DESCRIPTION]' :
				return isset($this->_data['meta']['event_desc']) ? $this->_data['meta']['event_desc']: '';
				break;

			case '[EVENT_LINK]' :
				return isset($this->_data['meta']['event_link']) ? $this->_data['meta']['event_link'] : '';
				break;

			case '[EVENT_URL]' :
				return isset($this->_data['meta']['event_url']) ? $this->_data['meta']['event_url'] : '';
				break;

			case '[VIRTUAL_URL]' :
				return isset($this->_data['meta']['virtual_url']) ? $this->_data['meta']['virtual_url'] : '';

			case '[VIRTUAL_PHONE]' :
				return isset($this->_data['meta']['virtual_phone']) ? $this->_data['meta']['virtual_phone'] : '';
				break;

			case '[EVENT_START_DATE]' :
				return $this->_event_date( 'event_start_date' );
				break;

			case '[EVENT_END_DATE]' :
				return $this->_event_date( 'event_end_date' );
				break;

			case '[EVENT_START_TIME]' :
				return $this->_event_date( 'event_start_time' );
				break;

			case '[EVENT_END_TIME]' :
				return $this->_event_date( 'event_end_time' );
				break;

			case '[EVENT_PRICE]' :
				return isset($this->_data['price']) ? $this->_data['price'] : '';
				break;
		}
	}




	/**
	 * This just figures out the event date for the incoming data according to what date type we are requesting
	 *
	 * @access private
	 * @param string $type what we're requesting (see switch for examples )
	 * @return string the date/time requested
	 */
	private function _event_date( $type ) {

		//check if we have the daytime_id that we need to retrieve the date stuff, otherwise we just return an empty string
		if ( !isset( $this->_data['daytime_id'] ) )
			return '';

		//let's get the DTT Model and retrieve the Date Time object
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php' );
		$DTTM = EEM_Datetime::instance();
		$DTT = $DTTM->get_date_time_by_dtt_id( $this->_data['datytime_id'] );

		//if empty|false let's get out
		if ( empty( $DTT ) || !is_object( $DTT ) ) return '';

		switch ( $type ) {
			case 'event_start_date' :
				return $DTT->start_date( get_option('date_format') );
				break;
			case 'event_end_date' :
				return $DTT->end_date( get_option('date_format') );
				break;
			case 'event_end_time' :
				return $DTT->end_time( get_option('time_format') );
				break;
			case 'event_start_time' :
				return $DTT->start_time( get_option('time_format') );
				break;
		}

	}


} //end EE_Event_Shortcodes class