<?php
//echo '<br/><h6 style="color:#2EA2CC;">'. __FILE__ . ' &nbsp; <span style="font-weight:normal;color:#E76700"> Line #: ' . __LINE__ . '</span></h6>';
/**
 * This template will display a single event - copy it to your theme folder
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */

global $post;
$event_class = has_excerpt( $post->ID ) ? ' has-excerpt' : '';
$event_class = apply_filters( 'FHEE__content_espresso_events__event_class', $event_class );
?>
<?php do_action( 'AHEE_event_details_before_post', $post ); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class( $event_class ); ?>>

<?php if ( is_single() ) : ?>

	<div id="espresso-event-header-dv-<?php echo $post->ID;?>" class="espresso-event-header-dv">
		<?php espresso_get_template_part( 'content', 'espresso_events-thumbnail' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-header' ); ?>
	</div>

	<div class="espresso-event-wrapper-dv">
		<?php espresso_get_template_part( 'content', 'espresso_events-tickets' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-datetimes' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-details' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-venues' ); ?>
		<footer class="event-meta">
			<?php do_action( 'AHEE_event_details_footer_top', $post ); ?>
			<?php do_action( 'AHEE_event_details_footer_bottom', $post ); ?>
		</footer>
	</div>

<?php elseif ( is_archive() ) : ?>

	<div id="espresso-event-list-header-dv-<?php echo $post->ID;?>" class="espresso-event-header-dv">
		<?php espresso_get_template_part( 'content', 'espresso_events-thumbnail' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-header' ); ?>
	</div>

	<div class="espresso-event-list-wrapper-dv">
		<?php espresso_get_template_part( 'content', 'espresso_events-tickets' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-datetimes' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-details' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-venues' ); ?>
	</div>

<?php endif; ?>

</article>
<!-- #post -->
<?php do_action( 'AHEE_event_details_after_post', $post );

