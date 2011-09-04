<?php

// Setup class
global $wpdb;
include_once ('Paypal.php');
echo '<!-- Event Espresso PayPal Gateway Version ' . $paypal_gateway_version . '-->';
$myPaypal = new Paypal(); // initiate an instance of the class
global $org_options;
//echo $registration_id;
//global $attendee_id;
$paypal_settings = get_option('event_espresso_paypal_settings');
$paypal_id = empty($paypal_settings['paypal_id']) ? '' : $paypal_settings['paypal_id'];
//$image_url = $paypal_settings['button_url'];
$paypal_cur = empty($paypal_settings['currency_format']) ? '' : $paypal_settings['currency_format'];
$no_shipping = empty($paypal_settings['no_shipping']) ? '' : $paypal_settings['no_shipping'];
$use_sandbox = empty($paypal_settings['use_sandbox']) ? '' : $paypal_settings['use_sandbox'];
if ($use_sandbox == 1) {
    // Enable test mode if needed
    $myPaypal->enableTestMode();
}


$attendees = array();
$primary_registration_id = "";
$amount_pd = 0.00;
$multi_reg = false;
$event_ids = array();
$event_link = "";

if (isset($attendee_id) && is_numeric($attendee_id) && $attendee_id > 0) {
    $tmp_row = $wpdb->get_row("select registration_id from " . EVENTS_ATTENDEE_TABLE . " where id = $attendee_id");
    if ($tmp_row !== NULL) {
        $tmp_registration_id = $tmp_row->registration_id;
        $tmp_row = $wpdb->get_row("select * from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where registration_id = '{$tmp_registration_id}' ");
        if ($tmp_row !== NULL) {
            $primary_registration_id = $tmp_row->primary_registration_id;
            $multi_reg = true;
        } else {
            $primary_registration_id = $tmp_registration_id;
        }
    }
}

if ($attendee_id > 0 && !empty($primary_registration_id) && strlen($primary_registration_id) > 0) {
    $registration_ids = array();
    $rs = $wpdb->get_results("select * from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where primary_registration_id = '{$primary_registration_id}' ");
    if ($wpdb->num_rows > 0) {
        foreach ($rs as $row) {
            $registration_ids[] = $row->registration_id;
        }
    } else {
        $registration_ids[] = $primary_registration_id;
    }

    $total_cost = 0.00;
    $amount_pd = 0.00;
    foreach ($registration_ids as $registration_id) {

        $sql = "select ea.registration_id, ea.id as attendee_id, ea.amount_pd, ed.id as event_id, ed.event_name, ed.start_date, ea.fname, ea.lname, eac.quantity, eac.cost from " . EVENTS_ATTENDEE_TABLE . " ea
				inner join " . EVENTS_ATTENDEE_COST_TABLE . " eac on ea.id = eac.attendee_id
				inner join " . EVENTS_DETAIL_TABLE . " ed on ea.event_id = ed.id
				where ea.registration_id = '" . $registration_id . "' order by ed.event_name ";

        $tmp_attendees = $wpdb->get_results($sql, ARRAY_A);

        foreach ($tmp_attendees as $tmp_attendee) {
            $sub_total = 0.00;
            $sub_total = $tmp_attendee["cost"] * $tmp_attendee["quantity"];
            $attendees[] = array("attendee_info" => $tmp_attendee["event_name"] . "[" . date('m-d-Y', strtotime($tmp_attendee['start_date'])) . "]" . " -- " . $tmp_attendee["fname"] . " " . $tmp_attendee["lname"],
                "quantity" => $tmp_attendee["quantity"],
                "cost" => doubleval($tmp_attendee["cost"]),
                "sub_total" => doubleval($sub_total),
                "unit_price" => $tmp_attendee["cost"]);
            $amount_pd += $tmp_attendee["amount_pd"];
            $total_cost += $sub_total;
            if (!in_array($tmp_attendee['event_id'], $event_ids)) {
                $event_ids[] = $tmp_attendee['event_id'];
            }
        }
    }
    $discount = 0;
    if ($amount_pd < $total_cost) {
        $discount = $total_cost - $amount_pd;
    }
}

#############################


$quantity = isset($quantity) && $quantity > 0 ? $quantity : espresso_count_attendees_for_registration($attendee_id);
$myPaypal->addField('business', $paypal_id);
$myPaypal->addField('return', home_url() . '/?page_id=' . $org_options['return_url'] . '&id=' . $attendee_id);
$myPaypal->addField('cancel_return', home_url() . '/?page_id=' . $org_options['cancel_return']);
$myPaypal->addField('notify_url', home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&event_id=' . $event_id . '&attendee_action=post_payment&form_action=payment');
//$myPaypal->addField('item_name', $event_name . ' | '.__('Reg. ID:','event_espresso').' '.$attendee_id. ' | '.__('Name:','event_espresso').' '. $attendee_name .' | '.__('Total Registrants:','event_espresso').' '.$num_people);
//echo espresso_quantity_for_registration($attendee_id);
$event_meta = event_espresso_get_event_meta($event_id);
if (count($attendees) > 0) {
    $myPaypal->addField('cmd', '_cart');
    $myPaypal->addField('upload', '1');
    #if ($event_meta['additional_attendee_reg_info'] == 1 || espresso_quantity_for_registration($attendee_id) >1) {
    #    $div = $event_cost / $quantity;
    #    for ($i = 1; $i <= $quantity; $i++) {
    #        $myPaypal->addField('item_number_' . $i, $registration_id);
    #        $myPaypal->addField('item_name_' . $i, stripslashes_deep($event_name) . ' | ' . __('Name:', 'event_espresso') . ' ' . stripslashes_deep($fname . ' ' . $lname) . ' | ' . __('Registrant Email:', 'event_espresso') . ' ' . $attendee_email);
    #        $myPaypal->addField('amount_' . $i, number_format($div, 2, '.', ''));
    #    }
    #} else {
    #$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . $registration_id . "' ORDER BY id ";
    //echo $sql;
    #$data = $wpdb->get_results($sql, ARRAY_A);
    #if ($wpdb->num_rows > 0) {
    $i = 1;
    $div = $event_cost / $quantity;
    #foreach ($data as $row)
    foreach ($attendees as $attendee) {
        #$afname = $row['fname'];
        #$alname = $row['lname'];
        #$aemail = $row['email'];
        #$myPaypal->addField('item_number_' . $i, $registration_id);
        $myPaypal->addField('item_name_' . $i, $attendee['attendee_info']); #stripslashes_deep($event_name) . ' | ' . __('Name:', 'event_espresso') . ' ' . stripslashes_deep($afname . ' ' . $alname) . ' | ' . __('Registrant Email:', 'event_espresso') . ' ' . $aemail);
        $myPaypal->addField('amount_' . $i, number_format($attendee['unit_price'], 2, '.', '')); #number_format($div, 2, '.', ''));
        $myPaypal->addField('quantity_' . $i, $attendee['quantity']);
        $i++;
    }
    #}
    #}
}

#else
#{
#    $myPaypal->addField('item_number', $registration_id);
#    $myPaypal->addField('item_name', stripslashes_deep($event_name) . ' | ' . __('Name:', 'event_espresso') . ' ' . stripslashes_deep($fname . ' ' . $lname) . ' | ' . __('Registrant Email:', 'event_espresso') . ' ' . $attendee_email);
#    $myPaypal->addField('amount', number_format($event_cost, 2, '.', ''));
#}

$myPaypal->addField('currency_code', $paypal_cur);
$myPaypal->addField('image_url', empty($paypal_settings['image_url']) ? '' : $paypal_settings['image_url']);
$myPaypal->addField('no_shipping ', $no_shipping);

//Post variables
$myPaypal->addField('first_name', $fname);
$myPaypal->addField('last_name', $lname);
$myPaypal->addField('email', $attendee_email);
$myPaypal->addField('address1', $address);
$myPaypal->addField('city', $city);
$myPaypal->addField('state', $state);
$myPaypal->addField('zip', $zip);

if ($amount_pd < $total_cost) {
    $myPaypal->addField('discount_amount_1', number_format($total_cost - $amount_pd, 2, '.', ''));
}


//Enable this function if you want to send payment notification before the person has paid.
//This function is copied on the payment processing page
//event_espresso_send_payment_notification($attendee_id, $txn_id, $amount_pd);
//Decide if you want to auto redirect to your payment website or display a payment button.
if (!empty($paypal_settings['bypass_payment_page']) && $paypal_settings['bypass_payment_page'] == 'Y') {
    $myPaypal->submitPayment(); //Enable auto redirect to payment site
} else {
    if (empty($paypal_settings['button_url'])) {
        if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/btn_stdCheckout2.gif")) {
            $button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/btn_stdCheckout2.gif";
        } else {
            $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/paypal/btn_stdCheckout2.gif";
        }
    } elseif (file_exists($paypal_settings['button_url'])) {
        $button_url = $paypal_settings['button_url'];
    } else {
        //If no other buttons exist, then use the default location
        $button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/paypal/btn_stdCheckout2.gif";
    }
    $myPaypal->submitButton($button_url, 'paypal'); //Display payment button
}

if ($use_sandbox == true) {

    echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Paypal Debug Mode Is Turned On', 'event_espresso') . '</h3>';
    $myPaypal->dump_fields(); // for debugging, output a table of all the fields
}
