<?php

function event_espresso_txn() {
	global $wpdb, $org_options, $espresso_wp_user, $payment_settings;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	if (empty($active_gateways)) {
		$subject = __('Website Payment IPN Not Setup', 'event_espresso');
		$body = sprintf(__('The IPN for %s at %s has not been properly setup and is not working. Date/time %s', 'event_espresso'), $org_options['organization'], home_url(), date('g:i A'));
		wp_mail($org_options['contact_email'], $subject, $body);
		return;
	}
	foreach ($active_gateways as $gateway => $path) {
		require_once($path . "/init.php");
	}
	$payment_data['attendee_id'] = apply_filters('filter_hook_espresso_transactions_get_attendee_id', '');
	if ($payment_data['attendee_id'] == "") {
		echo "ID not supplied.";
	} else {
		$payment_data = apply_filters('filter_hook_espresso_pretransaction_data_processing', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_process_transaction', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_get_total_cost', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_prepare_event_link', $payment_data);
		do_action('action_hook_espresso_update_attendee_payment_data_in_db', $payment_data);
		do_action('action_hook_espresso_email_after_payment', $payment_data);
		extract($payment_data);

		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php"); //This is the path to the template file if available
		} else {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
		}
	}
	$_REQUEST['page_id'] = $org_options['return_url'];
	espresso_init_session();
}

add_shortcode('ESPRESSO_TXN_PAGE', 'event_espresso_txn');

function deal_with_ideal() {
	if (!empty($_POST['bank_id'])) {
		$active_gateways = get_option('event_espresso_active_gateways', array());
		if (!empty($active_gateways['ideal'])) {
			$path = $active_gateways['ideal'];
			require_once($path . '/init.php');
			$payment_data['attendee_id'] = apply_filters('filter_hook_espresso_transactions_get_attendee_id', '');
			espresso_process_ideal($payment_data);
		}
	}
}

add_action('wp_loaded', 'deal_with_ideal');

function espresso_email_after_payment($payment_data) {
	global $org_options;
	if ($payment_data->payment_status == 'Completed') {
		event_espresso_send_payment_notification(array('attendee_id' => $payment_data->attendee_id));
		if (!$org_options['email_before_payment']) {
			event_espresso_email_confirmations(array('session_id' => $payment_data->attendees[0]->attendee_session, 'send_admin_email' => true, 'send_attendee_email' => true));
		}
	}
}

function espresso_mail_successful_transaction_debugging_output($payment_data) {
	$subject = 'Instant Payment Notification - Gateway Variable Dump';
	$body = "An instant payment notification was successfully recieved\n";
	$body .= "from " . " on " . date('m/d/Y');
	$body .= " at " . date('g:i A') . "\n\nDetails:\n";
	$body .= unserialize($payment_data['txn_details']);
	wp_mail($payment_data['contact'], $subject, $body);
}

add_action('action_hook_espresso_mail_successful_transaction_debugging_output', 'espresso_mail_successful_transaction_debugging_output');

function espresso_mail_failed_transaction_debugging_output($payment_data) {
	$subject = 'Instant Payment Notification - Gateway Variable Dump';
	$body = "An instant payment notification failed\n";
	$body .= "from " . " on " . date('m/d/Y');
	$body .= " at " . date('g:i A') . "\n\nDetails:\n";
	$body .= unserialize($payment_data['txn_details']);
	wp_mail($payment_data['contact'], $subject, $body);
}

add_action('action_hook_espresso_mail_failed_transaction_debugging_output', 'espresso_mail_failed_transaction_debugging_output');

function espresso_process_payments($EE_Session) {
	global $espresso_wp_user;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, "Hello World!");
	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	$session_data = $EE_Session->get_session_data();
	$billing_info = $session_data['billing_info'];
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	foreach ($active_gateways as $gateway => $path) {
		require_once($path . "/init.php");
	}
	do_action('action_hook_espresso_process_transaction', $EE_Session, $payment_settings);
}

add_action('action_hook_espresso_process_payments', 'espresso_process_payments');
