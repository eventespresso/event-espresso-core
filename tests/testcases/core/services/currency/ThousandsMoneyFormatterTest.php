<?php
use EventEspresso\core\services\currency\ThousandsMoneyFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ThousandsMoneyFormatterTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ThousandsMoneyFormatterTest extends \EE_UnitTestCase
{

    /**
     * @group Money
     */
    public function test_format()
    {
        $currency_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\CurrencyFactory'
        );
        $currency = $currency_factory->createFromCountryCode('US');
        $formatter = new ThousandsMoneyFormatter();
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '1,234.50'
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/ThousandsMoneyFormatterTest.php
