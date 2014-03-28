<?php

class EE_Enum_Validation_Strategy extends EE_Validation_Strategy_Base{
	
	/**
	 * Check that the value is in the allowed list
	 * @return boolean
	 */
	function validate($normalized_value) {
		parent::validate($normalized_value);
		$input = $this->_input;
		if( ! $input instanceof EE_Form_Input_With_Options_Base){
			throw new EE_Error(sprintf(__("Cannot use Enum Validation Strategy with an input that doesn't ahve options", "event_espresso")));
		}
		$enum_options = $input->flat_options();
		if( $normalized_value !== NULL && ! array_key_exists($normalized_value,$enum_options)){
			throw new EE_Validation_Error(sprintf(__("'%s' is not allowed option. Allowed options are %s", "event_espresso"),$normalized_value,implode(", ",$enum_options)), 'invalid_enum_value');
			return false;
		}else{
			return true;
		}
	}	
}
