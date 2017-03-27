<?php

namespace EventEspresso\core\entities\money;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\currency\Calculator;
use EventEspresso\core\services\currency\MoneyFormatter;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Money
 * Immutable object representing an amount of money for a particular currency
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class Money
{

    /**
     * number of decimal places to be added to currencies for internal computations,
     * but removed before any output or formatting is applied.
     * This allows us to avoid rounding errors during calculations.
     */
    const EXTRA_PRECISION = 3;

    /**
     * @var int $amount
     */
    private $amount;

    /**
     * @var Currency $currency
     */
    private $currency;

    /**
     * @var Calculator $calculator
     */
    protected $calculator;

    /**
     * @var MoneyFormatter[] $formatters
     */
    protected $formatters;



    /**
     * Money constructor.
     *
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a value amount of 12.50
     * @param Currency         $currency
     * @param Calculator       $calculator
     * @param MoneyFormatter[] $formatters
     * @throws InvalidDataTypeException
     */
    public function __construct($amount, Currency $currency, Calculator $calculator, array $formatters)
    {
        $this->currency = $currency;
        $this->amount = (string)$this->parseAmount($amount);
        $this->calculator = $calculator;
        $this->formatters = $formatters;
    }



    /**
     * @return Calculator
     */
    protected function calculator()
    {
        return $this->calculator;
    }



    /**
     * @return MoneyFormatter[]
     */
    protected function formatters()
    {
        return $this->formatters;
    }



    /**
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a value amount of 12.50
     * @return float|int|number|string
     * @throws InvalidDataTypeException
     */
    private function parseAmount($amount)
    {
        $type = gettype($amount);
        switch ($type) {
            case 'integer' :
            case 'double' :
            case 'string' :
                // shift the decimal position by the number of decimal places used internally
                // ex: 12.5 for a currency using 2 decimal places, would become 1250
                // then if our extra internal precision was 3, it would become 1250000
                $amount *= pow(10, $this->precision());
                // then round up the remaining value if there is still a fractional amount left
                $amount = round($amount, 0, PHP_ROUND_HALF_UP);
            break;
            default  :
                throw new InvalidDataTypeException(
                    '$amount',
                    $amount,
                    'integer (or float or string)'
                );
        }
        return $amount;
    }



    /**
     * adds or subtracts additional decimal places based on the value of the Money::EXTRA_PRECISION constant
     *
     * @param bool $positive
     * @return int
     */
    private function precision($positive = true)
    {
        $sign = $positive ? 1 : -1;
        return ((int)$this->currency->decimalPlaces() + Money::EXTRA_PRECISION) * $sign;
    }



    /**
     * Returns the money amount as an unformatted string
     * IF YOU REQUIRE A FORMATTED STRING, THEN USE Money::format()
     *
     * @return string
     */
    public function amount()
    {
        // shift the decimal position BACK by the number of decimal places used internally
        // ex: 1250 for a currency using 2 decimal places, would become 12.5
        $amount = (string)$this->amount * pow(10, $this->precision(false));
        // then shave off our extra internal precision using the number of decimal places for the currency
        $amount = round($amount, $this->currency->decimalPlaces());
        return $amount;
    }



    /**
     * applies formatting based on the specified formatting level
     * corresponding to one of the constants on \EventEspresso\core\services\currency\MoneyFormatter
     *
     * @param int $formatting_level
     * @return string
     */
    public function format($formatting_level = MoneyFormatter::ADD_THOUSANDS)
    {
        $formatted_amount = $this->amount();
        $formatters = $this->formatters();
        // if we are applying thousands formatting...
        if ($formatting_level >= MoneyFormatter::ADD_THOUSANDS) {
            // then let's remove decimal formatting since it's included in thousands formatting
            unset($formatters[MoneyFormatter::DECIMAL_ONLY]);
        }
        for ($x = 1; $x <= $formatting_level; $x++) {
            if (isset($formatters[$x]) && $formatters[$x] instanceof MoneyFormatter) {
                $formatted_amount = $formatters[$x]->format($formatted_amount, $this->currency);
            }
        }
        return $formatted_amount;
    }



    /**
     * Returns the Currency object for this money
     *
     * @return Currency
     */
    public function currency()
    {
        return $this->currency;
    }



    /**
     * adds the supplied Money amount to this Money amount
     * and returns a new Money object
     *
     * @param Money $other
     * @return Money
     * @throws InvalidArgumentException
     */
    public function add(Money $other)
    {
        $this->verifySameCurrency($other->currency());
        return new Money(
            $this->calculator()->add(
                $this->amount(),
                $other->amount()
            ),
            $this->currency(),
            $this->calculator(),
            $this->formatters()
        );
    }



    /**
     * subtracts the supplied Money amount from this Money amount
     * and returns a new Money object
     *
     * @param Money $other
     * @return Money
     * @throws InvalidArgumentException
     */
    public function subtract(Money $other)
    {
        $this->verifySameCurrency($other->currency());
        return new Money(
            $this->calculator()->subtract(
                $this->amount(),
                $other->amount()
            ),
            $this->currency(),
            $this->calculator(),
            $this->formatters()
        );
    }



    /**
     * multiplies this Money amount by the supplied $multiplier
     * and returns a new Money object
     *
     * @param float|int|string $multiplier
     * @param int              $rounding_mode
     * @return Money
     * @throws InvalidDataTypeException
     */
    public function multiply($multiplier, $rounding_mode = Calculator::ROUND_HALF_UP)
    {
        return new Money(
            $this->calculator()->multiply(
                $this->amount(),
                $multiplier,
                $this->precision(),
                $rounding_mode
            ),
            $this->currency(),
            $this->calculator(),
            $this->formatters()
        );
    }



    /**
     * divides this Money amount by the supplied $divisor
     * and returns a new Money object
     *
     * @param float|int|string $divisor
     * @param int              $rounding_mode
     * @return Money
     * @throws InvalidDataTypeException
     */
    public function divide($divisor, $rounding_mode = Calculator::ROUND_HALF_UP)
    {
        return new Money(
            $this->calculator()->divide(
                $this->amount(),
                $divisor,
                $this->precision(),
                $rounding_mode
            ),
            $this->currency(),
            $this->calculator(),
            $this->formatters()
        );
    }



    /**
     * @param Currency $other_currency
     * @throws InvalidArgumentException
     */
    public function verifySameCurrency(Currency $other_currency)
    {
        if ($this->currency()->equals($other_currency) !== true) {
            throw new InvalidArgumentException(
                esc_html__(
                    'Currencies must be the same in order to add or subtract their values.',
                    'event_espresso'
                )
            );
        }
    }



    /**
     * @return string
     */
    public function __toString()
    {
        return $this->format(MoneyFormatter::DECIMAL_ONLY);
    }



}
// End of file Money.php
// Location: core/entities/money/Money.php