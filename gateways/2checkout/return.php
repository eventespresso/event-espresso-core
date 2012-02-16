<?php

/**
 * function espresso_transactions_2checkout_get_attendee_id
 *
 * $_REQUEST from 2checkout needs:
 *    id
 * @param type int $attendee_id
 * @return type int $attendee_id
 */
function espresso_transactions_2checkout_get_attendee_id($attendee_id) {
	if (isset($_REQUEST['id']))
		$attendee_id = $_REQUEST['id'];
	return $attendee_id;
}

add_filter('filter_hook_espresso_transactions_get_attendee_id', 'espresso_transactions_2checkout_get_attendee_id');

/**
 * function espresso_process_2checkout
 * @global type $wpdb
 * @param type array $payment_data
 * $_REQUEST from 2checkout needs:
 * 		credit_card_processed
 * 		total
 * 		invoice_id
 *
 * @return type array $payment_data
 *    $payment_data returns
 * 				event_link
 * 				payment_status
 * 				txn_type
 * 				total_cost
 * 				txn_id
 */
function espresso_process_2checkout($payment_data) {
	global $wpdb;
	$email_transaction_dump = false;
	$payment_data['payment_status'] = 'Incomplete';
	$payment_data['txn_type'] = '2CO';
	$payment_data['txn_id'] = $_REQUEST['invoice_id'];
	$payment_data['txn_details'] = serialize($_REQUEST);
	if ($_REQUEST['credit_card_processed'] == 'Y') {

		$payment_data['payment_status'] = 'Completed';
		$payment_data['total_cost'] = $_REQUEST['total'];
		$payment_data = apply_filters('filter_hook_espresso_get_total_cost', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_prepare_event_link', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_update_attendee_payment_data_in_db', $payment_data);
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
			wp_mail($payment_data['contact'], $subject, $body);
		}
	} else {
		$subject = 'Instant Payment Notification - Gateway Variable Dump';
		$body = "An instant payment notification failed\n";
		$body .= "from " . " on " . date('m/d/Y');
		$body .= " at " . date('g:i A') . "\n\nDetails:\n";
		foreach ($xml as $key => $value) {
			$body .= "\n$key: $value\n";
		}
		//wp_mail($payment_data['contact'], $subject, $body);
	}
	do_action('action_hook_espresso_email_after_payment', $payment_data);
	return $payment_data;
}

add_filter('filter_hook_espresso_transactions_get_payment_data', 'espresso_process_2checkout');