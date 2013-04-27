<tr>
	<td colspan="6">
		<div id="event-price-<?php echo $price->ID(); ?>" class="event-price-dv">
			<table class="ticket-price-quick-edit-tbl" width="100%">
				<tr>
				
					<td class="type-column ticket-price-quick-edit-column"> 
						<?php
						 //echo $PRT->type[$price->type()]->name(); 
						 //$select_name = 'edit_ticket_price['. $price->ID() .'][PRT_ID]'; 
						//echo EE_Form_Fields::select_input( $select_name, $all_price_types, $price->type(), 'id="quick-edit-ticket-price-type-ID" ', 'edit-ticket-price-input quick-edit' ); 
						?>
						<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
						<span><?php echo $type_label; ?></span>
					</td> 
					
					<td class="order-column ticket-price-quick-edit-column"> 
						<?php //echo $PRT->type[$price->type()]->order(); ?>
						<div class="small-screen-table-label"><?php echo __('Order', 'event_espresso') ?></div>
						<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_order-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_order]" value="<?php echo $price->order(); ?>"<?php echo $disabled; ?>/>							
					</td> <?php //echo $PRT->type[$price->type()]->order(); ?>
					
					<td class="name-column ticket-price-quick-edit-column"> 
						<?php //echo $price->name(); ?>
						<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
						<input class="edit-ticket-price-input quick-edit regular-text<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
					</td> 
					
					<td class="amount-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
						<span class="cur-sign jst-rght"><?php echo  $price->type_obj()->is_percent() ?  '' : $org_options['currency_symbol']; ?></span>

						<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
						<span class="percent-sign jst-left"><?php echo $price->type_obj()->is_percent() ? '%' : ''; ?></span>
					</td> 
					
					<!--<td class="percent-column ticket-price-quick-edit-column"> 
						<?php echo $price->type_obj()->is_percent() ? '%' : ''; ?>
					</td> -->
					
					<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
					<td class="tckts-left-column" style="width:7.5%; height:2.5em; text-align:right;"> 
						<input class="edit-tickets-left-input quick-edit" type="text" id="quick-edit-ticket-price[<?php echo $price->ID(); ?>][PRC_tckts_left]" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_tckts_left]" style="width:100%;text-align:right;" value="<?php echo $price->tckts_left(); ?>" disabled="disabled"/>
					</td> 
						*/ ?>
					
					<td class="edit-column ticket-price-quick-edit-column">
						<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>									
						<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
						<a class='display-price-tickets-left-lnk display-ticket-manager' data-reveal-id="ticket-manager-dv" rel="<?php echo $price->ID(); ?>"  title='Display the Ticket Manager for this Event' style="cursor:pointer;" >
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/tickets-1-16x16.png" width="16" height="16" alt="<?php _e('tickets left', 'event_espresso'); ?>"/>
						</a>
						 */ ?>
						<a class='edit-event-price-lnk evt-prc-btn' rel="<?php echo $price->ID(); ?>"  title="Edit Advanced Settings for this Event Price">
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/settings-16x16.png" width="16" height="16" alt="<?php _e('edit', 'event_espresso'); ?>"/>
						</a>
						<a class='delete-event-price-lnk evt-prc-btn' rel="<?php echo $price->ID(); ?>" title="Delete this Event Price" >
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png" width="16" height="16" alt="<?php _e('trash', 'event_espresso'); ?>"/>
						</a>
					</td>

					
					<td class="desc-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
						<?php //echo $price->desc(); ?>
						<!--<input class="edit-ticket-price-input quick-edit widefat" type="text" id="quick-edit-ticket-price[<?php echo $price->ID(); ?>][PRC_desc]" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_desc]" value="<?php echo $price->desc(); ?>" style="width:100%;"/>-->
						<p class="description"><?php echo $inactive ? $inactive : implode( ' ', array_slice( explode( ' ', stripslashes( $price->desc() )), 0, 20 )); ?></p>
					</td> 
					

				</tr>
			</table>
		</div>
	</td>				
</tr>

<tr>
	<td colspan="6">					
		<div id="edit-event-price-<?php echo $price->ID(); ?>" class="event-price-settings-dv">
		
			<h4><?php _e('Edit : ', 'event_espresso'); ?><?php echo $price->name(); ?></h4>
			<?php //echo printr( $price, '$price' ); ?>
			<table class="form-table" width="100%">
				<tbody>
				
					<tr valign="top">					
						<th><label for="edit-ticket-price-PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
						<td>
							<?php echo $edit_ticket_price_select; ?>
							<p class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></p>
							<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_ID]" type="hidden" value="<?php echo $price->ID()?>"/>
							<input name="edit_ticket_price[<?php echo $price->ID()?>][EVT_ID]" type="hidden" value="<?php echo $event->id?>"/>
							<input name="edit_ticket_price[<?php echo $price->ID()?>][PRT_is_global]" type="hidden" value="<?php echo $price_type?>"/>
							<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_overrides]" type="hidden" value="<?php echo $price->overrides()?>"/>
							<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_deleted]" id="edit-ticket-price-PRC_deleted-<?php echo $price->ID(); ?>" type="hidden" value="<?php echo $price->deleted()?>"/>										
							<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_order]" id="edit-ticket-price-PRC_order-<?php echo $price->ID(); ?>" type="hidden"  value="<?php echo $price->type_obj()->order(); ?>"/>										
							<input name="edit_ticket_price[<?php echo $price->ID()?>][use_quick_edit]" type="hidden" value="1"/>										
						</td>
					</tr>
					
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
						<td>
							<input class="edit-ticket-price-input regular-text" type="text" id="edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>"/>
							<p class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></p>
						</td>
					</tr>
					
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
						<td>
							<textarea class="edit-ticket-price-input widefat" id="edit-ticket-price-PRC_desc-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_desc]"><?php echo stripslashes( $price->desc() ); ?></textarea><br/>
							<p class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></p>
						</td>							
					</tr>
					
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
						<td>
							<input class="edit-ticket-price-input small-text" type="text" id="edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" style="text-align:right;" value="<?php echo $price_amount; ?>"/>
							<p class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></p>
						</td>
					</tr>
					
				<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 		
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_reg_limit"><?php _e('Registration Limit', 'event_espresso'); ?></label></th>
						<td>
							<input type="text" id="edit-ticket-price-PRC_reg_limit-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_reg_limit]" class="edit-ticket-price-input small-text" style="text-align:right;" value="<?php echo $price->reg_limit(); ?>"/>
							<p class="description">&nbsp;&nbsp;<?php _e('The maximum number of attendees that can be registratered at this Price Level. Leave blank for no limit.', 'event_espresso'); ?></p>
						</td>
					</tr>
					
					<tr valign="top">
						<th><label for="edit-ticket-price-PRC_tckts_left"><?php _e('Tickets Left', 'event_espresso'); ?></label></th>
						<td>
							<input type="text" id="edit-ticket-price-PRC_tckts_left-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_tckts_left]" class="edit-ticket-price-input small-text" style="text-align:right;" value="<?php echo $price->tckts_left(); ?>"/>
							<p class="description">&nbsp;&nbsp;<?php _e('The number of tickets left, or available spaces, at this Price Level. This field is computed and any changes made to this quatity will have no affect. To change the number of Tickets LEft you will need to manually add Attendees via the Registrations Admin page.', 'event_espresso'); ?></p>
						</td>
					</tr>
						 */ ?>			
					
					<tr valign="top" class="edit-ticket-price-use-dates-tbl-row">
						<th><label><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
						<td>
							<?php $price_uses_dates = $price->use_dates();?>
							<label class="edit-ticket-price-radio-lbl">
								<?php $checked = $price_uses_dates == 1 ? ' checked="checked"' : '';?>
								<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_use_dates]" class="edit-ticket-price-use-dates-yes edit-ticket-price-input etp-radio" type="radio" value="1"<?php echo $checked;?> style="margin-right:5px;"/>
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<label class="edit-ticket-price-radio-lbl">
								<?php $checked = $price_uses_dates == 0 ? ' checked="checked"' : '';?>
								<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_use_dates]" class="edit-ticket-price-use-dates-no edit-ticket-price-input etp-radio" type="radio" value="0"<?php echo $checked;?> style="margin-right:5px;"/>
								<?php _e('No', 'event_espresso');?>
							</label>
							<p class="description"><?php _e( 'If set to "Yes", then you will be able to set the dates for when this price will become active / inactive.', 'event_espresso' ); ?></p>
						</td>
					</tr>

					<tr valign="top">
						<th>
							<div class="edit-ticket-price-dates">
								<label for="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_start_date]"><?php _e('Start Date', 'event_espresso'); ?></label>
							</div>
						</th>
						<td>
							<div class="edit-ticket-price-dates">
								<input id="edit-ticket-price-PRC_start_date-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_start_date]" type="text" class="datepicker edit-ticket-price-input" value="<?php echo $price->start_date(); ?>" />
								<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If the "Triggered by Date" field above is set to "Yes", then this is the date that this Event Price would become active and displayed.' ), 'event_espresso'); ?></p>
							</div>
						</td>
					</tr>

					<tr valign="top">
						<th>
							<div class="edit-ticket-price-dates">
							<label for="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_end_date]"><?php _e('End Date', 'event_espresso'); ?></label>
							</div>
						</th>
						<td>
							<div class="edit-ticket-price-dates">
							<input id="edit-ticket-price-PRC_end_date-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_end_date]" type="text" class="datepicker edit-ticket-price-input" value="<?php echo $price->end_date(); ?>" />
							<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If "Triggered by Date" is set to "Yes", then this is the date that this Event Price would become inactive and no longer displayed.' ), 'event_espresso'); ?></p>
							</div>
						</td>
					</tr>			
					<?php if ( $counter > 1 ) : ?>
					<tr valign="top">
						<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
						<td>
							<label class="edit-ticket-price-radio-lbl">
								<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_is_active]" value="1" style="margin-right:5px;" <?php echo $price->is_active() ? 'checked="checked"' : '' ?> />
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<label class="edit-ticket-price-radio-lbl">
								<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_is_active]" value="0" style="margin-right:5px;" <?php echo ! $price->is_active() ? 'checked="checked"' : '' ?> />
								<?php _e('No', 'event_espresso');?>
							</label>
							<p class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></p>
						</td>
					</tr>
					<?php else : ?>
							<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_is_active]" type="hidden" value="1"/>										
					<?php endif; ?>
					<tr valign="top">
						<th></th>
						<td>
							<br/><a class="cancel-event-price-btn button-secondary" rel="<?php echo $price->ID(); ?>" ><?php _e('close', 'event_espresso'); ?></a>
						</td>
					</tr>
				</tbody>
			</table>
			<br class="clear"/>
			
		</div>
	</td>
</tr>