<?php
/**
 * Class EE_Request_Stack
 * Basically a container class for holding EE_Middleware classes and the core application
 *
 * @deprecated    4.9.53
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.8.20
 */
class EE_Request_Stack
{


    /**
     * @deprecated  4.9.53
     * @param    EEI_Request_Decorator $application
     * @param    array                 $middlewares
     */
    public function __construct(EEI_Request_Decorator $application, $middlewares = array())
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This class is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\RequestStack',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.53'
        );
    }
}
