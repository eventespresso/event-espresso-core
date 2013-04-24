<?php
require_once('fields/EE_Foreign_Key_Field_Base.php');
class EE_Foreign_Key_String_Field extends EE_Foreign_Key_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value,$model_name){
		parent::__construct($table_column, $nicename, $nullable, $default_value,$model_name);	
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}