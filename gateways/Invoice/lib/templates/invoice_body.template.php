
	<div id="invoice">
		<table id="invoice-header" class="not-really-a-table">
			<tr>
				<td id="logo-dv">
					[invoice_logo_image]
					<div class="vcard" id="company-address">
						<div class="fn org"><strong>[organization]</strong></div>
						<div class="adr">
							<div class="street-address">[street]
							</div>
							<!-- street-address -->
							<div class="locality">[city], [state]</div>
							<div id="company-postcode"><span class="postal-code">[zip]</span></div>
						</div>
						<!-- adr -->
						<div class="email">[email]</div>
					</div>
				</td>
				<td>
					<div id="invoice-info">
						<h2 id="invoice-hdr"><?php _e('Invoice', 'event_espresso')?></h2>
						<h3><b><?php _e('Date:', 'event_espresso')?></b> <span>[registration_date]</span></h3>
						<h3><b><?php _e('Invoice #', 'event_espresso')?></b> <span>[registration_code]</span></h3>
					</div>
				</td>
			</tr>
		</table>
		
		<table id="bill-to-ship-to" class="not-really-a-table">
			<tr>
				<td id="bill-to">
					<?php _e('Bill To:', 'event_espresso')?>
				</td>
				<td colspan="4">
					<div class="vcard" id="client-details">
						<div class="fn">[name]</div>
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
				</td>
				<td id="ship-to">
					<?php _e('Ship To:', 'event_espresso')?>
				</td>
				<td colspan="4">
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
				</td>
			</tr>
		</table>

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
			<tbody>
				<!-- Create the table rows for data -->
				<?php echo $table_output;?>
			</tbody>
			<tfoot>
				<?php echo $net_total; ?>
				<?php //echo $discount; ?>
				<tr id="total_tr">
					<td colspan="4">&nbsp;</td>
					<td class="total" id="total_currency"><?php _e('Total', 'event_espresso'); ?></td>
					<td class="total"><span class="crncy-sign"><?php echo $currency_symbol?></span><?php echo $total_cost ?></td>
				</tr>
			</tfoot>
		</table>			
		<!-- invoice-amount -->
		
		<table class="not-really-a-table">
			<tr>
				<td id="payment-details">
					<div class="wrapper">
						<h3><?php _e('Payment Details', 'event_espresso'); ?></h3>
						<div id="bank_name">Bank Name</div>
						<div id="sort-code"><strong>Bank/Sort Code:</strong> 32-75-97</div>
						<div id="account-number"><strong>Account Number:</strong> 28270761</div>
						<div id="iban"><strong>IBAN:</strong> 973547</div>
						<div id="bic"><strong>BIC:</strong> 220197</div>
						<div id="payment-reference"><strong><?php _e('Payment Reference:', 'event_espresso'); ?></strong> INV001</div>
					</div>
				</td>
				<td id="invoice-other">
					<div class="wrapper">
						<h3><?php _e('Other Information', 'event_espresso'); ?></h3>
						<div id="company-reg-number"><strong>Company Registration Number:</strong> 9273109</div>
						<div id="contract-number"><strong>Contract/PO:</strong> PO 87227643</div>
					</div>
				</td>
			</tr>
			<tr>
				<td id="comments" colspan="2">
					<div class="wrapper">
						<?php echo $pdf_instructions; ?>
					</div>
				</td>
			</tr>
		</table>
		
	</div>
