<?php

namespace EventEspresso\core\services\factory;

use EventEspresso\core\domain\services\factories\FactoryInterface;
use EventEspresso\core\services\dependencies\DependencyResolverInterface;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * Class FactoryWithDependencyResolver
 * Parent class for factories that define a DependencyResolver
 * for automatically resolving dependencies instead of
 * manually registering them in EE_Dependency_Map
 *
 * @package EventEspresso\core\services\factory
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
abstract class FactoryWithDependencyResolver implements FactoryInterface
{
    /**
     * @var DependencyResolverInterface $dependency_resolver
     */
    private $dependency_resolver;

    /**
     * @var LoaderInterface $loader
     */
    private $loader;

    /**
     * FactoryWithDependencyResolver constructor.
     *
     * @param DependencyResolverInterface $dependency_resolver
     * @param LoaderInterface             $loader
     */
    public function __construct(DependencyResolverInterface $dependency_resolver, LoaderInterface $loader)
    {
        $this->dependency_resolver = $dependency_resolver;
        $this->loader = $loader;
    }

    /**
     * @return DependencyResolverInterface
     */
    public function dependencyResolver()
    {
        return $this->dependency_resolver;
    }

    /**
     * @return LoaderInterface
     */
    public function loader()
    {
        return $this->loader;
    }
}
