<?php
use EventEspresso\core\entities\money\Currency;
use EventEspresso\core\entities\money\Money;
use EventEspresso\core\services\currency\MoneyFactory;
use EventEspresso\tests\mocks\core\services\currency\MoneyMock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MoneyTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class MoneyFactoryTest extends \EE_UnitTestCase
{

    /**
     * @param string $CNT_ISO
     * @return Currency
     * @throws InvalidArgumentException
     */
    protected function currency($CNT_ISO = 'US')
    {
        return Currency::createFromCountryCode($CNT_ISO);
    }

    /**
     * @group Money
     */
    public function test_forSite()
    {
        $money = MoneyFactory::forSite(1234.56789);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Currency', $money->currency());
        $CNT_ISO = isset(EE_Registry::instance()->CFG->organization)
                   && EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config
            ? EE_Registry::instance()->CFG->organization->CNT_ISO
            : 'US';
        $site_currency = $this->currency($CNT_ISO);
        $this->assertTrue($site_currency->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_forCountry()
    {
        $money = MoneyFactory::forCountry(1234.56789, 'US');
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Currency', $money->currency());
        $USD = $this->currency();
        $this->assertTrue($USD->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_forCurrency()
    {
        $money = MoneyFactory::forCurrency(1234.56789, 'USD');
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Currency', $money->currency());
        $USD = $this->currency();
        $this->assertTrue($USD->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_callStatic()
    {
        /** @var Money $money */
        $money = MoneyFactory::USD(1234.56789);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Currency', $money->currency());
        $USD = $this->currency();
        $this->assertTrue($USD->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_initializeCalculators()
    {
        // confirm getter returns correct object
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\Calculator',
            MoneyFactory::calculator()
        );
        // now create a MoneyMock object
        $USD = $this->currency();
        $money_mock = new MoneyMock(
            1234.5,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->assertInstanceOf(
            '\EventEspresso\tests\mocks\core\services\currency\MoneyMock',
            $money_mock
        );
        // confirm that calculator is set
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\Calculator',
            $money_mock->getCalculator()
        );
        // now run a calculation on the money amount
        $money_mock->add(
            new MoneyMock(
                10,
                $USD,
                MoneyFactory::calculator(),
                MoneyFactory::formatters()
            )
        );
        // confirm that calculator is set on new MoneyMock returned
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\Calculator',
            $money_mock->getCalculator()
        );
    }

    /**
     * @group Money
     */
    public function test_initializeFormatters()
    {
        $formatters = MoneyFactory::formatters();
        foreach ($formatters as $formatter) {
            $this->assertInstanceOf(
                '\EventEspresso\core\services\currency\MoneyFormatter',
                $formatter
            );
        }
        $USD = $this->currency();
        $money_mock = new MoneyMock(
            1234.5,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->assertInstanceOf(
            '\EventEspresso\tests\mocks\core\services\currency\MoneyMock',
            $money_mock
        );
        $formatters = $money_mock->getFormatters();
        $this->assertNotEmpty($formatters);
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\MoneyFormatter',
            reset($formatters)
        );
    }

}
// End of file MoneyTest.php
// Location: tests/testcases/core/services/currency/MoneyTest.php