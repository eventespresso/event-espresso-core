<?php

add_action('action_hook_espresso_display_onsite_payment_header', 'espresso_display_onsite_payment_header');
add_action('action_hook_espresso_display_onsite_payment_footer', 'espresso_display_onsite_payment_footer');
require_once($path . "/payment.php");
if (!empty($billing_info) && $billing_info['gateway'] == 'aim') {
	require_once($path . "/return.php");
	add_action('action_hook_espresso_process_transaction', 'espresso_process_aim');
}