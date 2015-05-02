<tr valign="top" id="edit-ticketrow-<?php echo $ticketrow; ?>" class="edit-ticket-row<?php echo $tkt_archive_class; ?>">
	<td class="ee-tkt-status<?php echo $tkt_status_class; ?>">
	<td>
		<input type="hidden" name="<?php echo $edit_ticketrow_name; ?>[<?php echo $ticketrow; ?>][TKT_ID]" class="edit-ticket-TKT_ID" value="<?php echo $TKT_ID; ?>">
		<input type="hidden" name="<?php echo $edit_ticketrow_name; ?>[<?php echo $ticketrow; ?>][TKT_is_default]" class="edit-ticket-TKT_is_default" value="<?php echo $TKT_is_default; ?>">
		<input type="text" maxlength="245" name="<?php echo $edit_ticketrow_name; ?>[<?php echo $ticketrow; ?>][TKT_name]" class="edit-ticket-TKT_name ee-large-text-inp" placeholder="Ticket Title" value="<?php echo $TKT_name; ?>">
	</td>
	<td>
		<input type="text" name="<?php echo $edit_ticketrow_name; ?>[<?php echo $ticketrow; ?>][TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp ee-datepicker" value="<?php echo $TKT_start_date; ?>" data-context="start-ticket" data-date-field-context="#edit-ticketrow-<?php echo $ticketrow; ?>" data-related-field=".edit-ticket-TKT_end_date" data-next-field=".edit-ticket-TKT_end_date" value="<?php echo $TKT_start_date; ?>">
	</td>
	<td>
		<input type="text" name="<?php echo $edit_ticketrow_name; ?>[<?php echo $ticketrow; ?>][TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp ee-datepicker" value="<?php echo $TKT_end_date; ?>" data-context="end-ticket" data-date-field-context="#edit-ticketrow-<?php echo $ticketrow; ?>" data-related-field=".edit-ticket-TKT_start_date" data-next-field=".edit-ticket-PRC_amount" value="<?php echo $TKT_end_date; ?>">
	</td>
	<td>
		<span class="ticket-price-info-display ticket-price-dollar-sign-display"><?php echo $price_currency_symbol; ?></span>
	</td>
	<td>	
		<?php if ( empty( $disabled ) ) : ?>
			<input type="text" size="1" class="edit-price-PRC_amount ee-small-text-inp ee-inp-right" name="edit_prices[<?php echo $ticketrow; ?>][1][PRC_amount]" value="<?php echo $PRC_amount; ?>">
		<?php else : ?>
			<input type="text" size="1" class="edit-price-PRC_amount ee-small-text-inp ee-inp-right" name="disabled_price_amount" value="<?php echo $PRC_amount; ?>"<?php echo $disabled; ?>>
			<input type="hidden" size="1" class="edit-price-PRC_amount ee-small-text-inp ee-inp-right" name="edit_prices[<?php echo $ticketrow; ?>][1][PRC_amount]" value="<?php echo $PRC_amount; ?>">
		<?php endif; ?>

		<input type="hidden" name="edit_prices[<?php echo $ticketrow; ?>][1][PRT_ID]" class="edit-price-PRT_ID" value="1">
		<input type="hidden" name="edit_prices[<?php echo $ticketrow; ?>][1][PRC_ID]" class="edit-price-PRC_ID" value="<?php echo $PRC_ID; ?>">
		<input type="hidden" name="edit_prices[<?php echo $ticketrow; ?>][1][PRC_is_default]" class="edit-price-PRC_is_default" value="<?php echo $PRC_is_default; ?>">
	</td>
	<td>
		<?php if ( empty( $disabled ) ) : ?>
			<input type="text" class="edit-ticket-TKT_qty ee-small-text-inp ee-inp-right" name="<?php echo $edit_ticketrow_name; ?>[<?php echo $ticketrow; ?>][TKT_qty]" value="<?php echo $TKT_qty; ?>">
		<?php else : ?>
			<input type="text" class="edit-ticket-TKT_qty ee-small-text-inp ee-inp-right" name="disabled_tkt_qty" value="<?php echo $TKT_qty; ?>"<?php echo $disabled; ?>>
			<input type="hidden" class="edit-ticket-TKT_qty ee-small-text-inp ee-inp-right" name="<?php echo $edit_ticketrow_name; ?>[<?php echo $ticketrow; ?>][TKT_qty]" value="<?php echo $TKT_qty; ?>">
		<?php endif; ?>
	</td>
	<td>
		<span class="TKT_sold"><?php echo $TKT_sold; ?></span>
	</td>
	<td>
		<span class="<?php echo $trash_icon; ?>" data-ticket-row="<?php echo $ticketrow; ?>" data-context="ticket">
	</td>
</tr>

<?php
/**
 * template args
 *
 * $tkt_status_class
 * $tkt_archive_class
 * $ticketrow
 * $TKT_ID
 * $TKT_is_default
 * $TKT_name
 * $TKT_start_date
 * $TKT_end_date
 * $price_currency_symbol;
 * $PRC_amount
 * $PRT_ID
 * $PRC_ID
 * $PRC_is_default
 * $TKT_qty
 * $trash_icon
 * $disabled
 */