<?php
/**
 * Template Name: Event List
 *
 * This is template will display a list of your events 
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
include( 'archive-event_list.template.php' );
// if you are copying this file into your theme folder in order to edit it, 
// then replace the above line of code with something like:
// get_template_part( 'archive', 'event_list.template' );
// but be sure to also copy the archive-event_list.template.php over to your themes folder as well
get_footer(); 	