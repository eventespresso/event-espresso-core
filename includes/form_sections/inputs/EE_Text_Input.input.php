<?php
require_once('inputs/EE_Form_Input_Base.input.php');
class EE_Text_Input extends EE_Form_Input_Base{
	
	function __construct(){
		require_once('display_strategies/EE_Text_Input_Display_Strategy.strategy.php');
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy($this));
	}
}