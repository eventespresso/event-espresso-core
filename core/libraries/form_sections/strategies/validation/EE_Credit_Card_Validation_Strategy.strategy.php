<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Credit_Card_Validation_Strategy
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Credit_Card_Validation_Strategy extends EE_Text_Validation_Strategy{

	/**
	 * @param null $validation_error_message
	 */
	public function __construct( $validation_error_message = NULL ) {
		if( ! $validation_error_message ){
			$validation_error_message = __("Please enter a valid credit card number", "event_espresso");
		}
		parent::__construct( $validation_error_message );
	}

	/**
	 * just checks the field isn't blank
	 * @param $normalized_value
	 * @throws EE_Validation_Error
	 * @return void
	 */
	function validate($normalized_value) {
		if( $normalized_value && ! $this->verify_is_credit_card($normalized_value)){
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'required');
		}
	}



	/**
	 * gets additional validation rules for use in the jQuery validation JS corresponding to this field when displaying.
	 *
	 * @return array
	 */
	function get_jquery_validation_rule_array(){
		return array('creditcard'=>true, 'messages' => array( 'creditcard' => $this->get_validation_error_message() ) );
	}

	/**
	 * Uses regular expressions to verify $card_number is actually a credit card number
	 * @param string $card_number
	 * @return boolean
	 */
	private function verify_is_credit_card($card_number){
		//Credit card: All major cards
		$regex = '~^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$~';
		if (preg_match($regex, $card_number) || empty($card_number)) {
			return true;
		}else{
			return false;
		}

	}


}
