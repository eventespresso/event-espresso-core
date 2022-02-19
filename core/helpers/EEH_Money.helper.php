<?php

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
     * This removes all localized money formatting from the incoming value
     * Note: uses this site's currency settings for deciding what is considered a
     * "thousands separator" (usually the character "," )
     * and what is a "decimal mark" (usually the character ".")
     *
     * @param int|float|string $money_value
     * @param string|null      $CNT_ISO
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function strip_localized_money_formatting($money_value, ?string $CNT_ISO = ''): float
    {
        $currency_config = EE_Currency_Config::getCurrencyConfig($CNT_ISO);
        $money_value     = str_replace(
            [
                $currency_config->thsnds,
                $currency_config->dec_mrk,
            ],
            [
                '', // remove thousands separator
                '.', // convert decimal mark to what PHP expects
            ],
            $money_value
        );
        return (float) filter_var(
            $money_value,
            FILTER_SANITIZE_NUMBER_FLOAT,
            FILTER_FLAG_ALLOW_FRACTION
        );
    }


    /**
     * This converts an incoming localized money value into a standard float item (to three decimal places)
     * Only use this if you know the $money_value follows your currency configuration's
     * settings. Note: this uses this site's currency settings for deciding what is considered a
     * "thousands separator" (usually the character "," )
     * and what is a "decimal mark" (usually the character ".")
     *
     * @param int|float|string $money_value
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function convert_to_float_from_localized_money($money_value): float
    {
        // float it! and round to three decimal places
        return round(EEH_Money::strip_localized_money_formatting($money_value), 3);
    }


    /**
     * For comparing floats. Default operator is '=', but see the $operator below for all options.
     * This should be used to compare floats instead of normal '==' because floats
     * are inherently imprecise, and so you can sometimes have two floats that appear to be identical
     * but actually differ by 0.00000001.
     *
     * @see http://biostall.com/php-function-to-compare-floating-point-numbers
     * @param int|float|string $float1
     * @param int|float|string $float2
     * @param string|null      $operator The operator. Valid options are =, <=, <, >=, >, <>, eq, lt, lte, gt, gte, ne
     * @return bool whether the equation is true or false
     * @throws EE_Error
     */
    public static function compare_floats($float1, $float2, ?string $operator = '='): bool
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
            case '!==':
            case 'ne':
                if (abs($float1 - $float2) > $epsilon) {
                    return true;
                }
                break;
            default:
                throw new EE_Error(
                    sprintf(
                        esc_html__(
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
     * @param string|null $CNT_ISO If this is provided, then will attempt to get the currency settings for the country.
     *                             Otherwise will use currency settings for current active country on site.
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function get_format_for_jqplot(?string $CNT_ISO = ''): string
    {
        // default format
        $format          = 'f';
        $currency_config = EE_Currency_Config::getCurrencyConfig($CNT_ISO);
        // first get the decimal place and number of places
        $format = "%'." . $currency_config->dec_plc . $format;
        // currency symbol on right side.
        return $currency_config->sign_b4 ? $currency_config->sign . $format : $format . $currency_config->sign;
    }


    /**
     * This returns a localized format string suitable for usage with the Google Charts API format param.
     *
     * @param string|null $CNT_ISO If this is provided, then will attempt to get the currency settings for the country.
     *                             Otherwise will use currency settings for current active country on site.
     *                             Note: GoogleCharts uses ICU pattern set
     *                             (@return array
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @see http://icu-project.org/apiref/icu4c/classDecimalFormat.html#_details)
     */
    public static function get_format_for_google_charts(?string $CNT_ISO = ''): array
    {
        $currency_config            = EE_Currency_Config::getCurrencyConfig($CNT_ISO);
        $decimal_places_placeholder = str_pad('', $currency_config->dec_plc, '0');
        // first get the decimal place and number of places
        $format = '#,##0.' . $decimal_places_placeholder;
        // currency symbol on right side.
        $format          = $currency_config->sign_b4
            ? $currency_config->sign . $format
            : $format
              . $currency_config->sign;
        $formatterObject = [
            'decimalSymbol'  => $currency_config->dec_mrk,
            'groupingSymbol' => $currency_config->thsnds,
            'fractionDigits' => $currency_config->dec_plc,
        ];
        if ($currency_config->sign_b4) {
            $formatterObject['prefix'] = $currency_config->sign;
        } else {
            $formatterObject['suffix'] = $currency_config->sign;
        }
        return [
            'format'          => $format,
            'formatterObject' => $formatterObject,
        ];
    }


    /**
     * @param string|null $CNT_ISO
     * @return EE_Currency_Config
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function get_currency_config(?string $CNT_ISO = ''): EE_Currency_Config
    {
        return EE_Currency_Config::getCurrencyConfig($CNT_ISO);
    }


    /**
     * @param string|null $CNT_ISO
     * @param bool        $as_decimal if false [default] will return the number of decimal places ex: 1, 2, 3
     *                                if true, will return the subunits as a decimal fraction ex: .1, .01, .001
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public static function getCurrencySubUnits(?string $CNT_ISO = '', bool $as_decimal = false): float
    {
        $currency_config = EE_Currency_Config::getCurrencyConfig($CNT_ISO);
        return $as_decimal ? pow(10, ($currency_config->dec_plc * -1)) : $currency_config->dec_plc;
    }


    /**
     * @param string|null $CNT_ISO
     * @param bool        $as_decimal if false [default] will return the number of decimal places ex: 1, 2, 3
     *                                if true, will return the subunits as a decimal fraction ex: .1, .01, .001
     * @return float
     * @throws EE_Error
     * @since $VID:$
     */
    public static function getCurrencySubUnits(?string $CNT_ISO = '', bool $as_decimal = false): float
    {
        $currency_config = EEH_Money::get_currency_config($CNT_ISO);
        return $as_decimal ? pow(10, ($currency_config->dec_plc * -1)) : $currency_config->dec_plc;
    }
}
