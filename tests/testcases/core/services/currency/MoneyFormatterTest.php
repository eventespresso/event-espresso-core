<?php

namespace EventEspresso\core\services\currency\formatters;

use EventEspresso\core\services\currency\MoneyFactory;
use EventEspresso\core\services\loaders\LoaderFactory;
use EE_UnitTestCase;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class MoneyFormatterTest
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 * @group          10619
 */
class MoneyFormatterTest extends EE_UnitTestCase
{

    /**
     * @var MoneyFactory $money_factory
     */
    protected $money_factory;

    /**
     * @var MoneyFormatter $formatter
     */
    protected $formatter;


    /**
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    public function setUp()
    {
        parent::setUp();
        $this->money_factory = LoaderFactory::getLoader() ->getShared(
            'EventEspresso\core\services\currency\MoneyFactory'
        );
        $this->formatter = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\formatters\MoneyFormatter'
        );
    }


    public function currencyDataProvider()
    {
        return array(
            array('1234', 'US', '1234.00', '1,234.00', '$1,234.00', '$1,234.00 <span class="currency-code">(USD)</span>'),
            array('1234.56', 'US', '1234.56', '1,234.56', '$1,234.56', '$1,234.56 <span class="currency-code">(USD)</span>'),
            array('1234', 'BR', '1234,00', '1.234,00', 'R$ 1.234,00', 'R$ 1.234,00 <span class="currency-code">(BRL)</span>'),
            array('1234,56', 'BR', '1234,56', '1.234,56', 'R$ 1.234,56', 'R$ 1.234,56 <span class="currency-code">(BRL)</span>'),
            array('1234', 'DE', '1234,00', '1.234,00', '1.234,00 €', '1.234,00 € <span class="currency-code">(EUR)</span>'),
            array('1234,56', 'DE', '1234,56', '1.234,56', '1.234,56 €', '1.234,56 € <span class="currency-code">(EUR)</span>'),
            array('1234', 'FR', '1234,00', '1 234,00', '1 234,00 €', '1 234,00 € <span class="currency-code">(EUR)</span>'),
            array('1234,56', 'FR', '1234,56', '1 234,56', '1 234,56 €', '1 234,56 € <span class="currency-code">(EUR)</span>'),
            array('1234', 'NL', '1234,00', '1.234,00', '€1.234,00', '€1.234,00 <span class="currency-code">(EUR)</span>'),
            array('1234,56', 'NL', '1234,56', '1.234,56', '€1.234,56', '€1.234,56 <span class="currency-code">(EUR)</span>'),
            array('1234', 'IT', '1234,00', '1.234,00', '€ 1.234,00', '€ 1.234,00 <span class="currency-code">(EUR)</span>'),
            array('1234,56', 'IT', '1234,56', '1.234,56', '€ 1.234,56', '€ 1.234,56 <span class="currency-code">(EUR)</span>'),
            array('1234', 'JP', '1234', '1,234', '¥1,234', '¥1,234 <span class="currency-code">(JPY)</span>'),
            array('1234', 'NO', '1234,00', '1 234,00', '1 234,00 kr', '1 234,00 kr <span class="currency-code">(NOK)</span>'),
            array('1234,56', 'NO', '1234,56', '1 234,56', '1 234,56 kr', '1 234,56 kr <span class="currency-code">(NOK)</span>'),
            array('1234', 'RU', '1234,00', '1.234,00', '₽1.234,00', '₽1.234,00 <span class="currency-code">(RUB)</span>'),
            array('1234,56', 'RU', '1234,56', '1.234,56', '₽1.234,56', '₽1.234,56 <span class="currency-code">(RUB)</span>'),
            array('1234', 'SE', '1234,00', '1 234,00', '1 234,00 kr', '1 234,00 kr <span class="currency-code">(SEK)</span>'),
            array('1234,56', 'SE', '1234,56', '1 234,56', '1 234,56 kr', '1 234,56 kr <span class="currency-code">(SEK)</span>'),
            array('1234', 'TR', '1234,00', '1.234,00', '₺1.234,00', '₺1.234,00 <span class="currency-code">(TRY)</span>'),
            array('1234,56', 'TR', '1234,56', '1.234,56', '₺1.234,56', '₺1.234,56 <span class="currency-code">(TRY)</span>'),
        );
    }


    /**
     * @dataProvider currencyDataProvider
     * @param float  $amount
     * @param string $CNT_ISO
     * @param string $decimal
     * @param string $thousands
     * @param string $currency_sign
     * @param string $international
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \InvalidArgumentException
     */
    public function testFormatWithCurrency($amount, $CNT_ISO, $decimal, $thousands, $currency_sign, $international)
    {
        $money = $this->money_factory->createForCountry($amount, $CNT_ISO);
        $this->assertEquals(
            $money->amount(),
            $this->formatter->format($money, CurrencyAmountFormatterInterface::RAW)
        );
        $this->assertEquals(
            $decimal,
            $this->formatter->format($money, CurrencyAmountFormatterInterface::DECIMAL_ONLY)
        );
        $this->assertEquals(
            $thousands,
            $this->formatter->format($money, CurrencyAmountFormatterInterface::ADD_THOUSANDS)
        );
        $this->assertEquals(
            $currency_sign,
            $this->formatter->format($money, CurrencyAmountFormatterInterface::ADD_CURRENCY_SIGN)
        );
        $this->assertEquals(
            $international,
            $this->formatter->format($money, CurrencyAmountFormatterInterface::INTERNATIONAL)
        );
    }
}
// End of file MoneyFormatterTest.php
// Location: tests/testcases/core/services/currency/MoneyFormatterTest.php
