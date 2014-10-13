<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Class EE_Radio_Button_Display_Strategy
 *
 * displays a set of radio buttons
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson, Brent Christensen
 * @since 				$VID:$
 *
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
		$html = $this->display_label();
		$label_size_class = $this->_input->get_label_size_class();
		foreach( $this->_input->options() as $value => $display_text ){
			$selected_attr = $this->_input->raw_value() === $value ? ' checked="checked"' : '';
			$value_slug = sanitize_key( $value );
			$html .= '<label for="' . rtrim( $this->_input->html_id(), '-' ) . '-' . $value_slug . '"';
			$html .= 'class="ee-radio-label-after' . $label_size_class . '">';
			$html .= '<input id="' . rtrim( $this->_input->html_id(), '-' ) . '-' . $value_slug . '"';
			$html .= 'name="' . $this->_input->html_name() . '"';
			$html .= 'class="' . $this->_input->html_class() . '"';
			$html .= 'style="' . $this->_input->html_style() . '"';
			$html .= 'type="radio"';
			$html .= 'value="' . esc_attr( $value ) . '"';
			$html .= $selected_attr;
			$html .= '>' . $display_text . '</label>';
		}
		return $html;
	}



	/**
	 * Gets the HTML for the 'label', which is just text for this (because labels
	 * should be for each input)
	 * @return string
	 */
	public function display_label(){
		return '<div id="' . $this->_input->html_label_id() . '" class="' . $this->_input->html_label_class() . '" style="' . $this->_input->html_label_style() . '">' . $this->_input->html_label_text() . '</div>';
	}

}