<?php

namespace EventEspresso\core\services\currency;

use EE_Error;
use EE_Organization_Config;
use EE_Registry;
use EventEspresso\core\entities\money\Currency;
use EventEspresso\core\entities\money\Money;
use EventEspresso\core\exceptions\InvalidDataTypeException;
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
     * @var string $site_country_iso
     */
    protected static $site_country_iso;

    /**
     * @var Calculator $calculator
     */
    protected static $calculator;

    /**
     * @var MoneyFormatter[] $formatters
     */
    protected static $formatters;



    /**
     * factory method that returns a Money object using the currency corresponding to the site's country
     * example: Money::forSite(12.5)
     *
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a value amount of 12.50
     * @return Money
     * @throws InvalidArgumentException
     */
    public static function forSite($amount)
    {
        return new Money(
            $amount,
            Currency::createFromCountryCode(CreateMoney::getSiteCurrency()),
            CreateMoney::calculator(),
            CreateMoney::formatters()
        );
    }



    /**
     * @return string
     */
    protected static function getSiteCurrency()
    {
        if (empty(self::$site_country_iso)) {
            self::$site_country_iso = isset(EE_Registry::instance()->CFG->organization)
                       && EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config
                ? EE_Registry::instance()->CFG->organization->CNT_ISO
                : 'US';
        }
        return self::$site_country_iso;
    }



    /**
     * factory method that returns a Money object using the currency as specified by the supplied ISO country code
     * example: Money::forCountry(12.5,'US')
     *
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a value amount of 12.50
     * @param string           $CNT_ISO
     * @return Money
     * @throws InvalidArgumentException
     */
    public static function forCountry($amount, $CNT_ISO)
    {
        return new Money(
            $amount,
            Currency::createFromCountryCode($CNT_ISO),
            CreateMoney::calculator(),
            CreateMoney::formatters()
        );
    }



    /**
     * factory method that returns a Money object using the currency as specified by the supplied currency code
     * example: Money::forCurrency(12.5, 'USD')
     *
     * @param float|int|string $amount money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     *                                 example: $12.5 USD would equate to a value amount of 12.50
     * @param string           $currency_code
     * @return Money
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public static function forCurrency($amount, $currency_code)
    {
        return new Money(
            $amount,
            Currency::createFromCode($currency_code),
            CreateMoney::calculator(),
            CreateMoney::formatters()
        );
    }



    /**
     * factory method that returns a Money object for the currency specified as if it were a class method
     * example: Money::USD(12.5);
     * money amount IN THE STANDARD UNIT FOR THE CURRENCY ie: dollars, Euros, etc
     * example: $12.5 USD would equate to a value amount of 12.50
     *
     * @param string $currency_code
     * @param array  $arguments
     * @return Money
     * @throws \EE_Error
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public static function __callStatic($currency_code, $arguments)
    {
        return new Money(
            $arguments[0],
            Currency::createFromCode($currency_code),
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
        return self::$calculator;
    }



    /**
     * loops through a filterable array of Calculator services
     * and selects the first one that is supported by the current server
     */
    protected static function initializeCalculators()
    {
        if (self::$calculator instanceof Calculator) {
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
                self::$calculator = $calculator;
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
        return self::$formatters;
    }



    /**
     * initializes a filterable array of MoneyFormatter services
     */
    protected static function initializeFormatters()
    {
        if (! empty(self::$formatters)) {
            return;
        }
        self::$formatters = apply_filters(
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