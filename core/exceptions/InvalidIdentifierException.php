<?php

namespace EventEspresso\core\exceptions;

use Exception;
use InvalidArgumentException;

/**
 * Class InvalidIdentifierException
 * thrown when an identifier is invalid
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidIdentifierException extends InvalidArgumentException
{

    /**
     * InvalidIdentifierException constructor.
     *
     * @param string     $actual   the identifier that was supplied
     * @param string     $expected example of an acceptable identifier
     * @param string     $message
     * @param int        $code
     * @param Exception $previous
     */
    public function __construct($actual, $expected, $message = '', $code = 0, Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    'The supplied identifier "%1$s" is invalid. A value like "%2$s" was expected.',
                    'event_espresso'
                ),
                $actual,
                $expected
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
// Location: core/exceptions/InvalidIdentifierException.php
