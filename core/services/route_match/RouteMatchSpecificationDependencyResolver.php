<?php

namespace EventEspresso\core\services\route_match;

use EE_Dependency_Map;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\container\Mirror;
use EventEspresso\core\services\loaders\ClassInterfaceCache;
use ReflectionException;


/**
 * Class RouteMatchSpecificationDependencyResolver
 * RouteMatchSpecification classes that only have dependencies for the RequestInterface
 * or other RouteMatchSpecification classes can have their dependencies automatically resolved
 * and do not need to be registered by calling EE_Dependency_Map::registerDependencies()
 * or manually adding an entry in the dependency map.
 * RouteMatchSpecification classes with more complex dependencies
 * will still have to register their dependencies normally.
 *
 * @package EventEspresso\core\services\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RouteMatchSpecificationDependencyResolver
{

    /**
     * @var Mirror $mirror
     */
    private $mirror;

    /**
     * @var ClassInterfaceCache $class_cache
     */
    private $class_cache;

    /**
     * @var EE_Dependency_Map $dependency_map
     */
    private $dependency_map;


    /**
     * RouteMatchSpecificationDependencyResolver constructor.
     *
     * @param Mirror                            $mirror
     * @param ClassInterfaceCache               $class_cache
     * @param EE_Dependency_Map                 $dependency_map
     */
    public function __construct(
        Mirror $mirror,
        ClassInterfaceCache $class_cache,
        EE_Dependency_Map $dependency_map
    ) {
        $this->mirror = $mirror;
        $this->class_cache = $class_cache;
        $this->dependency_map = $dependency_map;
    }


    /**
     * @param string $FQCN Fully Qualified Class Name
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveDependenciesForSpecification($FQCN)
    {
        $dependencies = array();
        $params = $this->mirror->getParameters($FQCN);
        foreach ($params as $index => $param) {
            // is this a dependency for a specific class ?
            $param_class = $this->mirror->getParameterClassName($param, $FQCN, $index);
            if (strpos($param_class, 'EventEspresso\core\domain\entities\route_match\specifications') !== false) {
                $this->resolveDependenciesForSpecification($param_class);
            }
            $param_class = $param_class === 'EventEspresso\core\services\request\RequestInterface'
                ? $this->class_cache->getFqnForAlias($param_class)
                : $param_class;

            $dependencies[ $param_class ] = EE_Dependency_Map::load_from_cache;
        }
        $this->dependency_map->registerDependencies($FQCN, $dependencies);
    }
}
