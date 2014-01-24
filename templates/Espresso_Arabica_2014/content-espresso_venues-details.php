<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
<div class="venue-content">
	<div class="entry-meta">
		<span class="tags-links"><?php espresso_venue_categories( $post->ID, TRUE, TRUE ); ?><?php// echo $venue_categories; ?></span>
		<?php
			twentyfourteen_posted_on();
			if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) :
		?>
		<span class="comments-link"><?php comments_popup_link( __( 'Leave a comment', 'twentyfourteen' ), __( '1 Comment', 'twentyfourteen' ), __( '% Comments', 'twentyfourteen' ) ); ?></span>
		<?php
			endif;

			edit_post_link( __( 'Edit', 'twentyfourteen' ), '<span class="edit-link">', '</span>' );
		?>
	</div>

	<?php // if ( $venue_categories = espresso_venue_categories( $post->ID, TRUE, FALSE )) : ?>
	<?php // endif; ?>
	
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
