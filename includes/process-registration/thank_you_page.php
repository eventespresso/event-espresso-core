<?php

function espresso_thank_you_page() {
	global $EE_Session, $EEM_Gateways;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (!defined('ESPRESSO_GATEWAYS')) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
		$EEM_Gateways = EEM_Gateways::instance();
	}
	$type = $EEM_Gateways->type();
	if ($type == 'off-site' || $type == 'off-line') {
		do_action('action_hook_espresso_process_off_site_payment');
	}
	if ($type == 'off-site' || ($type == 'onsite' && !$EEM_Gateways->ajax())) {
		$SPCO = EE_Single_Page_Checkout::instance();
		$SPCO->process_registration_payment(FALSE);
	} elseif ($type == 'off-line') {
		$SPCO = EE_Single_Page_Checkout::instance();
		$SPCO->process_off_line_gateway();
	}
	$session_data = $EE_Session->get_session_data();
	if (!empty($session_data['txn_results'])) {
		//printr( $session_data);
		$grand_total = $session_data['_cart_grand_total_amount'];

		$taxes = $session_data['tax_totals'];
		foreach ( $taxes as $tax ) {
			$grand_total += $tax;
		}
		$data = array(
			'event_links' => array(),
			'fname' => $session_data['primary_attendee']['fname'],
			'lname' => $session_data['primary_attendee']['lname'],
			'txn_type' => $session_data['txn_results']['method'],
			'payment_date' => date( 'D M j, Y g:i a' ),
			'payment_status' => $session_data['txn_results']['status'],
			'amount_paid' => $session_data['txn_results']['amount'],
			'total_cost' => $grand_total,
			'registration_id' => $session_data['primary_attendee']['registration_id'],
			'txn_id' => ''//$session_data['txn_results']['transaction_id']
		);
		espresso_require_template('payment_overview.php');
		do_action('action_hook_espresso_display_payment_overview_template', $data);
		$EEM_Gateways->reset_session_data();

	} else {

		echo '
		<h2>' . __( "Oops! Don't quite know how you ended up here, but it doesn't appear that you have registered for anything. Thanks for visiting the site anyways. ", 'event_espresso' ) . '</h2>
		<p>
			' . __( "If you were looking to register, you might want to have a look here:  ", 'event_espresso' ) . '<a href="'.espresso_get_reg_page_full_url().'">' . __( "Events", 'event_espresso' ) . '</a><br /><br /><br />
		</p>';

	}
}

add_shortcode('ESPRESSO_PAYMENTS', 'espresso_thank_you_page');


