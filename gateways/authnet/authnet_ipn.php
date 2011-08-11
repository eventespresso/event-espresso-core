<?php
// Include the authorize.net library
include_once ('Authorize.php');
echo '<!--Event Espresso Authorize.net SIM Gateway Version ' . $authnet_gateway_version . '-->';
// Create an instance of the authorize.net library
$myAuthorize = new Authorize();

// Log the IPN results
$myAuthorize->ipnLog = TRUE;

$authnet_settings = get_option('event_espresso_authnet_settings');
$authnet_login_id = $authnet_settings['authnet_login_id'];
$authnet_transaction_key = $authnet_settings['authnet_transaction_key'];

// Enable test mode if needed
//4007000000027  <-- test successful visa
//4222222222222  <-- test failure card number
if ($authnet_settings['use_sandbox'] == '1'){
	$myAuthorize->enableTestMode();
	$email_transaction_dump = true;
}

// Specify your authorize login and secret
$myAuthorize->setUserInfo($authnet_login_id, $authnet_transaction_key);

// Check validity and write down it
if ($myAuthorize->validateIpn()){
	
	$txn_type = $myAuthorize->ipnData['x_method'];
	$txn_id = $myAuthorize->ipnData['x_trans_id'];
	$amount_pd = $myAuthorize->ipnData['x_amount'];
	$attendee_id = $myAuthorize->ipnData['x_cust_id'];	
	$payment_date = date("d-m-Y");
	
    //file_put_contents('authorize.txt', 'SUCCESS' . date("m-d-Y")); //Used for debugging purposes
	//Be sure to echo something to the screen so authent knows that the ipn works
	//store the results in reusable variables	
	if ($myAuthorize->ipnData['x_response_code'] == 1){
?>
        <h2><?php _e('Thank You!','event_espresso'); ?></h2>
        <p><?php _e('Your transaction has been processed.','event_espresso'); ?></p>
<?php 
		$payment_status = 'Completed';
		$sql = "SELECT * FROM ". EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ";
			$sql .= $id ==''?'':" AND id= '".$id."' ";
			$sql .= " ORDER BY id LIMIT 0,1";
			
			$attendees = $wpdb->get_results($sql);
			foreach ($attendees as $attendee){
				$attendee_id = $attendee->id;
				$att_registration_id = $attendee->registration_id;
				$lname = $attendee->lname;
				$fname = $attendee->fname;
				$amount_pd = $attendee->amount_pd;
				$event_id = $attendee->event_id;
				
			}
			
			$events = $wpdb->get_results( "SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'" );
			foreach ( $events as $event ) {
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
	}else{
?>
        <h2 style="color:#F00;"><?php _e('There was an error processing your transaction!','event_espresso'); ?></h2>
        <p><strong>Error:</strong> (<?php echo $response_reason_code;?> - <?php echo $response_reason_code;?>) - <?php echo $response_reason_text;?></p>
<?php
		$payment_status = 'Payment Declined';
	}
	global $wpdb;
			
	$sql = "UPDATE ". EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_status . "', txn_type = '" . $txn_type . "', txn_id = '" . $txn_id . "', payment_date ='" . $payment_date . "', transaction_details = '" . serialize($myAuthorize) . "'  WHERE registration_id ='" . espresso_registration_id($attendee_id) . "'";

	$wpdb->query($sql);
			
  //Debugging option
	$email_transaction_dump=true;
  if ($email_transaction_dump == true) {
     // For this, we'll just email ourselves ALL the data as plain text output.
     $subject = 'Authorize.net Notification - Gateway Variable Dump';
     $body =  "An authorize.net payment notification was successfully recieved\n";
     $body .= "from ".$myAuthorize->ipnData['x_email']." on ".date('m/d/Y');
     $body .= " at ".date('g:i A')."\n\nDetails:\n";
     foreach ($myAuthorize->ipnData as $key => $value) { $body .= "\n$key: $value\n"; }
     wp_mail($contact, $subject, $body);
  }
			
}
else
{
  file_put_contents('authorize.txt', "FAILURE\n\n" . $myAuthorize->ipnData);
  //echo something to the screen so authent knows that the ipn works
  $subject = 'Instant Payment Notification - Gateway Variable Dump';
  $body =  "An instant payment notification failed\n";
  $body .= "from ".$myAuthorize->ipnData['x_email']." on ".date('m/d/Y');
  $body .= " at ".date('g:i A')."\n\nDetails:\n";
  foreach ($myAuthorize->ipnData as $key => $value) { $body .= "\n$key: $value\n"; }
  wp_mail($contact, $subject, $body);
}
