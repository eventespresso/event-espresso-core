<?php
namespace EventEspresso\shortcodes\espresso_events;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EventListQuery
 * sets up a WordPress query
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class EventListQuery extends \WP_Query {


	private $_category_slug = '';

	private $_css_class     = '';

	private $_month         = '';

	private $_order_by      = '';

	private $_sort          = '';

	private $_title         = '';

	private $_limit         = 10;

	private $_show_expired  = false;



	/**
	 * EventListQuery Constructor     *
	 *
	 * @param array $args
	 */
	public function __construct( $args = array() ) {
		// incoming args could be a mix of WP query args + EE shortcode args
		foreach ( $args as $key => $value ) {
			$property = '_' . $key;
			// if the arg is a property of this class, then it's an EE shortcode arg
			if ( property_exists( $this, $property ) ) {
				// set the property value
				$this->{$property} = $value;
				// then remove it from the array of args that will later be passed to WP_Query()
				unset( $args[ $key ] );
			}
		}
		//add query filters
		\EEH_Event_Query::add_query_filters();
		// set params that will get used by the filters
		\EEH_Event_Query::set_query_params(
			$this->_month,
			$this->_category_slug,
			$this->_show_expired,
			$this->_order_by,
			$this->_sort
		);
		// first off, let's remove any filters from previous queries
		remove_filter(
			'FHEE__archive_espresso_events_template__upcoming_events_h1',
			array( $this, 'event_list_title' )
		);
		remove_all_filters( 'FHEE__content_espresso_events__event_class' );
		// Event List Title ?
		add_filter(
			'FHEE__archive_espresso_events_template__upcoming_events_h1',
			array( $this, 'event_list_title' ),
			10,
			1
		);
		// add the css class
		add_filter( 'FHEE__content_espresso_events__event_class', array( $this, 'event_list_css' ), 10, 1 );
		// the current "page" we are viewing
		$paged = max( 1, get_query_var( 'paged' ) );
		// Force these args
		$args = array_merge(
			$args,
			array(
				'post_type'              => 'espresso_events',
				'posts_per_page'         => $this->_limit,
				'update_post_term_cache' => false,
				'update_post_meta_cache' => false,
				'paged'                  => $paged,
				'offset'                 => ( $paged - 1 ) * $this->_limit
			)
		);
		// run the query
		parent::__construct( $args );
	}



	/**
	 *    event_list_title
	 *
	 * @access    public
	 * @param string $event_list_title
	 * @return    string
	 */
	public function event_list_title( $event_list_title = '' ) {
		if ( ! empty( $this->_title ) ) {
			return $this->_title;
		}
		return $event_list_title;
	}



	/**
	 *    event_list_css
	 *
	 * @access    public
	 * @param string $event_list_css
	 * @return    array
	 */
	public function event_list_css( $event_list_css = '' ) {
		$event_list_css .= ! empty( $event_list_css ) ? ' ' : '';
		$event_list_css .= ! empty( $this->_css_class ) ? $this->_css_class : '';
		$event_list_css .= ! empty( $event_list_css ) ? ' ' : '';
		$event_list_css .= ! empty( $this->_category_slug ) ? $this->_category_slug : '';
		return $event_list_css;
	}


}
// End of file EventListQuery.php
// Location: /EventListQuery.php