<?php

namespace EventEspresso\core\services\formatters;


use EventEspresso\core\services\locale\Locale;

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
    public function filterNumericValue($number): float;


    /**
     * formats the provided number for the selected locale (defaults to site locale) and returns a string
     *
     * @param float|int|string $number    unformatted number value, ex: 1234.56789
     * @param int|null         $precision the number of decimal places to round to
     * @param string|Locale    $locale    ex: 'en_US' or Locale object
     * @return string                     formatted value, ex: '1,234.57'
     */
    public function formatForLocale($number, ?int $precision = null, $locale = ''): string;


    /**
     * This removes all localized formatting from the incoming value and returns a float
     *
     * @param float|int|string $number formatted numeric value as string, ex: '1,234,567.89'
     * @param string|Locale    $locale ex: 'en_US' or Locale object
     * @return float                   unformatted number value, ex: 1234567.89
     */
    public function parseForLocale($number, $locale = ''): float;


    /**
     * formats the provided number to 6 decimal places using the site locale and returns a string
     *
     * @param float|int|string $number unformatted float, ex: 1.23456789
     * @return string                  formatted number value, ex: '1.234568'
     */
    public function precisionFormat($number): string;


    /**
     * strips formatting using the site locale, then rounds the provided number to 6 decimal places and returns a float
     *
     * @param float|int|string $number    unformatted number value, ex: 1234.5678956789
     * @param int|null         $precision the number of decimal places to round to
     * @param int              $mode      one of the PHP_ROUND_* constants for round up, round down, etc
     * @return float                      rounded value, ex: 1,234.567896
     */
    public function precisionRound(
        $number,
        ?int $precision = LocaleFloatFormatter::DECIMAL_PRECISION,
        int $mode = PHP_ROUND_HALF_UP
    ): float;


    /**
     * strips formatting for the provided locale (defaults to site locale),
     * then rounds the provided number and returns a float
     *
     * @param float|int|string $number unformatted number value, ex: 1234.56789
     * @param string|Locale    $locale ex: 'en_US' or Locale object
     * @param int              $mode   one of the PHP_ROUND_* constants for round up, round down, etc
     * @return float                   rounded value, ex: 1,234.57
     */
    public function roundForLocale($number, $locale = '', int $mode = PHP_ROUND_HALF_UP): float;
}
