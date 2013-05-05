<?php
require_once('fields/EE_Boolean_Field.php');
class EE_Trashed_Flag_Field extends EE_Boolean_Field{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}
