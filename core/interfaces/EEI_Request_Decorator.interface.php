<?php

/**
 * EEI_Request_Decorator Interface
 */
interface EEI_Request_Decorator
{

    /**
     * converts a Request to a Response
     * can perform their logic either before or after the core application has run like so:
     *    public function handle_request( EE_Request $request, EE_Response $response ) {
     *        $this->request = $request;
     *        $this->response = $response;
     *      // logic performed BEFORE core app has run
     *      $this->process_request_stack( $this->request, $this->response );
     *      // logic performed AFTER core app has run
     *      return $response;
     *    }
     *
     * @deprecated 4.9.53
     * @param    EE_Request $request
     * @param    EE_Response   $response
     * @return    EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response);
}
