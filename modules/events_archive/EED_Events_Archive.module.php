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
 * Event List
 *
 * @package		Event Espresso
 * @subpackage	/modules/events_archive/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Events_Archive  extends EED_Module {


	public static $espresso_event_list_ID = 0;
	public static $espresso_grid_event_lists = array();



	/**
	 * @return EED_Events_Archive
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
		EE_Config::register_route( __( 'events', 'event_espresso' ), 'Events_Archive', 'run' );
		EE_Config::register_route( 'event_list', 'Events_Archive', 'event_list' );
		add_action( 'wp_loaded', array( 'EED_Events_Archive', 'set_definitions' ), 2 );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_action( 'wp_loaded', array( 'EED_Events_Archive', 'set_definitions' ), 2 );
	}




	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		define( 'EVENTS_ARCHIVE_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENTS_ARCHIVE_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 *    set_config
	 *
	 * @return \EE_Events_Archive_Config
	 */
	protected function set_config(){
		$this->set_config_section( 'template_settings' );
		$this->set_config_class( 'EE_Events_Archive_Config' );
		$this->set_config_name( 'EED_Events_Archive' );
	}



	/**
	 *    run - initial module setup - this gets called by the EE_Front_Controller if the module route is found in the incoming request
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( $WP ) {
		do_action( 'AHEE__EED_Events_Archive__before_run' );
		// ensure valid EE_Events_Archive_Config() object exists
		$this->set_config();
		// load other required components
		$this->load_event_list_assets();
		// filter the WP posts_join, posts_where, and posts_orderby SQL clauses
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EEH_Event_Query::filter_query_parts();
		EEH_Event_Query::set_query_params();
		// check what template is loaded
		add_filter( 'template_include',  array( $this, 'template_include' ), 999, 1 );
		add_filter( 'FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true' );
	}



	/**
	 * 	event_list - most likely called by the EES_Espresso_Events shortcode which uses this module to do some of it's lifting
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function event_list() {
		// ensure valid EE_Events_Archive_Config() object exists
		$this->set_config();
		// load other required components
		$this->load_event_list_assets();
	}








	/**
	 *    template_include
	 *
	 * @access    public
	 * @param string $template
	 * @return    string
	 */
	public function template_include( $template = '' ) {
		// ensure valid EE_Events_Archive_Config() object exists
//		EED_Events_Archive::_set_config();
		// don't add content filter for dedicated EE child themes or private posts
		if ( ! EEH_Template::is_espresso_theme() && ! post_password_required() ) {
			// add status banner ?
			if ( $this->config()->display_status_banner ) {
				add_filter( 'the_title', array( 'EED_Events_Archive', 'the_title' ), 100, 2 );
			}
			// if NOT a custom template
			if ( EE_Front_Controller::instance()->get_selected_template() != 'archive-espresso_events.php' ) {
				// load functions.php file for the theme (loaded by WP if using child theme)
				EEH_Template::load_espresso_theme_functions();
				// because we don't know if the theme is using the_excerpt()
				add_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
				// or the_content
				add_filter( 'the_content', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
				// and just in case they are running get_the_excerpt() which DESTROYS things
				add_filter( 'get_the_excerpt', array( 'EED_Events_Archive', 'get_the_excerpt' ), 1, 1 );
				// don't display entry meta because the existing theme will take care of that
				add_filter( 'FHEE__content_espresso_events_details_template__display_entry_meta', '__return_false' );
			}
		}

		return $template;
	}



	/**
	 * 	get_the_excerpt - kinda hacky, but if a theme is using get_the_excerpt(), then we need to remove our filters on the_content()
	 *
	 * 	@access 	public
	 * 	@param		string 	$excerpt
	 * 	@return 		string
	 */
	public static function get_the_excerpt( $excerpt = '' ) {
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
		return EED_Events_Archive::event_details( $excerpt );
	}



	/**
	 *    the_title
	 *
	 * @access    	public
	 * @param 		string 		$title
	 * @param 		string 		$id
	 * @return 		string
	 */
	public static function the_title( $title = '', $id = '' ) {
	global $post;
	if ( $post instanceof WP_Post ) {
		return in_the_loop() && $post->ID == $id ? espresso_event_status_banner( $post->ID  ) . $title :  $title;
	}
	return $title;
}



	/**
	 * 	event_details
	 *
	 * 	@access 	public
	 * 	@param		string 	$content
	 * 	@return 		string
	 */
	public static function event_details( $content ) {

		global $post;
		if ( $post->post_type == 'espresso_events' && ! apply_filters( 'FHEE__EES_Espresso_Events__process_shortcode__true', FALSE )) {
			// we need to first remove this callback from being applied to the_content() (otherwise it will recurse and blow up the interweb)
			remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
			remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
			remove_filter( 'get_the_excerpt', array( 'EED_Events_Archive', 'get_the_excerpt' ), 1, 1 );
			//now add additional content depending on whether event is using the_excerpt() or the_content()
			EED_Events_Archive::_add_additional_excerpt_filters();
			EED_Events_Archive::_add_additional_content_filters();
			// now load our template
			$template = EEH_Template::locate_template( 'content-espresso_events-details.php' );
			// re-add our main filters (or else the next event won't have them)
			add_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
			add_filter( 'the_content', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
			add_filter( 'get_the_excerpt', array( 'EED_Events_Archive', 'get_the_excerpt' ), 1, 1 );
			// but remove the other filters so that they don't get applied to the next post
			EED_Events_Archive::_remove_additional_events_archive_filters();
		}
		// we're not returning the $content directly because the template we are loading uses the_content (or the_excerpt)
		return ! empty( $template ) ? $template : $content;
	}



	/**
	 * 	_add_additional_content_filters
	 *
	 *  	@access 	private
	 *  	@return 		void
	 */
	private static function _add_additional_excerpt_filters() {
		add_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_datetimes' ), 110, 1 );
		add_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_tickets' ), 120, 1 );
		add_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_venues' ), 130, 1 );
	}



	/**
	 * 	_add_additional_content_filters
	 *
	 *  	@access 	private
	 *  	@return 		void
	 */
	private static function _add_additional_content_filters() {
		add_filter( 'the_content', array( 'EED_Events_Archive', 'event_datetimes' ), 110, 1 );
		add_filter( 'the_content', array( 'EED_Events_Archive', 'event_tickets' ), 120, 1 );
		add_filter( 'the_content', array( 'EED_Events_Archive', 'event_venues' ), 130, 1 );
	}



	/**
	 * 	event_datetimes - adds datetimes ABOVE content
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		string
	 */
	public static function event_datetimes( $content ) {
		return EEH_Template::locate_template( 'content-espresso_events-datetimes.php' ) . $content;
	}

	/**
	 * 	event_tickets - adds tickets ABOVE content (which includes datetimes)
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		string
	 */
	public static function event_tickets( $content ) {
		return EEH_Template::locate_template( 'content-espresso_events-tickets.php' ) . $content;
	}

	/**
	 * 	event_venues - adds venues BELOW content
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		string
	 */
	public static function event_venues( $content ) {
	return $content . EEH_Template::locate_template( 'content-espresso_events-venues.php' );
}

	/**
	 * 	remove_all_events_archive_filters
	 *
	 *  	@access 	private
	 *  	@return 		void
	 */
	private static function _remove_additional_events_archive_filters() {
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_datetimes' ), 110, 1 );
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_tickets' ), 120, 1 );
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_venues' ), 130, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_datetimes' ), 110, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_tickets' ), 120, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_venues' ), 130, 1 );
	}
	/**
	 * 	remove_all_events_archive_filters
	 *
	 *  	@access 	public
	 *  	@return 		void
	 */
	public static function remove_all_events_archive_filters() {
		remove_filter( 'get_the_excerpt', array( 'EED_Events_Archive', 'get_the_excerpt' ), 1, 1 );
		remove_filter( 'the_title', array( 'EED_Events_Archive', 'the_title' ), 100, 2 );
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_datetimes' ), 110, 1 );
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_tickets' ), 120, 1 );
		remove_filter( 'the_excerpt', array( 'EED_Events_Archive', 'event_venues' ), 130, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_details' ), 100, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_datetimes' ), 110, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_tickets' ), 120, 1 );
		remove_filter( 'the_content', array( 'EED_Events_Archive', 'event_venues' ), 130, 1 );
		// don't diplay entry meta because the existing theme will take care of that
		remove_filter( 'FHEE__content_espresso_events_details_template__display_entry_meta', '__return_false' );
	}






	/**
	 * 	load_event_list_assets
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function load_event_list_assets() {
	do_action( 'AHEE__EED_Events_Archive__before_load_assets' );
	add_filter( 'FHEE_load_EE_Session', '__return_true' );
	add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
	if ( EE_Registry::instance()->CFG->map_settings->use_google_maps ) {
		EE_Registry::instance()->load_helper( 'Maps' );
		add_action('wp_enqueue_scripts', array( 'EEH_Maps', 'espresso_google_map_js' ), 11 );
	}
	EE_Registry::instance()->load_helper( 'Event_View' );
}






	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {
		// get some style
		if ( apply_filters( 'FHEE_enable_default_espresso_css', FALSE ) ) {
			// first check uploads folder
			EE_Registry::instance()->load_helper( 'File' );
			if ( EEH_File::is_readable( get_stylesheet_directory() . $this->theme . DS . 'style.css' )) {
				wp_register_style( $this->theme, get_stylesheet_directory_uri() . $this->theme . DS . 'style.css', array( 'dashicons', 'espresso_default' ));
			} else {
		}
		wp_enqueue_style( $this->theme );

	}
}





	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	string
	 */
	public static function template_settings_form() {
	$template_settings = EE_Registry::instance()->CFG->template_settings;
	$template_settings->EED_Events_Archive = isset( $template_settings->EED_Events_Archive ) ? $template_settings->EED_Events_Archive : new EE_Events_Archive_Config();
	$template_settings->EED_Events_Archive = apply_filters( 'FHEE__EED_Events_Archive__template_settings_form__event_list_config', $template_settings->EED_Events_Archive );
	$events_archive_settings = array(
		'display_status_banner' => 0,
		'display_description' => 1,
		'display_ticket_selector' => 0,
		'display_datetimes' => 1,
		'display_venue' => 0,
		'display_expired_events' => 0
	);
	$events_archive_settings = array_merge( $events_archive_settings, (array)$template_settings->EED_Events_Archive );
	EEH_Template::display_template( EVENTS_ARCHIVE_TEMPLATES_PATH . 'admin-event-list-settings.template.php', $events_archive_settings );
}






	/**
	 * 	update_template_settings
	 *
	 *  @access 	public
	 *  @param 	EE_Template_Config $CFG
	 *  @param 	EE_Request_Handler $REQ
	 *  @return 	EE_Template_Config
	 */
	public static function update_template_settings( $CFG, $REQ ) {
		$CFG->EED_Events_Archive = new EE_Events_Archive_Config();
		// unless we are resetting the config...
		if ( ! isset( $REQ['EED_Events_Archive_reset_event_list_settings'] ) || absint( $REQ['EED_Events_Archive_reset_event_list_settings'] ) !== 1 ) {
			$CFG->EED_Events_Archive->display_status_banner = isset( $REQ['EED_Events_Archive_display_status_banner'] ) ? absint( $REQ['EED_Events_Archive_display_status_banner'] ) : 0;
			$CFG->EED_Events_Archive->display_description = isset( $REQ['EED_Events_Archive_display_description'] ) ? absint( $REQ['EED_Events_Archive_display_description'] ) : 1;
			$CFG->EED_Events_Archive->display_ticket_selector = isset( $REQ['EED_Events_Archive_display_ticket_selector'] ) ? absint( $REQ['EED_Events_Archive_display_ticket_selector'] ) : 0;
			$CFG->EED_Events_Archive->display_datetimes = isset( $REQ['EED_Events_Archive_display_datetimes'] ) ? absint( $REQ['EED_Events_Archive_display_datetimes'] ) : 1;
			$CFG->EED_Events_Archive->display_venue = isset( $REQ['EED_Events_Archive_display_venue'] ) ? absint( $REQ['EED_Events_Archive_display_venue'] ) : 0;
			$CFG->EED_Events_Archive->display_expired_events = isset( $REQ['EED_Events_Archive_display_expired_events'] ) ? absint( $REQ['EED_Events_Archive_display_expired_events'] ) : 0;			}
		return $CFG;
	}



	/**
	 *    event_list_css
	 *
	 * @access    public
	 * @param string $extra_class
	 * @return    string
	 */
	public static function event_list_css( $extra_class = '' ) {
		$event_list_css = ! empty( $extra_class ) ? array( $extra_class ) : array();
		$event_list_css[] = 'espresso-event-list-event';
		return implode( ' ', $event_list_css );
	}






	/**
	 * 	event_categories
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function event_categories() {
	return EE_Registry::instance()->load_model('Term')->get_all_ee_categories();
}



	/**
	 *    display_description
	 *
	 * @access    public
	 * @param $value
	 * @return    bool
	 */
	public static function display_description( $value ) {
		$config = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
		$display_description= isset( $config->display_description ) ? $config->display_description : 1;
		return $display_description === $value ? TRUE : FALSE;
	}


	/**
	 * 	display_ticket_selector
	 *
	 *  @access 	public
	 *  @return 	bool
	 */
	public static function display_ticket_selector() {
		$config = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
		return isset( $config->display_ticket_selector ) && $config->display_ticket_selector ? TRUE : FALSE;
	}



	/**
	 * 	display_venue
	 *
	 *  @access 	public
	 *  @return 	bool
	 */
	public static function display_venue() {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		$config = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
		return isset( $config->display_venue ) && $config->display_venue && EEH_Venue_View::venue_name() ? TRUE : FALSE;
	}


	/**
	 * 	display_datetimes
	 *
	 *  @access 	public
	 *  @return 	bool
	 */
	public static function display_datetimes() {
		$config = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
		return isset( $config->display_datetimes ) && $config->display_datetimes ? TRUE : FALSE;
}






	/**
	 * 	event_list_title
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_list_title() {
		return apply_filters( 'FHEE__archive_espresso_events_template__upcoming_events_h1', __( 'Upcoming Events', 'event_espresso' ));
	}


	// GRAVEYARD

	/**
	 * 	@since 4.4.0
	 */
	public static function _doing_it_wrong_notice( $function = '' ) {
		EE_Error::doing_it_wrong(
			__FUNCTION__,
			sprintf(
				__( 'EED_Events_Archive::%1$s was moved to EEH_Event_Query::%1$s:%2$sPlease update your existing code because the method it calls will be removed in version %3$s', 'event_espresso' ),
				$function,
				'<br />',
				'4.6.0'
			),
			'4.4.0'
		);
	}



	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public function get_post_data() {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EEH_Event_Query::set_query_params();
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public function posts_fields( $SQL, WP_Query $wp_query ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_fields( $SQL, $wp_query );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public static function posts_fields_sql_for_orderby( $orderby_params = array() ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_fields_sql_for_orderby( $orderby_params );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public function posts_join( $SQL, WP_Query $wp_query ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_join( $SQL, $wp_query );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public static function posts_join_sql_for_terms( $join_terms = NULL ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_join_sql_for_terms( $join_terms );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public static function posts_join_for_orderby( $orderby_params = array() ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_join_for_orderby( $orderby_params );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public function posts_where( $SQL, WP_Query $wp_query ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_where( $SQL, $wp_query );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public static function posts_where_sql_for_show_expired( $show_expired = FALSE ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_where_sql_for_show_expired( $show_expired );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public static function posts_where_sql_for_event_category_slug( $event_category_slug = NULL ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_where_sql_for_event_category_slug( $event_category_slug );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public static function posts_where_sql_for_event_list_month( $month = NULL ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_where_sql_for_event_list_month( $month );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public function posts_orderby( $SQL, WP_Query $wp_query ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_orderby( $SQL, $wp_query );
	}
	/**
	 * 	@deprecated
	 * 	@since 4.4.0
	 */
	public static function posts_orderby_sql( $orderby_params = array(), $sort = 'ASC' ) {
		EE_Registry::instance()->load_helper( 'Event_Query' );
		EED_Events_Archive::_doing_it_wrong_notice( __FUNCTION__ );
		return EEH_Event_Query::posts_orderby_sql( $orderby_params, $sort );
	}



}





/**
 * @return int
 */
function espresso_get_event_list_ID() {
	EED_Events_Archive::$espresso_event_list_ID++;
	EED_Events_Archive::$espresso_grid_event_lists[] = EED_Events_Archive::$espresso_event_list_ID;
	return EED_Events_Archive::$espresso_event_list_ID;
}

/**
 * @return string
 */
function espresso_event_list_title() {
	return EED_Events_Archive::event_list_title();
}

/**
 * @param string $extra_class
 * @return string
 */
function espresso_event_list_css( $extra_class = '' ) {
	return EED_Events_Archive::event_list_css( $extra_class );
}

/**
 * @return array
 */
function espresso_get_event_categories() {
	return EED_Events_Archive::event_categories();
}

/**
 * @return bool
 */
function espresso_display_full_description_in_event_list() {
	return EED_Events_Archive::display_description( 2 );
}

/**
 * @return bool
 */
function espresso_display_excerpt_in_event_list() {
	return EED_Events_Archive::display_description( 1 );
}

/**
 * @return bool
 */
function espresso_display_ticket_selector_in_event_list() {
	return EED_Events_Archive::display_ticket_selector();
}

/**
 * @return bool
 */
function espresso_display_venue_in_event_list() {
	return EED_Events_Archive::display_venue();
}

/**
 * @return bool
 */
function espresso_display_datetimes_in_event_list() {
	return EED_Events_Archive::display_datetimes();
}







// End of file EED_Events_Archive.module.php
// Location: /modules/events_archive/EED_Events_Archive.module.php
