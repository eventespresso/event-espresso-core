<?php

/**
 * Class EE_Request_Stack_Builder
 * Assembles the EE_Request_Stack
 *
 * @deprecated    4.9.53
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.8.20
 */
class EE_Request_Stack_Builder
{

    /**
     * EE_Request_Stack_Builder
     */
    public function __construct()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This class is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\RequestStackBuilder',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.53'
        );
    }

    /**
     * @deprecated  4.9.53
     */
    public function unshift()
    {
    }


    /**
     * @deprecated  4.9.53
     */
    public function push()
    {
    }


    /**
     * @deprecated  4.9.53
     */
    public function resolve(EEI_Request_Decorator $application)
    {
    }
}
