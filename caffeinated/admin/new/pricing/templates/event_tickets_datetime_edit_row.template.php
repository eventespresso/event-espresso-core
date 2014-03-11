<tr id="event-datetime-<?php echo $dtt_row; ?>" class="datetime-edit event-datetime-row edit-dtt-row">
	<td class="event-datetime-column date-name-column">
		<input type="hidden" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_ID]" id="event-datetime-DTT_ID-<?php echo $dtt_row; ?>" class="event-datetime-DTT_ID" value="<?php echo $DTT_ID; ?>">
		<input type="hidden" name="<?Php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_order]" id="event-datetime-DTT_order-<?php echo $dtt_row; ?>" class="event-datetime-DTT_order" value="<?php echo $DTT_order; ?>">
		<input type="text" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_name]" id="event-datetime-DTT_name-<?php echo $dtt_row; ?>" class="ee-large-text-inp event-datetime-DTT_name" value="<?php echo $DTT_name; ?>" placeholder="<?php _e('Add Title (optional)', 'event_espresso'); ?>">
	</td>
	<td class="event-datetime-column date-column">
		<input type="text" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_EVT_start]" id="event-datetime-DTT_EVT_start-<?php echo $dtt_row; ?>" class="ee-text-inp event-datetime-DTT_EVT_start ee-datepicker"  data-datetime-row="<?php echo $dtt_row; ?>" data-context="start-dtt" data-date-field-context="#edit-event-datetime-<?php echo $dtt_row; ?>" data-related-field=".event-datetime-DTT_EVT_end" data-next-field=".event-datetime-DTT_EVT_end" value="<?php echo $DTT_EVT_start; ?>">
	</td>
	<td class="event-datetime-column date-column">
		<input type="text" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_EVT_end]" id="event-datetime-DTT_EVT_end-<?php echo $dtt_row; ?>" class="ee-text-inp event-datetime-DTT_EVT_end ee-datepicker"  data-datetime-row="<?php echo $dtt_row; ?>" data-context="end-dtt" data-date-field-context="#edit-event-datetime-<?php echo $dtt_row; ?>" data-related-field=".event-datetime-DTT_EVT_start" data-next-field=".event-datetime-DTT_reg_limit" value="<?php echo $DTT_EVT_end; ?>">
	</td>
	<td class="event-datetime-column small-txt-column">
		<input type="text" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_reg_limit]" id="event-datetime-DTT_reg_limit-<?php echo $dtt_row; ?>" class="ee-small-text-inp event-datetime-DTT_reg_limit ee-numeric" value="<?php echo $DTT_reg_limit; ?>">
	</td>
	<td>
		<span  data-context="datetime" data-datetime-row="<?php echo $dtt_row; ?>" class="datetime-tickets-sold ee-numeric"><?php echo $dtt_sold; ?></span>
	</td>
	<td>
		<div class="ee-editing-container<?php echo $edit_dtt_expanded; ?>"><span data-datetime-row="<?php echo $dtt_row; ?>"  data-context="datetime" class="ticket-icon dashicons dashicons-admin-generic clickable"></span></div><span  data-context="datetime" data-datetime-row="<?php echo $dtt_row; ?>" class="<?php echo $clone_icon; ?>"></span><span  data-context="datetime" data-datetime-row="<?php echo $dtt_row; ?>" class="<?php echo $trash_icon; ?>"<?php echo $show_trash; ?>></span>
	</td>
</tr>
<?php 
/**
 * template args in use
 *
 * $dtt_row
 * $event_datetimes_name
 * $edit_dtt_expanded
 * $DTT_ID
 * $DTT_name
 * $DTT_EVT_start
 * $DTT_EVT_end
 * $DTT_reg_limit
 * $DTT_order
 * $dtt_sold
 * $clone_icon
 * $trash_icon
 * $show_trash
 */
