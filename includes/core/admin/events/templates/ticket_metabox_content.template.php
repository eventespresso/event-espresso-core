<div id="all-tickets-container">
	<?php foreach ( $tickets_rows as $tickets_row ) {
		echo $tickets_row;
	}
	$total_tickets = count( $tickets_rows );
	$next_ticket_row = $total_tickets + 1;
	?>
	<input type="hidden" id="total_count_ticket_rows" name="total_count_ticket_rows" value="<?php echo $total_tickets; ?>" />
	<input type="hidden" id="next_ticket_row" name="next_ticket_row" value=<?php echo $next_ticket_row; ?> />
	<input id="ticket-add-button" class="button-secondary add-new-ticket" type="button" />
	<input id="ticket-IDs" name="ticket-IDs" type="hidden" value="<?php echo $ticket_ids; ?>" />
</div>