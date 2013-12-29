<section id="edit-event-datetime-<?php echo $dtt_row; ?>" class="datetime-edit">
	<input type="hidden" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_ID]" id="event-datetime-DTT_ID-<?php echo $dtt_row; ?>" class="event-datetime-DTT_ID" value="<?php echo $DTT_ID; ?>">
	<input type="hidden" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_is_primary]" id="event-datetime-DTT_is_primary-<?php echo $dtt_row; ?>" class="event-datetime-DTT_is_primary" value="<?php echo $DTT_is_primary; ?>">
	<table id="edit-event-datetime-table-<?php echo $dtt_row; ?>" class="datetime-edit-table">
		<tr>
			<td class="event-datetime-column date-column">
				<label for="event-datetime-DTT_EVT_start-<?php echo $dtt_row; ?>"><?php _e('Event Start', 'event_espresso'); ?></label>
				<input type="text" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_EVT_start]" id="event-datetime-DTT_EVT_start-<?php echo $dtt_row; ?>" class="ee-text-inp event-datetime-DTT_EVT_start ee-datepicker"  data-datetime-row="<?php echo $dtt_row; ?>" data-context="start-dtt" data-date-field-context="#edit-event-datetime-<?php echo $dtt_row; ?>" data-related-field=".event-datetime-DTT_EVT_end" data-next-field=".event-datetime-DTT_EVT_end" value="<?php echo $DTT_EVT_start; ?>">
			</td>
			<td class="event-datetime-column date-column">
				<label for="event-datetime-DTT_EVT_end-<?php echo $dtt_row; ?>"><?php _e('Event End', 'event_espresso'); ?></label>
				<input type="text" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_EVT_end]" id="event-datetime-DTT_EVT_end-<?php echo $dtt_row; ?>" class="ee-text-inp event-datetime-DTT_EVT_end ee-datepicker"  data-datetime-row="<?php echo $dtt_row; ?>" data-context="end-dtt" data-date-field-context="#edit-event-datetime-<?php echo $dtt_row; ?>" data-related-field=".event-datetime-DTT_EVT_start" data-next-field=".event-datetime-DTT_reg_limit" value="<?php echo $DTT_EVT_end; ?>">
			</td>
			<td class="event-datetime-column small-txt-column">
				<label for="event-datetime-DTT_reg_limit-<?php echo $dtt_row; ?>"><?php _e('Limit', 'event_espresso'); ?></label>
				<input type="text" name="<?php echo $event_datetimes_name; ?>[<?php echo $dtt_row; ?>][DTT_reg_limit]" id="event-datetime-DTT_reg_limit-<?php echo $dtt_row; ?>" class="ee-small-text-inp event-datetime-DTT_reg_limit ee-numeric" value="<?php echo $DTT_reg_limit; ?>">
			</td>
			<td>
				<strong><?php _e('Sold ', 'event_espresso'); ?></strong><br />
				<span  data-context="datetime" data-datetime-row="<?php echo $dtt_row; ?>" class="datetime-tickets-sold ee-numeric"><?php echo $dtt_sold; ?></span>
			</td>
			<td>
				<div class="ee-editing-container<?php echo $edit_dtt_expanded; ?>"><span data-datetime-row="<?php echo $dtt_row; ?>"  data-context="datetime" class="ticket-icon clickable"></span></div><span  data-context="datetime" data-datetime-row="<?php echo $dtt_row; ?>" class="<?php echo $clone_icon; ?>"></span><span  data-context="datetime" data-datetime-row="<?php echo $dtt_row; ?>" class="<?php echo $trash_icon; ?>"<?php echo $show_trash; ?>></span>
			</td>
		</tr>
	</table>
	<div style="clear: both"></div>
</section>

<?php 
/**
 * template args in use
 *
 * $dtt_row
 * $event_datetimes_name
 * $edit_dtt_expanded
 * $DTT_ID
 * $DTT_is_primary
 * $DTT_EVT_start
 * $DTT_EVT_end
 * $DTT_reg_limit
 * $dtt_sold
 * $clone_icon
 * $trash_icon
 * $show_trash
 */