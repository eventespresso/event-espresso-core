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
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		// grab request vars
		$this->_params = $_REQUEST;
		// get current post name from URL
		$this->set( 'post_name', EEH_URL::get_current_post_name() );		
		$this->set_espresso_page( EEH_URL::test_for_espresso_page() );
		//echo '<br /><br /><h1>is_espresso_page : ' . $this->is_espresso_page() . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
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
		return $this->_params['is_espresso_page'];
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