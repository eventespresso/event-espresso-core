<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Select_Multiple_Display_Strategy
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Select_Multiple_Display_Strategy extends EE_Select_Display_Strategy{
	public function display() {
		$input = $this->_input;		
		if( ! $input instanceof EE_Form_Input_With_Options_Base){
			throw new EE_Error(sprintf(__("Cannot use Select Multiple Display Strategy with an input that doesn't ahve options", "event_espresso")));
		}
		$html= EEH_Formatter::nl(1) . "<select multiple id='{$input->html_id()}' name='{$input->html_name()}[]' class='{$input->html_class()}' style='{$input->html_style()}'/>";
		EE_Registry::instance()->load_helper('Array');
		if(EEH_Array::is_multi_dimensional_array($input->options())){
			throw new EE_Error(sprintf(__("Select multiple display strategy does not allow for nested arrays of options.", "event_espresso")));
		}else{
			$html.=$this->_display_options($input->options());
		}
		
		$html.= EEH_Formatter::nl(-1) . "</select>";
		return $html;
	}
	/**
	 * Checks if that $value is one of the selected ones
	 * @param string|int $value
	 * @return boolean
	 */
	protected function _check_if_option_selected($value){
		$selected_options = $this->_input->raw_value();
		if( ! $selected_options ){
			return false;
		}
		$equality = in_array("$value",$selected_options );
		return $equality;
	}
}

// End of file EE_Select_Multiple_Display_Strategy.strategy.php