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
	protected $_unexpected_errors = '';

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
	protected $_registration_time_limit = '';

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
	 * @var float
	 */
	protected $_payment_amount;

	/**
	 * @var array
	 */
	protected $_return_data = array();


	/**
	 *  @var array
	 */
	protected $_validation_rules = array();




	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return    \EE_SPCO_JSON_Response
	 */
	public function __construct(  ) {
	}




	/**
	 *    __toString
	 *
	 * 		allows you to simply echo or print an EE_SPCO_JSON_Response object to produce a  JSON encoded string
	 * 		ie: $json_response = new EE_SPCO_JSON_Response();
	 * 		echo $json_response;
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
		if ( $this->unexpected_errors() ) {
			$JSON_response['unexpected_errors'] = $this->unexpected_errors();
		}
		if ( $this->success() ) {
			$JSON_response['success'] = $this->success();
		}
		// but if NO notices are set... at least set the "success" as a key so that the JS knows everything worked
		if ( ! isset( $JSON_response[ 'attention' ] ) && ! isset( $JSON_response[ 'errors' ] ) && ! isset( $JSON_response[ 'success' ] ) ) {
			$JSON_response['success'] = null;
		}
		// set redirect_url, IF it exists
		if ( $this->redirect_url() ) {
			$JSON_response['redirect_url'] = $this->redirect_url();
		}
		// set registration_time_limit, IF it exists
		if ( $this->registration_time_limit() ) {
			$JSON_response['registration_time_limit'] = $this->registration_time_limit();
		}
		// set payment_amount, IF it exists
		if ( $this->payment_amount() !== null ) {
			$JSON_response[ 'payment_amount' ] = $this->payment_amount();
		}
		// grab generic return data
		$return_data = $this->return_data();
		// add billing form validation rules
		if ( $this->validation_rules() ) {
			$return_data['validation_rules'] = $this->validation_rules();
		}
		// set reg_step_html, IF it exists
		if ( $this->reg_step_html() ) {
			$return_data['reg_step_html'] = $this->reg_step_html();
		}
		// set method of payment, IF it exists
		if ( $this->method_of_payment() ) {
			$return_data['method_of_payment'] = $this->method_of_payment();
		}
		// set "plz_select_method_of_payment" message, IF it exists
		if ( $this->plz_select_method_of_payment() ) {
			$return_data['plz_select_method_of_payment'] = $this->plz_select_method_of_payment();
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
		return wp_json_encode( $JSON_response );
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
	 * @return string
	 */
	public function unexpected_errors() {
		return $this->_unexpected_errors;
	}



	/**
	 * @param string $unexpected_errors
	 */
	public function set_unexpected_errors( $unexpected_errors ) {
		$this->_unexpected_errors = $unexpected_errors;
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
	 * @return float
	 */
	public function payment_amount() {
		return $this->_payment_amount;
	}



	/**
	 * @param float $payment_amount
	 */
	public function set_payment_amount( $payment_amount ) {
		$this->_payment_amount = EEH_Money::convert_to_float_from_localized_money( $payment_amount );
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
		return ! empty( $this->_redirect_form ) ? $this->_redirect_form : FALSE;
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
	 * @return string
	 */
	public function registration_time_limit() {
		return $this->_registration_time_limit;
	}



	/**
	 * @param string $registration_time_limit
	 */
	public function set_registration_time_limit( $registration_time_limit ) {
		$this->_registration_time_limit = $registration_time_limit;
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



	/**
	 * @param array $validation_rules
	 */
	public function add_validation_rules( $validation_rules = array() ) {
		if ( is_array( $validation_rules ) && ! empty( $validation_rules )) {
			$this->_validation_rules = array_merge( $this->_validation_rules, $validation_rules );
		}
	}



	/**
	 * @return array | bool
	 */
	public function validation_rules() {
		return ! empty( $this->_validation_rules ) ? $this->_validation_rules : FALSE;
	}





}
// End of file EE_SPCO_JSON_Response.php
// Location: /EE_SPCO_JSON_Response.php