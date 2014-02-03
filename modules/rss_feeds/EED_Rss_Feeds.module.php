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
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event List
 *
 * @package		Event Espresso
 * @subpackage	/modules/rss_feeds/
 * @author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Rss_Feeds  extends EED_Module {


	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'parse_request', array( 'EED_Rss_Feeds', 'parse_request' ), 10 );
		define( 'RSS_FEEDS_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
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
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
	}




	/**
	 * 	parse_request
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function parse_request() {
		if ( EE_Registry::instance()->REQ->is_set( 'post_type' )) {		
			switch( EE_Registry::instance()->REQ->get( 'post_type' )) {			
				case 'espresso_events' :
					add_filter( 'the_content_feed', array( 'EED_Rss_Feeds', 'the_event_feed_content' ), 10, 1 );
					break;
				case 'espresso_venues' :
					add_filter( 'the_content_feed', array( 'EED_Rss_Feeds', 'the_venue_feed_content' ), 10, 1 );
					break;
			}
		}
	}




	/**
	 * 	the_event_feed_content
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function the_event_feed_content( $content ) {
		if ( is_feed() ) {
			EE_Registry::instance()->load_helper( 'Event_View' );
			EE_Registry::instance()->load_helper( 'Venue_View' );
 			global $post;
			$template_args = array( 
				'EVT_ID' => $post->ID,
				'event_description' => $post->post_content,
				'event_excerpt' => $post->post_excerpt
			);
			$content = EEH_Template::display_template( RSS_FEEDS_TEMPLATES_PATH . 'espresso_events_feed.template.php', $template_args, TRUE );
		}  
		return  $content;
	}




	/**
	 * 	the_venue_feed_content
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function the_venue_feed_content( $content ) {
		if ( is_feed() ) {
			EE_Registry::instance()->load_helper( 'Event_View' );
			EE_Registry::instance()->load_helper( 'Venue_View' );
 			global $post;
			$template_args = array( 
				'VNU_ID' => $post->ID,
				'venue_description' => $post->post_content
			);
			$content = EEH_Template::display_template( RSS_FEEDS_TEMPLATES_PATH . 'espresso_venues_feed.template.php', $template_args, TRUE );

		}  
		return $content;
	}
	
	


}
// End of file EED_Rss_Feeds.module.php
// Location: /modules/rss_feeds/EED_Rss_Feeds.module.php
