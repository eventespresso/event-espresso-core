<?php

namespace EventEspresso\core\exceptions;

use Exception;
use InvalidArgumentException;

/**
 * Class InvalidEntityException
 * thrown when an entity is not of the expected instance
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidEntityException extends InvalidArgumentException
{
    /**
     * InvalidEntityException constructor.
     *
     * @param mixed     $actual   the actual object (or thing) we got
     * @param string    $expected classname of the entity we wanted
     * @param string    $message
     * @param int       $code
     * @param Exception $previous
     */
    public function __construct($actual, $expected, $message = '', $code = 0, Exception $previous = null)
    {
        if (empty($message)) {
            ob_start();
            var_dump($actual);
            $object = ob_get_clean();
            $message = sprintf(
                esc_html__(
                    'The supplied entity is an instance of "%1$s", but an instance of "%2$s" was expected. Object: %3$s',
                    'event_espresso'
                ),
                is_object($actual)
                    ? get_class($actual)
                    : gettype($actual),
                $expected,
                $object
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
