<?php
namespace EventEspresso\core\services\container\exceptions;

use BadMethodCallException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class InstantiationException
 * thrown when a class could not be instantiated
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class InstantiationException extends BadMethodCallException
{

    /**
     * InstantiationException constructor.
     *
     * @param string $identifier the name of the requested entity or service
     * @param string     $message
     * @param int        $code
     * @param \Exception $previous
     */
    public function __construct($identifier, $message = '', $code = 0, \Exception $previous = null)
    {
        if (empty($message)) {
            $message = sprintf(
                __(
                    'The "%1$s" class could not be constructed.',
                    'event_espresso'
                ),
                $identifier
            );
        }
        parent::__construct($message, $code, $previous);
    }

}
// End of file InstantiationException.php
// Location: /InstantiationException.php