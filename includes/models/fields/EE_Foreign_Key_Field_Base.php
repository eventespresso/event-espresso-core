<?php
require_once('fields/EE_Model_Field_Base.php');
abstract class EE_Foreign_Key_Field_Base extends EE_Model_Field_Base{
	protected $_model_name;
	function __construct($table_column, $nicename, $nullable, $default_value,$model_name){
		$this->_model_name = $model_name;
		parent::__construct($table_column, $nicename, $nullable, $default_value);	
	}
	function get_model_name_pointed_to(){
		return $this->_model_name;
	}
}
