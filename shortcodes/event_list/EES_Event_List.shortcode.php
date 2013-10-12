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
 * EVENT_LIST 
 *
 * @package			Event Espresso
 * @subpackage	/shortcodes/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EES_Event_List  extends EES_Shortcode {

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
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		//add_filter( 'the_content', array( $this, 'the_content' ));
		$this->EE->REQ->set( 'ee', 'event_list' );
	}



	/**
	 * 	process_shortcode - EVENT_LIST - Returns a list of events
	 * 
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		// get attributes and merge  with defaults
//		extract( shortcode_atts( array(
//				'single_event_id' => __('No ID Supplied', 'event_espresso')
//		), $attributes ));
		return $this->EE->REQ->output;		
	}	


}
// End of file EES_Event_List.shortcode.php
// Location: /shortcodes/EES_Event_List.shortcode.php