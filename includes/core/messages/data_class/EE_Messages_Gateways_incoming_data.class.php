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
 * EE_Messages_Gateways_incoming_data
 *
 * This is the child class for all incoming data to EE_Messages objects that originate in a gateway response.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_Gateways_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_Gateways_incoming_data extends EE_Messages_incoming_data {

	/**
	 * This holds the incoming payment object
	 * @var EE_Payment
	 */
	public $payment;

	
	/**
	 * incoming data is expected to be a EE_Transaction object and (possibly) EE_Payment object in an array.  
	 * @param array $data
	 */
	public function __construct( $data ) {

		//test for valid params
		if ( ! ( $data[0] instanceof EE_Transaction ))
			throw new EE_Error( __('Incoming data for the Gateways data handler must have an EE_Transaction object as the value for the first array index.', 'event_espresso') );

		if ( ! ( $data[1] instanceof  EE_Payment ))
			$pmt_obj = $this->_get_empty_payment_obj( $data[0] );

		$data = array(
			'txn_obj' => $data[0],
			'pmt_obj' => isset($pmt_obj) ? $pmt_obj : $data[1],
			);
		parent::__construct( $data );
	}


	/**
	 * This sets up an empty EE_Payment object for the purpose of shortcode parsing.  Note that this doesn't actually get saved to the db.
	 * @return EE_Payment 
	 */
	private function _get_empty_payment_obj( EE_Transaction $txn ) {
		$PMT = EE_Payment::new_instance( array(
			'STS_ID' => EEM_Payment::status_id_pending,
			'PAY_timestamp' => (int) current_time('timestamp'),
			'PAY_gateway' => $txn->selected_gateway(),
			'PAY_gateway_response' => $txn->gateway_response_on_transaction(),
			)
		 );
		return $PMT;
	}


	protected function _setup_data() {
		
		$this->reg_info = array();

		$this->txn = $this->_data['txn_obj'];
		$this->payment = $this->_data['pmt_obj'];
		$this->incoming_data = $this->_data;
		$this->taxes = $this->txn->tax();

		$this->grand_total_price_object = ''; //not available and not needed?

		$session = $this->txn->session_data();

		//other data from the session (if possible)
		$this->user_id = isset( $session['user_id'] ) ? $session['user_id'] : '';
		$this->ip_address = isset( $session['ip_address'] ) ? $session['ip_address'] : '';
		$this->user_agent = isset( $session['user_agent'] ) ? $session['user_agent'] : '';
		$this->init_access = $this->last_access = '';

		$this->billing = $this->payment->details();
		EE_Registry::instance()->load_helper('Template');
		$this->billing['total_due'] = isset( $this->billing['total'] ) ? EEH_Template::format_currency( $this->billing['total'] ) : '';

		//let's get all the registrations associated with this txn
		$this->reg_objs = $this->txn->registrations();

		//let's get just the primary_attendee_data!  First we get the primary registration object.
		$primary_reg = $this->txn->primary_registration(TRUE);

		$primary_att = $primary_reg->attendee();

		//now we can setup the primary_attendee_data array
		$this->primary_attendee_data = array(
			'fname' => $primary_att->fname(),
			'lname' => $primary_att->lname(),
			'email' => $primary_att->email(),
			'primary_attendee_email' => $primary_att->email(),
			'registration_id' => $primary_reg->ID()
			);

		//get all attendee and events associated with the registrations in this transaction
		$events = array();
		$attendees = array();
		if ( !empty( $this->reg_objs ) ) {
			$event_attendee_count = array(); 
			foreach ( $this->reg_objs as $reg ) {
				$events[$reg->event_ID()] = $reg;
				$event_attendee_count[$reg->event_ID()] = isset( $event_attendee_count[$reg->event_ID()] ) ? $event_attendee_count[$reg->event_ID()] + 1 : 0;
				$attendees[$reg->attendee_ID()]['line_ref'][] = $reg->event_ID();
				$attendees[$reg->attendee_ID()]['att_obj'] = $reg->attendee();
				$attendees[$reg->attendee_ID()]['reg_objs'][$reg->event_ID()] = $reg;
			}

			//let's loop through the unique event=>reg items and setup data on them


			if ( !empty( $events) ) {
				foreach ( $events as $eid => $reg ) {
					/*@var $reg EE_Registration */
					$event = $reg->event_obj();
					$first_datetime = $event->first_datetime();
					$tkt = $reg->get_first_related('Ticket');
					$events[$eid] = array(
						'ID' => $reg->event_ID(),
						'line_ref' => $reg->event_ID(),
						'name' => $event->name(),
						'daytime_id' => $first_datetime  ? $first_datetime->ID() : 0,
						'ticket' => $tkt->get_ticket_subtotal(),
						'ticket_obj' => $tkt,
						'ticket_desc' => $tkt->get('TKT_description'),
						'pre_approval' => $event->require_pre_approval(),// $event->require_pre_approval,
						'ticket_id' => $tkt->ID(),
						'meta' => null, //used to be maybe_unserialize( $event->event_meta ), but htere is now NO event meta column
						'line_total' => $this->txn->total(),
						'total_attendees' => $event_attendee_count[$eid]
					);
				}
			}	
		}

		//lets set the attendees and events properties
		$this->attendees = $attendees;
		$this->events = $events;

	}


} //end class EE_Messages_Gateways_incoming_data
