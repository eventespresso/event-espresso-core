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
 * This is the parent class for all incoming data to EE_Messages objects.  We create different data handlers for different incoming data depending on the message types set requirements.
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
	 * @var string
	 */
	public $user_id;


	/**
	 * IP Address of browser used
	 * @var
	 */
	public $ip_address;


	/**
	 * other browser info when data collected
	 */
	public $user_agent;
	public $init_access;
	public $last_access;


	/**
	 * Holds billing info about the transaction
	 * @var mixed (array|string)
	 */
	public $billing_info;


	/**
	 * The registrations details from the cart
	 * @var array
	 */
	public $reg_info;



	/**
	 * will hold an array of events assembled from $reg_info
	 * @var EE_Event[]
	 */
	public $events;



	/**
	 * holds an array of tickets assembled from the incomign data.
	 * @var EE_Ticket[]
	 */
	public $tickets;



	/**
	 * will hold an array of attendees assembled from the $reg_info
	 * @var EE_Attendee[]
	 */
	public $attendees;




	/**
	 * Will hold billing data assembled from $billing_info (if present)
	 * @var mixed (array|null)
	 */
	public $billing;



	/**
	 * Will hold tax details from transaction (if present)
	 * @var int (?)
	 */
	public $taxes;



	/**
	 * holds the grand total price object
	 * @var obj
	 */
	public $grand_total_price_object;




	/**
	 * Will hold the final transaction object (EE_Transaction)
	 * @var EE_Transaction;
	 */
	public $txn;




	/**
	 * Will hold the label for the txn status
	 * @var string
	 */
	public $txn_status;




	/**
	 * Will hold the final registration object (EE_Registration)
	 * @var EE_Registration[]
	 */
	public $reg_objs;



	/**
	 * Will hold an array of primary attendee data (if present)
	 * @var array
	 */
	public $primary_attendee_data;




	/**
	 * This is just an internal object used for passing around the incoming data.
	 * @var object
	 */
	protected $_data;




	/**
	 * constructor
	 * @param mixed $data incoming data object|array.  Suggested that child classes use typehinting for expected data object.  But here parent will be generic because we don't know what's coming in.
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
	 * @return void
	 */
	protected function _assemble_data() {
		//verify that reg_objs is set
		if ( !is_array( $this->reg_objs) && ! ( array_shift(array_values($array)) instanceof EE_Registration ) )
			throw new EE_Error( __('In order to assemble the data correctly, the "reg_objs" property must be an array of EE_Registration objects', 'event_espresso') );

		//get all attendee and events associated with the registrations in this transaction
		$events = $event_setup = $evt_cache = $tickets = array();
		$attendees = array();
		if ( !empty( $this->reg_objs ) ) {
			$event_attendee_count = array(); 
			foreach ( $this->reg_objs as $reg ) {
				$evt_id = $reg->event_ID();
				$ticket = $reg->get_first_related('Ticket');
				$tickets[$ticket->ID()]['ticket'] = $ticket;
				$tickets[$ticket->ID()]['att_objs'][] = $reg->attendee();
				$event = $reg->event();
				$evtcache[$evt_id] = $event;
				$eventsetup[$evt_id]['reg_objs'][] = $reg;
				$eventsetup[$evt_id]['tkt_objs'][] = $ticket;
				$eventsetup[$evt_id]['att_objs'][] = $reg->attendee();
				$event_attendee_count[$evt_id] = isset( $event_attendee_count[$evt_id] ) ? $event_attendee_count[$evt_id] + 1 : 0;
				$attendees[$reg->attendee_ID()]['line_ref'][] = $evt_id;
				$attendees[$reg->attendee_ID()]['att_obj'] = $reg->attendee();
				$attendees[$reg->attendee_ID()]['reg_objs'][$evt_id] = $reg;
				$attendees[$reg->attendee_ID()]['registration_id'] = $reg->ID();
				$attendees[$reg->attendee_ID()]['attendee_email'] = $reg->attendee()->email();
				$attendees[$reg->attendee_ID()]['tkt_objs'][$evt_id] = $ticket;
				$attendees[$reg->attendee_ID()]['evt_objs'][$evt_id] = $event;
			}

			//let's loop through the unique event=>reg items and setup data on them


			if ( !empty( $events) ) {
				foreach ( $eventsetup as $eid => $items ) {
					$events[$eid] = array(
						'ID' => $eid,
						'event' => $evtcache[$eid],
						'name' => $event->name(),
						'pre_approval' => $event->require_pre_approval(),// $event->require_pre_approval,
						'total_attendees' => $event_attendee_count[$eid],
						'reg_objs' => $items['reg_objs'],
						'tkt_objs' => $items['tkt_objs'],
						'att_objs' => $items['att_objs']
					);
				}
			}	
		}

		//lets set the attendees and events properties
		$this->attendees = $attendees;
		$this->events = $events;
		$this->tickets = $tickets;
	}


} //end EE_Messages_incoming_data class