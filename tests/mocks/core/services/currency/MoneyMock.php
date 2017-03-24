<?php

namespace EventEspresso\tests\mocks\core\services\currency;

use EventEspresso\core\entities\money\Money;
use EventEspresso\core\services\currency\Calculator;
use EventEspresso\core\services\currency\MoneyFormatter;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MoneyMock
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class MoneyMock extends Money
{

    /**
     * @return Calculator
     */
    public function getCalculator()
    {
        return self::$calculator;
    }



    /**
     * @return MoneyFormatter[]
     */
    public function getFormatters()
    {
        return self::$formatters;
    }



}
// End of file MoneyMock.php
// Location: EventEspresso\tests\mocks\core\services\currency/MoneyMock.php