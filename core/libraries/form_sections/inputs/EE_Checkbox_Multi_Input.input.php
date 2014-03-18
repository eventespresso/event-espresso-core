<?php
/**
 * For displaying  a list of options
 */
class EE_Checkbox_Multi_Input extends EE_Form_Input_With_Options_Base{
	
	function __construct($select_options,$options = array()){
		$this->_set_display_strategy(new EE_Checkbox_Display_Strategy($select_options));
		//get teh first item in teh select options. Depending on what it is, use a different normalization strategy
		$select_option_keys = array_keys($select_options);
		$first_key = reset($select_option_keys);
		if(is_int($first_key)){
			$normalization = new EE_Int_Normalization();
		}elseif(is_string($first_key)){
			$normalization = new EE_Text_Normalization();
		}
		$this->_set_normalization_strategy(new EE_Many_Valued_Normalization($normalization));
		$this->_add_validation_strategy(new EE_Many_Valued_Validation_Strategy(new EE_Enum_Validation_Strategy()));
		parent::__construct($select_options, $options);
	}
}