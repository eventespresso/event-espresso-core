<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Event Espresso
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 4.0
 *
 * ------------------------------------------------------------------------
 *
 * class EE_Request_Handler
 *
 * @package         Event Espresso
 * @subpackage  /core/
 * @author          Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
final class EE_Request_Handler {

	/**
	 * 	@var 	array	$_params 	$_REQUEST parameters
	 *  @access 	private
	 */
	private $_params = array();

	/**
	 * 	@var 	array 	$_notice
	 *  @access 	private
	 */
	private $_notice = array();

	/**
	 * 	rendered output to be returned to WP
	 *	@var 	string
	 * 	@access 	private
	 */
	private $_output = '';

	/**
	 * 	whether current request is via AJAX
	 *	@var 	boolean
	 * 	@access public
	 */
	public $ajax = FALSE;

	/**
	 * 	whether current request is via AJAX from the frontend of the site
	 *	@var 	boolean
	 * 	@access public
	 */
	public $front_ajax = FALSE;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param WP_Query $wp
	 * @return \EE_Request_Handler
	 */
	public function __construct( $wp = NULL ) {
		//if somebody forgot to provide us with WP, that's ok because its global
		if( ! $wp){
			global $wp;
		}
		// grab request vars
		$this->_params = $_REQUEST;
		// AJAX ???
		$this->ajax = defined( 'DOING_AJAX' ) ? TRUE : FALSE;
		$this->front_ajax = $this->is_set( 'ee_front_ajax' ) && $this->get( 'ee_front_ajax' ) == 1 ? TRUE : FALSE;
		$this->set_request_vars( $wp );
		do_action( 'AHEE__EE_Request_Handler__construct__complete' );
	}



	/**
	 *    set_request_vars
	 *
	 * @access public
	 * @param WP_Query $wp
	 * @return void
	 */
	public function set_request_vars( $wp = NULL ) {
		if ( ! is_admin() ) {
			// set request post_id
			$this->set( 'post_id', $this->get_post_id_from_request( $wp ));
			// set request post name
			$this->set( 'post_name', $this->get_post_name_from_request( $wp ));
			// set request post_type
			$this->set( 'post_type', $this->get_post_type_from_request( $wp ));
			// TRUE or FALSE ? is this page being used by EE ?
			$this->set_espresso_page();
		}
	}



	/**
	 *    get_post_id_from_request
	 *
	 * @access public
	 * @param WP_Query $wp
	 * @return int
	 */
	public function get_post_id_from_request( $wp = NULL ) {
		if( ! $wp){
			global $wp;
		}
		$post_id = NULL;
		if ( isset( $wp->query_vars['p'] )) {
			$post_id = $wp->query_vars['p'];
		}
		if ( ! $post_id && isset( $wp->query_vars['page_id'] )) {
			$post_id = $wp->query_vars['page_id'];
		}
		if ( ! $post_id && isset( $wp->request )) {
			if ( is_numeric( basename( $wp->request ))) {
				$post_id = basename( $wp->request );
			}
		}
		return $post_id;
	}



	/**
	 *    get_post_name_from_request
	 *
	 * @access public
	 * @param WP_Query $wp
	 * @return string
	 */
	public function get_post_name_from_request( $wp = NULL ) {
		if( ! $wp){
			global $wp;
		}
		$post_name = NULL;
		if ( isset( $wp->query_vars['name'] ) && ! empty( $wp->query_vars['name'] )) {
			$post_name = $wp->query_vars['name'];
		}
		if ( ! $post_name && isset( $wp->query_vars['pagename'] ) && ! empty( $wp->query_vars['pagename'] )) {
			$post_name = $wp->query_vars['pagename'];
		}
		if ( ! $post_name && isset( $wp->request ) && ! empty( $wp->request )) {
			$possible_post_name = basename( $wp->request );
			if ( ! is_numeric( $possible_post_name )) {
				global $wpdb;
				$SQL = 'SELECT ID from ' . $wpdb->posts . ' WHERE post_status="publish" AND post_name=%d';
				$possible_post_name = $wpdb->get_var( $wpdb->prepare( $SQL, $possible_post_name ));
				if ( $possible_post_name ) {
					$post_name = $possible_post_name;
				}
			}
		}
		if ( ! $post_name && $this->get( 'post_id' )) {
			global $wpdb;
			$SQL = 'SELECT post_name from ' . $wpdb->posts . ' WHERE post_status="publish" AND ID=%d';
			$possible_post_name = $wpdb->get_var( $wpdb->prepare( $SQL, $this->get( 'post_id' )));
			if( $possible_post_name ) {
				$post_name = $possible_post_name;
			}
		}
		return $post_name;
	}



	/**
	 *    get_post_type_from_request
	 *
	 * @access public
	 * @param WP_Query $wp
	 * @return mixed
	 */
	public function get_post_type_from_request( $wp = NULL ) {
		if( ! $wp){
			global $wp;
		}
		return isset( $wp->query_vars['post_type'] ) ? $wp->query_vars['post_type'] : NULL;
	}


	/**
	 * 		test_for_espresso_page
	 *
	 * 		@access public
	 * 		@return bool
	 */
	public function test_for_espresso_page() {
		// load espresso CPT endpoints
		$espresso_CPT_endpoints = EE_Registry::instance()->load_core('CPT_Strategy')->get_CPT_endpoints();
		$post_type_CPT_endpoints = array_flip( $espresso_CPT_endpoints );
		$post_types = (array)$this->get( 'post_type' );
		foreach ( $post_types as $post_type ) {
			// was a post name passed ?
			if ( isset( $post_type_CPT_endpoints[ $post_type ] ) ) {
				// kk we know this is an espresso page, but is it a specific post ?
				if ( ! $this->get( 'post_name' ) ) {
					// there's no specific post name set, so maybe it's one of our endpoints like www.domain.com/events
					$post_name = isset( $post_type_CPT_endpoints[ $this->get( 'post_type' ) ] ) ? $post_type_CPT_endpoints[ $this->get( 'post_type' ) ] : NULL;
					// if the post type matches on of our then set the endpoint
					if ( $post_name ) {
						$this->set( 'post_name', $post_name );
					}
				}
				return TRUE;
			}
		}
		if ( $this->get( 'post_name' )) {
			// load all pages using espresso shortcodes
			$post_shortcodes = isset( EE_Registry::instance()->CFG->core->post_shortcodes ) ? EE_Registry::instance()->CFG->core->post_shortcodes : array();
			// make sure core pages are included
			$espresso_pages = array_merge( $espresso_CPT_endpoints, $post_shortcodes );
			// was a post name passed ?
			if (  isset( $espresso_pages[ $this->get( 'post_name' ) ] )) {
				 return TRUE;
			}
		}
		return FALSE;
	}



	/**
	 *    is_espresso_page
	 *
	 * @access    public
	 * @param null $value
	 * @return    mixed
	 */
	public function set_espresso_page( $value = NULL ) {
		$value = $value ? $value : $this->test_for_espresso_page();
		$this->_params['is_espresso_page'] = $value;
	}



	/**
	 * 	is_espresso_page
	 *
	 *  @access 	public
	 *  @return 	mixed
	 */
	public function is_espresso_page() {
		return isset( $this->_params['is_espresso_page'] ) ? $this->_params['is_espresso_page'] : FALSE;
	}



	/**
	 *    setter
	 *
	 * @access    public
	 * @param      $key
	 * @param      $value
	 * @param bool $override_ee
	 * @return    void
	 */
	public function set( $key, $value, $override_ee = FALSE ) {
		// don't allow "ee" to be overwritten unless explicitly instructed to do so
		if ( $key != 'ee' || ( $key == 'ee' && empty( $this->_params['ee'] )) || ( $key == 'ee' && ! empty( $this->_params['ee'] ) && $override_ee )) {
			$this->_params[ $key ] = $value;
		}
	}



	/**
	 *    getter
	 *
	 * @access    public
	 * @param $key
	 * @return    mixed
	 */
	public function get( $key ) {
		return isset( $this->_params[ $key ] ) ? $this->_params[ $key ] : NULL;
	}



	/**
	 *    check if param exists
	 *
	 * @access    public
	 * @param $key
	 * @return    boolean
	 */
	public function is_set( $key ) {
		return isset( $this->_params[ $key ] ) ? TRUE : FALSE;
	}



	/**
	 *    remove param
	 *
	 * @access    public
	 * @param $key
	 * @return    void
	 */
	public function un_set( $key ) {
		unset( $this->_params[ $key ] );
	}



	/**
	 *    set_notice
	 *
	 * @access    public
	 * @param $key
	 * @param $value
	 * @return    void
	 */
	public function set_notice( $key, $value ) {
		$this->_notice[ $key ] = $value;
	}



	/**
	 *    get_notice
	 *
	 * @access    public
	 * @param $key
	 * @return    mixed
	 */
	public function get_notice( $key ) {
		return isset( $this->_notice[ $key ] ) ? $this->_notice[ $key ] : NULL;
	}



	/**
	 *    add_output
	 *
	 * @access    public
	 * @param $string
	 * @return    void
	 */
	public function add_output( $string ) {
		$this->_output .= $string;
	}



	/**
	 * 	get_output
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function get_output() {
		return $this->_output;
	}



	/**
	 * @param $item
	 * @param $key
	 */
	function sanitize_text_field_for_array_walk( &$item, &$key ) {
		$item = strpos( $item, 'email' ) !== FALSE ? sanitize_email( $item ) : sanitize_text_field( $item );
	}



	/**
	 * @param $a
	 * @param $b
	 * @return bool
	 */
	public function __set($a,$b) { return FALSE; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __get($a) { return FALSE; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __isset($a) { return FALSE; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __unset($a) { return FALSE; }



	/**
	 * @return bool
	 */
	public function __clone() { return FALSE; }



	/**
	 * @return bool
	 */
	public function __wakeup() { return FALSE; }



	/**
	 *
	 */
	public function __destruct() { return FALSE; }


}
// End of file EE_Request_Handler.core.php
// Location: /core/EE_Request_Handler.core.php