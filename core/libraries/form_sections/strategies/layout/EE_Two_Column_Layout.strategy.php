<?php

class EE_Two_Column_Layout extends EE_Form_Section_Layout_Base{

	/**
	 * Should be used to start teh form section (Eg a table tag, or a div tag, etc.)
	 * @param array $additional_args
	 * @return string
	 */
	public function layout_form_begin( $additional_args = array() ) {
		return EEH_HTML::table( '', $this->_form_section->html_id(), $this->_form_section->html_class(), $this->_form_section->html_style()  ) . EEH_HTML::tbody();
	}



	/**
	 * Should be used to end the form section (eg a /table tag, or a /div tag, etc)
	 * @param array $additional_args
	 * @return string
	 */
	public function layout_form_end( $additional_args = array() ) {
		return EEH_HTML::tbodyx() . EEH_HTML::tablex( $this->_form_section->html_id() );
	}



	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		$html = '';
		if ( $input instanceof EE_Hidden_Input ) {
			$html .= $input->get_html_for_input();
		} else {
			$html_for_input = $input->get_html_for_input();
			$html_for_input .= $input->get_html_for_errors() != '' ? EEH_HTML::nl() . $input->get_html_for_errors() : '';
			$html_for_input .= $input->get_html_for_help() != '' ? EEH_HTML::nl() . $input->get_html_for_help() : '';
			$html .= EEH_HTML::tr(
				EEH_HTML::th(  $input->get_html_for_label()  ) .
				EEH_HTML::td( $html_for_input )
			);
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
			$html .= $form_section->get_html();
		} else {
			$html .= EEH_HTML::tr(
				EEH_HTML::td( $form_section->get_html(), '', '', '', 'colspan="2"' )
			);
		}
		return $html;
	}



}