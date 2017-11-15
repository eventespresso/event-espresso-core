<?php
use EventEspresso\core\domain\values\currency\Currency;
use EventEspresso\core\domain\values\currency\Money;
use EventEspresso\core\services\currency\CurrencyFactory;
use EventEspresso\core\services\currency\MoneyFactory;
use EventEspresso\core\services\currency\formatters\MoneyFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class MoneyTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 * @group 10619
 */
class MoneyTest extends \EE_UnitTestCase
{

    /**
     * @var MoneyFactory $money_factory
     */
    protected $money_factory;

    /**
     * @var CurrencyFactory $currency_factory
     */
    protected $currency_factory;

    /**
     * @var EE_Organization_Config $organization_config
     */
    protected $organization_config;


    public function setUp()
    {
        parent::setUp();
        $this->money_factory       = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\MoneyFactory'
        );
        $this->currency_factory    = LoaderFactory::getLoader()->getShared(
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
    public function test_construct()
    {
        $USD = $this->currency();
        $money = new Money(1234.56789, $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Currency', $money->currency());
        // how about a test that only makes cents?
        $money = new Money(
            0.56789,
                $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('0.57', $money->amount());
        // let's see what happens with the Dinar from Bahrain which uses 3 decimal places
        $BHD = $this->currency('BH');
        $money = new Money(
            1234.56789,
            $BHD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.568', $money->amount());
    }



    /**
     * @group MoneyConvert
     */
    public function test_construct_with_wonky_values()
    {
        // update details for Russian Federation because the db data is wrong:
        /** @var EE_Country $russia */
        $russia = EEM_Country::instance()->get_one_by_ID('RU');
        $russia->set('CNT_cur_thsnds', '.');
        $russia->set('CNT_cur_dec_mrk', ',');
        $russia->save();

        $wonky_values = array(
            '$1,000,000.00'       => array('1000000.00', 'US'),
            '$1 000 000.00'       => array('1000000.00', 'US'),
            '1,000 000.00'        => array('1000000.00', 'US'),
            '$123'                => array('123', 'US'),
            '$123 456 789'        => array('123456789', 'US'),
            '0.15¢'               => array('0.15', 'US'),
            '75.25 £'             => array('75.25', 'GB'),
            'руб1.234.567,89 RUB' => array('1234567.89', 'RU'),
        );
        foreach ($wonky_values as $wonky_value => $currency) {
            $money = $this->money_factory->createForCountry($wonky_value, $currency[1]);
            $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
            $this->assertEquals($currency[0], $money->amount());
        }
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->fail('InvalidArgumentException should have been thrown when object was used for amount.');
    }


    /**
     * @group Money
     */
    public function test_amountInSubunits()
    {
        $USD   = $this->currency();
        $money = new Money(1234.56789, $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.57', $money->amount());
        $this->assertEquals('123457', $money->amountInSubunits());
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money2 = new Money(
            15,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money1->add($money2);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('25', $money->amount());
        // how about some decimals?
        $money1 = new Money(
            10.75,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money2 = new Money(
            15.50,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money1->add($money2);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money_CAD = new Money(
            10,
            $this->currency('CA'),
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money2 = new Money(
            10,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money1->subtract($money2);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('5', $money->amount());
        // how about some decimals?
        $money1 = new Money(
            20.75,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money2 = new Money(
            15.50,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money1->subtract($money2);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money_CAD = new Money(
            10,
            $this->currency('CA'),
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money->multiply(2);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('30.5', $money->amount());
        // how about some decimals?
        $money = new Money(
            3.333,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money->multiply(3);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money->divide(2);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('7.5', $money->amount());
        // how about some decimals?
        $money = new Money(
            10,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $money = $money->divide(3);
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.5', $money->amount());
        $this->assertEquals('1234.5', $money->format(MoneyFormatter::RAW));
        $this->assertEquals('1234.50', $money->format(MoneyFormatter::DECIMAL_ONLY));
        // now with default MoneyFormatter::ADD_THOUSANDS format
        $this->assertEquals('1,234.50', $money->format());
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
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertInstanceOf('\EventEspresso\core\domain\values\currency\Money', $money);
        $this->assertEquals('1234.5', $money->amount());
        $this->assertEquals('1234.5', (string)$money);
    }

    /**
     * @group 10619
     */
    public function testCreateNegativeAmount()
    {
        $USD = $this->currency();
        $money = new Money(
            -5,
            $USD,
            $this->money_factory->calculator(),
            $this->money_factory->formatters()
        );
        $this->assertEquals(-5, $money->amount());
    }
}
// End of file MoneyTest.php
// Location: tests/testcases/core/services/currency/MoneyTest.php
