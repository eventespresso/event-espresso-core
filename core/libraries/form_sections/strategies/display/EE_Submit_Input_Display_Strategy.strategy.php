<?php



/**
 * Class EE_Submit_Input_Display_Strategy
 * Description
 *
 * @package       Event Espresso
 * @author        Mike Nelson
 */
class EE_Submit_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the input
	 */
	public function display(){
		$html = '<input type="submit" ';
		$html .= 'name="' . $this->_input->html_name() . '" ';
		$html .= 'value="' . $this->_input->raw_value_in_form() . '" ';
		$html .= 'id="' . $this->_input->html_id() . '-submit" ';
		$html .= 'class="' . $this->_input->html_class() . ' ' . $this->_input->button_css_attributes() . '" ';
		$html .= 'style="' . $this->_input->html_style() . '" ';
		$html .= $this->_input->other_html_attributes();
		$html .= '/>';
		return $html;
	}

}