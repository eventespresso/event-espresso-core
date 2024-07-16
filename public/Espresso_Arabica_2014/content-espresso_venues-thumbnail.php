<?php //echo '<h1>' . __FILE__ . '</h1>';
/** @var string $wrap_class */

global $post;

do_action( 'AHEE__content_espresso_venues_template__before_featured_img', $post );

if ( has_post_thumbnail( $post->ID )) :
	if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
		if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
            $alt_text = get_post_meta($img_ID, '_wp_attachment_image_alt', TRUE);
            $caption  = get_post_field('post_excerpt', $img_ID);
			$wrap_class .= ' has-img';
			?>
<div id="ee-venue-img-dv-<?php esc_attr_e($post->ID); ?>" class="ee-venue-img-dv">
	<a class="" href="<?php the_permalink(); ?>">
		<img alt="<?php esc_attr_e($alt_text); ?>"
             class="ee-venue-img"
             height="<?php esc_attr_e($featured_img[2]); ?>"
             src="<?php echo esc_url_raw($featured_img[0]); ?>"
             width="<?php esc_attr_e($featured_img[1]); ?>"
        />
	</a>
    <?php if (! empty($caption)) : ?>
        <figcaption><?php esc_attr_e($caption); ?></figcaption>
    <?php endif; ?>
</div>
<?php
		endif;
	endif;
endif;
?>
<?php do_action( 'AHEE__content_espresso_venues_template__after_featured_img', $post );?>
<!-- .venue-content -->
