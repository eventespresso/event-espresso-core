<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'NO direct script access allowed' );
}



/**
 * EE_Messages_Addressee
 * This class is just for preparing an Addressee object used by the Messages subsystem of EE.  We take an incoming
 * array of data and set it up in a formatted object that will be consistent among all message_types. That way each
 * element will be present in every addressee object but just might not contain a value depending on the data received.
 *
 * @package        Event Espresso
 * @subpackage     includes/core/messages
 * @author         Darren Ethier
 *                 ------------------------------------------------------------------------
 */
class EE_Messages_Addressee extends EE_Base {


	/**
	 * Identifier properties for the recipient
	 */

	/**
	 * if available we'll use this to set the fname and lname (admin)
	 *
	 * @var int $user_id
	 */
	public $user_id;

	/**
	 * this will always be the admin fname (set later via incoming user_id)
	 *
	 * @var string $fname
	 */
	public $fname;

	/**
	 * this will always be the admin lname (set later via incoming user_id)
	 *
	 * @var string $lname
	 */
	public $lname;

	/**
	 * @var int $primary_registration_id
	 */
	public $primary_registration_id;

	/**
	 * @var int $attendee_registration_id
	 */
	public $attendee_registration_id;

	/**
	 * This is should represent the data object that can be used to regenerate this addressee if needed.
	 * It is saved to the MSG_recipient_ID column in the generated EE_Message using this data.
	 *
	 * @var int
	 */
	public $recipient_id;

	/**
	 * This represents the reference to the EE_Base_Class child that the $recipient_ID is for (eg. 'Registration',
	 * 'Attendee') It is saved to the MSG_recipient_type column in the generated EE_Message using this data.
	 *
	 * @var string
	 */
	public $recipient_type;

	/**
	 * communication related
	 */
	/**
	 * @var string $admin_email
	 */
	public $attendee_email;

	/**
	 * @var string $admin_email
	 */
	public $primary_attendee_email;

	/**
	 * @var string $admin_email
	 */
	public $admin_email;



	/**
	 * Attendee related
	 */

	/**
	 * holds the attendee object for the primary attendee
	 *
	 * @var EE_Attendee $primary_att_obj
	 */
	public $primary_att_obj;

	/**
	 * holds the registration object for the primary attendee
	 *
	 * @type EE_Registration $primary_reg_obj
	 */
	public $primary_reg_obj;

	/**
	 * holds the attendee object for an attendee
	 *
	 * @var EE_Attendee $att_obj
	 */
	public $att_obj;

	/**
	 * holds the registration object for an attendee
	 *
	 * @var EE_Registration $reg_obj
	 */
	public $reg_obj;

	/**
	 * array of EE_Question objects (indexed by EE_Answer->ID())
	 *
	 * @var EE_Question[] $questions
	 */
	public $questions;

	/**
	 * array of EE_Answer objects
	 *
	 * @var EE_Answer[] $answers
	 */
	public $answers;



	/**
	 * event related
	 */

	/**
	 * @var EE_Event[] $events
	 */
	public $events; //this will hold all event info ()

	/**
	 * holds all the attendees for an event.
	 *
	 * @var EE_Attendee[] $attendees
	 */
	public $attendees;

	/**
	 * holds all the purchased tickets for an event
	 *
	 * @var EE_Ticket[] $tickets
	 */
	public $tickets;

	/**
	 * holds an array of line items indexed by parent ticket line item ids and values are array of children of that
	 * line item
	 *
	 * @var EE_Line_Item[] $line_items_with_children
	 */
	public $line_items_with_children;

	/**
	 * holds all the datetimes accessed via the tickets purchased for the event
	 *
	 * @var EE_Datetime[] $datetimes
	 */
	public $datetimes;

	/**
	 * holds all registrations for a transaction (with cached relations on that registration)
	 *
	 * @var EE_Registration[] $registrations
	 */
	public $registrations;



	/**
	 * txn related
	 */

	/** @var $billing */
	public $billing;

	/**
	 *total taxes
	 *
	 * @var float $taxes
	 */
	public $taxes;

	/** @var float $tax_line_items */
	public $tax_line_items;

	/** @var float $additional_line_items */
	public $additional_line_items;

	/** @var float $grand_total_line_item */
	public $grand_total_line_item;

	/** @var EE_Transaction $txn */
	public $txn;

	/** @var EE_Payment $payment */
	public $payment;

	/** @var EE_Payment[] $payments */
	public $payments;

	/** @var EE_Transaction[] $txn_objs */
	public $txn_objs;

	/** @var EE_Registration[] $reg_objs */
	public $reg_objs;

	/**
	 * total number of ALL tickets purchased for the txn.
	 *
	 * @var int $total_ticket_count
	 */
	public $total_ticket_count;



	/**
	 * things that get set later by parsers
	 */

	/** @var string $event_list */
	public $event_list;

	/** @var string $attendee_list */
	public $attendee_list;



	/**
	 * This just holds the incoming data
	 *
	 * @var array
	 */
	protected $_data;



	/**
	 * constructor
	 *
	 * @access public
	 * @param array $addressee_data We're expecting an incoming array of data that will be used to fill the properties
	 *                              for the object.
	 */
	public function __construct( $addressee_data ) {
		$this->_data = $addressee_data;
		$this->_set_properties();
	}



	/**
	 * This simply loops through the data and makes sure that each item is present in the incoming data.  If it is then
	 * it is assigned to the property.
	 *
	 * @access protected
	 * @return void.
	 */
	protected function _set_properties() {
		foreach ( $this->_data as $prop => $value ) {
			if ( property_exists( $this, $prop ) ) {
				$this->{$prop} = $value;
			}
		}
		//if user_id present we'll use this to set the fname and lname and admin_email.
		if ( ! empty( $this->user_id ) ) {
			$this->user_id = (int) $this->user_id;
			$user = get_userdata( $this->user_id );
			$this->fname = $user->user_firstname;
			$this->lname = $user->user_lastname;
			$this->admin_email = $user->user_email;
		}
	}

} //end class EE_Payment_message_type
