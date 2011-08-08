<?php

// Setup class
include_once ('2checkout.php');
echo '<!-- Event Espresso 2checkout Gateway Version ' . $twocheckout_gateway_version . '-->';
$my2checkout = new TwoCo(); // initiate an instance of the class
global $org_options;
//global $attendee_id;
$twocheckout_settings = get_option('event_espresso_2checkout_settings');
$twocheckout_id = empty($twocheckout_settings['2checkout_id']) ? 0 : $twocheckout_settings['2checkout_id'];
$twocheckout_username = empty($twocheckout_settings['2checkout_username']) ? '' : $twocheckout_settings['2checkout_username'];
//$image_url = $2checkout_settings['button_url'];
$twocheckout_cur = empty($twocheckout_settings['currency_format']) ? 'USD' : $twocheckout_settings['currency_format'];
$no_shipping = empty($twocheckout_settings['no_shipping']) ? '' : $twocheckout_settings['no_shipping'];
$use_sandbox = empty($twocheckout_settings['use_sandbox']) ? 'N' : $twocheckout_settings['use_sandbox'];
if ($use_sandbox == 1) {
    // Enable test mode if needed
    $my2checkout->enableTestMode();
}
$quantity = isset($quantity) && $quantity > 0 ? $quantity : espresso_count_attendees_for_registration($attendee_id);
$my2checkout->addField('sid', $twocheckout_id);
$my2checkout->addField('cart_order_id', rand(1, 100));
$my2checkout->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&event_id=' . $event_id . '&attendee_action=post_payment&form_action=payment');
$my2checkout->addField('total', number_format($event_cost, 2, '.', ''));
$my2checkout->addField('tco_currency', $twocheckout_cur);

//Enable this function if you want to send payment notification before the person has paid.
//This function is copied on the payment processing page
//event_espresso_send_payment_notification($attendee_id, $txn_id, $amount_pd);
//Decide if you want to auto redirect to your payment website or display a payment button.
if (!empty($twocheckout_settings['bypass_payment_page']) && $twocheckout_settings['bypass_payment_page'] == 'Y') {
    $my2checkout->submitPayment(); //Enable auto redirect to payment site
} else {
    if (empty($twocheckout_settings['button_url'])) {
        if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "2checkout/logo.png")) {
            $button_url = EVENT_ESPRESSO_GATEWAY_URL . "2checkout/logo.png";
        } else {
            $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/2checkout/logo.png";
        }
    } else {
        $button_url = $twocheckout_settings['button_url'];
    }
    $my2checkout->submitButton($button_url, '2checkout'); //Display payment button
    wp_deregister_script('jquery.validate.pack');
}

if ($use_sandbox == true) {
    echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __(' 2checkout.com Debug Mode Is Turned On', 'event_espresso') . '</h3>';
    $my2checkout->dump_fields(); // for debugging, output a table of all the fields
}

