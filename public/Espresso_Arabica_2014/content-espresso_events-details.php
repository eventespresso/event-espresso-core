<?php
//echo '<br/><h6 style="color:#2EA2CC;">'. __FILE__ . ' &nbsp; <span style="font-weight:normal;color:#E76700"> Line #: ' . __LINE__ . '</span></h6>';
global $post;
?>
<div class="event-content">
<?php if ( apply_filters( 'FHEE__content_espresso_events_details_template__display_entry_meta', TRUE )): ?>
	<div class="entry-meta">
		<span class="tags-links"><?php espresso_event_categories( $post->ID, TRUE, TRUE ); ?></span>
	<?php
		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) :
	?>
	<span class="comments-link"><?php comments_popup_link( __( 'Leave a comment', 'event_espresso' ), __( '1 Comment', 'event_espresso' ), __( '% Comments', 'event_espresso' ) ); ?></span>
	<?php
		endif;
		edit_post_link( __( 'Edit', 'event_espresso' ), '<span class="edit-link">', '</span>' );
	?>
	</div>
<?php endif;
	$event_phone = espresso_event_phone( $post->ID, FALSE );
	if ( $event_phone != '' ) : ?>
	<p>
		<span class="small-text"><strong><?php _e( 'Event Phone:', 'event_espresso' ); ?> </strong></span> <?php echo $event_phone; ?>
	</p>
<?php endif;  ?>
<?php
	if ( apply_filters( 'FHEE__content_espresso_events_details_template__display_the_content', true ) ) {
		do_action( 'AHEE_event_details_before_the_content', $post );
		echo apply_filters(
			'FHEE__content_espresso_events_details_template__the_content',
			espresso_event_content_or_excerpt( 55, null, false ) 
		);
		do_action( 'AHEE_event_details_after_the_content', $post );
	}
 ?>
</div>
<!-- .event-content -->
