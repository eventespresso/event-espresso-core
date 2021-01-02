<?php

namespace EventEspresso\tests\testcases\core\domain\values;

use EE_UnitTestCase;
use EventEspresso\core\domain\values\FullyQualifiedName;
use stdClass;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class FullyQualifiedNameTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.51
 * @group   ValueObjects
 * @group   FullyQualifiedName
 */
class FullyQualifiedNameTest extends EE_UnitTestCase
{

    public function test_constructor()
    {
        $fqcn = new FullyQualifiedName(__CLASS__);
        $this->assertInstanceOf('EventEspresso\core\domain\values\FullyQualifiedName', $fqcn);
    }

    public function test_constructor_with_invalid_data_type()
    {
        $this->setExceptionExpected('TypeError');
        new FullyQualifiedName(new stdClass());
    }


    public function test_constructor_with_invalid_class_name()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidClassException');
        new FullyQualifiedName('EventExpresso\tests\testcases\core\domain\values\FullyQualifiedNameTest');
    }


    public function test_constructor_with_invalid_interface()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidInterfaceException');
        new FullyQualifiedName('EventEspresso\tests\testcases\core\domain\values\FullyQualifiedNameInterface');
    }


    public function test_toString()
    {
        $fqcn = new FullyQualifiedName(__CLASS__);
        $this->assertEquals(__CLASS__, (string) $fqcn);
        $this->assertEquals(
            'This test is part of the EventEspresso\tests\testcases\core\domain\values\FullyQualifiedNameTest class',
            "This test is part of the {$fqcn} class"
        );
    }

}
// Location: FullyQualifiedNameTest.php
