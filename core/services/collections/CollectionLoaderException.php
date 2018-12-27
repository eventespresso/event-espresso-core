<?php

namespace EventEspresso\core\services\collections;

use Exception;
use RuntimeException;

/**
 * Class CollectionLoaderException
 * Thrown when some other exception occurs during the creation and/or loading of a Collection
 *
 * @package EventEspresso\core\services\collections
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class CollectionLoaderException extends RuntimeException
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
                    'The following error occurred during the creation and/or loading of this collection: %1$s %2$s',
                    'event_espresso'
                ),
                '<br />',
                $previous->getMessage()
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
