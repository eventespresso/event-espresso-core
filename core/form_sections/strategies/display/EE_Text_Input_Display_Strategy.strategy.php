<?php
class EE_Text_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * 
	 * @return string of html to display the field
	 */
	function display(){
		$input = $this->_input;		
		return "<label id='{$input->html_label_id()}' class='{$input->html_label_class()}' style='{$input->html_label_style()}' for='{$input->html_id()}'>".
				$input->html_label_text().
				"</label>".
				"<input type='text' id='{$input->html_id()}' name='{$input->html_name()}' class='{$input->html_class()}' style='{$input->html_style()}' value='{$input->sanitized_value()}'/>".
				"<label id='{$input->html_id()}-errors' class='error' for='{$input->html_id()}'>".
				$input->get_validation_error_string().
				"</label>";
	}
	
}