<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

global $post;
?>
<div class="venue-content">
<?php if ( apply_filters( 'FHEE__content_espresso_venues_details_template__display_entry_meta', TRUE )): ?>
	<div class="entry-meta">
		<span class="tags-links"><?php espresso_venue_categories( $post->ID, TRUE, TRUE ); ?></span>
		<?php
			if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) :
		?>
		<span class="comments-link"><?php comments_popup_link( esc_html__( 'Leave a comment', 'event_espresso' ), esc_html__( '1 Comment', 'event_espresso' ), esc_html__( '% Comments', 'event_espresso' ) ); ?></span>
		<?php
			endif;

			edit_post_link( esc_html__( 'Edit', 'event_espresso' ), '<span class="edit-link">', '</span>' );
		?>
	</div>
<?php  endif; ?>
	
	<h3 class="event-venues-h3 ee-event-h3">
		<?php esc_html_e( 'Details', 'event_espresso' ); ?>
	</h3>

	<?php if ( $venue_phone = espresso_venue_phone( $post->ID, FALSE )) : ?>
	<p>
		<span class="small-text"><strong><?php esc_html_e( 'Venue Phone:', 'event_espresso' ); ?> </strong></span><?php echo wp_kses($venue_phone, AllowedTags::getAllowedTags()); ?>
	</p>
	<?php endif; ?>
	<?php if ( $venue_website = espresso_venue_website( $post->ID, FALSE )) : ?>
	<p>
		<span class="small-text"><strong><?php esc_html_e( 'Venue Website:', 'event_espresso' ); ?> </strong></span><?php echo wp_kses($venue_website, AllowedTags::getAllowedTags()); ?>
	</p>
	<?php endif; ?>
	<?php 
	do_action( 'AHEE__content_espresso_venues_details_template__before_the_content', $post ); 
	if ( is_archive() && has_excerpt( $post->ID )) {
		the_excerpt();
	} else {
		the_content();
	}
	do_action( 'AHEE__content_espresso_venues_details_template__after_the_content', $post ); 
	?>
</div>
<!-- .venue-content -->
