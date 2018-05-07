<?php

/**
 * EE_No_Sensitive_Data_Removal
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_No_Sensitive_Data_Removal extends EE_Sensitive_Data_Removal_Base
{
    public function remove_sensitive_data($normalized_value)
    {
        return $normalized_value;
    }
}
