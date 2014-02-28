<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EE_Enum_Sanitization_Strategy extends EE_Sanitization_Strategy_Base{
	/**
	 * Keys are values to be used in the system, values are internationalized strings to displaying
	 * @var array
	 */
	protected $_enum_options;
	/**
	 * string stating the php type of the values. either 'string','int', or 'boolean'
	 * @var string
	 */
	protected $_type_of_values;
	
	/**
	 * allowed values for the $type_of_values constructor argument.
	 * @var array
	 */
	private $_acceptable_types_of_values = array('string','int','integer','boolean','bool');
	/**
	 * 
	 * @param array $enum_options Keys are values to be used in the system, values are internationalized strings to displaying
	 * @param $type_of_values a string stating what type the values are. Accepts either 'string', 'int', or 'boolean'
	 */
	public function __construct($enum_options, $type_of_values = 'string') {
		$this->_enum_options = $enum_options;
		if( ! in_array( $type_of_values,$this->_acceptable_types_of_values)){
			throw new EE_Error(sprintf(__("You passed an invalid argument to EE_Enum_Sanitization_Strategy. Argument for type of values must be one of %s, you passed %s", "event_espresso"),implode(",",$this->_acceptable_types_of_values),$type_of_values));
		}
		$this->_type_of_values = $type_of_values;
		
		parent::__construct();
	}
	/**
	 * Just uses the model field's sanitization method.
	 * @param string $raw_req_data_for_this_field
	 * @return string
	 */
	public function _sanitize($raw_req_data_for_this_field) {
		//just use the model field's sanitization function
		$temp_field_for_sanitization = new EE_Enum_Text_Field(null, null, null,null,$this->_enum_options);
		return $temp_field_for_sanitization->prepare_for_set($raw_req_data_for_this_field);
	}
	/**
	 * Just returns the type specified by $_type_of_values
	 * @return mixed
	 */
	public function normalize() {
		switch($this->_type_of_values){
			case 'int':
			case 'integer':
				return intval($this->_input->sanitized_value());
			case 'boolean':
			case 'bool':
				return $this->_input->sanitized_value() ? true : false;
			case 'string':
			default:
				return $this->_input->sanitized_value();
		}
		
	}
}
