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
	 *    class constructor
	 *
	 * @access 	public
	 * @param 	array 	$arguments
	 * @return 	\EE_CPT_Event_Strategy
	 */
	public function __construct( $arguments = array() ) {
		$this->CPT = isset( $arguments['CPT'] ) ? $arguments['CPT'] : NULL;
		$WP_Query = isset( $arguments['WP_Query'] ) ? $arguments['WP_Query'] : NULL;

		// !!!!!!!!!!  IMPORTANT !!!!!!!!!!!!
		// here's the list of available filters in the WP_Query object
		// 'posts_where'
		// 'posts_where_paged'
		// 'posts_groupby'
		// 'posts_join_paged'
		// 'posts_orderby'
		// 'posts_distinct'
		// 'post_limits'
		// 'posts_fields'
		// 'posts_join'
		$this->_add_filters();
		if ( $WP_Query instanceof WP_Query ) {
			$WP_Query->is_espresso_event_single = is_single() ? TRUE : FALSE;
			$WP_Query->is_espresso_event_archive = is_archive() ? TRUE : FALSE;
		}

	}



	/**
	 * When an instance of this class is created, we add our filters
	 * (which will get removed in case the next call to get_posts ISN'T
	 * for event CPTs)
	 */
	protected function _add_filters(){
		add_filter( 'posts_fields', array( $this, 'posts_fields' ), 1, 2 );
		add_filter( 'posts_join', array( $this, 'posts_join' ), 1, 2 );
//		add_filter( 'posts_where', array( $this, 'posts_where' ), 10, 2 );
		add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
		add_filter( 'posts_groupby', array( $this, 'posts_groupby' ), 1, 2 );
	}



	/**
	 * Should eb called when the last filter or hook is fired for thiss CPT strategy.
	 * This is to avoid applying this CPT strategy for other posts or CPTs (eg,
	 * we don't want to join to the datetime table when querying for venues, do we!?)
	 */
	protected function _remove_filters(){
		remove_filter( 'posts_fields', array( $this, 'posts_fields' ), 10, 1 );
		remove_filter( 'posts_join', array( $this, 'posts_join' ), 10, 1 );
//		remove_filter( 'posts_where', array( $this, 'posts_where' ), 10, 1 );
		remove_filter( 'the_posts', array( $this, 'the_posts' ), 1 );
		remove_filter( 'posts_groupby', array( $this, 'posts_groupby' ), 1 );
	}



	/**
	 *    posts_fields
	 *
	 * @access    public
	 * @param          $SQL
	 * @param WP_Query $wp_query
	 * @return    string
	 */
	public function posts_fields( $SQL, WP_Query $wp_query ) {
		if ( isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == 'espresso_events' ) {
			// adds something like ", wp_esp_datetime.* " to WP Query SELECT statement
			$SQL .= ', ' . EEM_Datetime::instance()->table() . '.* ' ;
		}
		return $SQL;
	}



	/**
	 *    posts_join
	 *
	 * @access    public
	 * @param          $SQL
	 * @param WP_Query $wp_query
	 * @internal  param \WP_Query $WP_Query
	 * @return    string
	 */
	public function posts_join( $SQL, WP_Query $wp_query ) {
		if ( isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == 'espresso_events' ) {
			global $wpdb;
			// adds something like " LEFT JOIN wp_esp_datetime ON ( wp_esp_datetime.EVT_ID = wp_posts.ID ) " to WP Query JOIN statement
			$SQL .= ' JOIN ' . EEM_Datetime::instance()->table() . ' ON ( ' . EEM_Datetime::instance()->table() . '.EVT_ID = ' . $wpdb->posts . '.ID ) ';
		}
		return $SQL;
	}



	/**
	 *    posts_where
	 *
	 * @access    public
	 * @param          $SQL
	 * @param WP_Query $wp_query
	 * @return    string
	 */
	public function posts_where( $SQL, WP_Query $wp_query ) {
//		global $wpdb;
		return $SQL;
	}



	/**
	 *    posts_groupby
	 *
	 * @access    public
	 * @param          $SQL
	 * @param WP_Query $wp_query
	 * @return    string
	 */
	public function posts_groupby( $SQL, WP_Query $wp_query ) {
		if ( isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == 'espresso_events' ) {
			// TODO: add event list option for displaying ALL datetimes in event list or only primary datetime (default)
			// we're joining to the datetimes table, where there can be MANY datetimes for a single event, but we want to only show each event only once
			// (whereas if we didn't group them by the post's ID, then we would end up with many repeats)
			global $wpdb;
			$SQL = $wpdb->posts . '.ID';
		}
		return $SQL;
	}



	/**
	 *    the_posts
	 *
	 * @access    public
	 * @param          $posts
	 * @param WP_Query $wp_query
	 * @return    array
	 */
	public function the_posts( $posts, WP_Query $wp_query ) {
		if ( isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == 'espresso_events' ) {
			// automagically load the EEH_Event_View helper so that it's functions are available
			EE_Registry::instance()->load_helper('Event_View');
		}
		return $posts;
	}



	/**
	 *    get_EE_post_type_metadata
	 *
	 * @access    public
	 * @param null $meta_value
	 * @param      $post_id
	 * @param      $meta_key
	 * @param      $single
	 * @return    string
	 */
	public function get_EE_post_type_metadata( $meta_value = NULL, $post_id, $meta_key, $single ) {
		return $meta_value;
	}


}






// End of file EE_CPT_Event_Strategy.core.php
// Location: /core/CPTs/EE_CPT_Event_Strategy.core.php