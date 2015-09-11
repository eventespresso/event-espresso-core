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
 * Event Details
 *
 * @package		Event Espresso
 * @subpackage	/modules/event_details/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Event_Single  extends EED_Module {

	protected static $filter_order_array = array();

	protected static $event_position;

	protected static $display_order_tickets = 100;

	protected static $display_order_datetimes = 110;

	protected static $display_order_event = 120;

	protected static $display_order_venue = 130;



	/**
	 * @return EED_Event_Single
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_filter( 'FHEE_run_EE_wp', '__return_true' );
		add_action( 'wp_loaded', array( 'EED_Event_Single', 'set_definitions' ), 2 );
		EE_Config::register_route( __( 'event', 'event_espresso' ), 'Event_Single', 'run' );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_action( 'wp_loaded', array( 'EED_Event_Single', 'set_definitions' ), 2 );
	}




	/**
	 * set_definitions
	 *
	 * @access public
	 * @static
	 * @return void
	 */
	public static function set_definitions() {
		define( 'EVENT_SINGLE_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_SINGLE_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
	}



	/**
	 *    set_config
	 *
	 * @return \EE_Events_Archive_Config
	 */
	protected function set_config(){
		$this->set_config_section( 'template_settings' );
		$this->set_config_class( 'EE_Event_Single_Config' );
		$this->set_config_name( 'EED_Event_Single' );
		/** @type EE_Event_Single_Config $config */
		$config = $this->config();
		EED_Event_Single::$display_order_tickets = isset( $config->display_order_tickets ) ? $config->display_order_tickets : 100;
		EED_Event_Single::$display_order_datetimes = isset( $config->display_order_datetimes ) ? $config->display_order_datetimes : 110;
		EED_Event_Single::$display_order_event = isset( $config->display_order_event ) ? $config->display_order_event : 120;
		EED_Event_Single::$display_order_venue = isset( $config->display_order_venue ) ? $config->display_order_venue : 130;
		EED_Event_Single::$filter_order_array[ EED_Event_Single::$display_order_tickets ] = 'tickets';
		EED_Event_Single::$filter_order_array[ EED_Event_Single::$display_order_datetimes ] = 'datetimes';
		EED_Event_Single::$filter_order_array[ EED_Event_Single::$display_order_event ] = 'event';
		EED_Event_Single::$filter_order_array[ EED_Event_Single::$display_order_venue ] = 'venue';
		EED_Event_Single::_process_filter_order_array();
	}



	/**
	 *   _process_filter_order_array
	 *
	 * reorganizes the order of the template parts as set in the admin, in order for the filters to work correctly
	 * 	because we are adding content via filters that always attach before or after the event description (the content)
	 * 	we actually need to process the middle items first, then work our way outwards to the first and last items
	 * 	so we process the second item in our list first, then the third, then first, then last
	 *
	 * @access    protected
	 * @return    void
	 */
	protected static function _process_filter_order_array() {
		ksort( EED_Event_Single::$filter_order_array );
		$corrected_keys = array(
			100 => 120,
			110 => 100,
			120 => 110,
			130 => 130,
		);
		$corrected_key_array = array();
		foreach ( EED_Event_Single::$filter_order_array as $key => $template ) {
			$corrected_key_array[ $corrected_keys[ $key ] ] = $template;
			if ( $template == 'event' ) {
				EED_Event_Single::$event_position = $corrected_keys[ $key ];
			}
			$filter = 'display_order_' . $template;
			EED_Event_Single::${$filter} = $corrected_keys[ $key ];
		}
		EED_Event_Single::$filter_order_array = $corrected_key_array;
		ksort( EED_Event_Single::$filter_order_array );
		// DEFAULT
		// want:  	tickets - dates - EVENT - venue
		// order:  dates - EVENT - tickets - venue
		// REVERSE
		// want:  venue - EVENT - dates - tickets
		// order: EVENT - dates - venue - tickets
		// 2 or 3, 2 or 3, FIRST, LAST
		// RANDOM EVENT LAST
		// want:  dates - tickets - venue - EVENT
		// order: tickets - venue - dates - EVENT
		// 0 to 1 : venue - tickets - dates - EVENT
		// RANDOM EVENT FIRST
		// want:  EVENT - tickets - venue - dates
		// order: tickets - venue - EVENT - dates
		// RANDOM EVENT LAST
		// want:  dates - tickets - venue - EVENT
		// order: tickets - venue - dates - EVENT
		// 0 to 1 : venue - tickets - dates - EVENT
		if ( EED_Event_Single::$event_position == 130 ) {
			// EVENT LAST
			// swap positions for elements 0 & 1
			$temp = EED_Event_Single::$filter_order_array[ 100 ];
			EED_Event_Single::$filter_order_array[ 100 ] = EED_Event_Single::$filter_order_array[ 110 ];
			EED_Event_Single::$filter_order_array[ 110 ] = $temp;
			ksort( EED_Event_Single::$filter_order_array );
			// don't forget to update the actual config properties
			foreach ( EED_Event_Single::$filter_order_array as $filter_order => $filter ) {
				$filter = 'display_order_' . $filter;
				EED_Event_Single::${$filter} = $filter_order;
			}
		}
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( $WP ) {
		// ensure valid EE_Events_Archive_Config() object exists
		$this->set_config();
		// check what template is loaded
		add_filter( 'template_include',  array( $this, 'template_include' ), 999, 1 );
		add_filter( 'FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true' );
		// load css
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		EE_Registry::instance()->load_helper( 'Venue_View' );




	}



	/**
	 *    template_include
	 *
	 * @access 	public
	 * @param 	string $template
	 * @return 	string
	 */
	public function template_include( $template ) {
		global $post;
		if ( $this->config()->display_status_banner_single ) {
			add_filter( 'the_title', array( 'EED_Event_Single', 'the_title' ), 100, 2 );
		}
		// not a custom template?
		if ( EE_Front_Controller::instance()->get_selected_template() != 'single-espresso_events.php' && ! post_password_required( $post ) ) {
			EEH_Template::load_espresso_theme_functions();
			// then add extra event data via hooks
			add_action( 'loop_start', array( 'EED_Event_Single', 'loop_start' ));
			add_filter( 'the_content', array( 'EED_Event_Single', 'event_details' ), EED_Event_Single::$display_order_event );
			add_action( 'loop_end', array( 'EED_Event_Single', 'loop_end' ));
			// don't display entry meta because the existing theme will take car of that
			add_filter( 'FHEE__content_espresso_events_details_template__display_entry_meta', '__return_false' );
		}
		return $template;
	}



	/**
	 * 	loop_start
	 *
	 *  	@access 	public
	 * 	@param		array 	$wp_query_array an array containing the WP_Query object
	 *  	@return 		void
	 */
	public static function loop_start( $wp_query_array ) {
		global $post;
		do_action( 'AHEE_event_details_before_post', $post, $wp_query_array );
	}



	/**
	 *    the_title
	 *
	 * @access 	public
	 * @param 	string $title
	 * @param 	int 	$id
	 * @return 	string
	 */
	public static function the_title( $title = '', $id = 0 ) {
		global $post;
		return in_the_loop() && $post->ID == $id ? espresso_event_status_banner( $post->ID ) . $title :  $title;
	}


	/**
	 * 	event_details
	 *
	 * 	@access 	public
	 * 	@param 	string 	$content
	 * 	@return 	string
	 */
	public static function event_details( $content ) {
		global $post;
		if ( $post->post_type == 'espresso_events' && ! post_password_required() ) {
			if ( EE_Registry::instance()->CFG->template_settings->EED_Event_Single->use_sortable_display_order ) {
				$content = EED_Event_Single::_apply_event_content_filters( $content );
			} else {
				$content = \EED_Event_Single::use_filterable_display_order( $content );
			}
		}
 		return $content;
	}



	/**
	 *    _apply_event_content_filters
	 *
	 * @access    private
	 * @param string $content
	 * @return string
	 */
	private static function _apply_event_content_filters( $content = '' ) {
		foreach ( EED_Event_Single::$filter_order_array as $order => $filter ) {
			$filter = "event_$filter";
			if ( method_exists( 'EED_Event_Single', $filter ) ) {
				$content = EED_Event_Single::$filter( $content );
			}
		}
		return $content;
	}



	/**
	 *    use_filterable_display_order
	 *
	 * @access    protected
	 * @param        string $content
	 * @return string
	 */
	protected static function use_filterable_display_order( $content ) {
		static $applied = false;
		if ( $applied ) {
			return $content;
		}
		$applied = true;
		// since the 'content-espresso_events-details.php' template might be used directly from within a theme,
		// it uses the_content() for displaying the $post->post_content
		// so in order to load a template that uses the_content() from within a callback being used to filter the_content(),
		// we need to first remove this callback from being applied to the_content() (otherwise it will recurse and blow up the interweb)
		remove_filter( 'the_content', array( 'EED_Event_Single', 'event_details' ), 100 );
		//now add additional content
		add_filter( 'the_content', array( 'EED_Event_Single', 'event_datetimes' ), 110, 1 );
		add_filter( 'the_content', array( 'EED_Event_Single', 'event_tickets' ), 120, 1 );
		add_filter( 'the_content', array( 'EED_Event_Single', 'event_venues' ), 130, 1 );
		// now load our template
		$template = EEH_Template::locate_template( 'content-espresso_events-details.php' );
		//now add our filter back in, plus some others
		add_filter( 'the_content', array( 'EED_Event_Single', 'event_details' ), 100 );
		remove_filter( 'the_content', array( 'EED_Event_Single', 'event_datetimes' ), 110 );
		remove_filter( 'the_content', array( 'EED_Event_Single', 'event_tickets' ), 120 );
		remove_filter( 'the_content', array( 'EED_Event_Single', 'event_venues' ), 130 );
		// we're not returning the $content directly because the template we are loading uses the_content (or the_excerpt)
		return ! empty( $template ) ? $template : $content;
	}



	/**
	 *    _position_filtered_element
	 *
	 * @access    protected
	 * @param        string $content
	 * @param               $priority
	 * @param               $template
	 * @return string
	 */
	protected static function _position_filtered_element( $content, $priority, $template ) {
		static $applied_filters = array();
		if ( has_filter( 'the_content', array( 'EED_Event_Single', "event_$template" ) ) && isset( $applied_filters[ $template ] ) ) {
			return $content;
		}
		$applied_filters[ $template ] = true;
		if ( EED_Event_Single::$event_position == 120 ) {
			// EVENT is FIRST so all elements go AFTER the content
			$before = false;
		} else if ( EED_Event_Single::$event_position == 130 ) {
			// EVENT is LAST so all elements go BEFORE the content
			$before = true;
		} else if ( $priority == 130 ) {
			// this element is LAST - add AFTER existing content
			$before = false;
		} else if ( $priority == 120 ) {
			// this element is FIRST - add BEFORE existing content
			$before = true;
		} else if ( $priority < EED_Event_Single::$display_order_event ) {
			// this element is BEFORE the content
			$before = true;
		} else {
			// this element is AFTER the content
			$before = false;
		}
		if ( $before ) {
			return EEH_Template::locate_template( "content-espresso_events-$template.php" ) . $content;
		} else {
			return $content . EEH_Template::locate_template( "content-espresso_events-$template.php" );
		}
	}



	/**
	 * 	event_datetimes
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		string
	 */
	public static function event_datetimes( $content ) {
		return EED_Event_Single::_position_filtered_element( $content, EED_Event_Single::$display_order_datetimes, 'datetimes' );
	}



	/**
	 *    event_tickets
	 *
	 * @access 	public
	 * @param 	string $content
	 * @return 	string
	 */
	public static function event_tickets( $content ) {
		return EED_Event_Single::_position_filtered_element( $content, EED_Event_Single::$display_order_tickets, 'tickets' );
	}



	/**
	 *    event_venues
	 *
	 * @access 	public
	 * @param 	string $content
	 * @return 	string
	 */
	public static function event_venue( $content ) {
		return EED_Event_Single::event_venues( $content );
	}



	/**
	 *    event_venues
	 *
	 * @access 	public
	 * @param 	string $content
	 * @return 	string
	 */
	public static function event_venues( $content ) {
		return EED_Event_Single::_position_filtered_element( $content, EED_Event_Single::$display_order_venue, 'venues' );
	}



	/**
	 * 	loop_end
	 *
	 *  	@access 	public
	 * 	@param		array 	$wp_query_array an array containing the WP_Query object
	 *  	@return 		void
	 */
	public static function loop_end( $wp_query_array ) {
		global $post;
		do_action( 'AHEE_event_details_after_post', $post, $wp_query_array );
	}



	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {
		// get some style
		if ( apply_filters( 'FHEE_enable_default_espresso_css', TRUE ) && apply_filters( 'FHEE__EED_Event_Single__wp_enqueue_scripts__enable_css', TRUE )) {
			EE_Registry::instance()->load_helper( 'File' );
			// first check uploads folder
			if ( is_readable( get_stylesheet_directory() . $this->theme . DS . 'style.css' )) {
				wp_register_style( $this->theme, get_stylesheet_directory_uri() . $this->theme . DS . 'style.css', array( 'dashicons', 'espresso_default' ));
			} else {
				wp_register_style( $this->theme, EE_TEMPLATES_URL . $this->theme . DS . 'style.css', array( 'dashicons', 'espresso_default' ));
			}
			wp_enqueue_script( $this->theme );
			if ( EE_Registry::instance()->CFG->map_settings->use_google_maps ) {
				EE_Registry::instance()->load_helper( 'Maps' );
				add_action('wp_enqueue_scripts', array( 'EEH_Maps', 'espresso_google_map_js' ), 11 );
			}
		}
	}








	/**
	 * 	display_venue
	 *
	 *  @access 	public
	 *  @return 	bool
	 */
	public static function display_venue() {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		/** @type EE_Event_Single_Config EED_Event_Single::instance()->config() */
		$display_venue= isset( EED_Event_Single::instance()->config()->display_venue ) ? EED_Event_Single::instance()->config()->display_venue : TRUE;
		$venue_name = EEH_Venue_View::venue_name();
		return $display_venue && ! empty( $venue_name ) ? TRUE : FALSE;
	}



}





/**
 * espresso_display_venue_in_event_details
 *
 * @see EED_Event_Single::display_venue()
 * @return bool
 */
function espresso_display_venue_in_event_details() {
	return EED_Event_Single::display_venue();
}



// End of file EED_Event_Single.module.php
// Location: /modules/event_details/EED_Event_Single.module.php