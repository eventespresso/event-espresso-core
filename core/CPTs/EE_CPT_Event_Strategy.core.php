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
	public function __construct( $CPT ) {
		$this->CPT = $CPT;
		$this->_add_filters();
	}
	


	/**
	 * When an instance of this class is created, we add our filters 
	 * (which will get removed in case the next call to get_posts ISN'T
	 * for event CPTs)
	 */
	protected function _add_filters(){
		add_filter( 'posts_fields', array( $this, 'posts_fields' ), 10, 1 );
		add_filter( 'posts_join', array( $this, 'posts_join' ), 10, 1 );
		add_filter( 'posts_where', array( $this, 'posts_where' ), 10, 1 );
		add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
	}



	/**
	 * Should eb called when the last filter or hook is fired for thiss CPT strategy.
	 * This is to avoid applying this CPT strategy for other posts or CPTs (eg,
	 * we don't want to join to teh datetime table when querying for venues, do we!?)
	 */
	protected function _remove_filters(){
		remove_filter( 'posts_fields', array( $this, 'posts_fields' ), 10, 1 );
		remove_filter( 'posts_join', array( $this, 'posts_join' ), 10, 1 );
		remove_filter( 'posts_where', array( $this, 'posts_where' ), 10, 1 );
		remove_filter( 'the_posts', array( $this, 'the_posts' ), 1 );
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
		// TODO: add event list option for displaying ALL datetimes in event list or only primary datetime (default)
		// we're joining to the datetimes table, where there can be MANY datetimes for a single event, but we want to only show each event only once 
		// (whereas if we didn't group them by the post's ID, then we would end up with many repeats)
		$SQL .=" GROUP BY ID";
		return $SQL;
	}



	/**
	 * 	the_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_posts( $posts, WP_Query $wp_query ) {
		// automagically load the EEH_Event_View helper so that it's functions are available
		EE_Registry::instance()->load_helper('Event_View');
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