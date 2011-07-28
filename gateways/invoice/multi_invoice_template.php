<?php
/*
 * Multi event incvoice template. 
 *
 */

@session_start();
require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'class/html2fpdf/generate_pdf.php';
require("multi_invoice_content.php");

$pdf_content = event_espresso_construct_multi_invoice(array( 'espresso_session_id' => $_SESSION['espresso_session_id'], 'multi_reg' => true ));


event_espresso_generat_pdf( $name = "Invoice", $pdf_content )
?>