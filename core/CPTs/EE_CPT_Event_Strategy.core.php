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
	 * @access    public
	 * @param WP_Query $wp_query
	 * @param array $CPT
	 */
	public function __construct( $wp_query, $CPT = array() ) {
		if ( $wp_query instanceof WP_Query ) {
			$WP_Query = $wp_query;
			$this->CPT = $CPT;
		} else {
			$WP_Query = isset( $wp_query[ 'WP_Query' ] ) ? $wp_query[ 'WP_Query' ] : null;
			$this->CPT = isset( $wp_query[ 'CPT' ] ) ? $wp_query[ 'CPT' ] : null;
		}
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
			$WP_Query->is_espresso_event_single = is_singular() && isset( $WP_Query->query->post_type ) && $WP_Query->query->post_type == 'espresso_events' ? TRUE : FALSE;
			$WP_Query->is_espresso_event_archive = is_post_type_archive('espresso_events') ? TRUE : FALSE;
			$WP_Query->is_espresso_event_taxonomy = is_tax( 'espresso_event_categories' ) ? TRUE : FALSE;
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
		add_filter( 'posts_where', array( $this, 'posts_where' ), 10, 2 );
		// add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
		add_filter( 'posts_orderby', array( $this, 'posts_orderby' ), 1, 2 );
		add_filter( 'posts_groupby', array( $this, 'posts_groupby' ), 1, 2 );
	}



	/**
	 * Should eb called when the last filter or hook is fired for this CPT strategy.
	 * This is to avoid applying this CPT strategy for other posts or CPTs (eg,
	 * we don't want to join to the datetime table when querying for venues, do we!?)
	 */
	protected function _remove_filters(){
		remove_filter( 'posts_fields', array( $this, 'posts_fields' ), 1 );
		remove_filter( 'posts_join', array( $this, 'posts_join' ), 1 );
		remove_filter( 'posts_where', array( $this, 'posts_where' ), 10 );
		// remove_filter( 'the_posts', array( $this, 'the_posts' ), 1 );
		remove_filter( 'posts_orderby', array( $this, 'posts_orderby' ), 1 );
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
		if (
			$wp_query instanceof WP_Query
			&&
			(
				$wp_query->is_espresso_event_single
				|| $wp_query->is_espresso_event_archive
				|| $wp_query->is_espresso_event_taxonomy
			)
		) {
			// adds something like ", wp_esp_datetime.* " to WP Query SELECT statement
			$SQL .= ', ' . EEM_Datetime::instance()->table() . '.* ' ;
			if ( $wp_query->is_espresso_event_archive || $wp_query->is_espresso_event_taxonomy ) {
				// because we only want to retrieve the next upcoming datetime for each event:
				// add something like ", MIN( wp_esp_datetime.DTT_EVT_start ) as event_start_date " to WP Query SELECT statement
				$SQL .= ', MIN( ' . EEM_Datetime::instance()->table() . '.DTT_EVT_start ) as event_start_date ' ;
			}
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
		if (
			$wp_query instanceof WP_Query
			&&
			(
				$wp_query->is_espresso_event_single
				|| $wp_query->is_espresso_event_archive
				|| $wp_query->is_espresso_event_taxonomy
			)
		) {
			// adds something like " LEFT JOIN wp_esp_datetime ON ( wp_esp_datetime.EVT_ID = wp_posts.ID ) " to WP Query JOIN statement
			$SQL .= ' INNER JOIN ' . EEM_Datetime::instance()->table() . ' ON ( ' . EEM_Event::instance()->table() . '.ID = ' . EEM_Datetime::instance()->table() . '.' . EEM_Event::instance()->primary_key_name() . ' ) ';
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
		if (
			$wp_query instanceof WP_Query
			&&
			(
				$wp_query->is_espresso_event_archive
				|| $wp_query->is_espresso_event_taxonomy
			)
		) {
			if ( ! isset( EE_Registry::instance()->CFG->template_settings->EED_Events_Archive ) || ! isset( EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_expired_events ) || ! EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_expired_events ) {
				$SQL .=  ' AND ' . EEM_Datetime::instance()->table() . ".DTT_EVT_end > '" . current_time( 'mysql', true ) . "' ";
			}
		}
		return $SQL;
	}



	/**
	 * 	posts_orderby
	 *
	 * @access 	public
	 * @param 	string $SQL
	 * @param 	WP_Query $wp_query
	 * @return 	string
	 */
	public function posts_orderby( $SQL, WP_Query $wp_query ) {
		if (
			$wp_query instanceof WP_Query
			&&
			(
				$wp_query->is_espresso_event_archive
				|| $wp_query->is_espresso_event_taxonomy
			)
		) {
			$SQL = ' event_start_date ASC ';
		}
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
		if (
			$wp_query instanceof WP_Query
			&&
			(
				$wp_query->is_espresso_event_archive
				|| $wp_query->is_espresso_event_taxonomy
			)
		) {
			// TODO: add event list option for displaying ALL datetimes in event list or only primary datetime (default)
			// we're joining to the datetimes table, where there can be MANY datetimes for a single event, but we want to only show each event only once
			// (whereas if we didn't group them by the post's ID, then we would end up with many repeats)
			global $wpdb;
			$SQL = $wpdb->posts . '.ID ';
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
