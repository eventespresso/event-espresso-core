<?php
namespace EventEspresso\core\domain\services\capabilities;

/**
 * Interface RequiresCapCheckInterface
 * this interface is used to identify classes that
 * require a permissions check before they can be executed.
 *
 * @package EventEspresso\core\domain\services\capabilities
 */
interface RequiresCapCheckInterface
{

    /**
     * @return CapCheckInterface
     */
    public function getCapCheck();
}
