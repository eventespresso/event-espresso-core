<?php

$espresso_manager = get_option('espresso_manager_settings');

//Build the status dropdown
$default_status = array(array('id' => 'A', 'text' => __('Public', 'event_espresso')), array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')), array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')), array('id' => 'R', 'text' => __('Draft', 'event_espresso')));

//If event managers require approval, then add this array status'
if (function_exists('espresso_member_data') && $espresso_manager['event_manager_approval']) {
	$manager_status = array(array('id' => 'P', 'text' => __('Pending', 'event_espresso')), array('id' => 'X', 'text' => __('Denied', 'event_espresso')));
} else
	$manager_status = array();

//Add the final available status
$delete_status = array(array('id' => 'D', 'text' => __('Deleted', 'event_espresso')));

// Merge the satus arrays
$status = array_merge((array) $default_status, (array) $manager_status, (array) $delete_status);

if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager' && $espresso_manager['event_manager_approval']) {
	$status = array(array(
		'id' => 'A',
		'text' => __('Public', 'event_espresso')),
		array(
			'id' => 'S',
			'text' => __('Waitlist', 'event_espresso')
		),
		array(
			'id' => 'O',
			'text' => __('Ongoing', 'event_espresso')
		),
		array(
			'id' => 'R',
			'text' => __('Draft', 'event_espresso')
		),
		array(
			'id' => 'D',
			'text' => __('Deleted', 'event_espresso')
		)
	);
}

$additional_attendee_reg_info = array(
	array('id'=>'1','text'=> __('No info required','event_espresso')),
	array('id' => '2', 'text' => __('Personal Information only', 'event_espresso')),
	array('id' => '3', 'text' => __('Full registration information', 'event_espresso'))
);

$default_payment_status = array(
	array('id' => "", 'text' => 'No Change'),
	array('id' => 'Incomplete', 'text' => 'Incomplete'),
	array('id' => 'Pending', 'text' => 'Pending'),
	array('id' => 'Completed', 'text' => 'Completed')
);

$advanced_options = '';
$advanced_options .= '<p class="inputunder"><label>' . __('Additional Attendee Registration info?', 'event_espresso') . '</label> ' . select_input('additional_attendee_reg_info', $additional_attendee_reg_info, isset($event->event_meta['additional_attendee_reg_info']) ? $event->event_meta['additional_attendee_reg_info'] : '') . '</p>';
$advanced_options .= '<p><strong>' . __('Advanced Options:', 'event_espresso') . '</strong></p>';
if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager' && $espresso_manager['event_manager_approval'] && ($event->event_status == '' || $event->event_status == 'X' || $event->event_status == 'P')) {
	$advanced_options .= '<p><label>' . __('Event Status', 'event_espresso') . '</label> <span style="color: #ff8400; font-weight:bold;">' . __('PENDING', 'event_espresso') . '</span></p>';
	$advanced_options .= '<input name="event_status" id="event_status" type="hidden" value="P" />';
	$advanced_options .= '<input name="is_active" id="is_active" type="hidden" value="Y" />';
} else {
	//$event->is_active = isset($event->is_active) ? $event->is_active : '';
	//$event->event_status = isset($event->event_status) ? $event->event_status : '';
	$advanced_options .= '<p><label>' . __('Event is Active', 'event_espresso') . '</label>' . __(select_input('is_active', $values, isset($event->is_active) ? $event->is_active : '')) . '</p>';
	$advanced_options .= '<p><label>' . __('Event Status', 'event_espresso')  . ' <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=status_types_info"><span class="question">[?]</span></a></label>'  . __(select_input('event_status', $status, isset($event->event_status) ? $event->event_status : '')) . ' </p>';
}
//$event->display_desc = isset($event->display_desc) ? $event->display_desc : '';
//$event->display_reg_form = isset($event->display_reg_form) ? $event->display_reg_form : '';
$event->overflow_event_id = isset($event->overflow_event_id) ? $event->overflow_event_id : '0';
$event->allow_overflow = isset($event->allow_overflow) ? $event->allow_overflow : 'N';
$event->externalURL = isset($event->externalURL) ? $event->externalURL : '';
$event->alt_email = isset($event->alt_email) ? $event->alt_email : '';
$advanced_options .= '<p><label>' . __('Display  Description', 'event_espresso') . '</label>' . select_input('display_desc', $values, isset($event->display_desc) ? $event->display_desc : '') . '</p>';
$advanced_options .= '<p><label>' . __('Display  Registration Form', 'event_espresso') . '</label>' . select_input('display_reg_form', $values, isset($event->display_reg_form) ? $event->display_reg_form : '') . '</p>';
$advanced_options .= '<p class="inputunder"><label>' . __('Default Payment Status', 'event_espresso') . ' <a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=payment_status_info"><span class="question">[?]</span></a>  </label>  ' . select_input('default_payment_status', $default_payment_status, isset($event->event_meta['default_payment_status']) ? $event->event_meta['default_payment_status']: '') .'</p>';
$advanced_options .= isset($event->event_status) &&  $event->event_status != 'S' ? espresso_secondary_events_dd($event->overflow_event_id, $event->allow_overflow) : '';
$advanced_options .= '<p class="inputunder"><label>' . __('Alternate Registration Page', 'event_espresso') . ' <a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=external_URL_info"><span class="question">[?]</span></a></label>
				<input name="externalURL" size="20" type="text" value="' . $event->externalURL . '"> </p>';
$advanced_options .= '<p class="inputunder"><label>' . __('Alternate Email Address', 'event_espresso') . ' <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=alt_email_info"><span class="question">[?]</span></a></label>
				<input name="alt_email" size="20" type="text" value="' . $event->alt_email . '"> </p>';

include_once(EVENT_ESPRESSO_INCLUDES_DIR.'help_global.php');