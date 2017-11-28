<?php

namespace EventEspresso\core\services\currency;

use EE_Error;
use EE_Organization_Config;
use EEH_File;
use EventEspresso\core\domain\values\currency\Currency;
use EventEspresso\core\entities\Label;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
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
     * @var array[] $country_currency_data
     */
    private $country_currency_data;

    /**
     * @var array[] $country_currencies_by_iso_code
     */
    private $country_currencies_by_iso_code;

    /**
     * @var array[] $country_currencies_by_currency
     */
    private $country_currencies_by_currency;

    /**
     * @var string $site_country_iso
     */
    private $site_country_iso;


    /**
     * CurrencyFactory constructor.
     *
     * @param EE_Organization_Config $organization_config
     */
    public function __construct(EE_Organization_Config  $organization_config) {
        $this->site_country_iso = $organization_config->CNT_ISO;
    }


    /**
     * @return array[]
     * @throws InvalidArgumentException
     * @throws EE_Error
     */
    private function getCountryCurrencyData()
    {
        if ($this->country_currency_data === null) {
            $country_currency_data = json_decode(
                EEH_File::get_file_contents(__DIR__ . DS . 'country-currencies.json'),
                true
            );
            $this->parseCountryCurrencyData($country_currency_data);
        }
        return $this->country_currency_data;
    }


    /**
     * @param array[] $country_currency_data
     * @throws InvalidArgumentException
     */
    private function parseCountryCurrencyData($country_currency_data)
    {
        foreach ($country_currency_data as $country_currency) {
            $this->country_currencies_by_iso_code[ $country_currency['CountryISO'] ] = $country_currency;
            $this->country_currencies_by_currency[ $country_currency['CurrencyCode'] ] = $country_currency;
        }
        $this->country_currency_data = $country_currency_data;
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
            $country_currency['CurrencySubunits']
        );
    }



    /**
     * returns a Currency object for the supplied country code
     *
     * @param string $CNT_ISO
     * @return Currency
     * @throws InvalidIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function createFromCountryCode($CNT_ISO = null)
    {
        $this->getCountryCurrencyData();
        $CNT_ISO = $CNT_ISO !== null ? $CNT_ISO : $this->site_country_iso;
        if(! isset($this->country_currencies_by_iso_code[ $CNT_ISO ])) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'Valid country currency data could not be found for the "%1$s" country code;',
                        'event_espresso'
                    ),
                    $CNT_ISO
                )
            );
        }
        return $this->createCurrencyFromCountryCurrency(
            $this->country_currencies_by_iso_code[ $CNT_ISO ]
        );
    }



    /**
     * returns a Currency object for the supplied currency code
     * PLZ NOTE: variations may exist between how different countries display the same currency,
     * so it may be necessary to use CreateCurrency::fromCountryCode() to achieve the desired results
     *
     * @param string $code
     * @return Currency
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws EE_Error
     */
    public function createFromCode($code)
    {
        $this->getCountryCurrencyData();
        if (! isset($this->country_currencies_by_currency[ $code ])) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'A valid currency could not be found for the "%1$s" currency code;',
                        'event_espresso'
                    ),
                    $code
                )
            );
        }
        return $this->createCurrencyFromCountryCurrency(
            $this->country_currencies_by_currency[ $code ]
        );
    }
}
// Location: CreateCurrency.php
