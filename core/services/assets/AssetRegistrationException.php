<?php

namespace EventEspresso\core\services\assets;

use Exception;
use RuntimeException;


/**
 * Class AssetRegistrationException
 * Thrown when a call to wp_register_script() returns false
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class AssetRegistrationException extends RuntimeException
{
    /**
     * @param                $script_handle
     * @param string         $message
     * @param int            $code
     * @param Exception|null $previous
     */
    public function __construct($script_handle, $message = '', $code = 0, Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                esc_html_x(
                    'The "%1$s" script could not be registered with WordPress core.',
                    'The "script-handle" script could not be registered with WordPress core.',
                    'event_espresso'
                ),
                $script_handle
            );
        }
        parent::__construct($message, $code, $previous);
    }
}