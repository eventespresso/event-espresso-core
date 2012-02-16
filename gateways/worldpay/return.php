<?php

do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
echo "<WPDISPLAY ITEM=banner>";
if ($_REQUEST['transStatus'] == 'Y') {
	$payment_status = 'Completed';
	$sql = "SELECT ea.event_id, ed.event_name, ea.fname, ea.lname, ";
	$sql .= "ea.payment_date, ea.amount_pd total_cost, ";
	$sql .= "ea.registration_id att_registration_id FROM " . EVENTS_ATTENDEE_TABLE . " ea ";
	$sql .= "JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=ea.event_id ";
	$sql .= "WHERE ea.id = '" . $attendee_id . "'";
	$result = $wpdb->get_row($sql, ARRAY_A);
	extract($result);
	$event_link = '<a href="' . home_url() . '/?page_id=';
	$event_link .= $org_options['event_page_id'] . '&ee=' . $event_id . '">';
	$event_link .= $event_name . '</a>';
	$txn_id = $_REQUEST['transId'];
	$txn_type = 'WorldPay';
	$payment_date = date("m-d-Y");
	$SQL = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_id='$txn_id', txn_type='$txn_type', payment_date='$payment_date' WHERE id='$attendee_id'";
	$wpdb->query($SQL);
	event_espresso_send_payment_notification(array('attendee_id' => $attendee_id));
	if ($email_before_payment == 'N') {
		event_espresso_email_confirmations(array('attendee_id' => $attendee_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
	}
	if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
		require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php");
	} else {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
	}
	if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "affiliate_tracking.php")) {
		require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "affiliate_tracking.php");
	}
}
exit;