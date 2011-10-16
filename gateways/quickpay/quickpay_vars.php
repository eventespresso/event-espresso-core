<?php
global $wpdb;
$quickpay_settings = get_option('event_espresso_quickpay_settings');
$sessionid = $_SESSION['espresso_session_id'];
$transaction_id = uniqid(md5(rand(1,666)), true); // Set the transaction id to a unique value for reference in the system.
$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/quickpay/qp-logo.gif";
$md5secret = $quickpay_settings['quickpay_md5secret'];
$payurl = "https://secure.quickpay.dk/form/";
$protocol = '3';
$msgtype = 'authorize';
$merchant = $quickpay_settings['quickpay_merchantid'];
$language = $quickpay_settings['quickpay_language'];
$amount = 0.00;
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
	foreach ($registration_ids as $registration_id) {
		$sql = "select ea.registration_id, ea.id as attendee_id, ea.amount_pd, ed.id as event_id," .
						"ed.event_name, ed.start_date, ea.fname, ea.lname, eac.quantity, eac.cost from " .
						EVENTS_ATTENDEE_TABLE . " ea inner join " . EVENTS_ATTENDEE_COST_TABLE .
						" eac on ea.id = eac.attendee_id inner join " . EVENTS_DETAIL_TABLE .
						" ed on ea.event_id = ed.id where ea.registration_id = '" . $registration_id . "' order by ed.event_name ";
		$tmp_attendees = $wpdb->get_results($sql, ARRAY_A);
		foreach ($tmp_attendees as $tmp_attendee) {
			$amount += $tmp_attendee["amount_pd"];
		}
	}
}
$ordernumber = substr($registration_ids[0], 0, 14);
$currency = $quickpay_settings['quickpay_currency'];

$transact_url = home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&attendee_action=post_payment&form_action=payment';
$params = array('chronopay_callback' => 'true', 'transaction_id' => $transaction_id, 'sessionid' => $sessionid);
$continueurl = add_query_arg($params, $transact_url);

$transact_url = home_url() . '/?page_id=' . $org_options['cancel_return'];
$params = array('chronopay_callback' => 'cancel', 'transaction_id' => $transaction_id, 'sessionid' => $sessionid);
$cancelurl = add_query_arg($params, $transact_url);

$transact_url = home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&attendee_action=post_payment&form_action=payment';
$params = array('chronopay_callback' => 'error', 'transaction_id' => $transaction_id, 'sessionid' => $sessionid);
$callbackurl = add_query_arg($params, $transact_url);

$autocapture = $quickpay_settings['quickpay_autocapture'];
$cardtypelock = 'creditcard';
$sandbox = ($quickpay_settings['use_sandbox']) ? '1' : '';
$md5check = md5($protocol . $msgtype . $merchant . $language . $ordernumber . $amount . $currency . $continueurl . $cancelurl . $callbackurl . $autocapture . $cardtypelock . $sandbox . $md5secret);
?>
<form id="quickpay_form" name="quickpay_form" action="<?php echo $payurl; ?>" method="post">
	<input type="hidden" name="protocol" value="<?php echo $protocol; ?>" />
	<input type="hidden" name="msgtype" value="<?php echo $msgtype; ?>" />
	<input type="hidden" name="merchant" value="<?php echo $merchant; ?>" />
	<input type="hidden" name="language" value="<?php echo $language; ?>" />
	<input type="hidden" name="ordernumber" value="<?php echo $ordernumber; ?>" />
	<input type="hidden" name="amount" value="<?php echo $amount; ?>" />
	<input type="hidden" name="currency" value="<?php echo $currency; ?>" />
	<input type="hidden" name="continueurl" value="<?php echo $continueurl; ?>" />
	<input type="hidden" name="cancelurl" value="<?php echo $cancelurl; ?>" />
	<input type="hidden" name="callbackurl" value="<?php echo $callbackurl; ?>" />
	<input type="hidden" name="autocapture" value="<?php echo $autocapture; ?>" />
	<input type="hidden" name="cardtypelock" value="<?php echo $cardtypelock; ?>" />
	<?php if($quickpay_settings['use_sandbox'])  { ?><input type="hidden" name="testmode" value="1" /><?php } ?>
	<input type="hidden" name="md5check" value="<?php echo $md5check; ?>" />
	<input class="espresso_payment_button_quickpay" value="Payvalue" type="image" alt="Pay using quickpay" src="<?php echo $button_url; ?>" />
</form>