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
//	if (isset($_REQUEST['id']))
//		$attendee_id = $_REQUEST['id'];
//	return $attendee_id;

	global $EE_Session;
	return $EE_Session->id();

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
	global $wpdb, $payment_settings;
	$payment_data['payment_status'] = 'Incomplete';
	$payment_data['txn_type'] = '2CO';
	$payment_data['txn_id'] = $_REQUEST['invoice_id'];
	$payment_data['txn_details'] = serialize($_REQUEST);
	if ($_REQUEST['credit_card_processed'] == 'Y') {
		$payment_data['payment_status'] = 'Completed';
		$payment_data['total_cost'] = $_REQUEST['total'];
		if ($payment_settings['2checkout']['use_sandbox']) {
			do_action('action_hook_espresso_mail_successful_transaction_debugging_output', $payment_data);
		}
	} else {
		do_action('action_hook_espresso_mail_failed_transaction_debugging_output', $payment_data);
	}
	return $payment_data;
}

add_filter('filter_hook_espresso_process_transaction', 'espresso_process_2checkout');