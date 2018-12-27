<?php
namespace EventEspresso\core\services\commands;

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
     * @return \EventEspresso\core\domain\services\capabilities\CapCheck
     */
    public function getCapCheck();
}
