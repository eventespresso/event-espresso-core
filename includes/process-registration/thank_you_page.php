<?php

function espresso_thank_you_page() {
	global $espresso_wp_user, $EE_Session;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$EE_Session = EE_Session::instance();
	$session_data = $EE_Session->get_session_data();
	if ($session_data['billing_info']['type'] == 'offsite') {
		$selected_gateway = $session_data['billing_info']['gateway'];
		$gateway_path = $session_data['active_gateways'][$selected_gateway];
		require_once($gateway_path . "/return.php");
		do_action('action_hook_espresso_process_off_site_payment', $EE_Session);
		$SPCO = EE_Single_Page_Checkout::instance();
		$SPCO->process_registration_payment(FALSE);
	}
	if (!empty($session_data['txn_results'])) {
		$data = array(
			'event_links' => array(),
			'fname' => $session_data['primary_attendee']['fname'],
			'lname' => $session_data['primary_attendee']['lname'],
			'txn_type' => $session_data['txn_results']['method'],
			'payment_date' => '',
			'payment_status' => $session_data['txn_results']['status'],
			'total_cost' => $session_data['_cart_grand_total_amount'],
			'registration_id' => '',
			'txn_id' => ''
		);
		espresso_require_template('payment_overview.php');
		do_action('action_hook_espresso_display_payment_overview_template', $data);
	}
}

add_shortcode('ESPRESSO_PAYMENTS', 'espresso_thank_you_page');
