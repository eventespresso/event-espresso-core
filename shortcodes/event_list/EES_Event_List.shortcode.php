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
		// this will trigger the EED_Event_list->event_list() method during the pre_get_posts hook point, 
		// this allows us initialize things, enqueue assets, etc, 
		// as well, this saves an instantiation of the module in an array using 'event_list' as the key, so that we can retrieve it
		$this->EE->REQ->set( 'ee', 'event_list' );
		remove_action( 'AHEE__archive_espresso_events__before', 'get_header', 1 );
		remove_action( 'AHEE__archive_espresso_events__after', 'get_footer', 100 );
	}



	/**
	 * 	process_shortcode - EVENT_LIST - Returns a list of events
	 * 	[EVENT_LIST]
	 * 	[EVENT_LIST title="My Super Event"]
	 * 	[EVENT_LIST limit=5]
	 * 	[EVENT_LIST css_class="my-custom-class"]
	 * 	[EVENT_LIST month="October 2104"]
	 * 	[EVENT_LIST show_expired=true]
	 * 	[EVENT_LIST category_slug="free-events"]
	 * 	[EVENT_LIST order_by="start_date,id"]
	 * 	[EVENT_LIST sort="ASC"]
	 * 	[EVENT_LIST list_type="grid"]
	 * 
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {

		$default_event_list_shortcode_atts = array(
			'title' => NULL,
			'limit' => 10,
			'css_class' => NULL,
			'show_expired' => FALSE,
			'month' => NULL,
			'category_slug' => NULL,
			'order_by' => 'start_date',
			'sort' => 'ASC',
			'list_type' =>'text'
		);
		// allow the defaults to be filtered
		$default_event_list_shortcode_atts = apply_filters( 'EES_Event_List__process_shortcode__default_event_list_shortcode_atts', $default_event_list_shortcode_atts );
		// grab attributes and merge with defaults, then extract
		$attributes = shortcode_atts( $default_event_list_shortcode_atts, $attributes );

		// run the query
		global $wp_query;
		$wp_query = new EE_Event_List_Query( $attributes );
		//d( $wp_query );
		// turn on the output buffer
		ob_start();
		// load our template
		$template_part = EED_Events_Archive::get_template_part();
		if ( file_exists( get_stylesheet_directory() . 'espresso_events/' . $template_part )) {
			include( get_stylesheet_directory() . 'espresso_events/' . $template_part );
		} else {
			include( EVENT_ESPRESSO_TEMPLATES . 'espresso_events/' . $template_part );
		}
		// now reset the query and postdata
		wp_reset_query();
		wp_reset_postdata();		
		// pull our content from the output buffer and return it
		return ob_get_clean();		
	}	




}
// End of file EES_Event_List.shortcode.php
// Location: /shortcodes/EES_Event_List.shortcode.php