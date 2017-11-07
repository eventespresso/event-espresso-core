<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\domain\values\currency\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class InternationalMoneyFormatter
 * appends the currency code wrapped in a span tag to the end of the supplied amount
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class InternationalMoneyFormatter implements MoneyFormatter
{



    /**
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency)
    {
        $currency_code = $currency->code();
        // remove currency code if already added
        $money_amount = str_replace($currency_code, '', $money_amount);
        return trim($money_amount) . ' <span class="currency-code">(' . $currency_code . ')</span>';
    }



}
