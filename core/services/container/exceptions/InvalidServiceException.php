<?php
namespace EventEspresso\core\services\container\exceptions;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class InvalidServiceException
 * thrown when attempting to retrieve a service from the container, but none is returned
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidServiceException extends \UnexpectedValueException
{

    /**
     * InvalidServiceException constructor.
     *
     * @param string     $service_name the name of the requested service
     * @param string     $actual       classname of what we got
     * @param string     $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct($service_name, $actual, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    'The "%1$s" service could not be retrieved from the CoffeeShop, but "%2$s" was received.',
                    'event_espresso'
                ),
                $service_name,
                print_r($actual, true)
            );
        }
        parent::__construct($message, $code, $previous);
    }

}
// End of file InvalidServiceException.php
// Location: /InvalidServiceException.php