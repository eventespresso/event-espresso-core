<?php
/**
 * This is template will display a single event - copy it to your theme folder
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */

global $post;
$wrap_class = has_excerpt( $post->ID ) ? ' has-excerpt' : '';
?>
<?php do_action( 'AHEE_event_details_before_post', $post ); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'espresso-event-details entry-content ' . $wrap_class ); ?>>

	<div id="espresso-event-header-dv" class="">
		<?php do_action( 'AHEE_event_details_before_featured_img', $post ); ?>		
		<?php				
		if ( has_post_thumbnail( $post->ID )) :
			if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
				if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
					$caption = esc_attr( get_post( get_post( $img_ID ))->post_excerpt );
					$wrap_class .= ' has-img';
					?>
		<div id="ee-event-img-dv-<?php echo $post->ID; ?>" class="ee-event-img-dv">
			<a class="" href="<?php the_permalink(); ?>">
				<img class="ee-event-img" src="<?php echo $featured_img[0]; ?>" width="<?php echo $featured_img[1]; ?>" height="<?php echo $featured_img[2]; ?>" alt="<?php echo $caption; ?>"/>
			</a>
		</div>
		<?php 
				endif;
			endif;
		endif;
		?>		
		<?php do_action( 'AHEE_event_details_after_featured_img', $post );?>
		
		<header class="event-header<?php echo $wrap_class;?>">
			<h1 id="event-details-h1" class="entry-title">
				<a class="" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h1>
			<?php if (has_excerpt( $post->ID )): the_excerpt(); endif;?>
			<p id="event-date-p">
				<?php echo $post->EE_Event->primary_datetime()->start_date_and_time(); ?>
			</p>
		</header>
	</div>
	
	<div class="espresso-event-wrapper-dv">
	
		<?php get_template_part( 'content', 'espresso_events-details' ); ?>
		<?php get_template_part( 'content', 'espresso_events-tickets' ); ?>
		<?php get_template_part( 'content', 'espresso_events-datetimes' ); ?>
		<?php get_template_part( 'content', 'espresso_events-venues' ); ?>

		<footer class="event-meta">
			<?php do_action( 'AHEE_event_details_footer_top', $post ); ?>
			<?php do_action( 'AHEE_event_details_footer_bottom', $post ); ?>
		</footer>
		
	</div>
	
</article>
<!-- #post -->
<?php do_action( 'AHEE_event_details_after_post', $post );

