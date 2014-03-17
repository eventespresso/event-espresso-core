<?php

class EE_Text_Input extends EE_Form_Input_Base{
	
	function __construct($options = array()){
		//require_once('strategies/display_strategies/EE_Text_Input_Display_Strategy.strategy.php');
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		parent::__construct($options);
	}
}