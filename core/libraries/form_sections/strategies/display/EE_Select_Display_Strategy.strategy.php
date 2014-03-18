<?php
/**
 * displays either simple arrays as selected, or if a 2d array is provided, seperates them
 * into optgroups
 */
class EE_Select_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * where array keys are the values, and array values are internationalized strings for displaying in teh select OR a multidimensional-array, where the top-level keys are i18n string ot show for option groups,
	 * and then the values are arrays with keys being the HTML values, and values being what ot display
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
		$html= "<select id='{$input->html_id()}' name='{$input->html_name()}' class='{$input->html_class()}' style='{$input->html_style()}'/>";
		EE_Registry::instance()->load_helper('Array');
		if(EEH_Array::is_multi_dimensional_array($this->_options)){
			foreach($this->_options as $opt_group_label => $opt_group){
				$opt_group_label = esc_attr($opt_group_label);
				$html.="<optgroup label='{$opt_group_label}'>";
				$html.=$this->_display_options($opt_group);
				$html.="</optgroup>";
			}
		}else{
			$html.=$this->_display_options($this->_options);
		}
		
		$html.="</select>";
		return $html;
	}
	/**
	 * Displays a falt list of options as option tags
	 * @param type $options
	 * @return string
	 */
	protected function _display_options($options){
		$html = '';
		foreach($options as $value => $display_text){
			if("{$this->_input->raw_value()}" == "$value"){
				$selected_attr = 'selected="selected"';
			}else{
				$selected_attr ='';
			}
			$value = esc_attr($value);
			$html.="<option value='$value' $selected_attr>$display_text</option>";
		}
		return $html;
	}
}