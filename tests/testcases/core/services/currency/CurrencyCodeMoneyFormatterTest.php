<?php
use EventEspresso\core\entities\money\Currency;
use EventEspresso\core\services\currency\CurrencyCodeMoneyFormatter;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencyCodeMoneyFormatterTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CurrencyCodeMoneyFormatterTest extends \EE_UnitTestCase
{

    /**
     * @group Money
     */
    public function test_format()
    {
        $formatter = new CurrencyCodeMoneyFormatter();
        $currency = Currency::createFromCountryCode('US');
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '1234.5 USD'
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/CurrencyCodeMoneyFormatterTest.php

//Method EventEspresso\core\entities\money\Money::__toString() must not throw an exception, caught Error: Class 'EventEspresso\core\services\currency\CurrencyCodeMoneyFormatter' not found in /vagrant/www/wordpress-default/wp-content/plugins/event-espresso-core/tests/testcases/core/services/currency/MoneyTest.php on line 0
