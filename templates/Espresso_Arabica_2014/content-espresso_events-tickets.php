<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
<br/>
<div class="event-tickets">
	<h3 class="ticket-selector-h3 ee-event-h3">
		<span class="ee-icon ee-icon-tickets"></span><?php _e( 'Ticket Options', 'event_espresso' ); ?>
	</h3>
	<?php espresso_ticket_selector( $post ); ?>
</div>
<!-- .event-tickets -->