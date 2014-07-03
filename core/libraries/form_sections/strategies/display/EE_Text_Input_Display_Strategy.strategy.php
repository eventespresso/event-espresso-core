<?php
class EE_Text_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the field
	 */
	function display(){
		$input = '<input type="text" ';
		$input .= 'name="' . $this->_input->html_name() . '" ';
		$input .= 'id="' . $this->_input->html_id() . '" ';
		$class = $this->_input->required() ? 'ee-needs-value ' . $this->_input->html_class() : $this->_input->html_class();
		$input .= 'class="' . $class . '" ';
		$input .= 'value="' . $this->_input->raw_value_in_form() . '"';
		$input .= 'style="' . $this->_input->html_style() . '" ';
		$input .= '/>';
		return $input;
	}

}