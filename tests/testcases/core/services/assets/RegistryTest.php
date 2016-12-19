<?php

use EventEspresso\tests\mocks\core\services\assets\RegistryMock;

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
     * @var RegistryMock
     */
    protected $registry;

    public function setUp()
    {
        $this->registry = new RegistryMock();
        parent::setUp();
    }


    public function tearDown()
    {
        parent::tearDown();
        $this->registry = null;
    }


    public function test_addData_no_previous_scalar()
    {
        $this->registry->addData(__METHOD__, 'test', 'has_data');
        $actual = $this->registry->getData(__METHOD__, 'test');
        $this->assertEquals('has_data', $actual);
    }


    public function test_addData_no_previous_array()
    {
        $this->registry->addData(__METHOD__, 'test', array('has_data'));
        $actual = $this->registry->getData(__METHOD__, 'test');
        $this->assertEquals('has_data', $actual[0]);
    }


    /**
     * @expectedException InvalidArgumentException
     */
    public function test_addData_no_overwrite_array()
    {
        $this->registry->addData(__METHOD__, 'test', array('initial_value'));
        $this->registry->addData(__METHOD__, 'test', array('another_value'));
    }


    /**
     * @expectedException InvalidArgumentException
     */
    public function test_addData_no_overwrite_scalar()
    {
        $this->registry->addData(__METHOD__, 'test', 'initial_value');
        $this->registry->addData(__METHOD__, 'test', 'cause_exception');
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


    /**
     * @group 10304
     */
    public function test_getTemplate()
    {
        $this->registry->addTemplate('test', 'some test content');
        $this->assertEquals('some test content', $this->registry->getTemplate('test'));
    }



    /**
     * @expectedException InvalidArgumentException
     */
    public function test_verifyMethod_invalid()
    {
        $this->registry->verifyMethod('bogusMethod');
    }


    public function test_verifyMethod_valid()
    {
        //basically this will just return a success if there is not exception thrown
        try {
            $this->registry->verifyMethod(__METHOD__);
        } catch (\Exception $e) {
            $this->fail('This should not throw an exception.');
        }
    }


    public function test_methodNameToJsFriendlyString()
    {
        $expected = 'RegistryTest__test_methodNameToJsFriendlyString';
        $this->assertEquals($expected, $this->registry->methodNameToJsFriendlyString(__METHOD__));

        //namespaced method test
        $expected = 'EventEspresso_core_services_assets_RegistryMock__test_method';
        $this->assertEquals(
            $expected,
            $this->registry->methodNameToJsFriendlyString('EventEspresso\core\services\assets\RegistryMock::test_method')
        );

        //function test
        $expected = 'some_function_name';
        $this->assertEquals($expected, $this->registry->methodNameToJsFriendlyString($expected));
    }
}