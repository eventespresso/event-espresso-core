<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Normalization_Strategy_Base
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
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
	 * @param string $value_to_normalize it should always be a string. If the input receives an array, then the
	 * validation strategy should be called on array elements, not on the entire array
	 * @return mixed the normalized value
	 */
	abstract function normalize($value_to_normalize);

	/**
	 * Identical to normalize, except normalize_one() CANNOT be passed an array and
	 * never returns an array. Useful if the normalization strategy converts between arrays
	 * @param string $individual_item_to_normalize
	 * @return mixed
	 */
	public function normalize_one( $individual_item_to_normalize ){
		return $this->normalize( $individual_item_to_normalize );
	}



	/**
	 * Takes the normalized value (for an Yes_No_Input this could be TRUE or FALSE), and converts it into
	 * the value you would use in the html form (for a Yes_No_Input this could be '1' or '0').
	 *
	 * @param $normalized_value
	 * @return array|string the 'raw' value as used in the form, usually a string or array of strings.
	 */
	abstract function unnormalize( $normalized_value );

	/**
	 * Normally the same as unnormalize, except it CANNOT be passed an array and
	 * ALWAYS returns a string
	 * @param mixed $individual_item_to_unnormalize NOT an array
	 * @return string
	 */
	public function unnormalize_one( $individual_item_to_unnormalize ) {
		return $this->unnormalize( $individual_item_to_unnormalize );
	}
}

// End of file EE_Normalization_Strategy_Base.strategy.php