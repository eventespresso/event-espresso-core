<?php
require_once('fields/EE_Text_Field_Base.php');
class EE_Plain_Text_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	/**
	 * removes all tags when setting
	 * @param string $value_inputted_for_field_on_model_object
	 * @return string
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return htmlentities(wp_strip_all_tags($value_inputted_for_field_on_model_object));
	}
}