<?php
/**
 * This template will display a single event - copy it to your theme folder
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license		https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */

/*************************** IMPORTANT *************************
 * if you are creating a custom template based on this file,
 * and do not wish to use the template display order controls in the admin,
 * then change the following filter to:
 * add_filter( 'FHEE__content_espresso_events__template_loaded', '__return_true' );
 * comment out calls to the_content() and espresso_event_content_or_excerpt()
 * then UN-comment and position the additional template parts
 * that are loaded via the espresso_get_template_part() function to your liking
 * and/or use any of the template tags functions found in:
 * \wp-content\plugins\event-espresso-core\public\template_tags.php
 ************************** IMPORTANT **************************/
add_filter( 'FHEE__content_espresso_events__template_loaded', '__return_false' );


global $post;
$event_class = has_excerpt( $post->ID ) ? ' has-excerpt' : '';
$event_class = apply_filters( 'FHEE__content_espresso_events__event_class', $event_class );
?>
<?php do_action( 'AHEE_event_details_before_post', $post ); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class( $event_class ); ?>>

<?php if ( is_single() ) : ?>

	<div id="espresso-event-header-dv-<?php echo esc_attr($post->ID);?>" class="espresso-event-header-dv">
		<?php espresso_get_template_part( 'content', 'espresso_events-thumbnail' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-header' ); ?>
	</div>

	<div class="espresso-event-wrapper-dv">
		<?php the_content(); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-tickets' ); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-datetimes' ); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-details' ); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-venues' ); ?>
		<footer class="event-meta">
			<?php do_action( 'AHEE_event_details_footer_top', $post ); ?>
			<?php do_action( 'AHEE_event_details_footer_bottom', $post ); ?>
		</footer>
	</div>

<?php elseif ( is_archive() ) : ?>

	<div id="espresso-event-list-header-dv-<?php echo esc_attr($post->ID); ?>" class="espresso-event-header-dv">
		<?php espresso_get_template_part( 'content', 'espresso_events-thumbnail' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-header' ); ?>
	</div>

	<div class="espresso-event-list-wrapper-dv">
		<?php espresso_event_content_or_excerpt(); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-tickets' ); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-datetimes' ); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-details' ); ?>
		<?php //espresso_get_template_part( 'content', 'espresso_events-venues' ); ?>
	</div>

<?php endif; ?>

</article>
<!-- #post -->
<?php do_action( 'AHEE_event_details_after_post', $post );

