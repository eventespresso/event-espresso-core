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
 * EE_Recipient_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Recipient_List_Shortcodes lists all list type shortcodes related to recipient specific info.  Meaning, that when this is parsed, we're parsing for WHO is receiving the message.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Recipient_List_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Recipient_List_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __('Recipient List Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to registrant recipients list type data.', 'event_espresso');
		$this->_shortcodes = array(
			'[RECIPIENT_TICKET_LIST]' => __('Will output a list of tickets for the recipient of the email. Note, if the recipient is the Event Author, then this is blank.', 'event_espresso'),
			'[RECIPIENT_DATETIME_LIST]' => __('Will output a list of datetimes that the person receiving this message has been registered for.', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		switch ( $shortcode ) {
			case '[RECIPIENT_TICKET_LIST]' :
				return $this->_get_recipient_ticket_list();
				break;

			case '[RECIPIENT_DATETIME_LIST]' :
				return $this->_get_recipient_datetime_list();
				break;
		}
		return '';
	}



	/**
	 * figure out what the incoming data is and then return the appropriate parsed value
	 *
	 * @return string
	 */
	private function _get_recipient_ticket_list() {
		$this->_validate_list_requirements();

		if ( $this->_data['data'] instanceof EE_Messages_Addressee ) {
			return $this->_get_recipient_ticket_list_parsed( $this->_data['data'] );
		} else if ( $this->_extra_data['data'] instanceof EE_Messages_Addressee ) {
			return $this->_get_recipient_ticket_list_parsed( $this->_extra_data['data'] );
		} else {
			return '';
		}
	}


	private function _get_recipient_ticket_list_parsed( EE_Messages_Addressee $data ) {
		//first get registrations just for this attendee.
		$att = $data->att_obj;
		$registrations_on_attendee = $att instanceof EE_Attendee ? $data->attendees[$att->ID()]['reg_objs'] : array();
		$registrations_on_attendee = empty( $registrations_on_attendee ) && $data->reg_obj instanceof EE_Registration ? array( $data->reg_obj ) : $registrations_on_attendee;
		$tkts = array();

		//if we're coming in from the main content then $this->_data['data'] is instanceof EE_Messages_Addressee.
		//which means we want to get tickets for all events this addressee is a part of.
		if ( $this->_data['data'] instanceof EE_Messages_Addressee ) {
			$valid_shortcodes = array('ticket', 'event_list', 'attendee_list','datetime_list', 'registration_details', 'attendee', 'recipient_details');
			$template = $this->_data['template'];

			//tickets will be tickets for all registrations on this attendee.
			foreach ( $registrations_on_attendee as $reg ) {
				if ( $reg instanceof EE_Registration ) {
					$ticket = isset( $data->registrations[$reg->ID()] ) && is_array( $data->registrations[$reg->ID()] ) && isset( $data->registrations[$reg->ID()]['tkt_obj'] ) ? $data->registrations[$reg->ID()]['tkt_obj'] : null;
					if ( $ticket instanceof EE_Ticket ) {
						$tkts[$ticket->ID()] = $ticket;
					}
				}
			}
		}

		//if coming from the context of the event list parser, then let's return just the tickets for that event.
		$event = $this->_data['data'];
		if ( $event instanceof EE_Event ) {
			$valid_shortcodes = array('ticket', 'attendee_list', 'datetime_list', 'attendee', 'recipient_details');
			$template = is_array($this->_data['template'] ) && isset($this->_data['template']['ticket_list']) ? $this->_data['template']['ticket_list'] : $this->_extra_data['template']['ticket_list'];
			//let's remove any existing [EVENT_LIST] shortcode from the ticket list template so that we don't get recursion.
			$template = str_replace('[EVENT_LIST]', '', $template);
			//data will be tickets for this event for this recipient.
			foreach ( $registrations_on_attendee as $reg ) {
				if ( $reg instanceof EE_Registration && $reg->event_ID() == $event->ID() ) {
					$ticket = isset( $data->registrations[$reg->ID()] ) && is_array( $data->registrations[$reg->ID()] ) && isset( $data->registrations[$reg->ID()]['tkt_obj'] ) ? $data->registrations[$reg->ID()]['tkt_obj'] : null;
					if ( $ticket instanceof EE_Ticket ) {
						$tkts[$ticket->ID()] = $ticket;
					}
				}
			}
		}

		$tkt_parsed = '';
		foreach ( $tkts as $ticket ) {
			$tkt_parsed .= $this->_shortcode_helper->parse_ticket_list_template( $template, $ticket, $valid_shortcodes, $this->_extra_data );
		}
		return $tkt_parsed;
	}



	/**
	 * figure out what the incoming data is and then return the appropriate parsed value
	 *
	 * @return string
	 */
	private function _get_recipient_datetime_list() {
		$this->_validate_list_requirements();

		if ( $this->_data['data'] instanceof EE_Messages_Addressee )
			return $this->_get_recipient_datetime_list_parsed( $this->_data['data']  );

		else if ( $this->_extra_data['data'] instanceof EE_Messages_Addressee )
			return $this->_get_recipient_datetime_list_parsed( $this->_extra_data['data'] );

		else
			return '';

	}


	private function _get_recipient_datetime_list_parsed( EE_Messages_Addressee $data ) {
		//first get registrations just for this attendee.
		$att = $data->att_obj;
		$registrations_on_attendee = $att instanceof EE_Attendee ? $data->attendees[$att->ID()]['reg_objs'] : null;
		$registrations_on_attendee = empty( $registrations_on_attendee ) && $data->reg_obj instanceof EE_Registration ? array( $data->reg_obj ) : array();
		$valid_shortcodes = array( 'datetime', 'attendee', 'recipient_details' );
		$template = '';
		$dtts = array();

		//setup valid shortcodes depending on what the status of the $this->_data property is
		if ( $this->_data['data'] instanceof EE_Messages_Addressee ) {
			$template = $this->_data['template'];

			//dtts will be datetimes for all registrations on this attendee
			foreach ( $registrations_on_attendee as $reg ) {
				if ( $reg instanceof EE_Registration ) {
					$dtt_objs = isset( $data->registrations[$reg->ID()] ) && is_array( $data->registrations[$reg->ID()] ) && isset( $data->registrations[$reg->ID()]['dtt_objs'] ) ? $data->registrations[$reg->ID()]['dtt_objs'] : array();
					$dtt_objs = (array) $dtt_objs;
					foreach ( $dtt_objs as $dtt_obj ) {
						if ( $dtt_obj instanceof EE_Datetime ) {
							$dtts[$dtt_obj->ID()] = $dtt_obj;
						}
					}
				}
			}
		}

		//if coming from the context of the event list parser, then let's just return the datetimes for the specific event.
		$event = $this->_data['data'];
		if ( $event instanceof EE_Event ) {
			$template = is_array( $this->_data['template'] ) && isset($this->_data['template']['datetime_list']) ? $this->_data['template']['datetime_list'] : $this->_extra_data['template']['datetime_list'];

			//data will be datetimes for this event for this recipient
			foreach ( $registrations_on_attendee as $reg ) {
				if ( $reg instanceof EE_Registration && $reg->event_ID() == $event->ID() ) {
					$ticket = isset( $data->registrations[$reg->ID()] ) && is_array( $data->registrations[$reg->ID()] ) && isset( $data->registrations[$reg->ID()]['tkt_obj'] ) ? $data->registrations[$reg->ID()]['tkt_obj'] : null;
					if ( $ticket instanceof EE_Ticket ) {
						$dtt_objs = isset( $data->tickets[$ticket->ID()] ) && is_array( $data->tickets[$ticket->ID()] ) && isset( $data->tickets[$ticket->ID()]['dtt_objs'] ) ? $data->tickets[$ticket->ID()]['dtt_objs'] : array();
						$dtt_objs = (array) $dtt_objs;
						foreach ( $dtt_objs as $dtt_obj ) {
							if ( $dtt_obj instanceof EE_Datetime ) {
								$dtts[$dtt_obj->ID()] = $dtt_obj;
							}
						}
					}
				}
			}
		}

		$dtt_parsed = '';
		foreach ( $dtts as $datetime ) {
			$dtt_parsed .= $this->_shortcode_helper->parse_datetime_list_template( $template, $datetime, $valid_shortcodes, $this->_extra_data );
		}
		return $dtt_parsed;
	}


} // end EE_Recipient_List_Shortcodes class
