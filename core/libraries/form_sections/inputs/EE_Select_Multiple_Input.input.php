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
	public function __construct($select_options, $options_array = array()) {
		$this->_set_display_strategy(new EE_Select_Multiple_Display_Strategy());
		$this->_add_validation_strategy(new EE_Enum_Validation_Strategy());
		parent::__construct($select_options, $options_array);
	}
	
}

// End of file EE_HABTM_Input.input.php