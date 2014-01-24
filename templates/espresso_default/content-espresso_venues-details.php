<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
<div class="venue-content">
	<?php if ( $venue_categories = espresso_venue_categories( $post->ID, TRUE, FALSE )) : ?>
	<p>
		<span class="tags-links"><?php echo $venue_categories; ?></span>
	</p>
	<?php endif; ?>
	
	<h3 class="event-venues-h3 ee-event-h3">
		<span class="ee-icon ee-icon-venue"></span><?php _e( 'Venue Details', 'event_espresso' ); ?>
	</h3>

	<?php if ( $venue_phone = espresso_venue_phone( $post->ID, FALSE )) : ?>
	<p>
		<span class="small-text"><strong><?php _e( 'Venue Phone:', 'event_espresso' ); ?> </strong></span><?php echo $venue_phone; ?>
	</p>
	<?php endif; ?>
	<?php 
	do_action( 'AHEE__content_espresso_venues_details_template__before_the_content', $post ); 
	if ( is_archive() && has_excerpt( $post->ID ) ) {
		the_excerpt();
	} else {
		the_content();
	}
	do_action( 'AHEE__content_espresso_venues_details_template__after_the_content', $post ); 
	?>
</div>
<!-- .event-content -->
