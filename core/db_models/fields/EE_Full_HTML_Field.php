<?php
require_once( EE_MODELS . 'fields/EE_Text_Field_Base.php' );
class EE_Full_HTML_Field extends EE_Text_Field_Base{


	/**
	 * Does shortcodes and auto-paragraphs the content (unless schema is 'no_wpautop')
	 * @param type $value_on_field_to_be_outputted
	 * @param type $schema
	 * @return string
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null) {
		if($schema =='form_input'){
			return parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema);
		}elseif($schema == 'no_wpautop'){
			return do_shortcode(parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema));
		}else{
			return wpautop(do_shortcode(parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema)));
		}
	}
}