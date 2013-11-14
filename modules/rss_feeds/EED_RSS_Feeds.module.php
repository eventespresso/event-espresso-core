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
 * @subpackage	/modules/rss_eeds/
 * @author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_RSS_Feeds  extends EED_Module {


	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'parse_request', array( 'EED_RSS_Feeds', 'parse_request' ), 10 );
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
//		add_filter( 'FHEE_load_ee_config', '__return_true' );
//		add_filter( 'FHEE_run_EE_wp', '__return_true' );
//		add_filter( 'FHEE_load_EE_Session', '__return_true' );
//		add_action( 'wp_loaded', array( $this, 'wp_loaded' ));
//		add_action( 'wp', array( $this, 'wp' ));
//		add_filter( 'the_content', array( $this, 'the_content' ));
	}




	/**
	 * 	parse_request
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function parse_request() {
		if ( EE_Registry::instance()->REQ->is_set( 'post_type' )) {
			define( 'RSS_FEEDS_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
			switch( EE_Registry::instance()->REQ->get( 'post_type' )) {
				
				case 'espresso_events' :
					add_filter( 'the_content', array( 'EED_RSS_Feeds', 'the_event_feed_content' ));
					break;
				
				case 'espresso_venues' :
					add_filter( 'the_content', array( 'EED_RSS_Feeds', 'the_venue_feed_content' ));
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
	public function the_event_feed_content( $content ) {
		if ( is_feed() ) {
			$this->EE->load_helper( 'Event_View' );
			EEH_Template::display_template( RSS_FEEDS_TEMPLATES_PATH . 'admin-event-list-settings.template.php', $EE->CFG->template_settings->EED_Event_List );
			$ID = get_the_ID();  
			$output = '<div><h3>Find me on</h3>';  
			$output .= '<p><strong>Facebook:</strong> ' . get_post_meta($ID, 'facebook_url', true) . '</p>';  
			$output .= '<p><strong>Google:</strong> ' . get_post_meta($post_id, 'google_url', true) . '</p>';  
			$output .= '<p><strong>Twitter:</strong> ' . get_post_meta($post_id, 'twitter_url', true) . '</p>';  
			$output .= '</div>';  
			$content = $content.$output;  
		}  
		return $content;
	}




	/**
	 * 	the_venue_feed_content
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_venue_feed_content( $content ) {
		if ( is_feed() ) {
			$this->EE->load_helper( 'Venue_View' );
			$ID = get_the_ID();  
			$output = '<div><h3>Find me on</h3>';  
			$output .= '<p><strong>Facebook:</strong> ' . get_post_meta($ID, 'facebook_url', true) . '</p>';  
			$output .= '<p><strong>Google:</strong> ' . get_post_meta($post_id, 'google_url', true) . '</p>';  
			$output .= '<p><strong>Twitter:</strong> ' . get_post_meta($post_id, 'twitter_url', true) . '</p>';  
			$output .= '</div>';  
			$content = $content.$output;  
		}  
		return $content;
	}
	
	


}
// End of file RSS_Feeds.module.php
// Location: /modules/rss_eeds/RSS_Feeds.module.php