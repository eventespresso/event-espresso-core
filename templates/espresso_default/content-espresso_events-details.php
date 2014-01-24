<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
<div class="event-content">
	<h3 class="about-event-h3 ee-event-h3">
		<span class="ee-icon ee-icon-event"></span><?php _e( 'Event Details', 'event_espresso' ); ?>
	</h3>
	<p>
		<span class="tags-links"><?php espresso_event_categories( $post->ID ); ?></span>
	</p>
	<?php if ( espresso_event_phone( $post->ID, FALSE ) != '' ) : ?>
	<p>
		<span class="small-text"><strong><?php _e( 'Event Phone:', 'event_espresso' ); ?> </strong></span> <?php espresso_event_phone( $post->ID ); ?>
	</p>
	<?php endif; ?>
<?php 
	do_action( 'AHEE_event_details_before_the_content', $post ); 
	if ( is_archive() && has_excerpt( $post->ID ) ) {
		the_excerpt();
	} else {
		the_content();
	}
	do_action( 'AHEE_event_details_after_the_content', $post ); 
?>
</div>
<!-- .event-content -->
