<?php

namespace EventEspresso\tests\mocks\core\services\currency;

use EventEspresso\core\domain\values\currency\Money;
use EventEspresso\core\services\currency\Calculator;
use EventEspresso\core\services\currency\formatters\MoneyFormatter;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MoneyFactoryMock
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
        return $this->calculator();
    }



    /**
     * @return MoneyFormatter[]
     */
    public function getFormatters()
    {
        return $this->formatters();
    }



}
// End of file MoneyMock.php
// Location: EventEspresso\tests\mocks\core\services\currency/MoneyFactoryMock.php
