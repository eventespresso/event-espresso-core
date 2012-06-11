<?php

function espresso_send_to_authnet_sim($EE_Session) {
	// Setup class
	include_once ('lib/Authorize.php');
	global $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$myAuthorize = new EE_Authorize(); // initiate an instance of the class

	$session_data = $EE_Session->get_session_data();
	$payment_settings = $session_data['gateway_data']['payment_settings']['authnet_sim'];
	$authnet_login_id = $payment_settings['authnet_login_id'];
	$authnet_transaction_key = $payment_settings['authnet_transaction_key'];
	$image_url = $payment_settings['image_url'];
	$use_sandbox = $payment_settings['use_sandbox'];
	$use_testmode = $payment_settings['test_transactions'];
	if ($use_testmode == true) {
		// Enable test mode if needed
		$myAuthorize->enableTestMode();
	}
	if ($use_sandbox == true) {
		// Enable test mode if needed
		$myAuthorize->useTestServer();
	}

	$myAuthorize->setUserInfo($authnet_login_id, $authnet_transaction_key);
	$x_line_item = array();
	$item_num = 1;
	$registrations = $session_data['cart']['REG']['items'];
	foreach ($registrations as $registration) {
		foreach ($registration['attendees'] as $attendee) {
			$x_line_item[] = 'item' . $item_num . '<|>' . $registration['name'] . '<|>' . $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc'] . '<|>1<|>' . $attendee['price_paid'] . '<|>N&';
			$item_num++;
		}
	}

	$total = $session_data['_cart_grand_total_amount'];
	if (isset($session_data['tax_totals'])) {
		foreach ($session_data['tax_totals'] as $key => $taxes) {
			$total = $total + $taxes;
			$x_line_item[] = 'item' . $item_num . '<|>' . $session_data['taxes'][$key]['name'] . '<|>' . 'Tax' . '<|>1<|>' . $taxes . '<|>N&';
			$item_num++;
		}
	}

	$myAuthorize->addField('x_line_item', $x_line_item);
	$myAuthorize->addField('x_Relay_URL', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
	$myAuthorize->addField('x_Amount', number_format($total, 2));
	$myAuthorize->addField('x_Logo_URL', $image_url);
	$myAuthorize->addField('x_Invoice_num', 'au-' . $session_data['id']);
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($myAuthorize)));
	$session_data['gateway_data']['off-site-form'] = $myAuthorize->submitPayment();
	$EE_Session->set_session_data($session_data['gateway_data'], 'gateway_data');
}

add_action('action_hook_espresso_gateway_process_step_3', 'espresso_send_to_authnet_sim');

function espresso_process_authnet_sim($EE_Session) {

// Include the authorize.net library
	include_once ('lib/Authorize.php');
// Create an instance of the authorize.net library
	$myAuthorize = new EE_Authorize();

// Log the IPN results
	$myAuthorize->ipnLog = TRUE;
	$session_data = $EE_Session->get_session_data();
	$payment_settings = $session_data['gateway_data']['payment_settings']['authnet_sim'];

	$txn_details = array(
			'gateway' => $payment_settings['display_name'],
			'approved' => FALSE,
			'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
			'status' => 'Incomplete',
			'raw_response' => serialize($_POST),
			'amount' => 0.00,
			'method' => sanitize_text_field($_POST['x_method']),
			'auth_code' => sanitize_text_field($_POST['x_auth_code']),
			'md5_hash' => sanitize_text_field($_POST['x_MD5_Hash']),
			'invoice_number' => sanitize_text_field($_POST['x_invoice_num']),
			'transaction_id' => sanitize_text_field($_POST['x_invoice_num'])
	);
	$authnet_login_id = $payment_settings['authnet_login_id'];
	$authnet_transaction_key = $payment_settings['authnet_transaction_key'];

// Enable test mode if needed
//4007000000027  <-- test successful visa
//4222222222222  <-- test failure card number
	if ($payment_settings['use_sandbox']) {
		$myAuthorize->enableTestMode();
		$email_transaction_dump = true;
	}

// Specify your authorize login and secret
	$myAuthorize->setUserInfo($authnet_login_id, $authnet_transaction_key);

// Check validity and write down it
	if ($myAuthorize->validateIpn()) {

		if ($myAuthorize->ipnData['x_response_code'] == 1) {
		$txn_details['approved']			= TRUE;
		$txn_details['amount']			= floatval($_REQUEST['x_amount']);
		$txn_details['response_msg']	= __('You\'re registration has been completed successfully.', 'event_espresso');
		$txn_details['status']				= 'Approved';
		}
		$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

		if ($txn_details['approved'] == TRUE && $payment_settings['use_sandbox']) {
			do_action('action_hook_espresso_mail_successful_transaction_debugging_output');
		} else {
			do_action('action_hook_espresso_mail_failed_transaction_debugging_output');
		}
	}
}

add_action('action_hook_espresso_process_off_site_payment', 'espresso_process_authnet_sim');