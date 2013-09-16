<?php
/**
 * Template Name: Event Details
 *
 * This is template will display a list of your events 
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		4+
 */
get_header();
?>
<div class="maxwidth max-width row">
	<div id="espresso-event-details-wrap-dv" class="site-content">
		<div id="espresso-event-details-dv" class="" role="main">
				
		<?php if ( have_posts() ) { ?>
			<?php while ( have_posts() ) { the_post();?>
			
			<?php do_action( 'AHEE_event_details_before_post', $post ); ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class('espresso-event-details'); ?>>
				
				<header class="event-header">
					<?php do_action( 'AHEE_event_details_header_top', $post ); ?>
					<p><?php the_terms( $post->ID, 'espresso_event_categories' ); ?></p>
					<h1  id="event-details-h1"><?php the_title(); ?></h1>
					<?php do_action( 'AHEE_event_details_header_bottom', $post ); ?>
				</header>

				<div class="event-datetimes">
					<?php do_action( 'AHEE_event_details_before_event_date', $post ); ?>
					<h4><?php espresso_event_date(); ?></h4>
					<?php do_action( 'AHEE_event_details_after_event_date', $post ); ?>
				</div>				
				<!-- .event-datetimes -->
				
			<?php
			//echo '<h3>$post</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $post, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';		
				$wrap_class = '';
				if ( has_post_thumbnail( $post->ID )) {
					if ( $img_ID = get_post_thumbnail_id( $post->ID )) {
						if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) {
							$caption = esc_attr( get_post( get_post_thumbnail_id( $post->ID ))->post_excerpt );
							$wrap_class = ' has-img';
				?>
				<div id="ee-event-img-dv-<?php echo $post->ID; ?>" class="ee-event-img-dv">
					<img class="ee-event-img" src="<?php echo $featured_img[0]; ?>" width="<?php echo $featured_img[1]; ?>" height="<?php echo $featured_img[2]; ?>" alt="<?php echo $caption; ?>"/>
				</div>
				<?php 
						}			
					}			
				}				
			?>
			<div class="espresso-event-wrapper-dv<?php echo $wrap_class;?>">
				<!-- .event-header -->
				<div class="event-content">
					<?php do_action( 'AHEE_event_details_before_the_content', $post ); ?>
					<?php the_content(); ?> 
					<?php do_action( 'AHEE_event_details_after_the_content', $post ); ?>
					<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'event_espresso' ), 'after' => '</div>' ) ); ?>
				</div>				
				<!-- .event-content -->
				<footer class="event-meta">
					<?php do_action( 'AHEE_event_details_footer_top', $post ); ?>
					<?php edit_post_link( __( 'edit this event', 'event_espresso' ), '<p class="edit-event-lnk small-txt clear">', '</p>' ); ?>
					<?php do_action( 'AHEE_event_details_footer_bottom', $post ); ?>
				</footer>
				<!-- .entry-meta -->
			</div>

			</article><!-- #post -->
			<?php do_action( 'AHEE_event_details_after_post', $post ); ?>

			<?php } ?>

			<?php //event_espresso_content_nav( 'nav-below' ); ?>

		<?php } else { ?>

			<article id="post-0" class="post no-results not-found">

				<header class="event-header">
					<h1 class="event-title"><?php _e( 'There are no upcoming Events', 'event_espresso' ); ?></h1>
				</header>

				<div class="event-content">
					<p><?php _e( 'Perhaps searching will help find a related event.', 'event_espresso' ); ?></p>
					<?php get_search_form(); ?>
				</div><!-- .event-content -->

			</article><!-- #post-0 -->

		<?php } // end have_posts() check ?>
		
		</div><!-- #content -->

		<?php 
//		printr( $wp_query, '$wp_query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		 ?>

			
	</div><!-- #primary -->

	<?php get_sidebar(); ?>
</div>
<?php get_footer(); ?>