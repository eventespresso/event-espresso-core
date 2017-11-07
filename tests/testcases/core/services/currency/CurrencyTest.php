<?php
use EventEspresso\core\services\currency\CreateCurrency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CurrencyTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CurrencyTest extends \EE_UnitTestCase
{

    /**
     * @group Money
     */
    public function test_createFromCountryCode()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\domain\values\currency\Currency',
            CreateCurrency::fromCountryCode('US')
        );
    }

    /**
     * @group Money
     */
    public function test_createFromCode()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\domain\values\currency\Currency',
            CreateCurrency::fromCode('USD')
        );
    }

    /**
     * @group Money
     */
    public function test_equals()
    {
        $US1 = CreateCurrency::fromCountryCode('US');
        $US2 = CreateCurrency::fromCode('USD');
        $this->assertTrue( $US1->equals($US2) );
    }

    /**
     * @group Money
     */
    public function test_all_getters()
    {
        $USD = CreateCurrency::fromCountryCode('US');
        $this->assertEquals('USD', $USD->code());
        $this->assertEquals('USD', $USD->code());
        $this->assertEquals('Dollar', $USD->name());
        $this->assertEquals('Dollars', $USD->plural());
        $this->assertEquals('$', $USD->sign());
        $this->assertTrue($USD->signB4());
        $this->assertEquals(2, $USD->decimalPlaces());
        $this->assertEquals('.', $USD->decimalMark());
        $this->assertEquals(',', $USD->thousands());
    }

    /**
     * @group Money
     */
    public function test_toString()
    {
        $USD = CreateCurrency::fromCountryCode('US');
        $this->assertEquals('USD', (string) $USD);
    }

}
// End of file CurrencyTest.php
// Location: tests/testcases/core/services/currency/CurrencyTest.php
