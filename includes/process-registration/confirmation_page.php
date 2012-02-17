<?php

function espresso_confirmation_page($attendee_id, $price_id = 0, $coupon_code = '', $groupon_code = '') {
	$conf_page_data['coupon_code'] = $coupon_code;
	$conf_page_data['groupon_code'] = $groupon_code;
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$conf_page_data['event_page_id'] = $org_options['event_page_id'];

	$attendees = $wpdb->get_results("SELECT id, lname, fname, email, quantity, payment_status, event_id, registration_id, attendee_session FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='" . $attendee_id . "'");
	foreach ($attendees as $attendee) {
		$conf_page_data['attendee_id'] = $attendee->id;
		$attendee_last = $attendee->lname;
		$attendee_first = $attendee->fname;
		$conf_page_data['attendee_email'] = $attendee->email;
		$quantity = $attendee->quantity;
		$payment_status = $attendee->payment_status;
		$conf_page_data['event_id'] = $attendee->event_id;
		$conf_page_data['registration_id'] = $attendee->registration_id;
		$conf_page_data['attendee_session'] = $attendee->attendee_session;
	}

	$q_sql = "SELECT ea.answer, eq.question
						FROM " . EVENTS_ANSWER_TABLE . " ea
						LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id
						WHERE ea.attendee_id = '" . $conf_page_data['attendee_id'] . "' and eq.admin_only = 'N' ORDER BY eq.sequence asc ";
	$conf_page_data['questions'] = $wpdb->get_results($q_sql);
	$conf_page_data['display_questions'] = '';
	foreach ($conf_page_data['questions'] as $question) {
		$conf_page_data['display_questions'] .= '<p>' . $question->question . ':<br /> ' . str_replace(',', '<br />', $question->answer) . '</p>';
	}

	$event = stripslashes_deep($wpdb->get_row("SELECT event_name, use_coupon_code, use_groupon_code FROM " . EVENTS_DETAIL_TABLE . " WHERE id ='" . $conf_page_data['event_id'] . "'"));
	$conf_page_data['event_name'] = $event->event_name;
	if (function_exists('event_espresso_coupon_payment_page')) {
		$use_coupon_code = $event->use_coupon_code;
	}
	if (function_exists('event_espresso_groupon_payment_page')) {
		$use_groupon_code = $event->use_groupon_code;
	}
	$conf_page_data['attendee_name'] = stripslashes_deep($attendee_first . ' ' . $attendee_last);

	if (!empty($_REQUEST['price_select']) && $_REQUEST['price_select'] == true) {

		$price_options = explode('|', $_REQUEST['price_option'], 2);
		$price_id = $price_options[0];
		$conf_page_data['p_id'] = $price_id;
	} elseif ($price_id > 0) {
		$conf_page_data['p_id'] = $price_id;
	} else {
		$conf_page_data['p_id'] = $_POST['price_id'];
	}

	if (function_exists('event_espresso_coupon_payment_page') && (!empty($_REQUEST['coupon_code']) || !empty($conf_page_data['coupon_code']))) {
		event_espresso_coupon_payment_page($use_coupon_code, $conf_page_data['event_id'], $conf_page_data['p_id'], $conf_page_data['attendee_id'], $payment_status);
		$conf_page_data['coupon_code'] = $_REQUEST['coupon_code'];
	} else if (function_exists('event_espresso_groupon_payment_page') && ($_REQUEST['groupon_code'] != '' || $conf_page_data['coupon_code'] != '')) {
		event_espresso_groupon_payment_page($use_groupon_code, $conf_page_data['event_id'], $event_original_cost, $conf_page_data['attendee_id']);
		$conf_page_data['groupon_code'] = $_REQUEST['groupon_code'];
	}
	//Pull in the template
	require_once(espresso_get_confirmation_display_template());
	do_action('action_hook_espresso_display_confirmation_page', $conf_page_data);
}