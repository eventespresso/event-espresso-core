<?php
/**
 * This is the template for the html messenger and receipt message type main content field.
 */
?>
<div class="print_button_div noPrint">
	[INVOICE_RECEIPT_SWITCHER_BUTTON] [DISPLAY_PDF_BUTTON]
	<div class="clear"></div>
</div>
<div id="invoice">
	<table id="invoice-header" class="not-really-a-table">
		<tr>
			<td id="logo-dv">
				[INVOICE_LOGO]
				<div class="vcard" id="company-address">
					<div class="fn org"><strong>[INVOICE_PAYEE_NAME]</strong></div>
					<div class="adr">
						[INVOICE_PAYEE_ADDRESS]
					</div>
					<div class="email">[INVOICE_PAYEE_EMAIL]</div>
					<div class="vat">[INVOICE_PAYEE_TAX_NUMBER_*]</div>
				</div>
			</td>
			<td>
				<div id="invoice-info">
					<h2 id="invoice-hdr"><?php _e( 'Order Confirmation', 'event_espresso' ) ?></h2>

					<h3 id="invoice-date"><?php _e( 'Date:', 'event_espresso' ) ?>
						<span class="plain-text">[PRIMARY_REGISTRANT_REGISTRATION_DATE]</span></h3>

					<h3 id="invoice-txn-id"><?php _e( 'Transaction ID:', 'event_espresso' ) ?>
						<span class="plain-text">[TXN_ID]</span></h3>

					<h3 id="invoice-txn-status"><?php _e( 'Status:', 'event_espresso' ) ?>
						<span class="[TXN_STATUS_ID] plain-text">[TXN_STATUS]</span></h3>
				</div>
			</td>
		</tr>
	</table>
	<div class="events">
		[EVENT_LIST]
	</div>
	<div class="taxes">
		<h3 class="section-title"><?php _e( "Additional Charges/Discounts", 'event_espresso' ) ?></h3>
		<table class="invoice-amount">
			<thead>
				<tr class="header_row">
					<th class="left ticket_th"><?php _e( "Name", "event_espresso" ); ?></th>
					<th class="left"><?php _e( 'Description', 'event_espresso' ); ?></th>
					<th class="event_th item_c"><?php _e( 'Quantity', 'event_espresso' ); ?></th>
					<th class="event_th item_c"><?php _e( 'Unit Price', 'event_espresso' ); ?></th>
					<th class="subtotal_th"><?php _e( 'Total', 'event_espresso' ); ?></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="5">[ADDITIONAL_LINE_ITEM_LIST]</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="taxes">
		<h3 class="section-title"><?php _e( "Taxes", 'event_espresso' ) ?></h3>
		<p><?php printf( __( '%s*%s Taxable items. The total amount collected for taxes is reflected in the total(s) below.', 'event_espresso' ), '<strong>', '</strong>' ); ?></p>
		<table class="invoice-amount">
			<thead>
				<tr class="header_row">
					<th class="left ticket_th"><?php _e( "Tax Name", "event_espresso" ); ?></th>
					<th class="left"><?php _e( 'Description', 'event_espresso' ); ?></th>
					<th class="event_th item_c"><?php _e( 'Rate', 'event_espresso' ); ?></th>
					<th class="subtotal_th"><?php _e( 'Tax Amount', 'event_espresso' ); ?></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="4">[TAX_LINE_ITEM_LIST]</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="grand-total-dv">
		<h2 class="grand-total"><?php printf( __( "Grand Total: %s", "event_espresso" ), '[TOTAL_COST]' ); ?></h2>
	</div>
	<div class="payment-dv">
		<h3 class="section-title"><?php _e( "Payments", 'event_espresso' ) ?></h3>
		<table class="invoice-amount">
			<thead>
				<tr class="header_row">
					<th><span class=""><?php _e( 'Payment Method', 'event_espresso' ); ?></span></th>
					<th class='left datetime_th'><?php _e( "Date", 'event_espresso' ) ?></th>
					<th><span class=""><?php _e( 'Transaction Id / Cheque #', 'event_espresso' ); ?></span></th>
					<th><span class=""><?php _e( 'P.O. / S.O.#', 'event_espresso' ); ?></span></th>
					<th><span class=""><?php _e( 'Status', 'event_espresso' ); ?></span></th>
					<th><?php _e( 'Amount', 'event_espresso' ); ?></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="6">[PAYMENT_LIST_*]</td>
				</tr>
				<tr class="item">
					<td class='aln-cntr' colspan="6">[OWING_STATUS_MESSAGE_*]</td>
				</tr>
			</tbody>
			<tfoot>
				<tr class='total_tr'>
					<td colspan="4">&nbsp;</td>
					<td class="item_r"><?php _e( 'Total Paid', 'event_espresso' ) ?></td>
					<td class="item_r">[TOTAL_AMOUNT_PAID]</td>
				</tr>
				<tr class="total_tr odd">
					<td colspan="4">&nbsp;</td>
					<td class="total" id="total_currency"><?php _e( 'Amount Owed:', 'event_espresso' ); ?></td>
					<td class="total">[TOTAL_OWING]</td>
				</tr>
			</tfoot>
		</table>
	</div>
	<div class="additional-info-dv">
		<h3 class="section-title"><?php _e( "Additional Information:", "event_espresso" ); ?></h3>
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
		</div>
	</div>
</div>
<div class="print_button_div noPrint">
	[INVOICE_RECEIPT_SWITCHER_BUTTON] [DISPLAY_PDF_BUTTON]
	<div class="clear"></div>
</div>
