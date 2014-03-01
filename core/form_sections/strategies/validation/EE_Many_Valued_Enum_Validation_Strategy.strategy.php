<?php
/**
 * Like an enum, but the value is an array (and each of those array elements is
 * in the allowed list)
 */
class EE_Many_Valued_Enum_Validation_Strategy extends EE_Enum_Validation_Strategy{
	
	/**
	 * just checks the field isn't blank
	 * @return boolean
	 */
	function validate() {
		$valid = true;
		if($this->_input->sanitized_value()){
			//ok so they entered something for this. It should be an arrya
			if( ! is_array($this->_input->sanitized_value()) ){
				$this->_input->add_validation_error(sprintf(__("Were you hackig this form?", "event_espresso")), 'none_array');
			}else{
				foreach($this->_input->sanitized_value() as $value){
					if( ! isset($this->_enum_options[$value])){
						$this->_input->add_validation_error(sprintf(__("'%s' was not one of your options", "event_espresso"),$value), 'not_an_option');
						$valid = false;
					}
				}
			}
		}
		return $valid;
	}	
}
