<?php

namespace EventEspresso\core\services\commands;

use EventEspresso\core\domain\services\capabilities\CapCheck;

/**
 * Interface CommandRequiresCapCheckInterface
 * this interface is used to identify Command classes
 * that require a permissions check before they can be executed.
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandRequiresCapCheckInterface
{
    /**
     * @return CapCheck
     */
    public function getCapCheck();
}
