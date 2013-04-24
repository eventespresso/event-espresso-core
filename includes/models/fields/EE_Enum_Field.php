<?php
require_once('fields/EE_Text_Field_Base.php');
class EE_Enum_Field extends EE_Text_Field_Base{
	var $_allowed_enum_values;
	function __construct($table_column, $nicename, $nullable, $default_value, $allowed_enum_values){
		$this->_allowed_enum_values = $allowed_enum_values;
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}
