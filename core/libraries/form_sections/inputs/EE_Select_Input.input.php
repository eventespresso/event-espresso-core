<?php  if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit( 'No direct script access allowed' ); }
/**
 * Class EE_Select_Input
 *
 * Generates an HTML <select> form input
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Select_Input extends EE_Form_Input_With_Options_Base{

	/**
	 * @param array $answer_options
	 * @param array $input_settings
	 */
	public function __construct( $answer_options, $input_settings = array() ) {
		$this->_set_display_strategy( new EE_Select_Display_Strategy( $answer_options ) );
		$this->_add_validation_strategy(
			new EE_Enum_Validation_Strategy(
				isset( $input_settings['validation_error_message'] )
					? $input_settings['validation_error_message']
					: null
			)
		);
		parent::__construct( $answer_options, $input_settings );
	}

}