<?php
/**
 * Template Name: Maintenance Mode
 *
 * This template is displayed when Event Espresso is in Maintenance Mode
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
<div class="maxwidth max-width row" style="padding:2em; ">
	<div id="ee-maintenance-mode-wrap-dv" class="site-content left">
		<div id="ee-maintenance-mode-dv" class="" role="main">
			<article id="ee-maintenance-mode">
				<header class="event-header">
					<h1  id="ee-maintenance-mode-h1"><?php _e( 'Maintenance Mode', 'event_espresso' ); ?></h1>
				</header>
				<div class="ee-maintenance-mode-dv">
					<p><?php _e( 'Event Registration has been temporarily closed while system maintenance is being performed. We\'re sorry for any inconveniences this may have caused. Please try back again later.	', 'event_espresso' ); ?></p>
				</div>
			</article>
		</div>
	</div>

	<?php get_sidebar(); ?>
</div>
<?php get_footer(); ?>