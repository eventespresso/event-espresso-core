<?php
use EventEspresso\core\entities\money\Currency;
use EventEspresso\core\entities\money\Money;
use EventEspresso\core\services\currency\MoneyFactory;
use EventEspresso\core\services\currency\MoneyFormatter;

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
        $money = new Money(1234.56789, $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Currency', $money->currency());
        // how about a test that only makes cents?
        $money = new Money(
            0.56789,
                $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('0.57', $money->amount());
        // let's see what happens with the Dinar from Bahrain which uses 3 decimal places
        $BHD = $this->currency('BH');
        $money = new Money(
            1234.56789,
            $BHD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.568', $money->amount());
    }



    /**
     * @group Money
     * @expectedException InvalidArgumentException
     */
    public function test_construct_with_bad_amount()
    {
        new Money(
            new stdClass(),
            $this->currency(),
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->fail('InvalidArgumentException should have been thrown when object was used for amount.');
    }



    /**
     * @group Money
     */
    public function test_add()
    {
        $USD = $this->currency();
        $money1 = new Money(
            10,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money2 = new Money(
            15,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money = $money1->add($money2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('25', $money->amount());
        // how about some decimals?
        $money1 = new Money(
            10.75,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money2 = new Money(
            15.50,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
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
        $money_USD = new Money(
            10,
            $this->currency(),
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money_CAD = new Money(
            10,
            $this->currency('CA'),
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money_USD->add($money_CAD);
        $this->fail('InvalidArgumentException should have been thrown when attempting to add CAD to USD');
    }



    /**
     * @group Money
     */
    public function test_subtract()
    {
        $USD = $this->currency();
        $money1 = new Money(
            15,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money2 = new Money(
            10,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money = $money1->subtract($money2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('5', $money->amount());
        // how about some decimals?
        $money1 = new Money(
            20.75,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money2 = new Money(
            15.50,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
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
        $money_USD = new Money(
            10,
            $this->currency(),
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money_CAD = new Money(
            10,
            $this->currency('CA'),
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money_USD->subtract($money_CAD);
        $this->fail('InvalidArgumentException should have been thrown when attempting to subtract CAD from USD');
    }



    /**
     * @group Money
     */
    public function test_multiply()
    {
        $USD = $this->currency();
        $money = new Money(
            15.25,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money = $money->multiply(2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('30.5', $money->amount());
        // how about some decimals?
        $money = new Money(
            3.333,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
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
        $money = new Money(
            15,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money = $money->divide(2);
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('7.5', $money->amount());
        // how about some decimals?
        $money = new Money(
            10,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
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
        $money = new Money(
            10,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $money->divide(0);
    }



    /**
     * @group Money
     */
    public function test_format()
    {
        $USD = $this->currency();
        $money = new Money(
            1234.5,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.5', $money->amount());
        $this->assertEquals('1234.5', $money->format(MoneyFormatter::RAW));
        $this->assertEquals('1234.50', $money->format(MoneyFormatter::DECIMAL_ONLY));
        $this->assertEquals('1,234.50', $money->format(MoneyFormatter::ADD_THOUSANDS));
        $this->assertEquals('$1,234.50', $money->format(MoneyFormatter::ADD_CURRENCY_SIGN));
        $this->assertEquals('$1,234.50 USD', $money->format(MoneyFormatter::ADD_CURRENCY_CODE));
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
        $money = new Money(
            1234.5,
            $USD,
            MoneyFactory::calculator(),
            MoneyFactory::formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\entities\money\Money', $money);
        $this->assertEquals('1234.5', $money->amount());
        $this->assertEquals('1234.5', (string)$money);
    }
}
// End of file MoneyTest.php
// Location: tests/testcases/core/services/currency/MoneyTest.php