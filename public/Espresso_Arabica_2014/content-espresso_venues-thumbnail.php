<?php //echo '<h1>' . __FILE__ . '</h1>';
/** @var string $wrap_class */

global $post;

do_action( 'AHEE__content_espresso_venues_template__before_featured_img', $post );

if ( has_post_thumbnail( $post->ID )) :
	if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
		if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
			$caption = get_post( get_post( $img_ID ))->post_excerpt;
			$wrap_class .= ' has-img';
			?>
<div id="ee-venue-img-dv-<?php echo esc_attr($post->ID); ?>" class="ee-venue-img-dv">
	<a class="" href="<?php the_permalink(); ?>">
		<img alt="<?php echo esc_attr($caption); ?>"
             class="ee-venue-img"
             height="<?php echo esc_attr($featured_img[2]); ?>"
             src="<?php echo esc_url_raw($featured_img[0]); ?>"
             width="<?php echo esc_attr($featured_img[1]); ?>"
        />
	</a>
</div>
<?php 
		endif;
	endif;
endif;
?>		
<?php do_action( 'AHEE__content_espresso_venues_template__after_featured_img', $post );?>
<!-- .venue-content -->
