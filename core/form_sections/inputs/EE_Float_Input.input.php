<?php

class EE_Float_Input extends EE_Form_Input_Base{
	
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy());
		$this->_set_sanitization_strategy(new EE_Float_Sanitization_Strategy());
		parent::__construct($options);
	}
}