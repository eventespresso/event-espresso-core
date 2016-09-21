<?php
/**
 * @deprecated 4.9.13
 */
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
						<div class="vat"><?php _e('VAT/Tax Number:', 'event_espresso')?> [vat]</div>
					</div>
				</td>
				<td>
					<div id="invoice-info">
						<h2 id="invoice-hdr"><?php _e('Order Confirmation', 'event_espresso')?></h2>
						<h3 id="invoice-date"><?php _e('Date:', 'event_espresso')?> <span class="plain-text">[registration_date]</span></h3>
						<h3 id="invoice-txn-id"><?php _e('Transaction ID:', 'event_espresso')?> <span class="plain-text">[transaction_id]</span></h3>
						<h3 id="invoice-txn-status"><?php _e('Status:', 'event_espresso')?> <span class="<?php echo $transaction->status_ID()?> plain-text"><?php echo $transaction->pretty_status();?></span></h3>
					</div>
				</td>
			</tr>
		</table>
		<div class="events">
		<?php foreach($events_for_txn as $event_id => $event){
			?><h3 class="section-title event-name"><img class="icon" src="<?php echo EE_IMAGES_URL.'calendar_year-24x24.png';?>"><?php _e("Event Name:","event_espresso")?> <span class="plain-text"><?php echo $event->name();?></span> <span class="small-text link">[ <a href='<?php echo $event->get_permalink()?>'><?php _e('view', 'event_espresso'); ?></a> ]</span></h3>
			<?php if (strlen($event->description()>1)){?><p class="event-description"><?php $event->description()?></p><?php }?>
			<ul class="tickets-per-event">
			<?php foreach($ticket_line_items_per_event[$event_id] as $line_item_id => $line_item){
				$ticket = $line_item->ticket();
				$taxable_html = $ticket->taxable() ? '*': '';
				$subitems = $line_item->children();
				$ticket_uses = $ticket->get_pretty('TKT_uses',  __("any", "event_espresso"));
			?>
				<li class="event-ticket">
					<div class="ticket-details">
						<table class="invoice-amount">
							<thead>
								<tr class="header_row">
									<th class="name-column"><?php _e("Ticket", "event_espresso");?></th>
									<th colspan="2" class="desc-column"><?php _e("Description", "event_espresso");?></th>
									<th class="number-column item_c"><?php _e("Quantity", "event_espresso");?></th>
									<th class="number-column item_c"><?php _e("Price", "event_espresso");?></th>
									<th class="number-column item_r"><?php _e("Total", "event_espresso");?></th>
								</tr>
							</thead>
							<tbody>
								<?php if( count($subitems) < 2){?>
								<tr class="item">
									<td><?php echo $line_item->name().$taxable_html?></td>
									<td colspan="2"><?php echo $line_item->desc();?><p class="ticket-note"><?php echo sprintf(__('This ticket can be used once at %s of the dates/times below.', 'event_espresso'), $ticket_uses); ?></p></td>
									<td class="item_c"><?php echo $line_item->quantity()?></td>
									<td class="item_c"><?php echo $line_item->unit_price_no_code()?></td>
									<td class="item_r"><?php echo $line_item->total_no_code()?></td>
								</tr>
								<?php }else{?>
									<tr class="item">
										<td class="aln-left"><?php echo $line_item->name().$taxable_html?></td>
										<td colspan="2"><?php echo $line_item->desc();?><p class="ticket-note"><?php echo sprintf(__('This ticket can be used once at %s of the dates/times below.', 'event_espresso'), $ticket_uses); ?></p></td>
										<td class="item_c"><?php echo $line_item->quantity()?></td>
										<td class="item_c"><?php echo $line_item->unit_price_no_code()?></td>
										<td class="item_r"><?php echo $line_item->total_no_code()?></td>
									</tr>
									<?php foreach($subitems as $sub_line_item){
										$is_percent = $sub_line_item->is_percent();?>
										<tr class="subitem-row">
											<td class="subitem"><?php echo $sub_line_item->name()?></td>
											<td colspan="2"><?php echo $sub_line_item->desc()?></td>
											<td class="item_c"><?php //echo $is_percent ? '' : $sub_line_item->quantity()?></td>
											<td class="item_c"><?php echo $is_percent ? $sub_line_item->percent()."%" : $sub_line_item->unit_price_no_code()?></td>
											<td class="item_r"><?php echo $sub_line_item->total_no_code()?></td>
										</tr>
									<?php } ?>
									<tr class="total_tr odd">
										<td colspan="4"></td>
										<td class="total" nowrap="nowrap"><?php _e("Ticket Total:", "event_espresso");?></td>
										<td class="item_r"><?php echo $line_item->total_no_code()?></td>
									</tr>
								<?php }?>
							</tbody>
						</table>

					</div>
					<div class="reg-details-for-ticket">
						<div class="ticket-time-and-place-details">
							<div class="ticket-time-details">
								<h4 class="sub-section-title no-bottom-margin"><img class="icon" src="<?php echo EE_IMAGES_URL.'clock-16x16.png';?>"><?php echo _n("Date/Time:","Dates/Times:",count($ticket->datetimes()), "event_espresso");?></h4>
								<ul class="event-dates">
									<?php foreach($ticket->datetimes_ordered() as $datetime){
										/* @var $datetime EE_Datetime */ ?>
									<li><?php
										echo $datetime->name() ? '<b>'.$datetime->name().' </b>' : '' ;
										echo sprintf(__("%s - %s (%s)", "event_espresso"),$datetime->start_date_and_time(),$datetime->end_date_and_time(),$datetime->get_timezone());
										echo $datetime->description() ? '<p class="ticket-note">'.$datetime->description().'</p>' : '' ?></li>
									<?php }?>
								</ul>
							</div>
							<?php if ($event->venues()){?>
							<div class="ticket-place-details">
								<h4 class="sub-section-title no-bottom-margin"><img class="icon" src="<?php echo EE_IMAGES_URL.'location-pin-16x16.png';?>"><?php echo _n("Venue:","Venues:",count($event->venues()), "event_espresso");?></h4>
								<ul class="event-venues">
									<?php foreach($event->venues() as $venue){?>
									<li><?php echo $venue->name()?> <span class="small-text">[ <a href='<?php echo $venue->get_permalink()?>'><?php _e('view', 'event_espresso'); ?></a> ]</span></li>
									<?php } ?>
								</ul>
							</div>
							<?php }?>
						</div>
						<div class="ticket-registrations-area">
							<h4 class="sub-section-title"><img class="icon" src="<?php echo EE_IMAGES_URL.'users-16x16.png';?>"><?php echo __("Registration Details", "event_espresso");?> <span class="small-text link">[ <a class="print_button noPrint" href="<?php echo $edit_reg_info_url; ?>"><?php _e('edit', 'event_espresso'); ?></a> ]</span></h4>
							<ul class="ticket-registrations-list">
								<?php foreach($registrations_per_line_item[$line_item_id] as $registration){
									/* @var $registration EE_Registration */
									$attendee = $registration->attendee();
									$answers = $registration->answers(array('order_by'=>array('Question.Question_Group_Question.QGQ_order'=>'ASC')));?>
								<li class="ticket-registration">
									<table class="registration-details">
										<tr class="odd">
											<th><?php echo 	_e("Registration Code:", "event_espresso");?></th>
											<td><?php echo $registration->reg_code();?> - <span class="<?php echo $registration->status_ID()?>"><?php echo $registration->pretty_status()?></span></td>
										</tr>
										<?php
										foreach($event->question_groups() as $question_group){
											?><tr><th><?php $question_group->e('QSG_name');?></th><td></td></tr><?php
											$has_personal_info = false;
											foreach($question_group->questions() as $question){
												if( in_array($question->system_ID(),$questions_to_skip)){
													$has_personal_info = true;
													continue;
												}
												?><tr>
														<th><?php echo $question->display_text()?></th>
														<td><?php echo $registration->answer_value_to_question($question);?></td>
												</tr><?php
											}
											if($has_personal_info){
												?><tr><th><?php	_e('Attendee', 'event_espresso');?></th><td><?php echo sprintf(__('%s (%s)', "event_espresso"),$attendee->full_name(),$attendee->email())?></td></tr><?php
											}
										}
										?>
									</table>
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
		<div class="taxes">
			<?php if ($tax_total_line_item && $tax_total_line_item->children()){?>
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
						<?php
						foreach($tax_total_line_item->children() as $child_tax){?>
						<tr>
							<td><?php echo $child_tax->name()?></td>
							<td><?php echo $child_tax->desc()?></td>
							<td class="item_c"><?php echo $child_tax->percent()?>%</td>
							<td class="item_r"><?php echo $child_tax->total_no_code()?></td>
						</tr>
						<?php } ?>
						<tr class="total_tr odd">
							<td class="total_tr" colspan="2"></td>
							<td class="total"><?php	_e("Tax Total:", "event_espresso");?></td>
							<td class="item_r"><?php echo $tax_total_line_item->total_no_code()?></td>
						</tr>
					</tbody>

				</table>
			<?php }?>
			<p><?php _e("* taxable items", "event_espresso");?></p>
		</div>
		<div class="grand-total-dv">
		<h2 class="grand-total"><?php printf(__("Grand Total: %s", "event_espresso"),EEH_Template::format_currency($total_cost));?></h2>
		</div>
		<div class="payment-dv">
			<h3 class="section-title"><?php _e("Payments",'event_espresso')?></h3>
			<p>[instructions]</p>
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
					<?php
					$c = false;
					if(!empty($payments)){

						foreach($payments as $payment){
							/* @var $payment EE_Payment */?>
						<tr class='item <?php echo (($c = !$c) ? ' odd' : '')?>'>
							<td><?php $payment->e('PAY_gateway')?></td>
							<td><?php echo $payment->timestamp()?></td>
							<td><?php $payment->e('PAY_txn_id_chq_nmbr')?></td>
							<td><?php $payment->e('PAY_po_number')?></td>
							<td><?php $payment->e_pretty_status()?></td>
							<td class='item_r'><?php echo $payment->amount_no_code()?></td>
						</tr>
						<?php }
					}else{?>
						<tr class='item'>
							<td class='aln-cntr' colspan="6"><?php _e("No approved payments have been received.",'event_espresso')?> </td>
						</tr>
					<?php }
					?><tr class="item" ><td class='aln-cntr' colspan="6"><?php if($amount_owed){?><a class="noPrint" href='<?php echo $retry_payment_url?>'><?php _e("Please make a payment.", "event_espresso");}?></a></td></tr>
				</tbody>
				<tfoot>
					<tr class='total_tr'><td colspan="4">&nbsp;</td>
						<td class="item_r"><?php _e('Total Paid','event_espresso')?></td>
						<td class="item_r"><?php echo EEH_Template::format_currency($amount_pd,false,false)?> </td>
					</tr>
					<?php //echo $discount; ?>
					<tr class="total_tr odd">
						<td colspan="4">&nbsp;</td>
						<td class="total" id="total_currency"><?php _e('Amount Owed:', 'event_espresso'); ?></td>
						<td class="total"><?php echo EEH_Template::format_currency($amount_owed)?></td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="additional-info-dv">
			<h3 class="section-title"><?php _e("Additional Information:", "event_espresso");?></h3>
			<div class="additional-info">
				<?php if($venues_for_events){?>
				<h2><?php echo _n("Venue Details:", "Venues Details:", "event_espresso",count($venues_for_events));?></h2>
				<table class="venue-list">
					<?php foreach($venues_for_events as $venue){?>
						<tr class="venue-details">
							<td class="venue-details-part venue-address-dv">
								<h3><a href='<?php echo $venue->get_permalink()?>'><?php
									echo $venue->name()
								?></a></h3>
								<p><?php echo $venue->description()?></p>
								<?php echo  EEH_Address::format($venue);?></td>
							<?php if($venue->enable_for_gmap()){?>
								<td class="venue-details-part venue-image-dv"><?php echo EEH_Venue_View::espresso_google_static_map($venue)?></td>
							<?php } ?>
						</tr>
					<?php }?>
				</table>
				<?php } ?>
			</div>
		</div>
	</div>
