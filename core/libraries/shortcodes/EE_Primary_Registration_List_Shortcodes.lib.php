<?php
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
 * EE_Primary_Registration_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Primary_Registration_List_Shortcodes lists all list type shortcodes related to primary registration specific info.  Meaning, that when this is parsed, this only parses for Primary Registrants.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Primary_Registration_List_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Primary_Registration_List_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Primary Registrant List Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific primary registrant recipients list type data.', 'event_espresso');
		$this->_shortcodes = array(
			'[PRIMARY_REGISTRANT_TICKET_LIST]' => __('Will output a list of tickets that the primary registration received.', 'event_espresso'),
			'[PRIMARY_REGISTRANT_DATETIME_LIST]' => __('Will output a list of datetimes that the primary registrant for the transaction has been registered for.', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {

			case '[PRIMARY_REGISTRANT_TICKET_LIST]' :
				return $this->_get_recipient_ticket_list( TRUE );
				break;

			case '[PRIMARY_REGISTRANT_DATETIME_LIST]' :
				return $this->_get_recipient_datetime_list( TRUE );
				break;
		}
		return '';
	}



	/**
	 * figure out what the incoming data is and then return the appropriate parsed value
	 *
	 * @param  boolean $primary whether we're getting the primary registrant ticket_list.
	 * @return string
	 */
	private function _get_recipient_ticket_list( $primary = FALSE ) {
		$this->_validate_list_requirements();

		if ( $this->_data['data'] instanceof EE_Messages_Addressee )
			return $this->_get_recipient_ticket_list_parsed( $this->_data['data'], $primary );

		else if ( $this->_extra_data['data'] instanceof EE_Messages_Addressee )
			return $this->_get_recipient_ticket_list_parsed( $this->_extra_data['data'], $primary );

		else
			return '';
	}


	private function _get_recipient_ticket_list_parsed( EE_Messages_Addressee $data, $primary = FALSE ) {
		$registration = $primary ? $data->primary_reg_obj : $data->reg_obj;
			if ( ! $registration instanceof EE_Registration ) return '';
		//setup valid shortcodes depending on what the status of the $this->_data property is
		if ( $this->_data['data'] instanceof EE_Messages_Addressee ) {
			$valid_shortcodes = array('ticket', 'event_list', 'attendee_list','datetime_list', 'registration_details', 'attendee');
			$template = $this->_data['template'];
			$tkts = array($data->registrations[$registration->ID()]['tkt_obj']);
			$data = $this->_data;
		} elseif ( $this->_data['data'] instanceof EE_Event ) {
			$valid_shortcodes = array('ticket', 'attendee_list', 'datetime_list', 'attendee');
			$template = is_array($this->_data['template'] ) && isset($this->_data['template']['ticket_list']) ? $this->_data['template']['ticket_list'] : $this->_extra_data['template']['ticket_list'];
			//let's remove any existing [EVENT_LIST] shortcode from the ticket list template so that we don't get recursion.
			$template = str_replace('[EVENT_LIST]', '', $template);
			//data will be tickets for this event for this recipient.
			$tkts = $this->_get_tickets_from_event( $this->_data['data'], $registration );
			$data = $this->_extra_data;
		} else {
			return '';
		}

		$tktparsed = '';
		foreach ( $tkts as $ticket ) {
			$tktparsed .= $this->_shortcode_helper->parse_ticket_list_template( $template, $ticket, $valid_shortcodes, $data );
		}
		return $tktparsed;
	}


	private function _get_tickets_from_event( EE_Event $event, $reg = NULL ) {
		$evt_tkts = isset($this->_extra_data['data']->events) ? $this->_extra_data['data']->events[$event->ID()]['tkt_objs'] : array();

		if ( $reg instanceof EE_Registration && $this->_extra_data['data'] instanceof EE_Messages_Addressee ) {
			$adj_tkts = array();
			//return only tickets for the given attendee
			foreach ( $evt_tkts as $tkt ) {
				if ( isset( $this->_extra_data['data']->registrations[$reg->ID()]['tkt_obj'] ) && $this->_extra_data['data']->registrations[$reg->ID()]['tkt_obj']->ID() == $tkt->ID() )
					$adj_tkts[] = $tkt;
			}
			$evt_tkts = $adj_tkts;
		}
		return $evt_tkts;
	}




	/**
	 * figure out what the incoming data is and then return the appropriate parsed value
	 *
	 * @param  boolean $primary whether we're getting the primary registrant ticket_list.
	 * @return string
	 */
	private function _get_recipient_datetime_list( $primary = FALSE ) {
		$this->_validate_list_requirements();

		if ( $this->_data['data'] instanceof EE_Messages_Addressee )
			return $this->_get_recipient_datetime_list_parsed( $this->_data['data'], $primary );

		else if ( $this->_extra_data['data'] instanceof EE_Messages_Addressee )
			return $this->_get_recipient_datetime_list_parsed( $this->_extra_data['data'], $primary );

		else
			return '';

		return $this->_get_recipient_datetime_list_parsed( $this->_data['data'], $primary);
	}


	private function _get_recipient_datetime_list_parsed( EE_Messages_Addressee $data, $primary = FALSE ) {
		$registration = $primary ? $data->primary_reg_obj : $data->reg_obj;
		if ( ! $registration instanceof EE_Registration ) return '';
		//setup valid shortcodes depending on what the status of the $this->_data property is
		if ( $this->_data['data'] instanceof EE_Messages_Addressee ) {
			$valid_shortcodes = array('datetime', 'attendee');
			$template = $this->_data['template'];
			$dtts = $data->registrations[$registration->ID()]['dtt_objs'];
			$data = $this->_data;
		} elseif ( $this->_data['data'] instanceof EE_Event ) {
			$valid_shortcodes = array('datetime', 'attendee');
			$template = is_array($this->_data['template'] ) && isset($this->_data['template']['datetime_list']) ? $this->_data['template']['datetime_list'] : $this->_extra_data['template']['datetime_list'];
			$dtts = $this->_get_datetimes_from_event( $this->_data['data'], $registration );
			$data = $this->_extra_data;
		} else {
			return '';
		}

		$dtt_parsed = '';
		foreach ( $dtts as $datetime ) {
			$dtt_parsed .= $this->_shortcode_helper->parse_datetime_list_template( $template, $datetime, $valid_shortcodes, $this->_extra_data );
		}
		return $dtt_parsed;
	}



	private function _get_datetimes_from_event( EE_Event $event, $reg = NULL ) {
		$evt_dtts = isset($this->_extra_data['data']->events) ? $this->_extra_data['data']->events[$event->ID()]['dtt_objs'] : array();

		if ( $reg instanceof EE_Registration && $this->_extra_data['data'] instanceof EE_Messages_Addressee ) {
			$adj_dtts = array();
			//return only dtts for the given attendee
			foreach ( $evt_dtts as $dtt ) {
				if ( isset( $this->_extra_data['data']->registrations[$reg->ID()]['dtt_objs'][$dtt->ID()] ) )
					$adj_dtts[] = $dtt;
			}
			$evt_dtts = $adj_dtts;
		}
		return $evt_dtts;
	}


} // end EE_Primary_Registration_List_Shortcodes class
