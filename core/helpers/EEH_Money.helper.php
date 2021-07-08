<?php

use EventEspresso\core\services\formatters\CurrencyFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\locale\Locale;

/**
 * Money helper class.
 * This class has helper methods that help with money related conversions and calculations.
 *
 * @package        Event Espresso
 * @subpackage     helpers
 * @author         Darren Ethier
 */
class EEH_Money extends EEH_Base
{

    /**
     * @var CurrencyFormatter
     * @since   $VID:$
     */
    private static $currency_formatter;


    /**
     * @return CurrencyFormatter
     * @since   $VID:$
     */
    private static function getCurrencyFormatter()
    {
        if(! EEH_Money::$currency_formatter instanceof CurrencyFormatter) {
            EEH_Money::$currency_formatter = LoaderFactory::getLoader()->getShared(CurrencyFormatter::class);
        }
        return EEH_Money::$currency_formatter;
    }


    /**
     * @param string $CNT_ISO
     * @return Locale
     * @throws EE_Error
     * @since   $VID:$
     */
    private static function getLocaleForCountryISO($CNT_ISO)
    {
        $currency_config = EEH_Money::get_currency_config($CNT_ISO);
        return EEH_Money::getCurrencyFormatter()->getLocaleForCurrencyISO($currency_config->code);
    }


    /**
     * @param float  $money_value
     * @param string|Locale $locale locale name ex: en_US, en_CA, fr_CA, de_DE, etc, or Locale object
     * @param int           $format
     * @return string
     * @since $VID:$
     */
    public static function formatForLocale(
        $money_value,
        $locale = '',
        $format = CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY
    ) {
        return EEH_Money::getCurrencyFormatter()->formatForLocale($money_value, $format, $locale);
    }


    /**
     * @param string|Locale $locale locale name ex: en_US, en_CA, fr_CA, de_DE, etc, or Locale object
     * @return string ex: 'USD'
     * @since $VID:$
     */
    public static function getCurrencyIsoCodeForLocale($locale = '')
    {
        return EEH_Money::getCurrencyFormatter()->getCurrencyIsoCodeForLocale($locale);
    }


    /**
     * @param string|Locale $locale locale name ex: en_US, en_CA, fr_CA, de_DE, etc, or Locale object
     * @return string ex: '$'
     * @since $VID:$
     */
    public static function getCurrencySymbolForLocale($locale = '')
    {
        return EEH_Money::getCurrencyFormatter()->getCurrencySymbolForLocale($locale);
    }

    /**
     * This removes all localized money formatting from the incoming value
     * Note: uses this site's currency settings for deciding what is considered a
     * "thousands separator" (usually the character "," )
     * and what is a "decimal mark" (usually the character ".")
     *
     * @param int|float|string $money_value
     * @param string           $CNT_ISO
     * @return float
     * @throws EE_Error
     */
    public static function strip_localized_money_formatting($money_value, $CNT_ISO = '')
    {
        $locale = EEH_Money::getLocaleForCountryISO($CNT_ISO);
        return EEH_Money::getCurrencyFormatter()->parseForLocale($money_value, $locale);
    }


    /**
     * This converts an incoming localized money value into a standard float item (to three decimal places)
     * Only use this if you know the $money_value follows your currency configuration's
     * settings. Note: this uses this site's currency settings for deciding what is considered a
     * "thousands separator" (usually the character "," )
     * and what is a "decimal mark" (usually the character ".")
     *
     * @param int|string $money_value
     * @return float
     */
    public static function convert_to_float_from_localized_money($money_value)
    {
        return EEH_Money::getCurrencyFormatter()->precisionRound(
            EEH_Money::getCurrencyFormatter()->parseForLocale($money_value)
        );
    }


    /**
     * For comparing floats. Default operator is '=', but see the $operator below for all options.
     * This should be used to compare floats instead of normal '==' because floats
     * are inherently imprecise, and so you can sometimes have two floats that appear to be identical
     * but actually differ by 0.00000001.
     *
     * @see http://biostall.com/php-function-to-compare-floating-point-numbers
     * @param float  $float1
     * @param float  $float2
     * @param string $operator The operator. Valid options are =, <=, <, >=, >, <>, eq, lt, lte, gt, gte, ne
     * @return bool whether the equation is true or false
     * @throws EE_Error
     */
    public static function compare_floats($float1, $float2, $operator = '=')
    {
        // Check numbers to 5 digits of precision
        $epsilon = 0.00001;
        $float1 = (float) $float1;
        $float2 = (float) $float2;
        switch ($operator) {
            // equal
            case "=":
            case "==":
            case "===":
            case "eq":
                if (abs($float1 - $float2) < $epsilon) {
                    return true;
                }
                break;
            // less than
            case "<":
            case "lt":
                if (abs($float1 - $float2) < $epsilon) {
                    return false;
                } else {
                    if ($float1 < $float2) {
                        return true;
                    }
                }
                break;
            // less than or equal
            case "<=":
            case "lte":
                if (EEH_Money::compare_floats($float1, $float2, '<')
                    || EEH_Money::compare_floats($float1, $float2, '=')
                ) {
                    return true;
                }
                break;
            // greater than
            case ">":
            case "gt":
                if (abs($float1 - $float2) < $epsilon) {
                    return false;
                } else {
                    if ($float1 > $float2) {
                        return true;
                    }
                }
                break;
            // greater than or equal
            case ">=":
            case "gte":
                if (EEH_Money::compare_floats($float1, $float2, '>')
                    || EEH_Money::compare_floats($float1, $float2, '=')
                ) {
                    return true;
                }
                break;
            case "<>":
            case "!=":
            case "ne":
                if (abs($float1 - $float2) > $epsilon) {
                    return true;
                }
                break;
            default:
                throw new EE_Error(
                    sprintf(
                        __(
                            "Unknown operator %s in EEH_Money::compare_floats()",
                            'event_espresso'
                        ),
                        $operator
                    )
                );
        }
        return false;
    }


    /**
     * This returns a localized format string suitable for jQplot.
     *
     * @param string $CNT_ISO  If this is provided, then will attempt to get the currency settings for the country.
     *                         Otherwise will use currency settings for current active country on site.
     * @return string
     * @throws EE_Error
     */
    public static function get_format_for_jqplot($CNT_ISO = '')
    {
        // default format
        $format          = 'f';
        $locale = EEH_Money::getLocaleForCountryISO($CNT_ISO);
        // first get the decimal place and number of places
        $format = "%'" . $locale->currencyDecimalPoint() . $locale->decimalPrecision() . $format;
        $spacer = $locale->currencySymbolSpaceB4Positive() ? ' ' : '';
        // currency symbol on right side.
        $format = $locale->currencySymbolB4Positive()
            ? $locale->currencySymbol() . $spacer . $format
            : $format . $spacer . $locale->currencySymbol();
        return $format;
    }


    /**
     * This returns a localized format string suitable for usage with the Google Charts API format param.
     *
     * @param string $CNT_ISO  If this is provided, then will attempt to get the currency settings for the country.
     *                         Otherwise will use currency settings for current active country on site.
     *                         Note: GoogleCharts uses ICU pattern set
     *                         (@see http://icu-project.org/apiref/icu4c/classDecimalFormat.html#_details)
     * @return array
     * @throws EE_Error
     */
    public static function get_format_for_google_charts($CNT_ISO = '')
    {
        $locale = EEH_Money::getLocaleForCountryISO($CNT_ISO);
        $decimal_places_placeholder = str_pad('', $locale->decimalPrecision(), '0');
        // first get the decimal place and number of places
        $format = '#,##0.' . $decimal_places_placeholder;
        // currency symbol on right side.
        $format          = $locale->currencySymbolB4Positive()
            ? $locale->currencySymbol() . $format
            : $format
              . $locale->currencySymbol();
        $formatterObject = [
            'decimalSymbol'  => $locale->currencyDecimalPoint(),
            'groupingSymbol' => $locale->currencyThousandsSeparator(),
            'fractionDigits' => $locale->decimalPrecision(),
        ];
        if ($locale->currencySymbolB4Positive()) {
            $formatterObject['prefix'] = $locale->currencySymbol();
        } else {
            $formatterObject['suffix'] = $locale->currencySymbol();
        }
        return [
            'format'          => $format,
            'formatterObject' => $formatterObject,
        ];
    }


    /**
     * @param string $CNT_ISO
     * @return EE_Currency_Config|null
     * @throws EE_Error
     */
    public static function get_currency_config($CNT_ISO = '')
    {
        // if CNT_ISO passed lets try to get currency settings for it.
        $currency_config = $CNT_ISO !== ''
            ? new EE_Currency_Config($CNT_ISO)
            : null;
        // default currency settings for site if not set
        if (! $currency_config instanceof EE_Currency_Config) {
            $currency_config = EE_Registry::instance()->CFG->currency instanceof EE_Currency_Config
                ? EE_Registry::instance()->CFG->currency
                : new EE_Currency_Config();
        }
        return $currency_config;
    }


    /**
     * Rounds the number to a whole penny amount
     *
     * @param float  $amount
     * @param string $currency_code
     * @return float
     * @throws EE_Error
     */
    public static function round_for_currency($amount, $currency_code = '')
    {
        $locale = EEH_Money::getLocaleForCountryISO($currency_code);
        return EEH_Money::getCurrencyFormatter()->roundForLocale($amount, $locale);
    }
}
