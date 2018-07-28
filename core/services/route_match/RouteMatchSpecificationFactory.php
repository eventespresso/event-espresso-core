<?php

namespace EventEspresso\core\services\route_match;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\FactoryInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class RouteMatchSpecificationFactory
 * Factory for generating RouteMatchSpecification classes.
 * Will automatically resolve dependencies using the
 * RouteMatchSpecificationDependencyResolver
 *
 * @package EventEspresso\core\services\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RouteMatchSpecificationFactory implements FactoryInterface
{

    /**
     * @var RouteMatchSpecificationDependencyResolver $dependency_resolver
     */
    private $dependency_resolver;

    /**
     * @var LoaderInterface $loader
     */
    private $loader;


    /**
     * RouteMatchSpecificationFactory constructor
     *
     * @param RouteMatchSpecificationDependencyResolver $dependency_resolver
     * @param LoaderInterface                           $loader
     */
    public function __construct(RouteMatchSpecificationDependencyResolver $dependency_resolver, LoaderInterface $loader)
    {
        $this->dependency_resolver = $dependency_resolver;
        $this->loader = $loader;
    }


    /**
     * @param $fqcn
     * @return RouteMatchSpecification
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function createNewRouteMatchSpecification($fqcn)
    {
        $this->dependency_resolver->resolveDependenciesForSpecification($fqcn);
        return $this->loader->getShared($fqcn);
    }


    /**
     * @param $fqcn
     * @return RouteMatchSpecification
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public static function create($fqcn)
    {
        /** @var RouteMatchSpecificationFactory $specification_factory */
        $specification_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\route_match\RouteMatchSpecificationFactory'
        );
        return $specification_factory->createNewRouteMatchSpecification($fqcn);
    }
}
