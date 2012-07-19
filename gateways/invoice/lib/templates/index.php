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
	<div id="invoice-header">
		<div id="logo-dv"><?php echo $invoice_logo_image; ?></div>

		<div id="invoice-info">
			<h2 id="invoice-hdr"><?php _e('Invoice', 'event_espresso')?></h2>
			<h3><b><?php _e('Date:', 'event_espresso')?></b> <span><?php echo $registration_date; ?></span></h3>
			<h3><b><?php _e('Invoice #', 'event_espresso')?></b> <span><?php echo $registration_code; ?></span></h3>
		</div>
		<!-- #invoice-info -->
		
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
		
		<div class="clear"></div>
	</div>
	<!-- #invoice-header -->
	

	<div id="bill-to" class="ship-bill-to"><b><?php _e('Bill To:', 'event_espresso')?></b></div>
	<div class="vcard" id="client-details">
		<div class="fn"><?php echo $name ?></div>
		<!--<div class="org">Client Company</div> -->
		<div class="adr">
			<!-- street-address -->
			<div class="street-address"><?php echo $attendee_address; ?></div>
			<div class="locality"><?php echo $attendee_city; ?> <?php echo $attendee_state; ?></div>
			<div id="client-postcode"><?php echo $attendee_zip; ?></div>
			<!--<div id="your-tax-number">SALES TAX: 193528491</div> -->
		</div>
		<!-- adr --> 
	</div>
	<!-- #client-details vcard -->
	
	<div id="ship-to" class="ship-bill-to"><b><?php _e('Ship To:', 'event_espresso')?></b></div>
	<div class="vcard" id="shipping-details">
		<div class="fn"><?php echo $ship_name ?></div>
		<!--<div class="org">Client Company</div> -->
		<div class="adr">
			<!-- street-address -->
			<div class="street-address"><?php echo $ship_address; ?></div>
			<div class="locality"><?php echo $ship_city; ?> <?php echo $ship_state; ?></div>
			<div id="client-postcode"><?php echo $ship_zip; ?></div>
			<!--<div id="your-tax-number">SALES TAX: 193528491</div> -->
		</div>
		<!-- adr --> 
	</div>
	<!-- #shipping-details vcard -->
	
	
	<table id="invoice-amount">
		<thead>
			<tr id="header_row">
				<th class="quantity_th"><span class=""><?php _e('Qty', 'event_espresso'); ?></span></th>
				<th class="left event_th"><?php _e('Event', 'event_espresso'); ?></th>
				<th class="left ticket_th"><?php _e('Ticket', 'event_espresso'); ?></th>
				<th class="left datetime_th"><?php _e('Date & Time', 'event_espresso'); ?></th>
				<th class="left attendee_th"><?php _e('Attendee', 'event_espresso'); ?></th>
				<th class="subtotal_th"><?php _e('Line Total', 'event_espresso'); ?></th>
			</tr>
		</thead>
		<tfoot>
			<?php echo $net_total; ?>
			<?php //echo $discount; ?>
			<tr id="total_tr">
				<td colspan="4">&nbsp;</td>
				<td class="total" id="total_currency"><?php _e('Total', 'event_espresso'); ?></td>
				<td class="total"><span class="float-left"><?php echo $currency_symbol?></span><?php echo $total_cost ?></td>
			</tr>
		</tfoot>
		<tbody>
			<!-- Create the table rows for data -->
			<?php echo $table_output;?>
		</tbody>
	</table>
	<!-- invoice-amount -->
	<div id="invoice-other">
		<h3><?php _e('Other Information', 'event_espresso'); ?></h3>
		<div id="company-reg-number"><strong>Company Registration Number:</strong> 9273109</div>
		<div id="contract-number"><strong>Contract/PO:</strong> PO 87227643</div>
	</div>
	<!-- invoice-other -->
	<div id="payment-details">
		<h3><?php _e('Payment Details', 'event_espresso'); ?></h3>
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
