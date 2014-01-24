<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
<div class="event-content">
<?php if ( apply_filters( 'FHEE__content_espresso_events_details_template__display_entry_meta', TRUE )): ?>
	<div class="entry-meta">
		<span class="tags-links"><?php espresso_event_categories( $post->ID, TRUE, TRUE ); ?></span>
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
<?php endif; ?>

	<h3 class="about-event-h3 ee-event-h3">
		<span class="ee-icon ee-icon-event"></span><?php _e( 'Event Details', 'event_espresso' ); ?>
	</h3>
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
