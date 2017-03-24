<?php
use EventEspresso\core\entities\money\Currency;
use EventEspresso\core\services\currency\CurrencySignMoneyFormatter;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencySignMoneyFormatterTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CurrencySignMoneyFormatterTest extends \EE_UnitTestCase
{

    /**
     * @group Money
     */
    public function test_format()
    {
        $formatter = new CurrencySignMoneyFormatter();
        $currency = Currency::createFromCountryCode('US');
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '$1234.5'
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/CurrencySignMoneyFormatterTest.php