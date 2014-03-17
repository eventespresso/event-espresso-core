<?php

class EE_URL_Validation_Strategy extends EE_Validation_Strategy_Base{
	/**
	 * just checks the field isn't blank
	 * @return boolean
	 */
	function validate($normalized_value) {
		if (filter_var($normalized_value, FILTER_VALIDATE_URL) !== false){
			throw new EE_Validation_Error(sprintf (__ ("Please enter a valid URL", "event_espresso")), 'invalid_url');
		}
	}
	
	function get_jquery_validation_rule_array(){
		return array('validUrl'=>true);
	}	
}

