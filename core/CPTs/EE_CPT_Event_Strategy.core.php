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
		
		$this->CPT = $CPT;

		$this->_add_filters();
	}
	
	protected $_filters = array('posts_fields','posts_join','posts_where');

	/**
	 * When an instance of this class is created, we add our filters 
	 * (which will get removed in case the next call to get_posts ISN'T
	 * for event CPTs)
	 */
	protected function _add_filters(){
		foreach($this->_filters as $filter){
			add_filter($filter,array($this,$filter));
		}
		add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
	}
	/**
	 * Should eb called when the last filter or hook is fired for thiss CPT strategy.
	 * This is to avoid applying this CPT strategy for other posts or CPTs (eg,
	 * we don't want to join to teh datetime table when querying for venues, do we!?)
	 */
	protected function _remove_filters(){
		foreach($this->_filters as $filter){
			remove_filter($filter,array($this,$filter));
		}
		remove_filter( 'the_posts', array( $this, 'the_posts' ));
	}

	/**
	 * 	posts_fields
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_fields( $SQL ) {
		// adds something like ", wp_esp_datetime.* " to WP Query SELECT statement
		$SQL .= ', ' . EEM_Datetime::instance()->table() . '.* ' ;
		return $SQL;
	}



	/**
	 * 	posts_join
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_join( $SQL ) {
		global $wpdb;
		// adds something like " LEFT JOIN wp_esp_datetime ON ( wp_esp_datetime.EVT_ID = wp_posts.ID ) " to WP Query JOIN statement
		$SQL .= ' JOIN ' . EEM_Datetime::instance()->table() . ' ON ( ' . EEM_Datetime::instance()->table() . '.EVT_ID = ' . $wpdb->posts . '.ID ) ';
		return $SQL;
	}



	/**
	 * 	posts_where
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function posts_where( $SQL ) {
		global $wpdb;
		// adds something like " AND wp_esp_datetime.DTT_is_primary = 1 " to WP Query WHERE statement
		// TODO: add event list option for displaying ALL datetimes in event list or only primary datetime (default)
//		$SQL .= ' AND ' . EEM_Datetime::instance()->table() . '.DTT_is_primary = 1 ';
		$SQL .=" GROUP BY ID";//we're joining to the datetimes table, where there can be MANY datetimes for a single event, but we want to only show each event only once (whereas if we didn't group them by the post's ID, then we would end up with many repeates)
		return $SQL;
	}



	/**
	 * 	the_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_posts( $posts, WP_Query $wp_query ) {
		// automagically load the event view helper so that it's functions are available
		EE_Registry::instance()->load_helper('Event_View');
//		$wp_query = EEH_Event_View::get_event_datetimes_and_tickets_for_WP_Query( $wp_query );
		return $posts;
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