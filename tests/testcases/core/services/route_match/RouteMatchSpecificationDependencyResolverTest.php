<?php

namespace EventEspresso\tests\testcases\core\services\route_match;

use EE_Dependency_Map;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\route_match\RouteMatchSpecificationDependencyResolver;
use PHPUnit_Framework_TestCase;
use ReflectionClass;

/**
 * Class RouteMatchSpecificationDependencyResolverTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationDependencyResolverTest extends PHPUnit_Framework_TestCase
{

    /**
     * @var EE_Dependency_Map $dependency_map
     */
    protected $dependency_map;

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    protected function setUp()
    {
        $this->loader = LoaderFactory::getLoader();
        $this->dependency_map = $this->loader->getShared('EE_Dependency_Map');
        $class = new ReflectionClass($this->dependency_map);
        $property = $class->getProperty('_dependency_map');
        $property->setAccessible(true);
        $registered_dependencies = $property->getValue($this->dependency_map);
        $fqcn = 'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit';
        unset($registered_dependencies[ $fqcn ]);
        $property->setValue($this->dependency_map, $registered_dependencies);
        $this->assertFalse($this->dependency_map->has($fqcn));
    }

    /**
     * @since 4.9.71.p
     * @return RouteMatchSpecificationDependencyResolver
     */
    public function getDependencyResolver()
    {
        return new RouteMatchSpecificationDependencyResolver(
            $this->loader->getShared('EventEspresso\core\services\container\Mirror'),
            $this->loader->getShared('EventEspresso\core\services\loaders\ClassInterfaceCache'),
            $this->dependency_map
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \ReflectionException
     */
    public function testResolveDependenciesForClass()
    {
        $fqcn = 'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit';
        $this->assertFalse($this->dependency_map->has($fqcn));
        $DependencyResolver = $this->getDependencyResolver();
        $DependencyResolver->resolveDependenciesForClass($fqcn);
        $this->assertTrue($this->dependency_map->has($fqcn));
    }
}

// location: /tests/testcases/core/services/route_match/RouteMatchSpecificationDependencyResolverTest.php