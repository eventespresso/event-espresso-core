<?php

class EE_Select_Input extends EE_Form_Input_Base{
	
	function __construct($select_options,$select_option_values_type = 'string', $options = array()){
		$this->_set_display_strategy(new EE_Select_Display_Strategy($select_options));
		$this->_set_sanitization_strategy(new EE_Enum_Sanitization_Strategy($select_options,$select_option_values_type));
		$this->_add_validation_strategy(new EE_Enum_Validation_Strategy($select_options));
		parent::__construct($options);
	}
}