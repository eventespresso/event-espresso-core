<?php
namespace EventEspresso\core\services\currency\formatters;

use EventEspresso\core\services\loaders\LoaderFactory;
use EE_UnitTestCase;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');

/**
 * Class MoneyFormatterTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 * @group current
 *
 */
class MoneyFormatterTest extends EE_UnitTestCase
{
    public function testFormat()
    {
        $formatter = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\currency\formatters\MoneyFormatter');
        $money_factory = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\currency\MoneyFactory');
        $money = $money_factory->createForSite(10);
        $this->assertEquals(
             $money->amount(),
            $formatter->format($money, CurrencyAmountFormatterInterface::RAW)
        );
        $this->assertEquals(
            $money->amount() . '.00',
            $formatter->format($money, CurrencyAmountFormatterInterface::DECIMAL_ONLY)
        );
        $this->assertEquals(
            $money->amount() . '.00',
            $formatter->format($money, CurrencyAmountFormatterInterface::ADD_THOUSANDS)
        );
        $this->assertEquals(
            '$' . $money->amount() . '.00',
            $formatter->format($money, CurrencyAmountFormatterInterface::ADD_CURRENCY_SIGN)
        );
    }

}
// End of file MoneyFormatterTest.php
// Location: ${NAMESPACE}/MoneyFormatterTest.php