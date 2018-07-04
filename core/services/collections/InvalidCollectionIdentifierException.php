<?php

namespace EventEspresso\core\services\collections;

use Exception;
use OutOfBoundsException;

/**
 * Class InvalidCollectionIdentifierException
 * Thrown when the supplied identifier doesn't exist in a Collection when trying to retrieve an item
 *
 * @package EventEspresso\core\services\collections
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class InvalidCollectionIdentifierException extends OutOfBoundsException
{

    /**
     * InvalidCollectionIdentifierException constructor.
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
                    'The supplied identifier "%1$s" does not exist within this collection. 
                    You may need to delay adding this asset until the required dependency has been added.',
                    'event_espresso'
                ),
                $identifier
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
