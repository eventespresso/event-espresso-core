<?php

/**
 * Gets included in /gateways/gateway_display.php
 */
function espresso_display_2checkout($payment_data) {
	global $org_options, $payment_settings, $wpdb;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
				espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
	include_once ('lib/2checkout.php');
	$my2checkout = new TwoCo();
	echo '<!-- Event Espresso 2checkout Gateway Version ' . $my2checkout->twocheckout_gateway_version . '-->';
	$twocheckout_id = empty($payment_settings['2checkout']['2checkout_id']) ? 0 : $payment_settings['2checkout']['2checkout_id'];
	$twocheckout_cur = empty($payment_settings['2checkout']['currency_format']) ? 'USD' : $payment_settings['2checkout']['currency_format'];
	$bypass_payment_page = ($payment_settings['2checkout']['bypass_payment_page'] == 'N') ? false : true;
	$use_sandbox = $payment_settings['2checkout']['use_sandbox'] == 'Y' ? true : false;
	if ($use_sandbox) {
		// Enable test mode if needed
		$my2checkout->enableTestMode();
	}
	$session_id = $wpdb->get_var("SELECT attendee_session FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id='" . $payment_data['attendee_id'] . "'");
	$sql = "SELECT ed.id, ed.event_name, ed.event_desc, ac.cost, ac.quantity FROM " . EVENTS_DETAIL_TABLE . " ed ";
	$sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " a ON ed.id=a.event_id ";
	$sql .= " JOIN " . EVENTS_ATTENDEE_COST_TABLE . " ac ON a.id=ac.attendee_id ";
	$sql .= " WHERE a.attendee_session='" . $session_id . "'";
	$tickets = $wpdb->get_results($sql, ARRAY_A);
	$item_num = 1;
	foreach($tickets as $ticket) {
		$my2checkout->addField('c_prod_' . $item_num, $ticket['id'] . ',' . $ticket['quantity']);
		$my2checkout->addField('c_name_' . $item_num, $ticket['event_name']);
		$my2checkout->addField('c_description_' . $item_num, $ticket['event_desc']);
		$my2checkout->addField('c_price_' . $item_num, $ticket['cost']);
		$item_num++;
	}

	$my2checkout->addField('sid', $twocheckout_id);
	$my2checkout->addField('cart_order_id', rand(1, 100));
	$my2checkout->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $payment_data['attendee_id'] . '&event_id=' . $payment_data['event_id'] . '&attendee_action=post_payment&form_action=payment');
	$my2checkout->addField('total', number_format($payment_data['event_cost'], 2, '.', ''));
	$my2checkout->addField('tco_currency', $twocheckout_cur);

	if ($bypass_payment_page) {
		$my2checkout->submitPayment();
	} else {
		$button_url = $payment_settings['2checkout']['button_url'];
		$my2checkout->submitButton($button_url, '2checkout');
		wp_deregister_script('jquery.validate.pack');
	}

	if ($use_sandbox) {
		echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __(' 2checkout.com Debug Mode Is Turned On', 'event_espresso') . '</h3>';
		$my2checkout->dump_fields();
	}
}

add_action('action_hook_espresso_display_offsite_payment_gateway', 'espresso_display_2checkout');
