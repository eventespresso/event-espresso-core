<?php if ( $show_no_event_price_msg ) : ?>
<div class="error">
	<p><?php echo $no_price_message_error; ?></p>
</div>	
<div id="no-ticket-prices-msg-dv">
	<p>
	<?php echo $no_price_message; ?>					
	</p>
</div>
<?php endif; ?>

<table id="event_editor_pricing" width="100%" >
	<thead>
		<tr>
			<td class="event-price-tbl-hdr-type"><b><?php //_e('Type'); ?></b></td>
			<td class="event-price-tbl-hdr-order"><b><?php _e('Order', 'event_espresso'); ?></b></td>
			<td class="event-price-tbl-hdr-name"><b><?php _e('Name', 'event_espresso'); ?></b></td>
			<!--<td style="width:2.5%; text-align:center;"></td>-->
			<td class="event-price-tbl-hdr-amount"><b><?php _e('Amount', 'event_espresso'); ?></b></td>
			<!--<td style="width:1%; text-align:center;"></td>-->
			<td class="event-price-tbl-hdr-actions"></td>
			<td class="event-price-tbl-hdr-desc"></td>
		</tr>
	</thead>
	<?php
	foreach ( $price_rows as $row ) :
		echo $row;
	endforeach;
	?>
</table>
<br/>

<div id="add-new-ticket-price-dv" class="hidden">

	<h5 id="add-new-ticket-price-h5" ><?php _e('Add New Event Price', 'event_espresso'); ?></h5>
		
	<table class="form-table">
		<tbody>
		
			<tr valign="top">					
				<th><label for="new-ticket-price-PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
				<td>
					<?php echo $new_ticket_price_selector; ?>
					<p class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></p>
					<input id="new_ticket_price-EVT_ID" name="new_ticket_price[EVT_ID]" type="hidden" value="<?php echo $event->id; ?>" />
					<input id="new_ticket_price-PRT_is_global" name="new_ticket_price[PRT_is_global]" type="hidden" value="0" />									
					<input id="new_ticket_price-PRC_overrides" name="new_ticket_price[PRC_overrides]" type="hidden" value="0" />									
					<input id="new_ticket_price-PRC_deleted" name="new_ticket_price[PRC_deleted]" type="hidden" value="0" />
					<?php foreach( $price_types as $price_type ) : ?>
						<input id="new_ticket_price-PRC_order-<?php echo $price_type['id'];?>" name="new_ticket_price[PRC_order][<?php echo $price_type['id'];?>]" type="hidden" value="<?php echo $price_type['order'];?>" />
					<?php  endforeach; ?>
				</td>
			</tr>
			
			<tr valign="top">
				<th><label for="new-ticket-price-PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
				<td>
					<input class="add-new-ticket-price-input regular-text" type="text" id="new-ticket-price-PRC_name" name="new_ticket_price[PRC_name]" value=""/>
					<p class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></p>
				</td>
			</tr>
			
			<tr valign="top">
				<th><label for="new-ticket-price-PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
				<td>
					<textarea class="add-new-ticket-price-input regular-text" id="new-ticket-price[PRC_desc]" name="new_ticket_price[PRC_desc]" cols="100" rows="1" ></textarea><br/>
					<p class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></p>
				</td>							
			</tr>
			
			<tr valign="top">
				<th><label for="new-ticket-price-PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
				<td>
					<input class="add-new-ticket-price-input small-text" type="text" id="new-ticket-price[PRC_amount]" name="new_ticket_price[PRC_amount]" style="text-align:right;" value=""/>
					<p class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></p>
				</td>
			</tr>

	<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
			<tr valign="top">
				<th><label for="new-ticket-price-PRC_amount"><?php _e('Registration Limit', 'event_espresso'); ?></label></th>
				<td>
					<input type="text" id="new_ticket_price[PRC_reg_limit]" name="new_ticket_price[PRC_reg_limit]" class="add-new-ticket-price-input small-text" style="text-align:right;" value=""/>
					<p class="description">&nbsp;&nbsp;<?php _e('The maximum number of attendees that can be registratered at this Price Level. Leave blank for no limit.', 'event_espresso'); ?></p>
				</td>
			</tr>
		*/ ?>
			
			<tr valign="top">
				<th><label><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
				<td>
					<label class="edit-ticket-price-radio-lbl">
						<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_use_dates]" value="1" style="margin-right:5px;">
						<?php _e('Yes', 'event_espresso');?>
					</label>
					<label class="edit-ticket-price-radio-lbl">
						<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_use_dates]" value="0" style="margin-right:5px;" checked="checked" />
						<?php _e('No', 'event_espresso');?>
					</label>
					<p class="description"><?php _e( 'If set to "Yes", then you will be able to set the dates for when this price will become active / inactive.', 'event_espresso' ); ?></p>
				</td>
			</tr>

			<tr valign="top">
				<th><label for="new_ticket_price[PRC_start_date]"><?php _e('Start Date', 'event_espresso'); ?></label></th>
				<td>
					<input id="new-ticket-price[PRC_start_date]" name="new_ticket_price[PRC_start_date]" type="text" class="datepicker add-new-ticket-price-input" value="" />
					<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If the "Triggered by Date" field above is set to "Yes", then this is the date that this Event Price would become active and displayed for this Event.' ), 'event_espresso'); ?></p>
				</td>
			</tr>

			<tr valign="top">
				<th><label for="new_ticket_price[PRC_end_date]"><?php _e('End Date', 'event_espresso'); ?></label></th>
				<td>
					<input id="new-ticket-price[PRC_end_date]" name="new_ticket_price[PRC_end_date]" type="text" class="datepicker add-new-ticket-price-input" value="" />
					<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If "Triggered by Date" is set to "Yes", then this is the date that this Event Price would become inactive and no longer displayed for this Event.' ), 'event_espresso'); ?></p>
				</td>
			</tr>			

			<tr valign="top">
				<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
				<td>
					<label class="edit-ticket-price-radio-lbl">
						<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_is_active]" value="1" style="margin-right:5px;" checked="checked" />
						<?php _e('Yes', 'event_espresso');?>
					</label>
					<label class="edit-ticket-price-radio-lbl">
						<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_is_active]" value="0" style="margin-right:5px;" />
						<?php _e('No', 'event_espresso');?>
					</label>
					<p class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></p>
				</td>
			</tr>
			
			<tr valign="top">
				<th></th>
				<td>
					<input id="edit_event_save_price" class="button-primary save" type="submit" name="save" value="Save Price">
					<a id="hide-add-new-ticket-price" class="cancel-event-price-btn button-secondary hidden" rel="add-new-ticket-price" ><?php _e('cancel', 'event_espresso');?></a>
				</td>
			</tr>
			
		</tbody>
	</table>
	<br/>
	
</div>

<a id="display-add-new-ticket-price" class="button-secondary display-the-hidden" rel="add-new-ticket-price">
	<?php _e('Add New Event Price', 'event_espresso'); ?>
</a>
<input id="edit_event_save_prices_btn" class="button-primary save right" type="submit" name="save" value="Save Prices" />

<br class="clear"/><br/>

<input id="edited-ticket-price-IDs" name="edited_ticket_price_IDs" type="hidden" value="" />