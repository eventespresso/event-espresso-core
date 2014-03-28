<?php
class EE_Checkbox_Display_Strategy extends EE_Select_Display_Strategy{
	
	/**
	 * 
	 * @return string of html to display the field
	 */
	function display(){
		$input = $this->_input;		
		if( ! $input instanceof EE_Form_Input_With_Options_Base){
			throw new EE_Error(sprintf(__("Cannot use Checkbox Display Strategy with an input that doesn't ahve options", "event_espresso")));
		}
		$html='';
		foreach($input->options() as $value => $display_text){
			if($input->raw_value() && in_array("$value", $input->raw_value())){
				$selected_attr = 'checked';
			}else{
				$selected_attr ='';
			}
			$slugified_value = sanitize_key($value);
			$value_inside_attribute = esc_attr($value);
			$html.="<input id='{$input->html_id()}-{$slugified_value}' name='{$input->html_name()}[]' class='{$input->html_class()}' style='{$input->html_style()}' type='checkbox' value='$value_inside_attribute' $selected_attr><label for='{$input->html_id()}-{$slugified_value}'>$display_text</label>";
		}
		return $html;
	}
	/**
	 * Gets the HTML for the 'label', which is just text for this (because labels
	 * should be for each input)
	 * @return string
	 */
	public function display_label(){
		$input = $this->_input;
		return "<span id='{$input->html_label_id()}' class='{$input->html_label_class()}' style='{$input->html_label_style()}'>".
				$input->html_label_text().
				"</span>";
	}
	
}