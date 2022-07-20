<?php

namespace EventEspresso\tests\testcases\core\services\route_match;

use EE_Dependency_Map;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\route_match\RouteMatchSpecificationDependencyResolver;
use InvalidArgumentException;
use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\TestCase;
use ReflectionClass;
use ReflectionException;

/**
 * Class RouteMatchSpecificationDependencyResolverTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationDependencyResolverTest extends TestCase
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
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws AssertionFailedError
     */
    protected function setUp(): void
    {
        parent::setUp();
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
    public function getDependencyResolver(): RouteMatchSpecificationDependencyResolver
    {
        return new RouteMatchSpecificationDependencyResolver(
            $this->loader->getShared('EventEspresso\core\services\container\Mirror'),
            $this->loader->getShared('EventEspresso\core\services\loaders\ClassInterfaceCache'),
            $this->dependency_map
        );
    }

    /**
     * @since 4.9.71.p
     * @throws InvalidDataTypeException
     * @throws AssertionFailedError
     * @throws ReflectionException
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
