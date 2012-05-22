<?php

/**
 * Gets included in /gateways/gateway_display.php
 */
function espresso_send_to_2checkout( $EE_Session, $payment_settings ) {
	global $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	include_once ('lib/2checkout.php');
	$my2checkout = new TwoCo();
	$two_checkout_settings = $payment_settings['2checkout'];
	echo '<!-- Event Espresso 2checkout Gateway Version ' . $my2checkout->twocheckout_gateway_version . '-->';
	if ($two_checkout_settings['use_sandbox']) {
		// Enable test mode if needed
		$my2checkout->enableTestMode();
	}
	$session_data = $EE_Session->get_session_data();
	
	$item_num = 1;
	$registrations = $session_data['cart']['REG']['items'];
	foreach($registrations as $registration) {
		foreach($registration['attendees'] as $attendee) {
			$my2checkout->addField('c_prod_' . $item_num, $registration['line_item'] . ',', $attendee['email']);
			$my2checkout->addField('c_name_' . $item_num, $registration['name']);
			$my2checkout->addField('c_description_' . $item_num, $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc']);
			$my2checkout->addField('c_price_' . $item_num, $attendee['price_paid']);
			$item_num++;
		}
	}

	$my2checkout->addField('sid', $two_checkout_settings['2checkout_id']);
	$my2checkout->addField('cart_order_id', rand(1, 100));
	$my2checkout->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
	$my2checkout->addField('total', number_format($session_data['_cart_grand_total_amount'], 2, '.', ''));
	$my2checkout->addField('tco_currency', $two_checkout_settings['currency_format']);
	$my2checkout->addField('type', '2checkout');
	
	$my2checkout->submitPayment();
}

function espresso_choose_2checkout() {
	global $payment_settings;
	//echo '<style> #payment-gateway-button-2checkout {background: url("' . $payment_settings['2checkout']['button_url'] . '") no-repeat center center; width: 200px; height: 67px; }</style>';
	// www.suburban-glory.com/blog?page=140
	// need to put in another line for legacy browsers
	//echo '<input id="payment-gateway-button-2checkout" class="reg-page-payment-option" type="submit" name="off_site_gateway_selection" value="2checkout" alt="Pay using 2checkout" src="' . $payment_settings['2checkout']['button_url'] . '" />';
	
	echo '
			<a id="payment-gateway-button-2checkout" class="reg-page-payment-option" >
				<img src="'. $payment_settings['2checkout']['button_url'] .'" alt="Pay using 2Checkout.com" />
			</a>
';
	
}

add_action('action_hook_espresso_display_offsite_payment_gateway_selection', 'espresso_choose_2checkout');