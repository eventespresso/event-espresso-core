<?php

namespace EventEspresso\core\services\currency\formatters;
use EventEspresso\core\domain\values\currency\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');

/**
 * Class MoneyFormatter
 *
 * Faciliates formatting a money amount for display. Uses the other money formatter classes in this folder.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class MoneyFormatter
{

    /**
     * do NOT apply any formatting
     * eg: 123456
     */
    const RAW = 0;

    /**
     * only format money amount by adding the decimal mark
     * eg: 1234.56
     */
    const DECIMAL_ONLY = 1;

    /**
     * format money amount by adding decimal mark and thousands separator
     * eg: 1,234.56
     */
    const ADD_THOUSANDS = 2;

    /**
     * format money amount by adding decimal mark, thousands separator, and currency sign
     * eg: $1,234.56
     */
    const ADD_CURRENCY_SIGN = 3;

    /**
     * format money amount by adding decimal mark, thousands separator, currency sign, and currency code
     * eg: $1,234.56 USD
     */
    const ADD_CURRENCY_CODE = 4;

    /**
     * format money amount by adding decimal mark, thousands separator, currency sign,
     * and currency code wrapped in HTML span tag with HTML class
     * eg: $1,234.56 <span class="currency-code">(USD)</span>
     */
    const INTERNATIONAL = 5;



    /**
     * @var MoneyFormatterInterface[] $formatters
     */
    protected $formatters;



    /**
     * @return MoneyFormatterInterface[]
     */
    public function formatters()
    {
        if (empty($this->formatters)) {
            $this->initializeFormatters();
        }
        return $this->formatters;
    }



    /**
     * initializes a filterable array of MoneyFormatter services
     */
    protected function initializeFormatters()
    {
        if (! empty($this->formatters)) {
            return;
        }
        $this->formatters = apply_filters(
            'FHEE__EventEspresso_core_services_currency_formatters_MoneyFormatter__initializeFormatters__MoneyFormatters_array',
            array(
                1 => new DecimalMoneyFormatter(),
                2 => new ThousandsMoneyFormatter(),
                3 => new CurrencySignMoneyFormatter(),
                4 => new CurrencyCodeMoneyFormatter(),
                5 => new InternationalMoneyFormatter(),
            )
        );
    }



    /**
     * applies formatting based on the specified formatting level
     * corresponding to one of the constants on MoneyFormatter
     *
     * @param float $amount
     * @param Currency $currency
     * @param int $formatting_level
     * @return string
     */
    public function format($amount, $currency, $formatting_level = MoneyFormatter::ADD_THOUSANDS)
    {
        $formatters = $this->formatters();
        // if we are applying thousands formatting...
        if ($formatting_level >= MoneyFormatter::ADD_THOUSANDS) {
            // then let's remove decimal formatting since it's included in thousands formatting
            unset($formatters[ MoneyFormatter::DECIMAL_ONLY ]);
        }
        for ($x = 1; $x <= $formatting_level; $x++) {
            if (isset($formatters[ $x ]) && $formatters[ $x ] instanceof MoneyFormatterInterface) {
                $amount = $formatters[ $x ]->format($amount, $currency);
            }
        }
        return (string) apply_filters(
            'FHEE__EventEspresso_core_domain_values_currency_formatters_MoneyFormatter__format__formatted_amount',
            $amount,
            $this
        );
    }

}
// End of file MoneyFormatter.php
// Location: EventEspresso\core\services\currency\formatters/MoneyFormatter.php