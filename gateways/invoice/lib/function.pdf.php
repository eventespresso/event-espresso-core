<?php

// this temp stop gap for Euro decode issue
if (getCountryZoneId($org_options['organization_country']) == '2') {
	$currency_sign = 'Euro: ';
} else {
	$currency_sign = html_entity_decode($org_options['currency_symbol'], ENT_QUOTES);
}

class PDF extends FPDF {

	//Page header
	function Header() {
		global $wpdb, $org_options, $espresso_wp_user;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		$payment_settings = get_option('payment_data_' . $espresso_wp_user);
		//Logo
		if (isset($payment_settings['invoice']['invoice_logo_url']) && trim($payment_settings['invoice']['invoice_logo_url']) != '') {
			$this->Image($payment_settings['invoice']['invoice_logo_url'], 10, 8, 90); //Set the logo if it is available
		} else {
			$this->SetFont('Arial', 'B', 15);
			$this->Cell(10, 10, pdftext($org_options['organization']), 0, 0, 'L'); //If no logo, then display the organizatin name
		}

		//Arial bold 15
		$this->SetFont('Arial', 'B', 15);
		//Move to the right
		$this->Cell(80);
		//Title
		if (isset($payment_settings['invoice']['pdf_title']))
			$this->MultiCell(100, 10, pdftext($payment_settings['invoice']['pdf_title']), 0, 'R'); //Set the right header
		else
			$this->MultiCell(100, 10, pdftext(''), 0, 'R'); //Set the right header


//Line break
		$this->Ln(20);
	}

	function LoadData($file) {
		$lines = $file;
		$data = array();
		foreach ($lines as $line)
			$data[] = explode(';', chop($line));
		return $data;
	}

	//Better table
	function ImprovedTable($header, $event_data, $w=array(100, 35, 40)) {
		global $org_options, $currency_sign;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		//Column widths
		//Header
		for ($i = 0; $i < count($header); $i++)
			$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C');
		$this->Ln();
		$x = $this->GetX();
		$y = $this->GetY();
		//Data
		foreach ($event_data as $data) {
			foreach ($data as $row) {
				$y1 = $this->GetY();
				$this->MultiCell($w[0], 6, $row[0], 'LBR');
				$y2 = $this->GetY();
				$yH = $y2 - $y1;
				$this->SetXY($x + $w[0], $this->GetY() - $yH);
				$this->Cell($w[1], $yH, $row[1], 'LBR', 0, 'C');
				$this->Cell($w[2], $yH, $row[2], 'LBR', 0, 'C');
				if (isset($row[3])) {
					$this->Cell($w[3], $yH, $currency_sign . number_format($row[3], 2, '.', ''), 'LBR', 0, 'C');
				}
				if (isset($row[4])) {
					$this->Cell($w[4], $yH, $currency_sign . number_format($row[4], 2, '.', ''), 'LBR', 0, 'C');
				}
				$this->Ln();
			}
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}

	function InvoiceTotals($text, $total_cost, $left_cell = 125, $right_cell = 35) {
		global $org_options, $currency_sign;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		$this->SetFillColor(192, 192, 192);
		$this->Cell($left_cell, 10, $text, 0, 0, 'R');
		$minus = '';
		if ($total_cost < 0) {
			$minus = '-';
			$total_cost = (-1) * $total_cost;
		}
		$this->Cell($right_cell, 10, $minus . $currency_sign . number_format($total_cost, 2, '.', ''), 0, 1, 'C');
	}

	//Page footer
	function Footer() {
		//Position at 1.5 cm from bottom
		$this->SetY(-15);
		//Arial italic 8
		$this->SetFont('Arial', 'I', 8);
		//Page number
		$this->Cell(0, 10, __('Page', 'event_espresso') . $this->PageNo() . '/{nb}', 0, 0, 'C');
	}

}

//Build the PDF
function pdftext($val) {
	return iconv("UTF-8", "ISO-8859-1", stripslashes_deep($val));
}