<?php

use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\services\assets\AssetCollection;
use EventEspresso\core\services\assets\I18nRegistry;
use EventEspresso\core\services\assets\Registry;

/**
 * Runs tests on the Registry class.
 *
 * @package    EventEspresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.24.rc.004
 * @group 10306
 */
class RegistryTest extends EE_UnitTestCase
{

    /**
     * @var Registry
     */
    protected $registry;


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidClassException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidFilePathException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function setUp()
    {
        add_filter('FHEE__EventEspresso_core_services_assets_Registry__debug', '__return_true');
        $domain = DomainFactory::getShared(
            new FullyQualifiedName(
                'EventEspresso\core\domain\Domain'
            ),
            array(
                new FilePath(EVENT_ESPRESSO_MAIN_FILE),
                Version::fromString(espresso_version())
            )
        );
        $this->registry = new Registry(
            new AssetCollection(),
            new i18nRegistry($domain)
        );
        parent::setUp();
    }


    public function tearDown()
    {
        parent::tearDown();
        $this->registry = null;
    }


    /**
     * @throws InvalidArgumentException
     */
    public function test_addData_no_previous_scalar()
    {
        $this->registry->addData('test', 'has_data');
        $actual = $this->registry->getData('test');
        $this->assertEquals('has_data', $actual);
    }


    /**
     * @throws InvalidArgumentException
     */
    public function test_addData_no_previous_array()
    {
        $this->registry->addData('test', array('has_data'));
        $actual = $this->registry->getData('test');
        $this->assertEquals('has_data', $actual[0]);
    }


    /**
     * @expectedException InvalidArgumentException
     */
    public function test_addData_no_overwrite_array()
    {
        $this->registry->addData('test', array('initial_value'));
        $this->registry->addData('test', array('another_value'));
    }


    /**
     * @expectedException InvalidArgumentException
     */
    public function test_addData_no_overwrite_scalar()
    {
        $this->registry->addData('test', 'initial_value');
        $this->registry->addData('test', 'cause_exception');
    }

	/**
     * @expectedException InvalidArgumentException
     * @group 10304
     */
    public function test_addTemplate_no_overwrite()
    {
        $this->registry->addTemplate('test', 'some_test_content');
        $this->registry->addTemplate('test', 'cause exception');
    }


    public function pushDataWithArrayProvider()
    {
        return [
            'initial creation of dataset when it does not exist' => ['test', 'foo', ['foo']],
            'adding a string to existing dataset'                => ['test', 'bar', ['foo', 'bar']],
            'adding an array to existing dataset'                => [
                'test',
                ['howdy', 'there'],
                ['foo', 'bar', 'howdy', 'there'],
            ],
        ];
    }


    /**
     * @throws InvalidArgumentException
     */
    public function testPushDataWithArrayAddingData()
    {
        foreach ($this->pushDataWithArrayProvider() as $test_description => $test_data) {
            list($key, $value, $expected) = $test_data;
            $this->registry->pushData($key, $value);
            $this->assertEquals($expected, $this->registry->getData($key), $test_description);
        }
    }


    /**
     * @expectedException InvalidArgumentException
     */
    public function testPushDataExceptionWhenExistingDataIsScalar()
    {
        $this->registry->addData( 'test', 'foo' );
        $this->registry->pushData( 'test', 'bar' );
    }


    public function pushDataWithAssociativeArrayProvider()
    {
        return [
            'initial creation of dataset'           => ['test', ['a' => 'foo'], ['a' => 'foo']],
            'adding new item with different key'    => ['test', ['b' => 'bar'], ['a' => 'foo', 'b' => 'bar']],
            'adding new item with pre-existing key' => ['test', ['a' => 'bar'], ['a' => 'bar', 'b' => 'bar']],
            'adding scalar array'                   => ['test', 'hello', ['a' => 'bar', 'b' => 'bar', 'hello']],
        ];
    }


    public function testPushDataWithAssociativeArray()
    {
        foreach ($this->pushDataWithAssociativeArrayProvider() as $test_description => $test_data) {
            list($key, $value, $expected) = $test_data;
            $this->registry->pushData($key, $value);
            $this->assertEquals($expected, $this->registry->getData($key), $test_description);
        }
    }


    /**
     * @group 10304
     * @throws InvalidArgumentException
     */
    public function test_getTemplate()
    {
        $this->registry->addTemplate('test', 'some test content');
        $this->assertEquals('some test content', $this->registry->getTemplate('test'));
    }
}
// location: tests/testcases/core/services/assets/RegistryTest.php
