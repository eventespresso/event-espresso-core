<?php

$espresso_manager = get_option('espresso_manager_settings');

//Build the status dropdown
$default_status = array(array('id' => 'A', 'text' => __('Public', 'event_espresso')), array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')), array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')), array('id' => 'R', 'text' => __('Draft', 'event_espresso')));

//If event managers require approval, then add this array status'
if (function_exists('espresso_member_data') && $espresso_manager['event_manager_approval'] == 'Y') {
    $manager_status = array(array('id' => 'P', 'text' => __('Pending', 'event_espresso')), array('id' => 'X', 'text' => __('Denied', 'event_espresso')));
} else
    $manager_status = array();

//Add the final available status
$delete_status = array(array('id' => 'D', 'text' => __('Deleted', 'event_espresso')));

// Merge the satus arrays
$status = array_merge((array) $default_status, (array) $manager_status, (array) $delete_status);

if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager' && $espresso_manager['event_manager_approval'] == 'Y') {
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
$advanced_options .= '<p class="inputunder"><label>' . __('Additional Attendee Registration info?', 'event_espresso') . '</label> ' . select_input('additional_attendee_reg_info', $additional_attendee_reg_info, isset($event_meta['additional_attendee_reg_info']) ? $event_meta['additional_attendee_reg_info'] : '') . '</p>';
$advanced_options .= '<p><strong>' . __('Advanced Options:', 'event_espresso') . '</strong></p>';
if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager' && $espresso_manager['event_manager_approval'] == 'Y' && ($event_status == '' || $event_status == 'X' || $event_status == 'P')) {
    $advanced_options .= '<p><label>' . __('Event Status: ', 'event_espresso') . '</label><span style="color: #ff8400; font-weight:bold;">' . __('PENDING', 'event_espresso') . '</span></p>';
    $advanced_options .= '<input name="event_status" id="event_status" type="hidden" value="P" />';
    $advanced_options .= '<input name="is_active" id="is_active" type="hidden" value="Y" />';
} else {
    $is_active = isset($is_active) ? $is_active : '';
    $event_status = isset($event_status) ? $event_status : '';
    $advanced_options .= '<p><label>' . __('Is this an active event? ', 'event_espresso') . '</label>' . __(select_input('is_active', $values, $is_active)) . '</p>';
    $advanced_options .= '<p><label>' . __('Event Status: ', 'event_espresso')  . '</label><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=status_types_info"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" /></a>'  . __(select_input('event_status', $status, $event_status)) . ' </p>';
}
$display_desc = isset($display_desc) ? $display_desc : '';
$display_reg_form = isset($display_reg_form) ? $display_reg_form : '';
$overflow_event_id = isset($overflow_event_id) ? $overflow_event_id : '0';
$allow_overflow = isset($allow_overflow) ? $allow_overflow : 'N';
$externalURL = isset($externalURL) ? $externalURL : '';
$alt_email = isset($alt_email) ? $alt_email : '';
$advanced_options .= '<p><label>' . __('Display  description? ', 'event_espresso') . '</label>' . select_input('display_desc', $values, $display_desc) . '</p>';
$advanced_options .= '<p><label>' . __('Display  registration form? ', 'event_espresso') . '</label>' . select_input('display_reg_form', $values, $display_reg_form) . '</p>';
$advanced_options .= '<p class="inputunder"><label>' . __('Default Payment Status for Event: ', 'event_espresso') . '</label>' . select_input('default_payment_status', $default_payment_status, isset($event_meta['default_payment_status']) ? $event_meta['default_payment_status']: '') . '</p>';
$advanced_options .= $event_status != 'S' ? espresso_secondary_events_dd($overflow_event_id, $allow_overflow) : '';
$advanced_options .= '<p class="inputunder"><label>' . __('Use an alternate registration page?', 'event_espresso') . '</label><a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=external_URL_info"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" alt="" /></a><br />
				<input name="externalURL" size="20" type="text" value="' . $externalURL . '"> </p>';
$advanced_options .= '<p class="inputunder"><label>' . __('Use an alternate email address?', 'event_espresso') . '</label><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=alt_email_info"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" /></a>
				<input name="alt_email" size="20" type="text" value="' . $alt_email . '"> </p>';