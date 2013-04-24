<?php
require_once('fields/EE_Primary_Key_Field_Base.php');
class EE_Primary_Key_Int_Field extends EE_Primary_Key_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%d';
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return absint($value_inputted_for_field_on_model_object);
	}
}