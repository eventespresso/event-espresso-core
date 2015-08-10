<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Class EE_Radio_Button_Display_Strategy
 *
 * displays a set of radio buttons
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
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

		$this->_input->set_label_sizes();
		$label_size_class = $this->_input->get_label_size_class();
		$html = '';
		foreach( $this->_input->options() as $value => $display_text ){
			$value = $this->_input->get_normalization_strategy()->unnormalize( $value );

			$html_id = $this->_append_chars( $this->_input->html_id(), '-' ) . sanitize_key( $value );
			$html .= EEH_HTML::nl( 0, 'radio' );
			$html .= '<label for="' . $html_id . '"';
			$html .= ' id="' . $html_id . '-lbl"';
			$html .= ' class="ee-radio-label-after' . $label_size_class . '">';
			$html .= EEH_HTML::nl( 1, 'radio' );
			$html .= '<input id="' . $html_id . '"';
			$html .= ' name="' . $this->_input->html_name() . '"';
			$html .= ' class="' . $this->_input->html_class() . '"';
			$html .= ' style="' . $this->_input->html_style() . '"';
			$html .= ' type="radio"';
			$html .= ' value="' . esc_attr( $value ) . '"';
			$html .= $this->_input->raw_value() === $value ? ' checked="checked"' : '';
			$html .= '>&nbsp;';
			$html .= $display_text;
			$html .= EEH_HTML::nl( -1, 'radio' ) . '</label>';

		}
		$html .= EEH_HTML::div( '', '', 'clear-float' );
		$html .= EEH_HTML::divx();
		return $html;
	}


}