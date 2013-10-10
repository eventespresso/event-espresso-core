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
 * Event Details
 *
 * @package			Event Espresso
 * @subpackage	/modules/event_details/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Event_Details  extends EED_Module {


	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		define( 'EVENT_DETAILS_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_DETAILS_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
		add_filter( 'FHEE_run_EE_wp', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		EE_Config::register_route( 'event', 'Event_Details', 'run' );
		EE_Config::register_view( 'event', 0, EVENT_DETAILS_TEMPLATES_PATH . 'single-espresso_events.template.php' );
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
//		add_filter( 'FHEE_load_ee_config', '__return_true' );
//		add_filter( 'FHEE_load_css', '__return_true' );
//		add_filter( 'FHEE_run_EE_wp', '__return_true' );
//		add_filter( 'FHEE_load_EE_Session', '__return_true' );
//		add_action( 'wp_loaded', array( $this, 'wp_loaded' ));
//		add_action( 'wp', array( $this, 'wp' ));
//		add_filter( 'the_content', array( $this, 'the_content' ));
		// parse_request
//		add_filter( 'request', array( $this, 'filter_request' )); 
//		remove_all_filters( 'excerpt_length' );
//		add_filter( 'excerpt_length', array( $this, 'excerpt_length' ), 10 );
//		add_filter('excerpt_more', array( $this, 'excerpt_more' ), 10 );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
//		add_filter( 'template_include', array( $this, 'template_include' ), 1 );
		//$this->ouput =  '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}



	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_request(  $req  ) {

	    return $req;
	}


	/**
	 * 	all_events
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function all_events() {
		$this->ouput .= '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		$this->ouput .= '<h4>currency_symbol : ' . $this->EE->CFG->currency_symbol . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';		
	}



	/**
	 * 	wp_loaded
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_loaded() {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}



	/**
	 * 	wp
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp() {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}


	/**
	 * 	excerpt_length
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function excerpt_length( $length ) {
		return 28;
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
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {

		// get some style
		if ( apply_filters( 'FHEE_enable_default_espresso_css', TRUE )) {
			if ( is_single() ) {
				// first check uploads folder
				if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . 'templates/event_details.css' )) {
					wp_register_style( 'espresso_event_details', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_details.css', array() );
					wp_register_script( 'espresso_event_details', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_details.js', array('espresso_core'), '1.0', TRUE  );
				} else {
					wp_register_style( 'espresso_event_details', EVENT_DETAILS_ASSETS_URL . 'espresso_event_details.css', array() );
					wp_register_script( 'espresso_event_details', EVENT_DETAILS_ASSETS_URL . 'espresso_event_details.js', array('espresso_core'), '1.0', TRUE );
				}
				wp_enqueue_style( 'espresso_event_details' );
				wp_enqueue_script( 'espresso_event_details' );
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

		if ( get_post_type() == 'espresso_events' ) {
			if ( is_single() ) {
				// check if the template file exists in the theme first
				if ( ! $template_path = locate_template( array( 'single-espresso_events.php' ))) {
					// otherwise get it from 
					$template_path = EVENT_DETAILS_TEMPLATES_PATH . 'single-espresso_events.php';
				}
			} else if ( is_archive() ) {
				// check if the template file exists in the theme first
				if ( ! $template_path = locate_template( array( 'archive-espresso_events.php' ))) {
					// otherwise get it from 
					$template_path = EVENT_DETAILS_TEMPLATES_PATH . 'archive-espresso_events.php';
				}
			} 
		}
		return $template_path;
	}



	/**
	 * 	the_content
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_content( $content ) {
		//$content .= printr( $this->EE, 'EE_Registry  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$content .= $this->ouput;
		return $content;
	}
	
	


}
// End of file EED_Event_Details.module.php
// Location: /modules/event_details/EED_Event_Details.module.php