<?php

class EE_Required_Validation_Strategy extends EE_Validation_Strategy_Base{
	/**
	 * just checks the field isn't blank
	 * @return boolean
	 */
	function validate($normalized_value) {
		if( $normalized_value === '' || $normalized_value === NULL || $normalized_value === array()){
			throw new EE_Validation_Error(__("This field is required", "event_espresso"), 'required');
			return false;
		}else{
			return true;
		}
	}
	
	function get_jquery_validation_rule_array(){
		return array('required'=>true);
	}
	
}
