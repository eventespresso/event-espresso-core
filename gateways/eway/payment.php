<?php

// Setup class
include_once ('Eway.php');
echo '<!-- Event Espresso eway Gateway Version ' . $eway_gateway_version . '-->';
$myeway = new eway(); // initiate an instance of the class
global $org_options;
do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
$payment_settings = get_option('payment_data_' . $espresso_wp_user);
$eway_settings = $payment_settings['eway'];
$eway_id = $eway_settings['eway_id'];
$eway_username = $eway_settings['eway_username'];
//$image_url = $eway_settings['button_url'];
$eway_cur = $eway_settings['currency_format'];
$use_sandbox = $eway_settings['use_sandbox'];

$quantity = isset($quantity) && $quantity > 0 ? $quantity : espresso_count_attendees_for_registration($attendee_id);
if ($use_sandbox == 1) {
	// Enable test mode if needed
	$myeway->enableTestMode();
	$myeway->addField('CustomerID', '87654321');
	$myeway->addField('UserName', 'TestAccount');
} else {
	$myeway->addField('CustomerID', $eway_id);
	$myeway->addField('UserName', $eway_username);
}
$myeway->addField('Amount', number_format($event_cost, 2, '.', ''));
$myeway->addField('Currency', $eway_cur);
$myeway->addField('PageTitle', '');
$myeway->addField('PageDescription', '');
$myeway->addField('PageFooter', '');
$myeway->addField('Language', '');
$myeway->addField('CompanyName', str_replace("&", "%26", $org_options['organization']));
$myeway->addField('CustomerFirstName', $fname);
$myeway->addField('CustomerLastName', $lname);
$myeway->addField('CustomerAddress', $address);
$myeway->addField('CustomerCity', $city);
$myeway->addField('CustomerState', $state);
$myeway->addField('CustomerPostCode', $zip);
$myeway->addField('CustomerCountry', '');
$myeway->addField('CustomerEmail', $attendee_email);
$myeway->addField('CustomerPhone', $phone);
$myeway->addField('InvoiceDescription', stripslashes_deep($event_name) . ' | ' . __('Name:', 'event_espresso') . ' ' . stripslashes_deep($fname . ' ' . $lname) . ' | ' . __('Registrant Email:', 'event_espresso') . ' ' . $attendee_email . ' | ' . __('Total Registrants:', 'event_espresso') . ' ' . $quantity);
$myeway->addField('CancelURL', str_replace("&", "%26", home_url() . '/?page_id=' . $org_options['cancel_return']));
$myeway->addField('ReturnURL', str_replace("&", "%26", home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&event_id=' . $event_id . '&attendee_action=post_payment&form_action=payment'));
$myeway->addField('CompanyLogo', $eway_settings['image_url']);
$myeway->addField('PageBanner', '');
$myeway->addField('MerchantReference', '');
$myeway->addField('MerchantInvoice', '');
$myeway->addField('MerchantOption1', '');
$myeway->addField('MerchantOption2', '');
$myeway->addField('MerchantOption3', '');
$myeway->addField('ModifiableCustomerDetails', 'false');


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

