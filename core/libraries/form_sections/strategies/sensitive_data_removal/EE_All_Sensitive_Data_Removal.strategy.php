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
 * EE_All_Sensitive_Data_Removal
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_All_Sensitive_Data_Removal extends EE_Sensitive_Data_Removal_Base{
	public function remove_sensitive_data($normalized_value) {
		switch(gettype($normalized_value)){
			case "boolean":
				return false;
			case "integer":
			case "double" :
				return 0;
			case "string":
				return '';
			case "array":
				return array();
			case "object":
			case "resource":
			case "NULL":
			default:
				return NULL;
		}
	}
}

// End of file EE_All_Sensitive_Data_Removal.strategy.php