<?php

namespace EventEspresso\core\services\currency;

use EE_Country;
use EE_Error;
use EE_Organization_Config;
use EEM_Country;
use EventEspresso\core\domain\values\currency\Currency;
use EventEspresso\core\entities\Label;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CreateCurrency
 * Factory class for creating Currency objects
 *
 * @package EventEspresso\core\services\currency
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CreateCurrency
{

    /**
     * @var EE_Country[] $countries
     */
    protected static $countries_by_iso_code;

    /**
     * @var EE_Country[] $countries
     */
    protected static $countries_by_currency;

    /**
     * @var string $site_country_iso
     */
    protected static $site_country_iso;


    /**
     * @return EEM_Country
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function countryModel()
    {
        return LoaderFactory::getLoader()->getShared('EEM_Country');
    }


    /**
     * returns a Currency object for the supplied country code
     *
     * @param string $CNT_ISO
     * @return Currency
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public static function fromCountryCode($CNT_ISO = null)
    {
        $CNT_ISO = $CNT_ISO !== null ? $CNT_ISO : CreateCurrency::getSiteCountryIso();
        if(isset(CreateCurrency::$countries_by_iso_code[$CNT_ISO])) {
            $country = CreateCurrency::$countries_by_iso_code[ $CNT_ISO ];
        } else {
            /** @var EE_Country $country */
            $country = CreateCurrency::countryModel()->get_one_by_ID($CNT_ISO);
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
            CreateCurrency::$countries_by_iso_code[ $CNT_ISO ] = $country;
            CreateCurrency::$countries_by_currency[ $country->currency_code() ] = $country;
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
            $country->currency_thousands_separator()
        );
    }



    /**
     * returns a Currency object for the supplied currency code
     * PLZ NOTE: variations may exist between how different countries display the same currency,
     * so it may be necessary to use CreateCurrency::fromCountryCode() to achieve the desired results
     *
     * @param string $code
     * @return Currency
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws EE_Error
     */
    public static function fromCode($code)
    {
        if (isset(CreateCurrency::$countries_by_currency[ $code ])) {
            $country = CreateCurrency::$countries_by_currency[ $code ];
        } else {
            /** @var EE_Country $country */
            $country = CreateCurrency::countryModel()->get_one(array(array('CNT_cur_code' => $code)));
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
            CreateCurrency::$countries_by_iso_code[ $country->ID() ] = $country;
            CreateCurrency::$countries_by_currency[$code ] = $country;
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
            $country->currency_thousands_separator()
        );
    }



    /**
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getSiteCountryIso()
    {
        if (empty(CreateCurrency::$site_country_iso)) {
            $config = LoaderFactory::getLoader()->getShared('EE_Config');
            CreateCurrency::$site_country_iso = $config->organization !== null
                                             && $config->organization instanceof EE_Organization_Config
                ? $config->organization->CNT_ISO
                : 'US';
        }
        return CreateCurrency::$site_country_iso;
    }



}
// Location: CreateCurrency.php
