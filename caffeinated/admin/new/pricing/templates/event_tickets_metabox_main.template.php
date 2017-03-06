<div id="event-and-ticket-form-content">
	<h3 class="event-tickets-datetimes-title"><span data-target=".event-datetimes-container" class="clickable ee-collapsible<?php echo $ee_collapsible_status; ?>"><span class="dashicons dashicons-clock ee-icon-size-20"></span><?php _e('Event Datetimes', 'event_espresso'); ?></span></h3><?php echo $event_datetime_help_link; ?>
	<div class="event-datetimes-container">
		<div class="save-cancel-button-container">
			<button class="button-secondary ee-create-button datetime-create-button" data-context="datetime">
				<?php _e('Add Datetime', 'event_espresso'); ?>
			</button>
		</div>
		<!-- these are the ids for the current displayed datetimes (on create new this is blank -->
		<input type="hidden" name="datetime_IDs" id="datetime-IDs" value="<?php echo $existing_datetime_ids; ?>">

		<!-- this is used by js to calculate what the next datetime row will be and is incremented when a new datetime is "saved". -->
		<input type="hidden" name="datetime_total_rows" id="datetime-total-rows" value="<?php echo $total_dtt_rows; ?>">
		<table id="datetime-editing-dtts-table" class="datetime-edit-table">
			<thead>
				<tr valign="top">
					<td><span class="DTT_name_label"><?php _e('Name', 'event_espresso'); ?></span></td>
					<td><span class="DTT_EVT_start_label"><?php _e('Event Start', 'event_espresso'); ?></span></td>
					<td><span class="DTT_EVT_end_label"><?php _e('Event End', 'event_espresso'); ?></span></td>
					<td><span class="DTT_reg_limit_label"><?php _e('Limit', 'event_espresso'); ?></span></td>
					<td><span class="DTT_sold_label"><?php _e('Sold', 'event_espresso'); ?></span></td>
                    <?php if (WP_DEBUG):  // for now we are only showing reserved counts if WP_DEBUG is on?>
                        <td><span class="DTT_reserved_label"><?php _e('Rsrvd', 'event_espresso'); ?></span></td>
                    <?php endif; ?>
                    <td></td>
				</tr>
			</thead>
			<tbody class="datetime-editing-dtts-tbody">
				<?php echo $datetime_rows; ?>
			</tbody>
		</table>
		<div style="clear:both"></div>
	</div> <!-- end .event-datetimes-container -->
	<div id="add-event-datetime" class="event-datetime-row add-dtt-row" style="display:none;">
		<h4 class="datetime-tickets-heading"><?php _e('Add New Datetime', 'event_espresso'); ?></h4><?php echo $add_new_dtt_help_link; ?>
		<div>
			<table id="add-new-event-datetime-table" class="datetime-edit-table">
				<tr>
					<td class="event-datetime-column date-name-column">
						<label class="add-new-event-datetime-DTT_name_label" for="add-new-event-datetime-DTT_name"><?php _e('Name', 'event_espresso'); ?></label>
						<input type="text" name="add_new_datetime[DTT_name]" id="add-new-event-datetime-DTT_name" class="ee-large-text-inp"  placeholder="<?php _e('Add Title (optional)', 'event_espresso'); ?>">
					</td>
					<td class="event-datetime-column date-column">
						<label class="add-new-event-datetime-DTT_EVT_start_label" for="add-new-event-datetime-DTT_EVT_start"><?php _e('Event Start', 'event_espresso'); ?></label>
						<input type="text" name="add_new_datetime[DTT_EVT_start]" id="add-new-event-datetime-DTT_EVT_start" class="ee-text-inp ee-datepicker" data-context="start-dtt" data-date-field-context="#add-event-datetime" data-related-field="#add-new-event-datetime-DTT_EVT_end" data-next-field="#add-new-event-datetime-DTT_EVT_start">
					</td>
					<td class="event-datetime-column date-column">
						<label class="add-new-event-datetime-DTT_EVT_end_label" for="add-new-event-datetime-DTT_EVT_end"><?php _e('Event End', 'event_espresso'); ?></label>
						<input type="text" name="add_new_datetime[DTT_EVT_end]" id="add-new-event-datetime-DTT_EVT_end" class="ee-text-inp ee-datepicker" data-context="end-dtt" data-date-field-context="#add-event-datetime" data-related-field="#add-new-event-datetime-DTT_EVT_start" data-next-field="#add-new-event-datetime-DTT_reg_limit">
					</td>
					<td class="event-datetime-column reg-limit-column">
						<label class="add-new-event-datetime-DTT_EVT_end_label" for="add-new-event-datetime-DTT_reg_limit"><?php _e('Limit', 'event_espresso'); ?></label>
						<input type="text" name="add_new_datetime[DTT_reg_limit]" id="add-new-event-datetime-DTT_reg_limit" class="ee-numeric ee-small-text-inp">
					</td>
				</tr>
			</table>
			<div class="save-cancel-button-container th-adjust">
				<button data-context="datetime-create" class="button-primary ee-create-button">
					<?php _e('Create Datetime', 'event_espresso'); ?>
				</button>
				<button data-context="datetime-create" class="button-secondary ee-cancel-button">
					<?php _e('Cancel', 'event_espresso'); ?>
				</button>
			</div>
			<div style="clear:both"></div>
		</div>
	</div> <!-- end #add-event-datetime -->
	<div style="clear:both"></div>

	<div class="available-tickets-container">
		<h3 class="event-tickets-datetimes-title"><span data-target=".event-tickets-container" class="clickable ee-collapsible<?php echo $ee_collapsible_status; ?>"><span class="ee-icon ee-icon-tickets ee-icon-size-20"></span><?php _e('Available Tickets', 'event_espresso'); ?></span></h3>
		<div class="event-tickets-container ee-create-ticket-button"<?php echo $show_tickets_container; ?>>
			<button class="ee-create-ticket-button button-secondary ee-create-button" data-context="ticket"><?php _e('Create Ticket', 'event_espresso'); ?></button>
		</div>
		<div style="clear:both"></div>
		<div class="event-tickets-container"<?php echo $show_tickets_container; ?>>
			<table class="ticket-table">
				<thead>
					<tr valign="top">
						<td colspan="2"><span class="TKT_name_label"><?php _e('Ticket', 'event_espresso'); ?></span></td>
						<td><span class="TKT_goes_on_sale_label"><?php _e('Sale Starts', 'event_espresso'); ?></span></td>
						<td><span class="TKT_sell_until_label"><?php _e('Sell Until', 'event_espresso'); ?></span></td>
						<td><span class="TKT_price_label"><?php _e('Price', 'event_espresso'); ?></span></td>
						<td><span class="TKT_qty_label"><?php _e('Qty', 'event_espresso'); ?></span></td>
						<td><span class="TKT_sold_label"><?php _e('Sold', 'event_espresso'); ?></span></td>
                        <?php if (WP_DEBUG):  // for now we are only showing reserved counts if WP_DEBUG is on?>
                            <td><span class="TKT_reserved_label"><?php _e('Rsrvd', 'event_espresso'); ?></span></td>
                        <?php endif; ?>
                        <td colspan="2"><span class="TKT_regs_label"><?php _e('Regs', 'event_espresso'); ?></span></td>
					</tr>
				</thead>
				<tbody>
					<?php echo $ticket_rows; ?>
				</tbody>
			</table> <!-- end .ticket-table -->

			<input type="hidden" name="ticket_IDs" id="ticket-IDs" value="<?php echo $existing_ticket_ids; ?>">
			<input type="hidden" name="ticket_total_rows" id="ticket-total-rows" value="<?php echo $total_ticket_rows; ?>">
		</div> <!-- end .event-tickets-container -->
		<div style="clear:both"></div>
	</div>
</div> <!-- end #event-and-ticket-form-content -->

<?php echo $ticket_js_structure; ?>
<?php
/**
 * template vars in use
 *
 * $event_datetime_help_link
 * $existing_datetime_ids
 * $total_dtt_rows
 * $add_new_dtt_help_link
 * $datetime_rows
 * $show_tickets_container
 * $ticket_rows
 * $existing_ticket_ids
 * $total_ticket_rows
 * $ticket_js_structure
 * $ee_collapsible_status
 */