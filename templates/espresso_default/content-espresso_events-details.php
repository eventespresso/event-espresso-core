<?php global $post; ?>
<div class="event-content">
	<h3 class="about-event-h3 ee-event-h3">
		<span class="ee-icon ee-icon-event"></span><?php _e( 'Event Details', 'event_espresso' ); ?>
	</h3>
	<?php do_action( 'AHEE_event_details_before_the_content', $post ); ?>
	<?php echo $the_content; ?>
	<?php do_action( 'AHEE_event_details_after_the_content', $post ); ?>
	<p>
		<span class="tags-links"><?php espresso_event_categories( $post->ID ); ?></span>
	</p>
	<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'event_espresso' ), 'after' => '</div>' ) ); ?>
	<?php if ( espresso_event_phone( $post->ID, FALSE ) != '' ) : ?>
	<p>
		<strong><?php _e( 'Phone:', 'event_espresso' ); ?> </strong><?php espresso_event_phone( $post->ID ); ?>
	</p>
	<?php endif; ?>
</div>
<!-- .event-content -->
<br/>
