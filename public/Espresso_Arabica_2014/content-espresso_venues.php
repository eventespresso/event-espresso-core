<?php
/**
 * This is template will display a single venue
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license		http://venueespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */

global $post;
$wrap_class = has_excerpt( $post->ID ) ? ' has-excerpt' : '';
?>
<?php do_action( 'AHEE__content_espresso_venues_template__before_post', $post ); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'espresso-venue-details entry-content ' . $wrap_class ); ?>>

<?php if ( is_single() ) : ?>

	<div id="espresso-venue-header-dv-<?php echo $post->ID;?>" class="espresso-venue-header-dv">
		<?php espresso_get_template_part( 'content', 'espresso_venues-thumbnail' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_venues-header' ); ?>
	</div>

	<div class="espresso-venue-wrapper-dv">
		<?php espresso_get_template_part( 'content', 'espresso_venues-details' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_venues-location' ); ?>
		<footer class="venue-meta">
			<?php do_action( 'AHEE__content_espresso_venues_template__footer_top', $post ); ?>
			<?php do_action( 'AHEE__content_espresso_venues_template__footer_bottom', $post ); ?>
		</footer>
	</div>

<?php elseif ( is_archive() ) : ?>

	<div id="espresso-venue-header-dv-<?php echo $post->ID;?>" class="espresso-venue-header-dv">
		<?php espresso_get_template_part( 'content', 'espresso_venues-thumbnail' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_venues-header' ); ?>
	</div>

	<div class="espresso-venue-wrapper-dv">
		<?php espresso_get_template_part( 'content', 'espresso_venues-details' ); ?>
	</div>

<?php endif; ?>

</article>
<!-- #post -->
<?php do_action( 'AHEE__content_espresso_venues_template__after_post', $post );

