<?php
/**
Use this file to add your affiliate tracking HTML code.

Don't have an affiliate service? Sign up here http://go.hasoffers.com/SHCf

Attention PayPal Standard users!!
If you are using PayPal standard. Please assign the "Auto Return URL (Thank You and Return Payment page)" setting to your "Transactions" page.

Usage Example:
<!-- Offer Conversion: 2012 Event Espresso -->
<iframe src="http://eventespresso.go2cloud.org/SL1?amount=<?php echo $total_cost; ?>&transaction_id=<?php echo $txn_id; ?>" scrolling="no" frameborder="0" width="1" height="1"></iframe>
<!-- // End Offer Conversion -->

Available Variables:
$fname - Attendee first name
$lname - Attendee last name
$total_cost - Total price paid
$amount_pd - Total price paid
$txn_id - Transaction id
$attendee_id - Attendee id
$registration_id - Registration id
$att_registration_id - Registration id
$payment_date - Payment date
$cost - Original price of the event

**/

?>
<!--Copy and paste your affiliate HTML below this line -->