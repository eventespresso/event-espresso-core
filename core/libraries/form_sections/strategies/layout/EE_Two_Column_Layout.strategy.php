<?php

class EE_Two_Column_Layout extends EE_Form_Section_Layout_Base{
	public function layout_form_begin() {
		return EEH_Formatter::nl(1) . '<table class="' . $this->_form_section->html_class() . '" id="' . $this->_form_section->html_id() . '" style="' . $this->_form_section->html_style() . '">';
	}
	public function layout_form_end() {
		return '</table>';
	}
	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		$html = EEH_Formatter::nl(1) . '<tr>';
		$html .= EEH_Formatter::nl(1) . '<th>';
		$html .= EEH_Formatter::nl(1) . $input->get_html_for_label();
		$html .= EEH_Formatter::nl(-1) . '</th>';
		$html .= EEH_Formatter::nl() . '<td>';
		$html .= EEH_Formatter::nl(1) . $input->get_html_for_input() . '<br/>';
		$html .= EEH_Formatter::nl() . $input->get_html_for_errors() . '<br/>';
		$html .= EEH_Formatter::nl() . $input->get_html_for_help();
		$html .= EEH_Formatter::nl(-1) . '</td>';
		$html .= EEH_Formatter::nl(-1) . '</tr>' .  EEH_Formatter::nl(-1);
		return $html;
	}
	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $formsection
	 */
	public function layout_subsection( $formsection ){
		$html = EEH_Formatter::nl(1) . '<tr>';
		$html .= EEH_Formatter::nl(1) . '<td colspan=2>';
		$html .= EEH_Formatter::nl(1) . $formsection->get_html_and_js();
		$html .= EEH_Formatter::nl(-1) . '</td>';
		$html .= EEH_Formatter::nl(-1) . '</tr>';
		return $html;
	}
}