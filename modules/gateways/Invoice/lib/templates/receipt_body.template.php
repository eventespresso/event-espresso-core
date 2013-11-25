<?php 
/* @var $events_for_txn EE_Event[] */
$events_for_txn;
/* @var $ticket_line_items_per_event EE_Line_Item[] */
$ticket_line_items_per_event;
/* @var $registrations_per_ticket EE_Registration[] */
$registrations_per_line_item;
/* @var $venues_for_events EE_Venue[] */
$venues_for_events;
/* @var $tax_total_line_item EE_Line_Item */
$tax_total_line_item;
?>

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
						<div class="vat">VAT/Tax Number: [vat]</div>
					</div>
				</td>
				<td>
					<div id="invoice-info">
						<h2 id="invoice-hdr"><?php _e('Order Confirmation', 'event_espresso')?></h2>
						<h3><b><?php _e('Date:', 'event_espresso')?></b> <span>[registration_date]</span></h3>
						<h3><b><?php _e('Transaction ID:', 'event_espresso')?></b> <span>[transaction_id]</span> <span class="<?php echo $transaction->status_ID()?>"><?php echo $transaction->pretty_status();?></span></h3>
					</div>
				</td>
			</tr>
		</table>
		<div class="events">
		<?php foreach($events_for_txn as $event_id => $event){
			?><h2><a href='<?php echo $event->get_permalink()?>'><?php echo $event->name()?></a></h2>
			<p><?php echo $event->description()?></p>
			<ul class="tickets-per-event">
			<?php foreach($ticket_line_items_per_event[$event_id] as $line_item_id => $line_item){
				$ticket = $line_item->ticket();
				$taxable_html = $ticket->taxable() ? '*': '';
				$subitems = $line_item->children();?>
				<li>
					<div class="ticket-details">
						<table>
							<thead>
								<tr class="header_row">
									<th><?php			_e("Ticket", "event_espresso");?></th>
									<th><?php			_e("Description", "event_espresso");?></th>
									<th><?php			_e("Total Uses", "event_espresso");?></th>
									<th><?php			_e("Quantity", "event_espresso");?></th>
									<th><?php			_e("Price", "event_espresso");?></th>
									<th><?php			_e("Line Total", "event_espresso");?></th>
								</tr>
							</thead>
							<tbody>
								<?php if( count($subitems) < 2){?>
								<tr>
									<td><?php echo $line_item->name().$taxable_html?></td>
									<td><?php echo $line_item->desc()?></td>
									<td><?php echo $ticket->uses()?></td>
									<td><?php echo $line_item->quantity()?></td>
									<td><?php echo $line_item->unit_price_float()?></td>
									<td><?php echo $line_item->total_float()?></td>
								</tr>
								<?php }else{?>
									<tr>
										<td><?php echo $line_item->name().$taxable_html?></td>
										<td><?php echo $line_item->desc()?></td>
										<td><?php echo $ticket->uses()?></td>
										<td colspan="3"></td>
									</tr>
									<?php foreach($subitems as $sub_line_item){
										$is_percent = $sub_line_item->is_percent();?>
										<tr>
											<td class="item_r"><?php echo $sub_line_item->name()?></td>
											<td colspan="2"><?php echo $sub_line_item->desc()?></td>
											<td><?php echo $is_percent ? '' : $sub_line_item->quantity()?></td>
											<td><?php echo $is_percent ? $sub_line_item->percent()."%" : $sub_line_item->unit_price_float()?></td>
											<td><?php echo $sub_line_item->total_float()?></td>
										</tr>
									<?php } ?>
									<tr class="total_tr">
										<td colspan="4"></td>
										<td class="total" nowrap="nowrap"><?php _e("Ticket Total:", "event_espresso");?></td>
										<td><?php echo $line_item->total_float()?></td>
									</tr>
								<?php }?>
							</tbody>
						</table>
					</div>
					<div class="reg-details-for-ticket">
						<div class="ticket-time-and-place-details">
							<div class="ticket-time-details">
								<h4 class="no-bottom-margin"><?php echo _n("Datetime:","Datetimes:",count($ticket->datetimes()), "event_espresso");?></h4>
								<ul>
									<?php foreach($ticket->datetimes() as $datetime){?>
									<li><?php echo sprintf(__("%s - %s (%s)", "event_espresso"),$datetime->start_date_and_time(),$datetime->end_date_and_time(),$datetime->get_timezone()); ?></li>
									<?php }?>
								</ul>
							</div>
							<?php if ($event->venues()){?>
							<div class="ticket-place-details">
								<h4 class="no-bottom-margin"><?php echo _n("Venue:","Venues:",count($event->venues()), "event_espresso");?></h4>
								<ul>
									<?php foreach($event->venues() as $venue){?>
									<li><a href='<?php echo $venue->get_permalink()?>'><?php echo $venue->name()?></a></li>
									<?php } ?>
								</ul>
							</div>
							<?php }?>
						</div>
						<div class="ticket-registrations-area">
							<h4><?php echo _n("Registration:","Registrations:",count($registrations_per_line_item[$line_item_id]), "event_espresso");?></h4><a class="print_button noPrint" href="<?php echo $edit_reg_info_url?>"><?php _e("Edit Registration", "event_espresso");?></a>
							<ul class="ticket-registrations-list">
								<?php foreach($registrations_per_line_item[$line_item_id]	 as $registration){
									$attendee = $registration->attendee();
									$answers = $registration->answers(array('order_by'=>array('Question.Question_Group.QSG_order'=>'desc','Question.QST_order'=>'desc')));?>
								<li>
									<dl class="registration-details">
										<dt><?php	_e("Registration Code: ", "event_espresso");?></dt>
										<dd><?php echo $registration->reg_code();?> <span class="<?php echo $registration->status_ID()?>"><?php echo $registration->pretty_status()?></span></dd>
										<?php foreach($attendee_columns_to_show as $field_name){
											if( ! $attendee->get($field_name)){
												continue;
											}
											$field_info = EEM_Attendee::instance()->field_settings_for($field_name);?>
										<dt><?php echo $field_info->get_nicename()?>: </dt>
										<dd><?php echo $attendee->get($field_name)?></dd>
										<?php }?>
										<?php foreach($answers as $ans_id => $answer){
											$question = $answer->question();?>
											<dt><?php echo $question ? $question->admin_label() : '{Question Deleted}'?>: </dt>
											<dd><?php echo $answer->value()?></dd>
										<?php }?>
									</dl>
								</li>
								<?php } ?>
							</ul>
						</div>
					</div>
				</li>
			<?php }?>
			</ul>
			
		<?php }?>
		</div>
		<?php if ($tax_total_line_item && $tax_total_line_item->children()){?>
			<h2><?php _e("Taxes",'event_espresso')?></h2>
			<table>

				<thead>
					<tr class="header_row">
						<th class="left ticket_th"></th>
						<th class="left"><?php _e('Description', 'event_espresso');?></th>
						<th class="left event_th"><?php _e('Rate', 'event_espresso'); ?></th>
						<th class="subtotal_th"><?php _e('Tax Amount', 'event_espresso'); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php 
					foreach($tax_total_line_item->children() as $child_tax){?>
					<tr>
						<td><?php echo $child_tax->name()?></td>
						<td><?php echo $child_tax->desc()?></td>
						<td><?php echo $child_tax->percent()?>%</td>
						<td><?php echo $child_tax->total_float()?></td>
					</tr>
					<?php } ?>
					<tr>
						<td class="total_tr" colspan="2"></td>
						<td class="total"><?php	_e("Tax Total:", "event_espresso");?></td>
						<td><?php echo $tax_total_line_item->total_float()?></td>
					</tr>
				</tbody>

			</table>
		<?php }?>
		<p><?php _e("* taxable items", "event_espresso");?></p>
		<h2><?php printf(__("Grand Total: %s", "event_espresso"),EEH_Template::format_currency($total_cost));?></h2>
		<h2><?php _e("Payments",'event_espresso')?></h2>
		<table id="invoice-amount">
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
						<td class='aln-cntr' colspan=6><?php _e("No approved payments have been received.",'event_espresso')?> <?php if($amount_owed){?><a class="noPrint" href='<?php echo $retry_payment_url?>'><?php _e("Please make payment", "event_espresso");}?></a></td>
						
					</tr>
				<?php }
?>
			</tbody>
			<tfoot>
				<tr class='total_tr'><td colspan="4">&nbsp;</td>
					<td class="item_r"><?php _e('Total Paid','event_espresso')?></td>
					<td class="item_r"><?php echo EEH_Template::format_currency($amount_pd)?> </td>
				</tr>
				<?php //echo $discount; ?>
				<tr class="total_tr">
					<td colspan="4">&nbsp;</td>
					<td class="total" id="total_currency"><?php _e('Amount Owed:', 'event_espresso'); ?></td>
					<td class="total"><?php echo EEH_Template::format_currency($amount_owed)?></td>
				</tr>
			</tfoot>
		</table>
		<h2><?php _e("Additional Information:", "event_espresso");?></h2>
		<div class="additional-info">
			<p>[instructions]</p>
			<?php if($venues_for_events){?>
			<ul class="venue-list">
				<?php foreach($venues_for_events as $venue){?>
					<li class="venue-details">
						<h3><a href='<?php echo $venue->get_permalink()?>'><?php echo $venue->name()?></a></h3>
						<div class="venue-details-part"><?php echo  EEH_Address::format($venue);?></div>
						<div class="venue-details-part"><?php echo EEH_Venue_View::espresso_google_static_map($venue)?></div>
						
					</li>
				<?php }?>
			</ul>
			<?php } ?>
		</div>
		
	</div>
