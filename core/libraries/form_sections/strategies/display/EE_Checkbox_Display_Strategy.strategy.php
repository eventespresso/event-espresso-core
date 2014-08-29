<?php
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
		$html = '';
		$multi = count( $this->_input->options() ) > 1 ? TRUE : FALSE;
		foreach( $this->_input->options() as $value => $display_text ){
			$html_id = $multi ? $this->_input->html_id() . '-' . sanitize_key( $value ) : $this->_input->html_id();
			$html .= '<label for="' . $html_id . '" class="ee-checkbox-label-after">';
			$html .= EEH_Formatter::nl(1);
			$html .= '<input type="checkbox"';
			$html .= ' name="' . $this->_input->html_name() . '[]"';
			$html .= ' id="' . $html_id . '"';
			$html .= ' class="' . $this->_input->html_class() . '"';
			$html .= ' style="' . $this->_input->html_style() . '"';
			$html .= ' value="' . esc_attr( $value ) . '"';
			$html .= $this->_input->raw_value() && in_array( $value, $this->_input->raw_value() ) ? ' checked="checked"' : '';
			$html .= '>&nbsp;';
			$html .= $display_text;
			$html .= EEH_Formatter::nl(-1) . '</label>';
		}
		return $html;
	}



	/**
	 * Gets the HTML for the 'label', which is just text for this (because labels
	 * should be for each input)
	 * @return string
	 */
	public function display_label(){
		return '<span id="' . $this->_input->html_label_id() . '" class="' . $this->_input->html_label_class() . '" style="' . $this->_input->html_label_style() . '">' . $this->_input->html_label_text() . '</span>';
	}

}