<?php
use EventEspresso\core\services\currency\formatters\CurrencyCodeMoneyFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencyCodeMoneyFormatterTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 * @group 10619
 */
class CurrencyCodeMoneyFormatterTest extends \EE_UnitTestCase
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
        $formatter = new CurrencyCodeMoneyFormatter();
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '1234.5 USD'
        );
    }
}
