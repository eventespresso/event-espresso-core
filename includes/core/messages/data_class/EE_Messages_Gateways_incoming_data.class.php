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
 * @ version		3.2
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
	 * incoming data is expected to be a EE_Transaction object and EE_Payment object in an array.  
	 * @param array $data
	 */
	public function __construct( $data ) {

		//test for valid params
		if ( !is_a( $data[0], 'EE_Transaction' ) || !is_a( $data[1], 'EE_Payment') )
			throw new EE_Error( __('Incoming data for the Gateways data handler is not of a valid type.', 'event_espresso') );

		$data = array(
			'txn_obj' => $data[0],
			'pmt_obj' => $data[1],
			);
		parent::__construct( $data );
	}


	protected function _setup_data() {
		global $org_options;
		
		$this->reg_info = array();

		$this->txn = $this->_data['txn_obj'];
		$this->taxes = $this->txn->tax();

		$this->grand_total_price_object = ''; //not available and not needed?

		//other data from the session (if possible)
		$this->user_id = isset( $session['user_id'] ) ? $session['user_id'] : '';
		$this->ip_address = isset( $session['ip_address'] ) ? $session['ip_address'] : '';
		$this->user_agent = isset( $session['user_agent'] ) ? $session['user_agent'] : '';
		$this->init_access = $this->last_access = '';

		$this->billing = $this->_data['pmt_obj']->details();
		$this->billing['total_due'] = isset( $this->billing['total'] ) ? $org_options['currency_symbol'] . $this->billing['total'] : '';

		//let's get all the registrations associated with this txn
		$this->reg_objs = $this->txn->registrations();

		//let's get just the primary_attendee_data!  First we get the primary registration object.
		$primary_reg = $this->txn->primary_registration(TRUE);

		$primary_att = $primary_reg->attendee();

		//now we can setup the primary_attendee_data array
		$this->primary_attendee_data = array(
			'fname' => $primary_att->fname(),
			'lname' => $primary_att->lname(),
			'email' => $primary_att->email()
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
					$event = $reg->event();
					$price_obj = $reg->price_obj();
					$events[$eid] = array(
						'ID' => $reg->event_ID(),
						'line_ref' => $reg->event_ID(),
						'name' => $event->event_name,
						'daytime_id' => $reg->event_daytime_id(),
						'price' => $reg->price_paid(),
						'price_obj' => $price_obj,
						'price_desc' => $price_obj->desc(),
						'pre_approval' => $event->require_pre_approval,
						'price_id' => $price_obj->ID(),
						'meta' => maybe_unserialize( $event->event_meta ),
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