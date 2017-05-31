<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Submit_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * This input has a default validation strategy of plaintext (which can be removed after construction)
 */
class EE_Submit_Input extends EE_Form_Input_Base{

	/**
	 * @param array $options
	 */
	public function __construct($options = array()){
		$this->_set_display_strategy(new EE_Submit_Input_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		$this->_add_validation_strategy( new EE_Plaintext_Validation_Strategy() );
		parent::__construct($options);
	}
}