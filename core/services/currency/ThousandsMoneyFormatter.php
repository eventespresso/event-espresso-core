<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\entities\money\Currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ThousandsMoneyFormatter
 * adds thousands separator to supplied amount
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ThousandsMoneyFormatter implements MoneyFormatter
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
// End of file ThousandsMoneyFormatter.php
// Location: EventEspresso\core\services\currency/ThousandsMoneyFormatter.php