<?php
class EE_Text_Area_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 *
	 * @return string of html to display the field
	 */
	function display(){
		$input = $this->_input;
		$raw_value = maybe_serialize($input->raw_value());
		if( $input instanceof EE_Text_Area_Input ) {
			$rows = $input->get_rows();
			$cols = $input->get_cols();
		}else{
			$rows = 4;
			$cols = 20;
		}
		$html = '<textarea';
		$html .= ' id="' . $input->html_id() . '"';
		$html .= ' name="' . $input->html_name() . '"';
		$html .= ' class="' . $input->html_class() . '"' ;
		$html .= ' style="' . $input->html_style() . '"';
		$html .= ' rows= "' . $rows . '" cols="' . $cols . '">';
		$html .= $raw_value;
		$html .= '</textarea>';
		if (
			$input->has_validation_strategy(
				array( 'EE_Simple_HTML_Validation_Strategy', 'EE_Full_HTML_Validation_Strategy' )
			)
		) {
			$validation = new EE_Simple_HTML_Validation_Strategy();
			$html .= '<p class="ee-question-desc">';
			$html .= '( ' . __( 'allowed tags: ', 'event_espresso' );
			$html .= $validation->get_list_of_allowed_tags() . ' )</p>';
		}
		return $html;
	}
}