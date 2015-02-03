<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Int_Validation_Strategy
 *
 * @package			Event Espresso
 * @subpackage	Expression package is undefined on line 19, column 19 in Templates/Scripting/PHPClass.php.
 * @author				Mike Nelson
 */
class EE_Int_Validation_Strategy extends EE_Validation_Strategy_Base{

	/**
	 * @param null $validation_error_message
	 */
	public function __construct( $validation_error_message = NULL ) {
		if( ! $validation_error_message ){
			$validation_error_message = __("Only digits are allowed.", "event_espresso");
		}
		parent::__construct( $validation_error_message );
	}



	/**
	 * @param $normalized_value
	 */
	public function validate($normalized_value) {
		//this should have already been detected by the normalization strategy
	}



	/**
	 * @return array
	 */
	function get_jquery_validation_rule_array(){
		return array('digits'=>true, 'messages' => array( 'digits' => $this->get_validation_error_message() ) );
	}
}

// End of file EE_Int_Validation_Strategy.strategy.php