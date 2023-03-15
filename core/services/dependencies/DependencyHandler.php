<?php

namespace EventEspresso\core\services\dependencies;

use EE_Dependency_Map;

abstract class DependencyHandler implements DependencyHandlerInterface
{
    /**
     * @var EE_Dependency_Map $dependency_map
     */
    protected $dependency_map;


    /**
     * DependencyHandler constructor.
     *
     * @param EE_Dependency_Map $dependency_map
     */
    public function __construct(EE_Dependency_Map $dependency_map)
    {
        $this->dependency_map = $dependency_map;
    }
}
