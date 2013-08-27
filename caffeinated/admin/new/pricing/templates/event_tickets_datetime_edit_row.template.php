<section id="edit-event-datetime-<?php echo $dtt_row; ?>" class="datetime-edit"<?php echo $display_dtt_edit_row; ?>>
	<input type="hidden" name="edit_event_datetimes[<?php echo $dtt_row; ?>][DTT_ID]" id="event-datetime-DTT_ID-<?php echo $dtt_row; ?>" class="event-datetime-DTT_ID" value="<?php echo $DTT_ID; ?>">
	<input type="hidden" name="edit_event_datetimes[<?php echo $dtt_row; ?>][DTT_is_primary]" id="event-datetime-DTT_is_primary-<?php echo $dtt_row; ?>" class="event-datetime-DTT_is_primary" value="<?php echo $DTT_is_primary; ?>">
	<table id="edit-event-datetime-table-<?php echo $dtt_row; ?>" class="datetime-edit-table">
		<tr>
			<td class="event-datetime-column date-column">
				<label for="event-datetime-DTT_EVT_start-<?php echo $dtt_row; ?>"><?php _e('Event Start', 'event_espresso'); ?></label>
				<input type="text" name="edit_event_datetimes[<?php echo $dtt_row; ?>][DTT_EVT_start]" id="event-datetime-DTT_EVT_start-<?php echo $dtt_row; ?>" class="ee-text-inp event-datetime-DTT_EVT_start ee-datepicker"  data-context="start-dtt" data-date-field-context="#edit-event-datetime-<?php echo $dtt_row; ?>" data-related-field=".event-datetime-DTT_EVT_end" data-next-field=".event-datetime-DTT_EVT_end" value="<?php echo $DTT_EVT_start; ?>">
			</td>
			<td class="event-datetime-column date-column">
				<label for="event-datetime-DTT_EVT_end-<?php echo $dtt_row; ?>"><?php _e('Event End', 'event_espresso'); ?></label>
				<input type="text" name="edit_event_datetimes[<?php echo $dtt_row; ?>][DTT_EVT_end]" id="event-datetime-DTT_EVT_end-<?php echo $dtt_row; ?>" class="ee-text-inp event-datetime-DTT_EVT_end ee-datepicker"  data-context="end-dtt" data-date-field-context="#edit-event-datetime-<?php echo $dtt_row; ?>" data-related-field=".event-datetime-DTT_EVT_start" data-next-field=".event-datetime-DTT_reg_limit" value="<?php echo $DTT_EVT_end; ?>">
			</td>
			<td class="event-datetime-column small-txt-column">
				<label for="event-datetime-DTT_reg_limit-<?php echo $dtt_row; ?>"><?php _e('Reg Limit', 'event_espresso'); ?></label>
				<input type="text" name="edit_event_datetimes[<?php echo $dtt_row; ?>][DTT_reg_limit]" id="event-datetime-DTT_reg_limit-<?php echo $dtt_row; ?>" class="ee-small-text-inp event-datetime-DTT_reg_limit" value="echo $DTT_reg_limit; ?>">
			</td>
			<td class="event-datetime-column button-column">
				<button data-datetime-row="<?php echo $dtt_row; ?>"  data-context="datetime" class="button-primary ee-save-button">
					<?php _e('Save Datetime', 'event_espresso'); ?>
				</button>
				<button data-datetime-row="<?php echo $dtt_row; ?>" data-context="datetime" class="button-secondary ee-cancel-button">
					<?php _e('Cancel', 'event_espresso'); ?>
				</button>
			</td>
		</tr>
	</table>
</section>

<?php 
/**
 * template args in use
 *
 * $dtt_row
 * $display_dtt_edit_row
 * $DTT_ID
 * $DTT_is_primary
 * $DTT_EVT_start
 * $DTT_EVT_end
 * $DTT_reg_limit
 */