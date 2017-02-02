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
class EED_Events_Archive_Filters  extends EED_Module {



	/**
	 * @return EED_Events_Archive_Filters
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * 	Start Date
	 *	@var 	$_elf_month
	 * 	@access 	protected
	 */
	protected $_elf_month = NULL;


	/**
	 * 	Category
	 *	@var 	$_elf_category
	 * 	@access 	protected
	 */
	protected $_elf_category = NULL;


	/**
	 * 	whether to display expired events in the event list
	 *	@var 	$_show_expired
	 * 	@access 	protected
	 */
	protected $_show_expired = NULL;


	/**
	 * 	whether to display the event list as a grid or list
	 *	@var 	$_type
	 * 	@access 	protected
	 */
	protected static $_type = NULL;


	/**
	 * 	array of existing event list views
	 *	@var 	$_types
	 * 	@access 	protected
	 */
	protected static $_types = array( 'grid', 'text', 'dates' );


//	public static $espresso_event_list_ID = 0;
//	public static $espresso_grid_event_lists = array();



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
//		add_action( 'wp_loaded', array( 'EED_Events_Archive_Filters', 'set_definitions' ), 2 );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
//		add_filter('FHEE__Config__update_config__CFG', array( 'EED_Events_Archive_Filters', 'filter_config' ), 10 );
//		add_filter( 'FHEE__EED_Events_Archive_Filters__template_settings_form__event_list_config', array( 'EED_Events_Archive_Filters', 'set_default_settings' ));
//		add_action( 'AHEE__general_settings_admin__template_settings__before_settings_form', array( 'EED_Events_Archive_Filters', 'template_settings_form' ), 10 );
//		add_action( 'wp_loaded', array( 'EED_Events_Archive_Filters', 'set_definitions' ), 2 );
//		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Events_Archive_Filters', 'update_template_settings' ), 10, 2 );
	}




	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
//		define( 'EVENTS_ARCHIVE_FILTERS_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
//		define( 'EVENTS_ARCHIVE_FILTERS_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
//		do_action( 'AHEE__EED_Events_Archive_Filters__before_run' );
//		// set config
//		if ( ! isset( EE_Registry::instance()->CFG->template_settings->EED_Events_Archive_Filters ) || ! EE_Registry::instance()->CFG->template_settings->EED_Events_Archive_Filters instanceof EE_Events_Archive_Config ) {
//			EE_Registry::instance()->CFG->template_settings->EED_Events_Archive_Filters = new EE_Events_Archive_Config();
//		}
//		// grid, text or dates ?
//		EED_Events_Archive_Filters::set_type();
//		// filter the WP posts_join, posts_where, and posts_orderby SQL clauses
//		$this->_filter_query_parts();
//		// load other required components
//		$this->_load_assests();
//		if (  isset( EE_Registry::instance()->CFG->template_settings->use_espresso_templates ) && EE_Registry::instance()->CFG->template_settings->use_espresso_templates == TRUE ) {
//			// load template
//			EE_Config::register_view( 'events', 0, $this->_get_template('full') );
//		}
	}



	/**
	 * 	event_list
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function event_list() {
		// load other required components
		$this->_load_assests();
	}







	/**
	 * 	_filter_query_parts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _filter_query_parts() {
		// build event list query
		add_filter( 'posts_join', array( $this, 'posts_join' ), 1, 2 );
		add_filter( 'posts_where', array( $this, 'posts_where' ), 1, 2 );
		add_filter( 'posts_orderby', array( $this, 'posts_orderby' ), 1, 2 );
	}

	/**
	 * 	_type - the type of event list : grid, text, dates
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function set_type() {
		do_action( 'AHEE__EED_Events_Archive_Filters__before_set_type' );
		EED_Events_Archive_Filters::$_types = apply_filters( 'EED_Events_Archive_Filters__set_type__types', EED_Events_Archive_Filters::$_types );
		$view = isset( EE_Registry::instance()->CFG->EED_Events_Archive_Filters['default_type'] ) ? EE_Registry::instance()->CFG->EED_Events_Archive_Filters['default_type'] : 'grid';
		$elf_type = EE_Registry::instance()->REQ->is_set( 'elf_type' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'elf_type' )) : '';
		$view = ! empty( $elf_type ) ? $elf_type : $view;
		$view = apply_filters( 'EED_Events_Archive_Filters__set_type__type', $view );
		if ( ! empty( $view ) && in_array( $view, EED_Events_Archive_Filters::$_types )) {
			self::$_type = $view;
		}
	}

	/**
	 * 	_show_expired
	 *
	 *  @access 	private
	 *  @param	boolean	$req_only if TRUE, then ignore defaults and only return $_POST value
	 *  @return 	boolean
	 */
	private static function _show_expired( $req_only = FALSE ) {
		// get default value for "display_expired_events" as set in the EE General Settings > Templates > Event Listings
		$show_expired = ! $req_only && isset( EE_Registry::instance()->CFG->EED_Events_Archive_Filters['display_expired_events'] ) ? EE_Registry::instance()->CFG->EED_Events_Archive_Filters['display_expired_events'] : FALSE;
		// override default expired option if set via filter
		$show_expired = EE_Registry::instance()->REQ->is_set( 'elf_expired_chk' ) ? absint( EE_Registry::instance()->REQ->get( 'elf_expired_chk' )) : $show_expired;
		return $show_expired ? TRUE : FALSE;
	}

	/**
	 * 	_event_category_slug
	 *
	 *  @access 	private
	 *  @return 	string
	 */
	private static function _event_category_slug() {
		return EE_Registry::instance()->REQ->is_set( 'elf_category_dd' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'elf_category_dd' )) : '';
	}

	/**
	 * 	_display_month - what month should the event list display events for?
	 *
	 *  @access 	private
	 *  @return 	string
	 */
	private static function _display_month() {
		return EE_Registry::instance()->REQ->is_set( 'elf_month_dd' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'elf_month_dd' )) : '';
	}



	/**
	 * 	get_post_data
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_post_data() {
		$this->_elf_month = EED_Events_Archive_Filters::_display_month();
		$this->_elf_category = EED_Events_Archive_Filters::_event_category_slug();
		$this->_show_expired = EED_Events_Archive_Filters::_show_expired( TRUE );
//		EEH_Debug_Tools::printr( EE_Registry::instance()->REQ, 'EE_Registry::instance()->REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		echo '<h4>$this->_elf_month : ' . $this->_elf_month . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_elf_category : ' . $this->_elf_category . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		EEH_Debug_Tools::printr( $this->_elf_category, '$this->_elf_category  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		echo '<h4>$this->_show_expired : ' . $this->_show_expired . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_type : ' . $this->_type . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	}



	/**
	 * 	posts_join
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function posts_join( $SQL, WP_Query $wp_query ) {
		if ( isset( $wp_query->query ) && isset( $wp_query->query['post_type'] ) && $wp_query->query['post_type'] == 'espresso_events' ) {
			// Category
//			$elf_category = EE_Registry::instance()->REQ->is_set( 'elf_category_dd' ) ? sanitize_text_field( EE_Registry::instance()->REQ->get( 'elf_category_dd' )) : '';
			$SQL .= EED_Events_Archive_Filters::posts_join_sql_for_terms( EED_Events_Archive_Filters::_event_category_slug() );
		}
		return $SQL;
	}


	/**
	 * 	posts_join_sql_for_terms
	 *
	 *  @access 	public
	 *  @param	mixed boolean|string	$join_terms pass TRUE or term string, doesn't really matter since this value doesn't really get used for anything yet
	 *  @return 	string
	 */
	public static function posts_join_sql_for_terms( $join_terms = NULL ) {
		$SQL= '';
		if ( ! empty( $join_terms )) {
			global $wpdb;
			$SQL .= " LEFT JOIN $wpdb->term_relationships ON ($wpdb->posts.ID = $wpdb->term_relationships.object_id)";
			$SQL .= " LEFT JOIN $wpdb->term_taxonomy ON ($wpdb->term_relationships.term_taxonomy_id = $wpdb->term_taxonomy.term_taxonomy_id)";
			$SQL .= " LEFT JOIN $wpdb->terms ON ($wpdb->terms.term_id = $wpdb->term_taxonomy.term_id) ";
		}
		return  $SQL;
	}


	/**
	 * 	posts_join_for_orderby
	 * 	usage:  $SQL .= EED_Events_Archive_Filters::posts_join_for_orderby( $orderby_params );
	 *
	 *  @access 	public
	 *  @param	array	$orderby_params
	 *  @return 	string
	 */
	public static function posts_join_for_orderby( $orderby_params = array() ) {
		global $wpdb;
		$SQL= '';
		$orderby_params = is_array( $orderby_params ) ? $orderby_params : array( $orderby_params );
		foreach( $orderby_params as $orderby ) {
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
		return  $SQL;
	}


	/**
	 * 	posts_where
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function posts_where( $SQL, WP_Query $wp_query ) {
		if ( isset( $wp_query->query_vars ) && isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == 'espresso_events'  ) {
			// Show Expired ?
			$SQL .= EED_Events_Archive_Filters::posts_where_sql_for_show_expired( EED_Events_Archive_Filters::_show_expired() );
			// Category
			//$elf_category = EED_Events_Archive_Filters::_event_category_slug();
			$SQL .=  EED_Events_Archive_Filters::posts_where_sql_for_event_category_slug( EED_Events_Archive_Filters::_event_category_slug() );
			// Start Date
			//$elf_month = EED_Events_Archive_Filters::_display_month();
			$SQL .= EED_Events_Archive_Filters::posts_where_sql_for_event_list_month( EED_Events_Archive_Filters::_display_month() );
		}
		return $SQL;
	}


	/**
	 * 	posts_where_sql_for_show_expired
	 *
	 *  @access 	public
	 *  @param	boolean	$show_expired if TRUE, then displayed past events
	 *  @return 	string
	 */
	public static function posts_where_sql_for_show_expired( $show_expired = FALSE ) {
		return  ! $show_expired ? ' AND ' . EEM_Datetime::instance()->table() . '.DTT_EVT_end > "' . date('Y-m-d H:s:i') . '" ' : '';
	}


	/**
	 * 	posts_where_sql_for_event_category_slug
	 *
	 *  @access 	public
	 *  @param	boolean	$event_category_slug
	 *  @return 	string
	 */
	public static function posts_where_sql_for_event_category_slug( $event_category_slug = NULL ) {
		global $wpdb;
		return  ! empty( $event_category_slug ) ? ' AND ' . $wpdb->terms . '.slug = "' . $event_category_slug . '" ' : '';
	}

	/**
	 * 	posts_where_sql_for_event_list_month
	 *
	 *  @access 	public
	 *  @param	boolean	$month
	 *  @return 	string
	 */
	public static function posts_where_sql_for_event_list_month( $month = NULL ) {
		$SQL= '';
		if ( ! empty( $month )) {
			// event start date is LESS than the end of the month ( so nothing that doesn't start until next month )
			$SQL = ' AND ' . EEM_Datetime::instance()->table() . '.DTT_EVT_start';
			$SQL .= ' <= "' . date('Y-m-t 23:59:59', \EEH_DTT_Helper::first_of_month_timestamp($month)) . '"';
			// event end date is GREATER than the start of the month ( so nothing that ended before this month )
			$SQL .= ' AND ' . EEM_Datetime::instance()->table() . '.DTT_EVT_end';
			$SQL .= ' >= "' . date('Y-m-d 0:0:00', \EEH_DTT_Helper::first_of_month_timestamp($month)) . '" ';
		}
		return $SQL;
	}


	/**
	 * 	posts_orderby
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function posts_orderby( $SQL, WP_Query $wp_query ) {
		if ( isset( $wp_query->query ) && isset( $wp_query->query['post_type'] ) && $wp_query->query['post_type'] == 'espresso_events' ) {
			$SQL = EED_Events_Archive_Filters::posts_orderby_sql( array( 'start_date' ));
		}
		return $SQL;
	}


	/**
	 * 	posts_orderby_sql
	 *
	 * 	possible parameters:
	 * 	ID
	 * 	start_date
	 * 	end_date
	 * 	event_name
	 * 	category_slug
	 * 	ticket_start
	 * 	ticket_end
	 * 	venue_title
	 * 	city
	 * 	state
	 *
	 * 	**IMPORTANT**
	 * 	make sure to also send the $orderby_params array to the posts_join_for_orderby() method
	 * 	or else some of the table references below will result in MySQL errors
	 *
	 *  @access 	public
	 *  @param	boolean	$orderby_params
	 *  @return 	string
	 */
	public static function posts_orderby_sql( $orderby_params = array(), $sort = 'ASC' ) {
		global $wpdb;
		$SQL = '';
		$cntr = 1;
		$orderby_params = is_array( $orderby_params ) ? $orderby_params : array( $orderby_params );
		foreach( $orderby_params as $orderby ) {
			$glue = $cntr == 1 || $cntr == count( $orderby_params ) ? ' ' : ', ';
			switch ( $orderby ) {

				case 'id' :
				case 'ID' :
					$SQL .= $glue . $wpdb->posts . '.ID ' . $sort;
					break;

				case 'start_date' :
					$SQL .= $glue . EEM_Datetime::instance()->table() . '.DTT_EVT_start ' . $sort;
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

			}
			$cntr++;
		}
		//echo '<h4>$SQL : ' . $SQL . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		return  $SQL;
	}



	/**
	 * 	template_redirect
	 *
	 *  	@access 	public
	 *  	@return 	void
	 */
	public function template_redirect() {
		// add event list filters
		add_action( 'loop_start', array( $this, 'event_list_template_filters' ));
		// and pagination
		add_action( 'loop_start', array( $this, 'event_list_pagination' ));
		add_action( 'loop_end', array( $this, 'event_list_pagination' ));
		// if NOT a custom template
		if ( EE_Registry::instance()->load_core( 'Front_Controller', array(), false, true )->get_selected_template() != 'archive-espresso_events.php' ) {
			// don't know if theme uses the_excerpt
			add_filter( 'the_excerpt', array( $this, 'event_details' ), 100 );
			add_filter( 'the_excerpt', array( $this, 'event_tickets' ), 110 );
			add_filter( 'the_excerpt', array( $this, 'event_datetimes' ), 120 );
			add_filter( 'the_excerpt', array( $this, 'event_venues' ), 130 );
			// or the_content
			add_filter( 'the_content', array( $this, 'event_details' ), 100 );
			add_filter( 'the_content', array( $this, 'event_tickets' ), 110 );
			add_filter( 'the_content', array( $this, 'event_datetimes' ), 120 );
			add_filter( 'the_content', array( $this, 'event_venues' ), 130 );
		} else {
			remove_all_filters( 'excerpt_length' );
			add_filter( 'excerpt_length', array( $this, 'excerpt_length' ), 10 );
			add_filter( 'excerpt_more', array( $this, 'excerpt_more' ), 10 );
		}
	}



	/**
	 * 	event_list_pagination
	 *
	 *  	@access 	public
	 *  	@return 		void
	 */
	public function event_list_pagination() {
		echo '<div class="ee-pagination-dv clear">' . espresso_event_list_pagination() . '</div>';
	}


	/**
	 * 	event_details
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_details( $content ) {
		return EEH_Template::display_template( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'content-espresso_events-details.php', array( 'the_content' => $content ), TRUE );
	}


	/**
	 * 	event_tickets
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_tickets( $content ) {
		return $content . EEH_Template::display_template( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'content-espresso_events-tickets.php', array(), TRUE );
	}

	/**
	 * 	event_datetimes
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_datetimes( $content ) {
		return $content . EEH_Template::display_template( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'content-espresso_events-datetimes.php', array(), TRUE );
	}

	/**
	 * 	event_venues
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_venues( $content ) {
		return $content . EEH_Template::display_template( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'content-espresso_events-venues.php', array(), TRUE );
	}






	/**
	 * 	_initial_setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _load_assests() {
		do_action( 'AHEE__EED_Events_Archive_Filters__before_load_assests' );
		add_filter( 'FHEE_load_css', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		if ( EE_Registry::instance()->CFG->map_settings->use_google_maps ) {
			add_action('wp_enqueue_scripts', array( 'EEH_Maps', 'espresso_google_map_js' ), 11 );
		}
		//add_filter( 'the_excerpt', array( $this, 'the_excerpt' ), 999 );
	}





	/**
	 * 	_get_template
	 *
	 *  @access 	private
	 *  @return 	string
	 */
	private function _get_template( $which = 'part' ) {
		return EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events.php';
	}



	/**
	 * 	excerpt_length
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function excerpt_length( $length ) {

		if ( self::$_type == 'grid' ) {
			return 36;
		}

		switch ( EE_Registry::instance()->CFG->template_settings->EED_Events_Archive_Filters->event_list_grid_size ) {
			case 'tiny' :
				return 12;
				break;
			case 'small' :
				return 24;
				break;
			case 'large' :
				return 48;
				break;
			case 'medium' :
			default :
				return 36;
		}
	}



	/**
	 * 	excerpt_more
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function excerpt_more( $more ) {
		return '&hellip;';
	}




	/**
	 * 	the_excerpt
	 *
	 *  @access 	public
	 *  @return 	void
	 */
//	public function the_excerpt( $the_excerpt ) {
//		$display_address = isset( EE_Registry::instance()->CFG->template_settings->EED_Events_Archive_Filters['display_description'] ) ? EE_Registry::instance()->CFG->template_settings->EED_Events_Archive_Filters['display_description'] : TRUE;
//		return $display_address ? $the_excerpt : '';
//	}





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
			if ( is_readable( get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'archive-espresso_events.css' )) {
				wp_register_style( 'archive-espresso_events', get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'archive-espresso_events.css', array( 'dashicons', 'espresso_default' ));
			} else {
				wp_register_style( 'archive-espresso_events', EE_TEMPLATES_URL . EE_Config::get_current_theme() . DS . 'archive-espresso_events.css', array( 'dashicons', 'espresso_default' ));
			}
			if ( is_readable( get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'archive-espresso_events.js' )) {
				wp_register_script( 'archive-espresso_events', get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'archive-espresso_events.js', array( 'jquery-masonry' ), '1.0', TRUE  );
			} else {
				wp_register_script( 'archive-espresso_events', EVENTS_ARCHIVE_ASSETS_URL . 'archive-espresso_events.js', array( 'jquery-masonry' ), '1.0', TRUE );
			}
			wp_enqueue_style( 'archive-espresso_events' );
			wp_enqueue_script( 'jquery-masonry' );
			wp_enqueue_script( 'archive-espresso_events' );
			add_action( 'wp_footer', array( 'EED_Events_Archive_Filters', 'localize_grid_event_lists' ), 1 );
		}
	}




	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function localize_grid_event_lists() {
		wp_localize_script( 'archive-espresso_events', 'espresso_grid_event_lists', EED_Events_Archive_Filters::$espresso_grid_event_lists );
	}




	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function template_settings_form() {
		$EE = EE_Registry::instance();
		$EE->CFG->template_settings->EED_Events_Archive_Filters = isset( $EE->CFG->template_settings->EED_Events_Archive_Filters ) ? $EE->CFG->template_settings->EED_Events_Archive_Filters : new EE_Events_Archive_Config();
		$EE->CFG->template_settings->EED_Events_Archive_Filters = apply_filters( 'FHEE__Event_List__template_settings_form__event_list_config', $EE->CFG->template_settings->EED_Events_Archive_Filters );
		EEH_Template::display_template( EVENTS_ARCHIVE_TEMPLATES_PATH . 'admin-event-list-settings.template.php', $EE->CFG->template_settings->EED_Events_Archive_Filters );
	}





	/**
	 * 	set_default_settings
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function set_default_settings( $CFG ) {
		//EEH_Debug_Tools::printr( $CFG, '$CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$CFG->display_description = isset( $CFG->display_description ) && ! empty( $CFG->display_description ) ? $CFG->display_description : 1;
		$CFG->display_address = isset( $CFG->display_address ) && ! empty( $CFG->display_address ) ? $CFG->display_address : TRUE;
		$CFG->display_venue_details = isset( $CFG->display_venue_details ) && ! empty( $CFG->display_venue_details ) ? $CFG->display_venue_details : TRUE;
		$CFG->display_expired_events = isset( $CFG->display_expired_events ) && ! empty( $CFG->display_expired_events ) ? $CFG->display_expired_events : FALSE;
		$CFG->default_type = isset( $CFG->default_type ) && ! empty( $CFG->default_type ) ? $CFG->default_type : 'grid';
		$CFG->event_list_grid_size = isset( $CFG->event_list_grid_size ) && ! empty( $CFG->event_list_grid_size ) ? $CFG->event_list_grid_size : 'medium';
		$CFG->templates['full'] = isset( $CFG->templates['full'] ) && ! empty( $CFG->templates['full'] ) ? $CFG->templates['full'] : EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events.php';
		$CFG->templates['part'] = isset( $CFG->templates['part'] ) && ! empty( $CFG->templates['part'] ) ? $CFG->templates['part'] : EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events-grid-view.php';
		return $CFG;
	}



	/**
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_config( $CFG ) {
		return $CFG;
	}




	/**
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function update_template_settings( $CFG, $REQ ) {
//		EEH_Debug_Tools::printr( $REQ, '$REQ  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		EEH_Debug_Tools::printr( $CFG, '$CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		//$CFG->template_settings->EED_Events_Archive_Filters = new stdClass();
		$CFG->EED_Events_Archive_Filters->display_description = isset( $REQ['display_description_in_event_list'] ) ? absint( $REQ['display_description_in_event_list'] ) : 1;
		$CFG->EED_Events_Archive_Filters->display_address = isset( $REQ['display_address_in_event_list'] ) ? absint( $REQ['display_address_in_event_list'] ) : TRUE;
		$CFG->EED_Events_Archive_Filters->display_venue_details = isset( $REQ['display_venue_details_in_event_list'] ) ? absint( $REQ['display_venue_details_in_event_list'] ) : TRUE;
		$CFG->EED_Events_Archive_Filters->display_expired_events = isset( $REQ['display_expired_events'] ) ? absint( $REQ['display_expired_events'] ) : FALSE;
		$CFG->EED_Events_Archive_Filters->default_type = isset( $REQ['default_type'] ) ? sanitize_text_field( $REQ['default_type'] ) : 'grid';
		$CFG->EED_Events_Archive_Filters->event_list_grid_size = isset( $REQ['event_list_grid_size'] ) ? sanitize_text_field( $REQ['event_list_grid_size'] ) : 'medium';
		$CFG->EED_Events_Archive_Filters->templates = array(
				'full'  => EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events.php'
			);

		switch ( $CFG->EED_Events_Archive_Filters->default_type ) {
			case 'dates' :
					$CFG->EED_Events_Archive_Filters->templates['part'] = EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events-dates-view.php';
				break;
			case 'text' :
					$CFG->EED_Events_Archive_Filters->templates['part'] = EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events-text-view.php';
				break;
			default :
					$CFG->EED_Events_Archive_Filters->templates['part'] = EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events-grid-view.php';
		}

		$CFG->EED_Events_Archive_Filters = isset( $REQ['reset_event_list_settings'] ) && absint( $REQ['reset_event_list_settings'] ) == 1 ? new EE_Events_Archive_Config() : $CFG->EED_Events_Archive_Filters;
		return $CFG;
	}





	/**
	 * 	get_template_part
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function get_template_part() {
		switch ( self::$_type ) {
			case 'dates' :
					return 'archive-espresso_events-dates-view.php';
				break;
			case 'text' :
					return 'archive-espresso_events-text-view.php';
				break;
			default :
					return 'archive-espresso_events-grid-view.php';
		}

//		return EE_Registry::instance()->CFG->EED_Events_Archive_Filters['templates']['part'];
	}



	/**
	 * 	event_list_template_filters
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function event_list_template_filters() {
		$args = array(
			'form_url' => get_post_type_archive_link( 'espresso_events' ), //add_query_arg( array( 'post_type' => 'espresso_events' ), home_url() ),
			'elf_month' => EED_Events_Archive_Filters::_display_month(),
			'elf_category' => EED_Events_Archive_Filters::_event_category_slug(),
			'elf_show_expired' => EED_Events_Archive_Filters::_show_expired(),
			'elf_type' => self::$_type
		);
		EEH_Template::display_template( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_events-filters.php', $args );
	}





	/**
	 * 	event_list_css
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function event_list_css( $extra_class = '' ) {
		$EE = EE_Registry::instance();
		$event_list_css = ! empty( $extra_class ) ? array( $extra_class ) : array();
		$event_list_css[] = 'espresso-event-list-event';
		if ( self::$_type == 'grid' ) {
			$event_list_grid_size = isset( $EE->CFG->template_settings->EED_Events_Archive_Filters->event_list_grid_size ) ? $EE->CFG->template_settings->EED_Events_Archive_Filters->event_list_grid_size : 'medium';
			$event_list_css[] = $event_list_grid_size . '-event-list-grid';
		}
		$event_list_css = apply_filters( 'EED_Events_Archive_Filters__event_list_css__event_list_css_array', $event_list_css );
		return implode( ' ', $event_list_css );
	}






	/**
	 * 	event_categories
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function event_categories() {
		return EE_Registry::instance()->load_model('Term')->get_all_ee_categories();
	}



	/**
	 * 	display_description
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function display_description( $value ) {
		$EE = EE_Registry::instance();
		$display_description= isset( $EE->CFG->template_settings->EED_Events_Archive_Filters->display_description ) ? $EE->CFG->template_settings->EED_Events_Archive_Filters->display_description : 1;
		return $display_description === $value ? TRUE : FALSE;
	}



	/**
	 * 	display_venue_details
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function display_venue_details() {
		$EE = EE_Registry::instance();
		$display_venue_details= isset( $EE->CFG->template_settings->EED_Events_Archive_Filters->display_venue_details ) ? $EE->CFG->template_settings->EED_Events_Archive_Filters->display_venue_details : TRUE;
		$venue_name = EEH_Venue_View::venue_name();
		return $display_venue_details && ! empty( $venue_name ) ? TRUE : FALSE;
	}


	/**
	 * 	display_address
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function display_address() {
		$EE = EE_Registry::instance();
		$display_address= isset( $EE->CFG->template_settings->EED_Events_Archive_Filters->display_address ) ? $EE->CFG->template_settings->EED_Events_Archive_Filters->display_address : FALSE;
		$venue_name = EEH_Venue_View::venue_name();
		return $display_address && ! empty( $venue_name ) ? TRUE : FALSE;
	}



	/**
	 * 	pagination
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function pagination() {
		global $wp_query;
		$big = 999999999; // need an unlikely integer
		$pagination = paginate_links( array(
			'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format' => '?paged=%#%',
			'current' => max( 1, get_query_var('paged') ),
			'total' => $wp_query->max_num_pages,
			'show_all'     => TRUE,
			'end_size'     => 10,
			'mid_size'     => 6,
			'prev_next'    => TRUE,
			'prev_text'    => __( '&lsaquo; PREV', 'event_espresso' ),
			'next_text'    => __( 'NEXT &rsaquo;', 'event_espresso' ),
			'type'         => 'plain',
			'add_args'     => FALSE,
			'add_fragment' => ''
		));
		return ! empty( $pagination ) ? '<div class="ee-pagination-dv clear">' . $pagination . '</div>' : '';
	}





	/**
	 * 	event_list_title
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function event_list_title() {
		return apply_filters( 'EED_Events_Archive_Filters__event_list_title__event_list_title', __( 'Upcoming Events', 'event_espresso' ));
	}


}


/*
function espresso_get_event_list_ID() {
	EED_Events_Archive_Filters::$espresso_event_list_ID++;
	EED_Events_Archive_Filters::$espresso_grid_event_lists[] = EED_Events_Archive_Filters::$espresso_event_list_ID;
	return EED_Events_Archive_Filters::$espresso_event_list_ID;
}

function espresso_event_list_title() {
	return EED_Events_Archive_Filters::event_list_title();
}

function espresso_event_list_css( $extra_class = '' ) {
	return EED_Events_Archive_Filters::event_list_css( $extra_class );
}

function espresso_get_event_categories() {
	return EED_Events_Archive_Filters::event_categories();
}

function espresso_display_full_description_in_event_list() {
	return EED_Events_Archive_Filters::display_description( 2 );
}

function espresso_display_excerpt_in_event_list() {
	return EED_Events_Archive_Filters::display_description( 1 );
}

function espresso_event_list_template_part() {
	return EED_Events_Archive_Filters::get_template_part();
}

function espresso_display_venue_details_in_event_list() {
	return EED_Events_Archive_Filters::display_venue_details();
}

function espresso_display_venue_address_in_event_list() {
	return EED_Events_Archive_Filters::display_address();
}

function espresso_event_list_pagination() {
	echo EED_Events_Archive_Filters::pagination();
}

function espresso_event_list_grid_size_btn() {
	switch( EE_Registry::instance()->CFG->template_settings->EED_Events_Archive_Filters->event_list_grid_size ) {
		case 'tiny' :
		case 'small' :
			return 'small';
			break;
		case 'medium' :
			return 'medium';
			break;
		case 'large' :
			return 'big';
			break;
		case 'huge' :
			return 'huge';
			break;
	}
}
*/




// End of file EED_Events_Archive_Filters.module.php
// Location: /modules/events_archive/EED_Events_Archive_Filters.module.php