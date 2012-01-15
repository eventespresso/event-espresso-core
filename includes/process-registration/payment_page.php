<?php

//Payment page - Used to display the payment options and the payment link in the email. Used with the [ESPRESSO_PAYMENTS] tag
//This is the initial PayPal button
function events_payment_page($attendee_id, $price_id=0, $coupon_code='', $groupon_code ='') {

	global $wpdb, $org_options;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}

	//Debug
	//echo "<pre>".print_r($_REQUEST,true)."</pre>";
	//echo "<pre>".print_r($_SESSION,true)."</pre>";

	$today = date("m-d-Y");
	$num_people = 0;

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
	$event_page_id = $org_options['event_page_id'];

	$attendees = $wpdb->get_results("SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='" . $attendee_id . "'");
	foreach ($attendees as $attendee) {
		//$attendee_id = $attendee->id;
		$attendee_last = $attendee->lname;
		$attendee_first = $attendee->fname;
		$attendee_address = $attendee->address;
		$attendee_address2 = $attendee->address2;
		$attendee_city = $attendee->city;
		$attendee_state = $attendee->state;
		$attendee_zip = $attendee->zip;
		$attendee_email = $attendee->email;
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
		$event_id = $attendee->event_id;
		$registration_id = $attendee->registration_id;
	}
	$event_meta = event_espresso_get_event_meta($event_id);

	//Get the questions for the attendee
	$q_sql = "SELECT ea.answer, eq.question
						FROM " . EVENTS_ANSWER_TABLE . " ea
						LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id
						WHERE ea.attendee_id = '" . $attendee_id . "' and eq.admin_only = 'N' ORDER BY eq.sequence asc ";
	$questions = $wpdb->get_results($q_sql);
	//echo $q_sql;
	//echo $wpdb->last_query;
	$display_questions = '';
	foreach ($questions as $question) {
		$display_questions .= '<p>' . $question->question . ':<br /> ' . str_replace(',', '<br />', $question->answer) . '</p>';
	}
	$num_peoplea = $wpdb->get_results("SELECT COUNT(registration_id) FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='" . $registration_id . "'", ARRAY_N);
	$num_people = $num_peoplea[0][0];

	//If we are using the number of attendees dropdown, and
	if ($quantity > 1) {
		$num_people = $quantity;
	}

	$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id ='" . $event_id . "'");
	foreach ($events as $event) {
		//$event_id = $event->id;
		$event_name = stripslashes_deep($event->event_name);
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

	$attendee_name = stripslashes_deep($attendee_first . ' ' . $attendee_last);

	//Figure out if the person has registered using a price selection
	if (!empty($_REQUEST['price_select']) && $_REQUEST['price_select'] == true) {

		$price_options = explode('|', $_REQUEST['price_option'], 2);
		$price_id = $price_options[0];
		$price_type = $price_options[1];
		$p_id = $price_id;
		$event_cost = event_espresso_get_final_price($price_id, $event_id);
	} elseif ($price_id > 0) {
		$event_cost = event_espresso_get_final_price($price_id, $event_id);
		$p_id = $price_id;
	} else {
		//$event_cost = $_POST['event_cost'];
		$event_cost = event_espresso_get_final_price($_POST['price_id'], $event_id);
		$p_id = $_POST['price_id'];
	}


	//Test the early discount amount to make sure we are getting the right amount
	//print_r(early_discount_amount($event_id, $event_cost));

	$event_price = number_format($event_cost, 2, '.', '');
	$event_price_x_attendees = number_format($event_cost * $num_people, 2, '.', '');
	$event_original_cost = number_format($event_cost * $num_people, 2, '.', '');

	/*
	 * Added for seating chart addon
	 */
	/*
	 * This code block overrides the cost using seating chart add-on price
	 */
	if (defined('ESPRESSO_SEATING_CHART')) {
		if (seating_chart::check_event_has_seating_chart($event_id) !== false) {
			$sc_cost_row = $wpdb->get_row("select sum(sces.purchase_price) as purchase_price from " . EVENTS_SEATING_CHART_EVENT_SEAT_TABLE . " sces inner join " . EVENTS_ATTENDEE_TABLE . " ea on sces.attendee_id = ea.id where ea.registration_id = '$registration_id'");
			if ($sc_cost_row !== NULL) {
				$event_cost = number_format($sc_cost_row->purchase_price, 2, '.', '');
				$event_original_cost = $event_cost;
				$event_price_x_attendees = $event_cost;
			}
		}
	}
	/*
	 * End seating chart addon
	 */


	if (function_exists('event_espresso_coupon_payment_page') && (!empty($_REQUEST['coupon_code']) || !empty($coupon_code))) {
		$event_cost = event_espresso_coupon_payment_page($use_coupon_code, $event_id, $p_id, $attendee_id, $payment_status);

		/*
		 * at this point , the $event_cost is correct
		 * The next line divided by the number of people and reassigned it to the same $even_cost var, making the event cost less
		 * I renamed it to another variable
		 */

		$event_price_x_attendees = number_format($event_cost, 2, '.', '');
		$coupon_code = $_REQUEST['coupon_code'];
	} else if (function_exists('event_espresso_groupon_payment_page') && ($_REQUEST['groupon_code'] != '' || $coupon_code != '')) {
		$event_cost = event_espresso_groupon_payment_page($use_groupon_code, $event_id, $event_original_cost, $attendee_id);
		$groupon_code = $_REQUEST['groupon_code'];
	} else {
		$event_cost = $event_original_cost;
	}

	if ($num_people != 0)
		$event_individual_cost = number_format($event_cost / $num_people, 2, '.', '');

	$event_discount_label = $event_original_cost > $event_cost ? ' (' . __('Discount of ', 'event_espresso') . $org_options['currency_symbol'] . number_format($event_original_cost - $event_cost, 2, ".", ",") . __(' applied', 'event_espresso') . ')' : '';

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
	$update_id = array('id' => $attendee_id);
	$wpdb->update(EVENTS_ATTENDEE_TABLE, $sql, $update_id, $sql_data, array('%d'));

	//If this is a group registration, we need to make sure all attendees have the same payment status
	if (espresso_count_attendees_for_registration($attendee_id) > 1) {
		$wpdb->query("UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status' WHERE registration_id ='" . $registration_id . "'");
	}

	$display_cost = ( $event_cost != "0.00" ) ? $org_options['currency_symbol'] . $event_individual_cost : __('Free', 'event_espresso');

	//Pull in the template
	if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "confirmation_display.php")) {
		require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "confirmation_display.php"); //This is the path to the template file if available
	} else {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/confirmation_display.php");
	}
}

function espresso_confirm_registration($registration_id) {
	global $wpdb, $org_options;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}

	//Debug
	//echo "<pre>".print_r($_REQUEST,true)."</pre>";
	//echo "<pre>".print_r($_SESSION,true)."</pre>";
	//echo '<p>Function = espresso_confirm_registration()</p>';
	//Not sure this is needed or why it is here
	//Get the questions for the attendee
	$sql = "SELECT ea.answer, eq.question
						FROM " . EVENTS_ANSWER_TABLE . " ea
						LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id
						WHERE ea.registration_id = '" . $registration_id . "' AND system_name IS NULL ORDER BY eq.sequence asc ";
	$questions = $wpdb->get_results($sql);

	//Debug
	//echo $sql;
	//echo $wpdb->last_query;

	$display_questions = '';
	foreach ($questions as $question) {
		$display_questions .= '<p class="espresso_questions"><span class="attendee-question">' . $question->question . '</span>:<br /> ' . str_replace(',', '<br />', $question->answer) . '</p>';
	}

	//Get the event information
	$events = $wpdb->get_results("SELECT ed.* FROM " . EVENTS_DETAIL_TABLE . " ed
						JOIN " . EVENTS_ATTENDEE_TABLE . " ea
						ON ed.id = ea.event_id
						WHERE ea.registration_id='" . $registration_id . "'");

	foreach ($events as $event) {
		$event_id = $event->id;
		$event_name = stripslashes_deep($event->event_name);
		$event_desc = stripslashes_deep($event->event_desc);
		$display_desc = $event->display_desc;
		$event_identifier = $event->event_identifier;
		$reg_limit = $event->reg_limit;
		$active = $event->is_active;
		$send_mail = $event->send_mail;
		$conf_mail = $event->conf_mail;
		$email_id = $event->email_id;
		$alt_email = $event->alt_email;
		$start_date = event_date_display($event->start_date);
		$end_date = $event->end_date;
		$virtual_url = $event->virtual_url;
		$virtual_phone = $event->virtual_phone;
		$event_address = $event->address;
		$event_address2 = $event->address2;
		$event_city = $event->city;
		$event_state = $event->state;
		$event_zip = $event->zip;
		$event_country = $event->country;
		$location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');
		$location_phone = $event->phone;
		$require_pre_approval = $event->require_pre_approval;

		$google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country));
	}

	//Build links
	$event_url = espresso_reg_url($event_id);
	$event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';


	$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE;

	if ($registration_id != '') {
		$sql .= " WHERE registration_id = '" . $registration_id . "' ";
	} elseif ($attendee_id != '') {
		$sql .= " WHERE id = '" . $attendee_id . "' ";
	} else {
		_e('No ID Supplied', 'event_espresso');
	}

	$sql .= " ORDER BY id ";
	$sql .= " LIMIT 0,1 "; //Get the first attendees details


	$attendees = $wpdb->get_results($sql);
	//global $attendee_id;

	foreach ($attendees as $attendee) {
		$attendee_id = $attendee->id;
		$attendee_email = $attendee->email;
		$lname = $attendee->lname;
		$fname = $attendee->fname;
		$address = $attendee->address;
		$address2 = $attendee->address2;
		$city = $attendee->city;
		$state = $attendee->state;
		$zip = $attendee->zip;
		$payment_status = $attendee->payment_status;
		$txn_type = $attendee->txn_type;
		$amount_pd = $attendee->amount_pd;
		$event_cost = $attendee->amount_pd;
		$payment_date = $attendee->payment_date;
		$phone = $attendee->phone;
		$event_time = $attendee->event_time;
		$end_time = $attendee->end_time;
		$date = $attendee->date;
		$pre_approve = $attendee->pre_approve;
	}

	//Define the default useer id for the payment settings
	$espresso_wp_user = 1;

	//If the permissions pro addon is installed
	if (function_exists('espresso_manager_pro_version')) {
		global $espresso_manager;
		//If the user that created this event can accept payments
		if ($espresso_manager['can_accept_payments'] == 'Y') {
			//Get the user id
			$espresso_wp_user = $event->wp_user;
		}
	}

	//Run pre-approval check if activated
	$pre_approval_check = is_attendee_approved($event_id, $attendee_id);
	if ($pre_approval_check) {
		//Approved!
		//If the attendee is approved, then show payment options etc.
		//Pull in the "Thank You" page template
		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_page.php")) {
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_page.php"); //This is the path to the template file if available
		} else {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_page.php");
		}
		if ($amount_pd != '0.00') {
			//Show payment options
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php")) {
				require_once(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php");
			} else {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/gateway_display.php");
			}
			//Check to see if the site owner wants to send an confirmation eamil before payment is recieved.
			if ($org_options['email_before_payment'] == 'Y') {
				event_espresso_email_confirmations(array('registration_id' => $registration_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
			}
		} else {
			event_espresso_email_confirmations(array('registration_id' => $registration_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
		}
	} else {
		//NOT Approved!
		//If the attendee is NOT approved, then show pending approval page
		if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/pending_approval_page.php')) {
			require_once('pending_approval_page.php');
			echo espresso_pending_registration_approval($registration_id);
			return;
		}
	}
}

//This is the alternate PayPal button used for the email
function event_espresso_pay($att_registration_id=0) {
	global $wpdb, $org_options;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}

	//Debug
	//echo "<pre>".print_r($_REQUEST,true)."</pre>";
	//echo "<pre>".print_r($_SESSION,true)."</pre>";
	//echo '<p>Function = event_espresso_pay()</p>';
	//Make sure id's are empty
	$registration_id = 0;
	$id = 0;
	//$att_registration_id = 0;

	$registration_id = isset($_REQUEST['registration_id']) ? $_REQUEST['registration_id'] : '';
	$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
	$attendee_id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';

	if ($att_registration_id == 0)
		$att_registration_id = $registration_id != '' ? $registration_id : espresso_registration_id($id);
	$registration_id = $att_registration_id;
	//Debug
	//echo $att_registration_id;

	$attendees = $wpdb->get_results("SELECT ea.*, ed.wp_user wp_user FROM " . EVENTS_ATTENDEE_TABLE . " ea left join " . EVENTS_DETAIL_TABLE . " ed on ea.event_id = ed.id WHERE registration_id ='" . $att_registration_id . "' ORDER BY ID LIMIT 1");
	$num_rows = $wpdb->num_rows;

	//If the attendee has made a payment or returns to make a payment, then we will display the payment overview page
	if ($num_rows > 0 && $att_registration_id != '') {
		foreach ($attendees as $attendee) {
			$attendee_id = $attendee->id;
			$id = $attendee->id;
			$att_registration_id = $attendee->registration_id;
			$lname = $attendee->lname;
			$fname = $attendee->fname;
			$address = $attendee->address;
			$city = $attendee->city;
			$state = $attendee->state;
			$zip = $attendee->zip;
			$email = $attendee->email;
			$attendee_email = $attendee->email;
			$phone = $attendee->phone;
			$date = $attendee->date;
			$payment_status = $attendee->payment_status;
			$txn_type = $attendee->txn_type;
			$txn_id = $attendee->txn_id;
			$amount_pd = $attendee->amount_pd;
			$quantity = $attendee->quantity;
			$payment_date = $attendee->payment_date;
			$event_id = $attendee->event_id;
			$coupon_code = $attendee->coupon_code;
			$event_cost = $attendee->amount_pd;
		}

		//Define the default useer id for the payment settings
		$espresso_wp_user = 1;

		//If the permissions pro addon is installed
		if (function_exists('espresso_manager_pro_version')) {
			global $espresso_manager;
			//If the user that created this event can accept payments
			if ($espresso_manager['can_accept_payments'] == 'Y') {
				//Get the user id
				$espresso_wp_user = $attendee->wp_user;
			}
		}
		//Debug
		//echo '<p>$espresso_wp_user = '.$espresso_wp_user.'</p>';

		$event_link = '';
		$registration_ids = array();
		$c_sql = "select * from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where registration_id = '$registration_id' ";

		//Debug
		//echo $c_sql;
		//print_r($attendees);
		//Get the primary registraion id
		$check = $wpdb->get_row($c_sql);
		if ($check !== NULL) {
			$registration_id = $check->primary_registration_id;
			$registration_ids = $wpdb->get_results("select registration_id from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where primary_registration_id = '$registration_id' ", ARRAY_A);
			$multi_reg = true;
		} else {
			$registration_ids[] = array("registration_id" => $registration_id);
		}

		foreach ($registration_ids as $reg_id) {
			$sql = "select ea.registration_id, ed.event_name, ed.id event_id, ed.start_date, ea.fname, ea.lname, eac.quantity, eac.cost, ea.amount_pd from " . EVENTS_ATTENDEE_TABLE . " ea
				inner join " . EVENTS_ATTENDEE_COST_TABLE . " eac on ea.id = eac.attendee_id
				inner join " . EVENTS_DETAIL_TABLE . " ed on ea.event_id = ed.id
				where ea.registration_id = '" . $reg_id['registration_id'] . "' order by ed.event_name ";

			$tmp_attendees = $wpdb->get_results($sql, ARRAY_A);
			$total_cost = 0;

			//Debug
			//echo "<pre>".print_r($tmp_attendees,true)."</pre>";
			//$sub_total =array();
			$final_total = 0;
			foreach ($tmp_attendees as $tmp_attendee) {
				//Debug
				//echo "<pre>".print_r($tmp_attendee,true)."</pre>";

				$sub_total[] = $tmp_attendee["cost"] * $tmp_attendee["quantity"];

				$total_cost = $tmp_attendee['amount_pd'];
				//Debug
				//echo "<pre>total_cost - ".print_r($sub_total,true)."</pre>";

				$event_url = espresso_reg_url($tmp_attendee["event_id"]);
				$event_link .= '<div class="event-list-payment-overview"><dl><dt><a href="' . $event_url . '">' . $tmp_attendee["event_name"] . '</a></dt><dd class="list-event-date">' . event_date_display($tmp_attendee['start_date'], get_option('date_format')) . '</dd><dd class="attendee-plus-cost">' . espresso_edit_attendee($registration_id, $id, $event_id, 'attendee', $tmp_attendee["fname"] . " " . $tmp_attendee["lname"]) . '<span> [ ' . $tmp_attendee["quantity"] . ' x ' . $org_options['currency_symbol'] . number_format($tmp_attendee["cost"], 2, '.', '') . ']</span></dd></div>';
				$final_total = array_sum($sub_total);

				//Debug
				//echo '<p>SUM - '.array_sum($sub_total).'</p>';
			}
		}

		//Debug
		//echo '<p>$final_total - '.$final_total.'</p>';
		//print_r($attendees);
		//$total_cost = number_format($total_cost, 2, '.', '');
		$total_cost = number_format($final_total, 2, '.', '');

		if (!empty($_REQUEST['payment_type']) && $_REQUEST['payment_type'] == 'cash_check') {

			$payment_status = 'Pending';
			$txn_type = 'OFFLINE';
			$payment_date = date("m-d-Y");

			$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_status . "', txn_type = '" . $txn_type . "', payment_date ='" . $payment_date . "'  WHERE registration_id ='" . $registration_id . "'";
			$wpdb->query($sql);

			//Send the email confirmation
			//@params $attendee_id, $send_admin_email, $send_attendee_email
			$email_before_payment = $org_options['email_before_payment'];

			if ($email_before_payment == 'N') {
				event_espresso_email_confirmations(array('attendee_id' => $attendee_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
			}
			if ($num_rows > 0) {
				if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
					require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php"); //This is the path to the template file if available
				} else {
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
				}
			}
		}

		if (!isset($_GET['payment_type'])) {
			//echo '<p>'. __('Please check your email for payment information.','event_espresso'). '</p>';
			if ($num_rows > 0) {
				if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
					require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php"); //This is the path to the template file if available
				} else {
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
				}
				echo '<a name="payment_options" id="payment_options"></a>';
				if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "return_payment.php")) {
					require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "return_payment.php"); //This is the path to the template file if available
				} else {
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/return_payment.php");
				}
			}
		}
	} elseif ($registration_id == 0 && $att_registration_id == 0) {//if the attendee has paid using authorize.net and returns to make a payment, then display the following message
		_e('Please check your email for payment information.', 'event_espresso');
	} else {

		$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . $registration_id . "' ";
		$sql .= $id == '' ? '' : " AND id= '" . $id . "' ";
		$sql .= " ORDER BY id LIMIT 0,1";

		$attendees = $wpdb->get_results($sql);
		foreach ($attendees as $attendee) {
			$attendee_id = $attendee->id;
			$lname = $attendee->lname;
			$fname = $attendee->fname;
			$address = $attendee->address;
			$address2 = $attendee->address2;
			$city = $attendee->city;
			$state = $attendee->state;
			$zip = $attendee->zip;
			$attendee_email = $attendee->email;
			$phone = $attendee->phone;
			$date = $attendee->date;
			$payment_status = $attendee->payment_status;
			$txn_type = $attendee->txn_type;
			$event_cost = $attendee->amount_pd;
			$payment_date = $attendee->payment_date;
			$event_id = $attendee->event_id;
			$attendee_name = $fname . " " . $lname;
			$quantity = $attendee->quantity;
		}

		$Organization = stripslashes_deep($org_options['organization']);
		$Organization_street1 = $org_options['organization_street1'];
		$Organization_street2 = $org_options['organization_street2'];
		$Organization_city = $org_options['organization_city'];
		$Organization_state = $org_options['organization_state'];
		$Organization_zip = $org_options['organization_zip'];
		$contact = $org_options['contact_email'];
		$registrar = $org_options['contact_email'];
		$paypal_cur = $org_options['currency_format'];

		$message = $org_options['message'];
		$return_url = $org_options['return_url'];
		$cancel_return = $org_options['cancel_return'];
		$notify_url = $org_options['notify_url'];

		$payment_settings = get_option('payment_data_' . $espresso_wp_user);
		$paypal_id = $payment_settings['paypal']['paypal_id'];
		$image_url = $payment_settings['paypal']['image_url'];
		$currency_format = $payment_settings['paypal']['currency_format'];
		$use_sandbox = $payment_settings['paypal']['use_sandbox'];

		//Query Database for event and get variable
		$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");
		foreach ($events as $event) {
			//$event_id = $event->id;
			$event_name = stripslashes_deep($event->event_name);
			$event_desc = stripslashes_deep($event->event_desc);
			$event_description = stripslashes_deep($event->event_desc);
			$event_identifier = $event->event_identifier;
			$active = $event->is_active;
		}

		//Define the default useer id for the payment settings
		$espresso_wp_user = 1;

		//If the permissions pro addon is installed
		if (function_exists('espresso_manager_pro_version')) {
			global $espresso_manager;
			//If the user that created this event can accept payments
			if ($espresso_manager['can_accept_payments'] == 'Y') {
				//Get the user id
				$espresso_wp_user = $event->wp_user;
			}
		}
		//Debug
		//echo '<p>$espresso_wp_user = '.$espresso_wp_user.'</p>';
		//Pull in the template
		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "return_payment.php")) {
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "return_payment.php"); //This is the path to the template file if available
		} else {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/return_payment.php");
		}
	}
	$_REQUEST['page_id'] = $org_options['return_url'];
	espresso_init_session();
}

add_shortcode('ESPRESSO_PAYMENTS', 'event_espresso_pay');
