<?php

/**
 * Gets included in /gateways/gateway_display.php
 */
function espresso_send_to_2checkout( $EE_Session, $payment_settings ) {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	global $org_options, $session_data;
	
	include_once ('lib/2checkout.php');	
	$my2checkout = new TwoCo();
	$two_checkout_settings = $payment_settings['2checkout'];
	
	echo '<!-- Event Espresso 2checkout Gateway Version ' . $my2checkout->twocheckout_gateway_version . '-->';
	
	// Enable test mode if needed
	if ($two_checkout_settings['use_sandbox']) {
		$my2checkout->enableTestMode();
	}
		
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
	//$my2checkout->addField('cart_order_id', rand(1, 100));
	$my2checkout->addField('cart_order_id', $session_data['transaction']->ID() );
	$my2checkout->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
	$my2checkout->addField('total', number_format($session_data['_cart_grand_total_amount'], 2, '.', ''));
	$my2checkout->addField('tco_currency', $two_checkout_settings['currency_format']);
	$my2checkout->addField('type', '2checkout');

//echo printr( $my2checkout, '$my2checkout' );
//die();	
	$my2checkout->submitPayment();
}

function espresso_choose_2checkout() {
	global $payment_settings, $gateways;
	$gateway = '2checkout';

	//echo '<style> #payment-gateway-button-2checkout {background: url("' . $payment_settings['2checkout']['button_url'] . '") no-repeat center center; width: 200px; height: 67px; }</style>';
	// www.suburban-glory.com/blog?page=140
	// need to put in another line for legacy browsers
	//echo '<input id="payment-gateway-button-2checkout" class="reg-page-payment-option" type="submit" name="off_site_gateway_selection" value="2checkout" alt="Pay using 2checkout" src="' . $payment_settings['2checkout']['button_url'] . '" />';
	
?>
			<a id="payment-gateway-button-<?php echo $gateway;?>" class="reg-page-payment-option-lnk" rel="<?php echo $gateway;?>" href="<?php echo $gateways[ $gateway ]['form_url'];?>" >
				<img src="<?php echo $payment_settings['2checkout']['button_url'];?>" alt="Pay using 2CheckOut.com" />
			</a>

			<div id="reg-page-billing-info-<?php echo $gateway;?>-dv" class="reg-page-billing-info-dv <?php echo $gateways[ $gateway ]['css_class'];?>">
				<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the 2CheckOut.com website where your payment will be securely processed.', 'event_espresso'); ?>
				<input id="reg-page-gateway-off-site-<?php echo $gateway;?>" type="hidden" value="1" name="reg_page_gateway_off_site[<?php echo $gateway;?>]">
				<input id="reg-page-selected-gateway-name-<?php echo $gateway;?>" type="hidden" value="2CheckOut.com" name="selected_gateway_name[<?php echo $gateway;?>]">
			</div>

<?php	
}

add_action('action_hook_espresso_display_offsite_payment_gateway_selection', 'espresso_choose_2checkout');