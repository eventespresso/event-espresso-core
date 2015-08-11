<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Has Code Interface
 * This interface is implemented on classes that have a "code" representation.
 *
 * Eg. EE_Promotion implements this class to represent that it has a code method for outputting a promo code.
 *
 * @package Event Espresso
 * @subpackage interfaces
 * @since   4.8.0
 * @author  Darren Ethier
 */
interface EEI_Has_Code {

	/**
	 * Return a code.
	 * @return string
	 */
	public function code();


} //end EEI_Has_Code interface
