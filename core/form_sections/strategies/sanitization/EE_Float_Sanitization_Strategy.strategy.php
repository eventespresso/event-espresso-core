<?php

/*
 * Sanitizes the input so only a number should be allowed (floats are ok)
 */
class EE_Float_Sanitization_Strategy extends EE_Sanitization_Strategy_Base{
	/**
	 * Just uses the model field's sanitization method.
	 * @param string $raw_req_data_for_this_field
	 * @return string
	 */
	public function _sanitize($raw_req_data_for_this_field) {
		if(is_string($raw_req_data_for_this_field)){
//echo __LINE__."$value_inputted_for_field_on_model_object<br>";			
//double-check there's absolutely nothing left on this string besides numbers
			$raw_req_data_for_this_field = preg_replace( "/[^0-9,.]/", "", $raw_req_data_for_this_field);
		}else{
			$raw_req_data_for_this_field = '';
		}
		return $raw_req_data_for_this_field;
	}
	/**
	 * Just returns the string of the sanitized value
	 * @return string
	 */
	public function normalize() {
		$sanitized_value = $this->_input->sanitized_value();
		$sanitized_value = str_replace(array(" ",EE_Config::instance()->currency->thsnds),"",$sanitized_value);		
		//normalize it so periods are decimal marks (we don't care where you're from: we're talking PHP now)
		$sanitized_value = str_replace( EE_Config::instance()->currency->dec_mrk, ".", $sanitized_value) ;
		return floatval($this->_input->sanitized_value());
	}
}
