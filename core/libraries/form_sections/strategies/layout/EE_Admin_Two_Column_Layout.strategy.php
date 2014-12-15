<?php
/**
 * Like the standard two-column formsection layout, but this one adds css classes
 * specific to the WP Admin
 */

class EE_Admin_Two_Column_Layout extends EE_Two_Column_Layout{

	/**
	 * Overriding the parent table layout to include <tbody> tags
	 *
	 * @param array $additional_args
	 *
	 * @return string
	 */
	public function layout_form_begin( $additional_args = array() ) {
		$this->_form_section->set_html_class('form-table');
		$html = parent::layout_form_begin( $additional_args );
		return $html . EEH_Formatter::nl(1) . '<tbody>';
	}





	/**
	 * Overriding the parent table layout to include </tbody> tag
	 *
	 * @param array $additional_args
	 *
	 * @return string
	 */
	public function layout_form_end( $additional_args = array() ) {
		$html = EEH_Formatter::nl(-1) . '</tbody>';
		return $html . parent::layout_form_end( $additional_args );
	}

	/**
	 * Lays out the row for the input, including label and errors
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		if( $input->get_display_strategy() instanceof EE_Text_Area_Display_Strategy ){
			$input->set_html_class( 'large-text' );
			if( $input instanceof EE_Text_Area_Input ){
				$input->set_rows( 4 );
				$input->set_cols( 60 );
			}
		}elseif ( $input->get_display_strategy() instanceof EE_Text_Input_Display_Strategy ||
			 $input->get_display_strategy() instanceof EE_Admin_File_Uploader_Display_Strategy ) {
			$input->set_html_class( 'large-text' );
		}

		//overriding parent to add wp admin specific things.
		$html = '';
		if ( $input instanceof EE_Hidden_Input ) {
			$html .= EEH_Formatter::nl(1) . $input->get_html_for_input()/* . '<br/>'*/;
		} else {
			//if label is in input, let's remove that (typically happens with checkboxes and radios, no need to repeat the label).
			$input_html = str_replace( $input->html_label_text(), '', $input->get_html_for_input() );
			$html .= EEH_Formatter::nl(1) . '<tr>';
			$html .= EEH_Formatter::nl(1) . '<th scope="row">';
			$html .= EEH_Formatter::nl(1) . $input->get_html_for_label();
			$html .= EEH_Formatter::nl(-1) . '</th>';
			$html .= EEH_Formatter::nl() . '<td>';
			$html .= EEH_Formatter::nl(1) . $input_html/* . '<br/>'*/;
			$html .= EEH_Formatter::nl() . $input->get_html_for_errors()/* . '<br/>'*/;
			$html .= EEH_Formatter::nl() . $input->get_html_for_help();
			$html .= EEH_Formatter::nl(-1) . '</td>';
			$html .= EEH_Formatter::nl(-1) . '</tr>' .  EEH_Formatter::nl(-1);
		}
		return $html;
	}
}
