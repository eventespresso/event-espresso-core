<?php

/**
 * function espresso_prepare_payment_data_for_gateways
 * @global type $wpdb
 * @global type $org_options
 * @param type $payment_data
 * attendee_id
 * @return type $payment_data
 * contact
 * email
 * event_id
 * registration_id
 * attendee_session
 * event_name
 * lname
 * fname
 * payment_status
 * payment_date
 */
function espresso_prepare_payment_data_for_gateways($payment_data) {
	global $wpdb, $org_options;
	$sql = "SELECT ea.email, ea.event_id, ea.registration_id, ea.txn_type, ed.start_date,";
	$sql .= " ea.attendee_session, ed.event_name, ea.lname, ea.fname, ea.total_cost,";
	$sql .= "	ea.payment_status, ea.payment_date, ea.address, ea.city, ea.txn_id,";
	$sql .= " ea.zip, ea.state, ea.phone FROM " . EVENTS_ATTENDEE_TABLE . " ea";
	$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=ea.event_id";
	$sql .= " WHERE ea.id='" . $payment_data['attendee_id'] . "'";
	$temp_data = $wpdb->get_row($sql, ARRAY_A);
	$payment_data = array_merge($payment_data, $temp_data);
	$payment_data['contact'] = $org_options['contact_email'];
	return $payment_data;
}

add_filter('filter_hook_espresso_prepare_payment_data_for_gateways', 'espresso_prepare_payment_data_for_gateways');

/**
 * function espresso_get_total_cost
 * @global type $wpdb
 * @param array $payment_data
 * attendee_session
 * @return array $payment_data
 * total_cost
 * quantity
 */
function espresso_get_total_cost($payment_data) {
	global $wpdb;
	$sql = "SELECT ac.cost, ac.quantity, dc.coupon_code_price, dc.use_percentage  FROM " . EVENTS_ATTENDEE_TABLE . " a ";
	$sql .= " JOIN " . EVENTS_ATTENDEE_COST_TABLE . " ac ON a.id=ac.attendee_id ";
	$sql .= " LEFT JOIN " . EVENTS_DISCOUNT_CODES_TABLE . " dc ON a.coupon_code=dc.coupon_code ";
	$sql .= " WHERE a.attendee_session='" . $payment_data['attendee_session'] . "'";
	$tickets = $wpdb->get_results($sql, ARRAY_A);
	$total_cost = 0;
	$total_quantity = 0;
	foreach ($tickets as $ticket) {
		$total_cost += $ticket['quantity'] * $ticket['cost'];
		$total_quantity += $ticket['quantity'];
	}
	if (!empty($tickets[0]['coupon_code_price'])) {
		if ($tickets[0]['use_percentage'] == 'Y') {
			$payment_data['total_cost'] = $total_cost * (1 - ($tickets[0]['coupon_code_price'] / 100));
		} else {
			$payment_data['total_cost'] = $total_cost - $tickets[0]['coupon_code_price'];
		}
	} else {
		$payment_data['total_cost'] = $total_cost;
	}
	$payment_data['quantity'] = $total_quantity;
	return $payment_data;
}

add_filter('filter_hook_espresso_get_total_cost', 'espresso_get_total_cost');

/**
 * function espresso_update_attendee_payment_status_in_db
 * @global type $wpdb
 * @param array $payment_data
 * attendee_id    set by function in individual gateway
 * attendee_session  set by filter_hook_espresso_prepare_payment_data_for_gateways
 * total_cost     set by filter_hook_espresso_get_total_cost
 *                 the rest are set by gateway
 * payment_status
 * txn_type
 * txn_id
 * txn_details
 *
 * @return array $payment_data
 * payment_date
 */
function espresso_update_attendee_payment_status_in_db($payment_data) {
	global $wpdb;
	$payment_data['payment_date'] = date(get_option('date_format'));
	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET amount_pd = '" . $payment_data['total_cost'] . "' WHERE id ='" . $payment_data['attendee_id'] . "' ";
	$wpdb->query($sql);

	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_data['payment_status'] . "', txn_type = '" . $payment_data['txn_type'] . "', txn_id = '" . $payment_data['txn_id'] . "', payment_date ='" . $payment_data['payment_date'] . "', transaction_details = '" . $payment_data['txn_details'] . "' WHERE attendee_session ='" . $payment_data['attendee_session'] . "' ";
	$wpdb->query($sql);
	return $payment_data;
}

add_filter('filter_hook_espresso_update_attendee_payment_data_in_db', 'espresso_update_attendee_payment_status_in_db');

/**
 * function espresso_prepare_event_link
 * @param array $payment_data
 * attendee_session
 * @return array $payment_data
 * event_link
 */
function espresso_prepare_event_link($payment_data) {
	global $wpdb;
	$sql = "SELECT  ea.event_id, ed.event_name FROM " . EVENTS_ATTENDEE_TABLE . " ea";
	$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=ea.event_id";
	$sql .= " WHERE ea.attendee_session='" . $payment_data['attendee_session'] . "'";
	$events = $wpdb->get_results($sql, OBJECT_K);
	$payment_data['event_link'] = '';
	foreach ($events as $event) {
		$event_url = espresso_reg_url($event->event_id);
		$payment_data['event_link'] .= '<a href="' . $event_url . '">' . $event->event_name . '</a><br />';
	}
	return $payment_data;
}

add_filter('filter_hook_espresso_prepare_event_link', 'espresso_prepare_event_link');

function event_espresso_txn() {
	global $wpdb, $org_options, $espresso_wp_user;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	if (empty($active_gateways)) {
		$subject = __('Website Payment IPN Not Setup', 'event_espresso');
		$body = sprintf(__('The IPN for %s at %s has not been properly setup and is not working. Date/time %s', 'event_espresso'), $org_options['organization'], home_url(), date('g:i A'));
		wp_mail($org_options['contact_email'], $subject, $body);
		return;
	}
	foreach ($active_gateways as $gateway => $path) {
		require_once($path . "/init.php");
	}
	$payment_data['attendee_id'] = apply_filters('filter_hook_espresso_transactions_get_attendee_id', '');
	if ($payment_data['attendee_id'] == "") {
		echo "ID not supplied.";
	} else {
		$payment_data = apply_filters('filter_hook_espresso_prepare_payment_data_for_gateways', $payment_data);
		$payment_data = apply_filters('filter_hook_espresso_transactions_get_payment_data', $payment_data);

		extract($payment_data);

		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php"); //This is the path to the template file if available
		} else {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
		}
	}
	$_REQUEST['page_id'] = $org_options['return_url'];
	espresso_init_session();
}
add_shortcode('ESPRESSO_TXN_PAGE', 'event_espresso_txn');

function deal_with_ideal() {
	if (!empty($_POST['bank_id'])) {
		$active_gateways = get_option('event_espresso_active_gateways', array());
		if (!empty($active_gateways['ideal'])) {
			$path = $active_gateways['ideal'];
			require_once($path . '/init.php');
			$payment_data['attendee_id'] = apply_filters('filter_hook_espresso_transactions_get_attendee_id', '');
			espresso_process_ideal($payment_data);
		}
	}
}

add_action('wp_loaded', 'deal_with_ideal');

function espresso_email_after_payment($payment_data) {
	global $org_options;
	if ($payment_data['payment_status'] == 'Completed') {
		event_espresso_send_payment_notification(array('attendee_id' => $payment_data['attendee_id']));
		if ($org_options['email_before_payment'] == 'N') {
			event_espresso_email_confirmations(array('session_id' => $payment_data['attendee_session'], 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
		}
	}
}

add_action('action_hook_espresso_email_after_payment', 'espresso_email_after_payment');