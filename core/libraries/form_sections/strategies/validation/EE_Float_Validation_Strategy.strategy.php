<?php

class EE_Float_Validation_Strategy extends EE_Validation_Strategy_Base{
	
	/**
	 * 
	 * @return boolean
	 */
	function validate() {
		return true;
	}
	
	function get_jquery_validation_rule_array(){
		return array('number'=>true);
	}	
}

