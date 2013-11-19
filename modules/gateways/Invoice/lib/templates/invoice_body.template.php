
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
						<h3><b><?php _e('Registration Code:', 'event_espresso')?></b> <span>[registration_code]</span></h3>
						<h3><b><?php _e('Transaction ID:', 'event_espresso')?></b> <span>[transaction_id]</span></h3>
					</div>
				</td>
			</tr>
			<tr>
				<td id="instructions" colspan="2">
					[instructions]
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
						<!--<div class="org">Client Company</div>--> 
						<div class="adr">
							<div class="street-address"><?php echo $attendee_address; ?></div>
							<div class="locality"><?php echo $attendee_city; ?> <?php echo $attendee_state; ?></div>
							<div id="client-postcode"><?php echo $attendee_zip; ?></div>
							<!--<div id="your-tax-number">SALES TAX: 193528491</div>--> 
						</div> 
					</div>
					 <!--#client-details vcard--> 
				</td>
				<td id="ship-to">
					<?php _e('Ship To:', 'event_espresso')?>
				</td>
				<td colspan="4">
					<div class="vcard" id="shipping-details">
						<div class="fn"><?php echo $ship_name ?></div>
						<!--<div class="org">Client Company</div>--> 
						<div class="adr">
							 <!--street-address--> 
							<div class="street-address"><?php echo $ship_address; ?></div>
							<div class="locality"><?php echo $ship_city; ?> <?php echo $ship_state; ?></div>
							<div id="client-postcode"><?php echo $ship_zip; ?></div>
						</div>
					</div>
				</td>
			</tr>
			
		</table>
		<h2><?php _e("Purchases",'event_espresso')?></h2>
		<table id="invoice-amount">
			
			<thead>
				<tr id="header_row">
					<th class="left ticket_th"><?php _e('Item', 'event_espresso'); ?></th>
					<?php if ($show_line_item_description){?><th class="left event_th"><?php _e('Description', 'event_espresso'); ?></th><?php }?>
					<th class="left event_th"><?php _e('Unit Price', 'event_espresso'); ?></th>
					<th class="quantity_th"><?php _e('Qty', 'event_espresso'); ?></th>
					<th class="subtotal_th"><?php _e('Line Total', 'event_espresso'); ?></th>
				</tr>
			</thead>
			<tbody>
				<?php 
				/**
				 * Recursive function for traversing all the sub-items of each line item
				 * and displaying them in the table
				 * @param EE_Line_Item $line_item
				 * @param boolean $odd for indicating whether to style this line item as an 'odd' or 'even'
				 */
				function ee_invoice_display_line_item(EE_Line_Item $line_item, $show_line_item_description, $odd = false){
					switch($line_item->type()){
						case EEM_Line_Item::type_total:
							foreach($line_item->children() as $child_line_item){
								ee_invoice_display_line_item($child_line_item,$show_line_item_description);
								}?>
							<tr><td colspan="<?php echo $show_line_item_description ? 5 : 4 ?>"><hr></td></tr>
							<tr id="total_tr">
								<td colspan="<?php echo $show_line_item_description ? 2 : 1 ?>">&nbsp;</td>
								<td colspan="2" class="total" id="total_currency"><?php _e('Total', 'event_espresso'); ?></td>
								<td class="total"><?php echo $line_item->total();?></td>
							</tr>
						<?php break;
						
						
						case EEM_Line_Item::type_sub_total:
							foreach($line_item->children() as $child_line_item){
							$odd = !$odd;
								ee_invoice_display_line_item($child_line_item,$show_line_item_description,$odd);
							}?>
							<tr><td colspan="2"></td><td colspan="3"><hr></td></tr>
							<tr id="total_tr">
								<td colspan="<?php echo $show_line_item_description ? 2 : 1 ?>">&nbsp;</td>
								<td colspan="2" class="total" id="total_currency"><?php _e('Sub-Total', 'event_espresso'); ?></td>
								<td class="total"><?php echo $line_item->total();?></td>
							</tr>
						<?php break;
						
						
						case EEM_Line_Item::type_tax_sub_total:
							foreach($line_item->children() as $child_line_item){
								$odd = !$odd;
								ee_invoice_display_line_item($child_line_item, $show_line_item_description, $odd);
							}?>
							<tr><td colspan="2"></td><td colspan="3"><hr></td></tr>
							<tr id="total_tr">
								<td colspan="<?php echo $show_line_item_description ? 2 : 1 ?>">&nbsp;</td>
								<td colspan="2" class="total" id="total_currency"><?php _e('Tax Total', 'event_espresso'); ?></td>
								<td class="total"><?php echo $line_item->total();?></td>
							</tr>
						<?php break;
						
						
						case EEM_Line_Item::type_line_item:
							$subitems = $line_item->children(); 
							$has_subitems  = count($subitems) > 1 ;
							?>
							<tr class="item <?php echo $odd ?   'odd' : ''; ?>">
								<td class="item_l"><?php echo $line_item->name() ?></td>
								<?php if ($show_line_item_description){?><td class="item_l"><?php echo $line_item->desc() ?></td><?php }?>
								<td colspan="3"></td>
								<?php //<td class="item_l"><?php  $datetimes_strings = array(); foreach($datetimes as $datetime){ $datetimes_strings[]= $datetime->start_date_and_time();} echo implode(", ",$datetimes_strings); ?>
							</tr>
							<?php 
							if( $has_subitems ){
								foreach($line_item->children() as $child_line_item){
									ee_invoice_display_line_item($child_line_item,$show_line_item_description, $odd);
								}
							} ?>
							<tr class="item <?php echo $odd ?   'odd' : ''; ?>">
								<td colspan="<?php echo $show_line_item_description ? 2 : 1 ?>"></td>
								<td class="item_l <?php echo $has_subitems ? 'total':''?>"><?php echo $line_item->unit_price()?></td>
								<td class="item_l"><?php echo $line_item->quantity();?></td>
								<td class="item_r <?php echo $has_subitems ? 'total':''?>"> <?php echo $line_item->total(); echo $line_item->is_taxable() ? '*' : ''?> </td>
								<?php //<td class="item_l"><?php  $datetimes_strings = array(); foreach($datetimes as $datetime){ $datetimes_strings[]= $datetime->start_date_and_time();} echo implode(", ",$datetimes_strings); ?>
							</tr>
								
						<?php
						break;
						case EEM_Line_Item::type_sub_line_item:							
							?>
						<tr class="item sub-item">
							<td class="item_r"><?php echo $line_item->name() ?></td>
							<?php if ($show_line_item_description){?><td class="item_l"><?php echo $line_item->desc() ?></td><?php }?>
							<?php if ($line_item->is_percent()) { ?>
								<td class="item_l"><?php echo $line_item->percent();?>%</td>
								<td/>
							<?php }else{//flat discount/surcharge ?>
								<td class="item_l"><?php echo $line_item->unit_price();?></td>
								<td/>
							<?php } ?>
							<td class="item_r"><?php echo $line_item->total();?></td>
						</tr>
						<?php break;
					case EEM_Line_Item::type_tax:							
							?>
						<tr class="item sub-item">
							<td class="item_l"><?php echo $line_item->name() ?></td>
							<?php if ($show_line_item_description){?><td class="item_l"><?php echo $line_item->desc() ?></td><?php }?>
							<td class="item_l"><?php echo $line_item->percent() ?>%</td>
							<td class="item_l"></td>
							<td class="item_r"><?php echo $line_item->total();?></td>
						</tr><?php break;
					}
				}
				$c=false; 
				/* @var $transaction EE_Transaction */
				$total_line_item = $transaction->total_line_item();
				ee_invoice_display_line_item($total_line_item,$show_line_item_description);
				/* foreach($transaction->registrations() as $registration){
					 ?>
					<tr class="item <?php echo ($c = !$c) ? ' odd' : ''; ?>">
						<td class="item_l">1</td>
						<td class="item_l"><?php echo $registration->event_name() ?></td>
						<td class="item_l"><?php echo $registration->ticket()->name() ?></td>
						<td class="item_l"><?php $datetimes = $registration->ticket()->datetimes(); $datetimes_strings = array(); foreach($datetimes as $datetime){ $datetimes_strings[]= $datetime->start_date_and_time();} echo implode(", ",$datetimes_strings); ?></td>
						<td class="item_l"><?php echo $registration->attendee()->full_name() ?></td>
						<td class="item_r"><?php echo EEH_Template::format_currency($registration->price_paid())?></td>
					</tr>
				<?php } */ ?>
			</tbody>
			
		</table>
		<p><?php _e("* Items with a * are taxable", "event_espresso");?></p>
		<h2><?php _e("Payments",'event_espresso')?></h2>
		<table id="invoice-amount">
			<thead>
				<tr id="header_row">
					<th ><span class=""><?php _e('Payment Method', 'event_espresso'); ?></span></th>
					<th class='left datetime_th'><?php _e("Date",'event_espresso')?></th>
					<th ><span class=""><?php _e('Transaction Id / Cheque #', 'event_espresso'); ?></span></th>
					<th ><span class=""><?php _e('P.O. / S.O.#', 'event_espresso'); ?></span></th>
					<th ><span class=""><?php _e('Status', 'event_espresso'); ?></span></th>
					<th ><?php _e('Amount', 'event_espresso'); ?></th>
				</tr>
			</thead>
			<tbody>
				<?php 
				$c = false;
				if(!empty($payments)){
					
					foreach($payments as $payment){
						/* @var $payment EE_Payment */?>
					<tr class='item <?php echo (($c = !$c) ? ' odd' : '')?>'>
						<td><?php $payment->e('PAY_gateway')?></td>
						<td><?php echo $payment->timestamp('D M j, Y')?></td>
						<td><?php $payment->e('PAY_txn_id_chq_nmbr')?></td>
						<td><?php $payment->e('PAY_po_number')?></td>
						<td><?php $payment->e_pretty_status()?></td>
						<td class='item_r'><?php echo EEH_Template::format_currency($payment->amount());?></td>
					</tr>
					<?php }
				}else{?>
					<tr class='item'>
						<td class='aln-cntr' colspan=6><?php _e("No approved payments have been received",'event_espresso')?></td>
					</tr>
				<?php }
?>
			</tbody>
			<tfoot>
				<tr id='total_tr'><td colspan="4">&nbsp;</td>
					<td class="item_r"><?php _e('Total Paid','event_espresso')?></td>
					<td class="item_r"><?php echo EEH_Template::format_currency($amount_pd)?> </td>
				</tr>
				<?php //echo $discount; ?>
				<tr id="total_tr">
					<td colspan="4">&nbsp;</td>
					<td class="total" id="total_currency"><?php _e('Amount Owed', 'event_espresso'); ?></td>
					<td class="total"><?php echo EEH_Template::format_currency($total_cost - $amount_pd)?></td>
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
		</table>
		
	</div>
