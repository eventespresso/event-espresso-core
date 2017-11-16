<?php

use EventEspresso\core\services\currency\formatters\MoneyFormatter;
use EventEspresso\core\services\currency\MoneyFactory;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Tests for the EE_Money_Field class
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.26.rc.000
 * @group      model_fields
 * @group      models
 */
class EE_Money_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     *
     * @var EE_Money_Field
     */
    protected $_field;



    public function setUp()
    {
        parent::setUp();
        $this->_field = EEM_Price::instance()->field_settings_for('PRC_amount');
        $this->assertInstanceOf('EE_Money_Field', $this->_field);
    }



    public function tearDown()
    {
        $this->_field = null;
        parent::tearDown();
    }



    public function test_getSchemaType()
    {
        $this->assertEquals('object', $this->_field->getSchemaType());
    }



    public function test_get_wpdb_data_type()
    {
        $this->assertEquals('%f', $this->_field->get_wpdb_data_type());
    }



    /**
     * @return array {
     * @type float $expected
     * @type mixed $input
     *               }
     */
    public function dataProviderForPrepareForGet()
    {
        return array(
            'float' => array(1.23, 1.23),
            'int'   => array(32, 32),
            'money' => array(
                1.23,
                LoaderFactory::getLoader()->getShared(
                    'EventEspresso\core\services\currency\MoneyFactory'
                )->createForSite(1.23)
            ),
        );
    }



    /**
     * @dataProvider dataProviderForPrepareForGet
     * @param float $expected
     * @param mixed $input
     */
    public function testPrepareForGet($expected, $input)
    {
        $value_for_setting = $this->_field->prepare_for_get($input);
        $this->assertEquals($expected, $value_for_setting);
    }



    /**
     * @return array {
     * @type float $expected
     * @type mixed $input
     *               }
     */
    public function dataProviderForPrepareForSet()
    {
        $factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\MoneyFactory'
        );
        return array(
            'float'       => array($factory->createForSite(1.23), 1.23),
            'int'         => array($factory->createForSite(32), 32),
            'money'       => array(
                $factory->createForSite(1.43),
                $factory->createForSite(1.43),
            ),
            'string'      => array(
                $factory->createForSite(4.32),
                '4.32'
            ),
            'i18n_string' => array(
                $factory->createForSite(3200.32),
                '$3,200.32 USD'
            ),
            'null' => array(
                $factory->createForSite(0),
                null
            )
        );
    }



    /**
     * @dataProvider dataProviderForPrepareForSet
     * @param float $expected
     * @param mixed $input
     */
    public function testPrepareForSet($expected, $input)
    {
        $value_for_setting = $this->_field->prepare_for_set($input);
        $this->assertEquals($expected, $value_for_setting);
    }



    /**
     * @return array {
     * @type Money  $expected
     * @type string $input
     *               }
     */
    public function dataProviderForPrepareForSetFromDb()
    {
        $factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\MoneyFactory'
        );
        return array(
            'basic'           => array(
                $factory->createForSite(1.23),
                '1.23'
            ),
            'extra_precision' => array(
                $factory->createForSite(1.321),
                '1.321',
            ),
            //@todo: I don't think this is right
            'way_more_precision_than_we_can_handle' => array(
                $factory->createForSite(1.23456789123456789),
                '1.23456789123456789'
            )
        );
    }



    /**
     * @dataProvider dataProviderForPrepareForSetFromDb
     * @param float $expected
     * @param mixed $input
     */
    public function testPrepareForSetFromDb($expected, $input)
    {
        $value_for_setting = $this->_field->prepare_for_set_from_db($input);
        $this->assertEquals($expected, $value_for_setting);
    }


    /**
     * @return array {
     * @type Money  $expected
     * @type string $input
     *               }
     */
    public function dataProviderForPrepareForUseInDb()
    {
        $factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\MoneyFactory'
        );
        return array(
            'money'           => array(
                1.23,
                $factory->createForSite(1.23),
            ),
            'int' => array(
                23,
                23
            ),
            'string' => array(
                43.23,
                '43.23'
            ),
            'float' => array(
                1.23,
                1.23
            )
        );
    }



    /**
     * @dataProvider dataProviderForPrepareForUseInDb
     * @param float $expected
     * @param mixed $input
     */
    public function testPrepareForUseInDb($expected, $input)
    {
        $value_for_setting = $this->_field->prepare_for_use_in_db($input);
        $this->assertEquals($expected, $value_for_setting);
    }



    /**
     * @return array {
     * @type Money  $expected
     * @type string $input
     * @type string|int $scheme
     * @type boolean $add_filter
     *               }
     */
    public function dataProviderForPrettyEchoing()
    {
        $factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\currency\MoneyFactory'
        );
        return array(
            'legacy_basic'           => array(
                '$1,234.56 <span class="currency-code">(USD)</span>',
                1234.56,
                null,
                true
            ),
            'new_basic'  => array(
                '$1,234.56 <span class="currency-code">(USD)</span>',
                1234.56,
                null,
                false
            ),
            'legacy_localized_float'=> array(
                '1,234.56',
                1234.56,
                'localized_float',
                true
            ),
            'new_localized_float'=> array(
                '1,234.56',
                1234.56,
                'localized_float',
                false
            ),
            'legacy_no_currency_code'=>array(
                '$1,234.56',
                1234.56,
                'no_currency_code',
                true
            ),
            'new_no_currency_code'=>array(
                '$1,234.56',
                1234.56,
                'no_currency_code',
                false
            ),
            'new_other_formatting_option'=>array(
                '1234.56',
                1234.56,
                MoneyFormatter::DECIMAL_ONLY,
                false
            )
        );
    }



    /**
     * @dataProvider dataProviderForPrettyEchoing
     * @param float $expected
     * @param mixed $input
     * @param mixed $scheme
     * @param boolean $add_a_filter
     */
    public function testPrepareForPrettyEchoing($expected, $input, $scheme, $add_a_filter)
    {
        if ($add_a_filter) {
            add_filter('FHEE__EEH_Template__format_currency__raw_amount',array($this,'do_nothing'));
        }
        $value_for_setting = $this->_field->prepare_for_pretty_echoing($input, $scheme);
        $this->assertEquals($expected, $value_for_setting);
    }



    /**
     * Callback that does nothing, used in testPrepareForPrettyEchoing
     * @param mixed $input
     * @return mixed
     */
    public function do_nothing($input)
    {
        return $input;
    }
}