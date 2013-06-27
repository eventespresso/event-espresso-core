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
 * @package			Event Espresso
 * @subpackage	/modules/event_list/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Event_List  extends EED_Module {

	/**
	 * 	register_module - makes core aware of this module
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function register_module() {
		EE_Front_Controller::register_module(  __CLASS__ , __FILE__ );
	}

	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_filter( 'FHEE_run_EE_wp', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
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
	 * 	init - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		define( 'EVENT_LIST_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_LIST_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
		add_filter( 'FHEE_load_org_options', '__return_true' );
		add_filter( 'FHEE_load_css', '__return_true' );
//		add_filter( 'FHEE_run_EE_wp', '__return_true' );
//		add_filter( 'FHEE_load_EE_Session', '__return_true' );
//		add_action( 'wp_loaded', array( $this, 'wp_loaded' ));
//		add_action( 'wp', array( $this, 'wp' ));
//		add_filter( 'the_content', array( $this, 'the_content' ));
		// parse_request
		add_filter( 'request', array( $this, 'filter_request' )); 
		remove_all_filters( 'excerpt_length' );
		add_filter( 'excerpt_length', array( $this, 'excerpt_length' ), 10 );
		add_filter('excerpt_more', array( $this, 'excerpt_more' ), 10 );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		add_filter( 'template_include', array( $this, 'template_include' ), 1 );
		//$this->ouput =  '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}



	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_request(  $req  ) {
		//printr( $req, '$req  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	    if ( isset( $req['pagename'] ) && $req['pagename'] == $this->EE->CFG->events_page ) {
	 		unset( $req['pagename'] );
	 		$req['post_type'] = 'espresso_events';
		}       
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
		if ( apply_filters( 'FHEE_enable_default_espresso_css', FALSE )) {
			if ( is_archive() ) {
				// first check uploads folder
				if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . 'templates/event_list.css' )) {
					wp_register_style( 'espresso_event_list', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_list.css', array() );
					wp_register_script( 'espresso_event_list', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_list.js', array( 'blocksit' ), '1.0', FALSE  );
				} else {
					wp_register_style( 'espresso_event_list', EVENT_LIST_ASSETS_URL . 'espresso_event_list.css', array() );
					wp_register_script( 'espresso_event_list', EVENT_LIST_ASSETS_URL . 'espresso_event_list.js', array( 'blocksit' ), '1.0', FALSE );
				}
				wp_register_script( 'blocksit', EVENT_LIST_ASSETS_URL . 'blocksit.min.js', array( 'jquery' ), '1.0', FALSE );
				wp_enqueue_style( 'espresso_event_list' );
				wp_enqueue_script( 'blocksit' );
				wp_enqueue_script( 'espresso_event_list' );
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
					$template_path = EVENT_LIST_TEMPLATES_PATH . 'single-espresso_events.php';
				}
			} else if ( is_archive() ) {
				// check if the template file exists in the theme first
				if ( ! $template_path = locate_template( array( 'archive-espresso_events.php' ))) {
					// otherwise get it from 
					$template_path = EVENT_LIST_TEMPLATES_PATH . 'archive-espresso_events.php';
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
// End of file EED_Event_List.module.php
// Location: /modules/event_list/EED_Event_List.module.php