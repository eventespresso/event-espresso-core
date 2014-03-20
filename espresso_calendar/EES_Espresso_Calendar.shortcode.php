<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/*
 * ------------------------------------------------------------------------
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	EE4
 *
 * ------------------------------------------------------------------------
 *
 * EE_Calendar
 *
 * @package			Event Espresso
 * @subpackage		espresso-calendar
 * @author			Seth Shoultes, Chris Reynolds, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Calendar  extends EES_Shortcode {

	
	

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
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
	}



	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @param 	 WP $WP
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		add_action( 'wp_enqueue_scripts', array( EE_Calendar::instance(), 'calendar_scripts' ));
	}



	/**
	 * 	process_shortcode
	 * 	
	 * 	[ESPRESSO_CALENDAR]
	 * 	[ESPRESSO_CALENDAR show_expired="true"]
	 * 	[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function process_shortcode( $attributes = array() ) {
		$defaults = array( 
			'show_expired' => 'true', 
			'cal_view' => 'month', 
			'widget' => FALSE
		);
		// make sure $atts is an array
		$attributes = array_merge( $defaults, (array)$attributes );
		echo EE_Calendar::instance()->display_calendar( $attributes );
	}
	

}
// End of file EES_Espresso_Calendar.shortcode.php
// Location: /espresso_calendar/EES_Espresso_Calendar.shortcode.php