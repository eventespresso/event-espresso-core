<?php

class EE_URL_Validation_Strategy extends EE_Validation_Strategy_Base{
	static $included_url_rule_js = false;
	/**
	 * just checks the field isn't blank
	 * @return boolean
	 */
	function validate() {
		return true;
//		if( ! $this->_input->sanitized_value() || ! $this->verify_is_credit_card($this->_input->sanitized_value())){
//			$this->_input->add_validation_error(__("Please enter a valid credit card number", "event_espresso"), 'required');
//			return false;
//		}else{
//			return true;
//		}
	}
	
	function get_jquery_validation_rule_array(){
		return array('validUrl'=>'true');
	}
	function get_validation_js() {
		if( ! EE_URL_Validation_Strategy::$included_url_rule_js){
			return <<<HEREDOC
				jQuery(document).ready(function(){
					jQuery.validator.addMethod("validUrl", function(value, element) {
						if(this.optional(element)){
							return true;
						}else{
							var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

							if(RegExp.test(value)){
								return true;
							}else{
								return false;
							}
						}
					}, "This is not a valid absolute URL. Eg, http://mysite.com/monkey.jpg");
				});

HEREDOC;
		}
		EE_URL_Validation_Strategy::$included_url_rule_js = true;
		
	}
	
	
	
}

