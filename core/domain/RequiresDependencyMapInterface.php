<?php

namespace EventEspresso\core\domain;

use EE_Dependency_Map;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface RequiresDependencyMap
 * Indicates a class that utilizes the EE_Dependency_Map class and provides a setter for injecting it
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

}
// Location: RequiresDependencyMap.php
