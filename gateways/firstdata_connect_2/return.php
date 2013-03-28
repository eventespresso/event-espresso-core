<?php

function espresso_send_to_firstdata_connect_2($EE_Session) {
	global $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$session_data = $EE_Session->get_session_data();
	$firstdata_connect_2_settings = $session_data['gateway_data']['payment_settings']['firstdata_connect_2'];
	include("lib/Fdggutil.php");
	$total = $session_data['_cart_grand_total_amount'];
	if (isset($session_data['tax_totals'])) {
		foreach ($session_data['tax_totals'] as $taxes) {
			$total = $total + $taxes;
		}
	}
	$fdggutil = new espresso_Fdggutil($firstdata_connect_2_settings['storename'],
									$firstdata_connect_2_settings['sharedSecret']);
	$fdggutil->set_timezone($firstdata_connect_2_settings['timezone']);
	$fdggutil->set_chargetotal($total);
	$fdggutil->set_sandbox($firstdata_connect_2_settings['sandbox']);
	$fdggutil->set_returnUrl($org_options['notify_url']);
	$fdggutil->set_cancelUrl($org_options['cancel_return']);
	$fdggutil->set_dateTime($EE_Session);
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($fdggutil)));
	$session_data['gateway_data']['off-site-form'] = $fdggutil->submitPayment($EE_Session);
	$EE_Session->set_session_data($session_data['gateway_data'], 'gateway_data');
}

add_action('action_hook_espresso_gateway_process_step_3', 'espresso_send_to_firstdata_connect_2');

function espresso_process_firstdata_connect_2($EE_Session) {
	$session_data = $EE_Session->get_session_data();
	$firstdata_connect_2_settings = $session_data['gateway_data']['payment_settings']['firstdata_connect_2'];
	$txn_details = array(
						'gateway'					=> $firstdata_connect_2_settings['display_name'],
						'approved'				=> FALSE,
						'response_msg'		=> __('You\'re registration has not been completed successfully.', 'event_espresso'),
						'status'					=> 'Incomplete',
						'raw_response'		=> serialize($_REQUEST),
						'amount'					=> 0.00,
						'method'					=> sanitize_text_field($_POST['pay_method']),
						'auth_code'				=> sanitize_text_field($_POST['order_number']),
						'md5_hash'				=> sanitize_text_field($_POST['key']),
						'invoice_number'	=> sanitize_text_field($_POST['invoice_id']),
						'transaction_id'	=> sanitize_text_field($_POST['invoice_id'])
				);
	if($_REQUEST['status']=='APPROVED') {
		$txn_details['status'] = 'Completed';
		$txn_type = 'Firstdata Connect 2.0';
		include("lib/Fdggutil.php");
		$fdggutil = new espresso_Fdggutil($firstdata_connect_2_settings['storename'],
									$firstdata_connect_2_settings['sharedSecret']);
		$hash = $fdggutil->check_return_hash($payment_date);
		$txn_id = $_REQUEST['refnumber'];
	}
}
