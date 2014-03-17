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
 * EE_Int_Validation_Strategy
 *
 * @package			Event Espresso
 * @subpackage	Expression package is undefined on line 19, column 19 in Templates/Scripting/PHPClass.php.
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Int_Validation_Strategy extends EE_Validation_Strategy_Base{
	
	public function validate($normalized_value) {
		//this should have already been detected by the normalization strategy
	}
	function get_jquery_validation_rule_array(){
		return array('digits'=>true);
	}
}

// End of file EE_Int_Validation_Strategy.strategy.php