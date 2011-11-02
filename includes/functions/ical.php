<?php

function espresso_ical() {
	$name = "hello.ical";
	$output = "BEGIN:VCALENDAR\n" .
					"PRODID:-//xyz Corp//NONSGML PDA Calendar Version 1.0//EN\n" .
					"VERSION:2.0\n" .
					"BEGIN:VEVENT\n" .
					"DTSTAMP:" . $_REQUEST['currentyear'] . $_REQUEST['currentmonth'] . $_REQUEST['currentday'] . "T" . $_REQUEST['currenttime'] . "\n" .
					"UID:" . $_REQUEST['attendee_id'] . "@" . $_REQUEST['event_id'] . "\n" .
					"ORGANIZER:mailto:" . $_REQUEST['contact'] . "\n" .
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

function espresso_ical_prepare() {
	$style = "Hello World!";
	$action = strpbrk($_SERVER['REQUEST_URI'], '?') ? $_SERVER['REQUEST_URI'] . "&iCal=true" : $_SERVER['REQUEST_URI'] . "?iCal=true";
	$output = "<form id='view_form' action='" . $action . "' method='post' >";
	$output .= "<input style='display:none;' name='currentyear' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='currentmonth' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='currentday' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='currenttime' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='attendee_id' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='event_id' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='contact' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='startyear' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='startmonth' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='startday' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='starttime' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='endyear' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='endmonth' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='endday' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='endtime' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='event_categories' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='event_summary' type='text' value='" . $style . "' >";
	$output .= "<input style='display:none;' name='event_description' type='text' value='" . $style . "' >";
	$output .= "<input id='view_button' type='submit' value='Add to Calendar' >";
	$output .= "</form>";
	return $output;
}