<?php
/**
 * Template Name: Event Details
 *
 * This is template will display a list of your venues 
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
EE_Registry::instance()->load_helper( 'Venue_View' );
EE_Registry::instance()->load_helper( 'Maps' );
EEH_Maps::espresso_google_map_js();
?>

<div id="primary" class="content-area">
	<div id="content" class="site-content" role="main">
		<div id="espresso-venue-details-wrap-dv">
			<div id="espresso-venue-details-dv" class="" role="main">
				<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post();?>
				<?php 
				global $post;
				$wrap_class = has_excerpt( $post->ID ) ? ' has-excerpt' : '';
				?>
				<?php do_action( 'AHEE_venue_details_before_post', $post ); ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class('espresso-venue-details'); ?>>
					<div id="espresso-venue-header-dv" class="">
						<?php do_action( 'AHEE_venue_details_before_featured_img', $post ); ?>
						<?php				
						if ( has_post_thumbnail( $post->ID )) :
							if ( $img_ID = get_post_thumbnail_id( $post->ID )) :
								if ( $featured_img = wp_get_attachment_image_src( $img_ID, 'large' )) :
									$caption = esc_attr( get_post( get_post( $img_ID ))->post_excerpt );
									$wrap_class .= ' has-img';
									?>
									<div id="ee-venue-img-dv-<?php echo $post->ID; ?>" class="ee-venue-img-dv"> <img class="ee-venue-img" src="<?php echo $featured_img[0]; ?>" width="<?php echo $featured_img[1]; ?>" height="<?php echo $featured_img[2]; ?>" alt="<?php echo $caption; ?>"/> </div>
									<?php 
								endif;
							endif;
						endif;
						?>
						<?php do_action( 'AHEE_venue_details_after_featured_img', $post );?>
						<header class="venue-header<?php echo $wrap_class;?>">
							<?php do_action( 'AHEE_venue_details_header_top', $post ); ?>
							<h1 id="venue-details-h1">
								<?php the_title(); ?>
							</h1>
							<?php if (has_excerpt( $post->ID )): the_excerpt(); endif;?>
							<?php do_action( 'AHEE_venue_details_header_bottom', $post ); ?>
						</header>
					</div>
					
					<?php /*?><div class="venue-datetimes">
						<?php do_action( 'AHEE_venue_details_before_venue_date', $post ); ?>
						<h4><?php espresso_venue_date(); ?></h4>
						<?php do_action( 'AHEE_venue_details_after_venue_date', $post ); ?>
					</div>				
					<!-- .venue-datetimes --><?php */?>
					<div class="espresso-venue-wrapper-dv<?php echo $wrap_class;?>"> 
						<!-- .venue-header -->
						<div class="venue-content">
							<h3 class="about-venue-h3 ee-venue-h3">
								<span class="ee-icon ee-icon-venue"></span><?php _e( 'Details', 'event_espresso' ); ?>
							</h3>
							<?php do_action( 'AHEE_venue_details_before_the_content', $post ); ?>
							<?php the_content(); ?>
							<?php do_action( 'AHEE_venue_details_after_the_content', $post ); ?>
							
							<p class="espresso-venue-category">
								<?php the_terms( $post->ID, 'espresso_venue_categories', 'Categories: ', ' / ' ); ?>
							</p>
							
							<h3 class="venue-address-h3 ee-venue-h3">
								<span class="dashicons dashicons-location-alt"></span><?php _e( 'Location', 'event_espresso' ); ?>
							</h3>
							<p><strong>
								<?php _e( 'Phone:', 'event_espresso' ); ?>
								</strong> <?php echo espresso_venue_phone(); ?></p>
							<strong>
							<?php _e( 'Address:', 'event_espresso' ); ?>
							</strong> <?php espresso_venue_address( 'inline' ); ?>
							<div class="clear"><br/>
							</div>
							
							
							<?php espresso_venue_gmap( $post->ID ); ?>
							<div class="clear"><br/>
							</div>
							
							<?php wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'venue_espresso' ), 'after' => '</div>' ) ); ?>
						</div>
						<!-- .venue-content -->
						<footer class="venue-meta">
							<?php do_action( 'AHEE_venue_details_footer_top', $post ); ?>
							<?php echo espresso_edit_venue_link(); //EEH_Venue_View::edit_venue_link( $post->ID ); ?>
							<?php do_action( 'AHEE_venue_details_footer_bottom', $post ); ?>
						</footer>
						<!-- .entry-meta --> 
					</div>
				</article>
				<!-- #post -->
				<?php do_action( 'AHEE_venue_details_after_post', $post ); ?>
				<?php endwhile; ?>
				<?php //venue_espresso_content_nav( 'nav-below' ); ?>
				<?php else : ?>
				<article id="post-0" class="post no-results not-found">
					<header class="venue-header">
						<h1 class="venue-title">
							<?php _e( 'No Venues were found to display', 'venue_espresso' ); ?>
						</h1>
						<br/>
					</header>
					<div class="venue-content">
						<p>
							<?php _e( 'Perhaps searching will help find a related venue.', 'venue_espresso' ); ?>
						</p>
						<br/>
						<?php get_search_form(); ?>
					</div>
					<!-- .venue-content --> 
					
				</article>
				<!-- #post-0 -->
				
				<?php endif; // end have_posts() check ?>
			</div>
			<!-- #content -->
			
			<?php 
	//		printr( $wp_query, '$wp_query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			 ?>
		</div>
	</div>
</div>
<!-- #primary -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>
