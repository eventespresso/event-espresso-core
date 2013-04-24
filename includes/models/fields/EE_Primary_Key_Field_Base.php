<?php

require_once('fields/EE_Model_Field_Base.php');
abstract class EE_Primary_Key_Field_Base extends EE_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct( $table_column, $nicename, $nullable, $default_value);
	}
}
