<?php

class EE_Credit_Card_Input extends EE_Form_Input_Base{
	
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy());
		$this->_set_sanitization_strategy(new EE_Plain_Text_Sanitization_Strategy());
		$this->_add_validation_strategy(new EE_Credit_Card_Validation_Strategy());
		parent::__construct($options);
	}
}