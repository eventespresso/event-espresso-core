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

	/**
	 *
	 * @throws EE_Error
	 * @return string of html to display the field
	 */
	public function display() {

		if( ! $this->_input instanceof EE_Form_Input_With_Options_Base){
			throw new EE_Error(sprintf(__('Cannot use Select Multiple Display Strategy with an input that doesn\'t have options', "event_espresso")));
		}

		$html = EEH_HTML::nl( 0, 'select' );
		$html .= '<select multiple';
		$html .= ' id="' . $this->_input->html_id() . '"';
		$html .= ' name="' . $this->_input->html_name() . '[]"';
		$class = $this->_input->required() ? $this->_input->required_css_class() . ' ' . $this->_input->html_class() : $this->_input->html_class();
		$html .= ' class="' . $class . '"';
		// add html5 required
		$html .= $this->_input->required() ? ' required' : '';
		$html .= ' style="' . $this->_input->html_style() . '"';
		$html .= ' ' . $this->_input->other_html_attributes();
		$html .= '>';

		EEH_HTML::indent( 1, 'select' );
		if( EEH_Array::is_multi_dimensional_array( $this->_input->options() )){
			throw new EE_Error(sprintf(__("Select multiple display strategy does not allow for nested arrays of options.", "event_espresso")));
		}else{
			$html.=$this->_display_options( $this->_input->options() );
		}

		$html.= EEH_HTML::nl( -1, 'select' ) . "</select>";
		return $html;
	}



	/**
	 * Checks if that $value is one of the selected ones
	 * @param string|int $value unnormalized value option (string)
	 * @return boolean
	 */
	protected function _check_if_option_selected( $value ){
		$selected_options = $this->_input->raw_value();
		if ( empty( $selected_options )){
			return FALSE;
		}
		return in_array( $value, $selected_options ) ? TRUE : FALSE;
	}



}
// End of file EE_Select_Multiple_Display_Strategy.strategy.php