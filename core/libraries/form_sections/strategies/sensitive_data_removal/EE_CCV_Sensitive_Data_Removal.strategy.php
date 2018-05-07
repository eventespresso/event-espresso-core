<?php

/**
 * EE_CCV_Sensitive_Data_Removal
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_CCV_Sensitive_Data_Removal extends EE_Sensitive_Data_Removal_Base
{
    public function remove_sensitive_data($normalized_value)
    {
        // Get the ccv Length
        $ccv_lenght = strlen($normalized_value);
        // Replace all characters of credit card except the last four and dashes
        for ($i=0; $i<$ccv_lenght; $i++) {
            if ($normalized_value[ $i ] == '-') {
                continue;
            }
            $normalized_value[ $i ] = 'X';
        }
        // Return the masked Credit Card #
        return $normalized_value;
    }
}
