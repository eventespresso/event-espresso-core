<?php

class EE_Radio_Button_Input extends EE_Form_Input_With_Options_Base{

	function __construct( $radio_options, $options ){
		$this->_set_display_strategy( new EE_Radio_Button_Display_Strategy( $radio_options ) );
		$this->_add_validation_strategy( new EE_Enum_Validation_Strategy() );
		parent::__construct( $radio_options, $options );
	}

}