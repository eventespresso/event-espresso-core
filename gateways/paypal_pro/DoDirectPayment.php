<?php

// Included required files.

require_once('includes/paypal.nvp.class.php');

$paypal_pro_settings = get_option('event_espresso_paypal_pro_settings');

$sandbox = $paypal_pro_settings['paypal_pro_use_sandbox'] ? true : false;
// Setup PayPal object
$PayPalConfig = array('Sandbox' => $sandbox, 'APIUsername' => $paypal_pro_settings['paypal_api_username'], 'APIPassword' => $paypal_pro_settings['paypal_api_password'], 'APISignature' => $paypal_pro_settings['paypal_api_signature']);
$PayPal = new PayPal($PayPalConfig);


//Find the correct amount so that unsavory characters don't change it in the previous form
$sql = "SELECT ea.amount_pd, ed.event_name FROM " . EVENTS_ATTENDEE_TABLE . " ea ";
$sql .= "JOIN " . EVENTS_DETAIL_TABLE . " ed ";
$sql .= "ON ed.id = ea.event_id ";
$sql .= " WHERE registration_id = '" . espresso_registration_id($_POST['id']) . "' ";
$sql .= " ORDER BY ea.id ASC LIMIT 1";

$r = $wpdb->get_row($sql);

if (!$r || $wpdb->num_rows == 0) {

    exit("Looks like something went wrong.  Please try again or notify the website administrator.");
}

// Populate data arrays with order data.
$DPFields = array(
    'paymentaction' => 'Sale', // How you want to obtain payment.  Authorization indidicates the payment is a basic auth subject to settlement with Auth & Capture.  Sale indicates that this is a final sale for which you are requesting payment.  Default is Sale.
    'ipaddress' => $_SERVER['REMOTE_ADDR'], // Required.  IP address of the payer's browser.
    'returnfmfdetails' => '1'      // Flag to determine whether you want the results returned by FMF.  1 or 0.  Default is 0.
);

$CCDetails = array(
    'creditcardtype' => $_POST['creditcardtype'], // Required. Type of credit card.  Visa, MasterCard, Discover, Amex, Maestro, Solo.  If Maestro or Solo, the currency code must be GBP.  In addition, either start date or issue number must be specified.
    'acct' => $_POST['card_num'], // Required.  Credit card number.  No spaces or punctuation.
    'expdate' => $_POST['expmonth'] . $_POST['expyear'], // Required.  Credit card expiration date.  Format is MMYYYY
    'cvv2' => $_POST['cvv'], // Requirements determined by your PayPal account settings.  Security digits for credit card.
    'startdate' => '', // Month and year that Maestro or Solo card was issued.  MMYYYY
    'issuenumber' => ''       // Issue number of Maestro or Solo card.  Two numeric digits max.
);

$PayerInfo = array(
    'email' => $_POST['email'], // Email address of payer.
    'payerid' => '', // Unique PayPal customer ID for payer.
    'payerstatus' => '', // Status of payer.  Values are verified or unverified
    'business' => ''        // Payer's business name.
);

$PayerName = array(
    'salutation' => '', // Payer's salutation.  20 char max.
    'firstname' => $_POST['first_name'], // Payer's first name.  25 char max.
    'middlename' => '', // Payer's middle name.  25 char max.
    'lastname' => $_POST['last_name'], // Payer's last name.  25 char max.
    'suffix' => ''       // Payer's suffix.  12 char max.
);

$BillingAddress = array(
    'street' => $_POST['address'], // Required.  First street address.
    'street2' => '', // Second street address.
    'city' => $_POST['city'], // Required.  Name of City.
    'state' => $_POST['state'], // Required. Name of State or Province.
    'countrycode' => 'US', // Required.  Country code.
    'zip' => $_POST['zip'], // Required.  Postal code of payer.
    'phonenum' => empty($_POST['phone']) ? '' : $_POST['phone']       // Phone Number of payer.  20 char max.
);

$ShippingAddress = array(
    'shiptoname' => '', // Required if shipping is included.  Person's name associated with this address.  32 char max.
    'shiptostreet' => '', // Required if shipping is included.  First street address.  100 char max.
    'shiptostreet2' => '', // Second street address.  100 char max.
    'shiptocity' => '', // Required if shipping is included.  Name of city.  40 char max.
    'shiptostate' => '', // Required if shipping is included.  Name of state or province.  40 char max.
    'shiptozip' => '', // Required if shipping is included.  Postal code of shipping address.  20 char max.
    'shiptocountrycode' => '', // Required if shipping is included.  Country code of shipping address.  2 char max.
    'shiptophonenum' => ''     // Phone number for shipping address.  20 char max.
);

$PaymentDetails = array(
    'amt' => $r->amount_pd, // Required.  Total amount of order, including shipping, handling, and tax.
    'currencycode' => $paypal_pro_settings['currency_format'], // Required.  Three-letter currency code.  Default is USD.
    'itemamt' => '', // Required if you include itemized cart details. (L_AMTn, etc.)  Subtotal of items not including S&H, or tax.
    'shippingamt' => '', // Total shipping costs for the order.  If you specify shippingamt, you must also specify itemamt.
    'handlingamt' => '', // Total handling costs for the order.  If you specify handlingamt, you must also specify itemamt.
    'taxamt' => '', // Required if you specify itemized cart tax details. Sum of tax for all items on the order.  Total sales tax.
    'desc' => stripslashes_deep($r->event_name), // Description of the order the customer is purchasing.  127 char max.
    'custom' => '', // Free-form field for your own use.  256 char max.
    'invnum' => '', // Your own invoice or tracking number
    'notifyurl' => ''      // URL for receiving Instant Payment Notifications.  This overrides what your profile is set to use.
);

$OrderItems = array();
$Item = array(
    'l_name' => stripslashes_deep($r->event_name), // Item Name.  127 char max.
    'l_desc' => stripslashes_deep($r->event_name), // Item description.  127 char max.
    'l_amt' => $_POST['amount'], // Cost of individual item.
    'l_number' => '', // Item Number.  127 char max.
    'l_qty' => '1', // Item quantity.  Must be any positive integer.
    'l_taxamt' => '', // Item's sales tax amount.
    'l_ebayitemnumber' => '', // eBay auction number of item.
    'l_ebayitemauctiontxnid' => '', // eBay transaction ID of purchased item.
    'l_ebayitemorderid' => ''     // eBay order ID for the item.
);
array_push($OrderItems, $Item);


// Wrap all data arrays into a single, "master" array which will be passed into the class function.
$PayPalRequestData = array(
    'DPFields' => $DPFields,
    'CCDetails' => $CCDetails,
    'PayerName' => $PayerName,
    'BillingAddress' => $BillingAddress,
    'PaymentDetails' => $PaymentDetails,
    'OrderItems' => $OrderItems
);
//echo "<pre>", print_r( $PayPalRequestData ), "</pre>";
// Pass the master array into the PayPal class function
$PayPalResult = $PayPal->DoDirectPayment($PayPalRequestData);

// Display results
//echo '<pre />';

$Errors = GetErrors($PayPalResult);
//echo "<pre>Errors, ", print_r($Errors), "</pre>";

if (!APICallSuccessful($PayPalResult['ACK'])) {

    DisplayErrors($Errors);
} else {

    $payment_status = 'Completed';
    $payment_date = date("d-m-Y");
    $txn_type = 'PPP';
    $txn_id = $PayPalResult['TRANSACTIONID'];
	$total_cost = $PayPalResult['AMT'];

    $sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($_POST['id']) . "' ";
    $sql .= $id == '' ? '' : " AND id= '" . $id . "' ";
    $sql .= " ORDER BY id LIMIT 0,1";

    $attendees = $wpdb->get_results($sql);
    foreach ($attendees as $attendee) {
        $attendee_id = $attendee->id;
        $att_registration_id = $attendee->registration_id;
        $lname = $attendee->lname;
        $fname = $attendee->fname;
        $amount_pd = $attendee->amount_pd;
        $event_id = $attendee->event_id;
    }

    $events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");
    foreach ($events as $event) {
        $event_id = $event->id;
        $event_name = $event->event_name;
        $event_desc = $event->event_desc;
        $event_description = $event->event_desc;
        $event_identifier = $event->event_identifier;
        $cost = $event->event_cost;
        $active = $event->is_active;
    }
    //Build links
    $event_url = espresso_reg_url($event_id);
    $event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';
		$total_cost = $PayPalResult['AMT'];

    $sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET
        payment_status = '$payment_status',
        txn_id = '" . $PayPalResult['TRANSACTIONID'] . "',
		txn_type = '" . $txn_type . "',
        amount_pd = '" . $PayPalResult['AMT'] . "',
        payment_date ='" . $PayPalResult['TIMESTAMP'] . "'
        WHERE registration_id ='" . espresso_registration_id($_POST['id']) . "' ";

    $wpdb->query($sql);
}

function APICallSuccessful($ack) {
    if (strtoupper($ack) != 'SUCCESS' && strtoupper($ack) != 'SUCCESSWITHWARNING' && strtoupper($ack) != 'PARTIALSUCCESS')
        return false;
    else
        return true;
}

function GetErrors($DataArray) {

    $Errors = array();
    $n = 0;
    while (isset($DataArray['L_ERRORCODE' . $n . ''])) {
        $LErrorCode = isset($DataArray['L_ERRORCODE' . $n . '']) ? $DataArray['L_ERRORCODE' . $n . ''] : '';
        $LShortMessage = isset($DataArray['L_SHORTMESSAGE' . $n . '']) ? $DataArray['L_SHORTMESSAGE' . $n . ''] : '';
        $LLongMessage = isset($DataArray['L_LONGMESSAGE' . $n . '']) ? $DataArray['L_LONGMESSAGE' . $n . ''] : '';
        $LSeverityCode = isset($DataArray['L_SEVERITYCODE' . $n . '']) ? $DataArray['L_SEVERITYCODE' . $n . ''] : '';

        $CurrentItem = array(
            'L_ERRORCODE' => $LErrorCode,
            'L_SHORTMESSAGE' => $LShortMessage,
            'L_LONGMESSAGE' => $LLongMessage,
            'L_SEVERITYCODE' => $LSeverityCode
        );

        array_push($Errors, $CurrentItem);
        $n++;
    }

    return $Errors;
}

function DisplayErrors($Errors) {
    echo '<p><strong class="credit_card_failure">Attention: your transaction was declined for the following reason(s):</strong><br />';
    foreach ($Errors as $ErrorVar => $ErrorVal) {
        $CurrentError = $Errors[$ErrorVar];
        foreach ($CurrentError as $CurrentErrorVar => $CurrentErrorVal) {
            if ($CurrentErrorVar == 'L_ERRORCODE')
                $CurrentVarName = 'Error Code';
            elseif ($CurrentErrorVar == 'L_SHORTMESSAGE')
                $CurrentVarName = 'Short Message';
            elseif ($CurrentErrorVar == 'L_LONGMESSAGE')
                $CurrentVarName == 'Long Message';
            elseif ($CurrentErrorVar == 'L_SEVERITYCODE')
                $CurrentVarName = 'Severity Code';

            echo $CurrentVarName . ': ' . $CurrentErrorVal . '<br />';
        }
        echo '<br />';
        echo event_espresso_pay($att_registration_id);
    }
}

?>