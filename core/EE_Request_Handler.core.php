<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {exit('No direct script access allowed');}
/**
 * class EE_Request_Handler
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
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
	public $ajax = false;

	/**
	 * 	whether current request is via AJAX from the frontend of the site
	 *	@var 	boolean
	 * 	@access public
	 */
	public $front_ajax = false;



	/**
	 *    class constructor
	 *
	 * @access public
	 * @param  EE_Request $request
	 * @return \EE_Request_Handler
	 */
	public function __construct( EE_Request $request ) {
		// grab request vars
		$this->_params = $request->params();
		// AJAX ???
		$this->ajax = defined( 'DOING_AJAX' ) && DOING_AJAX ? true : false;
		$this->front_ajax = defined( 'EE_FRONT_AJAX' ) && EE_FRONT_AJAX ? true : false;
		do_action( 'AHEE__EE_Request_Handler__construct__complete' );
	}



	/**
	 *    set_request_vars
	 *
	 * @access public
	 * @param WP $wp
	 * @return void
	 */
	public function parse_request( $wp = null ) {
		//if somebody forgot to provide us with WP, that's ok because its global
		if ( ! $wp instanceof WP ) {
			global $wp;
		}
		$this->set_request_vars( $wp );
	}



	/**
	 *    set_request_vars
	 *
	 * @access public
	 * @param WP $wp
	 * @return void
	 */
	public function set_request_vars( $wp = null ) {
		if ( ! is_admin() ) {
			// set request post_id
			$this->set( 'post_id', $this->get_post_id_from_request( $wp ));
			// set request post name
			$this->set( 'post_name', $this->get_post_name_from_request( $wp ));
			// set request post_type
			$this->set( 'post_type', $this->get_post_type_from_request( $wp ));
			// true or false ? is this page being used by EE ?
			$this->set_espresso_page();
		}
	}



	/**
	 *    get_post_id_from_request
	 *
	 * @access public
	 * @param WP $wp
	 * @return int
	 */
	public function get_post_id_from_request( $wp = null ) {
		if ( ! $wp instanceof WP ){
			global $wp;
		}
		$post_id = null;
		if ( isset( $wp->query_vars['p'] )) {
			$post_id = $wp->query_vars['p'];
		}
		if ( ! $post_id && isset( $wp->query_vars['page_id'] )) {
			$post_id = $wp->query_vars['page_id'];
		}
		if ( ! $post_id && isset( $wp->request ) && is_numeric( basename( $wp->request ))) {
			$post_id = basename( $wp->request );
		}
		return $post_id;
	}



	/**
	 *    get_post_name_from_request
	 *
	 * @access public
	 * @param WP $wp
	 * @return string
	 */
	public function get_post_name_from_request( $wp = null ) {
		if ( ! $wp instanceof WP ){
			global $wp;
		}
		$post_name = null;
		if ( isset( $wp->query_vars['name'] ) && ! empty( $wp->query_vars['name'] )) {
			$post_name = $wp->query_vars['name'];
		}
		if ( ! $post_name && isset( $wp->query_vars['pagename'] ) && ! empty( $wp->query_vars['pagename'] )) {
			$post_name = $wp->query_vars['pagename'];
		}
		if ( ! $post_name && isset( $wp->request ) && ! empty( $wp->request )) {
			$possible_post_name = basename( $wp->request );
			if ( ! is_numeric( $possible_post_name )) {
				/** @type WPDB $wpdb */
				global $wpdb;
				$SQL = "SELECT ID from $wpdb->posts WHERE post_status='publish' AND post_name=%s";
				$possible_post_name = $wpdb->get_var( $wpdb->prepare( $SQL, $possible_post_name ));
				if ( $possible_post_name ) {
					$post_name = $possible_post_name;
				}
			}
		}
		if ( ! $post_name && $this->get( 'post_id' )) {
			/** @type WPDB $wpdb */
			global $wpdb;
			$SQL = "SELECT post_name from $wpdb->posts WHERE post_status='publish' AND ID=%d";
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
	 * @param WP $wp
	 * @return mixed
	 */
	public function get_post_type_from_request( $wp = null ) {
		if ( ! $wp instanceof WP ){
			global $wp;
		}
		return isset( $wp->query_vars['post_type'] ) ? $wp->query_vars['post_type'] : null;
	}



	/**
	 * Just a helper method for getting the url for the displayed page.
	 * @param  WP $wp
	 * @return bool|string|void
	 */
	public function get_current_page_permalink( $wp = null ) {
		$post_id = $this->get_post_id_from_request( $wp );
		if ( $post_id ) {
			$current_page_permalink = get_permalink( $post_id );
		} else {
			if ( ! $wp instanceof WP ) {
				global $wp;
			}
			if ( $wp->request ) {
				$current_page_permalink = site_url( $wp->request );
			} else {
				$current_page_permalink = esc_url( site_url( $_SERVER[ 'REQUEST_URI' ] ) );
			}
		}
		return $current_page_permalink;
	}



	/**
	 * 		test_for_espresso_page
	 *
	 * 		@access public
	 * 		@return bool
	 */
	public function test_for_espresso_page() {
		global $wp;
		/** @type EE_CPT_Strategy $EE_CPT_Strategy */
		$EE_CPT_Strategy = EE_Registry::instance()->load_core( 'CPT_Strategy' );
		$espresso_CPT_taxonomies = $EE_CPT_Strategy->get_CPT_taxonomies();
		if ( is_array( $espresso_CPT_taxonomies ) ) {
			foreach ( $espresso_CPT_taxonomies as $espresso_CPT_taxonomy =>$details ) {
				if ( isset( $wp->query_vars, $wp->query_vars[ $espresso_CPT_taxonomy ] ) ) {
					return true;
				}
			}
		}
		// load espresso CPT endpoints
		$espresso_CPT_endpoints = $EE_CPT_Strategy->get_CPT_endpoints();
		$post_type_CPT_endpoints = array_flip( $espresso_CPT_endpoints );
		$post_types = (array)$this->get( 'post_type' );
		foreach ( $post_types as $post_type ) {
			// was a post name passed ?
			if ( isset( $post_type_CPT_endpoints[ $post_type ] ) ) {
				// kk we know this is an espresso page, but is it a specific post ?
				if ( ! $this->get( 'post_name' ) ) {
					// there's no specific post name set, so maybe it's one of our endpoints like www.domain.com/events
					$post_name = isset( $post_type_CPT_endpoints[ $this->get( 'post_type' ) ] ) ? $post_type_CPT_endpoints[ $this->get( 'post_type' ) ] : null;
					// if the post type matches on of our then set the endpoint
					if ( $post_name ) {
						$this->set( 'post_name', $post_name );
					}
				}
				return true;
			}
		}
		if ( $this->get( 'post_name' )) {
			// load all pages using espresso shortcodes
			$post_shortcodes = isset( EE_Registry::instance()->CFG->core->post_shortcodes ) ? EE_Registry::instance()->CFG->core->post_shortcodes : array();
			// make sure core pages are included
			$espresso_pages = array_merge( $espresso_CPT_endpoints, $post_shortcodes );
			// was a post name passed ?
			if (  isset( $espresso_pages[ $this->get( 'post_name' ) ] )) {
				 return true;
			}
		}
		return false;
	}



	/**
	 *  is_espresso_page
	 *
	 * @access    public
	 * @param null|bool $value
	 * @return    mixed
	 */
	public function set_espresso_page( $value = null ) {
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
		return isset( $this->_params['is_espresso_page'] ) ? $this->_params['is_espresso_page'] : false;
	}



	/**
	 * returns contents of $_REQUEST
	 * @return array
	 */
	public function params() {
		return $this->_params;
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
	public function set( $key, $value, $override_ee = false ) {
		// don't allow "ee" to be overwritten unless explicitly instructed to do so
		if (
			$key !== 'ee' ||
			( $key === 'ee' && empty( $this->_params['ee'] ))
			|| ( $key === 'ee' && ! empty( $this->_params['ee'] ) && $override_ee )
		) {
			$this->_params[ $key ] = $value;
		}
	}



	/**
	 *    getter
	 *
	 * @access    public
	 * @param      $key
	 * @param null $default
	 * @return    mixed
	 */
	public function get( $key, $default = null ) {
		return isset( $this->_params[ $key ] ) ? $this->_params[ $key ] : $default;
	}



	/**
	 *    check if param exists
	 *
	 * @access    public
	 * @param $key
	 * @return    boolean
	 */
	public function is_set( $key ) {
		return isset( $this->_params[ $key ] ) ? true : false;
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
		return isset( $this->_notice[ $key ] ) ? $this->_notice[ $key ] : null;
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
	public function sanitize_text_field_for_array_walk( &$item, &$key ) {
		$item = strpos( $item, 'email' ) !== false ? sanitize_email( $item ) : sanitize_text_field( $item );
	}



	/**
	 * @param $a
	 * @param $b
	 * @return bool
	 */
	public function __set($a,$b) { return false; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __get($a) { return false; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __isset($a) { return false; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __unset($a) { return false; }



	/**
	 * @return bool
	 */
	public function __clone() {}



	/**
	 * @return bool
	 */
	public function __wakeup() {}



	/**
	 *
	 */
	public function __destruct() {}


}
// End of file EE_Request_Handler.core.php
// Location: /core/EE_Request_Handler.core.php
