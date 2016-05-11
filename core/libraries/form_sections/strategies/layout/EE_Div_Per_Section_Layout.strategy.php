<?php
/**
 * Class EE_Div_Per_Section_Layout
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6.0
 *
 */
class EE_Div_Per_Section_Layout extends EE_Form_Section_Layout_Base{

	/**
	 * opening div tag for a form
	 * @return string
	 */
	public function layout_form_begin() {
		return EEH_HTML::div( '', $this->_form_section->html_id(), $this->_form_section->html_class(), $this->_form_section->html_style() );
	}


	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		$html = '';
		if ( $input instanceof EE_Hidden_Input  ) {
			$html .= EEH_HTML::nl() . $input->get_html_for_input();
		} else if ( $input instanceof EE_Submit_Input  ) {
			$html .= EEH_HTML::div( $input->get_html_for_input(), $input->html_id() . '-submit-dv', $input->html_class() . '-submit-dv' );
		} else if ( $input instanceof EE_Select_Input  ) {
			$html .= EEH_HTML::div(
				EEH_HTML::nl(1) . $input->get_html_for_label() .
				EEH_HTML::nl() . $input->get_html_for_errors() .
				EEH_HTML::nl() . $input->get_html_for_input() .
				EEH_HTML::nl() . $input->get_html_for_help(),
				$input->html_id() . '-input-dv',
				$input->html_class() . '-input-dv'
			);
		} else if ( $input instanceof EE_Form_Input_With_Options_Base  ) {
			$html .= EEH_HTML::div(
				EEH_HTML::nl() . $this->_display_label_for_option_type_question( $input ) .
				EEH_HTML::nl() . $input->get_html_for_errors() .
				EEH_HTML::nl() . $input->get_html_for_input() .
				EEH_HTML::nl() . $input->get_html_for_help(),
				$input->html_id() . '-input-dv',
				$input->html_class() . '-input-dv'
			);
		} else {
			$html .= EEH_HTML::div(
				EEH_HTML::nl(1) . $input->get_html_for_label() .
				EEH_HTML::nl() . $input->get_html_for_errors() .
				EEH_HTML::nl() . $input->get_html_for_input() .
				EEH_HTML::nl() . $input->get_html_for_help(),
				$input->html_id() . '-input-dv',
				$input->html_class() . '-input-dv'
			);
		}
		return $html;
	}



	/**
	 *
	 * _display_label_for_option_type_question
	 * Gets the HTML for the 'label', which is just text for this (because labels
	 * should be for each input)
	 *
	 * @param EE_Form_Input_With_Options_Base $input
	 * @return string
	 */
	protected function _display_label_for_option_type_question( EE_Form_Input_With_Options_Base $input ){
		if ( $input->display_html_label_text() != '' ) {
			$class = $input->required() ? 'ee-required-label ' . $input->html_label_class() : $input->html_label_class();
			$label_text = $input->required() ? $input->html_label_text() . '<span class="ee-asterisk">*</span>' : $input->html_label_text();
			$html = '<div id="' . $input->html_label_id() . '"';
			$html .= ' class="' . $class . '"';
			$html .= ' style="' . $input->html_label_style() . '">';
			$html .= $label_text . '</div>';
			return $html;
		} else {
			return '';
		}
	}



	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $form_section
	 * @return string
	 */
	public function layout_subsection( $form_section ){
//		d( $form_section );
		return EEH_HTML::nl(1) . $form_section->get_html() . EEH_HTML::nl(-1);
	}


	/**
	 * closing div tag for a form
	 * @return string
	 */
	public function layout_form_end(){
		return EEH_HTML::divx( $this->_form_section->html_id(), $this->_form_section->html_class() );
	}
}