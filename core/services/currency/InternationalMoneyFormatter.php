<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\entities\money\Currency;

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
        return $money_amount . ' <span class="currency-code">(' . $currency->code() . ')</span>';
    }



}
// End of file CurrencyCodeMoneyFormatter.php
// Location: core/services/currency/InternationalMoneyFormatter.php