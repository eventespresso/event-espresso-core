<?php
namespace EventEspresso\core\services\container\exceptions;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class ServiceExistsException
 * thrown when a service has already been added to the container
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ServiceExistsException extends \OutOfRangeException
{


    /**
     * ServiceExistsException constructor
     *
     * @param string     $service_name the name of the requested service
     * @param string     $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct(
        $service_name,
        $message = '',
        $code = 0,
        \Exception $previous = null
    ) {
        if (empty($message)) {
            $message = sprintf(
                __('The "%1$s" service already exists in the CoffeeShop and can not be added again.', 'event_espresso'),
                $service_name
            );
        }
        parent::__construct($message, $code, $previous);
    }


}
// End of file ServiceExistsException.php
// Location: /ServiceExistsException.php