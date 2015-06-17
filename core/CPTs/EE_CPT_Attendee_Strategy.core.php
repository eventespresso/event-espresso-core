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
 * EE_CPT_Attendee_Strategy
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_CPT_Attendee_Strategy {

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
	 * @return \EE_CPT_Attendee_Strategy
	 */
	public function __construct( $arguments = array() ) {
		$this->CPT = isset( $arguments['CPT'] ) ? $arguments['CPT'] : NULL;
		$WP_Query = isset( $arguments['WP_Query'] ) ? $arguments['WP_Query'] : NULL;
//		add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
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
		//$EVT = EE_Registry::instance()->load_model( 'Event' );
//		EEH_Debug_Tools::printr( $EVT, '$EVT  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		$EVT_IDs = array();
//		foreach( $WP_Query->posts as $WP_Post ) {
//			$EVT_IDs[] = $WP_Post->ID;
//		}
//		$events = $EVT->get_all( array( 0 =>array( 'EVT_ID' => array( 'IN', $EVT_IDs ), 'DTT_is_primary' => 1 ), 'force_join' =>array( 'Datetime' )));
//		EEH_Debug_Tools::printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		EEH_Debug_Tools::printr( $EVT_IDs, '$EVT_IDs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		EEH_Debug_Tools::printr( $events, '$events  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $posts;
	}






}






// End of file EE_CPT_Venue_Strategy.core.php
// Location: /core/CPTs/EE_CPT_Venue_Strategy.core.php