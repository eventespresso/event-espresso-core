<?php

class EE_Two_Column_Layout extends EE_Form_Section_Layout_Base{
	function layout_form() {
		$form = $this->_form_section;
		$html = ee_newline(1) . '<table class="' . $this->_form_section->html_class() . '" id="' . $this->_form_section->html_id() . '" style="' . $this->_form_section->html_style() . '">';
		foreach($this->_form_section->subsections() as $name=>$subsection){
			if($subsection instanceof EE_Form_Input_Base){
				$html .= $this->layout_input($subsection);
			}elseif($subsection instanceof EE_Form_Section_Proper){
				$html .= $this->layout_proper_subsection($subsection);
			}
		}
		$html .= '</table>';
		return $html;
	}
	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		$html = ee_newline(1) . '<tr>';
		$html .= ee_newline(1) . '<th>';
		$html .= ee_newline(1) . $input->get_html_for_label();
		$html .= ee_newline(-1) . '</th>';
		$html .= ee_newline() . '<td>';
		$html .= ee_newline(1) . $input->get_html_for_errors();
		$html .= ee_newline() . $input->get_html_for_input() . '<br/>';
		$html .= ee_newline() . $input->get_html_for_help();
		$html .= ee_newline(-1) . '</td>';
		$html .= ee_newline(-1) . '</tr>' .  ee_newline(-1);
		return $html;
	}
	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $formsection
	 */
	public function layout_proper_subsection( $formsection ){
		$html = ee_newline(1) . '<tr>';
		$html .= ee_newline(1) . '<td colspan=2>';
		$html .= ee_newline(1) . $formsection->get_html_and_js();
		$html .= ee_newline(-1) . '</td>';
		$html .= ee_newline(-1) . '</tr>';
		return $html;
	}
}