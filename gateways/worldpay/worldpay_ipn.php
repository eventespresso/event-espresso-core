<?php

if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
    espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
}
// Include the Worldpay library
include_once ('Worldpay.php');
echo '<!--Event Espresso worldpay Gateway Version ' . $worldpay_gateway_version . '-->';
// Create an instance of the worldpay library
$myworldpay = new worldpay();
// Log the IPN results
$myworldpay->ipnLog = TRUE;
$worldpay_settings = get_option('event_espresso_worldpay_settings');
// Enable test mode if needed
if ($worldpay_settings['use_sandbox'] == '1') {
    $myworldpay->enableTestMode();
    $email_transaction_dump = true;
}
// Check validity and write it down
if ($myworldpay->validateIpn()) {
    //Check the payment staus recieved from worldpay
    //wp_mail($contact,'IPN Debug Payment Status', 'Payment Status: ' . $myworldpay->ipnData['payment_status']);
    if ($myworldpay->ipnData['payment_status'] == 'Completed' || $myworldpay->ipnData['payment_status'] == 'Pending') {
        //file_put_contents('worldpay.txt', 'SUCCESS' . date("m-d-Y")); //Used for debugging purposes
        //store the results in reusable variables
        $payer_id = $myworldpay->ipnData['payer_id'];
        $payment_date = $myworldpay->ipnData['payment_date'];
        $txn_id = $myworldpay->ipnData['txn_id'];
        $first_name = $myworldpay->ipnData['first_name'];
        $last_name = $myworldpay->ipnData['last_name'];
        $payer_email = $myworldpay->ipnData['payer_email'];
        $payer_status = $myworldpay->ipnData['payer_status'];
        $payment_type = $myworldpay->ipnData['payment_type'];
        $memo = $myworldpay->ipnData['memo'];
        $item_name = stripslashes_deep($myworldpay->ipnData['item_name']);
        $item_number = stripslashes_deep($myworldpay->ipnData['item_number']);
        $quantity = $myworldpay->ipnData['quantity'];
        if (isset($_REQUEST['mc_gross'])) {
            $amount_pd = $_REQUEST['mc_gross'];
        } else {
            $amount_pd = $_REQUEST['payment_gross'];
        }
        $mc_currency = $myworldpay->ipnData['mc_currency'];
        $address_name = $myworldpay->ipnData['address_name'];
        $address_street = nl2br($myworldpay->ipnData['address_street']);
        $address_city = $myworldpay->ipnData['address_city'];
        $address_state = $myworldpay->ipnData['address_state'];
        $address_zip = $myworldpay->ipnData['address_zip'];
        $address_country = $myworldpay->ipnData['address_country'];
        $address_status = $myworldpay->ipnData['address_status'];
        $payer_business_name = $myworldpay->ipnData['payer_business_name'];
        $payment_status = $myworldpay->ipnData['payment_status'];
        $pending_reason = $myworldpay->ipnData['pending_reason'];
        $reason_code = $myworldpay->ipnData['reason_code'];
        $txn_type = $myworldpay->ipnData['txn_type'];

        global $wpdb;
        $sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_type = '$txn_type', txn_id = '$txn_id', amount_pd = '$amount_pd',  payment_date ='$payment_date', transaction_details = '" . serialize($myworldpay) . "' WHERE registration_id ='" . espresso_registration_id($attendee_id) . "' ";
        $wpdb->query($sql);
        $payment_status = 'Completed';

        //Debugging option
        if ($email_transaction_dump == true) {
            // For this, we'll just email ourselves ALL the data as plain text output.
            $subject = 'Instant Payment Notification - Gateway Variable Dump';
            $body = "An instant payment notification was successfully recieved\n";
            $body .= "from " . $myworldpay->ipnData['payer_email'] . " on " . date('m/d/Y');
            $body .= " at " . date('g:i A') . "\n\nDetails:\n";
            foreach ($myworldpay->ipnData as $key => $value) {
                $body .= "\n$key: $value\n";
            }
            wp_mail($contact, $subject, $body);
        }
    } else {
        $subject = 'Instant Payment Notification - Gateway Variable Dump';
        $body = "An instant payment notification failed\n";
        $body .= "from " . $myworldpay->ipnData['payer_email'] . " on " . date('m/d/Y');
        $body .= " at " . date('g:i A') . "\n\nDetails:\n";
        foreach ($myworldpay->ipnData as $key => $value) {
            $body .= "\n$key: $value\n";
        }
        wp_mail($contact, $subject, $body);
    }
}
