<?php

class EE_Payment_Data {
	public $id;
	// Set in constructor. The primary attendee's id.
	// arrays of classes
	public $attendees;
	public $events;
	public $registrations;
	public $payments;
	public $coupons;
	public $venues;
	public $countries;
	public $answers;
	public $emails;
	public $statuses;
	public $regions;
	//cost related info
	public $attendee_id;  // primary attendee id
	public $timestamp;
	public $type;
	public $total;
	public $status;
	public $tax_amount;
	public $tax_percent;  // boolean

	public function __construct($attendee_id = NULL) {
		$this->attendee_id = $attendee_id;
		$this->timestamp = time();
	}

	public function populate_data_from_db() {
		global $wpdb, $org_options;
		$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id='" . $this->attendee_id . "'";
		$result[0] = $wpdb->get_row($sql, ARRAY_A);
		if (empty($result)) do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $sql);
		$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id!='" . $this->attendee_id . "'";
		$sql .= " AND attendee_session='" . $result[0]['attendee_session'] . "'";
		$additional_attendees = $wpdb->get_results($sql, ARRAY_A);
		if (empty($additional_attendees)) do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $sql);
		$attendees = array_merge($result, $additional_attendees);
		foreach ($attendees as $attendee) {
			$attendee_object = new EE_Attendee($attendee['id']);
			$data=array('is_primary'=>$attendee['is_primary'],	'fname'=>$attendee['fname'], 'lname'=>$attendee['lname'], 'email'=>$attendee['email'], 'address'=>$attendee['address'], 'address2'=>$attendee['address2'], 'city'=>$attendee['city'], 'state'=>$attendee['state'], 'zip'=>$attendee['zip'], 'country_id'=>$attendee['country_id'], 'phone'=>$attendee['phone'], 'attendee_session'=>$attendee['attendee_session']);
			$attendee_object->poplulate_attendee_details_from_array($data);
			$this->attendees[] = $attendee_object;
		}
		$sql = "SELECT  ed.id FROM " . EVENTS_ATTENDEE_TABLE . " ea";
		$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ed.id=ea.event_id";
		$sql .= " WHERE ea.attendee_session='" . $this->attendees[0]->attendee_session . "'";
		$event_ids = array_unique($wpdb->get_col($sql));
		foreach ($event_ids as $event_id) {
			$event = new EE_Event($event_id);
			$event->poplulate_event_details_from_db();
			$this->events[] = $event;
		}
	}

	public function calculate_costs() {
		global $wpdb;
		$sql = "SELECT ac.cost, ac.quantity, dc.coupon_code_price, dc.use_percentage  FROM " . EVENTS_ATTENDEE_TABLE . " a ";
		$sql .= " JOIN " . EVENTS_ATTENDEE_COST_TABLE . " ac ON a.id=ac.attendee_id ";
		$sql .= " LEFT JOIN " . EVENTS_DISCOUNT_CODES_TABLE . " dc ON a.coupon_code=dc.coupon_code ";
		$sql .= " WHERE a.attendee_session='" . $this->attendees[0]->attendee_session . "'";
		$tickets = $wpdb->get_results($sql, ARRAY_A);
		$total_cost = 0;
		$total_quantity = 0;
		foreach ($tickets as $ticket) {
			$total_cost += $ticket['quantity'] * $ticket['cost'];
			$total_quantity += $ticket['quantity'];
		}
		if (!empty($tickets[0]['coupon_code_price'])) {
			if ($tickets[0]['use_percentage'] == 'Y') {
				$this->total_cost = $total_cost * (1 - ($tickets[0]['coupon_code_price'] / 100));
			} else {
				$this->total_cost = max($total_cost - $tickets[0]['coupon_code_price'], 0);
			}
		} else {
			$this->total_cost = $total_cost;
		}
		$this->quantity = $total_quantity;
		$this->discount_applied = $total_cost - $this->total_cost;
		$this->pre_discount_cost = $total_cost;
		$this->tickets = $tickets;
	}

	public function set_payment_date() {
		$this->payment_date = time();
	}

	public function write_payment_data_to_db() {
		global $wpdb;
		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET amount_pd = '" . $this->total_cost . "' WHERE id ='" . $this->attendee_id . "' ";
		$wpdb->query($sql);

		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $this->payment_status . "', txn_type = '" . $this->txn_type . "', txn_id = '" . $this->txn_id . "', payment_date ='" . $this->payment_date . "', transaction_details = '" . $this->txn_details . "' WHERE attendee_session ='" . $this->attendees[0]->attendee_session . "' ";
		$wpdb->query($sql);
	}

}

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
	$payment_data['payment_date'] = date_i18n(get_option('date_format'), time());
	return $payment_data;
}

/**
 * function espresso_get_total_cost
 * @global type $wpdb
 * @param array $payment_data
 * attendee_session
 * @return array $payment_data
 * pre_discount_cost
 * total_cost
 * quantity
 * discount_applied
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
	$payment_data['discount_applied'] = $total_cost - $payment_data['total_cost'];
	$payment_data['pre_discount_cost'] = $total_cost;
	$payment_data['tickets'] = $tickets;
	return $payment_data;
}

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
	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET amount_pd = '" . $payment_data['total_cost'] . "' WHERE id ='" . $payment_data['attendee_id'] . "' ";
	$wpdb->query($sql);

	$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_data['payment_status'] . "', txn_type = '" . $payment_data['txn_type'] . "', txn_id = '" . $payment_data['txn_id'] . "', payment_date ='" . $payment_data['payment_date'] . "', transaction_details = '" . $payment_data['txn_details'] . "' WHERE attendee_session ='" . $payment_data['attendee_session'] . "' ";
	$wpdb->query($sql);
	return $payment_data;
}
