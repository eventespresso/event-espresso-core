<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
<?php do_action( 'AHEE_event_details_before_event_date', $post ); ?>
<div class="event-datetimes">
	<h3 class="event-datetimes-h3 ee-event-h3">
		<span class="dashicons dashicons-calendar"></span><?php _e( 'Upcoming Date(s) and Time(s)', 'event_espresso' ); ?>
	</h3>
	<?php espresso_list_of_event_dates();?>
	<?php do_action( 'AHEE_event_details_after_event_date', $post ); ?>
</div>
<!-- .event-datetimes -->
