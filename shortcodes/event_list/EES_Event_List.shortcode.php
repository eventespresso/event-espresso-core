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
class EES_Event_List  extends EES_Shortcode {
	
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
		add_filter( 'AHEE__Front_Controller__process_request__modules', array( 'EES_Espresso_Events', 'load_event_list' ), 10, 1 );
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
	 * 	init - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
	}



	/**
	 * 	process_shortcode - EVENT_LIST - Returns a list of events
	 * 
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {
		return $this->ouput;		
	}	


}
// End of file EES_Event_List.shortcode.php
// Location: /shortcodes/EES_Event_List.shortcode.php