<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Year_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * This input has a default validation strategy of plaintext (which can be removed after construction)
 */
class EE_Text_Input extends EE_Form_Input_Base{


	/**
	 * @param array $options
	 */
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		//by default we use the plaintext validation. If you want something else,
		//just remove it after the input is constructed :P using EE_Form_Input_Base::remove_validation_strategy()
		$this->_add_validation_strategy( new EE_Plaintext_Validation_Strategy() );
		parent::__construct($options);
	}



}