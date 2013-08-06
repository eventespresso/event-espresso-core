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
			<td class="event-price-tbl-hdr-name"><b><?php _e('Name', 'event_espresso'); ?></b></td>
			<td class="event-price-tbl-hdr-amount"><b><?php _e('Amount', 'event_espresso'); ?></b></td>
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

<input id="edit_event_save_prices_btn-ticketrow-<?php echo $ticket_row; ?>" class="button-primary save right" type="submit" name="save" value="Save Event Prices">
			
<br class="clear"/><br/>

<input id="price-IDs-ticketrow-<?php echo $ticket_row; ?>" name="price-IDs[<?php echo $ticket_row; ?>]" type="hidden" value="<?php echo $price_ids; ?>" />