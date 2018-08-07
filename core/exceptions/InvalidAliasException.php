<?php

namespace EventEspresso\core\exceptions;

use DomainException;
use Exception;

/**
 * Class InvalidAliasException
 * thrown when a class does not extend or implement the supplied alias
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidAliasException extends DomainException
{

    /**
     * InvalidClassException constructor.
     *
     * @param string    $fqcn
     * @param string    $alias
     * @param string    $message
     * @param int       $code
     * @param Exception $previous
     */
    public function __construct($fqcn, $alias, $message = '', $code = 0, Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    '"%1$s" can not be used as an alias because the "%2$s"  class does not extend or implement it.',
                    'event_espresso'
                ),
                $alias,
                $fqcn
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
