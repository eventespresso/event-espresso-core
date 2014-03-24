<?php

abstract class EE_Display_Strategy_Base extends EE_Form_Input_Strategy_Base{
	/**
	 * returns HTML and javascript related to the displaying of this input
	 * @return string
	 */
	abstract function display();
	/**
	 * Gets the HTML for the label tag and its contents.
	 * @return string
	 */
	public function display_label(){
		$input = $this->_input;
		$classes = $input->html_label_class();
		if($input->required()){
			$class = 'required-label '.$class;
		}
		return "<label id='{$input->html_label_id()}' class='$class' style='{$input->html_label_style()}' for='{$input->html_id()}'>".
				$input->html_label_text().
				"</label>";
	}
	/**
	 * returns the HTML for the errors 
	 * @return string
	 */
	public function display_errors(){
		$input = $this->_input;
		return "<label id='{$input->html_id()}-errors' class='error' for='{$input->html_id()}'>".
				$input->get_validation_error_string().
				"</label>";
	}
}