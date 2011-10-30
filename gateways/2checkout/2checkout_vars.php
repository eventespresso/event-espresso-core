<?php

/**
 * Gets included in /gateways/gateway_display.php
 */
function espresso_display_2checkout($attendee_id, $event_id, $event_cost) {
	global $org_options;
	include_once ('2checkout.php');
	$my2checkout = new TwoCo();
	echo '<!-- Event Espresso 2checkout Gateway Version ' . $my2checkout->twocheckout_gateway_version . '-->';
	$twocheckout_settings = get_option('event_espresso_2checkout_settings');
	$twocheckout_id = empty($twocheckout_settings['2checkout_id']) ? 0 : $twocheckout_settings['2checkout_id'];
	$twocheckout_cur = empty($twocheckout_settings['currency_format']) ? 'USD' : $twocheckout_settings['currency_format'];
	$use_sandbox = empty($twocheckout_settings['use_sandbox']) ? false : true;
	$bypass_payment_page = ($twocheckout_settings['bypass_payment_page'] == 'N') ? false : true;

	if ($use_sandbox) {
		// Enable test mode if needed
		$my2checkout->enableTestMode();
	}

	$my2checkout->addField('sid', $twocheckout_id);
	$my2checkout->addField('cart_order_id', rand(1, 100));
	$my2checkout->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&event_id=' . $event_id . '&attendee_action=post_payment&form_action=payment');
	$my2checkout->addField('total', number_format($event_cost, 2, '.', ''));
	$my2checkout->addField('tco_currency', $twocheckout_cur);

	if ($bypass_payment_page) {
		$my2checkout->submitPayment();
	} else {
		if (empty($twocheckout_settings['button_url'])) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "2checkout/logo.png")) {
				$button_url = EVENT_ESPRESSO_GATEWAY_URL . "2checkout/logo.png";
			} else {
				$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/2checkout/logo.png";
			}
		} elseif (file_exists($twocheckout_settings['button_url'])) {
			$button_url = $twocheckout_settings['button_url'];
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/2checkout/logo.png";
		}
		$my2checkout->submitButton($button_url, '2checkout');
		wp_deregister_script('jquery.validate.pack');
	}

	if ($use_sandbox) {
		echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __(' 2checkout.com Debug Mode Is Turned On', 'event_espresso') . '</h3>';
		$my2checkout->dump_fields();
	}
}