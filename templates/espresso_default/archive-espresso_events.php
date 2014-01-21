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
?>
<div id="primary" class="content-area">
	<div id="content" class="site-content" role="main">
<?php include( espresso_event_list_template_part() ); ?>
	</div>
	<!-- #content -->
</div>
<!-- #primary -->

<?php
/*
*** IMPORTANT ***
 if you are copying this file into your theme folder in order to edit it, 
 you can replace the above line of code with something like:
 get_template_part( 'archive', 'archive-espresso_events-grid-view' );
 *** be sure to also copy ALL of the following event-list template parts over to your themes folder as well :
 * archive-espresso_events-dates-view.php
 * archive-espresso_events-filters.php
 * archive-espresso_events-grid-view.php
 * archive-espresso_events-text-view.php
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
							printf( __( 'Today\'s Events: %s', 'twentyfourteen' ), get_the_date() );

						elseif ( is_month() ) :
							printf( __( 'Events This Month: %s', 'twentyfourteen' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'twentyfourteen' ) ) );

						elseif ( is_year() ) :
							printf( __( 'Events This Year: %s', 'twentyfourteen' ), get_the_date( _x( 'Y', 'yearly archives date format', 'twentyfourteen' ) ) );

						else :
							_e( 'Upcoming Events', 'twentyfourteen' );

						endif;
					?>
				</h1>
			</header><!-- .page-header -->
			
			<?php do_action( 'AHEE__archive_event_list_template__before_event_list' ); ?>
			
			<?php espresso_event_list_pagination(); ?>

			<?php
					// Start the Loop.
					while ( have_posts() ) : the_post();

					/*
					 * Include the post TYPE-specific template for the content.
					 */
					get_template_part( 'content', 'espresso_events' );

					endwhile;

			?>

			<?php espresso_event_list_pagination(); ?>

			<?php
			
					do_action( 'AHEE__archive_event_list_template__before_event_list' );

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
