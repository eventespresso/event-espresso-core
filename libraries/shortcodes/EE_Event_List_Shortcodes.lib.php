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
 * EE_Event_List_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Event_List_Shortcodes lists all shortcodes related to Event Lists. 
 *
 * This is a special shortcode parser in that it will actually LOAD other parsers and recieve a template to parse via the Shortcode Parser.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Event_List_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_List_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Event List Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to event lists', 'event_espresso');
		$this->_shortcodes = array(
			'[EVENT_LIST]' => __('Will output a list of events', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			case '[EVENT_LIST]' :
				return $this->_get_event_list();
				break;
		}
	}



	/**
	 * figure out what the incoming data is and then return the appropriate parsed value.
	 * @return string
	 */
	private function _get_event_list() {
		$this->_validate_list_requirements();
		$this->_set_shortcode_helper();


		//attendee_list template triggered
		if ( !is_object($this->_data['data']) && isset( $this->_data['data']['att'] ) )
			return $this->_get_event_list_for_attendee();

		//main template triggered
		if ( isset( $this->_data['data'] ) )
			return $this->_get_event_list_for_main();

		//prevent recursive loop
		else
			return '';
	}



	/**
	 * This returns the parsed event list for main template
	 * @return string
	 */
	private function _get_event_list_for_main() {
		$valid_shortcodes = array('event', 'attendee_list');
		$template = $this->_data['template'];
		$data = $this->_data['data'];
		$atts = array();
		$events = '';

		//now we need to loop through the attendee list and send data to the EE_Parser helper.
		foreach ( $data->events as $event ) {
			//let's get the attendee list for this $event in case the shortcode for attendee is in the template.
			foreach ( $data->attendees as $attendee ) {
				foreach ( $attendee['line_ref'] as $ref ) {
					if ( $event['line_ref'] == $ref ) {
						$atts[] = $attendee['att_obj'];
					}
				}
			}
			$event['atts'] = $atts;
				
			$events .= $this->_shortcode_helper->parse_event_list_template($template, $event, $valid_shortcodes);
		}
		return $events;

	}




	/**
	 * This returns the parsed event list for an attendee
	 * @return string
	 */
	private function _get_event_list_for_attendee() {
		$valid_shortcodes = array('event');
		$template = $this->_data['template']['event_list'];
		$data = $this->_data['data']['att'];

		//we're NOT going to prepare a list of attendees this time around
		$events = '';

		foreach ( $data->events() as $event ) {
			$events .= $this->_shortcode_helper->parse_event_list_template($template, $event, $valid_shortcodes);
		}

		return $events;
	}	

	
} // end EE_Event_List_Shortcodes class