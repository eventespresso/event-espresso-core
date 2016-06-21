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
		$html .= $input->other_html_attributes();
		$html .= ' rows= "' . $rows . '" cols="' . $cols . '">';
		$html .= $raw_value;
		$html .= '</textarea>';
		foreach ( $this->_input->get_validation_strategies() as $validation_strategy ) {
			if (
				$validation_strategy instanceof EE_Simple_HTML_Validation_Strategy
				|| $validation_strategy instanceof EE_Full_HTML_Validation_Strategy
			) {
				$html .= sprintf(
					__( '%1$s(allowed tags: %2$s)%3$s', 'event_espresso' ),
					'<p class="ee-question-desc">',
					$validation_strategy->get_list_of_allowed_tags(),
					'</p>'
				);
			}
		}
		return $html;
	}



}