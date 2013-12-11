<?php
/**
 * Template Name: Event List
 *
 * This is template will display a list of your events 
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */
get_header();
do_action( 'AHEE_before_venue_list' );
EE_Registry::instance()->load_helper( 'Venue_View' );
EE_Registry::instance()->load_helper( 'Maps' );
EEH_Maps::espresso_google_map_js();
?>
<div id="primary" class="content-area">
	<div id="content" class="site-content" role="main">
		<div id="espresso-venue-list-dv" class="espresso-venue-list-dv ">
			<div id="espresso-venue-list-wrap-dv" class="espresso-venue-list-wrap-dv">
			
				<h1  id="venue-list-h1" class="venue-list-h1"><?php echo __( 'Venues', 'event_espresso' ); ?></h1>
						
				<?php do_action( 'AHEE__archive_venue_list_template__after_header' ); ?>
				
				<div id="espresso-venue-list-dv" class="espresso-venue-list-dv column columns" role="main">
						
				<?php if ( have_posts() ) : ?>
				
					<div class="ee-pagination-dv clear"><?php //espresso_venue_list_pagination(); ?></div>
					
					<?php while ( have_posts() ) : the_post(); ?>
					<?php global $post; ?>
					
					<article id="post-<?php echo $post->ID; ?>" <?php post_class( 'espresso-venue-list-venue entry-content clear' ); ?>>
					
						<div id="venue-list-venue-wrap-<?php echo $post->ID; ?>" class="venue-list-venue-wrap-dv">					

							<div class="espresso-venue-wrapper-dv">
							
								<h3 class="venue-title">
									<?php espresso_venue_name(); ?>							
								</h3>
									
								<header class="venue-header">												
									<?php echo espresso_venue_categories( $post->ID ); ?>					
									<p><strong><?php _e( 'Description:', 'event_espresso' ); ?></strong><br/>
									<?php echo espresso_venue_excerpt( $post->ID, FALSE ); ?></p>					
								</header>
								<!-- .venue-header -->

							<?php if ( has_post_thumbnail( $post->ID )) : ?>
								<div id="ee-venue-img-dv-<?php echo $post->ID; ?>" class="ee-venue-img-dv">
									<?php the_post_thumbnail( array( 235, 156 )); ?>
								</div>
							<?php endif; ?>
									
								<div class="venue-content">
													
									<strong><?php espresso_venue_name(); ?></strong><br/><br/>

									<strong><?php _e( 'Address:', 'event_espresso' ); ?></strong><br/>
									<?php espresso_venue_address( 'inline' ); ?><br/>
																
								<?php if ( espresso_venue_phone( FALSE ) ): ?>					
									<strong><?php _e( 'Phone:', 'event_espresso' ); ?></strong>
									<?php espresso_venue_phone( $post->ID ); ?>
								<?php endif;?>

								</div>				
								<!-- .venue-content -->
								
							<?php if ( $venue_gmap = espresso_venue_gmap( $post->ID, array( 'ee_map_width' => 235, 'ee_map_height' => 156 ), $post->ID, FALSE )) : ?>
								<div class="venue-list-gmap">
									<?php echo $venue_gmap;?>	
								</div>
							<?php endif;?>

								<div class="clear"></div>
							</div>

							<footer class="venue-meta">
								<?php do_action( 'AHEE_venue_list_footer', $post ); ?>
								<span class="edit-link"><?php espresso_edit_venue_link(); ?></span>
							</footer>
							<!-- .entry-meta -->

							<div class="clear"></div>
						</div>
					</article>
					<!-- #post -->

					<?php endwhile; ?>

				<?php else : ?>

					<article id="post-0" class="no-espresso-venues-found">

						<header class="venue-header">
							<h1 class="venue-title"><?php _e( 'No venues were found...', 'event_espresso' ); ?></h1>
						</header>

						<div class="venue-content">
							<p><?php _e( 'Perhaps searching will help find a related venue.', 'event_espresso' ); ?></p><br/>
							<?php get_search_form(); ?>
						</div>
						<!-- .venue-content -->

					</article>
					<!-- #post-0 -->

				<?php endif; // end have_posts() check ?>
				
					<div class="clear"></div>
				</div>
				<!-- #espresso-events-list-dv -->

				<div class="ee-pagination-dv clear"><?php //espresso_event_list_pagination(); ?></div>
					
				<div class="clear"></div>
			</div>
			<!-- #espresso-events-list-wrap-dv -->	
		</div>

	</div>
	<!-- #content -->
</div>
<!-- #primary -->

<?php  do_action( 'AHEE_after_venue_list' );  ?>
<?php get_sidebar(); ?>
<?php get_footer();  ?>