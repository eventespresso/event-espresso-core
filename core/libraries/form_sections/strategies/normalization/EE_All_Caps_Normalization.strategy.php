<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_All_Caps_Normalization
 * Just makes sure the string is all upper case. If the user didn't provide an all
 * upper case input, we just correct it for them
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_All_Caps_Normalization extends EE_Normalization_Strategy_Base{

	/**
	 * @param string $value_to_normalize
	 * @return string
	 */
	function normalize($value_to_normalize) {
		return strtoupper($value_to_normalize);
	}

	/**
	 * It's kinda hard to unnormalize this- we can't determine which parts used to be lowercase
	 * so just return it as-is.
	 * @param string $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ) {
		return $normalized_value;
	}

}