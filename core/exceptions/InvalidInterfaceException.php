<?php

namespace EventEspresso\core\exceptions;

use DomainException;

/**
 * Class InvalidInterfaceException
 * thrown when an invalid or missing interface name is used
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidInterfaceException extends DomainException
{
    /**
     * InvalidInterfaceException constructor.
     *
     * @param string     $interface_name
     * @param string     $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct($interface_name, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                esc_html__('The "%1$s" Interface is either missing or invalid.', 'event_espresso'),
                $interface_name
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
