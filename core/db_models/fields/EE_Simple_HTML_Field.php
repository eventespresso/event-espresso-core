<?php
require_once( EE_MODELS . 'fields/EE_Text_Field_Base.php' );
class EE_Simple_HTML_Field extends EE_Text_Field_Base{
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
		$value_with_select_tags =  wp_kses("$value_inputted_for_field_on_model_object",$allowedtags);
		return parent::prepare_for_set($value_with_select_tags);
	}
	
}
