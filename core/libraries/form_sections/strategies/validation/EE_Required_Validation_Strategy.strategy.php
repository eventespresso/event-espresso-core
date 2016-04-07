<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Required_Validation_Strategy
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Required_Validation_Strategy extends EE_Validation_Strategy_Base{

	/**
	 * For simple conditional required logic. This will be used for the jquery
	 * validation rules' required value. See http://jqueryvalidation.org/required-method
	 * @var string
	 */
	protected $_jquery_dependency_expression;
	/**
	 * @param null $validation_error_message
	 */
	public function __construct( $validation_error_message = NULL, $jquery_dependency_expression = null ) {
		if( ! $validation_error_message ){
			$validation_error_message = __("This field is required.", "event_espresso");
		}
		$this->_jquery_dependency_expression = $jquery_dependency_expression;
		parent::__construct( $validation_error_message );
	}



	/**
	 * just checks the field isn't blank
	 *
	 * @param $normalized_value
	 * @return bool
	 * @throws \EE_Validation_Error
	 */
	function validate($normalized_value) {
		if( $normalized_value === '' || $normalized_value === NULL || $normalized_value === array()){
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'required');
		}else{
			return true;
		}
	}



	/**
	 * @return array
	 */
	function get_jquery_validation_rule_array(){
		$jquery_dependency_expression = $this->get_jquery_dependency_expression();
		return array( 
			'required'=> $jquery_dependency_expression === null ? true : $jquery_dependency_expression,
			'messages' => array( 
				'required' => $this->get_validation_error_message() 
			) 
		);
	}
	
	/**
	 * Sets the jquery dependency expression used in client-side validation.
	 * If you want to mimic this validation server-side, you need to do form-wide validation
	 * (ie create a form class and override its _validate method)
	 * @param string $jquery_dependency_expression
	 */
	public function set_jquery_dependency_expression( $jquery_dependency_expression ) {
		$this->_jquery_dependency_expression = $jquery_dependency_expression;
	}
	
	/**
	 * jQuery dependency expression used for client-side validation
	 * @return string see http://jqueryvalidation.org/required-method for format
	 */
	public function get_jquery_dependency_expression() {
		return $this->_jquery_dependency_expression;
	}

}
