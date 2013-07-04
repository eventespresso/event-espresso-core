<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EE_Plain_Text_Sanitization_Strategy extends EE_Sanitization_Strategy_Base{
	/**
	 * Just uses the model field's sanitization method.
	 * @param string $raw_req_data_for_this_field
	 * @return string
	 */
	public function _sanitize($raw_req_data_for_this_field) {
		//just use the model field's sanitization function
		$temp_field_for_sanitization = new EE_Plain_Text_Field(null, null, null);
		return $temp_field_for_sanitization->prepare_for_set($raw_req_data_for_this_field);
	}
	/**
	 * Just returns the string of the sanitized value
	 * @return string
	 */
	public function normalize() {
		return $this->_input->sanitized_value();
	}
}
