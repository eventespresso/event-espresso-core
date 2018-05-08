<?php

/**
 * EE_Sensitive_Data_Removal_Base
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Sensitive_Data_Removal_Base extends EE_Form_Input_Strategy_Base
{
    /**
     * Removes all the sensitive data from this normalized value.
     * For example, should could 'mask' a credit card from
     * '1234 1234 1234 1234' TO '**** **** **** 1234'.
     * Or turn a ccv number from
     * '123' to '***',
     * or turn a password from
     * 'CantHac7Th15' to '*************',
     * or just leave htevalue as-is
     * @return mixed
     */
    abstract public function remove_sensitive_data($normalized_value);
}
