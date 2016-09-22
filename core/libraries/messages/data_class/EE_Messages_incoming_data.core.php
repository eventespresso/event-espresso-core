<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Messages_incoming_data
 *
 * This is the parent class for all incoming data to EE_messages objects.  We create different data handlers for different incoming data depending on the message types set requirements.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

abstract class EE_Messages_incoming_data {


	/**
	 * user id for logged in user when data collected
	 *
	 * @var string $user_id
	 */
	public $user_id;

	/**
	 * IP Address of browser used
	 *
	 * @var string $ip_address
	 */
	public $ip_address;

	/**
	 * browser
	 *
	 * @var string $user_agent
	 */
	public $user_agent;

	/**
	 * Unix timestamp
	 *
	 * @var string $init_access
	 */
	public $init_access;

	/**
	 * Unix timestamp
	 *
	 * @var string $last_access
	 */
	public $last_access;

	/**
	 * The registrations details from the cart
	 *
	 * @var array $reg_info
	 */
	public $reg_info;

	/**
	 * Some data handlers can set what reg status all the registrations are filtered by.
	 * The status should match a EEM_Registration status constant.
	 *
	 * @var string $filtered_reg_status
	 */
	public $filtered_reg_status;

	/**
	 * will hold an array of events assembled from $reg_info
	 *
	 * @var EE_Event[] $events
	 */
	public $events;

	/**
	 * holds an array of datetimes assembled from the incoming data.
	 *
	 * @var EE_Datetime[] $datetimes
	 */
	public $datetimes;

	/**
	 * holds an array of tickets assembled from the incoming data.
	 *
	 * @var EE_Ticket[] $tickets
	 */
	public $tickets;

	/**
	 * holds an array with a key of parent line item and values are an array of children of that line item.
	 *
	 * @since 4.5.0
	 *
	 * @var EE_Line_Item[] $line_items_with_children
	 */
	public $line_items_with_children;

	/**
	 * will hold an array of attendees assembled from the $reg_info
	 *
	 * @var EE_Attendee[] $attendees
	 */
	public $attendees;

	/**
	 * will hold an array of cached registration objects and info assembled from reg_info
	 *
	 * @var array $registrations
	 */
	public $registrations;

	/**
	 * will hold an array of answers assembled from the $reg_info
	 *
	 * @var EE_Answer[] $answers
	 */
	public $answers;

	/**
	 * will hold an array of questions assembled from the $reg_info (indexed by Answer ID);
	 *
	 * @var EE_Question[] $questions
	 */
	public $questions;

	/**
	 * Will hold billing data assembled from $billing_info (if present)
	 *
	 * @var mixed (array|null) $billing
	 */
	public $billing;

	/**
	 * The total amount of tax for the transaction
	 *
	 * @var float $taxes
	 */
	public $taxes;

	/**
	 * Holds the line items related to taxes
	 *
	 * @since 4.5.0
	 *
	 * @var EE_Line_Item[] $tax_line_items
	 */
	public $tax_line_items;

	/**
	 * Hold the line items which aren't taxes and don't relate
	 * to tickets. So: promotions and miscellaneous charges
	 *
	 * @since 4.5
	 * @var EE_Line_Item[] $additional_line_items
	 */
	public $additional_line_items;

	/**
	 * Holds the grand total EE_Line_Item
	 *
	 * @var EE_Line_Item $grand_total_line_item
	 */
	public $grand_total_line_item;

	/**
	 * holds the grand total price object
	 *
	 * @var object $grand_total_price_object
	 */
	public $grand_total_price_object;

	/**
	 * total number of tickets
	 *
	 * @var int $total_ticket_count
	 */
	public $total_ticket_count;

	/**
	 * Will hold the final transaction object (EE_Transaction)
	 *
	 * @var EE_Transaction $txn
	 */
	public $txn;

	/**
	 * Holds the payments related to a transaction
	 *
	 * @since 4.5.0
	 *
	 * @var EE_Payment[] $payments
	 */
	public $payments;

	/**
	 * Holds the first related payment related for a transaction
	 *
	 * @since 4.5.0
	 *
	 * @var EE_Payment $payment
	 */
	public $payment;

	/**
	 * Will hold the label for the txn status
	 *
	 * @var string $txn_status
	 */
	public $txn_status;

	/**
	 * Will hold the final registration object (EE_Registration)
	 *
	 * @var EE_Registration[] $reg_objs
	 */
	public $reg_objs;

	/**
	 * Will hold an array of primary attendee data (if present)
	 *
	 * @var array $primary_attendee_data
	 */
	public $primary_attendee_data;

	/**
	 * This is just an internal object used for passing around the incoming data.
	 *
	 * @var object $_data
	 */
	protected $_data;

	/**
	 * This is just an internal object used for passing around the incoming data.
	 *
	 * @var object $incoming_data
	 */
	public $incoming_data;

	/**
	 * hold objects that might be created
	 *
	 * @type EE_Registration $reg_obj
	 */
	public $reg_obj;



	/**
	 * constructor
	 * @param mixed $data incoming data object|array.  Suggested that child classes use type hinting for expected
	 * data object.  But here parent will be generic because we don't know what's coming in.
	 */
	public function __construct( $data ) {
		$this->_data = $data;
		$this->_setup_data();
	}



	/**
	 * Every child class has to setup the data object !
	 * @return void
	 */
	abstract protected function _setup_data();



	/**
	 * Returns database safe representation of the data later used to when instantiating this object.
	 *
	 * @param mixed $data  The incoming data to be prepped.
	 *
	 * @return mixed   The prepped data for db
	 */
	static public function convert_data_for_persistent_storage( $data ) {
		return $data;
	}






	/**
	 * Data that has been stored in persistent storage that was prepped by _convert_data_for_persistent_storage
	 * can be sent into this method and converted back into the format used for instantiating with this data handler.
	 * @param $data
	 *
	 * @return mixed
	 */
	static public function convert_data_from_persistent_storage( $data ) {
		return $data;
	}





	/**
	 * only purpose is to return the data
	 *
	 * @access public
	 * @return object the formatted data object!
	 */
	public function data() {
		return $this->_data;
	}



	/**
	 * This helper method can be used by any incoming data handlers to setup the data correctly.  All that is required is that $this->reg_objs be set.
	 * @throws \EE_Error
	 */
	protected function _assemble_data() {
		//verify that reg_objs is set
		if (
			! is_array( $this->reg_objs )
			&& ! reset( $this->reg_objs ) instanceof EE_Registration
		) {
			throw new EE_Error(
				__(
					'In order to assemble the data correctly, the "reg_objs" property must be an array of EE_Registration objects',
					'event_espresso'
				)
			);
		}

		//get all attendee and events associated with the registrations in this transaction
		$events = $event_setup = $evtcache = $tickets = $datetimes = array();
		$answers = $questions = $attendees = $line_items = $registrations = array();
		$total_ticket_count = 0;

		if ( ! empty( $this->reg_objs ) ) {
			$event_attendee_count = array();
			foreach ( $this->reg_objs as $reg ) {

				if (
					$this->_skip_registration_for_processing( $reg )
				) {
					continue;
				}

				$evt_id = $reg->event_ID();
				/** @type EE_Ticket $ticket */
				$ticket = $reg->get_first_related( 'Ticket' );
				$relateddatetime = $ticket->datetimes();
				$total_ticket_count++;
				$tickets[ $ticket->ID() ]['ticket'] = $ticket;
				$tickets[ $ticket->ID() ]['count'] = is_array( $tickets[ $ticket->ID() ] )
				                                     && isset( $tickets[ $ticket->ID() ]['count'] )
					? $tickets[ $ticket->ID() ]['count'] + 1
					: 1;
				$tickets[ $ticket->ID() ]['att_objs'][ $reg->attendee_ID() ] = $reg->attendee();
				$tickets[ $ticket->ID() ]['dtt_objs'] = $relateddatetime;
				$tickets[ $ticket->ID() ]['reg_objs'][ $reg->ID() ] = $reg;
				$event = $reg->event();
				$tickets[ $ticket->ID() ]['EE_Event'] = $event;
				$evtcache[ $evt_id ] = $event;
				$eventsetup[ $evt_id ]['reg_objs'][ $reg->ID() ] = $reg;
				$eventsetup[ $evt_id ]['tkt_objs'][ $ticket->ID() ] = $ticket;
				$eventsetup[ $evt_id ]['att_objs'][ $reg->attendee_ID() ] = $reg->attendee();
				$event_attendee_count[ $evt_id ] = isset( $event_attendee_count[ $evt_id ] )
					? $event_attendee_count[ $evt_id ] + 1
					: 0;
				$attendees[ $reg->attendee_ID() ]['line_ref'][] = $evt_id;
				$attendees[ $reg->attendee_ID() ]['att_obj'] = $reg->attendee();
				$attendees[ $reg->attendee_ID() ]['reg_objs'][ $reg->ID() ] = $reg;
				//$attendees[ $reg->attendee_ID() ]['registration_id'] = $reg->ID();
				$attendees[ $reg->attendee_ID() ]['attendee_email'] = $reg->attendee() instanceof EE_Attendee
					? $reg->attendee()->email()
					: '';
				$attendees[ $reg->attendee_ID() ]['tkt_objs'][ $ticket->ID() ] = $ticket;
				$attendees[ $reg->attendee_ID() ]['evt_objs'][ $evt_id ] = $event;

				//registrations
				$registrations[ $reg->ID() ]['tkt_obj'] = $ticket;
				$registrations[ $reg->ID() ]['evt_obj'] = $event;
				$registrations[ $reg->ID() ]['reg_obj'] = $reg;
				$registrations[ $reg->ID() ]['att_obj'] = $reg->attendee();

				//set up answer objects
				$rel_ans = $reg->get_many_related( 'Answer' );
				foreach ( $rel_ans as $ansid => $answer ) {
					if ( ! isset( $questions[ $ansid ] ) ) {
						$questions[ $ansid ] = $answer->get_first_related( 'Question' );
					}
					$answers[ $ansid ] = $answer;
					$registrations[ $reg->ID() ]['ans_objs'][ $ansid ] = $answer;
				}

				foreach ( $relateddatetime as $dtt_id => $datetime ) {
					$eventsetup[ $evt_id ]['dtt_objs'][ $dtt_id ] = $datetime;
					$registrations[ $reg->ID() ]['dtt_objs'][ $dtt_id ] = $datetime;

					if ( isset( $datetimes[ $dtt_id ] ) ) {
						continue; //already have this info in the datetimes array.
					}

					$datetimes[ $dtt_id ]['tkt_objs'][] = $ticket;
					$datetimes[ $dtt_id ]['datetime'] = $datetime;
					$datetimes[ $dtt_id ]['evt_objs'][ $evt_id ] = $event;
					$datetimes[ $dtt_id ]['reg_objs'][ $reg->ID() ] = $reg;
				}
			}

			//let's loop through the unique event=>reg items and setup data on them

			if ( ! empty( $eventsetup ) ) {
				foreach ( $eventsetup as $evt_id => $items ) {
					if ( $this->txn instanceof EE_Transaction ) {
						$ticket_line_items_for_event = EEM_Line_Item::instance()->get_all(
							array(
								array(
									'Ticket.Datetime.EVT_ID' => $evt_id,
									'TXN_ID'                 => $this->txn->ID()
								),
								'default_where_conditions' => 'none',
							)
						);
					} else {
						$ticket_line_items_for_event = array();
					}
					$events[ $evt_id ] = array(
						'ID' => $evt_id,
						'event' => $evtcache[ $evt_id ],
						'name' => $evtcache[ $evt_id ] instanceof EE_Event ? $evtcache[ $evt_id ]->name() : '',
						'total_attendees' => $event_attendee_count[ $evt_id ],
						'reg_objs' => $items['reg_objs'],
						'tkt_objs' => $items['tkt_objs'],
						'att_objs' => $items['att_objs'],
						'dtt_objs' => isset( $items['dtt_objs'] ) ? $items['dtt_objs'] : array(),
						'line_items' => $ticket_line_items_for_event,
					);

					//make sure the tickets have the line items setup for them.
					foreach ( $ticket_line_items_for_event as $line_id => $line_item ) {
						if ( $line_item instanceof EE_Line_Item ) {
							$tickets[ $line_item->ticket()->ID() ]['line_item'] = $line_item;
							$tickets[ $line_item->ticket()->ID() ]['sub_line_items'] = $line_item->children();
							$line_items[ $line_item->ID() ]['children'] = $line_item->children();
							$line_items[ $line_item->ID() ]['EE_Ticket'] = $line_item->ticket();
						}
					}
				}
			}

			$this->grand_total_line_item = $this->txn instanceof EE_Transaction
				? $this->txn->total_line_item()
				: null;
		}

		//lets set the attendees and events properties
		$this->attendees = $attendees;
		$this->events = $events;
		$this->tickets = $tickets;
		$this->line_items_with_children = $line_items;
		$this->datetimes = $datetimes;
		$this->questions = $questions;
		$this->answers = $answers;
		$this->total_ticket_count = $total_ticket_count;
		$this->registrations = $registrations;

		if ( $this->txn instanceof EE_Transaction ) {
			$this->tax_line_items        = $this->txn->tax_items();
			$this->additional_line_items = $this->txn->non_ticket_line_items();
			$this->payments              = $this->txn->payments();

			//setup primary registration if we have a single transaction object to work with

			//let's get just the primary_attendee_data!  First we get the primary registration object.
			$primary_reg = $this->txn->primary_registration();
			// verify
			if ( $primary_reg instanceof EE_Registration ) {

				// get attendee object
				if ( $primary_reg->attendee() instanceof EE_Attendee ) {

					//now we can setup the primary_attendee_data array
					$this->primary_attendee_data = array(
						'registration_id' => $primary_reg->ID(),
						'att_obj'         => $primary_reg->attendee(),
						'reg_obj'         => $primary_reg,
						'primary_att_obj' => $primary_reg->attendee(),
						'primary_reg_obj' => $primary_reg,
					);

				} else {
					EE_Error::add_error(
						__(
							'Incoming data does not have a valid Attendee object for the primary registrant.',
							'event_espresso'
						),
						__FILE__,
						__FUNCTION__,
						__LINE__
					);
				}
			} else {
				EE_Error::add_error(
					__(
						'Incoming data does not have a valid Registration object for the primary registrant.',
						'event_espresso'
					),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
			}
		}
	}

	/**
	 * This simply considers whether the given registration should be processed or not based on comparison with the
	 * filtered_reg_status property.
	 *
	 * @param EE_Registration $registration
	 * @return bool  returning true means we DO want to skip processing.  returning false means we DON'T want to skip
	 *               processing
	 */
	protected function _skip_registration_for_processing( EE_Registration $registration ) {
		if ( empty( $this->filtered_reg_status ) ) {
			return false;
		}

		//if we made it here then we just compare the filtered_reg_status with the registration status and return that
		return $this->filtered_reg_status !== $registration->status_ID();
	}


} //end EE_Messages_incoming_data class
