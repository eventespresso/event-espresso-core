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
    public function test_format_with_float_val()
    {
        $currency_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\CurrencyFactory'
        );
        $currency = $currency_factory->createFromCountryCode('US');
        $formatter= new DecimalCurrencyAmountFormatter();
        $this->assertEquals(
            '1234.50',
            $formatter->format(1234.5, $currency)
        );
    }

    /**
     * @group Money
     */
    public function test_format_with_int_val()
    {
        $currency_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\CurrencyFactory'
        );
        $currency = $currency_factory->createFromCountryCode('US');
        $formatter= new DecimalCurrencyAmountFormatter();
        $this->assertEquals(
            '1234.00',
            $formatter->format(1234, $currency)
        );
    }

    /**
     * @group Money
     */
    public function test_format_with_string_vals()
    {
        $currency_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\CurrencyFactory'
        );
        $currency = $currency_factory->createFromCountryCode('US');
        $formatter= new DecimalCurrencyAmountFormatter();
        $this->assertEquals(
            '1234.50',
            $formatter->format('1234.5', $currency)
        );
        $this->assertEquals(
            '1234.00',
            $formatter->format('1234', $currency)
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/DecimalMoneyFormatterTest.php
