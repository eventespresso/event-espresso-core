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
		return "<textarea type='text' id='{$input->html_id()}' name='{$input->html_name()}' class='{$input->html_class()}' style='{$input->html_style()}' rows={$rows} cols={$cols}>{$raw_value}</textarea>";
	}
}