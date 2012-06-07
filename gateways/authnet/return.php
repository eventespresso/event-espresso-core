<?php
// Include the authorize.net library
include_once ('Authorize.php');
echo '<!--Event Espresso Authorize.net SIM Gateway Version ' . $authnet_gateway_version . '-->';
// Create an instance of the authorize.net library
$myAuthorize = new EE_Authorize();

// Log the IPN results
$myAuthorize->ipnLog = TRUE;

$authnet_login_id = $payment_settings['authnet_sim']['authnet_login_id'];
$authnet_transaction_key = $payment_settings['authnet_sim']['authnet_transaction_key'];

// Enable test mode if needed
//4007000000027  <-- test successful visa
//4222222222222  <-- test failure card number
if ($payment_settings['authnet_sim']['use_sandbox']) {
	$myAuthorize->enableTestMode();
	$email_transaction_dump = true;
}

// Specify your authorize login and secret
$myAuthorize->setUserInfo($authnet_login_id, $authnet_transaction_key);

// Check validity and write down it
if ($myAuthorize->validateIpn()) {

	$txn_type = $myAuthorize->ipnData['x_method'];
	$txn_id = $myAuthorize->ipnData['x_trans_id'];
	$amount_pd = $myAuthorize->ipnData['x_amount'];
	$attendee_id = $myAuthorize->ipnData['x_cust_id'];
	$payment_date = date("d-m-Y");

	//file_put_contents('authorize.txt', 'SUCCESS' . date("m-d-Y")); //Used for debugging purposes
	//Be sure to echo something to the screen so authent knows that the ipn works
	//store the results in reusable variables
	if ($myAuthorize->ipnData['x_response_code'] == 1) {
		?>
		<h2><?php _e('Thank You!', 'event_espresso'); ?></h2>
		<p><?php _e('Your transaction has been processed.', 'event_espresso'); ?></p>
		<?php
		$payment_status = 'Completed';
		$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ";
		$sql .= $id == '' ? '' : " AND id= '" . $id . "' ";
		$sql .= " ORDER BY id LIMIT 0,1";

		$attendees = $wpdb->get_results($sql);
		foreach ($attendees as $attendee) {
			$attendee_id = $attendee->id;
			$att_registration_id = $attendee->registration_id;
			$lname = $attendee->lname;
			$fname = $attendee->fname;
			$amount_pd = $attendee->amount_pd;
			$total_cost = $attendee->amount_pd;
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
	} else {
		?>
		<h2 style="color:#F00;"><?php _e('There was an error processing your transaction!', 'event_espresso'); ?></h2>
		<p><strong>Error:</strong> (<?php echo $response_reason_code; ?> - <?php echo $response_reason_code; ?>) - <?php echo $response_reason_text; ?></p>
		<?php
		$payment_status = 'Payment Declined';
	}
	global $wpdb;

	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_status . "', txn_type = '" . $txn_type . "', txn_id = '" . $txn_id . "', payment_date ='" . $payment_date . "', transaction_details = '" . serialize($myAuthorize) . "'  WHERE registration_id ='" . espresso_registration_id($attendee_id) . "'";

	$wpdb->query($sql);

	//Debugging option
	//$email_transaction_dump=true;
	if ($email_transaction_dump == true) {
		// For this, we'll just email ourselves ALL the data as plain text output.
		$subject = 'Authorize.net Notification - Gateway Variable Dump';
		$body = "An authorize.net payment notification was successfully recieved\n";
		$body .= "from " . $myAuthorize->ipnData['x_email'] . " on " . date('m/d/Y');
		$body .= " at " . date('g:i A') . "\n\nDetails:\n";
		foreach ($myAuthorize->ipnData as $key => $value) {
			$body .= "\n$key: $value\n";
		}
		wp_mail($contact, $subject, $body);
	}
} else {
	file_put_contents('authorize.txt', "FAILURE\n\n" . $myAuthorize->ipnData);
	//echo something to the screen so authent knows that the ipn works
	$subject = 'Instant Payment Notification - Gateway Variable Dump';
	$body = "An instant payment notification failed\n";
	$body .= "from " . $myAuthorize->ipnData['x_email'] . " on " . date('m/d/Y');
	$body .= " at " . date('g:i A') . "\n\nDetails:\n";
	foreach ($myAuthorize->ipnData as $key => $value) {
		$body .= "\n$key: $value\n";
	}
	wp_mail($contact, $subject, $body);
}

function espresso_process_authnet_sim($EE_Session) {
	// Setup class
	include_once ('Authorize.php');
	echo '<!--Event Espresso Authorize.net Gateway Version ' . $authnet_gateway_version . '-->';
	global $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$myAuthorize = new EE_Authorize(); // initiate an instance of the class

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$authnet_login_id = empty($payment_settings['authnet_sim']['authnet_login_id']) ? '' : $payment_settings['authnet_sim']['authnet_login_id'];
	$authnet_transaction_key = empty($payment_settings['authnet_sim']['authnet_transaction_key']) ? '' : $payment_settings['authnet_sim']['authnet_transaction_key'];
	$button_type = empty($payment_settings['authnet_sim']['button_type']) ? '' : $payment_settings['authnet_sim']['button_type'];
//$button_url = $payment_settings['authnet_sim']['button_url'];
	$image_url = empty($payment_settings['authnet_sim']['image_url']) ? '' : $payment_settings['authnet_sim']['image_url'];
	$use_sandbox = $payment_settings['authnet_sim']['use_sandbox'];
	$use_testmode = $payment_settings['authnet_sim']['test_transactions'];
	if ($use_testmode == true) {
		// Enable test mode if needed
		$myAuthorize->enableTestMode();
	}
	if ($use_sandbox == true) {
		// Enable test mode if needed
		$myAuthorize->useTestServer();
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
	if (!empty($payment_settings['authnet_sim']['bypass_payment_page'])) {
		$myAuthorize->submitPayment(); //Enable auto redirect to payment site
	} else {
		if (empty($payment_settings['authnet_sim']['button_url'])) {
			//$button_url = EVENT_ESPRESSO_GATEWAY_URL . "authnet/btn_cc_vmad.gif";
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif")) {
				$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif";
			} else {
				$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/btn_cc_vmad.gif";
			}
		} elseif (file_exists($payment_settings['authnet_sim']['button_url'])) {
			$button_url = $payment_settings['authnet_sim']['button_url'];
		} else {
			//If no other buttons exist, then use the default location
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/btn_cc_vmad.gif";
		}
		$myAuthorize->submitButton($button_url, 'authnet'); //Display payment button
	}

	if ($use_sandbox == true || $use_testmode == true) {
		echo '<p>Test credit card # 4007000000027</p>';
		echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
		$myAuthorize->dump_fields(); // for debugging, output a table of all the fields
	}
}