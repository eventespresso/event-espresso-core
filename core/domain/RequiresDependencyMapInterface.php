<?php

namespace EventEspresso\core\domain;

use EE_Dependency_Map;

/**
 * Interface RequiresDependencyMap
 * Indicates a class that utilizes the EE_Dependency_Map class
 * and provides a getter plus a setter for injecting it
 *
 * @package EventEspresso\core\domain
 * @author  Brent Christensen
 * @since   4.9.50
 */
interface RequiresDependencyMapInterface
{

    /**
     * @param EE_Dependency_Map $dependency_map
     */
    public function setDependencyMap($dependency_map);

    /**
     * @return EE_Dependency_Map
     */
    public function dependencyMap();
}
