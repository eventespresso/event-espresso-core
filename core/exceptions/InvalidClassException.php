<?php

namespace EventEspresso\core\exceptions;

use DomainException;

/**
 * Class InvalidClassException
 * thrown when an invalid or missing class name is used
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidClassException extends DomainException
{
    /**
     * InvalidClassException constructor.
     *
     * @param string     $class_name
     * @param string     $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct($class_name, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                esc_html__('The "%1$s" Class is either missing or invalid.', 'event_espresso'),
                $class_name
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
