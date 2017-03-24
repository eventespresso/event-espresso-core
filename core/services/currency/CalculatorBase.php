<?php

namespace EventEspresso\core\services\currency;

use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CalculatorBase
 * abstract parent class for Money Calculators
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class CalculatorBase implements Calculator
{

    /**
     * @param int|float $amount
     * @param int       $precision
     * @param int       $rounding_mode
     * @return string
     * @throws InvalidArgumentException
     */
    public function round($amount, $precision, $rounding_mode)
    {
        $this->verifyRoundingMode($rounding_mode);
        if ($rounding_mode === Calculator::ROUND_UP) {
            return (string) ceil($amount);
        }
        if ($rounding_mode === Calculator::ROUND_DOWN) {
            return (string) floor($amount);
        }
        return (string) round($amount, $precision, $rounding_mode);
    }



    /**
     * Asserts that rounding mode is a valid integer value.
     *
     * @param int $rounding_mode
     * @throws InvalidArgumentException If $roundingMode is not valid
     */
    private function verifyRoundingMode($rounding_mode)
    {
        if (
        ! in_array(
            $rounding_mode,
            array(
                Calculator::ROUND_UP,
                Calculator::ROUND_DOWN,
                Calculator::ROUND_HALF_DOWN,
                Calculator::ROUND_HALF_EVEN,
                Calculator::ROUND_HALF_ODD,
                Calculator::ROUND_HALF_UP,
            ),
            true
        )
        ) {
            throw new InvalidArgumentException(
                esc_html__(
                    'Rounding mode should be one of the following: Calculator::ROUND_UP, Calculator::ROUND_DOWN, Calculator::ROUND_HALF_DOWN, Calculator::ROUND_HALF_EVEN, Calculator::ROUND_HALF_ODD, or Calculator::ROUND_HALF_UP.',
                    'event_espresso'
                )
            );
        }
    }



    /**
     * @param $divisor
     * @throws InvalidArgumentException
     */
    protected function validateDivisor($divisor)
    {
        if ((int)$divisor === 0) {
            throw new InvalidArgumentException(
                esc_html__('Division by zero.', 'event_espresso')
            );
        }
    }


}



// End of file CalculatorBase.php
// Location: EventEspresso\core\entities\money/CalculatorBase.php