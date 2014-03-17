<?php

/*
 * Makes sure there are only 'simple' html tags in the normalized value. Eg, line breaks, lists, links. No js etc though
 */
class EE_Simple_HTML_Validation_Strategy extends EE_Validation_Strategy_Base{
	public function validate($normalized_value) {
		parent::validate($normalized_value);
		global $allowedtags;
		$allowedtags['ol']=array();
		$allowedtags['ul']=array();
		$allowedtags['li']=array();
		$normalized_value_sans_tags =  wp_kses("$normalized_value",$allowedtags);
		if(strlen($normalized_value) > strlen($normalized_value_sans_tags)){
			$this->_input->add_validation_error(sprintf(__("Only simple HTML tags are allowed. Eg, %s", "event_espresso"),implode(",",array_keys($allowedtags))), 'complex_html_tags');
		}
	}
}