<?php
use EventEspresso\core\services\currency\CreateCurrency;
use EventEspresso\core\services\currency\DecimalMoneyFormatter;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class DecimalMoneyFormatterTest
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class DecimalMoneyFormatterTest extends \EE_UnitTestCase
{

    /**
     * @group Money
     */
    public function test_format()
    {
        $formatter= new DecimalMoneyFormatter();
        $currency = CreateCurrency::fromCountryCode('US');
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '1234.50'
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/DecimalMoneyFormatterTest.php
