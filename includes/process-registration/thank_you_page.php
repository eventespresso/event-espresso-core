<?php

//This is the alternate PayPal button used for the email
function espresso_thank_you_page() {
	global $wpdb, $org_options, $espresso_wp_user, $payment_settings;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	foreach ($active_gateways as $gateway => $path) {
		require_once($path . "/init.php");
	}
	$attendee_id = apply_filters('filter_hook_espresso_transactions_get_attendee_id', '');
	if (!empty($_REQUEST['registration_id']) && empty($attendee_id)) {
		$sql = "SELECT id FROM `" . EVENTS_ATTENDEE_TABLE . "` WHERE registration_id='" . $_REQUEST['registration_id'] . "' ORDER BY id LIMIT 1";
		$attendee_id = $wpdb->get_var($sql);
		$payment_data = new PaymentData($attendee_id);
		$payment_data->populate_data_from_db();
		$payment_data->calculate_costs();
	} elseif (!empty($attendee_id)) {
		$payment_data = new PaymentData($attendee_id);
		$payment_data->populate_data_from_db();
		if (empty($_GET['registration_id']) || $payment_data->registration_id != $_GET['registration_id'])
			die("Cheaters never win!");
		$payment_data->calculate_costs();
		$payment_data = apply_filters('filter_hook_espresso_thank_you_get_payment_data', $payment_data);
		$payment_data->write_payment_data_to_db();
		do_action('action_hook_espresso_email_after_payment', $payment_data);
	}
	if (!empty($attendee_id)) {
		do_action('action_hook_espresso_display_payment_overview_template', $payment_data);
		if ($payment_data->payment_status != "Completed") {
			echo '<a name="payment_options" id="payment_options"></a>';
			do_action('action_hook_espresso_display_return_payment_template', $payment_data);
		}
	}
	$_REQUEST['page_id'] = $org_options['return_url'];
	espresso_init_session();
}

add_shortcode('ESPRESSO_PAYMENTS', 'espresso_thank_you_page');
