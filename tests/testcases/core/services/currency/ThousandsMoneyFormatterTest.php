<?php
use EventEspresso\core\services\currency\CreateCurrency;
use EventEspresso\core\services\currency\ThousandsMoneyFormatter;

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
        $formatter = new ThousandsMoneyFormatter();
        $currency = CreateCurrency::fromCountryCode('US');
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '1,234.50'
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/ThousandsMoneyFormatterTest.php
