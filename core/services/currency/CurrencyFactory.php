<?php

namespace EventEspresso\core\services\currency;

use EE_Error;
use EE_Organization_Config;
use EventEspresso\core\domain\values\currency\Currency;
use EventEspresso\core\entities\Label;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencyFactory
 * Factory class for creating Currency objects
 *
 * @package EventEspresso\core\services\currency
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CurrencyFactory
{

    /**
     * @var CountryCurrencyDao $country_currencies
     */
    private $country_currencies;


    /**
     * CurrencyFactory constructor.
     *
     * @param CountryCurrencyDao     $country_currencies
     * @param EE_Organization_Config $organization_config
     */
    public function __construct(CountryCurrencyDao $country_currencies)
    {
        $this->country_currencies = $country_currencies;
    }


    /**
     * @param array $country_currency
     * @return Currency
     */
    private function createCurrencyFromCountryCurrency(array $country_currency)
    {
        return new Currency(
            $country_currency['CurrencyCode'],
            new Label(
                $country_currency['CurrencyNameSingle'],
                $country_currency['CurrencyNamePlural']
            ),
            $country_currency['CurrencySign'],
            $country_currency['CurrencySignB4'],
            $country_currency['CurrencyDecimalPlaces'],
            $country_currency['CurrencyDecimalMark'],
            $country_currency['CurrencyThousands'],
            $country_currency['CurrencySubunits'],
            $country_currency['CurrencySignSeparator']
        );
    }


    /**
     * returns a Currency object for the supplied country code
     *
     * @param string $CNT_ISO
     * @return Currency
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function createFromCountryCode($CNT_ISO)
    {
        return $this->createCurrencyFromCountryCurrency(
            $this->country_currencies->getCountryCurrencyByIsoCode($CNT_ISO)
        );
    }


    /**
     * returns a Currency object for the supplied currency code
     * PLZ NOTE: variations may exist between how different countries display the same currency,
     * so it may be necessary to use CreateCurrency::fromCountryCode() to achieve the desired results
     *
     * @param string $code
     * @return Currency
     * @throws InvalidArgumentException
     * @throws EE_Error
     */
    public function createFromCode($code)
    {
        return $this->createCurrencyFromCountryCurrency(
            $this->country_currencies->getCountryCurrencyByCurrencyCode($code)
        );
    }
}
// Location: CreateCurrency.php
