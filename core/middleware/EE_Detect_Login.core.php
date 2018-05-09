<?php

/**
 * Class EE_Detect_Login
 *
 * @deprecated
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.59.p
 */
class EE_Detect_Login extends EE_Middleware
{


    /**
     * @deprecated
     * @param    EE_Request  $request
     * @param    EE_Response $response
     * @return    EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This class is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\middleware\DetectLogin',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52'
        );
        return $response;
    }
}
