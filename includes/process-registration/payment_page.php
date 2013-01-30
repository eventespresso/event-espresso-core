<?php

function espresso_payment_page() {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$payment_data = new EE_Payment_Data($_REQUEST['attendee_id']);
	$payment_data->populate_data_from_db();
	$payment_data->calculate_costs();
	if (is_attendee_approved($payment_data->events[0]->require_pre_approval, $payment_data->attendee_id)) {
		do_action('action_hook_espresso_display_payment_page_template', $payment_data);
		if ($payment_data->total_cost != '0.00') {
			do_action('action_hook_espresso_display_payment_gateways', $payment_data);
			//Check to see if the site owner wants to send an confirmation eamil before payment is recieved.
			if ($org_options['email_before_payment']) {
				event_espresso_email_confirmations(array('registration_id' => $payment_data->registration_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
			}
		} else {
			event_espresso_email_confirmations(array('registration_id' => $payment_data->registration_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
		}
	} else {
		//NOT Approved!
		//If the attendee is NOT approved, then show pending approval page
		echo espresso_pending_registration_approval($payment_data->registration_id);
		return;
	}
}

add_action('action_hook_espresso_display_payment_page', 'espresso_payment_page');