<?php

//Payment page - Used to display the payment options and the payment link in the email. Used with the [ESPRESSO_PAYMENTS] tag
//This is the initial PayPal button
function espresso_confirmation_page($attendee_id, $price_id = 0, $coupon_code = '', $groupon_code = '') {
  $conf_page_data['coupon_code'] = $coupon_code;
	$conf_page_data['groupon_code'] = $groupon_code;
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	//Debug
	//echo "<pre>".print_r($_REQUEST,true)."</pre>";
	//echo "<pre>".print_r($_SESSION,true)."</pre>";

	$today = date("m-d-Y");
	$conf_page_data['num_people'] = 0;

	$Organization = $org_options['organization'];
	$Organization_street1 = $org_options['organization_street1'];
	$Organization_street2 = $org_options['organization_street2'];
	$Organization_city = $org_options['organization_city'];
	$Organization_state = $org_options['organization_state'];
	$Organization_zip = $org_options['organization_zip'];
	$contact = $org_options['contact_email'];
	$registrar = $org_options['contact_email'];
	$currency_format = getCountryFullData($org_options['organization_country']);
	$currency_format = $currency_format['iso_code_3'];

	$message = $org_options['message'];
	$return_url = $org_options['return_url'];
	$cancel_return = $org_options['cancel_return'];
	$notify_url = $org_options['notify_url'];
	$conf_page_data['event_page_id'] = $org_options['event_page_id'];

	$attendees = $wpdb->get_results("SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='" . $attendee_id . "'");
	foreach ($attendees as $attendee) {
		$conf_page_data['attendee_id'] = $attendee->id;
		$attendee_last = $attendee->lname;
		$attendee_first = $attendee->fname;
		$attendee_address = $attendee->address;
		$attendee_address2 = $attendee->address2;
		$attendee_city = $attendee->city;
		$attendee_state = $attendee->state;
		$attendee_zip = $attendee->zip;
		$conf_page_data['attendee_email'] = $attendee->email;
		//$attendee_organization_name = $attendee->organization_name;
		//$attendee_country = $attendee->country_id;
		$phone = $attendee->phone;
		$attendee_phone = $attendee->phone;
		$date = $attendee->date;
		$quantity = $attendee->quantity;
		$payment_status = $attendee->payment_status;
		$txn_type = $attendee->txn_type;
		//$event_cost = $attendee->amount_pd;
		$payment_date = $attendee->payment_date;
		$conf_page_data['event_id'] = $attendee->event_id;
		$conf_page_data['registration_id'] = $attendee->registration_id;
	}
	$event_meta = event_espresso_get_event_meta($conf_page_data['event_id']);

	//Get the questions for the attendee
	$q_sql = "SELECT ea.answer, eq.question
						FROM " . EVENTS_ANSWER_TABLE . " ea
						LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id
						WHERE ea.attendee_id = '" . $conf_page_data['attendee_id'] . "' and eq.admin_only = 'N' ORDER BY eq.sequence asc ";
	$conf_page_data['questions'] = $wpdb->get_results($q_sql);
	//echo $q_sql;
	//echo $wpdb->last_query;
	$conf_page_data['display_questions'] = '';
	foreach ($conf_page_data['questions'] as $question) {
		$conf_page_data['display_questions'] .= '<p>' . $question->question . ':<br /> ' . str_replace(',', '<br />', $question->answer) . '</p>';
	}
	$num_peoplea = $wpdb->get_results("SELECT COUNT(registration_id) FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='" . $conf_page_data['registration_id'] . "'", ARRAY_N);
	$conf_page_data['num_people'] = $num_peoplea[0][0];

	//If we are using the number of attendees dropdown, and
	if ($quantity > 1) {
		$conf_page_data['num_people'] = $quantity;
	}

	$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id ='" . $conf_page_data['event_id'] . "'");
	foreach ($events as $event) {
		//$conf_page_data['event_id'] = $event->id;
		$conf_page_data['event_name'] = stripslashes_deep($event->event_name);
		$event_desc = stripslashes_deep($event->event_desc);
		$event_description = stripslashes_deep($event->event_desc);
		$event_identifier = $event->event_identifier;
		$send_mail = $event->send_mail;
		$active = $event->is_active;
		$conf_mail = $event->conf_mail;
		$event->wp_user = function_exists('espresso_manager_pro_version') ? $event->wp_user : 1;
		$payment_settings = get_option('payment_data_' . $event->wp_user);

		//$alt_email = $event->alt_email; //This is used to get the alternate email address that a payment can be made to using PayPal
		if (function_exists('event_espresso_coupon_payment_page')) {
			$use_coupon_code = $event->use_coupon_code;
		}
		if (function_exists('event_espresso_groupon_payment_page')) {
			$use_groupon_code = $event->use_groupon_code;
		}
	}

	$conf_page_data['attendee_name'] = stripslashes_deep($attendee_first . ' ' . $attendee_last);

	//Figure out if the person has registered using a price selection
	if (!empty($_REQUEST['price_select']) && $_REQUEST['price_select'] == true) {

		$price_options = explode('|', $_REQUEST['price_option'], 2);
		$price_id = $price_options[0];
		$price_type = $price_options[1];
		$conf_page_data['p_id'] = $price_id;
		$event_cost = event_espresso_get_final_price($price_id, $conf_page_data['event_id']);
	} elseif ($price_id > 0) {
		$event_cost = event_espresso_get_final_price($price_id, $conf_page_data['event_id']);
		$conf_page_data['p_id'] = $price_id;
	} else {
		//$event_cost = $_POST['event_cost'];
		$event_cost = event_espresso_get_final_price($_POST['price_id'], $conf_page_data['event_id']);
		$conf_page_data['p_id'] = $_POST['price_id'];
	}


	//Test the early discount amount to make sure we are getting the right amount
	//print_r(early_discount_amount($conf_page_data['event_id'], $event_cost));

	$conf_page_data['event_price'] = number_format($event_cost, 2, '.', '');
	$conf_page_data['event_price_x_attendees'] = number_format($event_cost * $conf_page_data['num_people'], 2, '.', '');
	$event_original_cost = number_format($event_cost * $conf_page_data['num_people'], 2, '.', '');

	/*
	 * Added for seating chart addon
	 */
	/*
	 * This code block overrides the cost using seating chart add-on price
	 */
	if (defined('ESPRESSO_SEATING_CHART')) {
		if (seating_chart::check_event_has_seating_chart($conf_page_data['event_id']) !== false) {
			$sc_cost_row = $wpdb->get_row("select sum(sces.purchase_price) as purchase_price from " . EVENTS_SEATING_CHART_EVENT_SEAT_TABLE . " sces inner join " . EVENTS_ATTENDEE_TABLE . " ea on sces.attendee_id = ea.id where ea.registration_id = '" . $conf_page_data['registration_id'] . "'");
			if ($sc_cost_row !== NULL) {
				$event_cost = number_format($sc_cost_row->purchase_price, 2, '.', '');
				$event_original_cost = $event_cost;
				$conf_page_data['event_price_x_attendees'] = $event_cost;
			}
		}
	}
	/*
	 * End seating chart addon
	 */


	if (function_exists('event_espresso_coupon_payment_page') && (!empty($_REQUEST['coupon_code']) || !empty($conf_page_data['coupon_code']))) {
		$event_cost = event_espresso_coupon_payment_page($use_coupon_code, $conf_page_data['event_id'], $conf_page_data['p_id'], $conf_page_data['attendee_id'], $payment_status);

		/*
		 * at this point , the $event_cost is correct
		 * The next line divided by the number of people and reassigned it to the same $even_cost var, making the event cost less
		 * I renamed it to another variable
		 */

		$conf_page_data['event_price_x_attendees'] = number_format($event_cost * $conf_page_data['num_people'], 2, '.', '');
		$conf_page_data['coupon_code'] = $_REQUEST['coupon_code'];
	} else if (function_exists('event_espresso_groupon_payment_page') && ($_REQUEST['groupon_code'] != '' || $conf_page_data['coupon_code'] != '')) {
		$event_cost = event_espresso_groupon_payment_page($use_groupon_code, $conf_page_data['event_id'], $event_original_cost, $conf_page_data['attendee_id']);
		$conf_page_data['groupon_code'] = $_REQUEST['groupon_code'];
	} else {
		$event_cost = $event_original_cost;
	}

	if ($conf_page_data['num_people'] != 0)
		$event_individual_cost = number_format($event_cost / $conf_page_data['num_people'], 2, '.', '');

	$conf_page_data['event_discount_label'] = $event_original_cost > $event_cost ? ' (' . __('Discount of ', 'event_espresso') . $org_options['currency_symbol'] . number_format($event_original_cost - $conf_page_data['event_price_x_attendees'], 2, ".", ",") . __(' applied', 'event_espresso') . ')' : '';

	if ($event_cost == '0.00') {
		$event_cost = '0.00';
		$payment_status = 'Completed';
		$sql = array('amount_pd' => $event_cost, 'payment_status' => $payment_status, 'payment_date' => $today);
		$sql_data = array('%s', '%s', '%s');
	} else {
		$sql = array('amount_pd' => $event_cost, 'payment_status' => $payment_status);
		$sql_data = array('%s', '%s');
	}

	//Add the cost and payment status to the attendee
	$update_id = array('id' => $conf_page_data['attendee_id']);
	$wpdb->update(EVENTS_ATTENDEE_TABLE, $sql, $update_id, $sql_data, array('%d'));

	//If this is a group registration, we need to make sure all attendees have the same payment status
	if (espresso_count_attendees_for_registration($conf_page_data['attendee_id']) > 1) {
		$wpdb->query("UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status' WHERE registration_id ='" . $conf_page_data['registration_id'] . "'");
	}

	$display_cost = ( $event_cost != "0.00" ) ? $org_options['currency_symbol'] . $event_individual_cost : __('Free', 'event_espresso');

	//Pull in the template
	require_once(espresso_get_confirmation_display_template());
	do_action('action_hook_espresso_display_confirmation_page', $conf_page_data);
}