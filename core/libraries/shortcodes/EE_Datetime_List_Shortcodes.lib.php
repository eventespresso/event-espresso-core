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
 * EE_Datetime_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Datetime_List_Shortcodes lists all shortcodes related to Ticket Lists.
 *
 * This is a special shortcode parser in that it will actually LOAD other parsers and receive a template to parse via the Shortcode Parser.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Datetime_List_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Datetime_List_Shortcodes extends EE_Shortcodes {


	protected function _init_props() {
		$this->label = __('Datetime List Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to datetime lists', 'event_espresso');
		$this->_shortcodes = array(
			'[DATETIME_LIST]' => __('Will output a list of datetimes according to the layout specified in the datetime list field.', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			case '[DATETIME_LIST]' :
				return $this->_get_datetime_list();
				break;
		}
		return '';
	}



	/**
	 * figure out what the incoming data is and then return the appropriate parsed value.
	 * @return string
	 */
	private function _get_datetime_list() {
		$this->_validate_list_requirements();

		if ( $this->_data['data'] instanceof EE_Ticket )
			return $this->_get_datetime_list_for_ticket();

		else if ( $this->_data['data'] instanceof EE_Event )
			return $this->_get_datetime_list_for_event();

		else if ( $this->_data['data'] instanceof EE_Messages_Addressee && $this->_data['data']->reg_obj instanceof EE_Registration ) {
			return $this->_get_datetime_list_for_registration();
		}

		//prevent recursive loop
		else
			return '';
	}



	/**
	 * return parsed list of datetimes for an event
	 * @return string
	 */
	private function _get_datetime_list_for_event() {
		$valid_shortcodes = array('datetime', 'attendee');
		$template = is_array($this->_data['template'] ) && isset($this->_data['template']['datetime_list']) ? $this->_data['template']['datetime_list'] : $this->_extra_data['template']['datetime_list'];
		$event = $this->_data['data'];

		//here we're setting up the datetimes for the datetime list template for THIS event.
		$dtt_parsed = '';
		$datetimes = $this->_get_datetimes_from_event($event);

		//each datetime in this case should be an datetime object.
		foreach ( $datetimes as $datetime ) {
			$dtt_parsed .= $this->_shortcode_helper->parse_datetime_list_template($template, $datetime, $valid_shortcodes, $this->_extra_data);
		}

		return $dtt_parsed;
	}



	/**
	 * return parsed list of datetimes for an ticket
	 * @return string
	 */
	private function _get_datetime_list_for_ticket() {
		$valid_shortcodes = array('datetime', 'attendee');

		$template = is_array($this->_data['template'] ) && isset($this->_data['template']['datetime_list']) ? $this->_data['template']['datetime_list'] : $this->_extra_data['template']['datetime_list'];
		$ticket = $this->_data['data'];

		//here we're setting up the datetimes for the datetime list template for THIS ticket.
		$dtt_parsed = '';
		$datetimes = $this->_get_datetimes_from_ticket($ticket);

		//each datetime in this case should be an datetime object.
		foreach ( $datetimes as $datetime ) {
			$dtt_parsed .= $this->_shortcode_helper->parse_datetime_list_template($template, $datetime, $valid_shortcodes, $this->_extra_data);
		}

		return $dtt_parsed;
	}



	/**
	 * return parsed list of datetimes from a given registration.
	 *
	 * @return string
	 */
	private function _get_datetime_list_for_registration() {
		$registration = $this->_data['data']->reg_obj;

		//now let's just get the ticket, set $this->_data['data'] to the ticket and then call _get_datetime_list_for__ticket();
		$this->_data['data'] = $registration->ticket();
		return $this->_get_datetime_list_for_ticket();
	}




	private function _get_datetimes_from_event( EE_Event $event, $att = NULL ) {
		 return isset($this->_extra_data['data']->events) ? $this->_extra_data['data']->events[$event->ID()]['dtt_objs'] : array();
	}

	private function _get_datetimes_from_ticket( EE_Ticket $ticket, $att = NULL ) {
		return isset($this->_extra_data['data']->tickets) ? $this->_extra_data['data']->tickets[$ticket->ID()]['dtt_objs'] : array();
	}



} // end EE_Datetime_List_Shortcodes class
