<?php

/*
 * Especially useful when sanitizing checkbox-type input (the values can be in the enum,
 * but we're allowing themt o selected MULTIPLE (whereas normally ENUM sanitization only allows one))
 */
class EE_Many_Valued_Enum_Sanitization_Strategy extends EE_Enum_Sanitization_Strategy{
	
	public function _sanitize($raw_req_data){
		if(is_array($raw_req_data)){
			$sanitized_value_array = array();
			foreach($raw_req_data as $array_element){
				$sanitized_value_array[] = parent::_sanitize($array_element);
			}
			return $sanitized_value_array;
		}else{
			return array();
		}
			
		
	}
	
	public function normalize() {
		$value_array = $this->_input->sanitized_value();
		$normalized_value_array = array();
		foreach($value_array as $value){
			$normalized_value_array[] = $this->normalize_item($value);
		}
		return $normalized_value_array;
	}
	
	
	/**
	 * Just returns the type specified by $_type_of_values
	 * @return mixed
	 */
	public function normalize_item($array_element) {
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
