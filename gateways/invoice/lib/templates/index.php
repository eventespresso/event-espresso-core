<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title><?php echo $organization; ?> <?php _e('Invoice for', 'event_espresso'); ?> <?php echo $name; ?> | <?php echo $primary_attendee['registration_id'] ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- Base Stylesheet do not change or remove -->
<link rel="stylesheet" type="text/css" href="<?php echo $base_url; ?>base.css" media="screen" />

<!-- Print Style Sheet -->
<link rel="stylesheet" type="text/css" href="<?php echo $base_url; ?>css/print/<?php echo str_replace('.css', '',$invoice_css); ?>_print.css" media="print" />

<!-- Primary Style Sheet -->
<link rel="stylesheet" type="text/css" href="<?php echo $base_url; ?>css/<?php echo $invoice_css; ?>" />

<!-- Make sure the buttons don't print -->
<style type="text/css">
@media print{
	.noPrint{display:none!important;}
}
</style>
</head>
<body>
<div class="print_button_div">
	<form>
		<input class="print_button noPrint" type="button" value=" Print Invoice " onclick="window.print();return false;" />
	</form>
	<form method="post" action="<?php echo $download_link; ?>" >
		<input class="print_button noPrint" type="submit" value=" Download PDF " />
	</form>
</div>
<div id="invoice">
	<div id="invoice-header"> <?php echo $invoice_logo_image; ?>
		<!-- hCard microformat -->
		<div class="vcard" id="company-address">
			<div class="fn org"><strong><?php echo $organization; ?></strong></div>
			<div class="adr">
				<div class="street-address"><?php echo $street; ?>
				</div>
				<!-- street-address -->
				<div class="locality"><?php echo $city; ?>, <?php echo $state; ?></div>
				<div id="company-postcode"><span class="postal-code"><?php echo $zip; ?></span></div>
			</div>
			<!-- adr -->
			<div class="email"><?php echo $email; ?></div>
		</div>
		<!-- company-address vcard --> 
		
	</div>
	<!-- #invoice-header -->
	<div id="invoice-info">
		<h2>Invoice <strong><?php echo $registration_code; ?></strong></h2>
		<h3><?php echo $registration_date; ?></h3>
	</div>
	<!-- #invoice-info -->
	<div class="vcard" id="client-details">
		<div class="fn"><?php echo $name ?></div>
		<!--<div class="org">Client Company</div> -->
		<div class="adr">
			<div class="street-address"><?php echo $attendee_address; ?>
			</div>
			<!-- street-address -->
			<div class="locality"><?php echo $attendee_city; ?>, <?php echo $attendee_state; ?></div>
			<div id="client-postcode"><?php echo $attendee_zip; ?></div>
			<!--<div id="your-tax-number">SALES TAX: 193528491</div> -->
		</div>
		<!-- adr --> 
	</div>
	<!-- #client-details vcard -->
	<table id="invoice-amount">
		<thead>
			<tr id="header_row">
				<th class="quantity_th"><?php _e('Quantity', 'event_espresso'); ?></th>
				<th class="left details_th"><?php _e('Event & Attendee', 'event_espresso'); ?></th>
				<th class="unitprice_th"><?php _e('Unit Price', 'event_espresso'); ?> (<?php echo $currency_symbol ?>)</th>
				<th class="subtotal_th"><?php _e('Net Subtotal', 'event_espresso'); ?> (<?php echo $currency_symbol ?>)</th>
			</tr>
		</thead>
		<tfoot>
			<tr id="net_total_tr">
				<td colspan="2">&nbsp;</td>
				<td class="item_r"><?php _e('Net Total', 'event_espresso'); ?></td>
				<td class="item_r"><?php echo $currency_symbol.$net_total ?></td>
			</tr>
			<!--<tr id="vat_tr">
				<td colspan="2">&nbsp;</td>
				<td class="item_r">VAT</td>
				<td class="item_r">393.75</td>
			</tr> -->
			<tr id="total_tr">
				<td colspan="2">&nbsp;</td>
				<td class="total" id="total_currency"><span class="currency"><?php echo $currency_symbol; ?> </span> Total</td>
				<td class="total"><?php echo $currency_symbol.$total_cost ?></td>
			</tr>
		</tfoot>
		<tbody>
			<!-- Create the table rows for data -->
			<?php echo $table_output;?>
		</tbody>
	</table>
	<!-- invoice-amount -->
	<div id="invoice-other">
		<h2><?php _e('Other Information', 'event_espresso'); ?></h2>
		<div id="company-reg-number"><strong>Company Registration Number:</strong> 9273109</div>
		<div id="contract-number"><strong>Contract/PO:</strong> PO 87227643</div>
	</div>
	<!-- invoice-other -->
	<div id="payment-details">
		<h2><?php _e('Payment Details', 'event_espresso'); ?></h2>
		<div id="bank_name">Bank Name</div>
		<div id="sort-code"><strong>Bank/Sort Code:</strong> 32-75-97</div>
		<div id="account-number"><strong>Account Number:</strong> 28270761</div>
		<div id="iban"><strong>IBAN:</strong> 973547</div>
		<div id="bic"><strong>BIC:</strong> 220197</div>
		<div id="payment-reference"><strong><?php _e('Payment Reference:', 'event_espresso'); ?></strong> INV001</div>
	</div>
	<!-- payment-details -->
	<div id="comments"><?php echo $pdf_instructions; ?></div>
	<!-- comments --> 
</div>
<div class="print_button_div">
	<form>
		<input class="print_button noPrint" type="button" value=" Print Invoice " onclick="window.print();return false;" />
	</form>
	<form method="post" action="<?php echo home_url(); ?>/?download_invoice=true&amp;attendee_id=<?php echo $data->attendee->id ?>&amp;registration_id=<?php echo $data->attendee->registration_id ?>" >
		<input class="print_button noPrint" type="submit" value=" Download PDF " />
	</form>
</div>
</body>
</html>
