<?php

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

    public function setUp()
    {
        $this->registry = new Registry();
        parent::setUp();
    }


    public function tearDown()
    {
        parent::tearDown();
        $this->registry = null;
    }

    public function test_addData_no_previous()
    {
        $this->registry->addData('test', 'has_data');
        $expected = $this->registry->getData('test');
        $this->assertEquals('has_data', $expected);
    }


    public function test_addData_merged()
    {
        $this->registry->addData('test', array('initial_value'));
        $this->registry->addData('test', array('another_value'));
        $expected = $this->registry->getData('test');
        $this->assertArrayContains('another_value', $expected);
        $this->assertArrayContains('initial_value', $expected);

        //add a scalar value that will get merged into the array
        $this->registry->addData('test', 'scalar_value');
        $expected = $this->registry->getData('test');
        $this->assertArrayContains('scalar_value', $expected);
    }


    /**
     * @expectedException InvalidArgumentException
     */
    public function test_addData_no_overwrite_allowed()
    {
        $this->registry->addData('test', 'initial_value');
        $this->registry->addData('test', 'cause_exception');
    }
}