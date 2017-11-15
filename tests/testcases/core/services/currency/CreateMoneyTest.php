<?php
use EventEspresso\core\domain\values\currency\Currency;
use EventEspresso\core\services\currency\CurrencyFactory;
use EventEspresso\core\services\currency\MoneyFactory;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\mocks\core\services\currency\MoneyMock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CreateMoneyTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 * @group 10619
 */
class CreateMoneyTest extends \EE_UnitTestCase
{

    /**
     * @var MoneyFactory $money_factory
     */
    protected $money_factory;


    public function setUp()
    {
        parent::setUp();
        $this->money_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\MoneyFactory'
        );
        $this->currency_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\CurrencyFactory'
        );
        $this->organization_config = LoaderFactory::getLoader()->getShared('EE_Organization_Config');
    }


    /**
     * @param string $CNT_ISO
     * @return Currency
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function currency($CNT_ISO = 'US')
    {
        return $this->currency_factory->createFromCountryCode($CNT_ISO);
    }

    /**
     * @group Money
     */
    public function test_fromSubUnits()
    {
        $money = $this->money_factory->createFromSubUnits(123456, 'USD');
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.56', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
        $site_currency = $this->currency($this->organization_config->CNT_ISO);
        $this->assertTrue($site_currency->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_forSite()
    {
        $money = $this->money_factory->createForSite(1234.56789);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
        $site_currency = $this->currency($this->organization_config->CNT_ISO);
        $this->assertTrue($site_currency->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_forCountry()
    {
        $money = $this->money_factory->createForCountry(1234.56789, 'US');
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
        $USD = $this->currency();
        $this->assertTrue($USD->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_forCurrency()
    {
        $money = $this->money_factory->createForCurrency(1234.56789, 'USD');
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
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
            $this->money_factory->calculator()
        );
        // now create a MoneyMock object
        $USD = $this->currency();
        $money_mock = new MoneyMock(
            1234.5,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
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
                $this->money_factory->calculator(),
                $this->money_factory->formatters()
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
        $formatters = $this->money_factory->formatters();
        foreach ($formatters as $formatter) {
            $this->assertInstanceOf(
                '\EventEspresso\core\services\currency\formatters\MoneyFormatter',
                $formatter
            );
        }
        $USD = $this->currency();
        $money_mock = new MoneyMock(
            1234.5,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertInstanceOf(
            '\EventEspresso\tests\mocks\core\services\currency\MoneyMock',
            $money_mock
        );
        $formatters = $money_mock->getFormatters();
        $this->assertNotEmpty($formatters);
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\formatters\MoneyFormatter',
            reset($formatters)
        );
    }

}
// End of file MoneyTest.php
// Location: tests/testcases/core/services/currency/CreateMoneyTest.php
