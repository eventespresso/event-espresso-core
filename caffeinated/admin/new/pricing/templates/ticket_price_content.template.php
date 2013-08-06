<?php if ( $show_no_event_price_msg ) : ?>
<div class="error">
	<p><?php echo $no_price_message_error; ?></p>
</div>	
<div id="no-ticket-prices-msg-dv-ticketrow-<?php echo $ticket_row; ?>">
	<p>
	<?php echo $no_price_message; ?>					
	</p>
</div>
<?php endif; ?>

<table id="event_editor_pricing-ticketrow-<?php echo $ticket_row; ?>" width="100%" >
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
	$total_rows = count( $price_rows );
	$next_row = $total_rows + 1;
	?>
</table>
<br/>
<input type="hidden" id="total_count_price_rows-ticketrow-<?php echo $ticket_row; ?>" name="total_count_price_rows" value=<?php echo $total_rows; ?> />
<input type="hidden" id="next_price_row-ticketrow-<?php echo $ticket_row; ?>" name="next_price_row" value=<?php echo $next_row; ?> />
<div id="add-new-ticket-price-dv-ticketrow-<?php echo $ticket_row; ?>" class="hidden">

	<h5 id="add-new-ticket-price-h5-ticketrow-<?php echo $ticket_row; ?>" ><?php _e('Add New Event Price', 'event_espresso'); ?></h5>
		
	<table class="form-table">
		<tbody>
		
			<tr valign="top">					
				<th><label for="new-ticket-price-PRT_ID-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Type', 'event_espresso'); ?></label></th>
				<td>
					<?php echo $new_ticket_price_selector; ?>
					<p class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></p>
					<input id="new_ticket_price-EVT_ID-ticketrow-<?php echo $ticket_row; ?>" name="new_ticket_price[<?php echo $ticket_row; ?>][EVT_ID]" type="hidden" value="<?php echo $EVT_ID; ?>" />
					<input id="new_ticket_price-PRT_is_global-ticketrow-<?php echo $ticket_row; ?>" name="new_ticket_price[<?php echo $ticket_row; ?>][PRT_is_global]" type="hidden" value="0" />									
					<input id="new_ticket_price-PRC_overrides-ticketrow-<?php echo $ticket_row; ?>" name="new_ticket_price[<?php echo $ticket_row; ?>][PRC_overrides]" type="hidden" value="0" />									
					<input id="new_ticket_price-PRC_deleted-ticketrow-<?php echo $ticket_row; ?>" name="new_ticket_price[<?php echo $ticket_row; ?>][PRC_deleted]" type="hidden" value="0" />
				</td>
			</tr>
			
			<tr valign="top">
				<th><label for="new-ticket-price-PRC_name-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Name', 'event_espresso'); ?></label></th>
				<td>
					<input class="add-new-ticket-price-input regular-text" type="text" id="new-ticket-price-PRC_name-ticketrow-<?php echo $ticket_row; ?>" name="new_ticket_price[<?php echo $ticket_row; ?>][PRC_name]" value=""/>
					<p class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></p>
				</td>
			</tr>
			
			<tr valign="top">
				<th><label for="new-ticket-price-PRC_desc-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Description', 'event_espresso'); ?></label></th>
				<td>
					<textarea class="add-new-ticket-price-input regular-text" id="new-ticket-price-PRC_desc-ticketrow-<?php echo $ticket_row; ?>" name="new_ticket_price[<?php echo $ticket_row; ?>][PRC_desc]" cols="100" rows="1" ></textarea><br/>
					<p class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></p>
				</td>							
			</tr>
			
			<tr valign="top">
				<th><label for="new-ticket-price-PRC_amount-ticketrow-<?php echo $ticket_row; ?>"><?php _e('Amount', 'event_espresso'); ?></label></th>
				<td>
					<input class="add-new-ticket-price-input small-text" type="text" id="new-ticket-price-PRC_amount-ticketrow-<?php echo $ticket_row; ?>" name="new_ticket_price[<?php echo $ticket_row; ?>][PRC_amount]" style="text-align:right;" value=""/>
					<p class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></p>
				</td>
			</tr>
			<tr valign="top">
				<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
				<td>
					<label class="edit-ticket-price-radio-lbl">
						<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[<?php echo $ticket_row; ?>][PRC_is_active]" value="1" style="margin-right:5px;" checked="checked" />
						<?php _e('Yes', 'event_espresso');?>
					</label>
					<label class="edit-ticket-price-radio-lbl">
						<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[<?php echo $ticket_row; ?>][PRC_is_active]" value="0" style="margin-right:5px;" />
						<?php _e('No', 'event_espresso');?>
					</label>
					<p class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></p>
				</td>
			</tr>
			
			<tr valign="top">
				<th></th>
				<td>
					<input id="edit_event_save_price-ticketrow-<?php echo $ticket_row; ?>" class="button-primary save" type="button" name="save" value="Save Price">
					<a id="hide-add-new-ticket-price-ticketrow-<?php echo $ticket_row; ?>" class="cancel-event-price-btn button-secondary hidden" rel="add-new-ticket-price" ><?php _e('cancel', 'event_espresso');?></a>
				</td>
			</tr>
			
		</tbody>
	</table>
	<br/>
	
</div>

<a id="display-add-new-ticket-price-ticketrow-<?php echo $ticket_row; ?>" class="button-secondary display-the-hidden" rel="add-new-ticket-price">
	<?php _e('Add New Event Price', 'event_espresso'); ?>
</a>
<input id="edit_event_save_prices_btn-ticketrow-<?php echo $ticket_row; ?>" class="button-primary save right" type="submit" name="save" value="Save Prices" />

<br class="clear"/><br/>

<input id="price-IDs-ticketrow-<?php echo $ticket_row; ?>" name="price_IDs[<?php echo $ticket_row; ?>]" type="hidden" value="<?php echo $price_ids; ?>" />