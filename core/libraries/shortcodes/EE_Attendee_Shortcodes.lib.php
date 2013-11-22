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


	public function __construct() {
		parent::__construct();
	}



	protected function _init_props() {
		$this->label = __('Attendee Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to attendee related data', 'event_espresso');
		$this->_shortcodes = array(
			'[FNAME]' => __('First Name of an attendee', 'event_espresso'),
			'[LNAME]' => __('Last Name of an attendee', 'event_espresso'),
			'[EDIT_ATTENDEE_LINK]' => __('Edit Attendee Link (typically you\'d only use this for messages going to event administrators)', 'event_espresso'),
			'[TICKET_LIST]' => __('This will return the tickets that the attendee has', 'event_espresso'),
			'[EVENT_LIST]' => __('This will return the events that the attendee is registered for', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			
			case '[FNAME]' :
				$fname = !empty( $this->_data->fname ) ? $this->_data->fname : '';
				$fname = is_object($this->_data) && method_exists( $this->_data, 'fname') ? $this->_data->fname() : $fname;
				return isset($this->_data->att_obj) && is_object($this->_data->att_obj) ? $this->_data->att_obj->fname() : $fname;
				break;

			case '[LNAME]' :
				$lname = !empty( $this->_data->lname ) ? $this->_data->lname : '';
				$lname = is_object($this->_data) && method_exists( $this->_data, 'lname') ? $this->_data->lname() : $lname;
				return isset($this->_data->att_obj) && is_object($this->_data->att_obj) ? $this->_data->att_obj->lname() : $lname;
				break;

			case '[EDIT_ATTENDEE_LINK]' :
				return $this->_get_attendee_edit_link();
				break;

			case '[TICKET_LIST]' :
				return $this->_get_ticket_list_for_attendee();
				break;

			case '[EVENT_LIST]' :
				return $this->_get_event_list_for_attendee();
				break;
		}
	}




	private function _get_attendee_edit_link() {
		//first make sure we have what we need
		$ID = !empty( $this->_data->ID ) ? $this->_data->ID : '';
		$ID = empty( $ID ) && is_object( $this->_data ) ? $this->_data->ID() : $ID;
		if ( !isset( $ID ) ) return '';

		//made it here so we can generate the edit attendee link.
		$query_args = array(
			'page' => 'espresso_registrations',
			'action' => 'edit_attendee',
			'post' => $ID
			);

		//require EE_Admin_Page core
		require_once EVENT_ESPRESSO_INCLUDES_DIR . 'core/admin/EE_Admin_Page.core.php';
		$url = EE_Admin_Page::add_query_args_and_nonce( $query_args, admin_url('admin.php') );

		return $url;
	}




	private function _get_ticket_list_for_attendee() {
		$this->_set_shortcode_helper();

		//first verify that the incoming $data property is EE_Attendee
		if ( ! $this->_data instanceof EE_Attendee )
			return '';

		$template = $this->_extra_data['template']['ticket_list'];
		$valid_shortcodes = array('ticket', 'event_list');
		$attendee = $this->_data;

		//let's remove any existing [ATTENDEE_LIST] shortcode from the ticket_list template so that we dont' get recursion
		$template = str_replace( '[ATTENDEE_LIST]', '', $template );

		//parsin
		$tkt_parsed = '';
		$tickets = isset( $this->_extra_data['data']->attendees ) ? $this->_extra_data['data']->attendees['tkt_objs'] : array();

		foreach ( $tickets as $ticket ) {
			$tkt_parsed .= $this->_shortcode_helper->parse_ticket_list_template( $template, $ticket, $valid_shortcodes, $this->_extra_data );
		}
		return $tkt_parsed;
	}



	private function _get_event_list_for_attendee() {
		$this->_set_shortcode_helper();

		//first verify that the incoming $data property is EE_Attendee
		if ( ! $this->_data instanceof EE_Attendee )
			return '';

		$template = $this->_extra_data['template']['event_list'];
		$valid_shortcodes = array('event', 'ticket_list');
		$attendee = $this->_data;

		//let's remove any existing [ATTENDEE_LIST] shortcode from the event_list template so that we dont' get recursion
		$template = str_replace( '[ATTENDEE_LIST]', '', $template );

		//parsin
		$evt_parsed = '';
		$events = isset( $this->_extra_data['data']->attendees ) ? $this->_extra_data['data']->attendees['evt_objs'] : array();

		foreach ( $events as $event ) {
			$evt_parsed .= $this->_shortcode_helper->parse_event_list_template( $template, $event, $valid_shortcodes, $this->_extra_data );
		}
		return $evt_parsed;
	}





} //end EE_Attendee_Shortcodes class