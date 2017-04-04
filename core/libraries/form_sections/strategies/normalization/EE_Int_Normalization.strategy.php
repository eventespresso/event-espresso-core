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
        if ($value_to_normalize === null || $value_to_normalize === '') {
            return null;
        }
        if( is_int( $value_to_normalize ) || is_float($value_to_normalize) ){
			return $value_to_normalize;
		}
		if( ! is_string( $value_to_normalize )){
			throw new EE_Validation_Error(
			    sprintf(
			        __( 'The value "%s" must be a string submitted for normalization, it was %s', 'event_espresso' ),
                        print_r( $value_to_normalize, TRUE),
                        gettype( $value_to_normalize )
                )
            );
		}
		$value_to_normalize = EEH_Money::strip_localized_money_formatting($value_to_normalize);
		$matches = array();
		if ( preg_match( '/^(-?)(\d+)$/', $value_to_normalize, $matches )) {
		    if(count($matches) !== 3){
                throw new EE_Validation_Error(
                    sprintf( __( 'The integer value of "%1$s" could not be determined.', 'event_espresso'),
                    $value_to_normalize )
                );
            }
            // if first match is the negative sign,
            // then the number needs to be multiplied by -1 to remain negative
            return $matches[1] === '-'
                ? (int) $matches[2] * -1
                : (int) $matches[2];

		}
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

	/**
	 * Converts the int into a string for use in teh html form
	 * @param int $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ) {
	    if ($normalized_value === null) {
	        return '';
        }
        if( empty( $normalized_value ) ){
			return '0';
		}
		return "$normalized_value";
	}
}

// End of file EE_Int_Normalization.strategy.php