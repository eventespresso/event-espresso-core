<?php

function espresso_send_to_eway($EE_Session) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$session_data = $EE_Session->get_session_data();
	$eway_settings = $session_data['gateway_data']['payment_settings']['eway'];
	// Setup class
	include_once ('lib/Eway.php');
	$myeway = new eway($eway_settings); // initiate an instance of the class
	global $org_options;

	$eway_id = $eway_settings['eway_id'];
	$eway_username = $eway_settings['eway_username'];
	$eway_cur = $eway_settings['currency_format'];
	$use_sandbox = $eway_settings['use_sandbox'];
	$total = $session_data['_cart_grand_total_amount'];
	if (isset($session_data['tax_totals'])) {
		foreach ($session_data['tax_totals'] as $taxes) {
			$total = $total + $taxes;
		}
	}
	if ($use_sandbox) {
		// Enable test mode if needed
		$myeway->enableTestMode();
		$myeway->addField('CustomerID', '87654321');
		$myeway->addField('UserName', 'TestAccount');
		$total="10.00";
	} else {
		$myeway->addField('CustomerID', $eway_id);
		$myeway->addField('UserName', $eway_username);
	}
	
	$myeway->addField('Amount', number_format($total, 2, '.', ''));
	$myeway->addField('Currency', $eway_cur);
	$myeway->addField('PageTitle', '');
	$myeway->addField('PageDescription', '');
	$myeway->addField('PageFooter', '');
	$myeway->addField('Language', '');
	$myeway->addField('CompanyName', str_replace("&", "%26", $org_options['organization']));
	$registrations = $session_data['cart']['REG']['items'];
	$description = '';
	foreach ($registrations as $registration) {
		$description .= $registration['qty'] . ' ticket to ' . $registration['name'] . ', ';
	}
	$description = rtrim($description, ', ');
	$myeway->addField('InvoiceDescription', $description);
	$myeway->addField('CancelURL', str_replace("&", "%26", home_url() . '/?page_id=' . $org_options['cancel_return']));
	$myeway->addField('ReturnURL', str_replace("&", "%26", home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment'));
	$myeway->addField('CompanyLogo', $eway_settings['image_url']);
	$myeway->addField('PageBanner', '');
	$myeway->addField('MerchantReference', '');
	$myeway->addField('MerchantInvoice', '');
	$myeway->addField('MerchantOption1', '');
	$myeway->addField('MerchantOption2', '');
	$myeway->addField('MerchantOption3', '');
	$myeway->addField('ModifiableCustomerDetails', 'false');
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($myeway)));
	$session_data['gateway_data']['off-site-form'] = $myeway->submitPayment();
	$EE_Session->set_session_data($session_data['gateway_data'], 'gateway_data');
}

add_action('action_hook_espresso_gateway_process_step_3', 'espresso_send_to_eway');

function espresso_process_eway($EE_Session) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$session_data = $EE_Session->get_session_data();
	$eway_settings = $session_data['gateway_data']['payment_settings']['eway'];
	$txn_details = array(
			'gateway' => $eway_settings['display_name'],
			'approved' => FALSE,
			'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
			'status' => 'Incomplete',
			'raw_response' => serialize($_POST),
			'amount' => 0.00,
			'method' => 'CC',
			'auth_code' => '0',
			'md5_hash' => sanitize_text_field($_POST['AccessPaymentCode']),
			'invoice_number' => '0',
			'transaction_id' => '0'
	);
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
	if ($eway_settings['use_sandbox'] == 1) {
		$results_request .= "?CustomerID=" . '87654321';
		$results_request .= "&UserName=" . 'TestAccount';
	} else {
		$results_request .= "?CustomerID=" . $eway_settings['eway_id'];
		$results_request .= "&UserName=" . $eway_settings['eway_username'];
	}
	$results_request .= "&AccessPaymentCode=" . $_REQUEST['AccessPaymentCode'];
	$results_request = str_replace(" ", "%20", $results_request);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $results_request);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	if (defined('CURL_PROXY_REQUIRED') && CURL_PROXY_REQUIRED == 'True') {
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

	$response_array['authecode'] = fetch_data($response, '<authCode>', '</authCode>');
	$response_array['responsecode'] = fetch_data($response, '<responsecode>', '</responsecode>');
	$response_array['retrunamount'] = fetch_data($response, '<returnamount>', '</returnamount>');
	$response_array['txn_id'] = fetch_data($response, '<trxnnumber>', '</trxnnumber>');
	$response_array['trxnstatus'] = fetch_data($response, '<trxnstatus>', '</trxnstatus>');
	$response_array['trxnresponsemessage'] = fetch_data($response, '<trxnresponsemessage>', '</trxnresponsemessage>');

	$response_array['merchantoption1'] = fetch_data($response, '<merchantoption1>', '</merchantoption1>');
	$response_array['merchantoption2'] = fetch_data($response, '<merchantoption2>', '</merchantoption2>');
	$response_array['merchantoption3'] = fetch_data($response, '<merchantoption3>', '</merchantoption3>');
	$response_array['merchantreference'] = fetch_data($response, '<merchantreference>', '</merchantreference>');
	$response_array['merchantinvoice'] = fetch_data($response, '<merchantinvoice>', '</merchantinvoice>');
	if ($response_array['responsecode'] == '00' || $response_array['responsecode'] == '08') {
		$txn_details['approved'] = TRUE;
		$txn_details['response_msg'] = __('You\'re registration has been completed successfully.', 'event_espresso');
		$txn_details['status'] = 'Approved';
		$txn_details['raw_response'] = serialize($response_array);
		$txn_details['amount'] = $response_array['retrunamount'];
		$txn_details['auth_code'] = $response_array['authecode'];
		$txn_details['invoice_number'] = $response_array['txn_id'];
		$txn_details['transaction_id'] = $response_array['txn_id'];
	}
	$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

	if ($txn_details['approved'] && $eway_settings['use_sandbox']) {
		do_action('action_hook_espresso_mail_successful_transaction_debugging_output');
	} else {
		do_action('action_hook_espresso_mail_failed_transaction_debugging_output');
	}
}

add_action('action_hook_espresso_process_off_site_payment', 'espresso_process_eway');