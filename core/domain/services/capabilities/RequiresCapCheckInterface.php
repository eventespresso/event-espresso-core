<?php
namespace EventEspresso\core\domain\services\capabilities;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
// End of file RequiresCapCheckInterface.php
// Location: EventEspresso\core\domain\services\capabilities/RequiresCapCheckInterface.php