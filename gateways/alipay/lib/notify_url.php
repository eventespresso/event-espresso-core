<?php

$r = '';
foreach ( $_REQUEST as $k => $v ) {
	$r .= "   $k = $v\n";
}
define( 'WP_USE_THEMES', false );

require_once('../../../../../wp-blog-header.php');

$attendee_id = $_POST['out_trade_no'];
$payment_date = $_POST['notify_time'];
$txn_id = $_POST['notify_id'];
$amount_pd = $_POST['total_fee'];
$txn_type = $_POST['notify_type'];

$alipay_settings = get_option('event_espresso_alipay_settings');
require_once("alipay_notify.php");
require_once("alipay_config.php");
$alipay = new alipay_notify( $partner, $security_code, $sign_type, $_input_charset, $transport );
$verify_result = $alipay->notify_verify();
if ( $verify_result )
{
	// out_trade_no= $_POST["out_trade_no"]
	// status = $_POST["trade_status"]
	// put the database string here, to update the database


		$payment_status = 'Completed';
		global $wpdb;
		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_type = '$txn_type', txn_id = '$txn_id', amount_pd = '$amount_pd',  payment_date ='$payment_date', transaction_details = '" . serialize( $_POST ) . "' WHERE registration_id ='" . espresso_registration_id( $attendee_id ) . "' ";
		$wpdb->query( $sql );


		$email_before_payment = $org_options['email_before_payment'];

		//Send payment confirmation emails
		event_espresso_send_payment_notification(array('attendee_id'=>$attendee_id));

		//Send the email confirmation
		//@params $attendee_id, $send_admin_email, $send_attendee_email
		if ( $email_before_payment == 'N' )
		{
			event_espresso_email_confirmations(array('attendee_id' => $attendee_id,'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
		}

	echo "success";

	log_result("verify_success");
}
else
{
	echo "fail";

	log_result ("verify_failed");
}


function log_result( $word ) {
	$fp = fopen( "log.txt", "a" );
	flock( $fp, LOCK_EX );
	fwrite( $fp, $word . "��execution date ��" . strftime( "%Y%m%d%H%I%S", time() ) . "\t\n" );
	flock( $fp, LOCK_UN );
	fclose( $fp );
}

?>