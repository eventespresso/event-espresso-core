<?php
global $wpdb;
$quickpay_settings = get_option('event_espresso_quickpay_settings');
$md5secret = $quickpay_settings['quickpay_md5secret'];

$sql = "SELECT txn_id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id='" . $attendee_id . "' ";
$txn_id = $wpdb->get_var($sql);


	// *************************
	// *** CONFIRMED PAYMENT ***
	// *************************
	if($_GET['chronopay_callback'] == 'true'){
		$transaction_id = trim(stripslashes($_GET['transaction_id']));
		$sessionid = trim(stripslashes($_GET['sessionid']));
		if(md5($transaction_id . $md5secret)==$txn_id) {
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
					$sql = "select id from " . EVENTS_ATTENDEE_TABLE . " where registration_id = '" . $registration_id . "' ";
					$tmp_attendees = $wpdb->get_results($sql, ARRAY_A);
					foreach ($tmp_attendees as $tmp_attendee) {
						$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET
							payment_status = 'Completed',
							txn_type = 'Quickpay'
							WHERE id='" . $tmp_attendee['id'] . "' ";
						$wpdb->query($sql);
					}
				}
			}
			
		}
	}

	// *************************
	// *** CANCELLED PAYMENT ***
	// *************************

	if($_GET['chronopay_callback'] == 'cancel'){

		$sessionid = trim(stripslashes($_GET['sessionid']));


	}

?>
