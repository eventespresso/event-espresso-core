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
 * EED_Venues_Archive
 *
 * @package		Event Espresso
 * @subpackage	/modules/venues_archive/
 * @author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Venues_Archive  extends EED_Module {


	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		EE_Config::register_route( 'venues', 'Venues_Archive', 'run' );
		EE_Config::register_view( 'venues', 0, EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.php' );
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
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
	}





	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {
		// get some style
		if ( apply_filters('FHEE_enable_default_espresso_css', TRUE ) && is_archive() ) {
			// first check theme folder
			if ( is_readable( get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.css' )) {
				wp_register_style( 'archive-espresso_venues', get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.css', array( 'dashicons', 'espresso_default' ) );
			} else if ( is_readable( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.css' )) {
				wp_register_style( 'archive-espresso_venues', EE_TEMPLATES_URL . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.css', array( 'dashicons', 'espresso_default' ) );
			}
//			if ( is_readable( get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.js' )) {
//				wp_register_script( 'archive-espresso_venues', get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.js', array('espresso_core'), '1.0', TRUE  );
//			} else if ( is_readable( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.js' )) {
//				wp_register_script( 'archive-espresso_venues', EE_TEMPLATES_URL . EE_Config::get_current_theme() . DS . 'archive-espresso_venues.js', array('espresso_core'), '1.0', TRUE );
//			}
			wp_enqueue_style( 'archive-espresso_venues' );
//			wp_enqueue_script( 'archive-espresso_venues' );
			if ( EE_Registry::instance()->CFG->map_settings->use_google_maps ) {
				EE_Registry::instance()->load_helper( 'Maps' );
				add_action('wp_enqueue_scripts', array( 'EEH_Maps', 'espresso_google_map_js' ), 11 );
			}
		}
	}


	/**
	 * 	template_include
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function template_include( $template_path ) {

		if ( get_post_type() == 'espresso_venues' ) {
			if ( is_archive() ) {
				// check if the template file exists in the theme first
				if ( ! $template_path = locate_template( array( 'archive-espresso_venues.php' ))) {
					// otherwise get it from 
					$template_path = EVENT_DETAILS_TEMPLATES_PATH . 'archive-espresso_venues.php';
				}
			} else if ( is_archive() ) {
				// check if the template file exists in the theme first
				if ( ! $template_path = locate_template( array( 'archive-espresso_venues.php' ))) {
					// otherwise get it from 
					$template_path = EVENT_DETAILS_TEMPLATES_PATH . 'archive-espresso_venues.php';
				}
			} 
		}
		return $template_path;
	}

	


}
// End of file EED_Venues_Archive.module.php
// Location: /modules/venues_archive/EED_Venues_Archive.module.php