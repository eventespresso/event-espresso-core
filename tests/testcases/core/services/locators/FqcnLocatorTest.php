<?php

namespace EventEspresso\tests\testcases\core\services\locators;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\locators\FqcnLocator;
use PHPUnit\Framework\TestCase;

/**
 * FqcnLocatorTest
 *
 * @author  Brent Christensen
 * @since   $VID:$
 * @group   locators
 */
class FqcnLocatorTest extends TestCase
{

    /**
     * @var \EventEspresso\core\services\locators\FqcnLocator $file_locator
     */
    private $file_locator;

    /**
     * @var string $test_dir
     */
    private $test_fqcn = 'EventEspresso\tests\mocks\core\services\locator\test_dir';


    /**
     * @since $VID:$
     * @throws InvalidDataTypeException
     */
    public function setUp()
    {
        parent::setUp();
        $this->file_locator = new FqcnLocator();
    }


    public function tearDown()
    {
        parent::tearDown();
        unset($this->file_locator);
    }


    private function getExpectedFQCNs()
    {
        $FQCNs = array(
            '\EventEspresso\tests\mocks\core\services\locator\test_dir\TestClassA',
            '\EventEspresso\tests\mocks\core\services\locator\test_dir\TestClassB',
        );
        return sort($FQCNs);
    }


    public function testLocate()
    {
        $FQCNs = $this->file_locator->locate($this->test_fqcn);
        $this->assertEquals($this->getExpectedFQCNs(), sort($FQCNs));
    }


    public function testCount()
    {
        $this->file_locator->locate($this->test_fqcn);
        $this->assertCount(2, $this->file_locator);
    }


    public function testGetFQCNs()
    {
        $this->file_locator->locate($this->test_fqcn);
        $FQCNs = $this->file_locator->getFQCNs();
        $this->assertEquals($this->getExpectedFQCNs(), sort($FQCNs));
    }
}

// Location: tests/testcases/core/services/locators/FqcnLocatorTest.php
