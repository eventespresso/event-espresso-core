<?php

function espresso_transactions_paypal_get_attendee_id($attendee_id) {
	if (!empty($_REQUEST['id'])) {
		$attendee_id = $_REQUEST['id'];
	}
	return $attendee_id;
}

function espresso_process_paypal() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$payment_data = new stdClass;
	$payment_data->txn_type = 'Paypal';
	$payment_data->txn_id = 0;
	$payment_data->payment_status = 'Incomplete';
	$payment_data->txn_details = serialize($_REQUEST);
	include_once ('lib/Paypal.php');
	$myPaypal = new EE_Paypal();
	echo '<!--Event Espresso PayPal Gateway Version ' . $myPaypal->gateway_version . '-->';
	$myPaypal->ipnLog = TRUE;
	$paypal_settings = get_option('event_espresso_paypal_settings');
	if ($paypal_settings['use_sandbox']) {
		$myPaypal->enableTestMode();
	}
	if ($myPaypal->validateIpn()) {
		$payment_data->txn_details = serialize($myPaypal->ipnData);
		$payment_data->txn_id = $myPaypal->ipnData['txn_id'];
		if ($myPaypal->ipnData['payment_status'] == 'Completed' || $myPaypal->ipnData['payment_status'] == 'Pending') {
			$payment_data->payment_status = 'Completed';
		}
	}
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $payment_data->payment_status);
	$EE_Session->set_session_data(array('payment_data' => $payment_data), $section = 'session_data');
	// Since this line is in all the gateway processing functions, should probably get moved out to calling functions
	add_action('action_hook_espresso_email_after_payment', 'espresso_email_after_payment');
}
