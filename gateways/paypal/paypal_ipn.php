<?php

if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
	espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
}
// Include the paypal library
include_once ('Paypal.php');
echo '<!--Event Espresso PayPal Gateway Version ' . $paypal_gateway_version . '-->';
// Create an instance of the paypal library
$myPaypal = new Paypal();
// Log the IPN results
$myPaypal->ipnLog = TRUE;

// Enable test mode if needed
if ($payment_settings['paypal']['use_sandbox'] == 'Y') {
	$myPaypal->enableTestMode();
	$email_transaction_dump = true;
}
// Check validity and write it down
if ($myPaypal->validateIpn()) {
	//Check the payment staus recieved from PayPal
	//wp_mail($contact,'IPN Debug Payment Status', 'Payment Status: ' . $myPaypal->ipnData['payment_status']);
	if ($myPaypal->ipnData['payment_status'] == 'Completed' || $myPaypal->ipnData['payment_status'] == 'Pending') {
		//file_put_contents('paypal.txt', 'SUCCESS' . date("m-d-Y")); //Used for debugging purposes
		//store the results in reusable variables
		$payer_id = $myPaypal->ipnData['payer_id'];
		$payment_date = $myPaypal->ipnData['payment_date'];
		$txn_id = $myPaypal->ipnData['txn_id'];
		$first_name = $myPaypal->ipnData['first_name'];
		$last_name = $myPaypal->ipnData['last_name'];
		$payer_email = $myPaypal->ipnData['payer_email'];
		$payer_status = $myPaypal->ipnData['payer_status'];
		$payment_type = $myPaypal->ipnData['payment_type'];
		$memo = $myPaypal->ipnData['memo'];
		$item_name = stripslashes_deep($myPaypal->ipnData['item_name']);
		$item_number = stripslashes_deep($myPaypal->ipnData['item_number']);
		$quantity = $myPaypal->ipnData['quantity'];
		if (isset($_REQUEST['mc_gross'])) {
			$amount_pd = $_REQUEST['mc_gross'];
		} else {
			$amount_pd = $_REQUEST['payment_gross'];
		}
		$total_cost = $amount_pd;
		$mc_currency = $myPaypal->ipnData['mc_currency'];
		$address_name = $myPaypal->ipnData['address_name'];
		$address_street = nl2br($myPaypal->ipnData['address_street']);
		$address_city = $myPaypal->ipnData['address_city'];
		$address_state = $myPaypal->ipnData['address_state'];
		$address_zip = $myPaypal->ipnData['address_zip'];
		$address_country = $myPaypal->ipnData['address_country'];
		$address_status = $myPaypal->ipnData['address_status'];
		$payer_business_name = $myPaypal->ipnData['payer_business_name'];
		$payment_status = $myPaypal->ipnData['payment_status'];
		$pending_reason = $myPaypal->ipnData['pending_reason'];
		$reason_code = $myPaypal->ipnData['reason_code'];
		$txn_type = "Paypal";

		//Change the transaction type to web_accept so it doesn't confuse people
		if ($txn_type == 'cart' || $txn_type == 'web_accept') {
			$txn_type = 'PayPal';
		}

		global $wpdb;
		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_type = '$txn_type', txn_id = '$txn_id', amount_pd = '$amount_pd',  payment_date ='$payment_date', transaction_details = '" . serialize($myPaypal) . "' WHERE registration_id ='" . espresso_registration_id($attendee_id) . "' ";
		$wpdb->query($sql);
		$payment_status = 'Completed';

		//Debugging option
		if ($email_transaction_dump == true) {
			// For this, we'll just email ourselves ALL the data as plain text output.
			$subject = 'Instant Payment Notification - Gateway Variable Dump';
			$body = "An instant payment notification was successfully recieved\n";
			$body .= "from " . $myPaypal->ipnData['payer_email'] . " on " . date('m/d/Y');
			$body .= " at " . date('g:i A') . "\n\nDetails:\n";
			foreach ($myPaypal->ipnData as $key => $value) {
				$body .= "\n$key: $value\n";
			}
			wp_mail($contact, $subject, $body);
		}
	} else {
		$subject = 'Instant Payment Notification Failed';
		$body = "<p>An instant payment notification failed<br>";
		$body .= "from " . $myPaypal->ipnData['payer_email'] . " on " . date('m/d/Y');
		$body .= " at " . date('g:i A') . " in the process_payments.php file.</p><p>Details:</p>";
		foreach ($myPaypal->ipnData as $key => $value) {
			$body .= "\n$key: $value\n";
		}
		wp_mail($contact, $subject, $body);
	}
}