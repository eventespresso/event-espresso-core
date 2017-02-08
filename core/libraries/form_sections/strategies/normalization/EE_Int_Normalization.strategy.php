<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Int_Normalization
 * Casts the string to an int. If the user inputs anything but numbers, we growl at them
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Int_Normalization extends EE_Normalization_Strategy_Base{

	/**
	 * @param string $value_to_normalize
	 * @return int|mixed|string
	 * @throws \EE_Validation_Error
	 */
	public function normalize($value_to_normalize) {
		if( is_int( $value_to_normalize ) ){
			return $value_to_normalize;
		}

		if ( is_null( $value_to_normalize ) || $value_to_normalize === '' ) {
		    return null;
        }

		if( ! is_string( $value_to_normalize )){
			throw new EE_Validation_Error( sprintf( __( 'The value "%s" must be a string submitted for normalization, it was %s', 'event_espresso' ), print_r( $value_to_normalize, TRUE), gettype( $value_to_normalize ) ) );
		}
		$thousands_separator = EE_Config::instance()->currency->thsnds;
		$value_to_normalize = str_replace( $thousands_separator, "", $value_to_normalize );
		$value_to_normalize = str_replace( array(" ","\t"), '', $value_to_normalize );
		if ( preg_match( '/^\d+$/', $value_to_normalize )) {
			return intval( $value_to_normalize );
		} else {
			//find if this input has a int validation strategy
			//in which case, use its message
			$validation_error_message = NULL;
			foreach( $this->_input->get_validation_strategies() as $validation_strategy ){
				if( $validation_strategy instanceof EE_Int_Validation_Strategy ){
					$validation_error_message = $validation_strategy->get_validation_error_message();
				}
			}
			//this really shouldn't ever happen because fields with a int normalization strategy
			//should also have a int validation strategy, but in case it doesnt use the default
			if( ! $validation_error_message ){
				$default_validation_strategy = new EE_Int_Validation_Strategy();
				$validation_error_message = $default_validation_strategy->get_validation_error_message();
			}
			throw new EE_Validation_Error( $validation_error_message, 'numeric_only' );
		}
	}

	/**
	 * Converts the int into a string for use in teh html form
	 * @param int $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ) {
	    if ($normalized_value === null) {
	        return '';
        }elseif( empty( $normalized_value ) ){
			return '0';
		}else{
			return "$normalized_value";
		}
	}
}

// End of file EE_Int_Normalization.strategy.php