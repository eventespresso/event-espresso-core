<?php

// Setup class
include_once ('Authorize.php');
echo '<!--Event Espresso Authorize.net Gateway Version ' . $authnet_gateway_version . '-->';
global $org_options;
$myAuthorize = new Authorize(); // initiate an instance of the class

$authnet_settings = get_option('event_espresso_authnet_settings');
$authnet_login_id = empty($authnet_settings['authnet_login_id']) ? '' : $authnet_settings['authnet_login_id'];
$authnet_transaction_key = empty($authnet_settings['authnet_transaction_key']) ? '' : $authnet_settings['authnet_transaction_key'];
$use_sandbox = empty($authnet_settings['use_sandbox']) ? '' : $authnet_settings['use_sandbox'];
$button_type = empty($authnet_settings['button_type']) ? '' : $authnet_settings['button_type'];
//$button_url = $authnet_settings['button_url'];
$image_url = empty($authnet_settings['image_url']) ? '' : $authnet_settings['image_url'];

if ($use_sandbox == 1) {
    // Enable test mode if needed
    $myAuthorize->enableTestMode();
}

$quantity = $quantity > 0 ? $quantity : espresso_count_attendees_for_registration($attendee_id);

$myAuthorize->setUserInfo($authnet_login_id, $authnet_transaction_key);

$myAuthorize->addField('x_Relay_URL', home_url() . '/?page_id=' . $org_options['notify_url']);
$myAuthorize->addField('x_Description', stripslashes_deep($event_name) . ' | ' . __('Reg. ID:', 'event_espresso') . ' ' . $attendee_id . ' | ' . __('Name:', 'event_espresso') . ' ' . stripslashes_deep($fname . ' ' . $lname) . ' | ' . __('Total Registrants:', 'event_espresso') . ' ' . $quantity);
$myAuthorize->addField('x_Amount', number_format($event_cost, 2));
$myAuthorize->addField('x_Logo_URL', $image_url);
$myAuthorize->addField('x_Invoice_num', 'au-' . event_espresso_session_id());
//Post variables
$myAuthorize->addField('x_Cust_ID', $attendee_id);
$myAuthorize->addField('x_first_name', $fname);
$myAuthorize->addField('x_last_name', $lname);

$myAuthorize->addField('x_Email', $attendee_email);
$myAuthorize->addField('x_Address', $address);
$myAuthorize->addField('x_City', $city);
$myAuthorize->addField('x_State', $state);
$myAuthorize->addField('x_Zip', $zip);


//Enable this function if you want to send payment notification before the person has paid.
//This function is copied on the payment processing page
//event_espresso_send_payment_notification($attendee_id, $txn_id, $amount_pd);
//Decide if you want to auto redirect to your payment website or display a payment button.
if (!empty($authnet_settings['bypass_payment_page']) && $authnet_settings['bypass_payment_page'] == 'Y') {
    $myAuthorize->submitPayment(); //Enable auto redirect to payment site
} else {
    if (empty($authnet_settings['button_url'])) {
        //$button_url = EVENT_ESPRESSO_GATEWAY_URL . "authnet/btn_cc_vmad.gif";
        if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif")) {
            $button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif";
        } else {
            $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/btn_cc_vmad.gif";
        }
    } else {
        $button_url = $authnet_settings['button_url'];
    }
    $myAuthorize->submitButton($button_url, 'authnet'); //Display payment button
}

if ($use_sandbox == true) {
    echo '<p>Test credit card # 4007000000027</p>';
    echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
    $myAuthorize->dump_fields(); // for debugging, output a table of all the fields
}