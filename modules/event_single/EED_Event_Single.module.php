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


	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_filter( 'FHEE_run_EE_wp', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		add_action( 'wp_loaded', array( 'EED_Event_Single', 'set_definitions' ), 2 );
		EE_Config::register_route( 'event', 'Event_Single', 'run' );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_filter('FHEE__Config__update_config__CFG', array( 'EED_Event_Single', 'filter_config' ), 10 );
		add_filter( 'FHEE__EED_Event_Single__template_settings_form__event_list_config', array( 'EED_Event_Single', 'set_default_settings' ));
		add_action( 'AHEE__template_settings__template__before_settings_form', array( 'EED_Event_Single', 'template_settings_form' ), 10 );
		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Event_Single', 'update_template_settings' ), 10, 2 );
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
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function filter_config( $CFG ) {
		return $CFG;
	}




	/**
	 * 	set_default_settings
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function set_default_settings( $CFG ) {
		$CFG->display_status_banner_single = !empty( $CFG->display_status_banner_single) ? $CFG->display_status_banner_single : FALSE;
		return $CFG;
	}




	/**
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function update_template_settings( $CFG, $REQ ) {
		$CFG->EED_Event_Single->display_status_banner_single = !empty( $REQ['display_status_banner_single'] ) && $REQ['display_status_banner_single'] ? TRUE : FALSE;
		return $CFG;
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
		$EE->CFG->template_settings->EED_Event_Single = isset( $EE->CFG->template_settings->EED_Event_Single ) ? $EE->CFG->template_settings->EED_Event_Single : new EE_Event_Single_Config();
		$EE->CFG->template_settings->EED_Event_Single = apply_filters( 'FHEE__EED_Event_Single__template_settings_form__event_list_config', $EE->CFG->template_settings->EED_Event_Single );
		EEH_Template::display_template( EVENT_SINGLE_TEMPLATES_PATH . 'admin-event-single-settings.template.php', $EE->CFG->template_settings->EED_Event_Single );
	}






	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
		// set config
		if ( ! isset( EE_Registry::instance()->CFG->template_settings->EED_Event_Single )) {
			EE_Registry::instance()->CFG->template_settings->EED_Event_Single = new EE_Event_Single_Config();
		}
		// check what template is loaded
		add_filter( 'template_include',  array( $this, 'template_include' ), 999, 1 );
		add_filter( 'FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true' );
		// load css
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		EE_Registry::instance()->load_helper( 'Venue_View' );
	}



	/**
	 * 	template_include
	 *
	 *  	@access 	public
	 *  	@return 	void
	 */
	public function template_include( $template ) {
		if ( EE_Registry::instance()->CFG->template_settings->EED_Event_Single->display_status_banner_single ) {
			add_filter( 'the_title', array( $this, 'the_title' ), 100, 2 );
		}
		// not a custom template?
		if ( EE_Front_Controller::instance()->get_selected_template() != 'single-espresso_events.php' && ! post_password_required() ) {
			EEH_Template::load_espresso_theme_functions();
			// then add extra event data via hooks
			add_action( 'loop_start', array( $this, 'loop_start' ));
			add_filter( 'the_content', array( $this, 'event_details' ), 100 );
			add_filter( 'the_content', array( $this, 'event_tickets' ), 110 );
			add_filter( 'the_content', array( $this, 'event_datetimes' ), 120 );
			add_filter( 'the_content', array( $this, 'event_venues' ), 130 );
			add_action( 'loop_end', array( $this, 'loop_end' ));
			// don't diplay entry meta because the existing theme will take car of that
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
	public function loop_start( $wp_query_array ) {
		global $post;
		do_action( 'AHEE_event_details_before_post', $post );
	}



	/**
	 * 	the_title
	 *
	 *  	@access 	public
	 * 	@param		string 	$title
	 *  	@return 		void
	 */
	public function the_title( $title = '', $id = '' ) {
		global $post;
		return in_the_loop() && $post->ID == $id ? espresso_event_status_banner( $post->ID ) . $title :  $title; 
	}


	/**
	 * 	event_details
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_details( $content ) {
		// since the 'content-espresso_events-details.php' template might be used directly from within a theme,
		// it uses the_content() for displaying the $post->post_content
		// so in order to load a template that uses the_content() from within a callback being used to filter the_content(),
		// we need to first remove this callback from being applied to the_content() (otherwise it will recurse and blow up the interweb)
		remove_filter( 'the_content', array( $this, 'event_details' ), 100 );
		// now load our template
		$template = EEH_Template::locate_template( 'content-espresso_events-details.php' );
		//now add our filter back in, plus some others
		add_filter( 'the_content', array( $this, 'event_details' ), 100 );
		// we're not returning the $content directly because the template we are loading uses the_content (or the_excerpt)
		return ! empty( $template ) ? $template : $content;
	}


	/**
	 * 	event_tickets
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_tickets( $content ) {
		return $content . EEH_Template::locate_template( 'content-espresso_events-tickets.php' );
	}

	/**
	 * 	event_datetimes
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_datetimes( $content ) {
		return $content . EEH_Template::locate_template( 'content-espresso_events-datetimes.php' );
	}

	/**
	 * 	event_venues
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function event_venues( $content ) {
		return $content . EEH_Template::locate_template( 'content-espresso_events-venues.php' );
	}



	/**
	 * 	loop_end
	 *
	 *  	@access 	public
	 * 	@param		array 	$wp_query_array an array containing the WP_Query object
	 *  	@return 		void
	 */
	public function loop_end( $wp_query_array ) {
		global $post;
		do_action( 'AHEE_event_details_after_post', $post );
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
			// first check uploads folder
			if ( file_exists( get_stylesheet_directory() . $this->theme . DS . 'style.css' )) {
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
	 * 	display_address
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function display_address() {
		$EE = EE_Registry::instance();
		$EE->load_helper( 'Venue_View' );
		$display_address= isset( $EE->CFG->template_settings->display_address_in_regform ) ? $EE->CFG->template_settings->display_address_in_regform : TRUE;
		$venue_name = EEH_Venue_View::venue_name();
		return $display_address && ! empty( $venue_name ) ? TRUE : FALSE;
	}	
	


}


function espresso_display_venue_address_in_event_details() {
	return EED_Event_Single::display_address();
}



// End of file EED_Event_Single.module.php
// Location: /modules/event_details/EED_Event_Single.module.php