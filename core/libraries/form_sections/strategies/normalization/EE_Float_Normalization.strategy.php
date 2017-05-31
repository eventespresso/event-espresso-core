<?php if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * EE_Float_Normalization
 * Casts to float, and allows spaces, commas, and periods in the inputted string
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Float_Normalization extends EE_Normalization_Strategy_Base
{

    /*
     * regex pattern that matches for the following:
     *      * optional negative sign
     *      * one or more digits or decimals
     */
    const REGEX = '/^(-?)([\d.]+)$/';



    /**
     * @param string $value_to_normalize
     * @return float
     * @throws \EE_Validation_Error
     */
    public function normalize($value_to_normalize)
    {
        if ($value_to_normalize === null) {
            return null;
        }
        if (is_float($value_to_normalize) || is_int($value_to_normalize)) {
            return (float)$value_to_normalize;
        }
        if (! is_string($value_to_normalize)) {
            throw new EE_Validation_Error(
                sprintf(
                    __('The value "%s" must be a string submitted for normalization, it was %s', 'event_espresso'),
                    print_r($value_to_normalize, true),
                    gettype($value_to_normalize)
                )
            );
        }
        $normalized_value = filter_var(
            $value_to_normalize,
            FILTER_SANITIZE_NUMBER_FLOAT,
            FILTER_FLAG_ALLOW_FRACTION
        );
        if ($normalized_value === '') {
            return null;
        }
        if (preg_match(EE_Float_Normalization::REGEX, $normalized_value, $matches)) {
            if (count($matches) === 3) {
                // if first match is the negative sign,
                // then the number needs to be multiplied by -1 to remain negative
                return $matches[1] === '-'
                    ? (float)$matches[2] * -1
                    : (float)$matches[2];
            }
        }
        //find if this input has a float validation strategy
        //in which case, use its message
        $validation_error_message = null;
        foreach ($this->_input->get_validation_strategies() as $validation_strategy) {
            if ($validation_strategy instanceof EE_Float_Validation_Strategy) {
                $validation_error_message = $validation_strategy->get_validation_error_message();
            }
        }
        //this really shouldn't ever happen because fields with a float normalization strategy
        //should also have a float validation strategy, but in case it doesn't use the default
        if (! $validation_error_message) {
            $default_validation_strategy = new EE_Float_Validation_Strategy();
            $validation_error_message = $default_validation_strategy->get_validation_error_message();
        }
        throw new EE_Validation_Error($validation_error_message, 'float_only');
    }



    /**
     * Converts a float into a string
     *
     * @param float $normalized_value
     * @return string
     */
    public function unnormalize($normalized_value)
    {
        if (empty($normalized_value)) {
            return '0.00';
        }
        return "{$normalized_value}";
    }
}
// End of file EE_Float_Normalization.strategy.php
