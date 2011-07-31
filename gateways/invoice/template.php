<?php
define('FPDF_FONTPATH', EVENT_ESPRESSO_PLUGINFULLPATH . 'class/fpdf/font/');
if(isset($_SESSION['espresso_session_id'])) unset($_SESSION['espresso_session_id']);
require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'class/fpdf/fpdf.php';
global $espresso_premium; if ($espresso_premium != true) return;
global $wpdb, $org_options;
$invoice_payment_settings = get_option('event_espresso_invoice_payment_settings');

$attendees = $wpdb->get_results("SELECT * FROM ". EVENTS_ATTENDEE_TABLE ." WHERE registration_id ='" . $_REQUEST['registration_id'] . "' order by id LIMIT 0,1 ");
	foreach ($attendees as $attendee){
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
		$attendee_session = $attendee->attendee_session;
		$registration_id=$attendee->registration_id;
	}

	$num_people = isset($num_people) && $num_people > 0 ? $num_people : espresso_count_attendees_for_registration($attendee_id);
	$event_meta = event_espresso_get_event_meta($event_id);
//	$event_data['additional_attendee_reg_info']
	$payment_status= 'Pending';
	$txn_type = 'INV';
	$payment_date = date("d-m-Y");

	$sql = "UPDATE ". EVENTS_ATTENDEE_TABLE . " SET payment_status = '" . $payment_status . "', txn_type = '" . $txn_type . "', payment_date ='" . $payment_date . "'  WHERE registration_id ='" . espresso_registration_id($attendee_id) . "'";

	$wpdb->query($sql);

	//Query Database for event and get variable
	$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");
		foreach ($events as $event){
			//$event_id = $event->id;
			$event_name = html_entity_decode(stripslashes($event->event_name),ENT_QUOTES,"UTF-8");
			$event_desc = $event->event_desc;
			$event_description = $event->event_desc;
			$event_identifier = $event->event_identifier;
			$start_date = $event->start_date;
	}

	//This is an example of how to get custom questions for an attendee
	//Get the questions for the attendee
		/*$q_sql = "SELECT ea.answer, eq.question
					FROM " . EVENTS_ANSWER_TABLE . " ea
					LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id
					WHERE ea.registration_id = '".$registration_id."'";
		$q_sql .= " AND ea.question_id = '9' ";
		$q_sql .= " ORDER BY eq.sequence asc ";
		$wpdb->get_results($q_sql);

		$organization_name = $wpdb->last_result[0]->answer;//question_id = '9'*/


//Build the PDF
function pdftext($val){
	return iconv("UTF-8", "ISO-8859-1",$val);
}
class PDF extends FPDF{
	//Page header
	function Header(){
		global $wpdb, $org_options;
		$invoice_payment_settings = get_option('event_espresso_invoice_payment_settings');
		//Logo
		if (isset($invoice_payment_settings['image_url'])&&trim($invoice_payment_settings['image_url']) !=''){
			$this->Image($invoice_payment_settings['image_url'],10,8,90);//Set the logo if it is available
		}else{
			$this->SetFont('Arial','B',15);
			$this->Cell(10,10,pdftext($org_options['organization']),0,0,'L');//If no logo, then display the organizatin name
		}

		//Arial bold 15
		$this->SetFont('Arial','B',15);
		//Move to the right
		$this->Cell(80);
		//Title
		if(isset($invoice_payment_settings['pdf_title']))
			$this->MultiCell(100,10,pdftext($invoice_payment_settings['pdf_title']),0,'R');//Set the right header
		else
			$this->MultiCell(100,10,pdftext(''),0,'R');//Set the right header
		//Line break
		$this->Ln(20);
	}

	function LoadData($file){
		$lines=$file;
		$data=array();
		foreach($lines as $line)
			$data[]=explode(';',chop($line));
		return $data;
	}


	//Better table
	function ImprovedTable($header,$event_data,$w=array(100,35,40)){
		global $org_options;

#echo "<pre>".print_r($event_data)."</pre>";
#die();
		//Column widths
		//Header
		for($i=0;$i<count($header);$i++)
			$this->Cell($w[$i],7,$header[$i],1,0,'C');
		$this->Ln();
		$x = $this->GetX();
		$y = $this->GetY();
		//Data
		foreach($event_data as $data){
			foreach($data as $row){
				$y1 = $this->GetY();
				$this->MultiCell($w[0],6,$row[0],'LBR');
				$y2 = $this->GetY();
				$yH = $y2 - $y1;
				$this->SetXY($x + $w[0], $this->GetY() - $yH);
				$this->Cell($w[1],$yH,$row[1],'LBR',0,'C');
				$this->Cell($w[2],$yH,$row[2],'LBR',0,'C');
				if( isset( $row[3] ) ){
					$this->Cell($w[3],$yH,$org_options['currency_symbol'].number_format($row[3],2, '.', ''),'LBR',0,'C');
				}
				if( isset( $row[4] ) ){
					$this->Cell($w[4],$yH,$org_options['currency_symbol'].number_format($row[4],2, '.', ''),'LBR',0,'C');
				}
				$this->Ln();
			}
		}
		$this->Cell(array_sum($w),0,'','T');
	}
	function InvoiceTotals($total_cost,$left_cell = 125, $right_cell = 35){
		global $org_options;
		$this->SetFillColor(192,192,192);
		$this->Cell($left_cell, 10, 'Total:', 0, 0, 'R');
		$this->Cell($right_cell, 10, $org_options['currency_symbol'].number_format($total_cost,2, '.', ''), 0, 1, 'C');
	}
	//Page footer
	function Footer(){
		//Position at 1.5 cm from bottom
		$this->SetY(-15);
		//Arial italic 8
		$this->SetFont('Arial','I',8);
		//Page number
		$this->Cell(0,10, __('Page','event_espresso').$this->PageNo().'/{nb}',0,0,'C');
	}
}

//Create a payment link
$payment_link = home_url() . "/?page_id=" . $org_options['return_url'] . "&id=" . $attendee_id;

//Instanciation of inherited class
$pdf=new PDF();
$pdf->AliasNbPages();
$pdf->SetAuthor( pdftext($org_options['organization']) );
if(isset($invoice_payment_settings['pdf_title']))
    $pdf->SetTitle( pdftext($event_name . ' - ' . $invoice_payment_settings['pdf_title']) );
else
    $pdf->SetTitle( pdftext($event_name) );

//$pdf->SetAutoPageBreak('auto');
$pdf->AddPage();
//Create the top right of invoice below header
$pdf->SetFont('Times','',12);
$pdf->Cell(180,0, __('Date: ','event_espresso'). date('m-d-Y'),0,1, 'R');//Set invoice date
$pdf->Cell(180,10,__('Attendee ID: ','event_espresso'). $attendee_id,0,0, 'R');//Set Invoice number
$pdf->Ln(0);

//Set the top left of invoice below header
$pdf->SetFont('Times','BI',14);
if(isset($invoice_payment_settings['payable_to']))
    $pdf->MultiCell(0,10,pdftext($invoice_payment_settings['payable_to']),0,'L');//Set payable to
else
    $pdf->MultiCell(0,10,pdftext(''),0,'L');//Set payable to
$pdf->SetFont('Times','',12);
if(isset($invoice_payment_settings['payment_address']))
    $pdf->MultiCell(50,5,pdftext($invoice_payment_settings['payment_address']),0, 'L');//Set address
else
    $pdf->MultiCell(50,5,pdftext(''),0, 'L');//Set address
$pdf->Ln(5);

//Set the biiling information
$pdf->SetFont('Times','B',12);
$pdf->Cell(50,5,__('Bill To: ','event_espresso'),0,1,'L');//Set biil to
$pdf->SetFont('Times','',12);
$pdf->Cell(50,5,pdftext($attendee_first . ' ' . $attendee_last),0,1, 'L');//Set attendee name
$pdf->Cell(50,5,$attendee_email,0,1,'L');//Set attendee email
//Set attendee address
$attendee_address != '' ? $pdf->Cell(100,5,$attendee_address,0,1,'L') :'';
$pdf->Cell(100,5,(pdftext($attendee_city != '' ? $attendee_city :''). ($attendee_state != '' ? ' ' . $attendee_state :'')),0,1,'L');
$attendee_zip != '' ? $pdf->Cell(50,5,$attendee_zip,0,1,'L') :'';

$pdf->Ln(10);

//Build the table for the event details
//Column titles
//Event Data
$left_cell = 0;
$right_cell = 0;
if( $num_people > 1 ){
	if( $event_meta['additional_attendee_reg_info'] == 1 || espresso_quantity_for_registration($attendee_id) ){
		$w=array(80,15,25,35,35);
		$left_cell = 80+15+25+35;
		$right_cell = 35;
		$header=array(__('Event Name','event_espresso'),__('Qty.','event_espresso'),__('Event Date','event_espresso'),__('Per Unit','event_espresso'),__('Total Cost','event_espresso'));
		$cost = $amount_pd;# * $num_people;
		$per_unit = $amount_pd / $num_people;
		$event_data[] = $pdf->LoadData (array(pdftext($event_name) . ';' . pdftext( $num_people) . ';' . date('m-d-Y',strtotime($start_date)) . ';' . doubleval($per_unit) . ';' . $cost ) );
		$cost_total += $cost;
	}else{
		$w=array(80,25,25,35);
		$left_cell = 80+25+25;
		$right_cell = 35;
		$header=array(__('Event Name','event_espresso'),__('Attendee','event_espresso'),__('Event Date','event_espresso'),__('Per Unit','event_espresso'));
        $data = $wpdb->get_results("SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . $registration_id . "' ORDER BY id ", ARRAY_A);
        if ($wpdb->num_rows > 0) {
            $i = 1;
            $div = $amount_pd / $num_people;
            foreach ($data as $row) {
                $afname = $row['fname'];
                $alname = $row['lname'];
                $aemail = $row['email'];
				$event_data[] = $pdf->LoadData( array(
					pdftext($event_name) . ' ;' .
					pdftext($afname." ".$alname) . ';' .
					date('m-d-Y',strtotime($start_date)) . ';' .
					doubleval($div)
				) );
                $i++;
            }
            $cost_total = $amount_pd;
        }
	}
}else{
$multi_events = $wpdb->get_results("SELECT COUNT(*) as cnt, " . EVENTS_DETAIL_TABLE . ".id as event_id, " . EVENTS_DETAIL_TABLE . ".event_name, " . EVENTS_DETAIL_TABLE . ".start_date, " . EVENTS_PRICES_TABLE . ".event_cost, " . EVENTS_PRICES_TABLE . ".surcharge FROM ". EVENTS_ATTENDEE_TABLE ." LEFT JOIN " . EVENTS_DETAIL_TABLE . " ON " . EVENTS_ATTENDEE_TABLE . ".event_id = " . EVENTS_DETAIL_TABLE . ".id LEFT JOIN " . EVENTS_PRICES_TABLE . " ON " . EVENTS_ATTENDEE_TABLE . ".event_id = " . EVENTS_PRICES_TABLE . ".event_id WHERE " . EVENTS_ATTENDEE_TABLE . ".attendee_session = '" . $attendee_session . "'  AND " . EVENTS_ATTENDEE_TABLE . ".attendee_session != '' GROUP BY " . EVENTS_DETAIL_TABLE . ".id;" );
	if( count($multi_events) > 0 ){	//	multiple events
		$w=array(80,15,25,35,35);
		$left_cell = 80+15+25+35;
		$right_cell = 35;
		$header=array(__('Event ID & Name','event_espresso'),__('Qty.','event_espresso'),__('Event Date','event_espresso'),__('Per Unit','event_espresso'),__('Total Cost','event_espresso'));
		foreach($multi_events as $s_event){
			$event_name = $s_event->event_name;
			$start_date = $s_event->start_date;
			$cost = doubleval($s_event->event_cost * $s_event->cnt );
			$event_data[] = $pdf->LoadData (array(pdftext("#".$s_event->event_id." ".$s_event->event_name) . ';' . pdftext( $s_event->cnt) . ';' . date('m-d-Y',strtotime($s_event->start_date)) . ';' . doubleval($s_event->event_cost) . ';' . $cost ) );
			empty($cost_total) ? $cost_total = $cost : $cost_total += $cost;
		}
	}else{
		$w=array(100,35,40);
		$left_cell = 100+35;
		$right_cell = 40;
		$header=array(__('Event Name','event_espresso'),__('Event Date','event_espresso'),__('Amount Owed','event_espresso'));
		$event_data[] = $pdf->LoadData (array(pdftext($event_name) . ';' . date('m-d-Y',strtotime($start_date)) . ';' . $amount_pd));
		$cost_total += $amount_pd;
	}
}
$pdf->ImprovedTable($header, $event_data,$w);
$pdf->Ln();
$pdf->InvoiceTotals($cost_total,$left_cell,$right_cell);
$pdf->Ln(10);


//Build the payment link and instructions
if(isset($invoice_payment_settings['pdf_instructions']))
    $pdf->MultiCell(100,5,pdftext($invoice_payment_settings['pdf_instructions']),0,'L');//Set instructions
else
    $pdf->MultiCell(100,5,pdftext(''),0,'L');//Set instructions

$pdf->SetFont('Arial','BU',20);
//$pdf->Cell(200,20,'Pay Online',0,1,'C',0,$payment_link);//Set payment link

$pdf->Output($event_identifier.'.pdf','D');
