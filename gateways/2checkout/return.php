<?php

/**
 * Gets included in /gateways/gateway_display.php
 */
function espresso_send_to_2checkout( $EE_Session ) {

	global $org_options;
	
	include_once ('lib/2checkout.php');	
	$my2checkout = new TwoCo();
	$session_data = $EE_Session->get_session_data();
	$two_checkout_settings = $session_data['gateway_data']['payment_settings']['2checkout'];
	
	echo '<!-- Event Espresso 2checkout Gateway Version ' . $my2checkout->twocheckout_gateway_version . '-->';
	
	// Enable test mode if needed
	if ($two_checkout_settings['use_sandbox']) {
		$my2checkout->enableTestMode();
	}
		
	$item_num = 1;
	$registrations = $session_data['cart']['REG']['items'];
	$my2checkout->addField('id_type', 1);
	foreach($registrations as $registration) {
		foreach($registration['attendees'] as $attendee) {
			$my2checkout->addField('c_prod_' . $item_num, rand(1, 100));
			$my2checkout->addField('c_name_' . $item_num, $registration['name']);
			$my2checkout->addField('c_description_' . $item_num, $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc']);
			$my2checkout->addField('c_price_' . $item_num, $attendee['price_paid']);
			$item_num++;
		}
	}

	$total = $session_data['_cart_grand_total_amount'];
	if (isset($session_data['tax_totals'])) {
		foreach ($session_data['tax_totals'] as $key => $taxes) {
			$total = $total + $taxes;
			$my2checkout->addField('c_prod_' . $item_num, rand(1, 100));
			$my2checkout->addField('c_name_' . $item_num, $session_data['taxes'][$key]['name']);
			$my2checkout->addField('c_description_' . $item_num, 'Tax');
			$my2checkout->addField('c_price_' . $item_num, $taxes);
			$item_num++;
		}
	}
	$my2checkout->addField('sid', $two_checkout_settings['2checkout_id']);
	$my2checkout->addField('cart_order_id', $session_data['transaction']->ID() );
	$my2checkout->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
	$my2checkout->addField('total', number_format($total, 2, '.', ''));
	$my2checkout->addField('tco_currency', $two_checkout_settings['currency_format']);
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize($my2checkout));
	$my2checkout->submitPayment();
}

add_action('action_hook_espresso_gateway_process_step_3', 'espresso_send_to_2checkout');

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
function espresso_process_2checkout($EE_Session) {
	$session_data = $EE_Session->get_session_data();
	$twoco_settings = $session_data['gateway_data']['payment_settings']['2checkout'];
	$txn_details = array(
						'approved' => FALSE,
						'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
						'status' => 'Incomplete',
						'details' => serialize($_POST),
						'amount' => 0.00,
						'method' => '2checkout'
				);
	if ($_REQUEST['credit_card_processed'] == 'Y') {
		$txn_details['approved'] = TRUE;
		$txn_details['amount'] = floatval($_REQUEST['total']);
		$txn_details['response_msg'] = __('You\'re registration has been completed successfully.', 'event_espresso');
		$txn_details['status'] = 'Approved';
	}
	$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');
	
	if ($txn_details['approved'] == TRUE && $twoco_settings['use_sandbox']) {
		do_action('action_hook_espresso_mail_successful_transaction_debugging_output');
	} else {
		do_action('action_hook_espresso_mail_failed_transaction_debugging_output');
	}
	
}

add_action('action_hook_espresso_process_off_site_payment', 'espresso_process_2checkout');