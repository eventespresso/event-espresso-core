<?php
/**
 * Espresso Template functions
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license		http://venueespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */
define( 'EE_THEME_FUNCTIONS_LOADED', TRUE );
 
/**
 * 	espresso_pagination
 *
 *  @access 	public
 *  @return 	void
 */
function espresso_pagination() {
	global $wp_query;
	$big = 999999999; // need an unlikely integer
	$pagination = paginate_links( array(
		'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
		'format' => '?paged=%#%',
		'current' => max( 1, get_query_var('paged') ),
		'total' => $wp_query->max_num_pages,
		'show_all'     => TRUE,
		'end_size'     => 10,
		'mid_size'     => 6,
		'prev_next'    => TRUE,
		'prev_text'    => __( '&lsaquo; PREV', 'event_espresso' ),
		'next_text'    => __( 'NEXT &rsaquo;', 'event_espresso' ),
		'type'         => 'plain',
		'add_args'     => FALSE,
		'add_fragment' => ''
	));
	echo ! empty( $pagination ) ? '<div class="ee-pagination-dv clear">' . $pagination . '</div>' : '';
}