<?php

namespace EventEspresso\core\services\locale;

use DomainException;

/**
 * Class Locale
 * a store for data retrieved from calling PHP's localeconv() function for a particular locale (ex: "en_US")
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\locale
 * @since   $VID:$
 */
class Locale
{
    /**
     * Monetary decimal point character
     */
    const CURRENCY_DECIMAL_POINT = 'mon_decimal_point';

    /**
     * Array containing monetary groupings
     */
    const CURRENCY_GROUPING = 'mon_grouping';

    /**
     * International currency code (ex: USD)
     */
    const CURRENCY_ISO_CODE = 'int_curr_symbol';

    /**
     * Local currency symbol (ex: $)
     */
    const CURRENCY_SYMBOL = 'currency_symbol';

    /**
     * true if currency_symbol precedes a positive value, false if it succeeds one
     */
    const CURRENCY_SYMBOL_B4_POSITIVE = 'p_cs_precedes';

    /**
     * true if a space separates currency_symbol from a positive value, false otherwise
     */
    const CURRENCY_SYMBOL_SPACE_B4_POSITIVE = 'p_sep_by_space';

    /**
     * true if currency_symbol precedes a negative value, false if it succeeds one
     */
    const CURRENCY_SYMBOL_B4_NEGATIVE = 'n_cs_precedes';

    /**
     * true if a space separates currency_symbol from a negative value, false otherwise
     */
    const CURRENCY_SYMBOL_SPACE_B4_NEGATIVE = 'n_sep_by_space';

    /**
     * Monetary thousands separator
     */
    const CURRENCY_THOUSANDS_SEP = 'mon_thousands_sep';

    /**
     * International fractional digits (number of decimal places)
     */
    const INTL_DECIMAL_PRECISION = 'int_frac_digits';

    /**
     * Local fractional digits (number of decimal places)
     */
    const LOCAL_DECIMAL_PRECISION = 'frac_digits';

    /**
     * Sign for negative values
     */
    const NEGATIVE_SIGN = 'negative_sign';

    /**
     * 0 - Parentheses surround the quantity and currency_symbol
     * 1 - The sign string precedes the quantity and currency_symbol
     * 2 - The sign string succeeds the quantity and currency_symbol
     * 3 - The sign string immediately precedes the currency_symbol
     * 4 - The sign string immediately succeeds the currency_symbol
     */
    const NEGATIVE_SIGN_POSITION = 'n_sign_posn';

    /**
     * Decimal point character
     */
    const NUMBER_DECIMAL_POINT = 'decimal_point';

    /**
     * Array containing numeric groupings
     */
    const NUMBER_GROUPING = 'grouping';

    /**
     * Thousands separator
     */
    const NUMBER_THOUSANDS_SEP = 'thousands_sep';

    /**
     * Sign for positive values
     */
    const POSITIVE_SIGN = 'positive_sign';

    /**
     * 0 - Parentheses surround the quantity and currency_symbol
     * 1 - The sign string precedes the quantity and currency_symbol
     * 2 - The sign string succeeds the quantity and currency_symbol
     * 3 - The sign string immediately precedes the currency_symbol
     * 4 - The sign string immediately succeeds the currency_symbol
     */
    const POSITIVE_SIGN_POSITION = 'p_sign_posn';

    /**
     * @var array
     */
    protected $locale_info;

    /**
     * @var string
     */
    protected $locale_name;

    /**
     * @var string
     */
    protected $currency_decimal_point;

    /**
     * @var int
     */
    protected $currency_grouping;

    /**
     * @var string
     */
    protected $currency_iso_code;

    /**
     * @var string
     */
    protected $currency_symbol;

    /**
     * @var bool
     */
    protected $currency_symbol_b4_negative;

    /**
     * @var bool
     */
    protected $currency_symbol_b4_positive;

    /**
     * @var bool
     */
    protected $currency_symbol_space_b4_negative;

    /**
     * @var bool
     */
    protected $currency_symbol_space_b4_positive;

    /**
     * @var string
     */
    protected $currency_thousands_separator;

    /**
     * @var int
     */
    protected $intl_decimal_precision;

    /**
     * @var int
     */
    protected $local_decimal_precision;

    /**
     * @var string
     */
    protected $negative_sign;

    /**
     * @var int
     */
    protected $negative_sign_position;

    /**
     * @var string
     */
    protected $number_decimal_point;

    /**
     * @var int
     */
    protected $number_grouping;

    /**
     * @var string
     */
    protected $number_thousands_separator;

    /**
     * @var string
     */
    protected $positive_sign;

    /**
     * @var int
     */
    protected $positive_sign_position;


    protected static $property_key_map = [
        Locale::CURRENCY_DECIMAL_POINT            => 'currency_decimal_point',
        Locale::CURRENCY_GROUPING                 => 'currency_grouping',
        Locale::CURRENCY_ISO_CODE                 => 'currency_iso_code',
        Locale::CURRENCY_SYMBOL                   => 'currency_symbol',
        Locale::CURRENCY_SYMBOL_B4_NEGATIVE       => 'currency_symbol_b4_negative',
        Locale::CURRENCY_SYMBOL_B4_POSITIVE       => 'currency_symbol_b4_positive',
        Locale::CURRENCY_SYMBOL_SPACE_B4_NEGATIVE => 'currency_symbol_space_b4_negative',
        Locale::CURRENCY_SYMBOL_SPACE_B4_POSITIVE => 'currency_symbol_space_b4_positive',
        Locale::CURRENCY_THOUSANDS_SEP            => 'currency_thousands_separator',
        Locale::INTL_DECIMAL_PRECISION            => 'intl_decimal_precision',
        Locale::LOCAL_DECIMAL_PRECISION           => 'local_decimal_precision',
        Locale::NUMBER_DECIMAL_POINT              => 'number_decimal_point',
        Locale::NUMBER_GROUPING                   => 'number_grouping',
        Locale::NUMBER_THOUSANDS_SEP              => 'number_thousands_separator',
        Locale::NEGATIVE_SIGN                     => 'negative_sign',
        Locale::NEGATIVE_SIGN_POSITION            => 'negative_sign_position',
        Locale::POSITIVE_SIGN                     => 'positive_sign',
        Locale::POSITIVE_SIGN_POSITION            => 'positive_sign_position',
    ];


    /**
     * Locale constructor.
     *
     * @param string $locale_name
     * @param array  $locale_info
     * @param array  $defaults
     */
    public function __construct(string $locale_name, array $locale_info, array $defaults)
    {
        $this->locale_info = $locale_info;
        $this->locale_name = $this->locale_info['locale_name'] ?? $locale_name;

        foreach (Locale::$property_key_map as $key => $property) {
            $value = '';
            if (isset($key, $this->locale_info)) {
                $value = $this->locale_info[ $key ];
            } elseif (isset($key, $defaults)) {
                $value = $defaults[ $key ];
            }
            $value = is_array($value) ? reset($value) : $value;
            // replace any space characters (nbsp, NNBSP, etc) with regular spaces
            $value = preg_replace('/[\s]+/mu', " ", $value);
            $this->{$property} = trim($value);
        }
    }


    /**
     * @return string[]
     */
    private function validLocaleInfoKeys(): array
    {
        return array_keys(Locale::$property_key_map);
    }


    /**
     * @param string $info_key
     * @throws DomainException
     */
    private function validateLocaleInfoKeys(string $info_key)
    {
        if (! in_array($info_key, $this->validLocaleInfoKeys())) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        '"%1$s" is not a valid key for retrieving locale information. Please use one of the "Locale::*" constants.',
                        'event_espresso'
                    ),
                    $info_key
                )
            );
        }
    }


    /**
     * @param string           $key
     * @param int|float|string $default
     * @return string
     */
    public function getLocaleInfo(string $key = '', $default = '')
    {
        $this->validateLocaleInfoKeys($key);
        return array_key_exists($key, $this->locale_info) ? $this->locale_info[ $key ] : $default;
    }


    /**
     * @return string
     */
    public function currencyDecimalPoint(): string
    {
        return $this->currency_decimal_point;
    }


    /**
     * @return int
     */
    public function currencyGrouping(): int
    {
        return $this->currency_grouping;
    }


    /**
     * @return string
     */
    public function currencyIsoCode(): string
    {
        return $this->currency_iso_code;
    }


    /**
     * @return string
     */
    public function currencySymbol(): string
    {
        return $this->currency_symbol;
    }


    /**
     * @return bool
     */
    public function currencySymbolB4Negative(): bool
    {
        return $this->currency_symbol_b4_negative;
    }


    /**
     * @return bool
     */
    public function currencySymbolB4Positive(): bool
    {
        return $this->currency_symbol_b4_positive;
    }


    /**
     * @return bool
     */
    public function currencySymbolSpaceB4Negative(): bool
    {
        return $this->currency_symbol_space_b4_negative;
    }


    /**
     * @return bool
     */
    public function currencySymbolSpaceB4Positive(): bool
    {
        return $this->currency_symbol_space_b4_positive;
    }


    /**
     * @return string
     */
    public function currencyThousandsSeparator(): string
    {
        return $this->currency_thousands_separator;
    }


    /**
     * @return string
     */
    public function decimalPoint(): string
    {
        return $this->number_decimal_point;
    }


    /**
     * @return int
     */
    public function decimalPrecision(): int
    {
        return $this->local_decimal_precision;
    }


    /**
     * @return int
     */
    public function internationalDecimalPrecision(): int
    {
        return $this->intl_decimal_precision;
    }


    /**
     * @return int
     */
    public function grouping(): int
    {
        return $this->number_grouping;
    }


    /**
     * @return string
     */
    public function name(): string
    {
        return $this->locale_name;
    }


    /**
     * @return string
     */
    public function negativeSign(): string
    {
        return $this->negative_sign;
    }


    /**
     * @return int
     */
    public function negativeSignPosition(): int
    {
        return $this->negative_sign_position;
    }


    /**
     * @return string
     */
    public function positiveSign(): string
    {
        return $this->positive_sign;
    }


    /**
     * @return int
     */
    public function positiveSignPosition(): int
    {
        return $this->positive_sign_position;
    }


    /**
     * @return string
     */
    public function thousandsSeparator(): string
    {
        return $this->number_thousands_separator;
    }
}
