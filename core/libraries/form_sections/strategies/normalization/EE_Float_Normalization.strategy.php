<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Float_Normalization
 * Casts to float, and allows spaces, commas, and periods in the inputted string
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Float_Normalization extends EE_Normalization_Strategy_Base{

	/**
	 * @param string $value_to_normalize
	 * @return float
	 * @throws \EE_Validation_Error
	 */
	public function normalize($value_to_normalize) {
		if($value_to_normalize === NULL){
			return 0.00;
		}
		if( is_float($value_to_normalize)
            || is_integer($value_to_normalize)){
		    return floatval($value_to_normalize);
        }
		if(is_string($value_to_normalize)) {
            $normalized_value = str_replace(array(" ", EE_Config::instance()->currency->thsnds), "",
                $value_to_normalize);
            //normalize it so periods are decimal marks (we don't care where you're from: we're talking PHP now)
            $normalized_value = str_replace(EE_Config::instance()->currency->dec_mrk, ".", $normalized_value);
            if (preg_match('/(-?)([\d.]+)/', $normalized_value, $matches)) {
                if(count($matches) === 3){
                    if( $matches[1] === '-'){
                        $negate = true;
                        $number = $matches[2];
                    } else{
                        $negate = false;
                        $number = $matches[2];
                    }
                    $number =  floatval( $number ) ;
                    if( $negate ){
                        $number *= -1;
                    }
                    return $number;
                }
            }
        }

        //find if this input has a float validation strategy
        //in which case, use its message
        $validation_error_message = NULL;
        foreach( $this->_input->get_validation_strategies() as $validation_strategy ){
            if( $validation_strategy instanceof EE_Float_Validation_Strategy ){
                $validation_error_message = $validation_strategy->get_validation_error_message();
            }
        }
        //this really shouldn't ever happen because fields with a float normalization strategy
        //should also have a float validation strategy, but in case it doesn't use the default
        if( ! $validation_error_message ){
            $default_validation_strategy = new EE_Float_Validation_Strategy();
            $validation_error_message = $default_validation_strategy->get_validation_error_message();
        }
        throw new EE_Validation_Error( $validation_error_message, 'float_only' );
	}

	/**
	 * Converts a float into a string
	 * @param float $normalized_value
	 * @return string
	 */
	public function unnormalize($normalized_value) {
		if( empty( $normalized_value ) ){
			return '0.00';
		}else{
			return "$normalized_value";
		}
	}
}

// End of file EE_Float_Normalization.strategy.php