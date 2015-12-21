<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * class EE_Response
 *
 * Passes output, notices, and request termination status between EE_Middleware classes
 *
 * @package         Event Espresso
 * @subpackage  /core/
 * @author          Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Response {

	/**
	 * @access 	protected
	 * @type 		array $_notice
	 */
	protected $_notice = array();

	/**
	 *    rendered output to be returned to WP
	 * @access 	protected
	 * @type 		string
	 */
	protected $_output = '';

	/**
	 * @access 	protected
	 * @type 		bool
	 */
	protected $request_terminated = false;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Response
	 */
	public function __construct() {
		$this->terminate_request( false );
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
	 *    get_notices
	 *
	 * @access    public
	 * @return    array
	 */
	public function get_notices() {
		return $this->_notice;
	}



	/**
	 *    add_output
	 *
	 * @access    public
	 * @param $string
	 * @param bool $append
	 */
	public function add_output( $string, $append = true ) {
		$this->_output = $append ? $this->_output . $string : $string . $this->_output;
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
	 * @return boolean
	 */
	public function request_terminated() {
		return $this->request_terminated;
	}



	/**
	 * @param boolean $request_terminated
	 */
	public function terminate_request( $request_terminated = true ) {
		$this->request_terminated = filter_var( $request_terminated, FILTER_VALIDATE_BOOLEAN );
	}


}
// End of file EE_Response.core.php
// Location: /core/EE_Response.core.php