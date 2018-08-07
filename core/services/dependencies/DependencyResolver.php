<?php

namespace EventEspresso\core\services\dependencies;

use EE_Dependency_Map;
use EventEspresso\core\exceptions\InvalidAliasException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\container\Mirror;
use EventEspresso\core\services\loaders\ClassInterfaceCache;
use ReflectionException;

/**
 * Class DependencyResolver
 * Multiple classes that share the same common dependencies can have their dependencies
 * automatically resolved using a DependencyResolver, and do not need to be registered by calling
 * EE_Dependency_Map::registerDependencies() or manually adding an entry in the dependency map.
 * Classes with more complex or unique dependencies should register them normally.
 *
 * @package EventEspresso\core\services\container
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class DependencyResolver implements DependencyResolverInterface
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
     * @var ClassAlias[] $aliases
     */
    private $aliases = array();

    /**
     * @var array $recursions
     */
    private $recursions = array();


    /**
     * RouteMatchSpecificationDependencyResolver constructor.
     *
     * @param Mirror              $mirror
     * @param ClassInterfaceCache $class_cache
     * @param EE_Dependency_Map   $dependency_map
     */
    public function __construct(
        Mirror $mirror,
        ClassInterfaceCache $class_cache,
        EE_Dependency_Map $dependency_map
    )
    {
        $this->mirror = $mirror;
        $this->class_cache = $class_cache;
        $this->dependency_map = $dependency_map;
        $this->initialize();
    }

    /**
     * @return Mirror
     */
    public function mirror()
    {
        return $this->mirror;
    }

    /**
     * @return ClassInterfaceCache
     */
    public function classCache()
    {
        return $this->class_cache;
    }

    /**
     * @return EE_Dependency_Map
     */
    public function dependencyMap()
    {
        return $this->dependency_map;
    }

    /**
     * @param ClassAlias $alias
     * @throws InvalidAliasException
     */
    public function addAlias(ClassAlias $alias)
    {
        $this->aliases[ $alias->fqcn() ] = $alias;
    }

    /**
     * @param string $param_fqcn Fully Qualified Class Name for dependency parameter
     * @return string
     */
    public function resolveAlias($param_fqcn)
    {
        return isset($this->aliases[ $param_fqcn ])
            ? $this->aliases[ $param_fqcn ]->alias()
            : $this->classCache()->getFqnForAlias($param_fqcn);
    }

    /**
     * Primarily used to indicate the base namespace for composite objects
     * so that dependencies requiring the same DependencyResolver can be acquired
     * for example:
     * Vendor\path\to\class\A, Vendor\path\to\class\B, and Vendor\path\to\class\C
     * may all implement Vendor\path\to\Interface,
     * but Vendor\path\to\class\C could be a composite object
     * that requires Vendor\path\to\class\A and Vendor\path\to\class\B,
     * and needs both of those dependencies resolved, which would therefore require
     * the use of the same DependencyResolver.
     *
     * By specifying a base namespace  of "Vendor\path\to\",
     * then all classes that are descendants of that namespace
     * will use DependencyResolver to acquire the classes they need
     *
     * @param string $base_namespace Partial namespace used for detecting other classes
     *                               that should employ this same DependencyResolver
     */
    public function addRecursion($base_namespace)
    {
        $this->recursions[] = $base_namespace;
    }

    /**
     * Returns true if the parameter FQCN belongs to one of
     * the namespaces that utilizes this DependencyResolver
     *
     * @param string $param_fqcn Fully Qualified Class Name for dependency parameter
     * @return boolean
     * @since $VID:$
     */
    public function dependencyRecursionExists($param_fqcn)
    {
        foreach ($this->recursions as $recursion) {
            if (strpos($param_fqcn, $recursion) !== false) {
                return true;
            }
        }
        return false;
    }


    /**
     * @param string $fqcn Fully Qualified Class Name
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveDependenciesForClass($fqcn)
    {
        $dependencies = array();
        $params = $this->mirror()->getParameters($fqcn);
        foreach ($params as $index => $param) {
            // is this a dependency for a specific class ?
            $param_class = $this->mirror()->getParameterClassName($param, $fqcn, $index);
            if ($this->dependencyRecursionExists($param_class)) {
                $this->resolveDependenciesForClass($param_class);
            }
            $param_class = $this->resolveAlias($param_class);
            $dependencies[ $param_class ] = EE_Dependency_Map::load_from_cache;
        }
        $this->dependencyMap()->registerDependencies($fqcn, $dependencies);
    }
}
