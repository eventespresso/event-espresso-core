<?php

class EE_Email_Input extends EE_Form_Input_Base{
	
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy());
		$this->_set_sanitization_strategy(new EE_Full_HTML_Sanitization_Strategy());
		$this->_add_validation_strategy(new EE_Email_Validation_Strategy());
		parent::__construct($options);
	}
}