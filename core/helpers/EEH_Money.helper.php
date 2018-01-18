<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

defined('EVENT_ESPRESSO_VERSION') || exit('NO direct script access allowed');



/**
 * Money helper class.
 * This class has helper methods that help with money related conversions and calculations.
 *
 * @package        Event Espresso
 * @subpackage     helpers
 * @author         Darren Ethier
 * ------------------------------------------------------------------------
 */
class EEH_Money extends EEH_Base
{

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
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function strip_localized_money_formatting($money_value, $CNT_ISO = '')
    {
        $currency_config = EEH_Money::get_currency_config($CNT_ISO);
        $money_value     = str_replace(
            array(
                $currency_config->thsnds,
                $currency_config->dec_mrk,
            ),
            array(
                '', // remove thousands separator
                '.', // convert decimal mark to what PHP expects
            ),
            $money_value
        );
        $money_value     = filter_var(
            $money_value,
            FILTER_SANITIZE_NUMBER_FLOAT,
            FILTER_FLAG_ALLOW_FRACTION
        );
        return $money_value;
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
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function convert_to_float_from_localized_money($money_value)
    {
        //float it! and round to three decimal places
        return round((float) EEH_Money::strip_localized_money_formatting($money_value), 3);
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
        $float1  = (float) $float1;
        $float2  = (float) $float2;
        switch ($operator) {
            // equal
            case '=':
            case '==':
            case '===':
            case 'eq':
                if (abs($float1 - $float2) < $epsilon) {
                    return true;
                }
                break;
            // less than
            case '<':
            case 'lt':
                if (abs($float1 - $float2) < $epsilon) {
                    return false;
                }
                if ($float1 < $float2) {
                    return true;
                }
                break;
            // less than or equal
            case '<=':
            case 'lte':
                if (
                    self::compare_floats($float1, $float2, '<')
                    || self::compare_floats($float1, $float2)
                ) {
                    return true;
                }
                break;
            // greater than
            case '>':
            case 'gt':
                if (abs($float1 - $float2) < $epsilon) {
                    return false;
                }
                if ($float1 > $float2) {
                    return true;
                }
                break;
            // greater than or equal
            case '>=':
            case 'gte':
                if (
                    self::compare_floats($float1, $float2, '>')
                    || self::compare_floats($float1, $float2)
                ) {
                    return true;
                }
                break;
            case '<>':
            case '!=':
            case 'ne':
                if (abs($float1 - $float2) > $epsilon) {
                    return true;
                }
                break;
            default:
                throw new EE_Error(
                    esc_html__(
                        "Unknown operator '" . $operator . "' in EEH_Money::compare_floats()",
                        'event_espresso'
                    )
                );
        }
        return false;
    }


    /**
     * This returns a localized format string suitable for jqPlot.
     *
     * @param string $CNT_ISO  If this is provided, then will attempt to get the currency settings for the country.
     *                         Otherwise will use currency settings for current active country on site.
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_format_for_jqplot($CNT_ISO = '')
    {
        //default format
        $format          = 'f';
        $currency_config = $currency_config = EEH_Money::get_currency_config($CNT_ISO);
        //first get the decimal place and number of places
        $format = "%'." . $currency_config->dec_plc . $format;
        //currency symbol on right side.
        $format = $currency_config->sign_b4 ? $currency_config->sign . $format : $format . $currency_config->sign;
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
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_format_for_google_charts($CNT_ISO = '')
    {
        $currency_config            = EEH_Money::get_currency_config($CNT_ISO);
        $decimal_places_placeholder = str_pad('', $currency_config->dec_plc, '0');
        //first get the decimal place and number of places
        $format = '#,##0.' . $decimal_places_placeholder;
        //currency symbol on right side.
        $format          = $currency_config->sign_b4
            ? $currency_config->sign . $format
            : $format
              . $currency_config->sign;
        $formatterObject = array(
            'decimalSymbol'  => $currency_config->dec_mrk,
            'groupingSymbol' => $currency_config->thsnds,
            'fractionDigits' => $currency_config->dec_plc,
        );
        if ($currency_config->sign_b4) {
            $formatterObject['prefix'] = $currency_config->sign;
        } else {
            $formatterObject['suffix'] = $currency_config->sign;
        }
        return array(
            'format'          => $format,
            'formatterObject' => $formatterObject,
        );
    }


    /**
     * @param string $CNT_ISO
     * @param bool   $from_db whether to fetch currency data from the admin editable DB, or the immutable JSON file
     * @return EE_Currency_Config
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_currency_config($CNT_ISO = '', $from_db = true)
    {
        //if CNT_ISO passed lets try to get currency settings for it.
        $currency_config = $CNT_ISO !== ''
            ? new EE_Currency_Config($CNT_ISO)
            : null;
        if ($from_db) {
            $country = EEM_Country::instance()->get_one_by_ID($CNT_ISO);
            if ($country instanceof EE_Country) {
                $currency_config->setFromCountry($country);
            }
        }
        //default currency settings for site if not set
        if (! $currency_config instanceof EE_Currency_Config) {
            $currency_config = EE_Registry::instance()->CFG->currency instanceof EE_Currency_Config
                ? EE_Registry::instance()->CFG->currency
                : new EE_Currency_Config();
        }
        return $currency_config;
    }


    /**
     * replacement for EEH_Template::format_currency
     * This helper takes a raw float value and formats it according to the default config country currency settings, or
     * the country currency settings from the supplied country ISO code
     *
     * @param  float   $amount       raw money value
     * @param  boolean $return_raw   whether to return the formatted float value only with no currency sign or code
     * @param  boolean $display_code whether to display the country code (USD). Default = TRUE
     * @param string   $CNT_ISO      2 letter ISO code for a country
     * @param string   $cur_code_span_class
     * @param boolean  $from_db whether to fetch configuration data from the database (which a site admin can change)
     *                          or from our JSON file, which admins can't change. Setting to true is usually better
     *                          if the value will be displayed to a user; but if communicating with another server,
     *                          setting to false will return more reliable formatting.
     * @since $VID:$
     * @return string        the html output for the formatted money value
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function format_currency(
        $amount = null,
        $return_raw = false,
        $display_code = true,
        $CNT_ISO = '',
        $cur_code_span_class = 'currency-code',
        $from_db = true
    ) {
        // ensure amount was received
        if ($amount === null) {
            $msg = esc_html__('In order to format currency, an amount needs to be passed.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return '';
        }
        //ensure amount is float
        $amount  = (float)filter_var(
            apply_filters('FHEE__EEH_Template__format_currency__raw_amount', $amount),
            FILTER_SANITIZE_NUMBER_FLOAT,
            FILTER_FLAG_ALLOW_FRACTION
        );
        $CNT_ISO = (string) apply_filters('FHEE__EEH_Template__format_currency__CNT_ISO', $CNT_ISO, $amount);
        // filter raw amount (allows 0.00 to be changed to "free" for example)
        $amount_formatted = apply_filters('FHEE__EEH_Template__format_currency__amount', $amount, $return_raw);
        // still a number or was amount converted to a string like "free" ?
        if (is_float($amount_formatted)) {
            // get currency config object for that country
            $mny = EEH_Money::get_currency_config($CNT_ISO, $from_db);
            // format float
            $amount_formatted = number_format($amount, $mny->dec_plc, $mny->dec_mrk, $mny->thsnds);
            // add formatting ?
            if (! $return_raw) {
                // add currency sign
                if ($mny->sign_b4) {
                    if ($amount >= 0) {
                        $amount_formatted = $mny->sign . $amount_formatted;
                    } else {
                        $amount_formatted = '-' . $mny->sign . str_replace('-', '', $amount_formatted);
                    }
                } else {
                    $amount_formatted .= $mny->sign;
                }
                // filter to allow global setting of display_code
                $display_code = filter_var(
                    apply_filters('FHEE__EEH_Template__format_currency__display_code', $display_code),
                    FILTER_VALIDATE_BOOLEAN
                );
                // add currency code ?
                $amount_formatted = $display_code
                    ? $amount_formatted . ' <span class="' . $cur_code_span_class . '">(' . $mny->code . ')</span>'
                    : $amount_formatted;
            }
            // filter results
            $amount_formatted = (string) apply_filters(
                'FHEE__EEH_Template__format_currency__amount_formatted',
                $amount_formatted,
                $mny,
                $return_raw
            );
        }
        // clean up vars
        unset($mny);
        // return formatted currency amount
        return $amount_formatted;
    }
}
