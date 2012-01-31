<?php

if (isset($_REQUEST['ideal']) && $_REQUEST['ideal'] == 1) //need this condition so that ideal correctly redirects to the selected bank
	ob_start(); //before this condition, ob_start() was causing issues with pdf invoice.  Will not work inside the function.
//Payment processing - Used for onsite payment processing. Used with the [ESPRESSO_TXN_PAGE] tag

function event_espresso_txn() {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$active_gateways = get_option('event_espresso_active_gateways', array());
	if (empty($active_gateways)) {
		$subject = __('Website Payment IPN Not Setup', 'event_espresso');
		$body = sprintf(__('The IPN for %s at %s has not been properly setup and is not working. Date/time %s', 'event_espresso'), $org_options['organization'], home_url(), date('g:i A'));
		wp_mail($org_options['contact_email'], $subject, $body);
		return;
	}
	foreach ($active_gateways as $gateway => $path) {
		require_once($path . "/init.php");
	}
	require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways/PaymentData.php');
	$payment_data = new PaymentData;
	$payment_data = apply_filters('filter_hook_espresso_prepare_payment_data_transactions_page', $payment_data);
	$payment_data = apply_filters('filter_hook_espresso_process_payment_transactions_page', $payment_data);
	$payment_data = apply_filters('filter_hook_espresso_add_event_link_transactions_page', $payment_data);
	$payment_data = apply_filters('filter_hook_espresso_add_total_cost_transactions_page', $payment_data);
	$payment_data = apply_filters('filter_hook_espresso_update_db_w_payment_data_transactions_page', $payment_data);
	extract((array)$payment_data);
	//Sends users to the thank you page if they try to access this page directly
	if (!empty($payment_status) && $payment_status == 'Completed') {

		//Send payment confirmation emails
		event_espresso_send_payment_notification(array('attendee_id' => $attendee_id));

		//Send the email confirmation
		//@params $attendee_id, $send_admin_email, $send_attendee_email
		if ($email_before_payment == 'N') {
			event_espresso_email_confirmations(array('attendee_id' => $attendee_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
		}

		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php"); //This is the path to the template file if available
		} else {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
		}

//This loads the affiliate tracking code if installed
		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "affiliate_tracking.php")) {
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "affiliate_tracking.php");
		}
	}

	$_REQUEST['page_id'] = $org_options['return_url'];
	espresso_init_session();
}

add_shortcode('ESPRESSO_TXN_PAGE', 'event_espresso_txn');
