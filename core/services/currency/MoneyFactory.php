<?php

namespace EventEspresso\core\services\currency;

use EE_Error;
use EventEspresso\core\domain\values\currency\Money;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\currency\formatters\CurrencyCodeMoneyFormatter;
use EventEspresso\core\services\currency\formatters\CurrencySignMoneyFormatter;
use EventEspresso\core\services\currency\formatters\DecimalMoneyFormatter;
use EventEspresso\core\services\currency\formatters\InternationalMoneyFormatter;
use EventEspresso\core\services\currency\formatters\MoneyFormatter;
use EventEspresso\core\services\currency\formatters\ThousandsMoneyFormatter;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MoneyFactory
 * Factory class for creating Money objects
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class MoneyFactory
{

    /**
     * @var CurrencyFactory $currency_factory
     */
    protected $currency_factory;

    /**
     * @var Calculator $calculator
     */
    protected $calculator;

    /**
     * @var MoneyFormatter[] $formatters
     */
    protected $formatters;


    /**
     * CreateMoney constructor.
     *
     * @param CurrencyFactory  $currency_factory
     * @param Calculator       $calculator
     * @param MoneyFormatter[] $formatters
     */
    public function __construct(
        CurrencyFactory $currency_factory,
        Calculator $calculator = null,
        array $formatters = array()
    ) {
        $this->calculator = $calculator;
        $this->formatters = $formatters;
        $this->currency_factory = $currency_factory;
    }



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
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     */
    public function createFromSubUnits($subunits_amount, $currency_code = '')
    {
        $currency = $this->currency_factory->createFromCode($currency_code);
        return new Money(
            // shift decimal BACK by number of places for currency
            $subunits_amount * pow(10, $currency->decimalPlaces() * -1),
            $currency,
            $this->calculator(),
            $this->formatters()
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
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     */
    public function createForSite($amount)
    {
        return new Money(
            $amount,
            $this->currency_factory->createFromCountryCode(),
            $this->calculator(),
            $this->formatters()
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
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     */
    public function createForCountry($amount, $CNT_ISO)
    {
        return new Money(
            $amount,
            $this->currency_factory->createFromCountryCode($CNT_ISO),
            $this->calculator(),
            $this->formatters()
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
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     */
    public function createForCurrency($amount, $currency_code)
    {
        return new Money(
            $amount,
            $this->currency_factory->createFromCode($currency_code),
            $this->calculator(),
            $this->formatters()
        );
    }




    /**
     * @return Calculator
     */
    public function calculator()
    {
        $this->initializeCalculators();
        return $this->calculator;
    }



    /**
     * loops through a filterable array of Calculator services
     * and selects the first one that is supported by the current server
     */
    protected function initializeCalculators()
    {
        if ($this->calculator instanceof Calculator) {
            return;
        }
        $calculators = apply_filters(
            'FHEE__EventEspresso_core_services_currency_MoneyFactory__initializeCalculators__Calculators_array',
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
                $this->calculator = $calculator;
                break;
            }
        }
    }



    /**
     * @return MoneyFormatter[]
     */
    public function formatters()
    {
        $this->initializeFormatters();
        return $this->formatters;
    }



    /**
     * initializes a filterable array of MoneyFormatter services
     */
    protected function initializeFormatters()
    {
        if (! empty($this->formatters)) {
            return;
        }
        $this->formatters = apply_filters(
            'FHEE__EventEspresso_core_services_currency_MoneyFactory__initializeFormatters__MoneyFormatters_array',
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
