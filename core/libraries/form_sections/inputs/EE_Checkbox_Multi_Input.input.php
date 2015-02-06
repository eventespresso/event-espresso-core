<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Class EE_Checkbox_Multi_Input
 *
 * configures a set of checkbox inputs
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
class EE_Checkbox_Multi_Input extends EE_Form_Input_With_Options_Base{

	/**
	 * @param array $input_settings
	 * @param array | EE_Question_Option[] $answer_options
	 */
	public function __construct( $answer_options, $input_settings = array() ) {
		$this->_set_display_strategy( new EE_Checkbox_Display_Strategy() );
		$this->_add_validation_strategy( new EE_Many_Valued_Validation_Strategy( array( new EE_Enum_Validation_Strategy( isset( $input_settings[ 'validation_error_message' ] ) ? $input_settings[ 'validation_error_message' ] : NULL ) )));
		$this->_multiple_selections = TRUE;
		parent::__construct( $answer_options, $input_settings );
	}
}