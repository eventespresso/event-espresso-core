<?php

namespace EventEspresso\core\services\formatters;

use EventEspresso\core\services\locale\Locales;

abstract class LocaleFloatFormatter implements LocaleFloatFormatterInterface
{
    /**
     * number of decimal places used for high precision internal calculations and storage
     */
    const DECIMAL_PRECISION = 6;

    /*
     * the following constants represent the values returned for 'n_sign_posn' && 'p_sign_posn'
     */

    /**
     * 0 - Parentheses surround the quantity and currency_symbol
     */
    const PARENTHESES = 0;

    /**
     * 1 - The sign string precedes the quantity and currency_symbol
     */
    const SIGN_BEFORE_ALL = 1;

    /**
     * 2 - The sign string follows the quantity and currency_symbol
     */
    const SIGN_AFTER_ALL = 2;

    /**
     * 3 - The sign string immediately precedes the currency_symbol
     */
    const SIGN_BEFORE_CURRENCY = 3;

    /**
     * 4 - The sign string immediately follows the currency_symbol
     */
    const SIGN_AFTER_CURRENCY = 4;

    /**
     * @var Locales
     */
    protected $locales;


    /**
     * LocaleFloatFormatter constructor.
     *
     * @param Locales $locales
     */
    public function __construct(Locales $locales)
    {
        $this->locales = $locales;
    }


    /**
     * inserts symbols for the locale's decimal and thousands separator at the appropriate places
     *
     * @param int    $number
     * @param int    $precision
     * @param string $decimal_point
     * @param int    $grouping
     * @param string $thousands_separator
     * @return string
     */
    protected function formatGroupings($number, $precision, $decimal_point, $grouping, $thousands_separator)
    {
        // remove sign (+-), cast to string, then break apart at the decimal place
        $parts = explode('.', (string) abs($number));
        // separate the integer and decimal portions of the number into separate variables
        list($integer, $decimal) = $parts + [0, 0];
        // ok this gets a bit crazy, but we need to insert the locale's thousand separator
        // at the correct intervals for the locale, so 123456789 can be something like "123,456,879" or "1.23.45.67.89"
        // so we're first going to reverse the string, then use chunk_split() to give us something like "987,654,321"
        // why reverse the number first? cuz otherwise something like "1234" would become "123,4" not "1,234"
        $formatted_number = chunk_split(strrev($integer), $grouping, $thousands_separator);
        // so THEN we reverse the string again and remove any extra separators
        $formatted_number = ltrim(strrev($formatted_number), $thousands_separator);
        // now let's deal with the decimal places, by first adding a decimal to an otherwise non-decimal number
        $decimal = "0.{$decimal}";
        // then type cast the string to a float and round to the appropriate precision for the locale
        $decimal = round((float) $decimal, $precision);
        // now type cast back to a string, and remove the first two characters ( the "0." added earlier )
        $decimal = substr((string) $decimal, 2, $precision);
        // now add any extra zeros to the correct precision
        $decimal = str_pad($decimal, $precision, '0');
        // the final fully formatted result is as simple as stringing it all together
        return $formatted_number . $decimal_point . $decimal;
    }


    /**
     * Removes all characters except digits, +- and .
     *
     * @param float|int|string $number
     * @return float
     */
    public function filterNumericValue($number)
    {
        return (float) filter_var($number, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    }


    /**
     * formats the provided number to 6 decimal places using the site locale and returns a string
     *
     * @param float $number unformatted float, ex: 1.23456789
     * @return string       formatted number value, ex: '1.234568'
     */
    public function precisionFormat($number)
    {
        $locale = $this->locales->getLocale($this->locales->getSiteLocaleName());
        return $this->format($locale, $number, LocaleFloatFormatter::DECIMAL_PRECISION);
    }


    /**
     * strips formatting using the site locale, then rounds the provided number to 6 decimal places and returns a float
     *
     * @param float $number unformatted number value, ex: 1234.5678956789
     * @param int   $mode   one of the PHP_ROUND_* constants for round up, round down, etc
     * @return float        rounded value, ex: 1,234.567896
     */
    public function precisionRound($number, $mode = PHP_ROUND_HALF_UP)
    {
        return round(
            $this->filterNumericValue($number),
            LocaleFloatFormatter::DECIMAL_PRECISION,
            $mode
        );
    }


    /**
     * strips formatting for the provided locale (defaults to site locale),
     * then rounds the provided number and returns a float
     *
     * @param float  $number      unformatted number value, ex: 1234.56789
     * @param string $locale_name ex: 'en_US'
     * @param int    $mode        one of the PHP_ROUND_* constants for round up, round down, etc
     * @return float              rounded value, ex: 1,234.57
     */
    public function roundForLocale($number, $locale_name = '', $mode = PHP_ROUND_HALF_UP)
    {
        $locale = $this->locales->getLocale($locale_name);
        return round($this->filterNumericValue($number), $locale->decimalPrecision(), $mode);
    }
}
