<tr id="prices-row-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>">
	<td colspan="6">
		<div id="event-price-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" class="event-price-dv">
			<table class="ticket-price-quick-edit-tbl" width="100%">
				<tr>
				
					<td class="type-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
						<span><?php echo $type_label; ?></span>
						<input id="edit-ticket-price-id-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_ID]" type="hidden" value="<?php echo $price->ID(); ; ?>"/>
						<input id="edit-ticket-price-event-id-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][EVT_ID]" type="hidden" value="<?php echo $EVT_ID; ?>"/> 
					</td> 

					<td class="name-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
						<input class="edit-ticket-price-input quick-edit regular-text required<?php echo $disabled_class;?>" type="text" id="edit-ticket-price-PRC_name-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
					</td> 
					
					<td class="amount-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
						<span class="cur-sign jst-rght"><?php echo  $is_percent ?  '' : $org_options['currency_symbol']; ?></span>
						<input class="edit-ticket-price-input quick-edit small-text jst-rght required<?php echo $disabled_class;?>" type="text" id="edit-ticket-price-PRC_amount-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
						<span class="percent-sign jst-left"><?php echo $is_percent ? '%' : ''; ?></span>
					</td> 
													
					<td class="desc-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
						<p class="description"><?php echo $inactive ? $inactive : implode( ' ', array_slice( explode( ' ', stripslashes( $price->desc() )), 0, 20 )); ?></p>
					</td> 
					

				</tr>
			</table>
		</div>
	</td>				
</tr>