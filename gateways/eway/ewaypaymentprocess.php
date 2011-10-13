<?php

global $wpdb;
$eway_settings = get_option('event_espresso_eway_settings');
switch ($eway_settings['region']) {
	case 'NZ':
		$results_request = 'https://nz.ewaygateway.com/Result/';
		break;
	case 'AU':
		$results_request = 'https://au.ewaygateway.com/Result/';
		break;
	case 'UK':
		$results_request = 'https://payment.ewaygateway.com/Result/';
		break;
}
$results_request .= "?CustomerID=" . $eway_settings['eway_id'];
$results_request .= "&UserName=" . $eway_settings['eway_username'];
$results_request .= "&AccessPaymentCode=" . $_REQUEST['AccessPaymentCode'];
$results_request = str_replace(" ", "%20", $results_request);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $results_request);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
if (CURL_PROXY_REQUIRED == 'True') {
	$proxy_tunnel_flag = (defined('CURL_PROXY_TUNNEL_FLAG') && strtoupper(CURL_PROXY_TUNNEL_FLAG) == 'FALSE') ? false : true;
	curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, $proxy_tunnel_flag);
	curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_HTTP);
	curl_setopt($ch, CURLOPT_PROXY, CURL_PROXY_SERVER_DETAILS);
}

function fetch_data($string, $start_tag, $end_tag) {

	$position = stripos($string, $start_tag);
	$str = substr($string, $position);
	$str_second = substr($str, strlen($start_tag));
	$second_positon = stripos($str_second, $end_tag);
	$str_third = substr($str_second, 0, $second_positon);
	$fetch_data = trim($str_third);
	return $fetch_data;
}

$response = curl_exec($ch);

$authecode = fetch_data($response, '<authCode>', '</authCode>');
$responsecode = fetch_data($response, '<responsecode>', '</responsecode>');
$retrunamount = fetch_data($response, '<returnamount>', '</returnamount>');
$txn_id = fetch_data($response, '<trxnnumber>', '</trxnnumber>');
$trxnstatus = fetch_data($response, '<trxnstatus>', '</trxnstatus>');
$trxnresponsemessage = fetch_data($response, '<trxnresponsemessage>', '</trxnresponsemessage>');

$merchantoption1 = fetch_data($response, '<merchantoption1>', '</merchantoption1>');
$merchantoption2 = fetch_data($response, '<merchantoption2>', '</merchantoption2>');
$merchantoption3 = fetch_data($response, '<merchantoption3>', '</merchantoption3>');
$merchantreference = fetch_data($response, '<merchantreference>', '</merchantreference>');
$merchantinvoice = fetch_data($response, '<merchantinvoice>', '</merchantinvoice>');
$id = $_REQUEST['id'];
if ($responsecode == '00') {

	$payment_status = 'Completed';
	$payment_date = date("d-m-Y");
	$txn_type = 'EW';
	$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($id) . "' ";
	$sql .= $id == '' ? '' : " AND id= '" . $id . "' ";
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
	if ($email_transaction_dump == true) {
		// For this, we'll just email ourselves ALL the data as plain text output.
		$subject = 'Instant Payment Notification - Gateway Variable Dump';
		$body = "An instant payment notification was successfully recieved\n";
		$body .= "from " . " on " . date('m/d/Y');
		$body .= " at " . date('g:i A') . "\n\nDetails:\n";
		foreach ($xml as $key => $value) {
			$body .= "\n$key: $value\n";
		}
		wp_mail($contact, $subject, $body);
	}
} else {
	$subject = 'Instant Payment Notification - Gateway Variable Dump';
	$body = "An instant payment notification failed\n";
	$body .= "from " . " on " . date('m/d/Y');
	$body .= " at " . date('g:i A') . "\n\nDetails:\n";
	foreach ($response as $key => $value) {
		$body .= "\n$key: $value\n";
	}
	//wp_mail($contact, $subject, $body);
}