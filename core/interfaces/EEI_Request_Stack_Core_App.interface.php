<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEI_Request_Stack_Core_App
 */
interface EEI_Request_Stack_Core_App
{

    /**
     * gives the core app a chance to handle the response after the request stack has fully processed
     *
     * @param EE_Request  $request
     * @param EE_Response $response
     */
    public function handle_response(EE_Request $request, EE_Response $response);

}
// End of file EEI_Request_Stack_Core_App.interface.php
// Location: core/interfaces/EEI_Request_Stack_Core_App.interface.php