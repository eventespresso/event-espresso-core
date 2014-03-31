<?php

class EE_Div_Per_Section_Layout extends EE_Form_Section_Layout_Base{
	function layout_form() {
		$html = EEH_Formatter::nl(1) . '<div class="' . $this->_form_section->html_class() . '" id="' . $this->_form_section->html_id() . '" style="' . $this->_form_section->html_style() . '">';
		foreach( $this->_form_section->subsections() as $name=>$subsection ){
			if ( $subsection instanceof EE_Form_Input_Base ){
				$html .= $this->layout_input( $subsection );
			} elseif ( $subsection instanceof EE_Form_Section_Proper ){
				$html .= $this->layout_proper_subsection( $subsection );
			}
		}
		$html .= EEH_Formatter::nl(-1) . '</div>';
		$html = $this->add_form_section_hooks_and_filters( $html );
		return $html;
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

	public function layout_proper_subsection( $formsection ){
		return EEH_Formatter::nl(1) . '<div>' . $formsection->get_html_and_js() . EEH_Formatter::nl(-1) . '</div>' . EEH_Formatter::nl(-1);
	}
}