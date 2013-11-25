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
			);
	}


	protected function _parser( $shortcode ) {

		EE_Registry::instance()->load_helper( 'Formatter' );

		$event = $this->_data instanceof EE_Event ? $this->_data : null;
		if ( empty( $event ) )
			return '';

		switch ( $shortcode ) {
			
			case '[EVENT_ID]' :
				return $event->ID();
				break;

			case '[EVENT_IDENTIFIER]' :
				return isset($this->_data['line_ref']) ? $this->_data['line_ref']: '';
				break;

			case '[EVENT]' :
			case '[EVENT_NAME]' :
				return $event->get('EVT_name');
				break;

			case '[EVENT_PHONE]' :
				return $event->get('EVT_phone');
				break;

			case '[EVENT_DESCRIPTION]' :
				return $event->get('EVT_desc');
				break;

			case '[EVENT_LINK]' :
				return $this->_get_event_link();
				break;

			case '[EVENT_URL]' :
				return $this->_get_event_link(FALSE);
				break;

			case '[VIRTUAL_URL]' :
				$venue = $this->_data->get_first_related('Venue');
				if ( empty( $venue ) )
					return '';
				return $venue->get('VNU_virtual_url');

			case '[VIRTUAL_PHONE]' :
				$venue = $this->_data->get_first_related('Venue');
				if ( empty( $venue ) )
					return '';
				return $venue->get('VNU_virtual_phone');
				break;
		}
		return '';
	}




	/**
	 * return the event details for a given key
	 * @param  string $type what to return
	 * @return string       returned value if present, empty string if not
	 */
	private function _event( $type ) {
		$what = '';
		if ( !isset( $this->_data['ID'] ) ) return ''; //no event id get out.
		
		//FIRST get the event
		$event = EE_Registry::instance()->load_model('Event')->get_one_by_ID($this->_data['ID']);

		//we're using a switch here because I anticipate there will eventually be more types coming in here!
		switch ( $type ) {
			case 'desc' :
				$result = $event->get('EVT_desc');
				break;
			case 'slug' :
				$result = $event->get('EVT_slug');
				break;
		}

		return $result;

	}




	/**
	 * returns the link to the event
	 * @param  boolean $full_link if TRUE (default) we return the html for the name of the event linked to the event.  Otherwise we just return the url of the event.
	 * @return string             
	 */
	private function _get_event_link( $full_link = TRUE ) {
		if ( !isset( $this->_data['ID'] ) ) return ''; //no event id get out.
		$url = get_permalink($this->_data['ID']);

		return $full_link ? '<a href="' . $url . '">' . $this->_data['name'] . '</a>' : $url;
	}


} //end EE_Event_Shortcodes class
