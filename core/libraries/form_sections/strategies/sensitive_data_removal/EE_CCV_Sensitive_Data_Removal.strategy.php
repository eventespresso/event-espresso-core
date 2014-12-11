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
 * EE_CCV_Sensitive_Data_Removal
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_CCV_Sensitive_Data_Removal extends EE_Sensitive_Data_Removal_Base{
	public function remove_sensitive_data($normalized_value){
		// Get the ccv Length
		$ccv_lenght = strlen($normalized_value);
		// Replace all characters of credit card except the last four and dashes
		for($i=0; $i<$ccv_lenght; $i++){
			if($normalized_value[$i] == '-'){continue;}
			$normalized_value[$i] = 'X';
		}
		// Return the masked Credit Card #
		return $normalized_value;
	}
}

// End of file EE_CCV_Sensitive_Data_Removal.strategy.php