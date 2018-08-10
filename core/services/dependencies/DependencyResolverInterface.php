<?php

namespace EventEspresso\core\services\dependencies;

/**
 * Interface DependencyResolverInterface
 * Multiple classes that share the same common dependencies can have their dependencies
 * automatically resolved using a DependencyResolver and do not need to be registered by calling
 * EE_Dependency_Map::registerDependencies() or manually adding an entry in the dependency map.
 * Classes with more complex or unique dependencies should register them normally.
 *
 * @package EventEspresso\core\services\factory
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface DependencyResolverInterface
{
    /**
     * Used to configure and/or setup any aliases or recursions required by the DependencyResolver
     *
     * @since $VID:$
     */
    public function initialize();

    /**
     * @param string $fqcn Fully Qualified Class Name
     * @since $VID:$
     */
    public function resolveDependenciesForClass($fqcn);
}
