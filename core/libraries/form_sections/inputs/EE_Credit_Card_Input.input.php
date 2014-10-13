<?php

class EE_Credit_Card_Input extends EE_Form_Input_Base{
	
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		$this->_add_validation_strategy(new EE_Credit_Card_Validation_Strategy());
		$this->set_sensitive_data_removal_strategy(new EE_Credit_Card_Sensitive_Data_Removal());
		parent::__construct($options);
	}
}