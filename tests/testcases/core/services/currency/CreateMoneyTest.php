<?php
use EventEspresso\core\domain\values\currency\Currency;
use EventEspresso\core\domain\values\currency\Money;
use EventEspresso\core\services\currency\CreateCurrency;
use EventEspresso\core\services\currency\CreateMoney;
use EventEspresso\tests\mocks\core\services\currency\MoneyMock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CreateMoneyTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CreateMoneyTest extends \EE_UnitTestCase
{

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
        return CreateCurrency::fromCountryCode($CNT_ISO);
    }

    /**
     * @group Money
     */
    public function test_fromSubUnits()
    {
        $money = CreateMoney::fromSubUnits(123456, 'USD');
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.56', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
        $CNT_ISO       = isset(EE_Registry::instance()->CFG->organization)
                         && EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config
            ? EE_Registry::instance()->CFG->organization->CNT_ISO
            : 'US';
        $site_currency = $this->currency($CNT_ISO);
        $this->assertTrue($site_currency->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_forSite()
    {
        $money = CreateMoney::forSite(1234.56789);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
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
        $money = CreateMoney::forCountry(1234.56789, 'US');
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
        $money = CreateMoney::forCurrency(1234.56789, 'USD');
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
        $USD = $this->currency();
        $this->assertTrue($USD->equals($money->currency()));
    }

    /**
     * @group Money
     */
    public function test_callStatic()
    {
        /** @var Money $money */
        $money = Money::USD(1234.56789);
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
            CreateMoney::calculator()
        );
        // now create a MoneyMock object
        $USD = $this->currency();
        $money_mock = new MoneyMock(
            1234.5,
            $USD,
            CreateMoney::calculator(),
            CreateMoney::formatters()
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
                CreateMoney::calculator(),
                CreateMoney::formatters()
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
        $formatters = CreateMoney::formatters();
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
            CreateMoney::calculator(),
            CreateMoney::formatters()
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
// Location: tests/testcases/core/services/currency/CreateMoneyTest.php
