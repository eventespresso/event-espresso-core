<?php
/**
 * Template Name: Event List
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
<div class="max-width maxwidth row">
	<div id="espresso-events-list-wrap-dv" class="container">
	
		<h1  id="event-list-h1"><?php _e( 'Upcoming Events', 'event_espresso' ); ?></h1>

		<div id="espresso-events-list-dv" class="column columns" role="main">  <!--hidden-->
				
		<?php if ( have_posts() ) { ?>
			<?php while ( have_posts() ) { the_post();?>
			
			<article id="post-<?php echo $post->ID; ?>" <?php post_class(); ?>>
			
				<div class="event-datetimes">
					<h4><?php the_event_date(); ?></h4>
				</div>				
				<!-- .event-datetimes -->

				<div id="events-list-event-wrap-<?php echo $post->ID; ?>" class="events-list-event-wrap-dv">

			<?php
			//echo '<h3>$post</h3><pre style="height:auto;border:2px solid lightblue;">' . print_r( $post, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';		
				$wrap_class = '';
				if ( has_post_thumbnail( $post->ID )) {
					if ( $img_ID = get_post_thumbnail_id( $post->ID )) {
						if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'medium' )) {
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
						<header class="event-header">
							<p><?php the_terms( $post->ID, 'espresso_event_categories' );// the_terms( $post->ID, 'category' );  ?></p>
							<h1 class="event-title">
								<a href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'event_espresso' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
									<?php the_title(); ?>							
								</a>
							</h1>
						</header>
						<!-- .event-header -->
						<div class="event-content">
							<?php the_excerpt(); ?> 
							<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'event_espresso' ), 'after' => '</div>' ) ); ?>
						</div>				
						<!-- .event-content -->
						<footer class="event-meta clear">
							<a class="ee-register-button-lnk button" href="<?php the_permalink( $post->ID ); ?>" title=""><?php _e( 'Register Now', 'event_espresso' ); ?></a>
							<?php edit_post_link( __( 'edit this event', 'event_espresso' ), '<p class="edit-event-lnk small-txt clear">', '</p>' ); ?>
						</footer>
						<!-- .entry-meta -->

					</div>
			
				</div>
			</article><!-- #post -->

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
		
			<div class="clear"></div>
		</div><!-- #content -->

		<?php 
//		printr( $wp_query, '$wp_query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		 ?>

		<div class="ee-pagination-dv"><?php  //echo paginate_links( $pagination_args ); ?></div>
			
		<div class="clear"></div>
	</div><!-- #primary -->

</div>
<?php get_footer(); ?>