<?php

namespace EventEspresso\core\exceptions;

/**
 * Class UnexpectedEntityException
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class UnexpectedEntityException extends \UnexpectedValueException
{
    /**
     * UnexpectedEntityException constructor
     *
     * @param mixed      $entity         the actual object or variable that was received
     * @param string     $expected_class classname of the entity we wanted
     * @param string     $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct($entity, $expected_class, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                esc_html__(
                    'The retrieved entity is an instance of "%1$s", but an instance of "%2$s" was expected.',
                    'event_espresso'
                ),
                is_object($entity) ? get_class($entity) : gettype($entity),
                $expected_class
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
