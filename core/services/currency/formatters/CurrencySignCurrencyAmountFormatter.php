<?php

namespace EventEspresso\core\services\currency\formatters;

use EventEspresso\core\domain\values\currency\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencySignCurrencyAmountFormatter
 * adds currency sign to the supplied amount
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CurrencySignCurrencyAmountFormatter implements CurrencyAmountFormatterInterface
{
    /**
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency)
    {
        $separator = $currency->signSeparator();
        // add currency sign
        if ($currency->signB4()) {
            if ($money_amount >= 0) {
                return $currency->sign() . $separator . $money_amount;
            }
            return '-' . $currency->sign() . $separator . str_replace('-', '', $money_amount);
        }
        return $money_amount . $separator . $currency->sign();
    }
}
