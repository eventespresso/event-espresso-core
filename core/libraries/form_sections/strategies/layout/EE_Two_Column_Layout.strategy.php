<?php

class EE_Two_Column_Layout extends EE_Form_Section_Layout_Base{

	/**
	 * Should be used to start teh form section (Eg a table tag, or a div tag, etc.)
	 * @param array $additional_args
	 * @return string
	 */
	public function layout_form_begin( $additional_args = array() ) {
		return EEH_Formatter::nl(1) . '<table class="' . $this->_form_section->html_class() . '" id="' . $this->_form_section->html_id() . '" style="' . $this->_form_section->html_style() . '">';
	}



	/**
	 * Should be used to end the form section (eg a /table tag, or a /div tag, etc)
	 * @param array $additional_args
	 * @return string
	 */
	public function layout_form_end( $additional_args = array() ) {
		return EEH_Formatter::nl(-1) . '</table>';
	}



	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		$html = '';
		if ( $input instanceof EE_Hidden_Input ) {
			$html .= EEH_Formatter::nl(1) . $input->get_html_for_input()/* . '<br/>'*/;
		} else {
			$html .= EEH_Formatter::nl(1) . '<tr>';
			$html .= EEH_Formatter::nl(1) . '<th>';
			$html .= EEH_Formatter::nl(1) . $input->get_html_for_label();
			$html .= EEH_Formatter::nl(-1) . '</th>';
			$html .= EEH_Formatter::nl() . '<td>';
			$html .= EEH_Formatter::nl(1) . $input->get_html_for_input()/* . '<br/>'*/;
			$html .= EEH_Formatter::nl() . $input->get_html_for_errors()/* . '<br/>'*/;
			$html .= EEH_Formatter::nl() . $input->get_html_for_help();
			$html .= EEH_Formatter::nl(-1) . '</td>';
			$html .= EEH_Formatter::nl(-1) . '</tr>' .  EEH_Formatter::nl(-1);
		}
		return $html;
	}



	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $form_section
	 * @return string
	 */
	public function layout_subsection( $form_section ){
		$html = '';
		if ( $form_section instanceof EE_Form_Section_HTML ) {
			$html .= EEH_Formatter::nl(1) . $form_section->get_html_and_js();
		} else {
			$html .= EEH_Formatter::nl(1) . '<tr>';
			$html .= EEH_Formatter::nl(1) . '<td colspan=2>';
			$html .= EEH_Formatter::nl(1) . $form_section->get_html_and_js();
			$html .= EEH_Formatter::nl(-1) . '</td>';
			$html .= EEH_Formatter::nl(-1) . '</tr>';

		}
		return $html;
	}



}