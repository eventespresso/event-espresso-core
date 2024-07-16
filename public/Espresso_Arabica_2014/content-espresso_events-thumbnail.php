<?php

global $post;
do_action( 'AHEE_event_details_before_featured_img', $post );
if ( has_post_thumbnail( $post->ID )) :
	if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
		if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
            $alt_text = get_post_meta($img_ID, '_wp_attachment_image_alt', TRUE);
            $caption  = get_post_field('post_excerpt', $img_ID);
            ?>
<div id="ee-event-img-dv-<?php esc_attr_e($post->ID); ?>" class="ee-event-img-dv">
	<a class="ee-event-img-lnk" href="<?php the_permalink(); ?>"<?php echo EED_Events_Archive::link_target();?>>
		<img alt="<?php esc_attr_e($alt_text); ?>"
             class="ee-event-img"
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
<?php do_action( 'AHEE_event_details_after_featured_img', $post );?>
