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
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * ESPRESSO_EVENTS
 *
 * @package			Event Espresso
 * @subpackage		/shortcodes/
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Events  extends EES_Shortcode {

	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( WP $WP ) {
		if ( did_action( 'pre_get_posts' ) && did_action( 'send_headers' ) ) {
			EED_Events_Archive::instance()->event_list();
		} else {
			// this will trigger the EED_Events_Archive module's event_list() method during the pre_get_posts hook point,
			// this allows us to initialize things, enqueue assets, etc,
			// as well, this saves an instantiation of the module in an array using 'espresso_events' as the key, so that we can retrieve it
			add_action( 'pre_get_posts', array( EED_Events_Archive::instance(), 'event_list' ) );
		}
	}



	/**
	 * 	process_shortcode - ESPRESSO_EVENTS - Returns a list of events
	 * 	[ESPRESSO_EVENTS]
	 * 	[ESPRESSO_EVENTS title="My Super Event"]
	 * 	[ESPRESSO_EVENTS limit=5]
	 * 	[ESPRESSO_EVENTS css_class="my-custom-class"]
	 * 	[ESPRESSO_EVENTS month="April 2014"]
	 * 	[ESPRESSO_EVENTS show_expired=true]
	 * 	[ESPRESSO_EVENTS category_slug="free-events"]
	 * 	[ESPRESSO_EVENTS order_by="start_date,id"]
	 * 	[ESPRESSO_EVENTS sort="ASC"]
	 *
	 *  @access 	public
	 *  @param 	array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {
		// make sure EED_Events_Archive is setup properly
		if ( apply_filters( 'FHEE__fallback_shortcode_processor__EES_Espresso_Events', FALSE )) {
			EED_Events_Archive::instance()->event_list();
		}
		//set default attributes
		$default_espresso_events_shortcode_atts = array(
			'title' => NULL,
			'limit' => 10,
			'css_class' => NULL,
			'show_expired' => FALSE,
			'month' => NULL,
			'category_slug' => NULL,
			'order_by' => 'start_date',
			'sort' => 'ASC',
			'fallback_shortcode_processor' => FALSE
		);
		// allow the defaults to be filtered
		$default_espresso_events_shortcode_atts = apply_filters(
			'EES_Espresso_Events__process_shortcode__default_espresso_events_shortcode_atts',
			$default_espresso_events_shortcode_atts
		);
		// grab attributes and merge with defaults, then extract
		$attributes = array_merge( (array) $default_espresso_events_shortcode_atts, (array) $attributes );
		$attributes = \EES_Shortcode::sanitize_attributes(
		    $attributes,
            // the following get sanitized/whitelisted in EEH_Event_Query
            array(
                'category_slug' => 'skip_sanitization',
                'show_expired'  => 'skip_sanitization',
                'order_by'      => 'skip_sanitization',
                'month'         => 'skip_sanitization',
                'sort'          => 'skip_sanitization',
            )
        );
		// make sure we use the_excerpt()
		add_filter( 'FHEE__EES_Espresso_Events__process_shortcode__true', '__return_true' );
		// apply query filters
		add_filter( 'FHEE__EEH_Event_Query__apply_query_filters', '__return_true' );
		// run the query
		global $wp_query;
		$wp_query = new EE_Event_List_Query( $attributes );
		// check what template is loaded and load filters accordingly
		EED_Events_Archive::instance()->template_include( 'loop-espresso_events.php' );
		// load our template
		$event_list = EEH_Template::locate_template( 'loop-espresso_events.php', array(), TRUE, TRUE );
		// now reset the query and postdata
		wp_reset_query();
		wp_reset_postdata();
		EED_Events_Archive::remove_all_events_archive_filters();
		// remove query filters
		remove_filter( 'FHEE__EEH_Event_Query__apply_query_filters', '__return_true' );
		// pull our content from the output buffer and return it
		return $event_list;
	}



}





/**
 *
 * Class EE_Event_List_Query
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.1
 *
 */
class EE_Event_List_Query extends WP_Query {

	private $_title = NULL;
	private $_limit = 10;
	private $_css_class = NULL;
	private $_show_expired = FALSE;
	private $_month = NULL;
	private $_category_slug = NULL;
	private $_order_by = NULL;
	private $_sort = NULL;



	/**
	 * EE_Event_List_Query Constructor	 *
	 * sets up a WordPress query
	 *
	 * @param array $args
	 */
	public function __construct( $args = array() ) {
		// incoming args could be a mix of WP query args + EE shortcode args
		foreach ( $args as $key =>$value ) {
			$property = '_' . $key;
			// if the arg is a property of this class, then it's an EE shortcode arg
			if ( property_exists( $this, $property )) {
				// set the property value
				$this->{$property} = $value;
				// then remove it from the array of args that will later be passed to WP_Query()
				unset( $args[ $key ] );
			}
		}
		//add query filters
		EEH_Event_Query::add_query_filters();
		// set params that will get used by the filters
		EEH_Event_Query::set_query_params( $this->_month, $this->_category_slug, $this->_show_expired, $this->_order_by, $this->_sort );
		// first off, let's remove any filters from previous queries
		remove_filter( 'FHEE__archive_espresso_events_template__upcoming_events_h1', array( $this, 'event_list_title' ));
		remove_all_filters( 'FHEE__content_espresso_events__event_class' );
		// Event List Title ?
		add_filter( 'FHEE__archive_espresso_events_template__upcoming_events_h1', array( $this, 'event_list_title' ), 10, 1 );
		// add the css class
		add_filter( 'FHEE__content_espresso_events__event_class', array( $this, 'event_list_css' ), 10, 1 );
		// the current "page" we are viewing
		$paged = max( 1, get_query_var( 'paged' ));
		// Force these args
		$args = array_merge( $args, array(
			'post_type' => 'espresso_events',
			'posts_per_page' => $this->_limit,
			'update_post_term_cache' => FALSE,
			'update_post_meta_cache' => FALSE,
			'paged' => $paged,
			'offset' => ( $paged - 1 ) * $this->_limit
		));

		// run the query
		parent::__construct( $args );
	}




	/**
	 * event_list_title
	 *
	 * @param string $event_list_title
	 * @return string
	 */
	public function event_list_title( $event_list_title = '' ) {
		if ( ! empty( $this->_title )) {
			return $this->_title;
		}
		return $event_list_title;
	}



	/**
     * event_list_css
     *
     * @param string $event_list_css
	 * @return string
	 */
	public function event_list_css( $event_list_css = '' ) {
		$event_list_css .=  ! empty( $event_list_css ) ? ' ' : '';
		$event_list_css .=  ! empty( $this->_css_class ) ? $this->_css_class : '';
		$event_list_css .=  ! empty( $event_list_css ) ? ' ' : '';
		$event_list_css .=  ! empty( $this->_category_slug ) ? $this->_category_slug : '';
		return $event_list_css;
	}






}



// End of file EES_Espresso_Events.shortcode.php
// Location: /shortcodes/EES_Espresso_Events.shortcode.php