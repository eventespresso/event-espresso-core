<?php
require_once('EE_Primary_Key_Field_Base.php');
class EE_Primary_Key_String_Field extends EE_Primary_Key_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}