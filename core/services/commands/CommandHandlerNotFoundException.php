<?php

namespace EventEspresso\core\services\commands;

/**
 * Class CommandHandlerNotFoundException
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CommandHandlerNotFoundException extends \OutOfBoundsException
{
    /**
     * @access public
     * @param  string     $command_handler_name
     * @param  string     $message
     * @param  int        $code
     * @param  \Exception $previous
     */
    public function __construct($command_handler_name, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                esc_html__('The requested Command Handler "%1$s" could not be located or does not exist.', 'event_espresso'),
                $command_handler_name
            );
        }
        parent::__construct($message, $code, $previous);
    }
}
