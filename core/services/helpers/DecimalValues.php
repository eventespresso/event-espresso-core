<?php

namespace EventEspresso\core\services\helpers;

use EE_Currency_Config;

class DecimalValues
{
    /**
     * number of decimal places to round numbers to when performing calculations
     *
     * @var integer
     */
    protected $decimal_precision = 6;

    /**
     * number of decimal places to round numbers to for display
     *
     * @var integer
     */
    protected $locale_precision = 6;


    /**
     * @param EE_Currency_Config $currency_config
     */
    public function __construct(EE_Currency_Config $currency_config)
    {
        $this->locale_precision = $currency_config->dec_plc;
    }

    /**
     * strips formatting, rounds the provided number, and returns a float
     * if $round is set to true, then the decimal precision for the site locale will be used,
     * otherwise the default decimal precision of 6 will be used
     *
     * @param float|int|string $number unformatted number value, ex: 1234.5678956789
     * @param bool             $round  whether to round the price off according to the locale settings
     * @return float                      rounded value, ex: 1,234.567896
     */
    public function roundDecimalValue($number, bool $round = false): float
    {
        $precision = $round ? $this->locale_precision : $this->decimal_precision;
        return round(
            $this->filterDecimalValue($number),
            $precision ?? $this->decimal_precision,
            PHP_ROUND_HALF_UP
        );
    }


    /**
     * Removes all characters except digits, +- and .
     *
     * @param float|int|string $number
     * @return float
     */
    public function filterDecimalValue($number): float
    {
        return (float) filter_var($number, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    }
}
