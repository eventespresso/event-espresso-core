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

	<div id="espresso-venue-header-dv" class="">
		<?php do_action( 'AHEE__content_espresso_venues_template__before_featured_img', $post ); ?>		
		<?php				
		if ( has_post_thumbnail( $post->ID )) :
			if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
				if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
					$caption = esc_attr( get_post( get_post( $img_ID ))->post_excerpt );
					$wrap_class .= ' has-img';
					?>
		<div id="ee-venue-img-dv-<?php echo $post->ID; ?>" class="ee-venue-img-dv">
			<a class="" href="<?php the_permalink(); ?>">
				<img class="ee-venue-img" src="<?php echo $featured_img[0]; ?>" width="<?php echo $featured_img[1]; ?>" height="<?php echo $featured_img[2]; ?>" alt="<?php echo $caption; ?>"/>
			</a>
		</div>
		<?php 
				endif;
			endif;
		endif;
		?>		
		<?php do_action( 'AHEE__content_espresso_venues_template__after_featured_img', $post );?>
		
		<header class="venue-header<?php echo $wrap_class;?>">
			<h1 id="venue-details-h1" class="entry-title">
				<a class="" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h1>
			<?php if ( has_excerpt( $post->ID )) { the_excerpt(); } ?>
		</header>
	</div>
	
	<div class="espresso-venue-wrapper-dv">
	
		<?php get_template_part( 'content', 'espresso_venues-details' ); ?>
		<?php get_template_part( 'content', 'espresso_venues-location' ); ?>

		<footer class="venue-meta">
			<?php do_action( 'AHEE__content_espresso_venues_template__footer_top', $post ); ?>
			<!-- .entry-meta -->			
			<?php do_action( 'AHEE__content_espresso_venues_template__footer_bottom', $post ); ?>
		</footer>
		
	</div>
	
</article>
<!-- #post -->
<?php do_action( 'AHEE__content_espresso_venues_template__after_post', $post );

