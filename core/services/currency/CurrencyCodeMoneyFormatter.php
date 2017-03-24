<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\entities\money\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencyCodeMoneyFormatter
 * appends the currency code to the supplied amount
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CurrencyCodeMoneyFormatter implements MoneyFormatter
{

    /**
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency)
    {
        return $money_amount . ' ' . $currency->code();
    }

}
// End of file CurrencyCodeMoneyFormatter.php
// Location: core/entities/money/CurrencyCodeMoneyFormatter.php