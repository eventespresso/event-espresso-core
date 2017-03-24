<?php
use EventEspresso\core\entities\money\Currency;
use EventEspresso\core\entities\money\Money;
use EventEspresso\core\services\currency\MoneyFormatter;
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
class MoneyTest extends \EE_UnitTestCase
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
    public function test_construct()
    {
        $USD = $this->currency();
        $money = new Money(1234.56789, $USD);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Currency', $money->currency());
        // how about a test that only makes cents?
        $money = new Money(0.56789, $USD);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('0.57', $money->amount());
        // let's see what happens with the Dinar from Bahrain which uses 3 decimal places
        $BHD = $this->currency('BH');
        $money = new Money(1234.56789, $BHD);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.568', $money->amount());
    }



    /**
     * @group Money
     * @expectedException InvalidArgumentException
     */
    public function test_construct_with_bad_amount()
    {
        new Money(new stdClass(), $this->currency());
        $this->fail('InvalidArgumentException should have been thrown when object was used for amount.');
    }



    /**
     * @group Money
     */
    public function test_forSite()
    {
        $money = Money::forSite(1234.56789);
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
        $money = Money::forCountry(1234.56789, 'US');
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
        $money = Money::forCurrency(1234.56789, 'USD');
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
        $money = Money::USD(1234.56789);
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
        $USD = $this->currency();
        $money_mock = new MoneyMock(1234.5, $USD);
        $this->assertInstanceOf(
            '\EventEspresso\tests\mocks\core\services\currency\MoneyMock',
            $money_mock
        );
        $this->assertEmpty($money_mock->getCalculator());
        // now run a calculation on the money amount, which should trigger Money::initializeCalculators()
        $money_mock->add(new Money(10, $USD));
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\Calculator',
            $money_mock->getCalculator()
        );
        // now create a NEW MoneyMock and confirm that the calculator is already set
        // without us having to perform any calculations. This proves that initialization only happens ONCE!
        $new_money_mock = new MoneyMock(500, $USD);
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\Calculator',
            $new_money_mock->getCalculator()
        );
    }



    /**
     * @group Money
     */
    public function test_initializeFormatters()
    {
        $USD = $this->currency();
        $money_mock = new MoneyMock(1234.5, $USD);
        $this->assertInstanceOf(
            '\EventEspresso\tests\mocks\core\services\currency\MoneyMock',
            $money_mock
        );
        $formatters = $money_mock->getFormatters();
        $this->assertEmpty($formatters);
        // now format the money amount, which should trigger Money::initializeFormatters()
        $money_mock->format();
        $formatters = $money_mock->getFormatters();
        $this->assertNotEmpty($formatters);
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\MoneyFormatter',
            reset($formatters)
        );
        // now create a NEW MoneyMock and confirm that the formatters are already set
        // without us having to perform any formatting. This proves that initialization only happens ONCE!
        $new_money_mock = new MoneyMock(500, $USD);
        $formatters = $new_money_mock->getFormatters();
        $this->assertNotEmpty($formatters);
        $this->assertInstanceOf(
            '\EventEspresso\core\services\currency\MoneyFormatter',
            reset($formatters)
        );
    }



    /**
     * @group Money
     */
    public function test_add()
    {
        $USD = $this->currency();
        $money1 = new Money(10, $USD);
        $money2 = new Money(15, $USD);
        $money = $money1->add($money2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('25', $money->amount());
        // how about some decimals?
        $money1 = new Money(10.75, $USD);
        $money2 = new Money(15.50, $USD);
        $money = $money1->add($money2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('26.25', $money->amount());
    }



    /**
     * @group Money
     * @expectedException InvalidArgumentException
     */
    public function test_add_mismatched_currencies()
    {
        $money_USD = new Money(10, $this->currency());
        $money_CAD = new Money(10, $this->currency('CA'));
        $money_USD->add($money_CAD);
        $this->fail('InvalidArgumentException should have been thrown when attempting to add CAD to USD');
    }



    /**
     * @group Money
     */
    public function test_subtract()
    {
        $USD = $this->currency();
        $money1 = new Money(15, $USD);
        $money2 = new Money(10, $USD);
        $money = $money1->subtract($money2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('5', $money->amount());
        // how about some decimals?
        $money1 = new Money(20.75, $USD);
        $money2 = new Money(15.50, $USD);
        $money = $money1->subtract($money2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('5.25', $money->amount());
    }



    /**
     * @group Money
     * @expectedException InvalidArgumentException
     */
    public function test_subtract_mismatched_currencies()
    {
        $money_USD = new Money(10, $this->currency());
        $money_CAD = new Money(10, $this->currency('CA'));
        $money_USD->subtract($money_CAD);
        $this->fail('InvalidArgumentException should have been thrown when attempting to subtract CAD from USD');
    }



    /**
     * @group Money
     */
    public function test_multiply()
    {
        $USD = $this->currency();
        $money = new Money(15.25, $USD);
        $money = $money->multiply(2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('30.5', $money->amount());
        // how about some decimals?
        $money = new Money(3.333, $USD);
        $money = $money->multiply(3);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('9.99', $money->amount());
    }



    /**
     * @group Money
     */
    public function test_divide()
    {
        $USD = $this->currency();
        $money = new Money(15, $USD);
        $money = $money->divide(2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('7.5', $money->amount());
        // how about some decimals?
        $money = new Money(10, $USD);
        $money = $money->divide(3);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('3.33', $money->amount());
    }



    /**
     * @group Money
     * @expectedException InvalidArgumentException
     */
    public function test_divide_by_zero()
    {
        $USD = $this->currency();
        $money = new Money(10, $USD);
        $money->divide(0);
    }



    /**
     * @group Money
     */
    public function test_format()
    {
        $USD = $this->currency();
        $money = new Money(1234.5, $USD);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.5', $money->amount());
        $this->assertEquals('1234.5', $money->format(MoneyFormatter::RAW));
        $this->assertEquals('1234.50', $money->format(MoneyFormatter::DECIMAL_ONLY));
        $this->assertEquals('1,234.50', $money->format(MoneyFormatter::ADD_THOUSANDS));
        $this->assertEquals('$1,234.50', $money->format(MoneyFormatter::ADD_CURRENCY_SIGN));
        $this->assertEquals(
            '$1,234.50 <span class="currency-code">(USD)</span>',
            $money->format(MoneyFormatter::INTERNATIONAL)
        );
    }



    /**
     * @group Money
     */
    public function test_toString()
    {
        $USD = $this->currency();
        $money = new Money(1234.5, $USD);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.5', $money->amount());
        $this->assertEquals('1234.5', (string)$money);
    }
}
// End of file MoneyTest.php
// Location: tests/testcases/core/services/currency/MoneyTest.php