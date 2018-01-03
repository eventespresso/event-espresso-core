<?php
use EventEspresso\core\services\currency\formatters\DecimalCurrencyAmountFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class DecimalMoneyFormatterTest
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 * @group 10619
 */
class DecimalMoneyFormatterTest extends \EE_UnitTestCase
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
        $formatter= new DecimalCurrencyAmountFormatter();
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '1234.50'
        );
    }

    /**
     * @group Money
     */
    public function test_format_with_no_decimals()
    {
        $currency_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\CurrencyFactory'
        );
        $currency = $currency_factory->createFromCountryCode('US');
        $formatter= new DecimalCurrencyAmountFormatter();
        $this->assertEquals(
            $formatter->format(1234, $currency),
            '1234.00'
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/DecimalMoneyFormatterTest.php
