<?php

/**
 * Interface EEI_Request_Stack_Core_App
 */
interface EEI_Request_Stack_Core_App
{

    /**
     * gives the core app a chance to handle the response after the request stack has fully processed
     *
     * @deprecated 4.9.53
     * @param EE_Request $request
     * @param EE_Response   $response
     */
    public function handle_response(EE_Request $request, EE_Response $response);
}
