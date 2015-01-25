<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * EE_Password_Input_Display_Strategy class. Used for password text field type inputs.
 *
 * @since %VER%
 *
 * @package 		Event Espresso
 * @subpackage 	forms
 * @author		Darren Ethier
 */
class EE_Password_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the field
	 */
	function display(){
		// if the input name ends with [email]...
		$type = 'password';
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
