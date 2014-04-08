<?php

class EE_Div_Per_Section_Layout extends EE_Form_Section_Layout_Base{
	public function layout_form_begin() {
		return $html = EEH_Formatter::nl(1) . '<div class="' . $this->_form_section->html_class() . '" id="' . $this->_form_section->html_id() . '" style="' . $this->_form_section->html_style() . '">';
	}
	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		return EEH_Formatter::nl() . '<div>' . EEH_Formatter::nl(1) . $input->get_html_for_label() . '<br/>' . EEH_Formatter::nl() . $input->get_html_for_errors() . EEH_Formatter::nl() . $input->get_html_for_input() . EEH_Formatter::nl() . $input->get_html_for_help() . EEH_Formatter::nl(-1) . '</div>' . EEH_Formatter::nl(-1);
	}
	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $formsection
	 */

	public function layout_subsection( $formsection ){
		return EEH_Formatter::nl(1) . '<div>' . $formsection->get_html_and_js() . EEH_Formatter::nl(-1) . '</div>' . EEH_Formatter::nl(-1);
	}
	public function layout_form_end(){
		return EEH_Formatter::nl(-1) . '</div>';
	}
}