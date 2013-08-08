<fieldset id="edit-ticket-fieldset-<?php echo $ticket_row; ?>">
	<legend><?php printf( __('Ticket %s', 'event_espresso'), $ticket_row ); ?></legend>
	<input id="edit-ticket-id-<?php echo $ticket_row; ?>" type="hidden" name="edit_ticket_info[<?php echo $ticket_row; ?>][TKT_ID]" value="<?php echo $ticket->ID(); ?>" />
	<input id="edit-ticket-name-<?php echo $ticket_row; ?>" type="text" name="edit_ticket_info[<?php echo $ticket_row; ?>][TKT_name]" value="<?php echo $ticket->get('TKT_name'); ?>" placeholder="<?php _e('Ticket Name'); ?>" />
	<textarea id="edit-ticket-description-<?php echo $ticket_row; ?>" type="textarea" name="edit_ticket_info[<?php echo $ticket_row; ?>][TKT_description]">
			<?php echo $ticket->get('TKT_description'); ?>
	</textarea>

	<div id="ticket-price-container-<?php echo $ticket_row; ?>" class="ticket-half-column">
		<?php echo $prices; ?>
	</div>
	<div id="ticket-cost-container-<?php echo $ticket_row; ?>" class="ticket-half-column">
		<span class="ticket-cost-header-text"><?php _e('Single Unit Cost:'); ?></span>
		<span class="ticket-cost-amount">$0</span>
	</div>
	<div class="ticket-half-column">
		<?php echo $ticket_template_selector; ?>
	</div>
	<div class="ticket-half-column">
		<input id="edit-ticket-reg-limit-<?php echo $ticket_row; ?>" type="text" name"edit_ticket_info[<?php echo $ticket_row; ?>][TKT_qty]" value="<?php echo $ticket->get('TKT_qty'); ?>" /> <br />
		<input id="edit-ticket-start-date-<?php echo $ticket_row; ?>" type="text" class="dtm-es-picker dtm-inp" value="<?php $ticket->e_start_date_and_time( 'Y-m-d' ); ?>" />
		<input id="edit-ticket-end-date-<?php echo $ticket_row; ?>" type="text" class="dtm-es-picker dtm-inp" value="<?php $ticket->e_end_date_and_time( 'Y-m-d' ); ?>" />
	</div>

	<div id="ticket-selected-datetimes">
		<!-- a list of datetimes this ticket is attached to -->
	<div>
	<div class="ticket-half-column">
		<input id="ticket-datetime-button" class="button-secondary" type="button" />
	</div>
	<div class="ticket-half-column">
		<input id="ticket-archive-button" class="button-secondary archive" type="button" />
	</div>
</fieldset>