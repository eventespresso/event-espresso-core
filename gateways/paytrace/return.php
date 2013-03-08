<?php

require_once(dirname(__FILE__) . '/paytrace.class.php');
$cls_paytrace = new ClsPaytrace();
global $espresso_wp_user, $wpdb;
$payment_settings = get_option('payment_data_' . $espresso_wp_user);
$paytrace_settings = $payment_settings['paytrace'];

$attendee_id = 0;
$primary_registration_id = "";
$registration_id = "";
$amount_pd = 0.00;
$multi_reg = false;
$event_ids = array();
$event_link = "";

if (isset($_POST['id']) && is_numeric($_POST['id']) && $_POST['id'] > 0) {
	$attendee_id = $_POST['id'];
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

	$attendees = array();
	$total = 0.00;
	$amount_pd = 0.00;
	$line_item = "";
	foreach ($registration_ids as $registration_id) {

		$sql = "select ea.registration_id, ea.id as attendee_id, ea.amount_pd, ed.id as event_id, ed.event_name, ed.start_date, ea.fname, ea.lname, eac.quantity, eac.cost from " . EVENTS_ATTENDEE_TABLE . " ea
				inner join " . EVENTS_ATTENDEE_COST_TABLE . " eac on ea.id = eac.attendee_id
				inner join " . EVENTS_DETAIL_TABLE . " ed on ea.event_id = ed.id
				where ea.registration_id = '" . $registration_id . "' order by ed.event_name ";

		$tmp_attendees = $wpdb->get_results($sql, ARRAY_A);

		foreach ($tmp_attendees as $tmp_attendee) {
			$sub_total = $tmp_attendee["cost"] * $tmp_attendee["quantity"];
			$attendees[] = array("attendee_info" => $tmp_attendee["event_name"] . "[" . date('m-d-Y', strtotime($tmp_attendee['start_date'])) . "]" . " >> " . $tmp_attendee["fname"] . " " . $tmp_attendee["lname"],
					"quantity" => $tmp_attendee["quantity"],
					"cost" => doubleval($tmp_attendee["cost"]),
					"sub_total" => doubleval($sub_total));
			$line_item .= "LINEITEM~PRODUCTID=" . $tmp_attendee['attendee_id'] . "+DESCRIPTION=" . $tmp_attendee["event_name"] . "[" . date('m-d-Y', strtotime($tmp_attendee['start_date'])) . "]" . " >> " . $tmp_attendee["fname"] . " " . $tmp_attendee["lname"] . "
							QUANTITY=" . $tmp_attendee['quantity'] . "UNITCOST=" . $tmp_attendee['cost'] . "+AMOUNTLI=" . $sub_total . "+|";
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
	$cc = $_POST['cc'];
	$exp_month = $_POST['exp_month'];
	$exp_year = $_POST['exp_year'];
	$csc = $_POST['csc'];
	$bname = $_POST['first_name'] . " " . $_POST['last_name'];
	$baddress = $_POST['address'];
	$bcity = $_POST['city'];
	$bzip = $_POST['zip'];
	$email = $_POST['email'];


	$response = $cls_paytrace->do_transaction($amount_pd, $discount, $line_item, $cc, $csc, $exp_month, $exp_year, $csc, $bname, $baddress, $bcity, $bstate, $bzip, $email);
	if (isset($response['status'])) {
		echo "<div id='paytrace_response'>";
		if ($response['status'] > 0) {
			echo "<div class='paytrace_status'>" . $response['msg'] . "</div>";
			$payment_status = 'Completed';
			$payment_date = date("d-m-Y");
			$txn_type = 'PayTrace';
			$txn_id = $response['transaction_data']['TRANSACTIONID'];
			foreach ($registration_ids as $registration_id) {
				$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_id = '{$txn_id}', txn_type = '{$txn_type}'
				, amount_pd = '{$amount_pd}', payment_date ='" . date("Y-m-d H:i:s") . "' WHERE registration_id = '{$registration_id}' ";
				$wpdb->query($sql);
			}
		}

		if (isset($response['error_msg']) && strlen(trim($response['error_msg'])) > 0) {
			echo "<div class='paytrace_error'>ERROR: " . $response['error_msg'] . "  </div>";
		}
		echo "</div>";
		$att_registration_id = $primary_registration_id;
		$row = $wpdb->get_row("select * from " . EVENTS_ATTENDEE_TABLE . " where registration_id = '{$att_registration_id}' order by id limit 1 ");
		$fname = $row->fname;
		$lname = $row->lname;
		$tmp_event_link = array();
		foreach ($event_ids as $event_id) {
			$row = $wpdb->get_row("select * from " . EVENTS_DETAIL_TABLE . " where id = $event_id ");
			$tmp_event_link[] = $row->event_name;
		}
		$event_link = implode(",", $tmp_event_link);
		// Copying actual amount owed/due to total_cost because the variable total_cost is being used in the payment_overview template
		$total_cost = $amount_pd;
	} else {
		echo "<div id='paytrace_response' class='paytrace_error'>Looks like something went wrong.  Please try again or notify the website administrator.</div>";
	}
} else {
	echo "<div id='paytrace_response' class='paytrace_error'>Looks like something went wrong.  Please try again or notify the website administrator.</div>";
}