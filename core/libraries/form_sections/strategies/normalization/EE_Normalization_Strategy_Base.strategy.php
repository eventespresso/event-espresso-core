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
 * EE_Normalization_Strategy_Base
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Normalization_Strategy_Base extends EE_Form_Input_Strategy_Base{
	/**
	 * Takes the sanitized value for the input and casts it into the correct PHP type.
	 * Eg, turns it into an int, float, string, boolean, datetime, etc. The validation
	 * strategy should be able to depend on the normalized value being of the correct type.
	 * If the normalized value passes validation, the normalized value is what other code
	 * will operate on. If the sanitized value cannot be normalized, this method should either
	 * add a validation error onto the input, or rangle the input into a format that can be normalized
	 * (eg, for a date input, if the user enters "2014/100/100", you can either add an error stating 
	 * "hey! 2014/100/100 is not a valid date!", or simply convert it into a valid date like "2014/12/31". 
	 * For this case, I'd prefer the former. But there may be cases where you'd just rather correct it for them)
	 * @param string $value_to_normalize it shoudl always be a string. If the input receives an array, then the 
	 * valdiation strategy shoudl be called on array elements, not on the entire array
	 * @return mixed the normalized value
	 */
	abstract function normalize($value_to_normalize);
}

// End of file EE_Normalization_Strategy_Base.strategy.php