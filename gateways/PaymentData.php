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
function espresso_prepare_payment_data_for_gateways($payment_data) {
	global $wpdb, $org_options;
	$sql = "SELECT ea.email, ea.event_id, ea.registration_id,";
	$sql .= " ea.attendee_session, ed.event_name, ea.lname, ea.fname, ea.txn_id,";
	$sql .= "	ea.payment_status, ea.payment_date FROM " . EVENTS_ATTENDEE_TABLE . " ea";
	$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=ea.event_id";
	$sql .= " WHERE ea.id='" . $payment_data->attendee_id . "'";
	$temp_data = $wpdb->get_row($sql, ARRAY_A);
	foreach ($temp_data as $key => $data) {
		$payment_data->$key = $data;
	}
	$payment_data->contact = $org_options['contact_email'];
	return $payment_data;
}

function espresso_prepare_event_link($payment_data) {
	$event_url = espresso_reg_url($payment_data->event_id);
	$payment_data->event_link = '<a href="' . $event_url . '">' . $payment_data->event_name . '</a>';
	return $payment_data;
}

function espresso_get_total_cost($payment_data) {
	global $wpdb;
	$sql = "SELECT ac.cost, ac.quantity FROM " . EVENTS_ATTENDEE_TABLE . " a ";
	$sql .= " JOIN " . EVENTS_ATTENDEE_COST_TABLE . " ac ON a.id=ac.attendee_id ";
	$sql .= " WHERE a.attendee_session='" . $payment_data->attendee_session . "'";
	$tickets = $wpdb->get_results($sql, ARRAY_A);
	$total_cost = 0;
	foreach ($tickets as $ticket) {
		$total_cost += $ticket['quantity'] * $ticket['cost'];
	}
	$payment_data->total_cost = $total_cost;
	return $payment_data;
}

function espresso_update_attendee_payment_status_in_db($payment_data) {
	global $wpdb;
	$payment_data->payment_date = date("m-d-Y");
	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET amount_pd = '" . $payment_data->total_cost . "' WHERE id ='" . $payment_data->attendee_id . "' ";
	$wpdb->query($sql);

	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_data->payment_status . "', txn_type = '" . $payment_data->txn_type . "', txn_id = '" . $payment_data->txn_id . "', payment_date ='" . $payment_data->payment_date . "', transaction_details = '" . $payment_data->txn_details . "' WHERE attendee_session ='" . $payment_data->attendee_session . "' ";
	$wpdb->query($sql);
	return $payment_data;
}



