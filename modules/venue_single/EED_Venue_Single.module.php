<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Venue Single
 *
 * @package		Event Espresso
 * @subpackage	/modules/venue_single/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Venue_Single  extends EED_Module {

	/**
	 * @return EED_Venue_Single
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
		EE_Config::register_route( 'venue', 'Venue_Single', 'run' );
//		EE_Config::register_view( 'venue', 0, EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'single-espresso_venues.php' );
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
		add_filter( 'template_include',  array( $this, 'template_include' ), 999, 1 );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
	}



	/**
	 * 	template_include
	 *
	 *  	@access 	public
	 *  	@return 	void
	 */
	public function template_include( $template ) {
		// not a custom template?
		if ( EE_Front_Controller::instance()->get_selected_template() != 'single-espresso_venues.php' ) {
			EEH_Template::load_espresso_theme_functions();
			// then add extra event data via hooks
			add_filter( 'the_title', array( $this, 'the_title' ), 100, 2 );
			add_filter( 'the_content', array( $this, 'venue_details' ), 100 );
			add_filter( 'the_content', array( $this, 'venue_location' ), 110 );
			// don't diplay entry meta because the existing theme will take car of that
			add_filter( 'FHEE__content_espresso_venues_details_template__display_entry_meta', '__return_false' );
		}
		return $template;
	}



	/**
	 * 	the_title
	 *
	 *  	@access 	public
	 * 	@param		string 	$title
	 *  	@return 		void
	 */
	public function the_title( $title = '', $id = '' ) {
		return $title;
//		global $post;
//		return in_the_loop() && $post->ID == $id ? espresso_event_status_banner( $post->ID ) . $title :  $title;
	}


	/**
	 * 	venue_details
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function venue_details( $content ) {
		global $post;
		// since the 'content-espresso_venues-details.php' template might be used directly from within a theme,
		// it uses the_content() for displaying the $post->post_content
		// so in order to load a template that uses the_content() from within a callback being used to filter the_content(),
		// we need to first remove this callback from being applied to the_content() (otherwise it will recurse and blow up the interweb)
		remove_filter( 'the_content', array( $this, 'venue_details' ), 100 );
		// now load our template
		$template = EEH_Template::locate_template( 'content-espresso_venues-details.php' );
		// we're not returning the $content directly because the template we are loading uses the_content (or the_excerpt)
		return ! empty( $template ) ? $template : $content;
	}



	/**
	 * 	venue_location
	 *
	 *  	@access 	public
	 * 	@param		string 	$content
	 *  	@return 		void
	 */
	public function venue_location( $content ) {
		return $content . EEH_Template::locate_template( 'content-espresso_venues-location.php' );
	}



	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {
		// get some style
		if ( apply_filters( 'FHEE_enable_default_espresso_css', TRUE ) && is_single() ) {
			// first check theme folder
			if ( is_readable( get_stylesheet_directory() . $this->theme . DS . 'style.css' )) {
				wp_register_style( $this->theme, get_stylesheet_directory_uri() . $this->theme . DS . 'style.css', array( 'dashicons', 'espresso_default' ) );
			} else if ( is_readable( EE_TEMPLATES . $this->theme . DS . 'style.css' )) {
				wp_register_style( $this->theme, EE_TEMPLATES_URL . $this->theme . DS . 'style.css', array( 'dashicons', 'espresso_default' ) );
			}
//			if ( is_readable( get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'single-espresso_venues.js' )) {
//				wp_register_script( 'single-espresso_venues', get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'single-espresso_venues.js', array('espresso_core'), '1.0', TRUE  );
//			} else if ( is_readable( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'single-espresso_venues.js' )) {
//				wp_register_script( 'single-espresso_venues', EE_TEMPLATES_URL . EE_Config::get_current_theme() . DS . 'single-espresso_venues.js', array('espresso_core'), '1.0', TRUE );
//			}
			wp_enqueue_style( $this->theme );
//			wp_enqueue_script( 'single-espresso_venues' );
			if ( EE_Registry::instance()->CFG->map_settings->use_google_maps ) {
				EE_Registry::instance()->load_helper( 'Maps' );
				add_action('wp_enqueue_scripts', array( 'EEH_Maps', 'espresso_google_map_js' ), 11 );
			}
		}
	}





}
// End of file EED_Venue_Single.module.php
// Location: /modules/venue_single/EED_Venue_Single.module.php