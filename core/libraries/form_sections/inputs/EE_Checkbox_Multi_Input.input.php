<?php
/**
 * For displaying  a list of options
 */
class EE_Checkbox_Multi_Input extends EE_Form_Input_With_Options_Base{
	
	function __construct($select_options,$options = array()){
		$this->_set_display_strategy(new EE_Checkbox_Display_Strategy($select_options));
		$this->_add_validation_strategy(new EE_Many_Valued_Validation_Strategy(new EE_Enum_Validation_Strategy()));
		$this->_multiple_selections = true;
		parent::__construct($select_options, $options);
	}
}