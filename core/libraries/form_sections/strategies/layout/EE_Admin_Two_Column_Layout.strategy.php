<?php
/**
 * Like the standard two-column formsection layout, but this one adds css classes
 * specific to the WP Admin
 */

class EE_Admin_Two_Column_Layout extends EE_Two_Column_Layout {

	/**
	 * Overriding the parent table layout to include <tbody> tags
	 *
	 * @param array $additional_args
	 *
	 * @return string
	 */
	public function layout_form_begin( $additional_args = array() ) {
		$this->_form_section->set_html_class('form-table');
		return parent::layout_form_begin( $additional_args );
	}



	/**
	 * Lays out a row for the subsection
	 * @param EE_Form_Section_Proper $form_section
	 * @return string
	 */
	public function layout_subsection( $form_section ){
		if ( $form_section instanceof EE_Form_Section_Base ) {
			return $form_section->get_html_and_js();
		}
		return '';
	}



	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {

		if (
			$input->get_display_strategy() instanceof EE_Text_Area_Display_Strategy ||
			$input->get_display_strategy() instanceof EE_Text_Input_Display_Strategy ||
			$input->get_display_strategy() instanceof EE_Admin_File_Uploader_Display_Strategy
		) {
			$input->set_html_class( 'large-text' );
		}
		if ( $input instanceof EE_Text_Area_Input ) {
			$input->set_rows( 4 );
			$input->set_cols( 60 );
		}
		// no need to repeat the label for checkboxes, radios, etc
		if ( $input instanceof EE_Form_Input_With_Options_Base ) {
			// so if label is in the input html, let's remove that
			$input_html = str_replace( $input->html_label_text(), '', $input->get_html_for_input() );
		} else {
			$input_html = $input->get_html_for_input();
		}
		// maybe add errors and help text ?
		$input_html .= $input->get_html_for_errors() != '' ? EEH_HTML::nl() . $input->get_html_for_errors() : '';
		$input_html .= $input->get_html_for_help() != '' ? EEH_HTML::nl() . $input->get_html_for_help() : '';
		//overriding parent to add wp admin specific things.
		$html = '';
		if ( $input instanceof EE_Hidden_Input ) {
			$html .= EEH_HTML::tr(
				EEH_HTML::td( $input->get_html_for_input(), '', '',  '', 'colspan="2"' )
			);
		} else {
			$html .= EEH_HTML::tr(
				EEH_HTML::th( $input->get_html_for_label(), '', '',  '', 'scope="row"' ) . EEH_HTML::td( $input_html )
			);
		}
		return $html;
	}
}
