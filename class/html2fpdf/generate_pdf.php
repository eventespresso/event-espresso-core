<?php

if ( !function_exists( 'event_espresso_generat_pdf' ) )
{


    function event_espresso_generat_pdf( $name = "Invoice", $content ) {

        require_once 'html2fpdf.php';

//exit($content);
        $pdf = new HTML2FPDF( 'P', 'mm', 'Letter' );
        $pdf->AddPage();
        $pdf->WriteHTML( $content );
        $pdf->Output( $name . '.pdf', 'D' );
    }

}
?>
