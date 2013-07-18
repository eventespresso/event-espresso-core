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
//		echo '<h4>is_espresso_page : ' . $this->EE->REQ->is_espresso_page() . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>post_name : ' . $this->EE->REQ->get( 'post_name' )  . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $this->CPT, '$this->CPT  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// does the current page match an EE CPT endpoint such as /events/  ???
		if ( $this->CPT['espresso_page'] == $this->CPT['plural_slug'] && $this->CPT['post_name'] == $this->CPT['espresso_page'] ) {
			// set "ee" to "events"
			$this->EE->REQ->set( 'ee', $this->CPT['plural_slug'] );
		// or does it match a single page CPT like /event/
		} else if ( $this->CPT['espresso_page'] == $this->CPT['plural_slug'] ) {
			// set "ee" to "event"
			$this->EE->REQ->set( 'ee', $this->CPT['singular_slug'] );
		}
//		$this->EE->REQ->set( 'ee', $this->EE->REQ->is_espresso_page() );
//		printr( $this->EE->REQ, '<br /><br />$this->EE->REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

//		add_filter( 'pre_get_posts', array( $this, 'pre_get_posts' ), 999 );
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
		if ( ! $WP_Query->is_main_query() ) {
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
	public function loop_start( WP_Query $wp_query ) {
		$this->EE->load_helper('Event_View');
		$wp_query = EEH_Event_View::get_event_datetimes_and_prices_for_WP_Query( $wp_query );
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