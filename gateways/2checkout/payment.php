<?php

/**
 * Gets included in /gateways/gateway_display.php
 */
function espresso_display_2checkout($payment_data) {
	global $org_options, $payment_settings;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	include_once ('lib/2checkout.php');
	$my2checkout = new TwoCo();
	echo '<!-- Event Espresso 2checkout Gateway Version ' . $my2checkout->twocheckout_gateway_version . '-->';
	if ($payment_settings['2checkout']['use_sandbox']) {
		// Enable test mode if needed
		$my2checkout->enableTestMode();
	}
	$item_num = 1;
	foreach($payment_data['registrations'] as $ticket) {
		$my2checkout->addField('c_prod_' . $item_num, $ticket['id'] . ',' . $ticket['quantity']);
		$my2checkout->addField('c_name_' . $item_num, $ticket['event_name']);
		$my2checkout->addField('c_description_' . $item_num, $ticket['event_desc']);
		$my2checkout->addField('c_price_' . $item_num, $ticket['cost']);
		$item_num++;
	}

	$my2checkout->addField('sid', $payment_settings['2checkout']['2checkout_id']);
	$my2checkout->addField('cart_order_id', rand(1, 100));
	$my2checkout->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $payment_data['attendee_id'] . '&event_id=' . $payment_data['event_id'] . '&attendee_action=post_payment&form_action=payment');
	$my2checkout->addField('total', number_format($payment_data['total_cost'], 2, '.', ''));
	$my2checkout->addField('tco_currency', $payment_settings['2checkout']['currency_format']);

	if ($payment_settings['2checkout']['bypass_payment_page']) {
		$my2checkout->submitPayment();
	} else {
		$my2checkout->submitButton($payment_settings['2checkout']['button_url'], '2checkout');
		wp_deregister_script('jquery.validate.pack');
	}

	if ($payment_settings['2checkout']['use_sandbox']) {
		echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __(' 2checkout.com Debug Mode Is Turned On', 'event_espresso') . '</h3>';
		$my2checkout->dump_fields();
	}
}

add_action('action_hook_espresso_display_offsite_payment_gateway', 'espresso_display_2checkout');

function espresso_choose_2checkout() {
	global $payment_settings;
	echo '<style> .espresso_payment_button_2checkout {background: url("' . $payment_settings['2checkout']['button_url'] . '") no-repeat center center; width: 200px; height: 67px; border: none; color:transparent;</style>';
	// www.suburban-glory.com/blog?page=140
	// need to put in another line for legacy browsers
	echo '<input class="espresso_payment_button_2checkout" type="submit" name="off_site_gateway_selection" value="2checkout" alt="Pay using 2checkout" src="' . $payment_settings['2checkout']['button_url'] . '" />';
}

add_action('action_hook_espresso_display_offsite_payment_gateway_selection', 'espresso_choose_2checkout');