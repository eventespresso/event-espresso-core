<?php
class EE_Checkbox_Display_Strategy extends EE_Select_Display_Strategy{

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
		foreach( $this->_input->options() as $value => $display_text ){
			if ( $this->_input->raw_value() && in_array( $value, $this->_input->raw_value() )){
				$selected_attr = ' checked="checked"';
			} else {
				$selected_attr = '';
			}
			$value_slug = sanitize_key( $value );
			$value_inside_attribute = esc_attr( $value );
			$html .= '<label for="' . $this->_input->html_id() . '-' . $value_slug . '" class="ee-checkbox-label-after"><input id="' . $this->_input->html_id() . '-' . $value_slug . '" name="' . $this->_input->html_name() . '[]" class="' . $this->_input->html_class() . '" style="' . $this->_input->html_style() . '" type="checkbox" value="' . $value_inside_attribute . '"' . $selected_attr . '>&nbsp;' . $display_text . '</label>';
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