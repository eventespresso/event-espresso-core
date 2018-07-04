<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use Exception;

/**
 * Class InvalidRequestStackMiddlewareException
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class InvalidRequestStackMiddlewareException extends InvalidDataTypeException
{

    /**
     * @param  mixed    $middleware_app_class
     * @param  string   $message
     * @param int       $code
     * @param Exception $previous
     */
    public function __construct($middleware_app_class, $message = '', $code = 0, Exception $previous = null)
    {
        if (is_array($middleware_app_class)) {
            $middleware_app_class = reset($middleware_app_class);
        }
        if (empty($message)) {
            $message = sprintf(
                esc_html__(
                    'The supplied Request Stack Middleware class "%1$s" is invalid or could no be found.',
                    'event_espresso'
                ),
                $middleware_app_class
            );
        }
        parent::__construct(
            '$middleware_app_class',
            $middleware_app_class,
            'EventEspresso\core\services\request\middleware\Middleware',
            $message,
            $code,
            $previous
        );
    }
}
