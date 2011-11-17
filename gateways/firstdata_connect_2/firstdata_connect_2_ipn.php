<?php
if($_REQUEST['status']=='APPROVED') {
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
	$txn_type = 'Firstdata Connect 2.0';
	$firstdata_connect_2_settings = get_option('event_espresso_firstdata_connect_2_settings');
	include("Fdggutil.php");
	$fdggutil = new Fdggutil($firstdata_connect_2_settings['storename'],
								$firstdata_connect_2_settings['sharedSecret']);
	$hash = $fdggutil->check_return_hash($payment_date);
	$txn_id = $_REQUEST['refnumber'];
}
var_dump($_REQUEST);
var_dump($hash);
var_dump($payment_date);
?>
