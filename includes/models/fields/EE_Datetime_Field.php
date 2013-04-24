<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
require_once('fields/EE_Integer_Field.php');
class EE_Datetime_Field extends EE_Integer_Field{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	
	function prepare_for_set($value_inputted_for_field_on_model_object) {
//		check if we've been given a string representing a time.
		if(!is_numeric($value_inputted_for_field_on_model_object)){
			//if so, try to convert it to unix timestamp
			$value=strtotime($value);
		}
		return intval($value);
	}
}