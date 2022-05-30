<?php

namespace EventEspresso\core\exceptions;

/**
 * Class InsufficientPermissionsException
 * Thrown when the current user does not have the required permissions to execute the requested action
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InsufficientPermissionsException extends \RuntimeException
{
    /**
     * @access public
     * @param  string     $action
     * @param  string     $message
     * @param  int        $code
     * @param  \Exception $previous
     */
    public function __construct($action, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                esc_html__(
                    'We\'re sorry, but you do not have the required permissions to perform the following action: %1$s',
                    'event_espresso'
                ),
                ucwords(str_replace('_', ' ', $action))
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
