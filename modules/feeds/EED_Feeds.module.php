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
 * @subpackage	/modules/feeds/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Feeds  extends EED_Module {



	/**
	 * @return EED_Feeds
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'parse_request', array( 'EED_Feeds', 'parse_request' ), 10 );
		add_filter( 'default_feed', array( 'EED_Feeds', 'default_feed' ), 10, 1  );
		add_filter( 'comment_feed_join', array( 'EED_Feeds', 'comment_feed_join' ), 10, 2 );
		add_filter( 'comment_feed_where', array( 'EED_Feeds', 'comment_feed_where' ), 10, 2 );
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
	 * 	default_feed
	 *
	 *  @access 	public
	 *  @param 	type	rss2, atom, rss, rdf, rssjs
	 *  @return 	string
	 */
	public static function default_feed( $type = 'rss2' ) {
		 //rss2, atom, rss, rdf, rssjs
		$type = 'rss2';
		return $type;
	}




	/**
	 * 	parse_request
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function parse_request() {
		if ( EE_Registry::instance()->REQ->is_set( 'post_type' )) {
			// define path to templates
			define( 'RSS_FEEDS_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
			// what kinda post_type are we dealing with ?
			switch( EE_Registry::instance()->REQ->get( 'post_type' )) {
				case 'espresso_events' :
					// for rss2, atom, rss, rdf
					add_filter( 'the_excerpt_rss', array( 'EED_Feeds', 'the_event_feed' ), 10, 1 );
					add_filter( 'the_content_feed', array( 'EED_Feeds', 'the_event_feed' ), 10, 1 );
					// for json ( also uses the above filter )
					add_filter( 'rssjs_feed_item', array( 'EED_Feeds', 'the_event_rssjs_feed' ), 10, 1 );
					break;
				case 'espresso_venues' :
					// for rss2, atom, rss, rdf
					add_filter( 'the_excerpt_rss', array( 'EED_Feeds', 'the_venue_feed' ), 10, 1 );
					add_filter( 'the_content_feed', array( 'EED_Feeds', 'the_venue_feed' ), 10, 1 );
					// for json ( also uses the above filter )
					add_filter( 'rssjs_feed_item', array( 'EED_Feeds', 'the_venue_rssjs_feed' ), 10, 1 );
					break;
			}
		}
	}




	/**
	 * 	comment_feed_join - EVEN THOUGH... our espresso_attendees custom post type is set to NOT PUBLIC
	 * 	WordPress thought it would be a good idea to display the comments for them in the RSS feeds... we think NOT
	 * 	so this little snippet of SQL taps into the comment feed query and removes comments for the espresso_attendees post_type
	 *
	 *  @access 	public
	 *  @param 	string 	$SQL	the JOIN clause for the comment feed query
	 *  @return 	void
	 */
	public static function comment_feed_join( $SQL ) {
		global $wpdb;
		// check for wp_posts table in JOIN clause
		if ( strpos( $SQL, $wpdb->posts ) !== FALSE ) {
			add_filter( 'EED_Feeds__comment_feed_where__espresso_attendees', '__return_true' );
		}
		return $SQL;
	}




	/**
	 * 	comment_feed_where - EVEN THOUGH... our espresso_attendees custom post type is set to NOT PUBLIC
	 * 	WordPress thought it would be a good idea to display the comments for them in the RSS feeds... we think NOT
	 * 	so this little snippet of SQL taps into the comment feed query and removes comments for the espresso_attendees post_type
	 *
	 *  @access 	public
	 *  @param 	string 	$SQL	the WHERE clause for the comment feed query
	 *  @return 	void
	 */
	public static function comment_feed_where( $SQL ) {
		global $wp_query, $wpdb;
		if ( $wp_query->is_comment_feed && apply_filters( 'EED_Feeds__comment_feed_where__espresso_attendees', FALSE )) {
			$SQL .= " AND $wpdb->posts.post_type != 'espresso_attendees'";
		}
		return $SQL;
	}




	/**
	 * 	the_event_feed
	 *
	 *  @access 	public
	 *  @param 	string 	$content
	 *  @return 	void
	 */
	public static function the_event_feed( $content ) {
		if ( is_feed() && is_readable( RSS_FEEDS_TEMPLATES_PATH . 'espresso_events_feed.template.php' )) {
 			global $post;
			$template_args = array(
				'EVT_ID' => $post->ID,
				'event_description' => get_option('rss_use_excerpt') ? $post->post_excerpt : $post->post_content
			);
			$content = EEH_Template::display_template( RSS_FEEDS_TEMPLATES_PATH . 'espresso_events_feed.template.php', $template_args, TRUE );
		}
		return  $content;
	}




	/**
	 * 	the_event_rssjs_feed
	 *
	 *  @access 	public
	 *  @param 	object 	$item
	 *  @return 	void
	 */
	public static function the_event_rssjs_feed( $item ) {
		if ( is_feed() && isset( $item->description )) {
			$item->description = EED_Feeds::the_event_feed( $item->description );
		}
		return $item;
	}




	/**
	 * 	the_venue_feed
	 *
	 *  @access 	public
	 *  @param 	string 	$content
	 *  @return 	void
	 */
	public static function the_venue_feed( $content ) {
		if ( is_feed() && is_readable( RSS_FEEDS_TEMPLATES_PATH . 'espresso_venues_feed.template.php' )) {
 			global $post;
			$template_args = array(
				'VNU_ID' => $post->ID,
				'venue_description' => get_option('rss_use_excerpt') ? $post->post_excerpt : $post->post_content
			);
			$content = EEH_Template::display_template( RSS_FEEDS_TEMPLATES_PATH . 'espresso_venues_feed.template.php', $template_args, TRUE );
		}
		return $content;
	}




	/**
	 * 	the_venue_rssjs_feed
	 *
	 *  @access 	public
	 *  @param 	object 	$item
	 *  @return 	void
	 */
	public static function the_venue_rssjs_feed( $item ) {
		if ( is_feed() && isset( $item->description )) {
			$item->description = EED_Feeds::the_venue_feed( $item->description );
		}
		return $item;
	}



}
// End of file EED_Feeds.module.php
// Location: /modules/feeds/EED_Feeds.module.php