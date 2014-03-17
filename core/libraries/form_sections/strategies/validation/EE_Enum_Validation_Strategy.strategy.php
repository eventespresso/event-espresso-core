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
	 * Check that the value is in the allowed list
	 * @return boolean
	 */
	function validate($normalized_value) {
		parent::validate($normalized_value);
		if( $normalized_value !== NULL && ! array_key_exists($normalized_value,$this->_enum_options)){
			throw new EE_Validation_Error(sprintf(__("'%s' is not allowed option. Allowed options are %s", "event_espresso"),$normalized_value,implode(", ",$this->_enum_options)), 'invalid_enum_value');
			return false;
		}else{
			return true;
		}
	}	
}
