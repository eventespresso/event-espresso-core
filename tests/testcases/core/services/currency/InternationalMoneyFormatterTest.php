<?php
use EventEspresso\core\entities\money\Currency;
use EventEspresso\core\services\currency\InternationalMoneyFormatter;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class InternationalMoneyFormatterTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class InternationalMoneyFormatterTest extends \EE_UnitTestCase
{

    /**
     * @group Money
     */
    public function test_format()
    {
        $formatter = new InternationalMoneyFormatter();
        $currency = Currency::createFromCountryCode('US');
        $this->assertEquals(
            $formatter->format(1234.5, $currency),
            '1234.5 <span class="currency-code">(USD)</span>'
        );
    }
}
// End of file DecimalMoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/InternationalMoneyFormatterTest.php