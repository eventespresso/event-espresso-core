<section id="edit-event-datetime-tickets-<?php echo $dtt_row; ?>" class="datetime-tickets-edit"<?php echo $show_tickets_row; ?>>
	<h5 class="datetime-tickets-heading"><?php _e('Assigned Tickets', 'event_espresso'); ?></h5>

	<ul class="datetime-tickets-list">
		<?php echo $datetime_tickets_list; ?>
	</ul>
	
	
	<div class="add-datetime-ticket-container">
		<h5 class="datetime-tickets-heading"><?php _e('Add New Ticket', 'event_espresso'); ?></h5><?php echo $add_new_datetime_ticket_help_link; ?><br>
		<table class="add-new-ticket-table">
			<thead>
				<tr valign="top">
					<td><?php _e('Ticket Name', 'event_espresso'); ?></td>
					<td><?php _e('Goes On Sale', 'event_espresso'); ?></td>
					<td><?php _e('Sell Until', 'event_espresso'); ?></td>
					<td><?php _e('Price', 'event_espresso'); ?></td>
					<td><?php _e('Qty', 'event_espresso'); ?></td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				<tr valign="top" class="add-new-ticket-shortcut-row">
					<td>
						<input type="text" name="add_new_ticket[TKT_name]" class="add-new-ticket-TKT_name ee-large-text-inp">
					</td>
					<td>
						<input type="text" name="add_new_ticket[TKT_start_date]" class="add-new-ticket-TKT_start_date ee-text-inp ee-datepicker" data-context="start-ticket" data-date-field-context="#edit-event-datetime-tickets-<?php echo $dtt_row; ?>" data-related-field=".add-new-ticket-TKT_end_date" data-next-field=".add-new-ticket-TKT_end_date">
					</td>
					<td>
						<input type="text" name="add_new_ticket[TKT_end_date]" class="add-new-ticket-TKT_end_date ee-text-inp ee-datepicker" data-context="end-ticket" data-date-field-context="#edit-event-datetime-tickets-<?php echo $dtt_row; ?>" data-related-field=".add-new-ticket-TKT_start_date" data-next-field=".add-new-ticket-PRC_amount">
					</td>
					<td>	
						<input type="text" name="add_new_ticket[PRC_amount]" class="ee-text-inp add-new-ticket-PRC_amount ee-numeric" size="1">
					</td>
					<td>
						<input type="text" name="add_new_ticket[TKT_qty]" class="ee-small-text-inp add-new-ticket-TKT_qty ee-numeric" size="1">
					</td>
					<td>
						<span class="clickable gear-icon dashicons dashicons-admin-generic add-edit" data-context="short-ticket" data-datetime-row="<?php echo $dtt_row; ?>" style="display:none"></span>
						<!-- the "add-edit" class is used by jQuery to indicate we need to retrieve a edit form using the value from the #next-ticket-row hidden input (which in turn is incremented if the new created item is saved). -->
						<!-- Also: when the Add New Ticket form is recalled, jQuery will automatically populate the data-context and data-datetime-row properties on the edit icon and save buttons from the event handler for the datetime being edited. -->
					</td>
				</tr>
			</tbody>
		</table>
		<div class="save-cancel-button-container">
			<button data-context="short-ticket" data-datetime-row="<?php echo $dtt_row; ?>" class="button-primary ee-create-button">
				<?php _e('Create Ticket', 'event_espresso'); ?>
			</button>
			<button data-context="short-ticket" data-datetime-row="<?php echo $dtt_row; ?>" class="button-secondary ee-cancel-button add-edit">
				<?php _e('Cancel', 'event_espresso'); ?>
			</button>
		</div>
		<div style="clear:both"></div>
	</div>
</section>


<?php 
/**
 * template args used
 *
 * $dtt_row
 * $show_tickets_row
 * $datetime_tickets_list
 * $add_new_datetime_ticket_help_link
 */