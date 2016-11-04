<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Hidden_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Hidden_Input extends EE_Form_Input_Base{

	/**
	 * @param array $input_settings
	 */
	public function __construct($input_settings = array()){
		//require_once('strategies/display_strategies/EE_Text_Input_Display_Strategy.strategy.php');
		$this->_set_display_strategy(new EE_Hidden_Display_Strategy());
		if ( isset( $input_settings['normalization_strategy'] ) && $input_settings['normalization_strategy'] instanceof EE_Normalization_Strategy_Base ) {
			$this->_set_normalization_strategy( $input_settings['normalization_strategy'] );
		} else {
			$this->_set_normalization_strategy( new EE_Text_Normalization() );
		}
		parent::__construct( $input_settings );
	}



	/**
	 * @return string
	 */
	public function get_html_for_label() {
		return '';
	}



}
// End of file EE_Hidden_Input.input.php