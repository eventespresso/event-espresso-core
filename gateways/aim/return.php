<?php

function espresso_aim_process_payment() {
	global $wpdb, $org_options, $payment_settings;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	require_once 'AuthorizeNet.php';

	$authnet_aim_login_id = $payment_settings['authnet_aim']['authnet_aim_login_id'];
	$authnet_aim_transaction_key = $payment_settings['authnet_aim']['authnet_aim_transaction_key'];

	if ($payment_settings['authnet_aim']['use_sandbox'] == 'Y') {
		define("AUTHORIZENET_SANDBOX", true);
		define("AUTHORIZENET_LOG_FILE", true);
	} else {
		define("AUTHORIZENET_SANDBOX", false);
	}

	$transaction = new AuthorizeNetAIM($authnet_aim_login_id, $authnet_aim_transaction_key);
	echo '<!--Event Espresso Authorize.net AIM Gateway Version ' . $transaction->authnet_aim_gateway_version . '-->';
	$transaction->amount = $_POST['amount'];
	$transaction->card_num = $_POST['card_num'];
	$transaction->exp_date = $_POST['exp_date'];
	$transaction->card_code = $_POST['ccv_code'];
	$transaction->first_name = $_POST['first_name'];
	$transaction->last_name = $_POST['last_name'];
	$transaction->email = $_POST['email'];
	$transaction->address = $_POST['address'];
	$transaction->city = $_POST['city'];
	$transaction->state = $_POST['state'];
	$transaction->zip = $_POST['zip'];
	$transaction->cust_id = $_POST['x_cust_id'];
	$transaction->invoice_num = $_POST['invoice_num'];
	if ($payment_settings['authnet_aim']['test_transactions'] == 'Y') {
		$transaction->test_request = "true";
	}
	$transaction->description = $_POST['class_desc'];

//Capture response
	$response = $transaction->authorizeAndCapture();
	$attendee_id = $response->customer_id;

	$result['att_registration_id'] = espresso_registration_id($attendee_id);
	$result['txn_id'] = $response->transaction_id;
	$result['txn_type'] = $response->transaction_type;
	$result['payment_date'] = date("d-m-Y");

	$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . $result['att_registration_id'] . "' ";
	$sql .= $attendee_id == '' ? '' : " AND id= '" . $attendee_id . "' ";
	$sql .= " ORDER BY id LIMIT 0,1";
	$attendees = $wpdb->get_results($sql);

	foreach ($attendees as $attendee) {
		$result['lname'] = $attendee->lname;
		$result['fname'] = $attendee->fname;
		$result['total_cost'] = $attendee->amount_pd;
		$event_id = $attendee->event_id;
	}

	$events = $wpdb->get_results("SELECT event_name FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");
	foreach ($events as $event) {
		$event_name = $event->event_name;
	}
//Build links
	$event_url = espresso_reg_url($event_id);
	$result['event_link'] = '<a href="' . $event_url . '">' . $event_name . '</a>';

	if ($response->approved) {
		$result['payment_status'] = 'Completed';
		?>
		<h2><?php _e('Thank You!', 'event_espresso'); ?></h2>
		<p><?php _e('Your transaction has been processed.', 'event_espresso'); ?></p>
		<p><?php _e('Transaction ID:', 'event_espresso') . $response->transaction_id; ?></p>
		<?php
		$payment_failed = false;
	} else {
		print $response->error_message;
		$result['payment_status'] = 'Payment Declined';
		$payment_failed = true;
	}

	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $result['payment_status'] . "', txn_type = '" . $result['txn_type'] . "', txn_id = '" . $result['txn_id'] . "', payment_date ='" . $result['payment_date'] . "', transaction_details = '" . serialize($response) . "'  WHERE registration_id ='" . $result['att_registration_id'] . "'";
	$wpdb->query($sql);

	if ($payment_failed == true) {
		echo event_espresso_pay($result['att_registration_id']);
	}
	return $result;
}