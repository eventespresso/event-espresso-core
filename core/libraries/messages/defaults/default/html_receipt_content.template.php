<?php
/**
 * This is the template for the html messenger and receipt message type main content field.
 */

//figure out what to use for payment instructions that is dependent on whether the corresponding value is existent in invoice settings from an old install.
$payment_settings = EE_Registry::instance()->CFG->gateway->payment_settings;
$invoice_settings = isset( $payment_settings['Invoice'] ) ? $payment_settings['Invoice'] : array();
$payment_instructions = !empty( $invoice_settings['pdf_instructions'] ) ? $invoice_settings['pdf_instructions'] : __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of the event date.', 'event_espresso' );
?>
<div class="print_button_div">
	<form method="post" action="[DISPLAY_PDF_URL]" >
		<input class="print_button noPrint" type="submit" value="<?php _e('Download PDF', 'event_espresso'); ?>" />
	</form>
	<div class="clear"></div>
</div>
<div id="invoice">

	<table id="invoice-header" class="not-really-a-table">
		<tr>
			<td id="logo-dv">
				[INVOICE_LOGO]
				<div class="vcard" id="company-address">
					<div class="fn org"><strong>[COMPANY]</strong></div>
					<div class="adr">
						<div class="street-address">[CO_ADD1][CO_ADD2]
						</div>
						<!-- street-address -->
						<div class="locality">[CO_CITY], [CO_STATE]</div>
						<div id="company-postcode"><span class="postal-code">[CO_ZIP]</span></div>
					</div>
					<!-- adr -->
					<div class="email">[CO_EMAIL]</div>
					<div class="vat">[CO_TAX_NUMBER_*]</div>
				</div>
			</td>
			<td>
				<div id="invoice-info">
					<h2 id="invoice-hdr"><?php _e('Order Confirmation', 'event_espresso')?></h2>
					<h3 id="invoice-date"><?php _e('Date:', 'event_espresso')?> <span class="plain-text">[PRIMARY_REGISTRANT_REGISTRATION_DATE]</span></h3>
					<h3 id="invoice-txn-id"><?php _e('Transaction ID:', 'event_espresso')?> <span class="plain-text">[TXN_ID]</span></h3>
					<h3 id="invoice-txn-status"><?php _e('Status:', 'event_espresso')?> <span class="[TXN_STATUS_ID] plain-text">[TXN_STATUS]</span></h3>
				</div>
			</td>
		</tr>
	</table>
	<div class="events">
		[EVENT_LIST]
	</div> <!-- end .events -->

	<div class="taxes">
		<h3 class="section-title"><?php _e("Taxes",'event_espresso')?></h3>
		<table class="invoice-amount">

			<thead>
				<tr class="header_row">
					<th class="left ticket_th"><?php _e("Tax Name", "event_espresso");?></th>
					<th class="left"><?php _e('Description', 'event_espresso');?></th>
					<th class="event_th item_c"><?php _e('Rate', 'event_espresso'); ?></th>
					<th class="subtotal_th"><?php _e('Tax Amount', 'event_espresso'); ?></th>
				</tr>
			</thead>
			<tbody>
				<tr><td colspan="4">[TAX_LINE_ITEM_LIST]</td></tr>
			</tbody>
		</table> <!-- end .invoice-amount table -->
	</div> <!-- end .taxes -->

	<div class="grand-total-dv">
		<h2 class="grand-total"><?php printf( __("Grand Total: %s", "event_espresso"),'[TOTAL_COST]' );?></h2>
	</div> <!-- end .grand-total-dv -->

	<div class="payment-dv">
		<h3 class="section-title"><?php _e("Payments",'event_espresso')?></h3>
		<p><?php echo $payment_instructions; ?></p>
		<table class="invoice-amount">
			<thead>
				<tr class="header_row">
					<th><span class=""><?php _e('Payment Method', 'event_espresso'); ?></span></th>
					<th class='left datetime_th'><?php _e("Date",'event_espresso')?></th>
					<th><span class=""><?php _e('Transaction Id / Cheque #', 'event_espresso'); ?></span></th>
					<th><span class=""><?php _e('P.O. / S.O.#', 'event_espresso'); ?></span></th>
					<th><span class=""><?php _e('Status', 'event_espresso'); ?></span></th>
					<th><?php _e('Amount', 'event_espresso'); ?></th>
				</tr>
			</thead>
			<tbody>
				<tr><td colspan="6">[PAYMENT_LIST_*]</td></tr>
				<tr class="item"><td class='aln-cntr' colspan="6">[TOTAL_OWING_*]</td></tr>
			</tbody>
			<tfoot>
				<tr class='total_tr'><td colspan="4">&nbsp;</td>
					<td class="item_r"><?php _e('Total Paid','event_espresso')?></td>
					<td class="item_r">[AMOUNT_PAID]</td>
				</tr>
				<tr class="total_tr odd">
					<td colspan="4">&nbsp;</td>
					<td class="total" id="total_currency"><?php _e('Amount Owed:', 'event_espresso'); ?></td>
					<td class="total">[TOTAL_OWING]</td>
				</tr>
			</tfoot>
		</table> <!-- end .invoice-amount table -->
	</div> <!-- end. payment-dv -->

	<!-- additional info -->
	<div class="additional-info-dv">
			<h3 class="section-title"><?php _e("Additional Information:", "event_espresso");?></h3>
			<div class="additional-info">
				<h2><?php _e( "Venue Details:", "event_espresso" ); ?></h2>
				<table class="venue-list">
					<tr class="venue-details">
						<td class="venue-details-part venue-address-dv">
							<h3><a href="[VENUE_URL]">[VENUE_TITLE]</a></h3>
							<p>[VENUE_DESCRIPTION]</p>
							[VENUE_FORMATTED_ADDRESS]
						</td>
						<td class="venue-details-part venue-image-dv">[GOOGLE_MAP_IMAGE]</td>
					</tr>
				</table>
				<div class='aln-cntr'><?php
					printf(__("Powered by %sEvent Espresso %s", "event_espresso"),"<a href='http://eventespresso.com'>","</a>");
				?></div>
			</div>
	</div>
</div> <!-- end #invoice -->
<div class="print_button_div">
	<form method="post" action="[DISPLAY_PDF_URL]" >
		<input class="print_button noPrint" type="submit" value="<?php _e('Download PDF', 'event_espresso'); ?>" />
	</form>
	<div class="clear"></div>
</div>
