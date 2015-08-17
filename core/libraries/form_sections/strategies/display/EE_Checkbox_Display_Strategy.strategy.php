<?php
/**
 *
 * Class EE_Checkbox_Display_Strategy
 *
 * displays a set of checkbox inputs
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Checkbox_Display_Strategy extends EE_Display_Strategy_Base{

	/**
	 *
	 * @throws EE_Error
	 * @return string of html to display the field
	 */
	function display(){
		if( ! $this->_input instanceof EE_Form_Input_With_Options_Base ){
			throw new EE_Error(sprintf(__("Cannot use Checkbox Display Strategy with an input that doesn't have options", "event_espresso")));
		}
		//d( $this->_input );
		$multi = count( $this->_input->options() ) > 1 ? TRUE : FALSE;
		$this->_input->set_label_sizes();
		$label_size_class = $this->_input->get_label_size_class();
		$html = '';
		if ( ! is_array( $this->_input->raw_value() ) && $this->_input->raw_value() !== NULL ) {
			EE_Error::doing_it_wrong(
				'EE_Checkbox_Display_Strategy::display()',
				sprintf(
					__( 'Input values for checkboxes should be an array of values, but the value for input "%1$s" is "%2$s". Please verify that the input name is exactly "%3$s"', 'event_espresso'),
					$this->_input->html_id(),
					var_export( $this->_input->raw_value(), true),
					$this->_input->html_name() . '[]'
				),
				'4.8.1'
			);
		}
		$input_raw_value = (array)$this->_input->raw_value();
		foreach( $this->_input->options() as $value => $display_text ){
			$option_value_as_string = $this->_input->get_normalization_strategy()->unnormalize_one( $value );
			$html_id = $multi ? $this->_input->html_id() . '-' . sanitize_key( $option_value_as_string ) : $this->_input->html_id();
			$html .= EEH_HTML::nl( 0, 'checkbox' );
			$html .= '<label for="' . $html_id . '" id="' . $html_id . '-lbl" class="ee-checkbox-label-after' . $label_size_class . '">';
			$html .= EEH_HTML::nl( 1, 'checkbox' );
			$html .= '<input type="checkbox"';
			$html .= ' name="' . $this->_input->html_name() . '[]"';
			$html .= ' id="' . $html_id . '"';
			$html .= ' class="' . $this->_input->html_class() . '"';
			$html .= ' style="' . $this->_input->html_style() . '"';
			$html .= ' value="' . esc_attr( $value ) . '"';
			$html .= ! empty( $input_raw_value ) && in_array( $value, $input_raw_value ) ? ' checked="checked"' : '';
			$html .= '>&nbsp;';
			$html .= $display_text;
			$html .= EEH_HTML::nl( -1, 'checkbox' ) . '</label>';
		}
		return $html;
	}



}