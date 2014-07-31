<?php

class EE_Div_Per_Section_Layout extends EE_Form_Section_Layout_Base{

	/**
	 * opening div tag for a form
	 * @return string
	 */
	public function layout_form_begin() {
		return EEH_Formatter::nl(1) . '<div id="' . $this->_form_section->html_id() . '" class="' . $this->_form_section->html_class() . '" style="' . $this->_form_section->html_style() . '">';
	}


	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		$html = '';
		if ( $input instanceof EE_Hidden_Input  ) {
			$html .= EEH_Formatter::nl() . $input->get_html_for_input();
		} else if ( $input instanceof EE_Submit_Input  ) {
			$html .= EEH_Formatter::nl() . '<div id="' . $input->html_id() . '-submit-dv" class="' . $input->html_class() . '-submit-dv">';
			$html .= EEH_Formatter::nl() . $input->get_html_for_input();
			$html .= EEH_Formatter::nl(-1) . '</div>';
		} else if ( $input instanceof EE_Form_Input_With_Options_Base  ) {
			$html .= EEH_Formatter::nl() . '<div id="' . $input->html_id() . '-input-dv" class="' . $input->html_class() . '-input-dv">';
			$html .= EEH_Formatter::nl() . $input->get_html_for_errors();
			$html .= EEH_Formatter::nl() . $input->get_html_for_input();
			$html .= EEH_Formatter::nl() . $input->get_html_for_help();
			$html .= EEH_Formatter::nl(-1) . '</div>';
		} else {
			$html .= EEH_Formatter::nl() . '<div id="' . $input->html_id() . '-input-dv" class="' . $input->html_class() . '-input-dv">';
			$html .= EEH_Formatter::nl(1) . $input->get_html_for_label();
			$html .= EEH_Formatter::nl() . $input->get_html_for_errors();
			$html .= EEH_Formatter::nl() . $input->get_html_for_input();
			$html .= EEH_Formatter::nl() . $input->get_html_for_help();
			$html .= EEH_Formatter::nl(-1) . '</div>';
			$html .= EEH_Formatter::nl(-1);
		}
		return $html;
	}



	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $form_section
	 * @return string
	 */
	public function layout_subsection( $form_section ){
//		d( $form_section );
		return EEH_Formatter::nl(1) . $form_section->get_html_and_js() . EEH_Formatter::nl(-1);
	}


	/**
	 * closing div tag for a form
	 * @return string
	 */
	public function layout_form_end(){
		return EEH_Formatter::nl(-1) . '</div>';
	}
}