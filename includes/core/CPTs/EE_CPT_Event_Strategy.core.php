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
 * EE_CPT_Event_Strategy
 *
 * @package			Event Espresso
 * @subpackage	/core/CPTs/EE_CPT_Event_Strategy.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_CPT_Event_Strategy {


	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * $CPT - the current page, if it utilizes CPTs
	 *	@var 	object	
	 * 	@access 	protected
	 */
	protected $CPT = NULL;
	


	
	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct( $arguments ) {
		extract( $arguments );
		$this->EE = $EE;
		$this->CPT = $CPT;
		
		if ( $this->EE->REQ->is_espresso_page() == 'events' && $this->EE->REQ->get( 'post_name' ) == 'events' ) {
			$this->EE->REQ->set( 'ee', 'events' );
		} else if ( $this->EE->REQ->is_espresso_page() == 'events' ) {
			$this->EE->REQ->set( 'ee', 'event' );
		}
//		$this->EE->REQ->set( 'ee', $this->EE->REQ->is_espresso_page() );
//		printr( $this->EE->REQ, '<br /><br />$this->EE->REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		add_filter( 'pre_get_posts', array( $this, 'pre_get_posts' ), 999 );
		add_action( 'loop_start', array( $this, 'loop_start' ), 1 );
	}





	/**
	 * 	pre_get_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function pre_get_posts(  $WP_Query  ) {
		//printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( ! $WP_Query->is_main_query() && ! $WP_Query->is_archive() ) {
			return;
		}
//		$WP_Query->set( 'post_type', array( $this->CPT['post_type'] ));
//		$WP_Query->set( 'fields', 'ids' );
		return $WP_Query;
	}





	/**
	 * 	wp
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function loop_start( $WP_Query ) {
		// array for storing Event IDs
		$EVT_IDs = array();
		// loop thru posts
		if ( isset( $WP_Query->posts )) {
			foreach( $WP_Query->posts as $event ) {
				$EVT_IDs[] = $event->ID;
			}
//			printr( $EVT_IDs, '$EVT_IDs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			// load models
//			$EVT = $this->EE->load_model( 'Event' );
//			$DTM = $this->EE->load_model( 'Datetime' );
			$EVD = $this->EE->load_model( 'Event_Datetime' );
			// grab datetimes for events
			$event_datetimes = $EVD->get_all( array( array( 'EVT_ID' => array( 'IN', $EVT_IDs )), 'force_join' => array( 'Datetime' )));
//			printr( $event_datetimes, '$event_datetimes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			$event_datetimes = is_array( $event_datetimes ) ? $event_datetimes : array();
			// grab prices
//			$prices = $DTM->get_all( array( array( 'Event_Price.EVT_ID' => array( 'IN', $EVT_IDs ))));
			$prices = isset( $prices ) && is_array( $prices ) ? $prices : array();
			// now loop thru posts
			foreach( $WP_Query->posts as $EVT_ID => $event ) {
				$WP_Query->posts[ $EVT_ID ]->datetimes = array();
				$WP_Query->posts[ $EVT_ID ]->prices = array();
				foreach ( $event_datetimes as $event_datetime ) {
					if ( $event->ID == $event_datetime->get( 'EVT_ID' )) {
						$WP_Query->posts[ $EVT_ID ]->datetimes[] = $event_datetime->get_first_related( 'Datetime' );
					}
				}
				foreach ( $prices as $price ) {
					if ( $event->ID == $price->get( 'EVT_ID' )) {
						$WP_Query->posts[ $EVT_ID ]->prices[] = $price;
					}
				}
			}
		}		

//		printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );


	}




	/**
	 * 	get_EE_post_type_metadata
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_EE_post_type_metadata( $meta_value = NULL, $post_id, $meta_key, $single ) {

		return $meta_value;

	}


}






// End of file EE_CPT_Event_Strategy.core.php
// Location: /core/CPTs/EE_CPT_Event_Strategy.core.php