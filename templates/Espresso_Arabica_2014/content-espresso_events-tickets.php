<?php 
global $post; 
if ( espresso_display_ticket_selector() && ( is_single() || ( is_archive() && espresso_display_ticket_selector_in_event_list() ))) : 
?>
<br/>
<div class="event-tickets" style="clear: both;">
	<h3 class="ticket-selector-h3 ee-event-h3">
		<span class="ee-icon ee-icon-tickets"></span><?php _e( 'Ticket Options', 'event_espresso' ); ?>
	</h3>
	<?php espresso_ticket_selector( $post ); ?>
</div>
<!-- .event-tickets -->
<?php endif; ?>