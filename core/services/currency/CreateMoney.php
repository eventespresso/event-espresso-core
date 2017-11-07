<?php

namespace EventEspresso\core\services\currency;

use EE_Error;
use EventEspresso\core\domain\values\currency\Money;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CreateMoney
 * Factory class for creating Money objects
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CreateMoney
{

    /**
     * @var Calculator $calculator
     */
    protected static $calculator;

    /**
     * @var MoneyFormatter[] $formatters
     */
    protected static $formatters;



    /**
     * factory method that returns a Money object using amount specified in the currency's subunits
     * example: for $12.50 USD use CreateMoney::fromSubUnits(1250, 'USD')
     *
     * @param int    $subunits_amount money amount IN THE SUBUNITS FOR THE CURRENCY ie: cents
     *                                example: $12.50 USD would equate to a subunits amount of 1250
     * @param string $currency_code
     * @return Money
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function fromSubUnits($subunits_amount, $currency_code = '')
    {
        $currency = CreateCurrency::fromCode($currency_code);
        return new Money(
            // shift decimal BACK by number of places for currency
            $subunits_amount * pow(10, $currency->decimalPlaces() * -1),
            $currency,
            CreateMoney::calculator(),
            CreateMoney::formatters()
        );
    }



    /**
     * factory method that returns a Money object using the currency corresponding to the site's country
     * example: CreateMoney::forSite(12.5)
     *
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a standard amount of 12.50
     * @return Money
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function forSite($amount)
    {
        return new Money(
            $amount,
            CreateCurrency::fromCountryCode(),
            CreateMoney::calculator(),
            CreateMoney::formatters()
        );
    }



    /**
     * factory method that returns a Money object using the currency as specified by the supplied ISO country code
     * example: CreateMoney::forCountry(12.5,'US')
     *
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a value amount of 12.50
     * @param string           $CNT_ISO
     * @return Money
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function forCountry($amount, $CNT_ISO)
    {
        return new Money(
            $amount,
            CreateCurrency::fromCountryCode($CNT_ISO),
            CreateMoney::calculator(),
            CreateMoney::formatters()
        );
    }



    /**
     * factory method that returns a Money object using the currency as specified by the supplied currency code
     * example: CreateMoney::forCurrency(12.5, 'USD')
     *
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a value amount of 12.50
     * @param string           $currency_code
     * @return Money
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function forCurrency($amount, $currency_code)
    {
        return new Money(
            $amount,
            CreateCurrency::fromCode($currency_code),
            CreateMoney::calculator(),
            CreateMoney::formatters()
        );
    }




    /**
     * @return Calculator
     */
    public static function calculator()
    {
        CreateMoney::initializeCalculators();
        return CreateMoney::$calculator;
    }



    /**
     * loops through a filterable array of Calculator services
     * and selects the first one that is supported by the current server
     */
    protected static function initializeCalculators()
    {
        if (CreateMoney::$calculator instanceof Calculator) {
            return;
        }
        $calculators = apply_filters(
            'FHEE__EventEspresso\core\services\currency\MoneyFactory__initializeCalculators__Calculator_array',
            array(
                '\EventEspresso\core\services\currency\DefaultCalculator',
            )
        );
        foreach ($calculators as $calculator) {
            if (! class_exists($calculator)) {
                continue;
            }
            $calculator = new $calculator();
            if ($calculator instanceof Calculator && $calculator->isSupported()) {
                CreateMoney::$calculator = $calculator;
                break;
            }
        }
    }



    /**
     * @return MoneyFormatter[]
     */
    public static function formatters()
    {
        CreateMoney::initializeFormatters();
        return CreateMoney::$formatters;
    }



    /**
     * initializes a filterable array of MoneyFormatter services
     */
    protected static function initializeFormatters()
    {
        if (! empty(CreateMoney::$formatters)) {
            return;
        }
        CreateMoney::$formatters = apply_filters(
            'FHEE__EventEspresso\core\services\currency\MoneyFactory__initializeFormatters__MoneyFormatters_array',
            array(
                1 => new DecimalMoneyFormatter(),
                2 => new ThousandsMoneyFormatter(),
                3 => new CurrencySignMoneyFormatter(),
                4 => new CurrencyCodeMoneyFormatter(),
                5 => new InternationalMoneyFormatter(),
            )
        );
    }


}
// End of file CreateMoney.php
// Location: core/services/currency/CreateMoney.php
