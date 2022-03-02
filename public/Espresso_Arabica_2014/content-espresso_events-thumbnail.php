<?php

global $post;
do_action( 'AHEE_event_details_before_featured_img', $post );

if ( has_post_thumbnail( $post->ID )) :
	if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
		if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
			$caption = get_post( get_post( $img_ID ))->post_excerpt;
			?>
<div id="ee-event-img-dv-<?php echo esc_attr($post->ID); ?>" class="ee-event-img-dv">
	<a class="ee-event-img-lnk" href="<?php the_permalink(); ?>"<?php echo EED_Events_Archive::link_target();?>>
		<img alt="<?php echo esc_attr($caption); ?>"
             class="ee-event-img"
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
<?php do_action( 'AHEE_event_details_after_featured_img', $post );?>
