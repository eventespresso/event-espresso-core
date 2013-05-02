<?php
require_once('fields/EE_Text_Field_Base.php');
class EE_Full_HTML_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return htmlentities( $value_inputted_for_field_on_model_object, ENT_QUOTES, 'UTF-8' );
	}
	function prepare_for_get($value_of_field_on_model_object) {
		return $value_of_field_on_model_object ?  html_entity_decode( $value_of_field_on_model_object, ENT_QUOTES, 'UTF-8' ) : '';
	//@todo: should we be adding or stripslashing?
		
	}
}