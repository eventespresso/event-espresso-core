<?php
/**
 * For displaying  a list of options
 */
class EE_Checkbox_Multi_Input extends EE_Form_Input_Base{
	
	function __construct($select_options,$kind,$options = array()){
		$this->_set_display_strategy(new EE_Checkbox_Display_Strategy($select_options));
		$this->_set_sanitization_strategy(new EE_Many_Valued_Enum_Sanitization_Strategy($select_options,$kind));
		$this->_add_validation_strategy(new EE_Many_Valued_Enum_Validation_Strategy($select_options,$kind));
		parent::__construct($options);
	}
}