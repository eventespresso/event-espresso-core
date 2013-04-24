<?php
require_once('fields/EE_Text_Field_Base.php');
class EE_Simple_HTML_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	/**
	 * removes all tags when setting
	 * @param string $value_inputted_for_field_on_model_object
	 * @return string
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		global $allowedtags;
		$allowedtags['ol']=array();
		$allowedtags['ul']=array();
		$allowedtags['li']=array();
		return htmlentities(wp_kses("$value_inputted_for_field_on_model_object",$allowedtags),ENT_QUOTES,'UTF-8');
	}
	
}