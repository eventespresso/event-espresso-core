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

get_footer(); 	