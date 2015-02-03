<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Text_Normalization
 * Really does nothing to the input. It came in a string and we leave it as-such
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Text_Normalization extends EE_Normalization_Strategy_Base{

	/**
	 * @param string $value_to_normalize
	 * @return array|mixed|string
	 */
	public function normalize($value_to_normalize) {
		if(is_array($value_to_normalize)){
			return array_shift($value_to_normalize);
		}else{
			return $value_to_normalize;
		}
	}
	/**
	 * IF its a string in PHP, it will be a string in the HTML form. easy
	 * @param string $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ){
		return $normalized_value;
	}
}

// End of file EE_Text_Normalization.strategy.php