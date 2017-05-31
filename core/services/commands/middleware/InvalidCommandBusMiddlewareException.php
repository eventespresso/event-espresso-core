<?php
namespace EventEspresso\core\services\commands\middleware;

use EventEspresso\core\exceptions\InvalidDataTypeException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class InvalidCommandBusMiddlewareException
 *
 * thrown when an invalid object is encountered when processing CommandBus middleware
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 *
 */
class InvalidCommandBusMiddlewareException extends InvalidDataTypeException
{


    /**
     * @access public
     * @param  mixed     $command_bus_middleware_object
     * @param  string    $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct($command_bus_middleware_object, $message = '', $code = 0, \Exception $previous = null)
    {
        $command_bus_middleware = is_object($command_bus_middleware_object)
            ? get_class($command_bus_middleware_object)
            : gettype($command_bus_middleware_object);

        if (empty($message)) {
            $message = sprintf(
                __('The supplied Command Bus Middleware "%1$s" does not have a valid name. It should be in the following format: "{CommandName}Handler" ',
                    'event_espresso'),
                $command_bus_middleware
            );
        }
        parent::__construct(
            '$command_bus_middleware',
            $command_bus_middleware,
            'CommandBusMiddlewareInterface',
            $message,
            $code,
            $previous
        );
    }


}
// End of file InvalidCommandBusMiddlewareException.php
// Location: /InvalidCommandBusMiddlewareException.php