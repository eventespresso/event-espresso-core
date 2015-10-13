<?php do_action( 'AHEE__event_tickets_metabox_main__before_content' ); ?>
<div id="event-and-ticket-form-content">
	<h4 class="event-tickets-datetimes-title"><?php _e('Event Datetime', 'event_espresso'); ?></h4><?php echo $event_datetime_help_link; ?>
	<div class="event-datetimes-container">
		<!-- these are the ids for the current displayed datetimes (on create new this is blank -->
		<input type="hidden" name="datetime_IDs" id="datetime-IDs" value="<?php echo $existing_datetime_ids; ?>">

		<!-- this is used by js to calculate what the next datetime row will be and is incremented when a new datetime is "saved". -->
		<input type="hidden" name="datetime_total_rows" id="datetime-total-rows" value="1">

		<section id="edit-event-datetime-1" class="datetime-edit">
			<input type="hidden" name="edit_event_datetimes[1][DTT_ID]" id="event-datetime-DTT_ID-1" class="event-datetime-DTT_ID" value="<?php echo $time->get('DTT_ID'); ?>">
			<table class="datetime-edit-table">
				<thead>
					<tr valign="top">
						<td><?php _e('Event Start', 'event_espresso'); ?></td>
						<td><?php _e('Event End', 'event_espresso'); ?></td>
						<td><?php _e('Reg Limit', 'event_espresso'); ?></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<tr valign="top">
						<td class="event-datetime-column date-column">
							<input type="text" name="edit_event_datetimes[1][DTT_EVT_start]" id="event-datetime-DTT_EVT_start-1" class="ee-text-inp event-datetime-DTT_EVT_start ee-datepicker"  data-context="start-dtt" data-date-field-context="#edit-event-datetime-1" data-related-field=".event-datetime-DTT_EVT_end" data-next-field=".event-datetime-DTT_EVT_end" value="<?php echo $time->get_date('DTT_EVT_start', 'Y-m-d h:i a'); ?>">
						</td>
						<td class="event-datetime-column date-column">
							<input type="text" name="edit_event_datetimes[1][DTT_EVT_end]" id="event-datetime-DTT_EVT_end-1" class="ee-text-inp event-datetime-DTT_EVT_end ee-datepicker"  data-context="end-dtt" data-date-field-context="#edit-event-datetime-1" data-related-field=".event-datetime-DTT_EVT_start" data-next-field=".event-datetime-DTT_reg_limit" value="<?php echo $time->get_date('DTT_EVT_end', 'Y-m-d h:i a'); ?>">
						</td>
						<td class="event-datetime-column reg-limit-column">
							<?php
								$reg_limit = $time->get_pretty('DTT_reg_limit','input');
							?>
							<input type="text" name="edit_event_datetimes[1][DTT_reg_limit]" id="event-datetime-DTT_reg_limit-1" class="ee-small-text-inp ee-inp-right event-datetime-DTT_reg_limit" value="<?php echo $reg_limit; ?>">
						</td>
						<td class="datetime-tickets-sold"><?php printf( __('Tickets Sold: %s', 'event_espresso'), $time->get('DTT_sold') ); ?></td>
					</tr>
				</tbody>
			</table>
		</section>

	</div> <!-- end .event-datetimes-container -->

	<div class="event-tickets-container">
		<h4 class="event-tickets-datetimes-title"><?php _e('Ticket Options', 'event_espresso'); ?></h4><?php echo $ticket_options_help_link; ?><br />
		<table class="add-new-ticket-table">
			<thead>
				<tr valign="top">
					<td><!-- status --></td>
					<td><?php _e('Ticket Name', 'event_espresso'); ?></td>
					<td><?php _e('Sale Starts', 'event_espresso'); ?></td>
					<td><?php _e('Sell Until', 'event_espresso'); ?></td>
					<td><span class="hidden">currency symbol</span></td>
					<td><?php _e('Price', 'event_espresso'); ?></td>
					<td><?php _e('Qty', 'event_espresso'); ?></td>
					<td><?php _e('Sold', 'event_espresso'); ?></td>
					<td></td>
				</tr>
			</thead>
			<tbody id="all-ticket-rows">
				<?php echo $ticket_rows; ?>
			</tbody>
		</table> <!-- end .add-new-ticket-table -->

		<input type="hidden" name="ticket_IDs" id="ticket-IDs" value="<?php echo $existing_ticket_ids; ?>">
		<input type="hidden" name="ticket_total_rows" id="ticket-total-rows" value="<?php echo $total_ticket_rows; ?>">
		<div class="save-cancel-button-container">
			<button class="button-secondary ee-create-button" data-context="ticket"><?php _e('Create New Ticket', 'event_espresso'); ?></button>
		</div>
	</div> <!-- end .event-tickets-container -->
	<div style="clear:both"></div>
</div> <!-- end #event-and-ticket-form-content -->

<?php do_action( 'AHEE__event_tickets_metabox_main__after_content' ); ?>

<table id="new-ticket-row-form" class="hidden">
	<tbody><?php echo $ticket_js_structure; ?></tbody>
</table>
<?php
/**
 * template vars in use
 * 
 * $event_datetime_help_link
 * $ticket_options_help_link
 * $existing_datetime_ids
 * $time
 * $ticket_rows
 * $existing_ticket_ids
 * $total_ticket_rows
 * $ticket_js_structure
 */