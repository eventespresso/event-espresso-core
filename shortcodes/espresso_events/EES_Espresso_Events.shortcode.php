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
	 *	@param 	EE_Registry $EE
	 *  @return 	void
	 */
	public function run( EE_Registry $EE = NULL ) {
		
		$this->ouput =  '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}



	/**
	 * 	process_shortcode - EVENT_LIST - Returns a list of events
	 * 
	 * 	[EVENT_LIST]
	 * 	[EVENT_LIST limit=1]
	 * 	[EVENT_LIST css_class=my-custom-class]
	 * 	[EVENT_LIST show_expired=true]
	 * 	[EVENT_LIST show_deleted=true]
	 * 	[EVENT_LIST show_secondary=true]
	 * 	[EVENT_LIST show_recurrence=true]
	 * 	[EVENT_LIST category_identifier=your_category_identifier]
	 *  
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {
		//event_espresso_get_event_details( $attributes );
		return '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		return $this->ouput;		
	}

	
	


}
// End of file EES_Espresso_Events.shortcode.php
// Location: /shortcodes/EES_Espresso_Events.shortcode.php