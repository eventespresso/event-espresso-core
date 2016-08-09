<?php
/**
 *
 * Class EE_Checkbox_Display_Strategy
 *
 * displays a set of checkbox inputs
 *
 * @package     Event Espresso
 * @subpackage 	core
 * @author      Mike Nelson
 * @since       4.6
 *
 */
class EE_Checkbox_Display_Strategy extends EE_Compound_Input_Display_Strategy {

	/**
	 *
	 * @throws EE_Error
	 * @return string of html to display the field
	 */
	public function display(){
		$input = $this->get_input();
		//d( $input );
		$multi = count( $input->options() ) > 1 ? TRUE : FALSE;
		$input->set_label_sizes();
		$label_size_class = $input->get_label_size_class();
		$html = '';
		if ( ! is_array( $input->raw_value() ) && $input->raw_value() !== NULL ) {
			EE_Error::doing_it_wrong(
				'EE_Checkbox_Display_Strategy::display()',
				sprintf(
					__( 'Input values for checkboxes should be an array of values, but the value for input "%1$s" is "%2$s". Please verify that the input name is exactly "%3$s"', 'event_espresso'),
					$input->html_id(),
					var_export( $input->raw_value(), true),
					$input->html_name() . '[]'
				),
				'4.8.1'
			);
		}
		$input_raw_value = (array)$input->raw_value();
		foreach( $input->options() as $value => $display_text ){
			$value = $input->get_normalization_strategy()->unnormalize_one( $value );
			$html_id = $this->get_sub_input_id( $value );
			$html .= EEH_HTML::nl( 0, 'checkbox' );
			$html .= '<label for="' . $html_id . '" id="' . $html_id . '-lbl" class="ee-checkbox-label-after' . $label_size_class . '">';
			$html .= EEH_HTML::nl( 1, 'checkbox' );
			$html .= '<input type="checkbox"';
			$html .= ' name="' . $input->html_name() . '[]"';
			$html .= ' id="' . $html_id . '"';
			$html .= ' class="' . $input->html_class() . '"';
			$html .= ' style="' . $input->html_style() . '"';
			$html .= ' value="' . esc_attr( $value ) . '"';
			$html .= ! empty( $input_raw_value ) && in_array( $value, $input_raw_value ) ? ' checked="checked"' : '';
			$html .= ' ' . $this->_input->other_html_attributes();
			$html .= '>&nbsp;';
			$html .= $display_text;
			$html .= EEH_HTML::nl( -1, 'checkbox' ) . '</label>';
		}
		return $html;
	}



}