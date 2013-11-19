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
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
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
	 * 	process_request
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function process_request() {
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
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( WP $WP ) {
	}



	/**
	 * 	process_shortcode - ESPRESSO_EVENTS
	 * 
	 * 	[ESPRESSO_EVENTS]
	 *  
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {
		//event_espresso_get_event_details( $attributes );
		return $this->ouput;		
	}

	
	


}
// End of file EES_Espresso_Events.shortcode.php
// Location: /shortcodes/EES_Espresso_Events.shortcode.php