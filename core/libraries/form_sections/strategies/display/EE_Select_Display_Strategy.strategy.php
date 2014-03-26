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
		$html= "<select id='{$input->html_id()}' name='{$input->html_name()}' class='{$input->html_class()}' style='{$input->html_style()}'>";
		$cntr = 0;
		foreach( $this->_options as $value => $display_text ){
			if("{$input->raw_value()}" == "$value"){
				$selected_attr = 'selected="selected"';
			}else{
				$selected_attr ='';
			}
			$tabs = $cntr == 0 ? 1 : 0;
			$html.= ee_newline($tabs) . "<option value='$value' $selected_attr>$display_text</option>";
			$cntr++;
		}
		$html.= ee_newline(-1) . "</select>";
		return $html;
	}
	
}