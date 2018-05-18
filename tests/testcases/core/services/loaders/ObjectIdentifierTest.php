<?php

namespace EventEspresso\tests\testcases\core\services\loaders;

use EE_UnitTestCase;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\ObjectIdentifier;
use stdClass;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ObjectIdentifierTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\loaders
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class ObjectIdentifierTest extends EE_UnitTestCase
{

    /**
     * @var ObjectIdentifier
     */
    private $object_identifier;


    /**
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    public function setUp()
    {
        parent::setUp();
        $this->object_identifier = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\loaders\ObjectIdentifier'
        );
    }


    /**
     * dataProvider for testGetIdentifier()
     * @return array[]
     */
    public function getIdentifierProvider()
    {
        $object1 = new stdClass();
        $object1->prop1 = 1234;
        $object1->prop2 = 'mom\'s spaghetti';
        $object1hash = spl_object_hash($object1);
        return array(
            // $fqcn, $arguments, $expected
            0 => array(
                'fully/qualified/class/name/DoesNotNeedToBeReal',
                array(),
                'fully/qualified/class/name/DoesNotNeedToBeReal',
            ),
            1 => array(
                'fully/qualified/class/name/DoesNotNeedToBeReal',
                array(1, 2, 3, 4),
                'fully/qualified/class/name/DoesNotNeedToBeReal' . ObjectIdentifier::DELIMITER . md5('1234'),
            ),
            2 => array(
                'fully/qualified/class/name/DoesNotNeedToBeReal',
                array($object1),
                'fully/qualified/class/name/DoesNotNeedToBeReal' . ObjectIdentifier::DELIMITER . md5($object1hash),
            ),
            3 => array(
                'fully/qualified/class/name/DoesNotNeedToBeReal',
                array(1, 2, 3, 4, $object1),
                'fully/qualified/class/name/DoesNotNeedToBeReal'
                . ObjectIdentifier::DELIMITER . md5('1234' . $object1hash),
            ),
            // test class that implements EventEspresso\core\interfaces\ReservedInstanceInterface
            4 => array(
                'EventEspresso\core\services\request\Request',
                array(array(1, 2, 3, 4), array(), array(), array()),
                'EventEspresso\core\services\request\Request',
            ),
        );
    }


    /**
     * @dataProvider getIdentifierProvider
     * @param string $fqcn
     * @param array  $arguments
     * @param string $expected
     */
    public function testGetIdentifier($fqcn, array $arguments, $expected)
    {
        $this->assertEquals(
            $expected,
            $this->object_identifier->getIdentifier($fqcn,$arguments)
        );
    }


    /**
     * dataProvider for testHasArguments()
     *
     * @return array[]
     */
    public function hasArgumentsProvider()
    {
        return array(
            array('fully/qualified/class/Name', false),
            array('fully/qualified/class/Name' . ObjectIdentifier::DELIMITER . md5('1234'), true),
        );
    }


    /**
     * @dataProvider hasArgumentsProvider
     * @param string $object_identifier
     * @param bool   $has_arguments
     */
    public function testHasArguments($object_identifier, $has_arguments)
    {
        $this->assertEquals(
            $has_arguments,
            $this->object_identifier->hasArguments($object_identifier)
        );
    }

    /**
     * dataProvider for testFqcnMatchesObjectIdentifier()
     *
     * @return array[]
     */
    public function fqcnMatchesObjectIdentifierProvider()
    {
        return array(
            array('fully/qualified/class/Name', 'fully/qualified/class/Name', true),
            array('fully/qualified/class/Name', 'fully/qualified/class/Name' . ObjectIdentifier::DELIMITER . md5('1234'), true),
            array('fully/qualified/class/Name', 'fully/qualified/class/OtherName', false),
            array('fully/qualified/class/Name', 'fully/qualified/class/OtherName' . ObjectIdentifier::DELIMITER . md5('1234'), false),
        );
    }


    /**
     * @dataProvider fqcnMatchesObjectIdentifierProvider
     * @param string $fqcn
     * @param string $object_identifier
     * @param bool $matches
     */
    public function testFqcnMatchesObjectIdentifier($fqcn, $object_identifier, $matches)
    {
        $this->assertEquals(
            $matches,
            $this->object_identifier->fqcnMatchesObjectIdentifier(
                $fqcn,
                $object_identifier
            )
        );
    }
}
// location: tests/testcases/core/services/loaders/ObjectIdentifierTest.php