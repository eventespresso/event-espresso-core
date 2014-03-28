<?php

class EE_Select_Input extends EE_Form_Input_With_Options_Base{
	
	function __construct($select_options, $options = array()){
		$this->_set_display_strategy(new EE_Select_Display_Strategy($select_options));
		$this->_add_validation_strategy(new EE_Enum_Validation_Strategy());
		parent::__construct($select_options, $options);
	}
	
}