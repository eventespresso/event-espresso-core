<?php

namespace EventEspresso\core\services\currency\formatters;

use EventEspresso\core\domain\values\currency\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MoneyFormatter
 * simple interface for classes that format money amounts according to a specific currency's rules
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
interface MoneyFormatter
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
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency);


}
