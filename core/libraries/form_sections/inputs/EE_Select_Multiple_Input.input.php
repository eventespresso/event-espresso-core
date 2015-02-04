<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Select_Multiple_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Select_Multiple_Input extends EE_Form_Input_With_Options_Base{

	/**
	 * @param array | EE_Question_Option[] $answer_options
	 * @param array $input_settings
	 */
	public function __construct( $answer_options, $input_settings = array() ) {
		$this->_set_display_strategy( new EE_Select_Multiple_Display_Strategy() );
		$this->_add_validation_strategy( new EE_Many_Valued_Validation_Strategy( array( new EE_Enum_Validation_Strategy( isset( $input_settings[ 'validation_error_message' ] ) ? $input_settings[ 'validation_error_message' ] : NULL ) )));
		$this->_multiple_selections = TRUE;
		parent::__construct( $answer_options, $input_settings );
	}

}

// End of file EE_HABTM_Input.input.php