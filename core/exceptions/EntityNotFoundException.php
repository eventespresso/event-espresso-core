<?php

namespace EventEspresso\core\exceptions;

use Exception;
use UnexpectedValueException;

/**
 * Class EntityNotFoundException
 * thrown if attempting to retrieve an entity from some location (collection, database, etc)
 * but it was not found using the supplied identifier
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class EntityNotFoundException extends UnexpectedValueException
{
    /**
     * EntityNotFoundException constructor
     *
     * @param string         $identifier_type the name of the identifier used (ie: ID, Name, etc)
     * @param string         $identifier      the actual data value used to retrieve the entity
     * @param string         $message
     * @param int            $code
     * @param Exception|null $previous
     */
    #[\ReturnTypeWillChange]
    public function __construct(
        string $identifier_type,
        string $identifier,
        string $message = '',
        int $code = 0,
        Exception $previous =
        null
    ) {
        if (empty($message)) {
            $message = sprintf(
                esc_html__(
                    'The requested entity with %1$s="%2$s" was not found.',
                    'event_espresso'
                ),
                $identifier_type,
                $identifier
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
