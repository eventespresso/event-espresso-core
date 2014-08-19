<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_JSON_Response
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */
class EE_SPCO_JSON_Response {

	/**
	 * @var string
	 */
	protected $_errors = '';

	/**
	 * @var string
	 */
	protected $_attention = '';

	/**
	 * @var string
	 */
	protected $_success = '';

	/**
	 * @var string
	 */
	protected $_plz_select_method_of_payment = '';

	/**
	 * @var string
	 */
	protected $_redirect_url = '';

	/**
	 * @var string
	 */
	protected $_redirect_form = '';

	/**
	 * @var string
	 */
	protected $_reg_step_html = '';

	/**
	 * @var string
	 */
	protected $_method_of_payment = '';

	/**
	 * @var array
	 */
	protected $_return_data = array();




	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return    \EE_SPCO_JSON_Response
	 */
	public function __construct(  ) {
	}




	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return    string
	 */
	public function __toString() {
		$JSON_response = array();
		// grab notices
		$notices = EE_Error::get_notices( FALSE );
		$this->set_attention( isset( $notices['attention'] ) ? $notices['attention'] : '' );
		$this->set_errors( isset( $notices['errors'] ) ? $notices['errors'] : '' );
		$this->set_success( isset( $notices['success'] ) ? $notices['success'] : '' );
		// add notices to JSON response, but only if they exist
		if ( $this->attention() ) {
			$JSON_response['attention'] = $this->attention();
		}
		if ( $this->errors() ) {
			$JSON_response['errors'] = $this->errors();
		}
		if ( $this->success() ) {
			$JSON_response['success'] = $this->success();
		}
		// set reg_step_html, IF it exists
		if ( $this->reg_step_html() ) {
			$JSON_response['reg_step_html'] = $this->reg_step_html();
		}
		// grab generic return data
		$return_data = $this->return_data();
		// set method of payment, IF it exists
		if ( $this->method_of_payment() ) {
			$return_data['method_of_payment'] = $this->method_of_payment();
		}
		// set "plz_select_method_of_payment" message, IF it exists
		if ( $this->plz_select_method_of_payment() ) {
			$return_data['plz_select_method_of_payment'] = $this->plz_select_method_of_payment();
		}
		// set redirect_url, IF it exists
		if ( $this->redirect_url() ) {
			$return_data['redirect_url'] = $this->redirect_url();
		}
		// set redirect_form, IF it exists
		if ( $this->redirect_form() ) {
			$return_data['redirect_form'] = $this->redirect_form();
		}
		// and finally, add return_data array to main JSON response array, IF it contains anything
		// why did we add some of the above properties to the return data array?
		// because it is easier and cleaner in the Javascript to deal with this way
		if ( ! empty( $return_data )) {
			$JSON_response['return_data'] = $return_data;
		}
		// filter final array
		$JSON_response = apply_filters( 'FHEE__EE_SPCO_JSON_Response___toString__JSON_response', $JSON_response );
		// return encoded array
		return json_encode( $JSON_response );
	}



	/**
	 * @param string $attention
	 */
	public function set_attention( $attention ) {
		$this->_attention = $attention;
	}



	/**
	 * @return string
	 */
	public function attention() {
		return $this->_attention;
	}



	/**
	 * @param string $errors
	 */
	public function set_errors( $errors ) {
		$this->_errors = $errors;
	}



	/**
	 * @return string
	 */
	public function errors() {
		return $this->_errors;
	}



	/**
	 * @param string $success
	 */
	public function set_success( $success ) {
		$this->_success = $success;
	}



	/**
	 * @return string
	 */
	public function success() {
		return $this->_success;
	}



	/**
	 * @param string $method_of_payment
	 */
	public function set_method_of_payment( $method_of_payment ) {
		$this->_method_of_payment = $method_of_payment;
	}



	/**
	 * @return string
	 */
	public function method_of_payment() {
		return $this->_method_of_payment;
	}



	/**
	 * @param string $next_step_html
	 */
	public function set_reg_step_html( $next_step_html ) {
		$this->_reg_step_html = $next_step_html;
	}



	/**
	 * @return string
	 */
	public function reg_step_html() {
		return $this->_reg_step_html;
	}



	/**
	 * @param string $redirect_form
	 */
	public function set_redirect_form( $redirect_form ) {
		$this->_redirect_form = $redirect_form;
	}



	/**
	 * @return string
	 */
	public function redirect_form() {
		return $this->_redirect_form;
	}



	/**
	 * @param string $plz_select_method_of_payment
	 */
	public function set_plz_select_method_of_payment( $plz_select_method_of_payment ) {
		$this->_plz_select_method_of_payment = $plz_select_method_of_payment;
	}



	/**
	 * @return string
	 */
	public function plz_select_method_of_payment() {
		return $this->_plz_select_method_of_payment;
	}



	/**
	 * @param string $redirect_url
	 */
	public function set_redirect_url( $redirect_url ) {
		$this->_redirect_url = $redirect_url;
	}



	/**
	 * @return string
	 */
	public function redirect_url() {
		return $this->_redirect_url;
	}



	/**
	 * @param array $return_data
	 */
	public function set_return_data( $return_data ) {
		$this->_return_data = array_merge( $this->_return_data, $return_data );
	}



	/**
	 * @return array
	 */
	public function return_data() {
		return $this->_return_data;
	}





}
// End of file EE_SPCO_JSON_Response.php
// Location: /EE_SPCO_JSON_Response.php