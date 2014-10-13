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
 * EE_CCV_Input
 * Text-field, except should evaluate to a number, and should be completely emptied
 * when cleaning out sensitive data
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_CVV_Input extends EE_Text_Input{
	public function __construct($options = array()) {
		$this->set_sensitive_data_removal_strategy(new EE_All_Sensitive_Data_Removal());
		$this->_add_validation_strategy(new EE_Int_Validation_Strategy());
		parent::__construct($options);
	}
}

// End of file EE_CCV_Input.input.php