<?php

namespace EventEspresso\core\services\collections;

use Exception;
use RuntimeException;

/**
 * Class CollectionDetailsException
 * Thrown when some other exception occurs during CollectionDetails generation
 *
 * @package EventEspresso\core\services\collections
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class CollectionDetailsException extends RuntimeException
{

    /**
     * DuplicateCollectionIdentifierException constructor.
     *
     * @param Exception $previous
     * @param string    $message
     * @param int       $code
     */
    public function __construct(Exception $previous, $message = '', $code = 0)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    'The following error occurred during the collection details generation: %1$s %2$s',
                    'event_espresso'
                ),
                '<br />',
                $previous->getMessage()
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
