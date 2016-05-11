<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 *
 * Class EE_Compound_Input_Display_Strategy
 *
 * For displaying input classes that are actually a many html inputs.
 *
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   4.9.0
 *
 */
abstract class EE_Compound_Input_Display_Strategy extends EE_Display_Strategy_Base {

	/**
	 * Gets the html ID for the sub-input for the specified option html value (not display text)
	 *
	 * @param string $option_value
	 * @param bool   $add_pound_sign
	 * @return string
	 */
	public function get_sub_input_id( $option_value, $add_pound_sign = false ) {
		return $this->_append_chars( $this->_input->html_id( $add_pound_sign ), '-' ) . sanitize_key( $option_value );
	}



	/**
	 * Gets the HTML IDs of all the inputs
	 *
	 * @param boolean $add_pound_sign
	 * @return array
	 * @throws \EE_Error
	 */
	public function get_html_input_ids( $add_pound_sign = false ) {
		$html_input_ids = array();
		foreach( $this->get_input()->options() as $value => $display ) {
			$html_input_ids[] = $this->get_sub_input_id( $value, $add_pound_sign );
		}
		return $html_input_ids;
	}



	/**
	 * Overrides parent to make sure this display strategy is only used with the
	 * appropriate input type
	 *
	 * @return \EE_Form_Input_With_Options_Base
	 * @throws \EE_Error
	 */
	public function get_input() {
		if ( ! $this->_input instanceof EE_Form_Input_With_Options_Base ){
			throw new EE_Error(
				sprintf(
					__(
						'Can not use a Compound Input Display Strategy (eg checkbox or radio) with an input that doesn\'t have options',
						'event_espresso'
					)
				)
			);
		}
		return parent::get_input();
	}
}
