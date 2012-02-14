<?php

/*
 * included in process_payments.php
 *
 */

function espresso_2checkout_process_payment() {

	if ($_REQUEST['credit_card_processed'] == 'Y') {
		global $wpdb, $org_options, $payment_settings;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
				espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		$reg_id = espresso_registration_id($_GET['id']);
		$event_id = $_REQUEST['event_id'];
		$result['payment_status'] = 'Completed';
		$result['payment_date'] = date("d-m-Y");
		$result['total_cost'] = $_REQUEST['total'];
		$result['txn_type'] = '2CO';
		$result['txn_id'] = $_REQUEST['invoice_id'];


		$sql = "SELECT registration_id, lname, fname FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . $reg_id . "' ";
		$sql .= " ORDER BY id LIMIT 0,1";
		$attendees = $wpdb->get_results($sql);

		foreach ($attendees as $attendee) {
			$result['att_registration_id'] = $attendee->registration_id;
			$result['lname'] = $attendee->lname;
			$result['fname'] = $attendee->fname;
		}

		$events = $wpdb->get_results("SELECT event_name FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");

		foreach ($events as $event) {
			$event_name = $event->event_name;
		}

		$event_url = home_url() . "/?page_id=" . $org_options['event_page_id'] . "&regevent_action=register&event_id=" . $event_id;
		$result['event_link'] = '<a href="' . $event_url . '">' . $event_name . '</a>';

		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET
				payment_status = '" . $result['payment_status'] . "',
				txn_id = '" . $result['txn_id'] . "',
				txn_type = '" . $result['txn_type'] . "',
				amount_pd = '" . $result['total_cost'] . "',
				payment_date ='" . $result['payment_date'] . "'
				WHERE registration_id ='" . $reg_id . "' ";
		$wpdb->query($sql);
		return $result;
	} else {
		return "Failure";
	}
}