<?php
/**
 * This is template will display a list of your events 
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */

do_action( 'AHEE_before_event_list' );
$ELID = espresso_get_event_list_ID();
?>

<div id="text-event-list-dv-<?php echo $ELID; ?>" class="text-event-list-dv">
	<div id="espresso-events-list-wrap-dv-<?php echo $ELID; ?>" class="espresso-events-list-wrap-dv">
	
		<h1  id="event-list-h1-<?php echo $ELID; ?>" class="event-list-h1"><?php echo espresso_event_list_title(); ?></h1>
				
		<?php do_action( 'AHEE__archive_event_list_template__after_header' ); ?>
		
		<div id="espresso-events-list-dv-<?php echo $ELID; ?>" class="espresso-events-list-dv" role="main">
				
		<?php if ( have_posts() ) : ?>
			<div class="ee-pagination-dv clear"><?php espresso_event_list_pagination(); ?></div>
			<?php while ( have_posts() ) : the_post(); ?>
			<?php global $post; ?>
			
			<article id="post-<?php echo $ELID; ?>-<?php echo $post->ID; ?>" <?php post_class( espresso_event_list_css( 'clear' )); ?>>
			
				<div id="events-list-event-wrap-<?php echo $ELID; ?>-<?php echo $post->ID; ?>" class="events-list-event-wrap-dv">					

					<div class="espresso-event-wrapper-dv">
					
						<header class="event-header">							
							<h3 class="event-title">
								<a href="<?php espresso_event_link_url(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'event_espresso' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
									<?php the_title(); ?>							
								</a>
							</h3>
							<?php echo espresso_event_status_banner( $post->ID ); ?>
						</header>
						<!-- .event-header -->

						<?php
							$wrap_class = 'no-img';
							if ( has_post_thumbnail( $post->ID )) :
								$wrap_class = 'has-img';
						?>
						<div id="ee-event-img-dv-<?php echo $ELID; ?>-<?php echo $post->ID; ?>" class="ee-event-img-dv">
							<?php the_post_thumbnail( 'medium' );?>
						</div>
						<?php endif; ?>
						
						<div class="event-details-dv <?php echo $wrap_class . ' ' . espresso_event_status( $post->ID );?>">						

							<div class="event-datetimes">
								<h4><span class="dashicons dashicons-calendar"></span><?php espresso_event_date_range( 'F jS', ' ', 'l F jS @ ', ' g:i a' ); ?></h4>
							</div>
							<!-- .event-datetimes -->
						
						<?php 
							if( espresso_display_full_description_in_event_list() ) :
								the_content(); 
							else :
								the_excerpt(); 
							endif;
						?>
						</div>				
						<!-- .event-content -->
						
						<?php if ( espresso_display_venue_details_in_event_list() || espresso_display_venue_address_in_event_list() ) : ?>
						<div class="espresso-venue-dv">
							<p>
								<strong><span class="ee-icon ee-icon-venue"></span><?php _e( 'Venue:', 'event_espresso' ); ?></strong><br/>
								<strong><?php espresso_venue_name(); ?></strong>
							</p>
							<?php if ( espresso_display_venue_address_in_event_list() ) : ?>
								<span class="dashicons dashicons-location-alt"></span><strong><?php _e( 'Address:', 'event_espresso' ); ?></strong>
								<?php espresso_venue_address( 'inline' ); ?>
								<?php espresso_venue_gmap( $ELID . '-' . $post->ID ); ?>
								<div class="clear"><br/></div>
							<?php endif; ?>
							<?php if ( espresso_display_venue_details_in_event_list() ) : ?>
							<p>
								<span class="tags-links"><?php echo espresso_venue_categories(); ?></span>
							</p>
							<p>
								<strong><?php _e( 'Description:', 'event_espresso' ); ?></strong><br/>
								<?php echo espresso_venue_excerpt(); ?>								
							</p>
							<p>
								<strong><?php _e( 'Phone:', 'event_espresso' ); ?></strong>
								<?php echo espresso_venue_phone(); ?>
							</p>
							<?php endif; ?>
						</div>				
						<!-- .espresso-venue-dv -->
						<?php endif; ?>


					</div>

					<footer class="event-meta">
						<?php do_action( 'AHEE_events_list_footer', $post ); ?>
						<?php espresso_event_reg_button( __( 'Register Now', 'event_espresso' ), __( 'Read More', 'event_espresso' ), $post->ID ); ?>
							<p>
								<span class="tags-links"><?php espresso_event_categories( $post->ID ); ?></span>
								<span class="edit-link"><?php espresso_edit_event_link( $post->ID ); ?></span>
							</p>
					</footer>
					<!-- .entry-meta -->

					<div class="clear"></div>
				</div>
			</article>
			<!-- #post -->

			<?php endwhile; ?>

		<?php else : ?>

			<article id="post-0" class="no-espresso-events-found">

				<header class="event-header">
					<h1 class="event-title"><?php _e( 'No upcoming events at this time...', 'event_espresso' ); ?></h1>
				</header>

				<div class="event-content">
					<p><?php _e( 'Perhaps searching will help find a related event.', 'event_espresso' ); ?></p><br/>
					<?php get_search_form(); ?>
				</div>
				<!-- .event-content -->

			</article>
			<!-- #post-0 -->

		<?php endif; // end have_posts() check ?>
		
			<div class="clear"></div>
		</div>
		<!-- #espresso-events-list-dv -->

		<div class="ee-pagination-dv clear"><?php espresso_event_list_pagination(); ?></div>
			
		<div class="clear"></div>
	</div>
	<!-- #espresso-events-list-wrap-dv -->

</div>

<?php do_action( 'AHEE_after_event_list' ); ?>