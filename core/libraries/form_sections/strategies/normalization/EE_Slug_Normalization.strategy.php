<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Slug_Normalization
 * Simply converts the string into a slug. DOes not add any errors if its bad.
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Slug_Normalization extends EE_Normalization_Strategy_Base{

	/**
	 * @param string $value_to_normalize
	 * @return string
	 */
	public function normalize($value_to_normalize) {
		return sanitize_title($value_to_normalize);
	}

	/**
	 * It's hard to unnormalize this- let's just take a guess
	 * @param string $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ) {
		return str_replace( "-", " ", $normalized_value );
	}

}

// End of file EE_Slug_Normalization.strategy.php