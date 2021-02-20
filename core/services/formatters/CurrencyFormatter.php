<?php

namespace EventEspresso\core\services\formatters;

use EventEspresso\core\services\locale\Locale;

class CurrencyFormatter extends LocaleFloatFormatter
{

    /**
     * non-localized number no symbol or code: '123456.123456'
     */
    const FORMAT_PRECISION_FLOAT = 0;

    /**
     * localized number no symbol or code: '123,456.12'
     */
    const FORMAT_LOCALIZED_FLOAT = 1;

    /**
     * localized number with currency symbol: '$123,456.12'
     */
    const FORMAT_LOCALIZED_CURRENCY = 2;

    /**
     * localized number no symbols: '$123,456.12 USD'
     */
    const FORMAT_LOCALIZED_CURRENCY_RAW_CODE = 3;

    /**
     * localized number no symbols: '$123,456.12 <span>USD</span>'
     */
    const FORMAT_LOCALIZED_CURRENCY_HTML_CODE = 4;


    /**
     * formats the provided amount for the selected locale (defaults to site locale) and returns a string
     *
     * @param Locale   $locale
     * @param float    $amount    unformatted number value, ex: 1234.56789
     * @param int      $format    one of the CurrencyFormatter::FORMAT_* constants
     * @param int|null $precision the number of decimal places to round to
     * @return string             formatted amount, ex: '1,234.57'
     */
    protected function format(
        Locale $locale,
        $amount,
        $format = CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY,
        $precision = null
    ) {
        // if a specific decimal precision has been requested then use that, otherwise set it for the locale
        $precision = $precision !== null ? absint($precision) : $locale->decimalPrecision();
        // BUT... if the precision format has been requested, and the currency is just set at the locale
        // then bump the precision up to our max internal value
        $precision = $format === CurrencyFormatter::FORMAT_PRECISION_FLOAT && $precision === $locale->decimalPrecision()
            ? LocaleFloatFormatter::DECIMAL_PRECISION
            : $precision;

        // if only a float is requested then just return now
        if ($format < CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY) {
            return $format === CurrencyFormatter::FORMAT_PRECISION_FLOAT
                ? $this->precisionRound($amount)
                : $this->roundForLocale($amount);
        }
        // inserts symbols for the locale's decimal and thousands separator at the appropriate places
        $formatted_amount = $this->formatGroupings(
            $amount,
            absint($precision),
            $locale->currencyDecimalPoint(),
            $locale->currencyGrouping(),
            $locale->currencyThousandsSeparator()
        );

        $is_negative = $amount < 0;
        // set the currency symbol based on the format (no currency symbol for float formats)
        $currency_symbol = $format >= CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY ? $locale->currencySymbol() : '';

        // inserts the locale's currency symbol, negative sign, and spaces at the appropriate places
        $formatted_amount = $this->formatSymbolAndSignPositions(
            $locale,
            $formatted_amount,
            $is_negative,
            $currency_symbol
        );
        $formatted_amount = $this->appendCurrencyIsoCode($locale, $formatted_amount, $format);
        return $formatted_amount;
    }


    /**
     * @param Locale $locale
     * @param string $amount
     * @param int    $format one of the CurrencyFormatter::FORMAT_* constants
     * @return string        fully formatted amount with ISO code, ex: '$ 1,234.57 USD'
     */
    protected function appendCurrencyIsoCode(Locale $locale, $amount, $format)
    {
        switch ($format) {
            case CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY_RAW_CODE:
                $iso_code = "&nbsp;{$locale->currencyIsoCode()}";
                break;
            case CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY_HTML_CODE:
                $iso_code = "&nbsp;<span class=\"currency-code\">{$locale->currencyIsoCode()}</span>";
                break;
            default:
                $iso_code = '';
        }
        // filter to allow global setting of display_code
        $display_code = apply_filters(
            'FHEE__EEH_Template__format_currency__display_code',
            $format > CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY
        );
        $iso_code     = $display_code ? $iso_code : '';
        return "{$amount}{$iso_code}";
    }


    /**
     * inserts the locale's currency symbol, negative sign, and spaces at the appropriate places
     *
     * @param Locale $locale
     * @param int    $number
     * @param bool   $is_negative
     * @param string $currency_symbol
     * @return string partially formatted amount, ex: '$ 1,234.57'
     */
    protected function formatSymbolAndSignPositions(
        Locale $locale,
        $number,
        $is_negative,
        $currency_symbol
    ) {
        // format for positive or negative values
        if ($is_negative) {
            $add_spacer  = $locale->currencySymbolSpaceB4Negative();
            $currency_b4 = $locale->currencySymbolB4Negative();
            $position    = $locale->negativeSignPosition();
            $sign        = $locale->negativeSign();
        } else {
            $add_spacer  = $locale->currencySymbolSpaceB4Positive();
            $currency_b4 = $locale->currencySymbolB4Positive();
            $position    = $locale->positiveSignPosition();
            $sign        = $locale->positiveSign();
        }
        $spacer = $add_spacer ? '&nbsp;' : '';
        switch ($position) {
            case LocaleFloatFormatter::PARENTHESES:
                return $currency_b4
                    ? "({$currency_symbol}{$spacer}{$number})"
                    : "({$number}{$spacer}{$currency_symbol})";
            case LocaleFloatFormatter::SIGN_BEFORE_ALL:
                return $currency_b4
                    ? "{$sign}{$currency_symbol}{$spacer}{$number}"
                    : "{$sign}{$number}{$spacer}{$currency_symbol}";
            case LocaleFloatFormatter::SIGN_AFTER_ALL:
                return $currency_b4
                    ? "{$currency_symbol}{$spacer}{$number} {$sign}"
                    : "{$number}{$spacer}{$currency_symbol} {$sign}";
            case LocaleFloatFormatter::SIGN_BEFORE_CURRENCY:
                return $currency_b4
                    ? "{$sign}{$currency_symbol}{$spacer}{$number}"
                    : "{$number}{$spacer}{$sign}{$currency_symbol}";
            case LocaleFloatFormatter::SIGN_AFTER_CURRENCY:
                return $currency_b4
                    ? "{$currency_symbol}{$sign}{$spacer}{$number}"
                    : "{$number}{$spacer}{$currency_symbol}{$sign}";
        }
        return $number;
    }


    /**
     * formats the provided number for the selected locale (defaults to site locale) and returns a string
     *
     * @param float  $number       unformatted number value, ex: 1234.56789
     * @param string $currency_ISO ex: "USD"
     * @param int    $format       one of the CurrencyFormatter::FORMAT_* constants
     * @return string              formatted value, ex: '1,234.57'
     */
    public function formatForCurrencyISO(
        $number,
        $currency_ISO,
        $format = CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY
    ) {
        $locale = $this->getLocaleForCurrencyISO($currency_ISO);
        return $this->format($locale, $number, $format);
    }


    /**
     * formats the provided number for the selected locale (defaults to site locale) and returns a string
     *
     * @param float         $number    unformatted number value, ex: 1234.56789
     * @param int           $format    one of the CurrencyFormatter::FORMAT_* constants
     * @param string|Locale $locale    ex: "en_US" or Locale object
     * @param int|null      $precision the number of decimal places to round to
     * @return string                  formatted value, ex: '1,234.57'
     */
    public function formatForLocale(
        $number,
        $format = CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY,
        $locale = '',
        $precision = null
    ) {
        $locale = $this->locales->getLocale($locale);
        return $this->format($locale, $number, $format, $precision);
    }


    /**
     * @param string|Locale $locale locale name ex: en_US or Locale object
     * @return string ex: 'USD'
     */
    public function getCurrencyIsoCodeForLocale($locale = '')
    {
        $locale = $this->locales->getLocale($locale);
        return $locale->currencyIsoCode();
    }


    /**
     * @param string|Locale $locale locale name ex: en_US or Locale object
     * @return string ex: '$'
     */
    public function getCurrencySymbolForLocale($locale = '')
    {
        $locale = $this->locales->getLocale($locale);
        return $locale->currencySymbol();
    }


    /**
     * Schemas:
     *    'precision_float': "1,234.567890"
     *    'localized_float': "1,234.57"
     *    'no_currency_code': "$1,234.57"
     *    null: "$1,234.57<span>USD</span>"
     *
     * @param string $schema
     * @param bool   $allow_fractional_subunits
     * @return string
     */
    public function getFormatFromLegacySchema($schema, $allow_fractional_subunits = true)
    {
        switch ($schema) {
            case 'precision_float';
                // return a localized float if fractional subunits are not allowed
                return $allow_fractional_subunits
                    ? CurrencyFormatter::FORMAT_PRECISION_FLOAT
                    : CurrencyFormatter::FORMAT_LOCALIZED_FLOAT;
            case 'localized_float';
                return CurrencyFormatter::FORMAT_LOCALIZED_FLOAT;
            case 'localized';
            case 'localized_currency';
            case 'no_currency_code';
                return CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY;
            default;
                return CurrencyFormatter::FORMAT_LOCALIZED_CURRENCY_HTML_CODE;
        }
    }


    /**
     * @param string|Locale $locale locale name ex: en_US or Locale object
     * @return Locale
     */
    public function getLocale($locale = '')
    {
        return $this->locales->getLocale($locale);
    }


    /**
     * @param string $currency_ISO              ex: USD
     * @param bool   $fallback_to_site_locale   [optional] if true, will return the site locale
     *                                          if a locale can not be identified for the supplied currency ISO
     * @return Locale
     */
    public function getLocaleForCurrencyISO($currency_ISO, $fallback_to_site_locale = false)
    {
        return $this->locales->getLocaleForCurrencyISO($currency_ISO, $fallback_to_site_locale);
    }


    /**
     * @return Locale
     */
    public function getSiteLocale()
    {
        return $this->locales->getSiteLocale();
    }


    /**
     * This removes all localized formatting from the incoming value and returns a float
     *
     * @param string        $number formatted numeric value as string, ex: '1,234,567.89'
     * @param string|Locale $locale locale name ex: en_US or Locale object
     * @return float                unformatted number value, ex: 1234567.89
     */
    public function parseForLocale($number, $locale = '')
    {
        // just return the value if it's not a string
        if (! is_string($number)) {
            return (float) $number;
        }
        $locale = $this->locales->getLocale($locale);
        return $this->filterNumericValue(
            str_replace(
                [
                    $locale->currencyIsoCode(),
                    $locale->currencySymbol(),
                    $locale->currencyThousandsSeparator(),
                    $locale->currencyDecimalPoint(),
                ],
                [
                    '',  // remove currency code
                    '',  // remove currency symbol
                    '',  // remove thousands separator
                    '.', // convert decimal mark to what PHP expects
                ],
                $number
            )
        );
    }
}
