<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_CCV_Input
 * Text-field, except should evaluate to a number, and should be completely emptied
 * when cleaning out sensitive data
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_CVV_Input extends EE_Text_Input{

	/**
	 * @param array $input_settings
	 */
	public function __construct($input_settings = array()) {
		$this->set_sensitive_data_removal_strategy(new EE_CCV_Sensitive_Data_Removal());
		$this->_add_validation_strategy( new EE_Int_Validation_Strategy(isset( $input_settings[ 'validation_error_message' ] ) ? $input_settings[ 'validation_error_message' ] : NULL ) );
		parent::__construct($input_settings);
	}
}

// End of file EE_CCV_Input.input.php