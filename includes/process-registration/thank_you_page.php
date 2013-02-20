<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );

function espresso_thank_you_page() {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	ob_start();
	global $EE_Session, $EEM_Gateways, $espresso_content;
	
	if (!defined('ESPRESSO_GATEWAYS')) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
		$EEM_Gateways = EEM_Gateways::instance();
	}
	//only use session data to process final payment etc. After thank_you_page()
	//though, the session gets wiped out.
	$EEM_Gateways->thank_you_page();
	
	
	//$transaction=$registration->transaction();
	//var_dump($transaction);
	//$session_data = $EE_Session->get_session_data();
	$session_data = $EE_Session->get_session_from_reg_url_link();
	if (!empty($session_data['txn_results'])) {
		//printr( $session_data);
		$grand_total = $session_data['_cart_grand_total_amount'];

		// add taxes
		if (isset($session_data['tax_totals'])) {
			foreach ($session_data['tax_totals'] as $taxes) {
				$grand_total += $taxes;
			}
		}

		$data = array(
			'events' => array(),
			'fname' => isset( $session_data['primary_attendee']['fname'] ) ? $session_data['primary_attendee']['fname'] : '',
			'lname' => isset( $session_data['primary_attendee']['lname'] ) ? $session_data['primary_attendee']['lname'] : '',
			'txn_type' => isset( $session_data['txn_results']['gateway'] ) ? $session_data['txn_results']['gateway'] : '',
			'payment_date' => date( 'D M j, Y g:i a' ),
			'payment_status' => isset( $session_data['txn_results']['status'] ) ? $session_data['txn_results']['status'] : '',
			'amount_paid' => isset( $session_data['txn_results']['amount'] ) ? $session_data['txn_results']['amount'] : '',
			'total_cost' => $grand_total,
			'registration_id' => isset( $session_data['primary_attendee']['registration_id'] ) ? $session_data['primary_attendee']['registration_id'] : '',
			'txn_id' => isset( $session_data['txn_results']['transaction_id'] ) ? $session_data['txn_results']['transaction_id'] : ''
		);

		foreach ( $session_data['cart']['REG']['items'] as $item ) {
			$data['events'][] = $item['name'] . ' :<br/>&nbsp;&nbsp;&nbsp;&nbsp;' . $item['options']['date'] . ' @ ' . $item['options']['time'] . ', ' . $item['options']['price_desc'];
		}
		
		espresso_require_template('payment_overview.php');
		do_action('action_hook_espresso_display_payment_overview_template', $data);
		//$EEM_Gateways->reset_session_data();
		do_action( 'action_hook_espresso_reg_completed' );

	} else {

		echo '
		<h2>' . __( "Oops! Don't quite know how you ended up here, but it doesn't appear that you have registered for anything. Thanks for visiting the site anyways. ", 'event_espresso' ) . '</h2>
		<p>
			' . __( "If you were looking to register, you might want to have a look here:  ", 'event_espresso' ) . '<a href="'.espresso_get_reg_page_full_url().'">' . __( "Events", 'event_espresso' ) . '</a><br /><br /><br />
		</p>';

	}
	
	$espresso_content = ob_get_clean();
	add_shortcode('ESPRESSO_PAYMENTS', 'return_espresso_content');
//	return $espresso_content;
		
}



