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
 * EE_Request_Handler
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Request_Handler {

	/**
	 * 	@var 	array	$_params 	$_REQUEST paramaters
	 *  	@access 	private
	 */
	private $_params = array();

	/**
	 * 	@var 	array	$_uri_array 	URL segments
	 *  	@access 	private
	 */
	private $_uri_segment_array = array();

	/**
	 * 	@var 	array 	$_espresso_CPT_pages
	 *  	@access 	private
	 */
	private $_espresso_CPT_pages = array();

	/**
	 * 	@var 	array 	$_is_espresso_page
	 *  	@access 	private
	 */
	private $_is_espresso_page = FALSE;

	/**
	 * 	@var 	array 	$_notice
	 *  	@access 	private
	 */
	private $_notice = array();


	
	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct( $post_shortcodes ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		// grab request vars
		$this->_params = $_REQUEST;
		// verify $post_shortcodes
//		if ( empty( $post_shortcodes )) {
//			$msg = __( 'An error has occured. The post shortcodes array is empty. Please ensure that the EE System has been loaded before using this function.', 'event_espresso' );
//			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
//			return $msg;
//		}
		$this->_set_espresso_CPT_pages();
		$this->_test_for_espresso_page( $post_shortcodes );
		// get current post name from URL
		$this->set( 'post_name', $this->_get_current_post_name() );
	}



	/**
	 * 	_set_espresso_CPT_pages - add CPT "slugs" to array of default espresso "pages"
	 *
	 * 	@access private
	 * 	@return array
	 */
	private function _set_espresso_CPT_pages() {
		// get CPT data
		$CPTs = EE_Register_CPTs::get_CPTs();
		//printr( $CPTs, '$CPTs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( is_array( $CPTs )) {
			foreach ( $CPTs as $CPT_type => $CPT ) {
				$this->_espresso_CPT_pages[ $CPT['singular_slug'] ] = $CPT_type;
				$this->_espresso_CPT_pages[ $CPT['plural_slug'] ] = $CPT_type;
			}
		}
	}


	/**
	 * 	_get_espresso_CPT_pages 
	 *
	 * 	@access public
	 * 	@return array
	 */
	public function get_espresso_CPT_pages() {
		return $this->_espresso_CPT_pages;
	}	




	/**
	 * 		_get_current_full_url
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _get_current_full_url( $return_all = FALSE ) {  
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
	private function _generate_uri_segment_aray() {
		// start with full url
		$raw_uri = $this->_get_current_full_url();
		// first strip home_url() from raw URL
		$raw_uri = str_replace( home_url(), '', $raw_uri );
		// create array from url segments, not including domain
		$this->_uri_segment_array = explode( '/', trim( $raw_uri,  '/' ));
	}



	/**
	 * 		_get_current_post
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _get_current_post_id() {
		// ensure _uri_segment_array is set
		if ( empty( $this->_uri_segment_array )) {
			$this->_generate_uri_segment_aray();
		}
		// flip it so that we can work from the outer most segment in
		$uri_segments = array_reverse( $this->_uri_segment_array );
		// cycle thru segments till we find a post
		foreach( $uri_segments as $uri_segment ) {
			// can we get a page_id ?
			if ( $page_id = $this->_get_page_id_from_slug( $uri_segment )) {
				break;
			}
		}
		return $page_id;
	}



	/**
	 * 		_get_page_id_from_slug
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _get_current_post_name() {
		// ensure _uri_segment_array is set
		if ( empty( $this->_uri_segment_array )) {
			$this->_generate_uri_segment_aray();
		}
		// return last segment of uri array
		return $this->_uri_segment_array[ count( $this->_uri_segment_array ) - 1 ];
	}


	/**
	 * 		_get_page_id_from_slug
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _get_page_id_from_slug( $event_page_slug = FALSE ) {
		// find post if it exists
		$event_page = get_page_by_path( $event_page_slug );
		// grab page_id if it's set
		$page_id = isset( $event_page->ID ) ? absint( $event_page->ID ) : FALSE;
		return $page_id;
	}


	/**
	 * 		_test_for_espresso_page
	 *
	 * 		@access public
	 * 		@return mixed
	 */
	public function _test_for_espresso_page( $post_shortcodes = array() ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		$this->_is_espresso_page = FALSE;
		// ensure _uri_segment_array is set
		if ( empty( $this->_uri_segment_array )) {
			$this->_generate_uri_segment_aray();
		}
//		printr( $post_shortcodes, '$post_shortcodes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// load all pages using espresso shortcodes
//		$espresso_pages = array_keys( $post_shortcodes );
//		printr( $espresso_pages, '$espresso_pages  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// make sure core pages are included 
		$espresso_pages = array_merge( $this->_espresso_CPT_pages, $post_shortcodes );
//		printr( $espresso_pages, '$espresso_pages  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// cycle thru segments till we find a post
		foreach( $this->_uri_segment_array as $uri_segment ) {
			// can we get a page_id ?
			if ( isset( $espresso_pages[ $uri_segment ] )) {
				$this->_is_espresso_page = $uri_segment;
				break;
			}
		}
	}


	
	/**
	 * 	is_espresso_page
	 *
	 *  @access 	public
	 *  @return 	mixed
	 */
	public function is_espresso_page() {
		return $this->_is_espresso_page;
	}


	
	/**
	 * 	setter
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function set( $key, $value ) {
		$this->_params[ $key ] = $value;
	}


	
	/**
	 * 	getter
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get( $key ) {
		return isset( $this->_params[ $key ] ) ? $this->_params[ $key ] : NULL;
	}


	
	/**
	 * 	check if param exists
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function is_set( $key ) {
		return isset( $this->_params[ $key ] ) ? TRUE : FALSE;
	}


	
	/**
	 * 	setter
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function set_notice( $key, $value ) {
		$this->_notice[ $key ] = $value;
	}


	
	/**
	 * 	getter
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_notice( $key ) {
		return isset( $this->_notice[ $key ] ) ? $this->_notice[ $key ] : NULL;
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
// End of file EE_Request_Handler.core.php
// Location: /core/EE_Request_Handler.core.php