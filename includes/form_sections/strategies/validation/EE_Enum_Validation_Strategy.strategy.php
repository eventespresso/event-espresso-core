<?php

class EE_Enum_Validation_Strategy extends EE_Validation_Strategy_Base{
	/**
	 *
	 * @var array array keys are allowed values, array values are internationalized strings 
	 */
	protected $_enum_options;
	
	/**
	 * 
	 * @param string $enum_options array keys are allowed values, array values are internationalized strings 
	 */
	function __construct($enum_options){
		$this->_enum_options = $enum_options;
	}
	
	/**
	 * just checks the field isn't blank
	 * @return boolean
	 */
	function validate() {
		if( $this->_input->sanitized_value() && ! array_key_exists($this->_input->sanitized_value(),$this->_enum_options)){
			$this->_input->add_validation_error(sprintf(__("'%s' is not allowed option. Allowed options are %s", "event_espresso"),$this->_input->sanitized_value(),implode(", ",$this->_enum_options)), 'invalid_enum_value');
			return false;
		}else{
			return true;
		}
	}	
}
