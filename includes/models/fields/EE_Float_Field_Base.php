<?php
require_once('EE_Model_Field_Base.php');
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
abstract class EE_Float_Field_Base extends EE_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%f';
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return floatval( preg_replace( "/^[^0-9\.]-/", "", preg_replace( "/,/", ".", $value_inputted_for_field_on_model_object ) ));
	}
	
}