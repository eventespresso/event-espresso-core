<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Radio_Button_Display_Strategy
 * displays a set of radio buttons
 *
 * @package     Event Espresso
 * @subpackage 	core
 * @author      Mike Nelson
 * @since       4.6
 */
class EE_Radio_Button_Display_Strategy extends EE_Compound_Input_Display_Strategy {

	/**
	 *
	 * @throws EE_Error
	 * @return string of html to display the field
	 */
	public function display(){
		$input = $this->get_input();
		$input->set_label_sizes();
		$label_size_class = $input->get_label_size_class();
		$html = '';
		foreach( $input->options() as $value => $display_text ){
			$value = $input->get_normalization_strategy()->unnormalize( $value );

			$html_id = $this->get_sub_input_id( $value );
			$html .= EEH_HTML::nl( 0, 'radio' );
			$html .= '<label for="' . $html_id . '"';
			$html .= ' id="' . $html_id . '-lbl"';
			$html .= ' class="ee-radio-label-after' . $label_size_class . '">';
			$html .= EEH_HTML::nl( 1, 'radio' );
			$html .= '<input id="' . $html_id . '"';
			$html .= ' name="' . $input->html_name() . '"';
			$html .= ' class="' . $input->html_class() . '"';
			$html .= ' style="' . $input->html_style() . '"';
			$html .= ' type="radio"';
			$html .= ' value="' . esc_attr( $value ) . '"';
			$html .= $input->raw_value() === $value ? ' checked="checked"' : '';
			$html .= ' ' . $this->_input->other_html_attributes();
			$html .= '>&nbsp;';
			$html .= $display_text;
			$html .= EEH_HTML::nl( -1, 'radio' ) . '</label>';

		}
		$html .= EEH_HTML::div( '', '', 'clear-float' );
		$html .= EEH_HTML::divx();
		return $html;
	}


}