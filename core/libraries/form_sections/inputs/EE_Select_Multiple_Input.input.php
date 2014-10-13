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
 * EE_Select_Multiple
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Select_Multiple_Input extends EE_Form_Input_With_Options_Base{

	/**
	 * @param array | EE_Question_Option[] $answer_options
	 * @param array $input_settings
	 */
	public function __construct( $answer_options = array(), $input_settings ) {
		$this->_set_display_strategy( new EE_Select_Multiple_Display_Strategy() );
		$this->_add_validation_strategy( new EE_Many_Valued_Validation_Strategy( array( new EE_Enum_Validation_Strategy() )));
		$this->_multiple_selections = TRUE;
		parent::__construct( $answer_options, $input_settings );
	}

}

// End of file EE_HABTM_Input.input.php