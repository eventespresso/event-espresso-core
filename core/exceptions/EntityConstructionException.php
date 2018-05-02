<?php

namespace EventEspresso\core\exceptions;

/**
 * Class EntityConstructionException
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class EntityConstructionException extends \DomainException
{


    /**
     * EntityConstructionException constructor
     *
     * @param string     $entity_class class name of the entity being constructed
     * @param string     $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct($entity_class, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    'The "%1$s" entity could not be instantiated for an unknown reason',
                    'event_espresso'
                ),
                $entity_class
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
