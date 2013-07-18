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
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		EE_Config::register_route( 'events', 'Event_List', 'run' );
		EE_Config::register_route( 'event_list', 'Event_List', 'event_list' );
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
	 * 	_initial_setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _initial_setup() {
		define( 'EVENT_LIST_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_LIST_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
		add_filter( 'FHEE_load_css', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		$this->EE->load_helper( 'Event_View' );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		remove_all_filters( 'excerpt_length' );
		add_filter( 'excerpt_length', array( $this, 'excerpt_length' ), 10 );
		add_filter('excerpt_more', array( $this, 'excerpt_more' ), 10 );
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run() {
		$this->_initial_setup();
		EE_Config::register_view( 'events', 0, EVENT_LIST_TEMPLATES_PATH . 'archive-espresso_events.template.php' );		
	}


				

	/**
	 * 	event_list
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function event_list() {
		
		global $wp_query;
		$this->EE->load_helper('Event_View');
		$this->_initial_setup();
		$args = array(
			'post_type' => 'espresso_events'
		);
		$wp_query = new WP_Query( $args );
//		printr( $wp_query, '$wp_query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$wp_query = EEH_Event_View::get_event_datetimes_and_prices_for_WP_Query( $wp_query );	
		ob_start();
		global $post;
		include( EVENT_LIST_TEMPLATES_PATH . 'archive-event_list.template.php' );
		$output = ob_get_clean();	
		$this->EE->REQ->output .= $output;
		wp_reset_query();
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
			// first check uploads folder
			if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . 'templates/event_list.css' )) {
				wp_register_style( 'espresso_event_list', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_list.css', array() );
				wp_register_script( 'espresso_event_list', EVENT_ESPRESSO_UPLOAD_URL . 'templates/espresso_event_list.js', array( 'blocksit' ), '1.0', TRUE  );
			} else {
				wp_register_style( 'espresso_event_list', EVENT_LIST_ASSETS_URL . 'espresso_event_list.css', array() );
				wp_register_script( 'espresso_event_list', EVENT_LIST_ASSETS_URL . 'espresso_event_list.js', array( 'blocksit' ), '1.0', TRUE );
			}
			wp_register_script( 'blocksit', EVENT_LIST_ASSETS_URL . 'blocksit.min.js', array( 'jquery' ), '1.0', TRUE );
			wp_enqueue_style( 'espresso_event_list' );
			wp_enqueue_script( 'blocksit' );
			wp_enqueue_script( 'espresso_event_list' );
		}

	}
	
	


}



// End of file EED_Event_List.module.php
// Location: /modules/event_list/EED_Event_List.module.php