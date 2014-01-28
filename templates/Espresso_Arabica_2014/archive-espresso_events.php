<?php
/**
 * Template Name: Event List
 *
 * This template will display a list of your events 
 *
 * @ package		Event Espresso - Event Registration and Management Plugin for WordPress
 * @ link			http://www.eventespresso.com
 * @ version		EE4+
 */
get_header(); 
?>

	<section id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
			<?php get_template_part( 'loop', 'espresso_events' ); ?>			
		</div><!-- #content -->
	</section><!-- #primary -->

<?php
get_sidebar( 'content' );
get_sidebar();
get_footer();
