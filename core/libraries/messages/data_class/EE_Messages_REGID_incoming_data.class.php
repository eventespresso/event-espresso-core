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
 * EE_Messages_REGID_incoming_data
 *
 * This prepares dummy data for all messages previews run in the back end.  The Preview Data is going to use a given event id for the data.  If that event is NOT provided then we'll retrieve the first three published events from the users database as a sample (or whatever is available if there aren't three).
 *
 * To assemble the preview data, I basically used the EE_Single_Page_Checkout class to server as a guide for what data objects are setup etc.  Any place there is input expected from registrants we just setup some dummy inputs.  Remember none of this is actually saved to the database.  It is all one time use for any generated previews.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_REGID_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_REGID_incoming_data extends EE_Messages_incoming_data {

	//will hold any incoming data that might be available here
	private $_reg_id;

	//for models used in here
	private $_EEM_att;
	private $_EEM_reg;


	//hold objects that might be created
	public $reg_obj;


	/**
	 * For the constructor of this special preview class. 
	 *
	 * The data is expected to be an array that came from the $_POST and $_GET and should have at least one property from the list looked for.
	 * 
	 * @param array $data
	 */
	public function __construct( $data ) {
		
		//make sure data is an array.
		if ( !is_array($data) ) return FALSE;

		//assign properties
		$this->_reg_id = isset($data['_REG_ID']) ? $data['_REG_ID'] : NULL;

		//if all of the above are NULL we can't do anything so get out!
		if ( empty( $this->_reg_id ) ) return FALSE;

		//require the models we need;
		$this->_EEM_att = EEM_Attendee::instance();	
		$this->_EEM_reg = EEM_Registration::instance();

		parent::__construct($data);
	}



	/**
	 * This will just setup the _events property in the expected format.
	 * @return void
	 */
	protected function _setup_data() {

		$this->reg_obj = $this->_EEM_reg->get_one_by_ID( $this->_reg_id );


		//now let's loop and set up the _events property.  At the same time we'll set up attendee properties.

		//a variable for tracking totals
		$running_total = 0;

		//get txn
		$this->txn = $this->reg_obj->transaction();

		$this->taxes = $this->txn->tax();

		$this->grand_total_price_object = '';

		//possible session stuff?
		$session = $this->txn->session_data();
		$session_data =  $session instanceof EE_Session ? $session->get_session_data() : array();		

		//other data from the session (if possible)
		$this->user_id = isset( $session_data['user_id'] ) ? $session_data['user_id'] : '';
		$this->ip_address = isset( $session_data['ip_address'] ) ? $session_data['ip_address'] : '';
		$this->user_agent = isset( $session_data['user_agent'] ) ? $session_data['user_agent'] : '';
		$this->init_access = $this->last_access = '';

		$this->payment = $this->txn->get_first_related('Payment');
		$this->payment = empty( $this->payment ) ? EE_Payment::new_instance( array(
			'STS_ID' => EEM_Payment::status_id_pending,
			'PAY_timestamp' => (int) current_time('timestamp'),
			'PAY_gateway' => $this->txn->selected_gateway(),
			'PAY_gateway_response' => $this->txn->gateway_response_on_transaction(),
			)
		 ) : $this->payment; //if there is no payments associated with the transaction then we just create a default payment object for potential parsing.

		$this->billing = $this->payment->details();
		EE_Registry::instance()->load_helper('Template');
		$this->billing['total_due'] = isset( $this->billing['total'] ) ? EEH_Template::format_currency( $this->billing['total'] ) : '';

		//get reg_objs for txn
		$this->reg_objs = $this->txn->registrations();

		//now we can set things up like we do for other handlers
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
						'reg' => $reg,
						'name' => $event->name(),
						'daytime_id' => $first_datetime  ? $first_datetime->ID() : 0,
						'ticket_price' => $tkt->get_ticket_subtotal(),
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

} //end EE_Messages_REGID_incoming_data class