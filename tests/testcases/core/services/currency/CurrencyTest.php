<?php
use EventEspresso\core\services\currency\CurrencyFactory;
use EventEspresso\core\services\loaders\LoaderFactory;

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
     * @var CurrencyFactory $currency_factory
     */
    protected $currency_factory;


    public function setUp()
    {
        parent::setUp();
        $this->currency_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\CurrencyFactory'
        );
    }


    /**
     * @group Money
     */
    public function test_createFromCountryCode()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\domain\values\currency\Currency',
            $this->currency_factory->createFromCountryCode('US')
        );
    }

    /**
     * @group Money
     */
    public function test_createFromCode()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\domain\values\currency\Currency',
            $this->currency_factory->createFromCode('USD')
        );
    }

    /**
     * @group Money
     */
    public function test_equals()
    {
        $US1 = $this->currency_factory->createFromCountryCode('US');
        $US2 = $this->currency_factory->createFromCode('USD');
        $this->assertTrue( $US1->equals($US2) );
    }

    /**
     * @group Money
     */
    public function test_all_getters()
    {
        $USD = $this->currency_factory->createFromCountryCode('US');
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
        $USD = $this->currency_factory->createFromCountryCode('US');
        $this->assertEquals('USD', (string) $USD);
    }

}
// End of file CurrencyTest.php
// Location: tests/testcases/core/services/currency/CurrencyTest.php
