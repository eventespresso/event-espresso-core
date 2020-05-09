<?php

namespace EventEspresso\tests\testcases\core\services\route_match;

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\route_match\RouteMatchSpecificationFactory;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;

/**
 * Class RouteMatchSpecificationFactoryTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationFactoryTest extends EspressoPHPUnitFrameworkTestCase
{

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    protected function setUp()
    {
        $this->loader = LoaderFactory::getLoader();
    }

    /**
     * @since 4.9.71.p
     * @return RouteMatchSpecificationFactory
     */
    public function getFactory()
    {
        return new RouteMatchSpecificationFactory(
            $this->loader->getShared(
                'EventEspresso\core\services\route_match\RouteMatchSpecificationDependencyResolver'
            ),
            $this->loader
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\route_match\RouteMatchSpecificationFactory',
            $this->getFactory()
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\Exception
     * @throws \ReflectionException
     */
    public function testCreateNewRouteMatchSpecification()
    {
        $fqcn = 'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit';
        $this->assertInstanceOf(
            $fqcn,
            $this->getFactory()->createNewRouteMatchSpecification($fqcn)
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     * @throws \ReflectionException
     */
    public function testCreate()
    {
        $fqcn = 'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit';
        $this->assertInstanceOf(
            $fqcn,
            RouteMatchSpecificationFactory::create($fqcn)
        );
    }
}
// location: /tests/testcases/core/services/route_match/RouteMatchSpecificationFactoryTest.php