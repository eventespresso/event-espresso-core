<tr>
	<td colspan="6">
		<div id="event-price-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" class="event-price-dv">
			<input type="hidden" id="quick-edit-ticket-price-id-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="quick-edit-ticket-price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_ID]" value="<?php echo $price->ID(); ?>" />
			<table class="ticket-price-quick-edit-tbl" width="100%">
				<tr>
				
					<td class="type-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
						<span><?php echo $type_label; ?></span>
					</td> 
					
					<td class="order-column ticket-price-quick-edit-column"> 
						<?php //echo $PRT->type[$price->type()]->order(); ?>
						<div class="small-screen-table-label"><?php echo __('Order', 'event_espresso') ?></div>
						<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_order-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="quick_edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_order]" value="<?php echo $price->order(); ?>"<?php echo $disabled; ?>/>							
					</td>
					
					<td class="name-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
						<input class="edit-ticket-price-input quick-edit regular-text<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_name-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="quick_edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
					</td> 
					
					<td class="amount-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
						<span class="cur-sign jst-rght"><?php echo  $price->type_obj()->is_percent() ?  '' : $org_options['currency_symbol']; ?></span>

						<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_amount-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="quick_edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
						<span class="percent-sign jst-left"><?php echo $price->type_obj()->is_percent() ? '%' : ''; ?></span>
					</td> 					
					<td class="edit-column ticket-price-quick-edit-column">
						<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>
						<a class='edit-event-price-lnk evt-prc-btn' rel="<?php echo $row; ?>"  title="Edit Advanced Settings for this Event Price">
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/settings-16x16.png" width="16" height="16" alt="<?php _e('edit', 'event_espresso'); ?>"/>
						</a>
						<a class='delete-event-price-lnk evt-prc-btn' rel="<?php echo $row; ?>" title="Delete this Event Price" >
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png" width="16" height="16" alt="<?php _e('trash', 'event_espresso'); ?>"/>
						</a>
					</td>

					
					<td class="desc-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
						<p class="description"><?php echo $inactive ? $inactive : stripslashes( $price->desc() ); ?></p>
					</td> 
					

				</tr>
			</table>
		</div>
	</td>				
</tr>

<tr>
	<td colspan="6">					
		<div id="edit-event-price-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" class="event-price-settings-dv" style="display:none">
		
			<h4><?php _e('Edit : ', 'event_espresso'); ?><?php echo $price->name(); ?></h4>
			<?php //echo printr( $price, '$price' ); ?>
			<table class="form-table" width="100%">
				<tbody>
				
					<tr valign="top">					
						<th><label for="edit-ticket-price-PRT_ID-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Type', 'event_espresso'); ?></label></th>
						<td>
							<?php echo $edit_ticket_price_select; ?>
							<p class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></p>
							<input id="edit-ticket-price-id-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_ID]" type="hidden" value="<?php echo $price->ID(); ; ?>"/>
							<input id="edit-ticket-price-event-id-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][EVT_ID]" type="hidden" value="<?php echo $EVT_ID; ?>"/>
							<input name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRT_is_global]" type="hidden" value="<?php echo $price_type?>"/>
							<input name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_overrides]" type="hidden" value="<?php echo $price->overrides()?>"/>
							<input name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_deleted]" id="edit-ticket-price-PRC_deleted-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ; ?>" type="hidden" value="<?php echo $price->deleted()?>"/>										
							<input name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_order]" id="edit-ticket-price-PRC_order-<?php echo $row; ?>" type="hidden"  value="<?php echo $price->type_obj()->order(); ?>"/>										
							<input name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][use_quick_edit]" type="hidden" value="1"/>										
						</td>
					</tr>
					
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_name-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Name', 'event_espresso'); ?></label></th>
						<td>
							<input class="edit-ticket-price-input regular-text" type="text" id="edit-ticket-price-PRC_name-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_name]" value="<?php echo $price->name(); ?>"/>
							<p class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></p>
						</td>
					</tr>
					
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_desc-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Description', 'event_espresso'); ?></label></th>
						<td>
							<textarea class="edit-ticket-price-input widefat" id="edit-ticket-price-PRC_desc-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_desc]"><?php echo stripslashes( $price->desc() ); ?></textarea><br/>
							<p class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></p>
						</td>							
					</tr>
					
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_amount-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Amount', 'event_espresso'); ?></label></th>
						<td>
							<input class="edit-ticket-price-input small-text" type="text" id="edit-ticket-price-PRC_amount-ticketrow-<?php echo $ticket_row; ?>-<?php echo $row; ?>" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_amount]" style="text-align:right;" value="<?php echo $price_amount; ?>"/>
							<p class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></p>
						</td>
					</tr>				
					<?php if ( $counter > 1 ) : ?>
					<tr valign="top">
						<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
						<td>
							<label class="edit-ticket-price-radio-lbl">
								<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_is_active]" value="1" style="margin-right:5px;" <?php echo $price->is_active() ? 'checked="checked"' : '' ?> />
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<label class="edit-ticket-price-radio-lbl">
								<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row; ?>][PRC_is_active]" value="0" style="margin-right:5px;" <?php echo ! $price->is_active() ? 'checked="checked"' : '' ?> />
								<?php _e('No', 'event_espresso');?>
							</label>
							<p class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></p>
						</td>
					</tr>
					<?php else : ?>
							<input name="edit_ticket_price[<?php echo $ticket_row; ?>][<?php echo $row?>][PRC_is_active]" type="hidden" value="1"/>										
					<?php endif; ?>
					<tr valign="top">
						<th></th>
						<td>
							<br/><a class="cancel-event-price-btn button-secondary" rel="<?php echo $row; ?>" ><?php _e('close', 'event_espresso'); ?></a>
						</td>
					</tr>
				</tbody>
			</table>
			<br class="clear"/>
			
		</div>
	</td>
</tr>