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

if ( ! function_exists( 'espresso_pagination' ) ) {
	/**
	 *    espresso_pagination
	 *
	 * @access    public
	 * @return    void
	 */
	function espresso_pagination() {
		global $wp_query;
		$big = 999999999; // need an unlikely integer
		$pagination = paginate_links(
			array(
				'base'         => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
				'format'       => '?paged=%#%',
				'current'      => max( 1, get_query_var( 'paged' ) ),
				'total'        => $wp_query->max_num_pages,
				'show_all'     => true,
				'end_size'     => 10,
				'mid_size'     => 6,
				'prev_next'    => true,
				'prev_text'    => esc_html__( '&lsaquo; PREV', 'event_espresso' ),
				'next_text'    => esc_html__( 'NEXT &rsaquo;', 'event_espresso' ),
				'type'         => 'plain',
				'add_args'     => false,
				'add_fragment' => ''
			)
		);
		echo ! empty( $pagination ) ? '<div class="ee-pagination-dv ee-clear-float">' . $pagination . '</div>' : '';
	}
}