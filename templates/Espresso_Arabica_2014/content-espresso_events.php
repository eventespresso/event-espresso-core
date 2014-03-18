<?php
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

	<div id="espresso-event-header-dv" class="">
		<?php do_action( 'AHEE_event_details_before_featured_img', $post ); ?>		
		<?php				
		if ( has_post_thumbnail( $post->ID )) :
			if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
				if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
					$caption = esc_attr( get_post( get_post( $img_ID ))->post_excerpt );
					$event_class .= ' has-img';
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
		
		<header class="event-header<?php echo $event_class;?>">
			<h1 id="event-details-h1" class="entry-title">
				<a class="" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h1>
			<p id="event-date-p">
				<?php 
				if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
					echo $post->EE_Event->primary_datetime()->start_date_and_time(); 
				}				
				?>
			</p>
		</header>
	</div>
	
	<div class="espresso-event-wrapper-dv">
	
		<?php espresso_get_template_part( 'content', 'espresso_events-details' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-tickets' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-datetimes' ); ?>
		<?php espresso_get_template_part( 'content', 'espresso_events-venues' ); ?>

		<footer class="event-meta">
			<?php do_action( 'AHEE_event_details_footer_top', $post ); ?>
			<?php do_action( 'AHEE_event_details_footer_bottom', $post ); ?>
		</footer>
		
	</div>
	
</article>
<!-- #post -->
<?php do_action( 'AHEE_event_details_after_post', $post );

