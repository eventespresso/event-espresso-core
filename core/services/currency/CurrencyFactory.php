<?php

namespace EventEspresso\core\services\currency;

use EE_Country;
use EE_Error;
use EE_Organization_Config;
use EEM_Country;
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
     * @var EEM_Country $country_model
     */
    protected $country_model;

    /**
     * @var EE_Country[] $countries
     */
    protected $countries_by_iso_code;

    /**
     * @var EE_Country[] $countries
     */
    protected $countries_by_currency;

    /**
     * @var EE_Organization_Config $organization_config
     */
    protected $organization_config;

    /**
     * @var string $site_country_iso
     */
    protected $site_country_iso;

    /**
     * @var CurrencySubunitDecimals $currency_subunit_decimals
     */
    protected $currency_subunit_decimals;


    /**
     * CurrencyFactory constructor.
     *
     * @param EEM_Country             $country_model
     * @param EE_Organization_Config  $organization_config
     * @param CurrencySubunitDecimals $currency_subunit_decimals
     */
    public function __construct(
        EEM_Country $country_model,
        EE_Organization_Config$organization_config,
        CurrencySubunitDecimals $currency_subunit_decimals
    ) {
        $this->country_model = $country_model;
        $this->organization_config = $organization_config;
        $this->currency_subunit_decimals = $currency_subunit_decimals;
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
        $CNT_ISO = $CNT_ISO !== null ? $CNT_ISO : $this->organization_config->CNT_ISO;
        if(isset($this->countries_by_iso_code[ $CNT_ISO])) {
            $country = $this->countries_by_iso_code[ $CNT_ISO ];
        } else {
            /** @var EE_Country $country */
            $country = $this->country_model->get_one_by_ID($CNT_ISO);
            if (! $country instanceof EE_Country) {
                throw new InvalidArgumentException(
                    sprintf(
                        esc_html__(
                            'A valid country could not be found for the "%1$s" country code;',
                            'event_espresso'
                        ),
                        $CNT_ISO
                    )
                );
            }
            $this->countries_by_iso_code[ $CNT_ISO ]                  = $country;
            $this->countries_by_currency[ $country->currency_code() ] = $country;
        }
        return new Currency(
            $country->currency_code(),
            new Label(
                $country->currency_name_single(),
                $country->currency_name_plural()
            ),
            $country->currency_sign(),
            $country->currency_sign_before(),
            $country->currency_decimal_places(),
            $country->currency_decimal_mark(),
            $country->currency_thousands_separator(),
            $this->currency_subunit_decimals->forCode($country->currency_code())
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
        if (isset($this->countries_by_currency[ $code ])) {
            $country = $this->countries_by_currency[ $code ];
        } else {
            /** @var EE_Country $country */
            $country = $this->country_model->get_one(array(array('CNT_cur_code' => $code)));
            if (! $country instanceof EE_Country) {
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
            $this->countries_by_iso_code[ $country->ID() ] = $country;
            $this->countries_by_currency[ $code ]          = $country;
        }
        return new Currency(
            $country->currency_code(),
            new Label(
                $country->currency_name_single(),
                $country->currency_name_plural()
            ),
            $country->currency_sign(),
            $country->currency_sign_before(),
            $country->currency_decimal_places(),
            $country->currency_decimal_mark(),
            $country->currency_thousands_separator(),
            $this->currency_subunit_decimals->forCode($code)
        );
    }
}
// Location: CreateCurrency.php
