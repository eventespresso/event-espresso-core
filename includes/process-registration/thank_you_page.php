<?php

function espresso_thank_you_page() {
	global $espresso_wp_user, $EE_Session;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$EE_Session = EE_Session::instance();
	$session_data = $EE_Session->get_session_data();
	switch ($session_data['gateway_data']['type']) {
		case 'off-site':
			$selected_gateway = $session_data['gateway_data']['selected_gateway'];
			$gateway_path = $session_data['gateway_data']['active_gateways'][$selected_gateway];
			require_once($gateway_path . "/return.php");
			do_action('action_hook_espresso_process_off_site_payment', $EE_Session);
		case 'onsite_noajax':
			$SPCO = EE_Single_Page_Checkout::instance();
			$SPCO->process_registration_payment(FALSE);
	}
	if (!empty($session_data['txn_results'])) {
		//printr( $session_data);
		$data = array(
			'event_links' => array(),
			'fname' => $session_data['primary_attendee']['fname'],
			'lname' => $session_data['primary_attendee']['lname'],
			'txn_type' => $session_data['txn_results']['method'],
			'payment_date' => date( 'D M j, Y g:i a' ),
			'payment_status' => $session_data['txn_results']['status'],
			'total_cost' => $session_data['_cart_grand_total_amount'],
			'registration_id' => $session_data['primary_attendee']['registration_id'],
			'txn_id' => ''//$session_data['txn_results']['transaction_id']
		);
		espresso_require_template('payment_overview.php');
		do_action('action_hook_espresso_display_payment_overview_template', $data);
		$gateway_data['selected_gateway'] = null;
		$gateway_data['type'] = null;
		$EE_Session->set_session_data($gateway_data, 'gateway_data');
	}
}

add_shortcode('ESPRESSO_PAYMENTS', 'espresso_thank_you_page');


