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
		add_filter('FHEE__Config__update_config__CFG', array( 'EED_Event_List', 'filter_config' ), 10 );
		add_action( 'AHEE__general_settings_admin__template_settings__before_settings_form', array( 'EED_Event_List', 'template_settings_form' ), 10 );
		add_action( 'admin_init', array( 'EED_Event_List', 'set_definitions' ), 10 );
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function set_definitions() {
		define( 'EVENT_LIST_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'EVENT_LIST_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
	}



	/**
	 * 	_initial_setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _initial_setup() {
		$this->set_definitions();
		add_filter( 'FHEE_load_css', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		$this->EE->load_helper( 'Event_View' );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 10 );
		remove_all_filters( 'excerpt_length' );
		add_filter( 'excerpt_length', array( $this, 'excerpt_length' ), 10 );
		add_filter('excerpt_more', array( $this, 'excerpt_more' ), 10 );
		add_filter('the_excerpt', array( $this, 'the_excerpt' ), 999 );
//		printr( $this->EE->CFG->EED_Event_List, '$this->EE->CFG->EED_Event_List  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	}


	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run() {
		$this->_initial_setup();
		$tempate = isset( $this->EE->CFG->EED_Event_List['templates']['full'] ) && ! empty( $this->EE->CFG->EED_Event_List['templates']['full'] ) ? $this->EE->CFG->EED_Event_List['templates']['full'] : 'archive-espresso_events';
		EE_Config::register_view( 'events', 0, EVENT_LIST_TEMPLATES_PATH . $tempate . '.template.php' );	
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
		$tempate = isset( $this->EE->CFG->EED_Event_List['templates']['part'] ) && ! empty( $this->EE->CFG->EED_Event_List['templates']['part'] ) ? $this->EE->CFG->EED_Event_List['templates']['part'] : 'archive-event_list';
		include( EVENT_LIST_TEMPLATES_PATH . $tempate . '.template.php' );
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
	 * 	the_excerpt
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_excerpt( $the_excerpt ) {
		$display_address = isset( $this->EE->CFG->EED_Event_List['display_address'] ) ? $this->EE->CFG->EED_Event_List['display_address'] : TRUE;
		return $display_address ? $the_excerpt : '';			
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




	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function template_settings_form() {
		if ( ! isset( EE_Registry::instance()->CFG->EED_Event_List )) {
			//EE_Registry::instance()->CFG = $this->set_default_settings( EE_Registry::instance()->CFG );
			add_filter( 'FHEE__Event_List__template_settings_form__CFG', array( 'EED_Event_List', 'set_default_settings' ));
			EE_Registry::instance()->CFG = apply_filters( 'FHEE__Event_List__template_settings_form__CFG', EE_Registry::instance()->CFG );
		}
		espresso_display_template( EVENT_LIST_TEMPLATES_PATH . 'admin-event-list-settings.template.php', EE_Registry::instance()->CFG->EED_Event_List );
	}




	/**
	 * 	set_default_settings
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function set_default_settings( $CFG ) {
		//printr( $CFG, '$CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$CFG->EED_Event_List = array(
			'display_description' => isset( $CFG->EED_Event_List['display_description'] ) && ! empty( $CFG->EED_Event_List['display_description'] ) ? $CFG->EED_Event_List['display_description'] : FALSE,
			'display_exceprt' => isset( $CFG->EED_Event_List['display_exceprt'] ) && ! empty( $CFG->EED_Event_List['display_exceprt'] ) ? $CFG->EED_Event_List['display_exceprt'] : TRUE,
			'display_address' => isset( $CFG->EED_Event_List['display_address'] ) && ! empty( $CFG->EED_Event_List['display_address'] ) ? $CFG->EED_Event_List['display_address'] : FALSE,
			'templates' => array(
				'full'  => isset( $CFG->EED_Event_List['templates']['full'] ) && ! empty( $CFG->EED_Event_List['templates']['full'] ) ? $CFG->EED_Event_List['templates']['full'] : 'archive-espresso_events',
				'part'  => isset( $CFG->EED_Event_List['templates']['part'] ) && ! empty( $CFG->EED_Event_List['templates']['part'] ) ? $CFG->EED_Event_List['templates']['part'] : 'archive-event_list'
			)
		);
		return $CFG;
	}



	/**
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_config( $CFG ) {
		//printr( $CFG, '$CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$CFG->EED_Event_List = array(
			'display_description' => isset( $CFG->template_settings['display_description_in_event_list'] ) ? $CFG->template_settings['display_description_in_event_list'] : $CFG->EED_Event_List['display_description'],
			'display_exceprt' => isset( $CFG->template_settings['display_short_description_in_event_list'] ) ? $CFG->template_settings['display_short_description_in_event_list'] : $CFG->EED_Event_List['display_exceprt'],
			'display_address' => isset( $CFG->template_settings['display_address_in_event_list'] ) ? $CFG->template_settings['display_address_in_event_list'] : $CFG->EED_Event_List['display_address'],
			'templates' => array(
				'full'  => 'archive-espresso_events',
				'part'  => 'archive-event_list'
			)
		);
		unset( $CFG->template_settings['display_description_in_event_list'] );
		unset( $CFG->template_settings['display_short_description_in_event_list'] );
		unset( $CFG->template_settings['display_address_in_event_list'] );
		return $CFG;
	}




	/**
	 * 	filter_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_config_admin( $CFG ) {
		$CFG->EED_Event_List = array(
			'display_description' => isset( $REQ['display_description_in_event_list'] ) ? absint( $REQ['display_description_in_event_list'] ) : FALSE,
			'display_exceprt' => isset( $REQ['display_short_description_in_event_list'] ) ? absint( $REQ['display_short_description_in_event_list'] ) : TRUE,
			'display_address' => isset( $REQ['display_address_in_event_list'] ) ? absint( $REQ['display_address_in_event_list'] ) : FALSE,
			'templates' => array(
				'full'  => 'archive-espresso_events',
				'part'  => 'archive-event_list'
			)
		);		
		return $CFG;
	}
	
	


}





// End of file EED_Event_List.module.php
// Location: /modules/event_list/EED_Event_List.module.php