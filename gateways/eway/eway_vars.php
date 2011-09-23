<?php

// Setup class
include_once ('Eway.php');
echo '<!-- Event Espresso eway Gateway Version ' . $eway_gateway_version . '-->';
$myeway = new eway(); // initiate an instance of the class
global $org_options;
//global $attendee_id;
$eway_settings = get_option('event_espresso_eway_settings');
$eway_id = $eway_settings['eway_id'];
$eway_username = $eway_settings['eway_username'];
//$image_url = $eway_settings['button_url'];
$eway_cur = $eway_settings['currency_format'];
$no_shipping = $eway_settings['no_shipping'];
$use_sandbox = $eway_settings['use_sandbox'];

$quantity = isset($quantity) && $quantity > 0 ? $quantity : espresso_count_attendees_for_registration($attendee_id);
if ($use_sandbox == 1) {
    // Enable test mode if needed
    $myeway->enableTestMode();
    $myeway->addField('CustomerID', '87654321');
    $myeway->addField('UserName', 'TestAccount');
}else {
    $myeway->addField('CustomerID', $eway_id);
    $myeway->addField('UserName', $eway_username);
}
$myeway->addField('CompanyName',$org_options['organization']);
$myeway->addField('CancelURL', home_url() . '/?page_id=' . $org_options['cancel_return']);
$myeway->addField('ReturnURL', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&event_id=' . $event_id . '&attendee_action=post_payment&form_action=payment');
//$myeway->addField('item_name', $event_name . ' | '.__('Reg. ID:','event_espresso').' '.$attendee_id. ' | '.__('Name:','event_espresso').' '. $attendee_name .' | '.__('Total Registrants:','event_espresso').' '.$num_people);
$myeway->addField('InvoiceDescription', stripslashes_deep($event_name) . ' | ' . __('Name:', 'event_espresso') . ' ' . stripslashes_deep($fname . ' ' . $lname) . ' | ' . __('Registrant Email:', 'event_espresso') . ' ' . $attendee_email . ' | ' . __('Total Registrants:', 'event_espresso') . ' ' . $quantity);
$myeway->addField('Amount', number_format($event_cost, 2, '.', ''));
$myeway->addField('Currency', $eway_cur);
$myeway->addField('CompanyLogo', $eway_settings['image_url']);
$myeway->addField('no_shipping ', $no_shipping);

//Post variables
$myeway->addField('CustomerFirstName', $fname);
$myeway->addField('CustomerLastName', $lname);
$myeway->addField('CustomerEmail', $attendee_email);
$myeway->addField('CustomerAddress', $address);
$myeway->addField('CustomerCity', $city);
$myeway->addField('CustomerState', $state);
$myeway->addField('CustomerPostCode', $zip);


//Enable this function if you want to send payment notification before the person has paid.
//This function is copied on the payment processing page
//event_espresso_send_payment_notification($attendee_id, $txn_id, $amount_pd);
//Decide if you want to auto redirect to your payment website or display a payment button.
if ($eway_settings['bypass_payment_page'] == 'Y') {
    $myeway->submitPayment(); //Enable auto redirect to payment site
} else {
    if (empty($eway_settings['button_url'])) {
        if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "eway/eway_logo.png")) {
            $button_url = EVENT_ESPRESSO_GATEWAY_URL . "eway/eway_logo.png";
        } else {
            $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/eway/eway_logo.png";
        }
    } else {
        $button_url = $eway_settings['button_url'];
    }
    $myeway->submitButton($button_url, 'eway'); //Display payment button
    wp_deregister_script('jquery.validate.pack');
}

if ($use_sandbox == true) {
    echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
    $myeway->dump_fields(); // for debugging, output a table of all the fields
}

