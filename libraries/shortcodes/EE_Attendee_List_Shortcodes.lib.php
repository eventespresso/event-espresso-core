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
 * EE_Attendee_List_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Attendee_List_Shortcodes lists all shortcodes related to Attendee Lists. 
 *
 * This is a special shortcode parser in that it will actually LOAD other parser and recieve a template to parse via the Shortcode Parser.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Attendee_List_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Attendee_List_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Attendee List Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to attendee lists', 'event_espresso');
		$this->_shortcodes = array(
			'[ATTENDEE_LIST]' => __('Will output a list of attendees', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			case '[ATTENDEE_LIST]' :
				return $this->_get_attendee_list();
				break;
		}
	}



	/**
	 * figure out what the incoming data is and then return the appropriate parsed value.
	 * @return string
	 */
	private function _get_attendee_list() {
		$this->_validate_list_requirements();
		$this->_set_shortcode_helper();


		//event_list template triggered
		if ( !is_object($this->_data['data']) && isset( $this->_data['data']['atts'] ) )
			return $this->_get_attendee_list_for_event();

		//main template?
		else if ( isset( $this->_data['data'] ) )
			return $this->_get_attendee_list_for_main();


		//prevent recursive loop
		else
			return '';
	}


	/**
	 * This returns the parsed attendee list for main template;
	 */
	private function _get_attendee_list_for_main() {
		$valid_shortcodes = array('attendee', 'event_list', 'registration');
		$template = $this->_data['template'];
		$data = $this->_data['data'];
		$events = array();
		$attnds = '';


		//now we need to loop through the attendee list and send data to the EE_Parser helper.
		foreach ( $data->attendees as $attendee ) {
			//let's get the event list for this $attendee in case the shortcode for event_list is in the template.
				foreach ( $attendee['line_ref'] as $event_ref ) {
					$events[] = $data->events[$event_ref];
				}

				//add events to attendee object
				$attendee['att_obj']->attach_events( $events );
				$attnds .= $this->_shortcode_helper->parse_attendee_list_template($template, $attendee['att_obj'], $valid_shortcodes);
		}

		return $attnds;

	}


	/**
	 * return parsed list of attendees for an event
	 * @return string
	 */
	private function _get_attendee_list_for_event() {
		$valid_shortcodes = array('attendee');
		$template = $this->_data['template']['attendee_list'];
		$data = $this->_data['data']['atts'];

		//we're NOT going to prepare a list of events this time round
		$attnds = '';

		//each attendee in this case should be an attendee object.
		foreach ( $data as $attendee ) {
			$attnds .= $this->_shortcode_helper->parse_attendee_list_template($template, $attendee, $valid_shortcodes);
		}

		return $attnds;
	}


	
} // end EE_Attendee_List_Shortcodes class