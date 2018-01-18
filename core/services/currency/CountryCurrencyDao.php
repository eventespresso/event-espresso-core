<?php

namespace EventEspresso\core\services\currency;

use EE_Error;
use EEH_File;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CountryCurrencyDao
 * retrieves country currency data from the country-currencies.json
 * in order to provide an accurate and uneditable data source
 * For user configurable currency details, use EE_Currency_Config
 *
 * @package EventEspresso\core\services\currency
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CountryCurrencyDao
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
     * @return array[]
     * @throws EE_Error
     */
    private function initializeCountryCurrencyData()
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
     */
    private function parseCountryCurrencyData($country_currency_data)
    {
        foreach ($country_currency_data as $country_currency) {
            $this->country_currencies_by_iso_code[ $country_currency['CountryISO'] ]   = $country_currency;
            $this->country_currencies_by_currency[ $country_currency['CurrencyCode'] ] = $country_currency;
        }
        $this->country_currency_data = $country_currency_data;
    }


    /**
     * @param string $CNT_ISO
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function getCountryCurrencyByIsoCode($CNT_ISO = '')
    {
        $this->initializeCountryCurrencyData();
        if (! isset($this->country_currencies_by_iso_code[ $CNT_ISO ])) {
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
        return $this->country_currencies_by_iso_code[ $CNT_ISO ];
    }


    /**
     * @param string $code
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function getCountryCurrencyByCurrencyCode($code = '')
    {
        $this->initializeCountryCurrencyData();
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
        return $this->country_currencies_by_currency[ $code ];
    }
}
