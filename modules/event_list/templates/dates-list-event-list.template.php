<?php
/**
 * This is template will display a list of your events 
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		4+
 */

do_action( 'AHEE_before_event_list' );

?>

<div id="dates-list-event-list-dv" class="max-width maxwidth row">
	<div id="espresso-events-list-wrap-dv" class="container">
	
		<h1  id="event-list-h1"><?php _e( 'Upcoming Event Dates', 'event_espresso' ); ?></h1>
		
		<?php do_action( 'AHEE__archive_event_list_template__after_header' ); ?>
		
		<div id="espresso-events-list-dv" class="column columns" role="main">
				
		<?php if ( have_posts() ) { ?>
			<?php while ( have_posts() ) { the_post(); ?>
			<?php global $post; ?>
			
			<article id="post-<?php echo $post->ID; ?>" <?php post_class( espresso_event_list_css() ); ?>>
			
				<div id="events-list-event-wrap-<?php echo $post->ID; ?>" class="events-list-event-wrap-dv">
				
				<div class="event-datetimes">
					<?php $datetime = espresso_event_date_obj();?>
					<div class="event-date-calendar-page-dv">
						<div class="event-date-calendar-page-month-dv"><?php echo $datetime->start_date('M');?></div>
						<div class="event-date-calendar-page-day-dv"><?php echo $datetime->start_date('d');?></div>
					</div>		
				</div>		
				<!-- .event-datetimes -->

			<?php
				$wrap_class = '';
				if ( has_post_thumbnail( $post->ID )) {
					$wrap_class = ' has-img';
				?>
					<div id="ee-event-img-dv-<?php echo $post->ID; ?>" class="ee-event-img-dv">
						<?php the_post_thumbnail( array( 60, 60 ));?>
					</div>
				<?php 
				}				
			?>

					<footer class="event-meta">
						
						<a class="ee-register-button-lnk ee-button-lnk button" href="<?php the_permalink( $post->ID ); ?>" title=""><?php _e( 'Register Now', 'event_espresso' ); ?></a>
						<p class="event-categories-pg"><?php _e( 'category: ', 'event_espresso' ) . the_terms( $post->ID, 'espresso_event_categories' ); ?></p>
						
						<?php espresso_edit_event_link(); ?>
					</footer>
					<!-- .entry-meta -->

					<div class="espresso-event-wrapper-dv<?php echo $wrap_class;?>">
						<header class="event-header">
							<h3 class="event-title">
								<a href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'event_espresso' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
									<?php the_title(); ?>							
								</a>
							</h3>
						</header>
						<!-- .event-header -->
						
						<div class="event-content">
							<?php 
								if( espresso_display_full_description_in_event_list() ) {
									the_content(); 
								} else {
									the_excerpt(); 
								}
							?> 
							<?php do_action( 'AHEE_events_list_footer', $post ); ?>
						</div>				
						<!-- .event-content -->

					</div>

				<div class="clear"></div>
				</div>
			</article>
			<!-- #post -->

			<?php } ?>

		<?php } else { ?>

			<article id="post-0" class="no-espresso-events-found">

				<header class="event-header">
					<h1 class="event-title"><?php _e( 'There are no upcoming Events', 'event_espresso' ); ?></h1>
				</header>

				<div class="event-content">
					<p><?php _e( 'Perhaps searching will help find a related event.', 'event_espresso' ); ?></p><br/>
					<?php get_search_form(); ?>
				</div>
				<!-- .event-content -->

			</article>
			<!-- #post-0 -->

		<?php } // end have_posts() check ?>
		
			<div class="clear"></div>
		</div>
		<!-- #espresso-events-list-dv -->

		<?php 
//		printr( $wp_query, '$wp_query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		 ?>

		<div class="ee-pagination-dv"><?php  //echo paginate_links( $pagination_args ); ?></div>
			
		<div class="clear"></div>
	</div>
	<!-- #espresso-events-list-wrap-dv -->

</div>
