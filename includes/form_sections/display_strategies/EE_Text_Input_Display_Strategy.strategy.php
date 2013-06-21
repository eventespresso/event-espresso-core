<?php
require_once('display_strategies/EE_Display_Strategy_Base.strategy.php');
class EE_Text_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * 
	 * @return string of html to display the field
	 */
	function display(){
		$input = $this->_input;
		return "<label id='{$input->html_label_id()}' class='{$input->html_label_class()}' style='{$input->html_label_style()}'>".
				"{$input->html_label_text()}".
				"</label>".
				"<input type='text' id='{$input->html_id()}' class='{$input->html_class()}' style='{$input->html_style()}' value='{$input->original_value()}'/>";
	}
	
}