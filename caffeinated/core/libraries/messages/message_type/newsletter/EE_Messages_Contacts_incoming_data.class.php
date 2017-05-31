<?php
/**
 * This file contains the EE_Messages_Contacts_incoming_data class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.3.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This prepares data for message types that send messages for multiple contacts and handles
 * when the incoming data is an array of EE_Attendee objects.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.3.0
 * @author          Darren Ethier
 */
class EE_Messages_Contacts_incoming_data extends EE_Messages_incoming_data {


	/**
	 * Constructor.
	 *
	 * @since    4.3.0
	 * @param  EE_Attendee[]     $data expecting an array of EE_Attendee objects.
	 * @throws EE_Error
	 * @access protected
	 */
	public function __construct( $data = array() ) {

		//validate that the first element in the array is an EE_Attendee object.  Note that the array may be indexed by REG_ID so we will just shift off the first element.
		$ctc_chk = reset( $data );
		if ( ! $ctc_chk instanceof EE_Attendee )
			throw new EE_Error(__('The EE_Message_Contacts_incoming_data class expects an array of EE_Attendee objects.', 'event_espresso') );

		parent::__construct( $data );
	}


	/**
	 * @see parent class for phpdocs.
	 * @param array $attendees
	 * @return array
	 */
	public static function convert_data_for_persistent_storage( $attendees ) {
		$attendee_ids = array_filter(
			array_map(
				function( $attendee ) {
					if ( $attendee instanceof EE_Attendee ) {
						return $attendee->ID();
					}
					return false;
				},
				$attendees
			)
		);
		return $attendee_ids;
	}




	/**
	 * @see parent class for phpdocs
	 * @param array $attendee_ids
	 * @return EE_Attendee[]
	 */
	public static function convert_data_from_persistent_storage( $attendee_ids ) {
		$attendee_ids = (array) $attendee_ids;
		$attendees = EEM_Attendee::instance()->get_all(
		  array(
			  array( 'ATT_ID' => array( 'IN', $attendee_ids ) )
		  )
		);
		return $attendees;
	}




	/**
	 * setup the data.
	 *
	 * Sets up the expected data object for the messages prep using incoming registration objects.
	 *
	 * @since   4.3.0
	 *
	 * @return void
	 * @access protected
	 */
	protected function _setup_data() {

		//we'll loop through each contact and setup the data needed.  Note that many properties will just be set as empty because the contacts data handler is for a very specific set of data (i.e. just what's related to the contact).
		$this->txn = NULL;
		$this->taxes = NULL;
		$this->grand_total_price_object = '';
		$this->user_id = $this->ip_address = $this->user_agent = $this->init_access = '';
		$this->payment = NULL;
		$this->billing = array();
		$this->reg_objs = array();
		$this->attendees = $this->events = $this->tickets = $this->datetimes = $this->questions = $this->answer =  $this->registrations = array();
		$this->total_ticket_count = 0;
		$this->primary_attendee_data = array(
			'registration_id' => 0,
			'att_obj' => NULL,
			'reg_obj' => NULL,
			'primary_att_obj' => NULL,
			'primary_reg_obj' => NULL
			);

		foreach ( $this->_data as $contact ) {
			$id = $contact->ID();
			$reg = $contact->get_first_related('Registration');
			$this->attendees[$id]['att_obj'] = $contact;
			$this->attendees[$id]['reg_objs'][$reg->ID()] = $reg;
			$this->attendees[$id]['attendee_email'] = $contact->email();
			$this->attendees[$id]['tkt_objs'] = array();
			$this->attendees[$id]['evt_objs'] = array();
		}
	}
}
