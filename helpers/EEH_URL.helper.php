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
 * EEH_URL Helper
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEH_URL {

	/**
	 * 	@var 	array	$uri_segment_array 	URL segments
	 *  @access 	private
	 */
	private static $uri_segment_array = array();

	/**
	 * 	@var 	boolean	$_is_espresso_page
	 *  @access 	private
	 */
	private static $_is_espresso_page = FALSE;






	/**
	 * 		get_current_full_url
	 *
	 * 		@access private
	 * 		@return void
	 */
	public static function get_current_full_url( $return_all = FALSE ) {  
		$current_URL = ! isset( $_SERVER['HTTPS'] ) || $_SERVER['HTTPS'] != 'on' ? 'http://' : 'https://';
		if ( isset( $_SERVER['SERVER_PORT'] ) && $_SERVER['SERVER_PORT'] != '80' ) {
			$current_URL .= $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . $_SERVER['REQUEST_URI'];		
		} else {
			$current_URL .= $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
		}
		$current_URL = esc_url_raw( $current_URL );
		if ( $return_all ) {
			return $current_URL;
		} else {
			$current_URL = explode( '?', $current_URL );	
		    return $current_URL[0];		
		}
	}



	/**
	 * 		_generate_uri_segment_aray
	 *
	 * 		@access private
	 * 		@return void
	 */
	private static function _generate_uri_segment_aray() {
		// start with full url
		$raw_uri = self::get_current_full_url();
		// first strip home_url() from raw URL
		$raw_uri = str_replace( home_url(), '', $raw_uri );
		// create array from url segments, not including domain
		 self::$uri_segment_array = explode( '/', trim( $raw_uri,  '/' ));
	}



	/**
	 * 		_get_current_post
	 *
	 * 		@access private
	 * 		@return void
	 */
	public static function get_current_post_id() {
		// ensure _uri_segment_array is set
		if ( empty( self::$uri_segment_array )) {
			self::_generate_uri_segment_aray();
		}
		// flip it so that we can work from the outer most segment in
		$uri_segments = array_reverse(  self::$uri_segment_array );
		// cycle thru segments till we find a post
		foreach( $uri_segments as $uri_segment ) {
			// can we get a page_id ?
			if ( $page_id = self::_get_page_id_from_slug( $uri_segment )) {
				break;
			}
		}
		return $page_id;
	}



	/**
	 * 		get_current_post_name
	 *
	 * 		@access public
	 * 		@return void
	 */
	public static function get_current_post_name() {
		// ensure _uri_segment_array is set
		if ( empty(  self::$uri_segment_array )) {
			self::_generate_uri_segment_aray();
		}
		// return last segment of uri array
		return  self::$uri_segment_array[ count(  self::$uri_segment_array ) - 1 ];
	}


	/**
	 * 		_get_page_id_from_slug
	 *
	 * 		@access private
	 * 		@return void
	 */
	private static function _get_page_id_from_slug( $event_page_slug = FALSE ) {
		// find post if it exists
		$event_page = get_page_by_path( $event_page_slug );
		// grab page_id if it's set
		$page_id = isset( $event_page->ID ) ? absint( $event_page->ID ) : FALSE;
		return $page_id;
	}


	/**
	 * 		test_for_espresso_page
	 *
	 * 		@access public
	 * 		@return mixed
	 */
	public static function test_for_espresso_page( $current_request = FALSE ) {
		self::$_is_espresso_page = FALSE;
		// load espresso CPT endpoints
		$espresso_CPT_endpoints = EE_CPT_Strategy::instance()->get_CPT_endpoints();
		// load all pages using espresso shortcodes
		$post_shortcodes = isset( EE_Registry::instance()->CFG->core->post_shortcodes ) ? EE_Registry::instance()->CFG->core->post_shortcodes : array();
		// make sure core pages are included 
		$espresso_pages = array_merge( $espresso_CPT_endpoints, $post_shortcodes );
		// was a post name passed ?
		if ( ! $current_request || empty( $current_request )) {
			// ensure _uri_segment_array is set
			if ( empty(  self::$uri_segment_array )) {
				self::_generate_uri_segment_aray();
			}
			// cycle thru segments till we find a post
			foreach(  self::$uri_segment_array as $uri_segment ) {
				// can we get a page_id ?
				if ( isset( $espresso_pages[ $uri_segment ] )) {
					self::$_is_espresso_page = $uri_segment;
					break;
				}
			}		
		} else if ( in_array( $current_request, $espresso_pages )) {
			 self::$_is_espresso_page = $current_request;
		}

		return self::$_is_espresso_page;
	}


	
	/**
	 * 	is_espresso_page
	 *
	 *  @access 	public
	 *  @return 	mixed
	 */
	public static function is_espresso_page() {
		return self::$_is_espresso_page;
	}


	
	

	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __set($a,$b) { return FALSE; }
	public function __get($a) { return FALSE; }
	public function __isset($a) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }	
	public function __destruct() { return FALSE; }		

}
// End of file EEH_URL.helper.php
// Location: /helpers/EEH_URL.helper.php