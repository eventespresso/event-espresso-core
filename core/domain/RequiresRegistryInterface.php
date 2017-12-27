<?php

namespace EventEspresso\core\domain;

use EE_Registry;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface requiresRegistry
 * Indicates a class that utilizes the EE_Registry class and provides a setter for injecting it
 *
 * @package EventEspresso\core\domain
 * @author  Brent Christensen
 * @since   4.9.50
 */
interface RequiresRegistryInterface
{

    /**
     * @param EE_Registry $registry
     */
    public function setRegistry($registry);

}
// Location: requiresRegistry.php
