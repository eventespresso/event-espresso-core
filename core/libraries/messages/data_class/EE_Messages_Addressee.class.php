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
 * EE_Messages_Addressee
 *
 * This class is just for preparing an Addressee object used by the Messages subsystem of EE.  We take an incoming array of data and set it up in a formatted object that will be consistent among all message_types. That way each element will be present in every addressee object but just might not contain a value depending on the data received.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Messages_Addressee extends EE_Base {


	/**
	 * Identifier properties for the recipient
	 */
	public $user_id;  //if available we'll use this to set the fname and lname (admin)
	public $fname; //this will always be the admin fname (set later via incoming user_id)
	public $lname; //this will always be the admin lnmae (set later via incoming user_id)
	public $primary_registration_id;
	public $attendee_registration_id;


	/**
	 * communication related
	 */
	public $attendee_email;
	public $primary_attendee_email;
	public $admin_email;


	/**
	 * Attendee related
	 */
	public $primary_att_obj; //holds the attendee object for the primary attendee
	public $primary_reg_obj; //holds the reg object for the primary attendee
	public $att_obj; //holds the attendee object for an attendee
	public $reg_obj; //holds the registration object for an attendee
	public $questions; //EE_Question[] (indexed by EE_Answer->ID())
	public $answers; //EE_Answer[]



	/**
	 * event related
	 */
	public $events; //this will hold all event info (EE_Event[])
	public $attendees; //holds all the attendees for an event. (EE_Attendee[])
	public $tickets; //holds all the purchased tickets for an event (EE_Ticket[])
	public $datetimes; //holds all the datetimes accessed via the tickets purchased for the event (EE_Datetime[])
	public $registrations; //holds all registrations for a transaction (with cached relations on that registration);



	/**
	 * txn related
	 */
	public $billing;
	/**
	 *total taxes
	 * @var float
	 */
	public $taxes;
	public $txn;
	public $payment;
	public $txn_objs;
	public $reg_objs;
	public $total_ticket_count; //total of ALL tickets purchased for the txn.



	/**
	 * things that get set later by parsers
	 */
	public $event_list;
	public $attendee_list;




	/**
	 * This just holds the incoming data
	 * @var mixed
	 */
	protected $_data;




	/**
	 * constructor
	 *
	 * @access public
	 * @param array $addressee_data We're expecting an incoming array of data that will be used to fill the properties for the object.
	 * @return void
	 */
	public function __construct( $addressee_data ) {
		$this->_data = $addressee_data;
		$this->_set_properties();
	}




	/**
	 * This simply loops through the data and makes sure that each item is present in the incoming data.  If it is then it is assigned to the property.
	 *
	 * @access protected
	 * @return void.
	 */
	protected function _set_properties() {

		foreach ( $this->_data as $prop => $value ) {
			if( EEH_Class_Tools::has_property( $this, $prop ) )
				$this->$prop = $value;
		}

		//if user_id present we'll use this to set the fname and lname and admin_email.
		if ( !empty( $this->user_id ) ) {
			$this->user_id = (int) $this->user_id;
			$user = get_userdata( $this->user_id );
			$this->fname = $user->user_firstname;
			$this->lname = $user->user_lastname;
			$this->admin_email = $user->user_email;
		}

	}

} //end class EE_Payment_message_type