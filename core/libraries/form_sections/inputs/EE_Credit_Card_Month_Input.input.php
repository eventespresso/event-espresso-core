<?php

/**
 * EE_Credit_Card_Month_Input
 * Exactly like EE_Month_Input, except has the EE_All_Sensitive_Data_Removal strategy
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Credit_Card_Month_Input extends EE_Month_Input
{

    /**
     * @param bool  $leading_zero
     * @param array $input_settings
     * @param bool $january_is_month_1
     */
    public function __construct(
        $leading_zero = false,
        $input_settings = array(),
        $january_is_month_1 = true
    ) {
        $this->set_sensitive_data_removal_strategy(new EE_All_Sensitive_Data_Removal());
        parent::__construct(
            $leading_zero,
            $input_settings,
            $january_is_month_1
        );
    }
}
