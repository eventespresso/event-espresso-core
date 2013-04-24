<?php
require_once('fields/EE_Integer_Field.php');
class EE_Boolean_Field extends EE_Integer_Field{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}
