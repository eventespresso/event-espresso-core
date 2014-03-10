<?php

/*
 * Performs initial sanitization and normalization on the field's input before the input 
 * gets saved onto the form field object. 
 * 
 */
abstract class EE_Sanitization_Strategy_Base extends EE_Form_Input_Strategy_Base{
	/**
	 * Finds the request data that corresponds to the field being sanitized, and 
	 * sanitizes it, and returns it. This sanitized HTML should be safe, but may not necessarily be valid.
	 * @param array $raw_req_data
	 * @return string
	 */
	public function sanitize($raw_req_data){
//		$raw_req_data_for_this_field = isset($raw_req_data[$this->_input->html_name()]) ? $raw_req_data[$this->_input->html_name()] : null;
//		
//		echo "input name:".$this->_input->html_name();
//		echo 'echodump of $raw_req_data';
//		var_dump($raw_req_data);
//		echo 'echodump of $raw_req_data_for_this_field';
//		var_dump($raw_req_data_for_this_field);
		return $this->_sanitize($this->_input->find_form_data_for_this_section($raw_req_data));
	}
	/**
	 * implement this function to perform sanitization on the field.
	 * @param string $raw_req_data_for_this_field
	 * @return string of sanitized
	 */
	abstract function _sanitize($raw_req_data_for_this_field);
	
	/**
	 * uses the sanitized value on the field to get the normalized value, and return it.
	 * Eg, if the input is meant to hold integers, and the field's sanitized value is '123', this should return 123.
	 * If, however, the field's sanitized value is 'jabberwacky', this function should throw a validation error
	 * (and the sanitized value will continue to hold 'jabberwacky')
	 * @return mixed
	 */
	abstract function normalize();
}