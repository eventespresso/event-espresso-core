<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\entities\money\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class DecimalMoneyFormatter
 * adds decimal mark to supplied amount
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class DecimalMoneyFormatter implements MoneyFormatter
{



    /**
     * @param string   $money_amount
     * @param Currency $currency
     * @return string
     */
    public function format($money_amount, Currency $currency)
    {
        return (string)round($money_amount, $currency->decimalPlaces());
    }


}
// End of file DecimalMoneyFormatter.php
// Location: EventEspresso\core\services\currency/DecimalMoneyFormatter.php