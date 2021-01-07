<?php

namespace EventEspresso\tests\testcases\core\domain;

use DomainException;
use EE_UnitTestCase;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\tests\mocks\core\domain\DomainFactoryMock;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class DomainFactoryTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain
 * @author  Brent Christensen
 * @since   4.9.51
 * @group   Domain
 */
class DomainFactoryTest extends EE_UnitTestCase
{
    public function setUp()
    {
        parent::setUp();
        DomainFactoryMock::reset();
    }


    public function test_getShared()
    {
        // $file_path = EE_TESTS_DIR . 'mocks/core/domain/DomainMock.php';
        $file_path   = EE_TESTS_DIR . 'mocks/core';
        $version     = '1.2.3.p';
        $domain_mock = DomainFactoryMock::getShared(
            new FullyQualifiedName('EventEspresso\tests\mocks\core\domain\DomainMock'),
            [ $file_path, $version ]
        );
        $this->assertInstanceOf('EventEspresso\tests\mocks\core\domain\DomainMock', $domain_mock);
        $this->assertInstanceOf('EventEspresso\core\domain\DomainBase', $domain_mock);
        $this->assertEquals($file_path, $domain_mock->pluginFile());
        $this->assertEquals(plugin_basename($file_path), $domain_mock->pluginBasename());
        $this->assertEquals(plugin_dir_path($file_path), $domain_mock->pluginPath());
        $this->assertEquals(plugin_dir_url($file_path), $domain_mock->pluginUrl());
        $this->assertEquals(plugin_dir_url($file_path), $domain_mock->pluginUrl());
        $this->assertEquals($version, $domain_mock->version());
        $this->assertEquals('Oh Yeah', $domain_mock->returnOhYeah());
    }


    public function test_constructor_with_invalid_arguments()
    {
        $this->setExceptionExpected('InvalidArgumentException');
        DomainFactoryMock::getShared(
            new FullyQualifiedName(
                'EventEspresso\tests\mocks\core\domain\DomainMock'
            ),
            []
        );
    }


    public function test_constructor_with_invalid_arguments_2()
    {
        $this->setExceptionExpected('InvalidArgumentException');
        DomainFactoryMock::getShared(
            new FullyQualifiedName(
                'EventEspresso\tests\mocks\core\domain\DomainMock'
            ),
            [EE_TESTS_DIR . 'mocks/core/domain/DomainMock.php']
        );
    }


    public function test_constructor_with_invalid_arguments_3()
    {
        $this->setExceptionExpected(DomainException::class);
        DomainFactoryMock::getShared(
            new FullyQualifiedName(
                'EventEspresso\core\domain\values\FilePath'
            ),
            array(
                EE_TESTS_DIR . 'mocks/core/domain/DomainMock.php',
                '1.2.3.p'
            )
        );
    }

}
// Location: /tests/testcases/core/domain/DomainFactoryTest.php
