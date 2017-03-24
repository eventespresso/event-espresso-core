<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\entities\money\Currency;

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
     * eg: USD $1,234.56
     */
    const INTERNATIONAL = 4;



    /**
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency);


}
// End of file MoneyFormatter.php
// Location: core/services/currency/MoneyFormatter.php
