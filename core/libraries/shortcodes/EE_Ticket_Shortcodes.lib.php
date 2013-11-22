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
 * EE_Ticket_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Ticket_Shortcodes lists all shortcodes related to ticket specific info. 
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Ticket_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Shortcodes extends EE_Shortcodes {


	protected function _init_props() {
		$this->label = __('Ticket Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to ticket related data', 'event_espresso');
		$this->_shortcodes = array(
			'[TICKET_ID]' => __('Will be replaced by the ticket ID of a ticket', 'event_espresso'),
			'[TICKET_NAME]' => __('The name of the ticket', 'event_espresso'),
			'[TICKET_DESCRIPTION]' => __('The description of the ticket', 'event_espresso'),
			'[TICKET_PRICE]' => __('The price of the ticket', 'event_espresso'),
			'[ATTENDEE_LIST]' => __('This will be replace by all the attendees for this ticket.', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		EE_Registry::instance()->load_helper( 'Template' );
		if ( ! $this->_data instanceof EE_Ticket )
			return ''; //get out cause we can only parse with the ticket object.

		switch ( $shortcode ) {
			
			case '[TICKET_ID]' :
				return $this->_data->ID();
				break;

			case '[TICKET_NAME]' :
				return $this->_data->get('TKT_name');
				break;

			case '[TICKET_DESCRIPTION]' :
				return $this->_data->get('TKT_description');
				break;

			case '[TICKET_PRICE]' :
				return EEH_Template::format_currency( $this->_data->get('TKT_price') );
				break;

			case '[ATTENDEE_LIST]' :
				return $this->_get_attendee_list_for_ticket();
				break;
		}

	}


	/**
	 * it is possible that there will be a attendee_list shortcode when parsing tickets.  If so then we need to trigger the parsing of the attendee list and return its content
	 * @return string
	 */
	private function _get_attendee_list_for_ticket() {
		$this->_set_shortcode_helper();
		//first verify that the incoming $data property is EE_Ticket
		if ( ! $this->_data instanceof EE_Ticket )
			return '';

		$template = $this->_extra_data['template']['attendee_list'];
		$valid_shortcodes = array('attendee', 'event_list');
		$ticket = $this->_data;

		//lets' remove any existing [TICKET_LIST] shortcode from the attendee_list template so that we don't get recursion
		$template = str_replace('[TICKET_LIST]', '', $template);

		//parsin
		$att_parsed = '';
		$attendees = isset( $this->_extra_data['data']->tickets ) ? $this->_extra_data['data']->tickets['att_objs'] : array();

		foreach ( $attendee as $attendee ) {
			$att_parsed .= $this->_shortcode_helper->parse_attendee_list_template( $template, $attendee, $valid_shortcodes, $this->_extra_data );
		}

		return $att_parsed;

	}


} //end EE_Ticket_Shortcodes class
