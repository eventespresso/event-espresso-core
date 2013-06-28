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
 * @subpackage	/shortcodes/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Events  extends EES_Shortcode {
	
	/**
	 * 	register_shortcode - makes core aware of this shortcode
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function register_shortcode() {
		EE_Front_Controller::register_shortcode(  __CLASS__ , __FILE__ );
	}

	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
//		add_filter( 'FHEE_run_EE_wp', '__return_true' );
//		add_filter( 'FHEE_load_EE_Session', '__return_true' );
		// grab copy of  request
		$EE = EE_Front_Controller::get_static_registry();
		// check current post name vs events page
		if ( $EE->REQ->is_set( 'post_name' )) {
			// post_name == events
			if ( $EE->REQ->get( 'post_name' ) == $EE->CFG->events_page ) {
				// load event list
				add_filter( 'AHEE__Front_Controller__process_request__modules', array( 'EES_Espresso_Events', 'load_event_list' ), 10, 1 );
			// post_name == event 
			} else if ( $EE->REQ->get( 'post_name' )  == $EE->CFG->event_page ) {
				// load event details page
				add_filter( 'AHEE__Front_Controller__process_request__modules', array( 'EES_Espresso_Events', 'load_event_details' ), 10, 1 );
			}
		}

	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}

	/**
	 * 	filter_shortcodes
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function load_shortcodes( $shortcodes ) {
		return $shortcodes;
	}

	/**
	 * 	load_event_list - filter_modules
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function load_event_list( $modules ) {
		$modules[] = 'Event_List';
		return $modules;
	}

	/**
	 * 	load_event_list - filter_modules
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function load_event_details( $modules ) {
		$modules[] = 'Event_Details';
		return $modules;
	}



	/**
	 * 	init - initial shortcode module setup called during "init" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		$this->ouput =  '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}



	/**
	 * 	process_shortcode - EVENT_LIST - Returns a list of events
	 * 
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {
		//event_espresso_get_event_details( $attributes );
		//return '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		return $this->ouput;		
	}

	
	


}
// End of file EES_Espresso_Events.shortcode.php
// Location: /shortcodes/EES_Espresso_Events.shortcode.php