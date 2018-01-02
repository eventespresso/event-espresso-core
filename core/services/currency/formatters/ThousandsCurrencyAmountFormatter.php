<?php

namespace EventEspresso\core\services\currency\formatters;

use EventEspresso\core\domain\values\currency\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ThousandsCurrencyAmountFormatter
 * adds thousands separator to supplied amount
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ThousandsCurrencyAmountFormatter implements CurrencyAmountFormatterInterface
{



    /**
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency)
    {
        return number_format(
            $money_amount,
            $currency->decimalPlaces(),
            $currency->decimalMark(),
            $currency->thousands()
        );
    }


}
