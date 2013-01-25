<?php
global $org_options, $wpdb;
$payment_settings = get_option('event_espresso_realauth_settings');
include("Realauth.php");
$sql = "SELECT amount_pd FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id = '" . $attendee_id . "'";
$total_cost = number_format($wpdb->get_var($sql), 2, '', '');
$realauth = new Realauth($payment_settings['merchant_id'],
								$payment_settings['shared_secret']);
$realauth->set_amount($total_cost);
$realauth->set_currency($payment_settings['currency_format']);
$realauth->set_sandbox($payment_settings['sandbox']);
$realauth->set_attendee_id($attendee_id);
$realauth->set_timestamp();
$button_url = $payment_settings['button_url'];
if (!empty($payment_settings['bypass_payment_page'])) {
	echo $realauth->submitPayment();
} else {
	echo $realauth->submitButton($button_url);
}