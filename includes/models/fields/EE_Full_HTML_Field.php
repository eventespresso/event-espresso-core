<?php
require_once('fields/EE_Text_Field_Base.php');
class EE_Full_HTML_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}