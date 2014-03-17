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
 * EE_Boolean_Normalization
 * Just casts it to a boolean (so we're assuming that we're only receiving 0 and 1s as
 * inputs. DOes not handle stuff like 'yes','true','money',whatever. 1s and 0s.
 * Does not growl because the only reason they would NOT have a 1 or 0, using something like
 * a select or checkbox, is because they hacked the form
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Boolean_Normalization extends EE_Normalization_Strategy_Base{
	public function normalize($value_to_normalize) {
		return (boolean)intval($value_to_normalize);
	}
}

// End of file EE_Boolean_Normalization.strategy.php