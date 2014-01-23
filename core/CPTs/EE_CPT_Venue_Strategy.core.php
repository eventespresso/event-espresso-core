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
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct( $CPT) {
		$this->CPT = $CPT;
//		printr( $CPT, '$CPT  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		add_filter( 'pre_get_posts', array( $this, 'pre_get_posts' ), 999 );
		add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
	}
	





	/**
	 * 	pre_get_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function pre_get_posts(  $WP_Query  ) {
//		if ( ! $WP_Query->is_main_query() && ! $WP_Query->is_archive() ) {
//			return;
//		}
		return $WP_Query;
	}




	/**
	 * 	the_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_posts( $posts, WP_Query $wp_query) {
		// automagically load the EEH_Venue_View helper so that it's functions are available
		EE_Registry::instance()->load_helper('Venue_View');
		if ( isset( EE_Registry::instance()->CFG->map_settings->use_google_maps ) && EE_Registry::instance()->CFG->map_settings->use_google_maps ) {
			EE_Registry::instance()->load_helper( 'Maps' );
			EEH_Maps::espresso_google_map_js();
		}
		return $posts;
	}






}






// End of file EE_CPT_Venue_Strategy.core.php
// Location: /core/CPTs/EE_CPT_Venue_Strategy.core.php