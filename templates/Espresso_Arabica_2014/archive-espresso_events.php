<?php
/**
 * Template Name: Event List
 *
 * This is template will display a list of your events 
 *
 * @ package		Event Espresso - Event Registration and Management Plugin for WordPress
 * @ link			http://www.eventespresso.com
 * @ version		EE4+
 */
get_header(); 
?>

	<section id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<h1 class="page-title">
					<?php
						if ( is_day() ) :
							printf( __( 'Today\'s Events: %s', 'event_espresso' ), get_the_date() );

						elseif ( is_month() ) :
							printf( __( 'Events This Month: %s', 'event_espresso' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'twentyfourteen' ) ) );

						elseif ( is_year() ) :
							printf( __( 'Events This Year: %s', 'event_espresso' ), get_the_date( _x( 'Y', 'yearly archives date format', 'twentyfourteen' ) ) );

						else :
							echo apply_filters( 'FHEE__archive_espresso_events_template__upcoming_events_h1', __( 'Upcoming Events', 'event_espresso' ));

						endif;
					?>
				</h1>
			</header><!-- .page-header -->
			
			<?php 
					// allow other stuff
					do_action( 'AHEE__archive_espresso_events_template__before_loop' ); 
					// Start the Loop.
					while ( have_posts() ) : the_post();
						// Include the post TYPE-specific template for the content.
						get_template_part( 'content', 'espresso_events' );
					endwhile;
					// Previous/next page navigation.
					twentyfourteen_paging_nav();
					// allow moar other stuff
					do_action( 'AHEE__archive_espresso_events_template__after_loop' );

				else :
					// If no content, include the "No posts found" template.
					get_template_part( 'content', 'none' );
					
				endif;
			?>		
			
		</div><!-- #content -->
	</section><!-- #primary -->

<?php
get_sidebar( 'content' );
get_sidebar();
get_footer();
