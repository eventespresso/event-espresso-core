<?php
class PaymentData {
	// Set by each gateway's method for getting the attendee_id
	// Using filter_hook_espresso_transactions_get_attendee_id
	public $attendee_id;

	// Set in process_payments
	// Using filter_hook_espresso_prepare_payment_data_for_gateways
	public $email;
	public $event_id;
	public $registration_id;
	public $attendee_session;
	public $event_name;
	public $lname;
	public $fname;
	public $contact;
	// This one is also set using filter_hook_espresso_prepare_payment_data_for_gateways
	// because they are used to store information neccessary to secure confirmation of payment
	// It is reset after the individual gateways by espresso_update_attendee_payment_status_in_db
	public $payment_date;

	// These are the ones that every individual gateway MUST set
	// txn_id is also used by some gateways to store information neccessary to secure confirmation
	// of payment, and is thus pulled by filter_hook_espresso_prepare_payment_data_for_gateways
	public $txn_id;
	public $payment_status;
	public $txn_details;
	public $txn_type;

}