<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_CPT_Venue_Strategy
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_CPT_Venue_Strategy {

	/**
	 * $CPT - the current page, if it utilizes CPTs
	 *	@var 	array
	 * 	@access 	protected
	 */
	protected $CPT = NULL;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param 	array 	$arguments
	 * @return \EE_CPT_Venue_Strategy
	 */
	public function __construct( $arguments = array() ) {
		$this->CPT = isset( $arguments['CPT'] ) ? $arguments['CPT'] : NULL;
		$WP_Query = isset( $arguments['WP_Query'] ) ? $arguments['WP_Query'] : NULL;
		if ( $WP_Query instanceof WP_Query && ! $WP_Query->is_tag ) {
			$WP_Query->is_espresso_venue_single = is_singular() && isset( $WP_Query->query->post_type ) && $WP_Query->query->post_type == 'espresso_venues' ? TRUE : FALSE;
			$WP_Query->is_espresso_venue_archive = is_post_type_archive('espresso_venues') ? TRUE : FALSE;
			$WP_Query->is_espresso_venue_taxonomy = is_tax( 'espresso_venue_categories' ) ? TRUE : FALSE;
		}
		add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
	}



	/**
	 *    the_posts
	 *
	 * @access    public
	 * @param          $posts
	 * @param WP_Query $wp_query
	 * @return    void
	 */
	public function the_posts( $posts, WP_Query $wp_query) {
		// automagically load the EEH_Venue_View helper so that it's functions are available
		if ( isset( EE_Registry::instance()->CFG->map_settings->use_google_maps ) && EE_Registry::instance()->CFG->map_settings->use_google_maps ) {
			EEH_Maps::espresso_google_map_js();
		}
		remove_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
		return $posts;
	}






}






// End of file EE_CPT_Venue_Strategy.core.php
// Location: /core/CPTs/EE_CPT_Venue_Strategy.core.php