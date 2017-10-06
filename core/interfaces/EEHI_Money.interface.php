<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Money-related helper
 */
interface EEHI_Money
{

    /**
     * For comparing floats. Default operator is '=', but see the $operator below for all options.
     * This should be used to compare floats instead of normal '==' because floats
     * are inherently imprecise, and so you can sometimes have two floats that appear to be identical
     * but actually differ by 0.00000001.
     *
     * @param float  $float1
     * @param float  $float2
     * @param string $operator The operator. Valid options are =, <=, <, >=, >, <>, eq, lt, lte, gt, gte, ne
     * @return boolean whether the equation is true or false
     */
    public function compare_floats($float1, $float2, $operator = '=');
}
// End of file EEHI_Money.interface.php
// Location: core/interfaces/EEHI_Money.interface.php