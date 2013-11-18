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
final class EE_Request_Handler {

	/**
	 * 	@var 	array	$_params 	$_REQUEST paramaters
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
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct( $wp = NULL ) {
		//d( $wp );
		//if somebody forgot to provide us with WP, thats ok because its global
		if( ! $wp){
			global $wp;
		}
		// grab request vars
		$this->_params = $_REQUEST;
		// AJAX ???
		$this->ajax = defined( 'DOING_AJAX' ) ? TRUE : FALSE;
		$this->front_ajax = $this->is_set( 'ee_front_ajax' ) && $this->get( 'ee_front_ajax' ) == 1 ? TRUE : FALSE;
		if ( ! is_admin() ) {
			// get current post name from URL
			EE_Registry::instance()->load_helper( 'URL' );
			// set request post name
			if ( isset( $wp->query_vars['name'] )) {
				$this->set( 'post_name', $wp->query_vars['name'] );
			} else if ( isset( $wp->query_vars['pagename'] )) {
				$this->set( 'post_name', $wp->query_vars['pagename'] );
			} else if ( isset( $wp->request )) {
				$this->set( 'post_name', basename( $wp->request ));
			} 
			// set post type
			$post_type = isset( $wp->query_vars['post_type'] ) ? $wp->query_vars['post_type'] : 'post';
			$this->set( 'post_type', $post_type );	
			$this->set_espresso_page( EEH_URL::test_for_espresso_page( $this->get( 'post_name' )));
		}

	}



	
	/**
	 * 	is_espresso_page
	 *
	 *  @access 	public
	 *  @return 	mixed
	 */
	public function set_espresso_page( $value ) {
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
	 * 	set_notice
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function set_notice( $key, $value ) {
		$this->_notice[ $key ] = $value;
	}


	
	/**
	 * 	get_notice
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_notice( $key ) {
		return isset( $this->_notice[ $key ] ) ? $this->_notice[ $key ] : NULL;
	}


	
	/**
	 * 	add_output
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function add_output( $string ) {
		$this->_output .= $string;
	}


	
	/**
	 * 	get_output
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_output() {
		return $this->_output;
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