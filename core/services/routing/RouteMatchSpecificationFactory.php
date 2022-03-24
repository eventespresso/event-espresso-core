<?php

namespace EventEspresso\core\services\routing;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\factory\FactoryWithDependencyResolver;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use InvalidArgumentException;

/**
 * Class RouteMatchSpecificationFactory
 * Factory for generating RouteMatchSpecification classes.
 * Will automatically resolve dependencies using the
 * RouteMatchSpecificationDependencyResolver
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationFactory extends FactoryWithDependencyResolver
{
    /**
     * RouteMatchSpecificationFactory constructor
     *
     * @param RouteMatchSpecificationDependencyResolver $dependency_resolver
     * @param LoaderInterface                           $loader
     */
    public function __construct(RouteMatchSpecificationDependencyResolver $dependency_resolver, LoaderInterface $loader)
    {
        parent::__construct($dependency_resolver, $loader);
    }

    /**
     * @param $fqcn
     * @return RouteMatchSpecification
     * @throws InvalidDataTypeException
     * @since 4.9.71.p
     */
    public function createNewRouteMatchSpecification($fqcn)
    {
        $this->dependencyResolver()->resolveDependenciesForClass($fqcn);
        return $this->loader()->getShared($fqcn);
    }


    /**
     * @param $fqcn
     * @return RouteMatchSpecification
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.9.71.p
     */
    public static function create($fqcn)
    {
        /** @var RouteMatchSpecificationFactory $specification_factory */
        $specification_factory = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\routing\RouteMatchSpecificationFactory'
        );
        return $specification_factory->createNewRouteMatchSpecification($fqcn);
    }
}
