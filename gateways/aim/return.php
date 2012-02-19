<?php

function espresso_transactions_aim_get_attendee_id($attendee_id) {
	if (!empty($_REQUEST['x_cust_id'])) {
		$attendee_id = $_REQUEST['x_cust_id'];
	}
	return $attendee_id;
}

add_filter('filter_hook_espresso_transactions_get_attendee_id', 'espresso_transactions_aim_get_attendee_id');

function espresso_process_aim($payment_data) {
	global $wpdb, $org_options, $payment_settings;

	require_once 'lib/AuthorizeNet.php';



	$authnet_aim_settings = $payment_settings['aim'];
	$authnet_aim_login_id = $authnet_aim_settings['authnet_aim_login_id'];
	$authnet_aim_transaction_key = $authnet_aim_settings['authnet_aim_transaction_key'];

// Enable test mode if needed
//4007000000027  <-- test successful visa
//4222222222222  <-- test failure card number
	if ($authnet_aim_settings['use_sandbox']) {
		define("AUTHORIZENET_SANDBOX", true);
		define("AUTHORIZENET_LOG_FILE", true);
	} else {
		define("AUTHORIZENET_SANDBOX", false);
	}

//start transaction
	$transaction = new AuthorizeNetAIM($authnet_aim_login_id, $authnet_aim_transaction_key);
	echo '<!--Event Espresso Authorize.net AIM Gateway Version ' . $transaction->gateway_version . '-->';
	$transaction->amount = $_POST['amount'];
	$transaction->card_num = $_POST['card_num'];
	$transaction->exp_date = $_POST['exp_date'];
	$transaction->card_code = $_POST['ccv_code'];
	$transaction->first_name = $_POST['first_name'];
	$transaction->last_name = $_POST['last_name'];
	$transaction->email = $_POST['email'];
	$transaction->address = $_POST['address'];
	$transaction->city = $_POST['city'];
	$transaction->state = $_POST['state'];
	$transaction->zip = $_POST['zip'];
	$transaction->cust_id = $_POST['x_cust_id'];
	$transaction->invoice_num = $_POST['invoice_num'];
	if ($authnet_aim_settings['test_transactions']) {
		$transaction->test_request = "true";
	}

	$payment_data->txn_type = 'authorize.net AIM';
	$payment_data->payment_status = 'Incomplete';
	$payment_data->txn_id = 0;
	$payment_data->txn_details = 'No response from authorize.net';
	$payment_data = apply_filters('filter_hook_espresso_prepare_event_link', $payment_data);
	$payment_data = apply_filters('filter_hook_espresso_get_total_cost', $payment_data);
//Capture response
	$response = $transaction->authorizeAndCapture();


	if (!empty($response)) {
		if ($authnet_aim_settings['use_sandbox']) {
			$payment_data->txn_id = $response->invoice_number;
		} else {
			$payment_data->txn_id = $response->transaction_id;
		}
		$payment_data->txn_details = serialize($response);
		if ($response->approved) {
			$payment_data->payment_status = 'Completed';
			?>
			<h2><?php _e('Thank You!', 'event_espresso'); ?></h2>
			<p><?php _e('Your transaction has been processed.', 'event_espresso'); ?></p>
			<p><?php __('Transaction ID:', 'event_espresso') . $response->transaction_id; ?></p>
			<?php
		} else {
			print $response->error_message;
			$payment_data->payment_status = 'Payment Declined';
		}
	} else {
		?>
		<p><?php _e('There was no response from Authorize.net.', 'event_espresso'); ?></p>
		<?php
	}
	add_action('action_hook_espresso_email_after_payment', 'espresso_email_after_payment');
	return $payment_data;
}

add_filter('filter_hook_espresso_thank_you_get_payment_data', 'espresso_process_aim');