<?php

function espresso_ical() {
	$name = "hello.ical";
	$output = "BEGIN:VCALENDAR\n" .
					"PRODID:-//xyz Corp//NONSGML PDA Calendar Version 1.0//EN\n" .
					"VERSION:2.0\n" .
					"BEGIN:VEVENT\n" .
					"DTSTAMP:" . $_REQUEST['currentyear'] . $_REQUEST['currentmonth'] . $_REQUEST['currentday'] . "T" . $_REQUEST['currenttime'] . "\n" .
					"UID:" . $_REQUEST['attendee_id'] . "@" . $_REQUEST['event_id'] . "\n" .
					"ORGANIZER:MAILTO:" . $_REQUEST['contact'] . "\n" .
					"DTSTART:" . $_REQUEST['startyear'] . $_REQUEST['startmonth'] . $_REQUEST['startday'] . "T" . $_REQUEST['starttime'] . "\n" .
					"DTEND:" . $_REQUEST['endyear'] . $_REQUEST['endmonth'] . $_REQUEST['endday'] . "T" . $_REQUEST['endtime'] . "\n" .
					"STATUS:CONFIRMED\n" .
					"CATEGORIES:" . $_REQUEST['event_categories'] . "\n" .
					"SUMMARY:" . $_REQUEST['event_summary'] . "\n" .
					"DESCRIPTION:" . $_REQUEST['event_description'] . "\n" .
					"END:VEVENT\n" .
					"END:VCALENDAR";
	if (ob_get_length())
		echo('Some data has already been output, can\'t send PDF file');
	header('Content-Type: application/x-download');
	if (headers_sent())
		echo('Some data has already been output, can\'t send PDF file');
	header('Content-Length: ' . strlen($output));
	header('Content-Disposition: attachment; filename="' . $name . '"');
	header('Cache-Control: private, max-age=0, must-revalidate');
	header('Pragma: public');
	header('Content-Type: application/octet-stream');
	header('Content-Type: application/force-download');
	header('Content-type: application/pdf');
	header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header("Content-Transfer-Encoding: binary");
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
	ini_set('zlib.output_compression', '0');
	echo $output;
	die();
}

function espresso_ical_prepare($attendee_id) {
	global $org_options, $wpdb;
	$sql = "SELECT ea.event_id, ed.alt_email, ed.start_date, ed.end_date, ed.event_name, ed.event_desc, ea.event_time, ea.end_time FROM " . EVENTS_ATTENDEE_TABLE . " ea";
	$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ea.event_id = ed.id";
	$sql .= " WHERE ea.id = '" . $attendee_id . "'";
	$data = $wpdb->get_row($sql, OBJECT);
	$contact = ($data->alt_email == '') ? $org_options['contact_email'] : $data->alt_email . ',' . $org_options['contact_email'];
	$start_date = strtotime($data->start_date . ' ' . $data->event_time);
	$end_date = strtotime($data->end_date . ' ' . $data->end_time);
	$sql = "SELECT ec.category_name FROM " . EVENTS_CATEGORY_TABLE. " ec ";
	$sql .= "JOIN " . EVENTS_CATEGORY_REL_TABLE . " ecr ON ec.id = ecr.cat_id ";
	$sql .= "WHERE ecr.event_id = '" . $data->event_id . "'";
	$cats = $wpdb->get_col($sql);
	$categories = '';
	foreach($cats as $cat) {
		$categories .= $cat . ',';
	}
	$categories = rtrim($categories, ',');
	$action = strpbrk($_SERVER['REQUEST_URI'], '?') ? $_SERVER['REQUEST_URI'] . "&iCal=true" : $_SERVER['REQUEST_URI'] . "?iCal=true";
	$output = "<form id='view_form' action='" . $action . "' method='post' >";
	$output .= "<input style='display:none;' name='currentyear' type='text' value='" . date('Y') . "' >";
	$output .= "<input style='display:none;' name='currentmonth' type='text' value='" . date('m') . "' >";
	$output .= "<input style='display:none;' name='currentday' type='text' value='" . date('d') . "' >";
	$output .= "<input style='display:none;' name='currenttime' type='text' value='" . date('His') . "' >";
	$output .= "<input style='display:none;' name='attendee_id' type='text' value='" . $attendee_id . "' >";
	$output .= "<input style='display:none;' name='event_id' type='text' value='" . $data->event_id . "' >";
	$output .= "<input style='display:none;' name='contact' type='text' value='" . $contact . "' >";
	$output .= "<input style='display:none;' name='startyear' type='text' value='" . date('Y', $start_date) . "' >";
	$output .= "<input style='display:none;' name='startmonth' type='text' value='" . date('m', $start_date) . "' >";
	$output .= "<input style='display:none;' name='startday' type='text' value='" . date('d', $start_date) . "' >";
	$output .= "<input style='display:none;' name='starttime' type='text' value='" . date('His', $start_date) . "' >";
	$output .= "<input style='display:none;' name='endyear' type='text' value='" . date('Y', $end_date) . "' >";
	$output .= "<input style='display:none;' name='endmonth' type='text' value='" . date('m', $end_date) . "' >";
	$output .= "<input style='display:none;' name='endday' type='text' value='" . date('d', $end_date) . "' >";
	$output .= "<input style='display:none;' name='endtime' type='text' value='" . date('His', $end_date) . "' >";
	$output .= "<input style='display:none;' name='event_categories' type='text' value='" . $categories . "' >";
	$output .= "<input style='display:none;' name='event_summary' type='text' value='" . $data->event_name . "' >";
	$output .= "<input style='display:none;' name='event_description' type='text' value='" . $data->event_desc . "' >";
	$output .= "<input id='view_button' type='submit' class='btn_event_form_submit ui-priority-primary ui-state-default ui-corner-all' value='Add to Calendar' >";
	$output .= "</form>";
	return $output;
}