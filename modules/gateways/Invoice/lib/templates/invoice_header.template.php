<?php

/**
 * @deprecated 4.9.13
 * @var string $invoice_css
 * @var string $download_link
 */

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
    <title>[organization]<?php esc_html__(' Invoice #', 'event_espresso'); ?>[registration_code]
        <?php esc_html__(
            ' for ',
            'event_espresso'
        ); ?>[name]</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!-- Base Stylesheet do not change or remove -->
    <link rel="stylesheet" type="text/css" href="[base_url]base.css" media="screen"/>
    <!-- Print Style Sheet -->
    <link rel="stylesheet" type="text/css"
          href="[base_url]css/print/<?php echo str_replace('.css', '', $invoice_css); ?>_print.css" media="print"/>
    <!-- Primary Style Sheet -->
    <link rel="stylesheet" type="text/css" href="[base_url]css/<?php echo esc_attr($invoice_css); ?>"/>
    <!-- Make sure the buttons don't print -->
    <style type="text/css">
        @media print {
            .noPrint {
                display: none !important;
                height: 0 !important;
                width: 0 !important;
            }
        }

        @page {
            width: 100%;
            margin-left: 0px;
            margin-right: 0px
        }
    </style>
</head>
<body>

<div class="print_button_div">
    <form>
        <input class="print_button noPrint" type="button" value="<?php esc_html_e('Print', 'event_espresso'); ?>"
               onClick="window.print();return false;"/>
    </form>
    <form method="post" action="<?php echo esc_url_raw($download_link); ?>">
        <input class="print_button noPrint" type="submit" value="<?php esc_html_e('Download PDF', 'event_espresso'); ?>"/>
    </form>
    <div class="clear"></div>
</div>
