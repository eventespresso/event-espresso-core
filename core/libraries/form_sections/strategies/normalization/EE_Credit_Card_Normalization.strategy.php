<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Credit_Card_Normalization
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Credit_Card_Normalization extends EE_Text_Normalization{

	/**
	 * @param string $value_to_normalize
	 * @return mixed
	 */
	public function normalize($value_to_normalize) {
		$normalized_by_parent = parent::normalize($value_to_normalize);
		//we want to make it consistent, so remove whitespace from cc number
		return preg_replace('/\s+/', '', $normalized_by_parent);
	}
}

// End of file EE_Credit_Card_Normalization.strategy.php