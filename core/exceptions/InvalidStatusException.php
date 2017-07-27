<?php

namespace EventEspresso\core\exceptions;

use Exception;
use InvalidArgumentException;


class InvalidStatusException extends InvalidArgumentException
{
    /**
     * InvalidStatusException constructor.
     * @param string $status the invalid status id that was supplied
     * @param string $domain the name of the domain, model, or class that the status belongs to
     * @param string $message custom message
     * @param int $code
     * @param Exception|null $previous
     */
    public function __construct($status, $domain, $message = '', $code = 0, Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    '"%1$s" is not a valid %2$s status',
                    'event_espresso'
                ),
                $status,
                $domain
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
