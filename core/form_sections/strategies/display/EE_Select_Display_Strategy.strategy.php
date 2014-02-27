<?php
class EE_Select_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * where array keys are the values, and array values are internationalized strings for displaying in teh select
	 * @var array
	 */
	protected $_options;
	function __construct($options) {
		$this->_options = $options;
		parent::__construct();
	}
	/**
	 * 
	 * @return string of html to display the field
	 */
	function display(){
		$input = $this->_input;		
		$html= "<label id='{$input->html_label_id()}' class='{$input->html_label_class()}' style='{$input->html_label_style()}' for='{$input->html_id()}'>".
				$input->html_label_text().
				"</label>".
				"<select id='{$input->html_id()}' name='{$input->html_name()}' class='{$input->html_class()}' style='{$input->html_style()}'/>";
		foreach($this->_options as $value => $display_text){
			if("{$input->sanitized_value()}" == "$value"){
				$selected_attr = 'selected="selected"';
			}else{
				$selected_attr ='';
			}
			$html.="<option value='$value' $selected_attr>$display_text</option>";
		}
		$html.="</select><label id='{$input->html_id()}-errors' class='error' for='{$input->html_id()}'>".
		$input->get_validation_error_string().
		"</label>";
		return $html;
	}
	
}