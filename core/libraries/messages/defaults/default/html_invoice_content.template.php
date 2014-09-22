<?php
/**
 * This is the template for the html messenger and invoice message type main content field.
 */

//figure out what to use for payment instructions that is dependent on whether the corresponding value is existent in invoice settings from an old install.
$payment_settings = EE_Registry::instance()->CFG->gateway->payment_settings;
$invoice_settings = isset( $payment_settings['Invoice'] ) ? $payment_settings['Invoice'] : array();
$payment_instructions = !empty( $invoice_settings['instructions'] ) ? $invoice_settings['instructions'] : __('Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of the event date.', 'event_espresso' );
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
					<h2 id="invoice-hdr"><?php _e('Invoice', 'event_espresso')?></h2>
					<h3><?php _e('Date:', 'event_espresso')?> <span>[PRIMARY_REGISTRANT_REGISTRATION_DATE]</span></h3>
					<h3><?php _e('Registration Code:', 'event_espresso')?> <span>[PRIMARY_REGISTRANT_REGISTRATION_CODE]</span></h3>
					<h3><?php _e('Transaction ID:', 'event_espresso')?> <span>[TXN_ID]</span></h3>
				</div>
			</td>
		</tr>
		<tr>
			<td id="instructions" colspan="2">
				<p><?php echo $payment_instructions; ?></p>
			</td>
		</tr>
	</table> <!-- end #invoice-header -->
	<h2><?php _e('Bill To:', 'event_espresso')?></h2>
	<div class="vcard" id="client-details">
					<div class="fn">[PRIMARY_REGISTRANT_FNAME] [PRIMARY_REGISTRANT_LNAME]</div>
					<div class="adr">
						<div class="street-address">
							[PRIMARY_REGISTRANT_ADDRESS] <br>
							[PRIMARY_REGISTRANT_ADDRESS2]
						</div>
						<div class="locality">[PRIMARY_REGISTRANT_CITY], [PRIMARY_REGISTRANT_ADDRESS_STATE]</div>
						<div id="client-postcode">[PRIMARY_REGISTRANT_COUNTRY]</div>
					</div>
				</div>
				 <!--#client-details vcard-->

	<h2><?php _e("Purchases",'event_espresso')?></h2>
	<table class="invoice-amount">

		<thead>
			<tr class="header_row">
				<th class="left ticket_th"><?php _e('Item', 'event_espresso'); ?></th>
				<th class="left event_th"><?php _e('Description', 'event_espresso'); ?></th>
				<th class="quantity_th"><?php _e('Qty', 'event_espresso'); ?></th>
				<th class="left event_th"><?php _e('Price', 'event_espresso'); ?></th>
				<th class="subtotal_th item_r"><?php _e('Total', 'event_espresso'); ?></th>
			</tr>
		</thead>
		<tbody>
			<tr><td colspan="5">[TICKET_LIST]</td></tr>
			<tr class="total_tr odd">
				<td colspan="2">&nbsp;</td>
				<td colspan="2" class="total" id="total_currency"><?php _e('Sub-Total', 'event_espresso'); ?></td>
				<td class="total">[TXN_SUBTOTAL]</td>
			</tr>
			<tr><td colspan="5">[TAX_LINE_ITEM_LIST]</td></tr>
			<tr class="total_tr odd">
				<td colspan="2">&nbsp;</td>
				<td colspan="2" class="total" id="total_currency"><?php _e('Tax Total', 'event_espresso'); ?></td>
				<td class="total">[TXN_TAX_SUBTOTAL]</td>
			</tr>
		</tbody>

	</table> <!-- end .invoice-amount -->

	<p><?php _e("* taxable items", "event_espresso");?></p>
	<h2><?php _e("Payments",'event_espresso')?></h2>
	<table class="invoice-amount">
		<thead>
			<tr class="header_row">
				<th ><span class=""><?php _e('Payment Method', 'event_espresso'); ?></span></th>
				<th class='left datetime_th'><?php _e("Date",'event_espresso')?></th>
				<th ><span class=""><?php _e('Transaction Id / Cheque #', 'event_espresso'); ?></span></th>
				<th ><span class=""><?php _e('P.O. / S.O.#', 'event_espresso'); ?></span></th>
				<th ><span class=""><?php _e('Status', 'event_espresso'); ?></span></th>
				<th ><?php _e('Amount', 'event_espresso'); ?></th>
			</tr>
		</thead>
		<tbody>
			<tr><td colspan="6">[PAYMENT_LIST_*]</td></tr>
		</tbody>
		<tfoot>
			<tr class='total_tr'><td colspan="4"></td>
				<td class="item_r"><?php _e('Total Paid','event_espresso')?></td>
				<td class="item_r">[TOTAL_AMOUNT_PAID]</td>
			</tr>
			<tr class="total_tr">
				<td colspan="4"></td>
				<td class="total" id="total_currency"><?php _e('Amount Owed', 'event_espresso'); ?></td>
				<td class="total">[TOTAL_OWING]</td>
			</tr>
		</tfoot>
	</table> <!-- end .invoice-amount -->

</div>
