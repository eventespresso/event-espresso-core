<?php

namespace EventEspresso\core\services\container\exceptions;

/**
 * Class ServiceNotFoundException
 * thrown when no entry was found in the container
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class ServiceNotFoundException extends \RuntimeException
{

    /**
     * ServiceNotFoundException constructor
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
                __('The requested service "%1$s" could not found be found in the CoffeeShop.', 'event_espresso'),
                $service_name
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
