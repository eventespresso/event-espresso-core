<?php

namespace EventEspresso\core\services\collections;

use Exception;
use OutOfRangeException;

/**
 * Class DuplicateCollectionIdentifierException
 * Thrown when the supplied identifier already exists in a Collection while trying to add a new item
 *
 * @package EventEspresso\core\services\collections
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class DuplicateCollectionIdentifierException extends OutOfRangeException
{

    /**
     * DuplicateCollectionIdentifierException constructor.
     *
     * @param                $identifier
     * @param string         $message
     * @param int            $code
     * @param Exception|null $previous
     */
    public function __construct($identifier, $message = '', $code = 0, Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    'The supplied identifier "%1$s" already exists within this collection.',
                    'event_espresso'
                ),
                $identifier
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
