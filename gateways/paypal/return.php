<?php

function espresso_send_to_paypal($EE_Session) {
	global $wpdb, $org_options;
	include_once ('lib/Paypal.php');
	$myPaypal = new EE_Paypal();
	$session_data = $EE_Session->get_session_data();
	$paypal_settings = $session_data['gateway_data']['payment_settings']['paypal'];
	$paypal_id = $paypal_settings['paypal_id'];
	$paypal_cur = $paypal_settings['currency_format'];
	$no_shipping = $paypal_settings['no_shipping'];
	$use_sandbox = $paypal_settings['use_sandbox'];
	if ($use_sandbox) {
		$myPaypal->enableTestMode();
	}

	$item_num = 1;
	$registrations = $session_data['cart']['REG']['items'];
	foreach ($registrations as $registration) {
		foreach ($registration['attendees'] as $attendee) {
			$myPaypal->addField('item_name_' . $item_num, $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc']);
			$myPaypal->addField('amount_' . $item_num, $attendee['price_paid']);
			$myPaypal->addField('quantity_' . $item_num, '1');
			$item_num++;
		}
	}

	$total = $session_data['_cart_grand_total_amount'];
	if (isset($session_data['tax_totals'])) {
		foreach ($session_data['tax_totals'] as $key => $taxes) {
			$total = $total + $taxes;
			$myPaypal->addField('item_name_' . $item_num, $session_data['taxes'][$key]['name']);
			$myPaypal->addField('amount_' . $item_num, $taxes);
			$myPaypal->addField('quantity_' . $item_num, '1');
			$item_num++;
		}
	}
	$myPaypal->addField('business', $paypal_id);
	$myPaypal->addField('return', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
	$myPaypal->addField('cancel_return', home_url() . '/?page_id=' . $org_options['cancel_return']);
	$myPaypal->addField('notify_url', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
	$myPaypal->addField('cmd', '_cart');
	$myPaypal->addField('upload', '1');
	$myPaypal->addField('currency_code', $paypal_cur);
	$myPaypal->addField('image_url', empty($paypal_settings['image_url']) ? '' : $paypal_settings['image_url']);
	$myPaypal->addField('no_shipping ', $no_shipping);
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($myPaypal)));
	$session_data['gateway_data']['off-site-form'] = $myPaypal->submitPayment();
	$EE_Session->set_session_data($session_data['gateway_data'], 'gateway_data');
}

add_action('action_hook_espresso_gateway_process_step_3', 'espresso_send_to_paypal');

function espresso_process_paypal($EE_Session) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$session_data = $EE_Session->get_session_data();
	$gateway_settings = $session_data['gateway_data']['payment_settings']['paypal'];
	if (empty($session_data['session_data']['txn_results']['approved'])) {
		$txn_details = array(
				'gateway' => $gateway_settings['display_name'],
				'approved' => FALSE,
				'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
				'status' => 'Incomplete',
				'raw_response' => serialize($_POST),
				'amount' => 0.00,
				'method' => sanitize_text_field($_POST['txn_type']),
				'auth_code' => sanitize_text_field($_POST['payer_id']),
				'md5_hash' => sanitize_text_field($_POST['verify_sign']),
				'invoice_number' => sanitize_text_field($_POST['invoice_id']),
				'transaction_id' => sanitize_text_field($_POST['ipn_track_id'])
		);
		include_once ('lib/Paypal.php');
		$myPaypal = new EE_Paypal();
		$myPaypal->ipnLog = TRUE;
		if ($gateway_settings['use_sandbox']) {
			$myPaypal->enableTestMode();
		}
		if ($myPaypal->validateIpn()) {
			$txn_details['raw_response'] = serialize($myPaypal->ipnData);
			$txn_details['transaction_id'] = $myPaypal->ipnData['txn_id'];
			if ($myPaypal->ipnData['payment_status'] == 'Completed' || $myPaypal->ipnData['payment_status'] == 'Pending') {
				$txn_details['approved'] = TRUE;
				$txn_details['amount']			= floatval($_REQUEST['mc_gross']);
				$txn_details['response_msg']	= __('You\'re registration has been completed successfully.', 'event_espresso');
				$txn_details['status']				= 'Approved';
			}
		}
		$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

		if ($txn_details['approved'] == TRUE && $gateway_settings['use_sandbox']) {
			do_action('action_hook_espresso_mail_successful_transaction_debugging_output');
		} else {
			do_action('action_hook_espresso_mail_failed_transaction_debugging_output');
		}
	}
}

add_action('action_hook_espresso_process_off_site_payment', 'espresso_process_paypal');
