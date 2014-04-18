<?php //echo '<h1>' . __FILE__ . '</h1>'; ?>
<?php global $post; ?>
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
<!-- .venue-content -->
