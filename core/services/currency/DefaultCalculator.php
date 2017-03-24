<?php

namespace EventEspresso\core\services\currency;

use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class DefaultCalculator
 * does not require any special server extensions loaded so will work anywhere
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class DefaultCalculator extends CalculatorBase
{



    /**
     * returns true if a calculator is supported as determined by loaded server extensions
     *
     * @return bool
     */
    public function isSupported()
    {
        return true;
    }



    /**
     * adds the supplied Money amount to this Money amount
     * and returns a new Money object
     *
     * @param float|int|string $amount
     * @param float|int|string $amount_to_add
     * @return string
     */
    public function add($amount, $amount_to_add)
    {
        return (string) ($amount + $amount_to_add);
    }



    /**
     * subtracts the supplied Money amount from this Money amount
     * and returns a new Money object
     *
     * @param float|int|string $amount
     * @param float|int|string $amount_to_subtract
     * @return string
     */
    public function subtract($amount, $amount_to_subtract)
    {
        return (string) ($amount - $amount_to_subtract);
    }



    /**
     * multiplies this Money amount by the supplied $multiplier
     * and returns a new Money object
     *
     * @param float|int|string $amount
     * @param float|int|string $multiplier
     * @param int              $precision
     * @param int              $rounding_mode
     * @return string
     * @throws InvalidArgumentException
     */
    public function multiply($amount, $multiplier, $precision = 3, $rounding_mode = Calculator::ROUND_HALF_UP)
    {
        return $this->round(($amount * $multiplier), $precision, $rounding_mode);
    }



    /**
     * divides this Money amount by the supplied $divisor
     * and returns a new Money object
     *
     * @param float|int|string $amount
     * @param float|int|string $divisor
     * @param int              $precision
     * @param int              $rounding_mode
     * @return string
     * @throws InvalidArgumentException
     */
    public function divide($amount, $divisor, $precision = 3, $rounding_mode = Calculator::ROUND_HALF_UP)
    {
        $this->validateDivisor($divisor);
        return $this->round(($amount / $divisor), $precision, $rounding_mode);
    }



}
// End of file DefaultCalculator.php
// Location: EventEspresso\core\entities\money/DefaultCalculator.php