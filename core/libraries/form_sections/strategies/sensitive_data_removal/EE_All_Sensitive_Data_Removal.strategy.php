<?php

/**
 * EE_All_Sensitive_Data_Removal
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_All_Sensitive_Data_Removal extends EE_Sensitive_Data_Removal_Base
{
    public function remove_sensitive_data($normalized_value)
    {
        switch (gettype($normalized_value)) {
            case "boolean":
                return false;
            case "integer":
            case "double":
                return 0;
            case "string":
                return '';
            case "array":
                return array();
            case "object":
            case "resource":
            case "NULL":
            default:
                return null;
        }
    }
}
