<?php

/**
 * EE_Detect_File_Editor_Request
 * Detects File Editor requests and executes any logic needing set on those requests.
 *
 * @deprecated
 * @package \
 * @author  Darren Ethier
 * @since   4.9.55.p
 */
class EE_Detect_File_Editor_Request extends EE_Middleware
{

    /**
     * @deprecated
     * @param EE_Request  $request
     * @param EE_Response $response
     * @return EE_Response
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
                'EventEspresso\core\services\request\middleware\DetectFileEditorRequest',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52'
        );
        return $response;
    }
}
