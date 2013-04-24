<tr>
	<td colspan="6">
		<div id="event-price-XXXXXX" class="event-price-dv">
			<table class="ticket-price-quick-edit-tbl" width="100%">
				<tr>
				
					<td class="type-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso'); ?></div>
						<span><?php echo __('Event Price', 'event_espresso'); ?></span>
					</td> 
					
					<td class="order-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Order', 'event_espresso'); ?></div>
						<input class="edit-ticket-price-input quick-edit small-text jst-rght" type="text" id="quick-edit-ticket-price-PRC_order-XXXXXX" name="quick_edit_ticket_price[XXXXXX][PRC_order]" value="" disabled="disabled"/>
					</td> 
					
					<td class="name-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso'); ?></div>
						<input class="edit-ticket-price-input quick-edit regular-text" type="text" id="quick-edit-ticket-price-PRC_name-XXXXXX" name="quick_edit_ticket_price[XXXXXX][PRC_name]" value="" disabled="disabled" />
					</td> 
					
					<td class="amount-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso'); ?></div>
						<span class="cur-sign jst-rght"><?php echo $org_options['currency_symbol']; ?></span>
						<input class="edit-ticket-price-input quick-edit small-text jst-rght" type="text" id="quick-edit-ticket-price-PRC_amount-XXXXXX" name="quick_edit_ticket_price[XXXXXX][PRC_amount]" value="" disabled="disabled" />
						<span class="percent-sign jst-left"></span>
					</td> 

					
<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
					<td class="tckts-left-column" style="width:7.5%; height:2.5em; text-align:right;"> 
						<input class="edit-tickets-left-input quick-edit" type="text" id="quick-edit-ticket-price[XXXXXX][PRC_tckts_left]" name="quick_edit_ticket_price[XXXXXX][PRC_tckts_left]" style="width:100%;text-align:right;" value="<?php echo $price->tckts_left(); ?>" disabled="disabled"/>
					</td> 
*/ ?>
					
					<td class="edit-column ticket-price-quick-edit-column">
						<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>									
						<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
						<a class='display-price-tickets-left-lnk display-ticket-manager' data-reveal-id="ticket-manager-dv" rel="XXXXXX"  title='Display the Ticket Manager for this Event' style="cursor:pointer;" >
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/tickets-1-16x16.png" width="16" height="16" alt="<?php _e('tickets left', 'event_espresso'); ?>"/>
						</a>
						 */ ?>
						<!--<a class='edit-event-price-lnk evt-prc-btn' rel="XXXXXX"  title="Edit Advanced Settings for this Event Price">
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/settings-16x16.png" width="16" height="16" alt="<?php _e('edit', 'event_espresso'); ?>"/>
						</a>
						<a class='delete-event-price-lnk evt-prc-btn' rel="XXXXXX" title="Delete this Event Price" >
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png" width="16" height="16" alt="<?php _e('trash', 'event_espresso'); ?>"/>
						</a>-->
					</td>
					
					<td class="desc-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
						<p class="description"><?php echo __('click "Add New Event Price" to create a ticket price for this event', 'event_espresso') ?></p>
					</td> 
					

				</tr>
			</table>
		</div>
	</td>				
</tr>