<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
require_once('fields/EE_Integer_Field.php');
class EE_Datetime_Field extends EE_Integer_Field{
	protected $_date_format;
	protected $_time_format;
	function __construct($table_column, $nicename, $nullable, $default_value, $date_format = 'F j, Y', $time_format ='g:i a'){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
		$this->_date_format = $date_format;
		$this->_time_format = $time_format;
	}
	
	function prepare_for_set($value_inputted_for_field_on_model_object) {
//		check if we've been given a string representing a time.
		if(!is_numeric($value_inputted_for_field_on_model_object)){
		//if so, try to convert it to unix timestamp
			$value=strtotime($value_inputted_for_field_on_model_object);
		}else{
			$value = $value_inputted_for_field_on_model_object;
		}
		return intval($value);
	}
	
	/**
	 * Only sets the time portion of the datetime. 
	 * @param string $time_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	function prepare_for_set_with_new_time($time_to_set_string, $current_datetime_value){
		//get time formatted in our usual manner
		if ( ! $time_to_set_string ){
			$time_formated = date_i18n( $this->_time_format, time());
		} else {
			$time_formated = date_i18n( $this->_time_format, strtotime($time_to_set_string) );
		}
		if (isset($current_datetime_value)){
			$date_formatted = date_i18n($this->_time_format, $current_datetime_value);
		}else{
			$date_formatted = date_i18n( $this->_time_format, time());
		}
		return $this->prepare_for_set($date_formatted." ".$time_formated);
	}
	
	/**
	 * Only sets the date portion of the datetime. 
	 * @param string $date_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	function prepare_for_set_with_new_date($date_to_set_string, $current_datetime_value){
		//get time formatted in our usual manner
		if ( ! $date_to_set_string ){
			$date_formmated = date_i18n( $this->_date_format, time());
		} else {
			$date_formmated = date_i18n( $this->_date_format, strtotime($date_to_set_string) );
		}
		if (isset($current_datetime_value)){
			$time_formmated = date_i18n($this->_time_format, $current_datetime_value);
		}else{
			$time_formmated = date_i18n( $this->_time_format, time());
		}
		return $this->prepare_for_set($date_formmated." ".$time_formmated);
	}
}
