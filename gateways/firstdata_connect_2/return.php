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
	$fdggutil = new Fdggutil($firstdata_connect_2_settings['storename'],
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
	if($_REQUEST['status']=='APPROVED') {
		$payment_status = 'Completed';
		$sql = "SELECT ea.event_id, ed.event_name, ea.fname, ea.lname, ";
		$sql .= "ea.payment_date, ea.amount_pd total_cost, ";
		$sql .= "ea.registration_id att_registration_id FROM " . EVENTS_ATTENDEE_TABLE . " ea ";
		$sql .= "JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=ea.event_id ";
		$sql .= "WHERE ea.id = '" . $attendee_id . "'";
		$result = $wpdb->get_row($sql, ARRAY_A);
		extract($result);
		$event_link = '<a href="' . home_url() . '/?page_id=';
		$event_link .= $org_options['event_page_id'] . '&ee=' . $event_id . '">';
		$event_link .= $event_name . '</a>';
		$txn_type = 'Firstdata Connect 2.0';
		$firstdata_connect_2_settings = get_option('event_espresso_firstdata_connect_2_settings');
		include("Fdggutil.php");
		$fdggutil = new Fdggutil($firstdata_connect_2_settings['storename'],
									$firstdata_connect_2_settings['sharedSecret']);
		$hash = $fdggutil->check_return_hash($payment_date);
		$txn_id = $_REQUEST['refnumber'];
	}
}

add_action('action_hook_espresso_process_off_site_payment', 'espresso_process_firstdata_connect_2');