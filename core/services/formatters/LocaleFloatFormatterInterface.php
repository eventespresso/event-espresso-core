<?php

namespace EventEspresso\core\services\formatters;


/**
 * LocaleFloatFormatterInterface
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\formatters
 * @since   $VID:$
 */
interface LocaleFloatFormatterInterface
{
    /**
     * Removes all characters except digits, +- and .
     *
     * @param float|int|string $number
     * @return float
     */
    public function filterNumericValue($number);


    /**
     * formats the provided number for the selected locale (defaults to site locale) and returns a string
     *
     * @param float  $number unformatted number value, ex: 1234.56789
     * @param string $locale ex: "en_US"
     * @return string        formatted value, ex: '1,234.57'
     */
    public function formatForLocale($number, $locale);


    /**
     * This removes all localized formatting from the incoming value and returns a float
     *
     * @param string $number formatted numeric value as string, ex: '1,234,567.89'
     * @param string $locale ex: "en_US"
     * @return float         unformatted number value, ex: 1234567.89
     */
    public function parseForLocale($number, $locale);


    /**
     * formats the provided number to 6 decimal places using the site locale and returns a string
     *
     * @param float $number unformatted float, ex: 1.23456789
     * @return string       formatted number value, ex: '1.234568'
     */
    public function precisionFormat($number);


    /**
     * strips formatting using the site locale, then rounds the provided number to 6 decimal places and returns a float
     *
     * @param float $number unformatted number value, ex: 1234.5678956789
     * @param int   $mode   one of the PHP_ROUND_* constants for round up, round down, etc
     * @return float        rounded value, ex: 1,234.567896
     */
    public function precisionRound($number, $mode = PHP_ROUND_HALF_UP);


    /**
     * strips formatting for the provided locale (defaults to site locale),
     * then rounds the provided number and returns a float
     *
     * @param float  $number      unformatted number value, ex: 1234.56789
     * @param string $locale_name ex: 'en_US'
     * @param int    $mode        one of the PHP_ROUND_* constants for round up, round down, etc
     * @return float              rounded value, ex: 1,234.57
     */
    public function roundForLocale($number, $locale_name = '', $mode = PHP_ROUND_HALF_UP);
}
