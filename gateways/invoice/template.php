<?php

global $espresso_premium;
if ($espresso_premium != true)
	return;
global $wpdb, $org_options, $espresso_wp_user;
if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
	espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
}
$payment_settings = get_option('payment_data_' . $espresso_wp_user);
//Added by Imon
if (isset($_SESSION['espresso_session']['id'])) {
	unset($_SESSION['espresso_session']['id']);
}

define('FPDF_FONTPATH', EVENT_ESPRESSO_PLUGINFULLPATH . 'class/fpdf/font/');
require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'class/fpdf/fpdf.php';

require_once(dirname(__FILE__) . '/function.pdf.php'); //Added by Imon
//Added by Imon
$multi_reg = false;
$registration_id = $_REQUEST['registration_id'];
$admin = isset($_REQUEST['admin']) ? $_REQUEST['admin'] : false;
$registration_ids = array();
$c_sql = "select * from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where registration_id = '$registration_id' ";
//echo $c_sql;
$check = $wpdb->get_row($c_sql);
if ($check !== NULL) {
	$registration_id = $check->primary_registration_id;
	$registration_ids = $wpdb->get_results("select registration_id from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " where primary_registration_id = '$registration_id' ", ARRAY_A);
	$multi_reg = true;
} else {
	$registration_ids[] = array("registration_id" => $registration_id);
}
$attendees = $wpdb->get_results("SELECT a.*, e.event_name, e.wp_user wp_user FROM " . EVENTS_ATTENDEE_TABLE . " a JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id=a.event_id WHERE a.registration_id ='" . $registration_id . "' order by a.id LIMIT 0,1 ");

foreach ($attendees as $attendee) {
	$attendee_id = $attendee->id;
	$attendee_last = $attendee->lname;
	$attendee_first = $attendee->fname;
	$attendee_address = $attendee->address;
	$attendee_city = $attendee->city;
	$attendee_state = $attendee->state;
	$attendee_zip = $attendee->zip;
	$attendee_email = $attendee->email;
	//$attendee_organization_name = $attendee->organization_name;
	//$attendee_country = $attendee->country_id;
	$phone = $attendee->phone;
	$date = $attendee->date;
	$num_people = $attendee->quantity;
	$payment_status = $attendee->payment_status;
	$txn_type = $attendee->txn_type;
	$amount_pd = $attendee->amount_pd;
	$payment_date = $attendee->payment_date;
	$event_id = $attendee->event_id;
	$event_name = html_entity_decode(stripslashes($attendee->event_name), ENT_QUOTES, "UTF-8");
	$event->wp_user = function_exists('espresso_manager_pro_version') ? $attendee->wp_user : 1;
	$payment_settings = get_option('payment_data_' . $event->wp_user);
	//$attendee_session = $attendee->attendee_session;
	//$registration_id=$attendee->registration_id;
}

#$num_people = isset($num_people) && $num_people > 0 ? $num_people : espresso_count_attendees_for_registration($attendee_id);
#$event_meta = event_espresso_get_event_meta($event_id);
//	$event_data['additional_attendee_reg_info']

if ($payment_status == "Completed") {
	$admin = true;
}

$payment_status = 'Pending';
$txn_type = 'INV';
$payment_date = date("d-m-Y");

//Added by Imon
if (count($registration_ids) > 0 && $admin == false) {
	foreach ($registration_ids as $reg_id) {
		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_status . "', txn_type = '" . $txn_type . "', payment_date ='" . $payment_date . "'  WHERE registration_id ='" . $reg_id['registration_id'] . "'";
		$wpdb->query($sql);
	}
}

//Query Database for event and get variable
/* 	$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");
  foreach ($events as $event){
  //$event_id = $event->id;
  $event_name = html_entity_decode(stripslashes($event->event_name),ENT_QUOTES,"UTF-8");
  $event_desc = $event->event_desc;
  $event_description = $event->event_desc;
  $event_identifier = $event->event_identifier;
  $start_date = $event->start_date;
  } */
//This is an example of how to get custom questions for an attendee
//Get the questions for the attendee
/* $q_sql = "SELECT ea.answer, eq.question
  FROM " . EVENTS_ANSWER_TABLE . " ea
  LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id
  WHERE ea.registration_id = '".$registration_id."'";
  $q_sql .= " AND ea.question_id = '9' ";
  $q_sql .= " ORDER BY eq.sequence asc ";
  $wpdb->get_results($q_sql);

  $organization_name = $wpdb->last_result[0]->answer;//question_id = '9' */


//Create a payment link
$payment_link = home_url() . "/?page_id=" . $org_options['return_url'] . "&id=" . $attendee_id;

//Instanciation of inherited class
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->SetAuthor(pdftext($org_options['organization']));
if (isset($payment_settings['invoice']['pdf_title'])) {
	$pdf->SetTitle(pdftext($event_name . ' - ' . $payment_settings['invoice']['pdf_title']));
} else {
	$pdf->SetTitle(pdftext($event_name));
}

//$pdf->SetAutoPageBreak('auto');
$pdf->AddPage();
//Create the top right of invoice below header
$pdf->SetFont('Times', '', 12);
$pdf->Cell(180, 0, __('Date: ', 'event_espresso') . date('m-d-Y'), 0, 1, 'R'); //Set invoice date
$pdf->Cell(180, 10, __('Primary Attendee ID: ', 'event_espresso') . $attendee_id, 0, 0, 'R'); //Set Invoice number
$pdf->Ln(0);

//Set the top left of invoice below header
$pdf->SetFont('Times', 'BI', 14);
if (isset($payment_settings['invoice']['payable_to'])) {
	$pdf->MultiCell(0, 10, pdftext($payment_settings['invoice']['payable_to']), 0, 'L'); //Set payable to
} else {
	$pdf->MultiCell(0, 10, pdftext(''), 0, 'L'); //Set payable to
}
$pdf->SetFont('Times', '', 12);
if (isset($invoice_payment_settings['payment_address'])) {
	$pdf->MultiCell(50, 5, pdftext($invoice_payment_settings['payment_address']), 0, 'L'); //Set address
} else {
	$pdf->MultiCell(50, 5, pdftext(''), 0, 'L'); //Set address
}
$pdf->Ln(5);

//Set the biiling information
$pdf->SetFont('Times', 'B', 12);
$pdf->Cell(50, 5, __('Bill To: ', 'event_espresso'), 0, 1, 'L'); //Set biil to
$pdf->SetFont('Times', '', 12);
$pdf->Cell(50, 5, pdftext($attendee_first . ' ' . $attendee_last), 0, 1, 'L'); //Set attendee name
$pdf->Cell(50, 5, $attendee_email, 0, 1, 'L'); //Set attendee email
//Set attendee address
$attendee_address != '' ? $pdf->Cell(100, 5, $attendee_address, 0, 1, 'L') : '';
$pdf->Cell(100, 5, (pdftext($attendee_city != '' ? $attendee_city : '') . ($attendee_state != '' ? ' ' . $attendee_state : '')), 0, 1, 'L');
$attendee_zip != '' ? $pdf->Cell(50, 5, $attendee_zip, 0, 1, 'L') : '';

$pdf->Ln(10);

//Added by Imon
$attendees = array();
$total_cost = 0.00;
foreach ($registration_ids as $reg_id) {
	$sql = "select ea.registration_id, ed.event_name, ed.start_date, ed.event_identifier, ea.fname, ea.lname, eac.quantity, eac.cost from " . EVENTS_ATTENDEE_TABLE . " ea
				inner join " . EVENTS_ATTENDEE_COST_TABLE . " eac on ea.id = eac.attendee_id
				inner join " . EVENTS_DETAIL_TABLE . " ed on ea.event_id = ed.id
				where ea.registration_id = '" . $reg_id['registration_id'] . "' order by ed.event_name ";

	$tmp_attendees = $wpdb->get_results($sql, ARRAY_A);

	foreach ($tmp_attendees as $tmp_attendee) {
		$sub_total = $tmp_attendee["cost"] * $tmp_attendee["quantity"];
		$attendees[] = $pdf->LoadData(array(
				pdftext($tmp_attendee["event_name"] . "[" . date('m-d-Y', strtotime($tmp_attendee['start_date'])) . "]") . ' >> '
				. pdftext($tmp_attendee["fname"] . " " . $tmp_attendee["lname"]) . ';'
				. pdftext($tmp_attendee["quantity"]) . ';'
				. doubleval($tmp_attendee["cost"]) . ';'
				. doubleval($sub_total)
						)
		);
		$total_cost += $sub_total;
		$event_identifier = $tmp_attendee["event_identifier"];
	}
}
$header = array("Event & Attendee", "Quantity", "Per Unit", "Sub total");
$w = array(100, 25, 30, 30);
$alling = array('L', 'L', 'C', 'C', 'C');
$left = 100 + 25 + 30;
$right = 30;

$pdf->ImprovedTable($header, $attendees, $w, $alling);

$pdf->Ln();
if ($amount_pd != $total_cost) {
	$pdf->InvoiceTotals("Total:", $total_cost, $left, $right);
	$discount = $amount_pd - $total_cost;
	if ($discount < 0) {
		$text = "Discount:";
	} else {
		$text = "Extra:";
	}
	$pdf->InvoiceTotals($text, $discount, $left, $right);
}
$pdf->InvoiceTotals("Total due:", $amount_pd, $left, $right);
$pdf->Ln(10);

//Build the payment link and instructions
if (isset($payment_settings['invoice']['pdf_instructions'])) {
	$pdf->MultiCell(100, 5, pdftext($payment_settings['invoice']['pdf_instructions']), 0, 'L'); //Set instructions
} else {
	$pdf->MultiCell(100, 5, pdftext(''), 0, 'L'); //Set instructions
}
$pdf->SetFont('Arial', 'BU', 20);
//$pdf->Cell(200,20,'Pay Online',0,1,'C',0,$payment_link);//Set payment link

$pdf->Output('Invoice_' . $attendee_id . '_' . $event_identifier . '.pdf', 'D');
