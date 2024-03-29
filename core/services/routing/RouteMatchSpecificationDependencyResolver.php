<?php

namespace EventEspresso\core\services\routing;

use EventEspresso\core\exceptions\InvalidAliasException;
use EventEspresso\core\services\dependencies\ClassAlias;
use EventEspresso\core\services\dependencies\DependencyResolver;

/**
 * Class RouteMatchSpecificationDependencyResolver
 * RouteMatchSpecification classes that only have dependencies for the RequestInterface
 * or other RouteMatchSpecification classes can have their dependencies automatically resolved
 * and do not need to be registered by calling EE_Dependency_Map::registerDependencies()
 * or manually adding an entry in the dependency map.
 * RouteMatchSpecification classes with more complex dependencies
 * will still have to register their dependencies normally.
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationDependencyResolver extends DependencyResolver
{
    /**
     * Used to configure and/or setup any aliases or namespace roots required by the DependencyResolver
     *
     * @since 4.9.71.p
     * @throws InvalidAliasException
     */
    public function initialize()
    {
        $this->addAlias(
            'EventEspresso\core\services\request\Request',
            'EventEspresso\core\services\request\RequestInterface'
        );
        $this->addNamespaceRoot('EventEspresso\core\domain\entities\routing\specifications');
    }
}
