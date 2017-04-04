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
		if(is_array($value_to_normalize)) {
            return (string)array_shift($value_to_normalize);
        }
        // consider `"null"` values to be equivalent to null.
        if($value_to_normalize === '' || $value_to_normalize === null) {
		    return null;
		}
        return (string)$value_to_normalize;
    }
	/**
	 * IF its a string in PHP, it will be a string in the HTML form. easy
	 * @param string $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ){
	    //account for default "select here" option values
	    if ($normalized_value === null) {
	        return '';
        }
        //double-check it's a string. It's possible this value was a question option that happened to be a numeric
        //string, in which case PHP has automatically converted it to an integer!
		return (string)$normalized_value;
	}
}

// End of file EE_Text_Normalization.strategy.php