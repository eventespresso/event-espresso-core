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
 * @since 				$VID:$
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
			$html .= $this->_input->raw_value() && in_array( $value, $this->_input->raw_value() ) ? ' checked="checked"' : '';
			$html .= '>&nbsp;';
			$html .= $display_text;
			$html .= EEH_HTML::nl( -1, 'checkbox' ) . '</label>';
		}
		return $html;
	}



}