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
		define( 'EVENT_SINGLE_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_SINGLE_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
		add_filter( 'FHEE_run_EE_wp', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		EE_Config::register_route( 'event', 'Event_Single', 'run' );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
		// check what template is loaded
		add_action( 'template_redirect', array( $this, 'template_redirect' ));
		add_filter( 'FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true' );
		// load css
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		EE_Registry::instance()->load_helper( 'Venue_View' );
	}



	/**
	 * 	template_redirect
	 *
	 *  	@access 	public
	 *  	@return 	void
	 */
	public function template_redirect() {
		if ( EE_Front_Controller::instance()->get_selected_template() != 'single-espresso_events.php' ) {
			add_action( 'loop_start', array( $this, 'loop_start' ));
			add_filter( 'the_content', array( $this, 'event_details' ), 100 );
			add_filter( 'the_content', array( $this, 'event_tickets' ), 110 );
			add_filter( 'the_content', array( $this, 'event_datetimes' ), 120 );
			add_filter( 'the_content', array( $this, 'event_venues' ), 130 );
			add_action( 'loop_end', array( $this, 'loop_end' ));
		}
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
			if ( file_exists( get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'single-espresso_events.js' )) {
				wp_register_script( 'single-espresso_events', get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'single-espresso_events.js', array('espresso_core'), '1.0', TRUE  );
			} else {
				wp_register_script( 'single-espresso_events', EE_TEMPLATES_URL . EE_Config::get_current_theme() . DS . 'single-espresso_events.js', array('espresso_core'), '1.0', TRUE );
			}
			wp_enqueue_script( 'single-espresso_events' );
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