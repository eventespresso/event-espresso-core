<?php
class EE_Submit_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the input
	 */
	function display(){
		return '<input type="submit" value="' . $this->_input->raw_value_in_form() . '" id="' . $this->_input->html_id() . '-submit" class="' . $this->_input->html_class() . ' ' . $this->_input->button_css_attributes() . '" style="' . $this->_input->html_style() . '"/>';
	}

}