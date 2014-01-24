<?php
/**
 * Template Name: Venue List
 *
 * This is template will display a list of your event venues 
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

	<section id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<h1 class="page-title">
					<?php echo __( 'Event Venues', 'event_espresso' ); ?>
				</h1>
			</header><!-- .page-header -->
			
			<?php 
					// allow other stuff
					do_action( 'AHEE__archive_espresso_venues_template__before_loop' ); 
					// Start the Loop.
					while ( have_posts() ) : the_post();
						// Include the post TYPE-specific template for the content.
						get_template_part( 'content', 'espresso_venues' );
					endwhile;
					// Previous/next page navigation.
					twentyfourteen_paging_nav();
					// allow moar other stuff
					do_action( 'AHEE__archive_espresso_venues_template__after_loop' ); 


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