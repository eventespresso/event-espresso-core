<?php
class EE_Text_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the field
	 */
	function display(){
		// if the input name ends with [email]...
		$type = substr( $this->_input->html_name(), -7 ) == '[email]' ? 'email' : 'text';
		$input = '<input type="'. $type .'"';
		$input .= ' name="' . $this->_input->html_name() . '"';
		$input .= ' id="' . $this->_input->html_id() . '"';
		$class = $this->_input->required() ? $this->_input->required_css_class() . ' ' . $this->_input->html_class() : $this->_input->html_class();
		$class .= $type == 'email' ? ' email' : '';
		$input .= ' class="' . $class . '"';
		// add html5 required
		$input .= $this->_input->required() ? ' required' : '';
		$input .= ' value="' . $this->_input->raw_value_in_form() . '"';
		$input .= ' style="' . $this->_input->html_style() . '"';
		$input .= '/>';
		return $input;
	}

}