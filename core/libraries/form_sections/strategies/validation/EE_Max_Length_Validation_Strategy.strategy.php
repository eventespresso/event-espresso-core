<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Max_Length_Validation_Strategy
 *
 * Validates that the normalized value is smaller than max length
 *
 * @package			Event Espresso
 * @subpackage	Expression package is undefined on line 19, column 19 in Templates/Scripting/PHPClass.php.
 * @author				Mike Nelson
 */
class EE_Max_Length_Validation_Strategy extends EE_Validation_Strategy_Base{

	protected $_max_length;

	public function __construct( $validation_error_message = NULL, $max_length = EE_INF ) {
		$this->_max_length = $max_length;
		if( $validation_error_message === null ) {
			$validation_error_message = sprintf( __( 'Input is too long. Maximum number of characters is %1$s', 'event_espresso' ), $max_length );
		}
		parent::__construct( $validation_error_message );
	}

	/**
	 * @param $normalized_value
	 */
	public function validate($normalized_value) {
		if( $this->_max_length !== EE_INF &&
				$normalized_value &&
				is_string( $normalized_value ) &&
				 strlen( $normalized_value ) > $this->_max_length){
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'maxlength' );
		}
	}

	/**
	 * @return array
	 */
	function get_jquery_validation_rule_array(){
		if( $this->_max_length !== EE_INF ) {
			return array( 'maxlength'=> $this->_max_length, 'messages' => array( 'maxlength' => $this->get_validation_error_message() ) );
		} else {
			return array();
		}
	}
}

// End of file EE_FUll_HTML_Validation_Strategy.strategy.php