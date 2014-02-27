<?php 
if ( is_single() || is_archive() && espresso_display_datetimes_in_event_list() ) :
global $post;
do_action( 'AHEE_event_details_before_event_date', $post ); 
?>
	<div class="event-datetimes">
		<h3 class="event-datetimes-h3 ee-event-h3">
			<span class="dashicons dashicons-calendar"></span><?php _e( 'Upcoming Date(s) and Time(s)', 'event_espresso' ); ?>
		</h3>
		<?php espresso_list_of_event_dates( $post->ID );?>
	</div>
	<!-- .event-datetimes -->
<?php 
do_action( 'AHEE_event_details_after_event_date', $post ); 
endif;  
?>