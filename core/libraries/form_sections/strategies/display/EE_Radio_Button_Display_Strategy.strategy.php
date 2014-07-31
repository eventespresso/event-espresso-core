<?php
/**
 * displays a set of radio buttons
 */
class EE_Radio_Button_Display_Strategy extends EE_Display_Strategy_Base{

	/**
	 *
	 * @throws EE_Error
	 * @return string of html to display the field
	 */
	function display(){
		if ( ! $this->_input instanceof EE_Form_Input_With_Options_Base ){
			throw new EE_Error(sprintf(__('Can not use Radio Button Display Strategy with an input that doesn\'t have options', 'event_espresso' )));
		}
		//d( $this->_input );
		$html = '';
		foreach( $this->_input->options() as $value => $display_text ){
			if ( $this->_input->raw_value() && in_array( $value, $this->_input->raw_value() )){
				$selected_attr = ' checked="checked"';
			} else {
				$selected_attr = '';
			}
			$value_slug = sanitize_key( $value );
			$html .= '<label for="' . $this->_input->html_id() . '-' . $value_slug . '"';
			$html .= 'class="ee-radio-label-after">';
			$html .= '<input id="' . $this->_input->html_id() . '-' . $value_slug . '"';
			$html .= 'name="' . $this->_input->html_name() . '[]"';
			$html .= 'class="' . $this->_input->html_class() . '"';
			$html .= 'style="' . $this->_input->html_style() . '"';
			$html .= 'type="radio"';
			$html .= 'value="' . esc_attr( $value ) . '"';
			$html .= $selected_attr;
			$html .= '>&nbsp;' . $display_text . '</label>';
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