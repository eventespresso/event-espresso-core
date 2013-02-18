<?php

global $wpdb;

if ($_REQUEST['rescode'] == '00' || $_REQUEST['rescode'] =='08') {

	$payment_status = 'Completed';
	$payment_date = date("d-m-Y");
	$txn_type = 'NAB';
	$txn_id = $_REQUEST['txnid'];
	$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ";
	$sql .= $attendee_id == '' ? '' : " AND id= '" . $attendee_id . "' ";
	$sql .= " ORDER BY id LIMIT 0,1";

	$attendees = $wpdb->get_results($sql);

	foreach ($attendees as $attendee) {
		$attendee_id = $attendee->id;
		$att_registration_id = $attendee->registration_id;
		$lname = $attendee->lname;
		$fname = $attendee->fname;
		$amount_pd = $attendee->amount_pd;
		$total_cost = $attendee->amount_pd;
		$event_id = $attendee->event_id;
	}

	$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");

	foreach ($events as $event) {
		$event_id = $event->id;
		$event_name = $event->event_name;
		$event_desc = $event->event_desc;
		$event_description = $event->event_desc;
		$event_identifier = $event->event_identifier;
		$active = $event->is_active;
	}


	$event_url = espresso_reg_url($event_id);
	$event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';

	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET
				payment_status = '$payment_status',
				txn_id = '" . $txn_id . "',
				txn_type = '$txn_type',
				amount_pd = '" . $amount_pd . "',
				payment_date ='" . $payment_date . "'
				WHERE registration_id ='" . $att_registration_id . "' ";

	$wpdb->query($sql);
	$total_cost = $amount_pd;

	//Debugging option
	if ($eway_settings['use_sandbox']) {
		var_dump($response);
		// For this, we'll just email ourselves ALL the data as plain text output.
		$subject = 'Instant Payment Notification - Gateway Variable Dump';
		$body = "An instant payment notification was successfully recieved\n";
		$body .= "from " . " on " . date('m/d/Y');
		$body .= " at " . date('g:i A') . "\n\nDetails:\n";
		$body .= $response;
		wp_mail($contact, $subject, $body);
	}
} else {
	$subject = 'Instant Payment Notification - Gateway Variable Dump';
	$body = "An instant payment notification failed\n";
	$body .= "from " . " on " . date('m/d/Y');
	$body .= " at " . date('g:i A') . "\n\nDetails:\n";
	$body .= $response;
	wp_mail($contact, $subject, $body);
}