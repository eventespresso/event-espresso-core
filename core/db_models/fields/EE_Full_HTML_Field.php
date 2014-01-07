<?php
require_once( EE_MODELS . 'fields/EE_Text_Field_Base.php' );
class EE_Full_HTML_Field extends EE_Text_Field_Base{
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return  $value_inputted_for_field_on_model_object;
	}

	/**
	 * Does shortcodes and auto-paragraphs the content
	 * @param type $value_on_field_to_be_outputted
	 * @param type $schema
	 * @return string
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null) {
		return wpautop(do_shortcode(parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema)));
	}
}