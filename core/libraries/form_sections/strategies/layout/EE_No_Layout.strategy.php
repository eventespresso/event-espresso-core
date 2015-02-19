<?php
/**
 * Class EE_No_Layout
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6.0
 *
 */
class EE_No_Layout extends EE_Div_Per_Section_Layout {

	/**
	 * opening div tag for a form
	 * @return string
	 */
	public function layout_form_begin() {
		return '';
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
			$html .= EEH_HTML::br();
			$html .= $input->get_html_for_input();
		} else if ( $input instanceof EE_Select_Input  ) {
			$html .= EEH_HTML::br();
			$html .= EEH_HTML::nl(1) . $input->get_html_for_label();
			$html .= EEH_HTML::nl() . $input->get_html_for_errors();
			$html .= EEH_HTML::nl() . $input->get_html_for_input();
			$html .= EEH_HTML::nl() . $input->get_html_for_help();
			$html .= EEH_HTML::br();
		} else if ( $input instanceof EE_Form_Input_With_Options_Base  ) {
			$html .= EEH_HTML::br();
			$html .= EEH_HTML::nl() . $input->get_html_for_errors();
			$html .= EEH_HTML::nl() . $input->get_html_for_input();
			$html .= EEH_HTML::nl() . $input->get_html_for_help();
		} else {
			$html .= EEH_HTML::br();
			$html .= EEH_HTML::nl(1) . $input->get_html_for_label();
			$html .= EEH_HTML::nl() . $input->get_html_for_errors();
			$html .= EEH_HTML::nl() . $input->get_html_for_input();
			$html .= EEH_HTML::nl() . $input->get_html_for_help();
		}
		return $html;
	}
	/**
	 * closing div tag for a form
	 * @return string
	 */
	public function layout_form_end(){
		return '';
	}
}