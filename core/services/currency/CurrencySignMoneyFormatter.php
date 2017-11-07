<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\domain\values\currency\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencySignMoneyFormatter
 * adds currency sign to the supplied amount
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CurrencySignMoneyFormatter implements MoneyFormatter
{



    /**
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency)
    {
        // add currency sign
        if ($currency->signB4()) {
            if ($money_amount >= 0) {
                return $currency->sign() . $money_amount;
            }
            return '-' . $currency->sign() . str_replace('-', '', $money_amount);
        }
        return $money_amount . $currency->sign();
    }
}
