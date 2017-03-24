<?php

namespace EventEspresso\core\services\currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



interface Calculator
{

    /**
     * Round val up to precision decimal places AWAY from zero,
     * when it is half way there. Making 1.5 into 2 and -1.5 into -2.
     */
    const ROUND_HALF_UP   = PHP_ROUND_HALF_UP;

    /**
     * Round val down to precision decimal places TOWARDS zero,
     * when it is half way there. Making 1.5 into 1 and -1.5 into -1.
     */
    const ROUND_HALF_DOWN = PHP_ROUND_HALF_DOWN;

    /**
     * Round val to precision decimal places towards the next even value.
     */
    const ROUND_HALF_EVEN = PHP_ROUND_HALF_EVEN;

    /**
     * Round val to precision decimal places towards the next odd value.
     */
    const ROUND_HALF_ODD  = PHP_ROUND_HALF_ODD;

    /**
     * Round val up to the next highest integer
     */
    const ROUND_UP = 5;

    /**
     * Round val down to the next lowest integer
     */
    const ROUND_DOWN = 6;



    /**
     * returns true if a calculator is supported as determined by loaded server extensions
     *
     * @return bool
     */
    public function isSupported();



    /**
     * adds the supplied Money amount to this Money amount
     * and returns a new Money object
     *
     * @param string           $amount
     * @param float|int|string $amount_to_add
     * @return string
     */
    public function add($amount, $amount_to_add);



    /**
     * subtracts the supplied Money amount from this Money amount
     * and returns a new Money object
     *
     * @param string           $amount
     * @param float|int|string $amount_to_subtract
     * @return string
     */
    public function subtract($amount, $amount_to_subtract);



    /**
     * multiplies this Money amount by the supplied $multiplier
     * and returns a new Money object
     *
     * @param string           $amount
     * @param float|int|string $multiplier
     * @param int              $precision
     * @param int              $rounding_mode
     * @return string
     */
    public function multiply($amount, $multiplier, $precision, $rounding_mode);



    /**
     * divides this Money amount by the supplied $divisor
     * and returns a new Money object
     *
     * @param string           $amount
     * @param float|int|string $divisor
     * @param int              $precision
     * @param int              $rounding_mode
     * @return string
     */
    public function divide($amount, $divisor, $precision, $rounding_mode);



    /**
     * adjust amount according to precision and rounding mode
     *
     * @param int|float $amount
     * @param int       $precision
     * @param int       $rounding_mode
     * @return string
     */
    public function round($amount, $precision, $rounding_mode);


}
// End of file Calculator.php
// Location: core/services/currency/Calculator.php