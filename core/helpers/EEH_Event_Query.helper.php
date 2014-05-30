<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package            Event Espresso
 * @ author                Event Espresso
 * @ copyright        (c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            $VID:$
 *
 * ------------------------------------------------------------------------
 */





/**
 *
 * Class EE_Event_Query
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.3
 *
 */
class EE_Event_Query {

	/**
	 *    Start Date
	 * @var    $_event_query_month
	 * @access    protected
	 */
	protected $_event_query_month = NULL;

	/**
	 *    Category
	 * @var    $_event_query_category
	 * @access    protected
	 */
	protected $_event_query_category = NULL;

	/**
	 *    whether to display expired events in the event list
	 * @var    $_show_expired
	 * @access    protected
	 */
	protected $_event_query_show_expired = NULL;



	/**
	 * _filter_query_parts
	 *
	 * @access    public
	 * @return    void
	 */
	public function _construct() {
		// build event list query
		add_filter( 'posts_join', array( $this, 'posts_join' ), 11, 2 );
		add_filter( 'posts_where', array( $this, 'posts_where' ), 11, 2 );
		add_filter( 'posts_orderby', array( $this, 'posts_orderby' ), 11, 2 );
		$this->_event_query_month = $this->_display_month();
		$this->_event_query_category = $this->_event_category_slug();
		$this->_event_query_show_expired = $this->_show_expired( TRUE );
	}



	/**
	 *    _display_month - what month should the event list display events for?
	 *
	 * @access    private
	 * @return    string
	 */
	private function _display_month() {
		return EE_Registry::instance()->REQ->is_set( 'event_query_month' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'event_query_month' ) ) : '';
	}



	/**
	 *    _event_category_slug
	 *
	 * @access    private
	 * @return    string
	 */
	private function _event_category_slug() {
		return EE_Registry::instance()->REQ->is_set( 'event_query_category' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'event_query_category' ) ) : '';
	}



	/**
	 *    _show_expired
	 *
	 * @access    private
	 * @return    boolean
	 */
	private function _show_expired() {
		// override default expired option if set via filter
		$this->_event_query_show_expired = EE_Registry::instance()->REQ->is_set( 'event_query_show_expired' ) ? absint( EE_Registry::instance()->REQ->get( 'event_query_show_expired' ) ) : FALSE;
		return $this->_event_query_show_expired ? TRUE : FALSE;
	}



	/**
	 *    posts_join
	 *
	 * @access    public
	 * @param string   $SQL
	 * @param WP_Query $wp_query
	 * @return    string
	 */
	public function posts_join( $SQL = '', WP_Query $wp_query ) {
		if ( isset( $wp_query->query ) && isset( $wp_query->query[ 'post_type' ] ) && $wp_query->query[ 'post_type' ] == 'espresso_events' ) {
			// Category
			$SQL .= $this->posts_join_sql_for_terms( $this->_event_category_slug() );
		}
		return $SQL;
	}



	/**
	 *    posts_join_sql_for_terms
	 *
	 * @access    public
	 * @param    string $join_terms pass TRUE or term string, doesn't really matter since this value doesn't really get used for anything yet
	 * @return    string
	 */
	public function posts_join_sql_for_terms( $join_terms = '' ) {
		$SQL = '';
		if ( ! empty( $join_terms ) ) {
			global $wpdb;
			$SQL .= " LEFT JOIN $wpdb->term_relationships ON ($wpdb->posts.ID = $wpdb->term_relationships.object_id)";
			$SQL .= " LEFT JOIN $wpdb->term_taxonomy ON ($wpdb->term_relationships.term_taxonomy_id = $wpdb->term_taxonomy.term_taxonomy_id)";
			$SQL .= " LEFT JOIN $wpdb->terms ON ($wpdb->terms.term_id = $wpdb->term_taxonomy.term_id) ";
		}
		return $SQL;
	}



	/**
	 *    posts_join_for_orderby
	 *    usage:  $SQL .= $this->posts_join_for_orderby( $orderby_params );
	 *
	 * @access    public
	 * @param    array $orderby_params
	 * @return    string
	 */
	public function posts_join_for_orderby( $orderby_params = array() ) {
		$SQL = '';
		global $wpdb;
		foreach ( (array)$orderby_params as $orderby ) {
			switch ( $orderby ) {
				case 'ticket_start' :
				case 'ticket_end' :
					$SQL .= ' LEFT JOIN ' . EEM_Datetime_Ticket::instance()->table() . ' ON (' . EEM_Datetime::instance()->table() . '.DTT_ID = ' . EEM_Datetime_Ticket::instance()->table() . '.DTT_ID )';
					$SQL .= ' LEFT JOIN ' . EEM_Ticket::instance()->table() . ' ON (' . EEM_Datetime_Ticket::instance()->table() . '.TKT_ID = ' . EEM_Ticket::instance()->table() . '.TKT_ID )';
					break;
				case 'venue_title' :
				case 'city' :
					$SQL .= ' LEFT JOIN ' . EEM_Event_Venue::instance()->table() . ' ON (' . $wpdb->posts . '.ID = ' . EEM_Event_Venue::instance()->table() . '.EVT_ID )';
					$SQL .= ' LEFT JOIN ' . EEM_Venue::instance()->table() . ' ON (' . EEM_Event_Venue::instance()->table() . '.VNU_ID = ' . EEM_Venue::instance()->table() . '.VNU_ID )';
					break;
				case 'state' :
					$SQL .= ' LEFT JOIN ' . EEM_Event_Venue::instance()->table() . ' ON (' . $wpdb->posts . '.ID = ' . EEM_Event_Venue::instance()->table() . '.EVT_ID )';
					$SQL .= ' LEFT JOIN ' . EEM_Event_Venue::instance()->second_table() . ' ON (' . EEM_Event_Venue::instance()->table() . '.VNU_ID = ' . EEM_Event_Venue::instance()->second_table() . '.VNU_ID )';
					break;
					break;
			}
		}
		return $SQL;
	}



	/**
	 *    posts_where
	 *
	 * @access    public
	 * @param string   $SQL
	 * @param WP_Query $wp_query
	 * @return    string
	 */
	public function posts_where( $SQL = '', WP_Query $wp_query ) {
		if ( isset( $wp_query->query_vars ) && isset( $wp_query->query_vars[ 'post_type' ] ) && $wp_query->query_vars[ 'post_type' ] == 'espresso_events' ) {
			// Show Expired ?
			$SQL .= $this->posts_where_sql_for_show_expired( $this->_show_expired() );
			// Category
			$SQL .= $this->posts_where_sql_for_event_category_slug( $this->_event_category_slug() );
			// Start Date
			$SQL .= $this->posts_where_sql_for_event_list_month( $this->_display_month() );
		}
		return $SQL;
	}



	/**
	 *    posts_where_sql_for_show_expired
	 *
	 * @access    public
	 * @param    boolean $show_expired if TRUE, then displayed past events
	 * @return    string
	 */
	public function posts_where_sql_for_show_expired( $show_expired = FALSE ) {
		return ! $show_expired ? ' AND ' . EEM_Datetime::instance()->table() . '.DTT_EVT_end > "' . date( 'Y-m-d H:s:i' ) . '" ' : '';
	}



	/**
	 *    posts_where_sql_for_event_category_slug
	 *
	 * @access    public
	 * @param    boolean $event_category_slug
	 * @return    string
	 */
	public function posts_where_sql_for_event_category_slug( $event_category_slug = NULL ) {
		global $wpdb;
		return ! empty( $event_category_slug ) ? ' AND ' . $wpdb->terms . '.slug = "' . $event_category_slug . '" ' : '';
	}



	/**
	 *    posts_where_sql_for_event_list_month
	 *
	 * @access    public
	 * @param    boolean $month
	 * @return    string
	 */
	public function posts_where_sql_for_event_list_month( $month = NULL ) {
		$SQL = '';
		if ( ! empty( $month ) ) {
			// event start date is LESS than the end of the month ( so nothing that doesn't start until next month )
			$SQL = ' AND ' . EEM_Datetime::instance()->table() . '.DTT_EVT_start <= "' . date( 'Y-m-t 23:59:59', strtotime( $month ) ) . '"';
			// event end date is GREATER than the start of the month ( so nothing that ended before this month )
			$SQL .= ' AND ' . EEM_Datetime::instance()->table() . '.DTT_EVT_end >= "' . date( 'Y-m-d 0:0:00', strtotime( $month ) ) . '" ';
		}
		return $SQL;
	}



	/**
	 *    posts_orderby
	 *
	 * @access    public
	 * @param string   $SQL
	 * @param WP_Query $wp_query
	 * @return    string
	 */
	public function posts_orderby( $SQL = '', WP_Query $wp_query ) {
		if ( isset( $wp_query->query ) && isset( $wp_query->query[ 'post_type' ] ) && $wp_query->query[ 'post_type' ] == 'espresso_events' ) {
			$SQL = $this->posts_orderby_sql( array( 'start_date' ) );
		}
		return $SQL;
	}



	/**
	 *    posts_orderby_sql
	 *
	 *    possible parameters:
	 *    ID
	 *    start_date
	 *    end_date
	 *    event_name
	 *    category_slug
	 *    ticket_start
	 *    ticket_end
	 *    venue_title
	 *    city
	 *    state
	 *
	 *    **IMPORTANT**
	 *    make sure to also send the $orderby_params array to the posts_join_for_orderby() method
	 *    or else some of the table references below will result in MySQL errors
	 *
	 * @access    public
	 * @param array|bool $orderby_params
	 * @param string     $sort
	 * @return    string
	 */
	public function posts_orderby_sql( $orderby_params = array(), $sort = 'ASC' ) {
		global $wpdb;
		$SQL = '';
		$counter = 0;
		$orderby_params = is_array( $orderby_params ) ? $orderby_params : array( $orderby_params );
		foreach ( $orderby_params as $orderby ) {
			$glue = $counter == 0 || $counter == count( $orderby_params ) ? ' ' : ', ';
			switch ( $orderby ) {
				case 'id' :
				case 'ID' :
					$SQL .= $glue . $wpdb->posts . '.ID ' . $sort;
					break;
				case 'end_date' :
					$SQL .= $glue . EEM_Datetime::instance()->table() . '.DTT_EVT_end ' . $sort;
					break;
				case 'event_name' :
					$SQL .= $glue . $wpdb->posts . '.post_title ' . $sort;
					break;
				case 'category_slug' :
					$SQL .= $glue . $wpdb->terms . '.slug ' . $sort;
					break;
				case 'ticket_start' :
					$SQL .= $glue . EEM_Ticket::instance()->table() . '.TKT_start_date ' . $sort;
					break;
				case 'ticket_end' :
					$SQL .= $glue . EEM_Ticket::instance()->table() . '.TKT_end_date ' . $sort;
					break;
				case 'venue_title' :
					$SQL .= $glue . 'venue_title ' . $sort;
					break;
				case 'city' :
					$SQL .= $glue . EEM_Venue::instance()->second_table() . '.VNU_city ' . $sort;
					break;
				case 'state' :
					$SQL .= $glue . EEM_State::instance()->table() . '.STA_name ' . $sort;
					break;
				case 'start_date' :
				default :
					$SQL .= $glue . EEM_Datetime::instance()->table() . '.DTT_EVT_start ' . $sort;
					break;
			}
			$counter ++;
		}
		return $SQL;
	}
}



// End of file EEH_Event_Query.helper.php
// Location: /EEH_Event_Query.helper.php