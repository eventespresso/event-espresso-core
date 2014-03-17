<?php

class EE_Credit_Card_Validation_Strategy extends EE_Text_Validation_Strategy{
	/**
	 * just checks the field isn't blank
	 * @return void
	 */
	function validate($normalized_value) {
		if( $normalized_value && ! $this->verify_is_credit_card($normalized_value)){
			throw new EE_Validation_Error(__("Please enter a valid credit card number", "event_espresso"), 'required');
		}
	}
	
	function get_jquery_validation_rule_array(){
		return array('creditcard'=>true);
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
