<?php

class EE_Float_Validation_Strategy extends EE_Validation_Strategy_Base{
	
	/**
	 * 
	 * @return boolean
	 */
	function validate() {
		return true;
//		if( ! $this->_input->sanitized_value() || ! $this->verify_is_credit_card($this->_input->sanitized_value())){
//			$this->_input->add_validation_error(__("Please enter a valid credit card number", "event_espresso"), 'required');
//			return false;
//		}else{
//			return true;
//		}
	}
	
	function get_jquery_validation_rule_array(){
		return array('number'=>true);
	}	
}

